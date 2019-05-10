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
let userList = [{ username: 'yvette', password: 'yvette', account: 1000 }, { username: 'loki', password: 'loki', account: 100000 }];

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

app.get('/api/userinfo', (req, res) => {
    let info = session[req.cookies[SESSION_ID]];
    if (info) {
        //用户已经登录
        let username = info.user.username;
        res.json({ code: 0, info: { username, account: info.user.account } });
    } else {
        res.json({ code: 1, error: 'user not logged in.' });
    }
});

app.post('/api/transfer', (req, res) => {
    let info = session[req.cookies[SESSION_ID]];
    if (info) {
        //用户已经登录
        let {payee, amount} = req.body;
        let username = info.user.username;
        userList.forEach(user => {
            if(user.username === username) {
                user.account -= amount;
            }
            if(user.username === payee) {
                user.account += amount;
            }
        })
        res.json({ code: 0 });
    } else {
        res.json({ code: 1, error: 'user not logged in.' });
    }
});

app.listen(3001);