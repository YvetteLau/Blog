/**
 * 用户登录之后，返回登录标识 cookie
 */

const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');


//设置路径
app.use(express.static(path.join(__dirname, 'src')));
app.use(express.static(path.join(__dirname, '../')));
//将参数转换成对象
app.use(bodyParser.urlencoded({ extended: true }));
//req.cookie[xxx] 获取cookie
app.use(cookieParser());

//用户列表
let userList = [{ username: 'yvette', password: 'yvette' }, { username: 'star', password: 'star' }];

let SESSION_ID = 'connect.sid';
let session = {};
//登录接口
app.post('/api/login', (req, res) => {
    let { username, password } = req.body;
    let user = userList.find(item => item.username === username && item.password === password);
    if (user) {
        //用户登录后，给一个标识(cookie登录)
        const cardId = Math.random() + Date.now();
        session[cardId] = { user };
        res.cookie(SESSION_ID, cardId);
        res.json({ code: 0 });
    } else {
        res.json({ code: 1, error: `${username} does not exist or password mismatch` });
    }

});

//1.反射型XSS攻击: http://localhost:3000/error?type=<script>alert('恶意内容')</script>
//chrome能够检测到Url上的XSS攻击(可在firefox或者是其它浏览器测试)
app.get('/error', function (req, res) {
    res.send(`${req.query.type}`); //拿到 url 上的 type 参数，并返回给前端    
});

app.get('/welcome', function (req, res) {
    //对查询参数进行编码，避免XSS攻击
    res.send(`${encodeURIComponent(req.query.type)}`);
    //对type查询参数进行编码，即可解决当前的XSS攻击(可重启服务查看)
    // res.send(`${encodeURIComponent(req.query.type)}`);
});

//评论列表
let comments = [
    { username: 'yvette', content: '大家好' },
    { username: 'yvette', content: '我是刘小夕' },
    { username: 'star', content: '大家好，我是Star' },
]
app.get('/getComments', function (req, res) {
    res.json({ code: 0, comments });
});

app.post('/addComment', function (req, res) {
    //cardId (req.cookies[SESSION_ID])要派上用场啦~
    let info = session[req.cookies[SESSION_ID]];
    if (info) {
        //用户已经登录
        let username = info.user.username;
        comments.push({ username, content: req.body.comment });
        res.json({ code: 0, comments });
    } else {
        res.json({ code: 1, error: 'user not logged in.' });
    }
});


//安全的评论列表
let comments2 = [
    { username: 'yvette', content: '大家好' },
    { username: 'yvette', content: '我是刘小夕' },
    { username: 'star', content: '大家好，我是Star' },
]
app.get('/getComments2', function (req, res) {
    res.json({ code: 0, comments: comments2 });
});
function encodeHtml(str) {
    return str.replace(/"/g, '&quot;')
            .replace(/'/g, '&apos;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
}
app.post('/addComment2', function (req, res) {
    //cardId (req.cookies[SESSION_ID])要派上用场啦~
    let info = session[req.cookies[SESSION_ID]];
    if (info) {
        //用户已经登录
        let username = info.user.username;
        comments2.push({ username, content: encodeHtml(req.body.comment) });
        res.json({ code: 0, comments: comments2 });
    } else {
        res.json({ code: 1, error: 'user not logged in.' });
    }
});

app.listen(3000);