> 环境

1. npm install
2. 本人使用的编辑器是 VSCode(自行安装 Code Runner 插件，用于运行 server.js)

> 反射型XSS攻击

1. 进入 XSS 目录，运行 server.js (启动本地服务器)
2. 在浏览器中访问 `localhost:3000/login.html`
3. 使用错误的用户名/密码进行登录(例如: 123 / 123)，会跳向：`http://localhost:3000/error?type=<script>alert('恶意内容')</script>`  
4. 使用正确的用户名: yvette / yvette 登录，会跳向: `http://localhost:3000/welcome?type=<script>alert('恶意内容')</script>` ;但是我们已经进行了转义，不会再被攻击

> DOM 型XSS攻击

1. 浏览器中访问 `localhost:3000/after.html`
2. 输入评论内容: `2222<script>alert(1)</script>`
   
    当然啦，如果登录状态，还可以拿cookie等信息~
    还可以悄悄引入其它的js文件过来，可怕~

3. 我们可以对输入的内容进行转义，这样就不会被攻击啦~

> 存储型 XSS 攻击

1. 浏览器中访问 localhost:3000/comments.html
2. 评论需要先登录，如未登录会自动跳去登录页
3. 输入评论内容: `2222<script>alert(1)</script>`
4. 恶意脚本未经转换，存储到了后台。任何用户访问此页面，都会执行恶意脚本。