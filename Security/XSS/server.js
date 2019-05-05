/**
 * 用户登录之后，返回登录标识 cookie
 */

const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

//设置路径
app.use(express.static(path.join(__dirname, 'src')));
app.use(express.static(path.join(__dirname, '../')));
//将参数转换成对象
app.use(bodyParser.urlencoded({ extended: true }));

//用户列表
let userList = [{ username: 'yvette', password: 'yvette' }, { username: 'liuyan', password: 'liuyan' }];

let SESSION_ID = 'connect.sid';
let session = {};
//登录接口
app.post('/api/login', (req, res) => {
    let { username, password } = req.body;
    let user = userList.find(item => item.username === username && item.password === password);
    if (user) {
        //用户登录后，给一个标识(cookie登录)
        const cardId = Math.random() + Date.now();
        session[cardId] = {user};
        res.cookie(SESSION_ID, cardId);
        res.json({ code: 0 });
    } else {
        res.json({ code: 1, error: `${username} does not exist or password mismatch` });
    }

});


//1.反射型XSS攻击: http://localhost:3000/hello?type=<script>alert('恶意内容')</script>
//chrome能够检测到Url上的XSS攻击(可在firefox或者是其它浏览器测试)
app.get('/hello', function(req, res) {
    res.send(`${req.query.type}`); //拿到 url 上的 type 参数，并返回给前端    
    
    //对type查询参数进行编码，即可解决当前的XSS攻击(可重启服务查看)
    // res.send(`${encodeURIComponent(req.query.type)}`);
});

app.get('/error', function(req, res) {
    //对查询参数进行编码，避免XSS攻击
    res.send(`${encodeURIComponent(req.query.type)}`); 
});
app.listen(3000);