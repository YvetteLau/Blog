> 环境安装

1. npm install


> 反射型XSS攻击

1. 进入 XSS 目录，运行 server.js (启动本地服务器)
2. 在浏览器中访问 localhost:3000/login.html
3. 使用用户名/密码: yvette / yvette 登录
4. 登录之后，会跳向: `http://localhost:3000/hello?type=<script>alert('恶意内容')</script>` (此时，我们还可以获取到 cookie 信息)
