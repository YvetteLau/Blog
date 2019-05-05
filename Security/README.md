> 环境安装

1. npm install


> 反射型XSS攻击

1. 进入 XSS 目录，运行 server.js (启动本地服务器)
2. 在浏览器中访问 localhost:3000/login.html
3. 使用用户名/密码: yvette / yvette 登录
4. 登录之后，会跳向: `http://localhost:3000/hello?type=<script>alert('恶意内容')</script>`  (此时，我们还可以获取到 cookie 信息)
5. 使用错误的用户名/密码进行登录(随便输入什么)，会跳向：`http://localhost:3000/error?type=<script>alert('恶意内容')</script>`  (显然，用户没有登录成功，没啥好攻击的，此处只是方便查看如何防范反射型XSS攻击)