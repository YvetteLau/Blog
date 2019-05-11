>  ### 环境

1. npm install
2. 本人使用的编辑器是 VSCode(自行安装 Code Runner 插件，用于运行 server.js)

> ## XSS 攻击

>  ### 反射型XSS攻击

1. 进入 XSS 目录，运行 server.js (启动本地服务器)
2. 在浏览器中访问 `localhost:3000/login.html`
3. 使用错误的用户名/密码进行登录(例如: 123 / 123)，会跳向：`http://localhost:3000/error?type=<script>alert('恶意内容')</script>`  
4. 使用正确的用户名: yvette / yvette 登录，会跳向: `http://localhost:3000/welcome?type=<script>alert('恶意内容')</script>` ;虽然url仍然包含恶意脚本，但是我们已经进行了转义，不会再被攻击


> ### DOM 型XSS攻击

1. 浏览器中访问 `localhost:3000/after.html`
2. 输入评论内容: `2222<script>alert(1)</script>`
   
    当然啦，如果是登录状态，还可以拿cookie等信息~
    还可以悄悄引入其它的js文件过来，可怕~

3. 我们可以对输入的内容进行转义，这样就不会被攻击啦~


>  ### 存储型 XSS 攻击

1. 浏览器中访问 `localhost:3000/comments.html`
2. 评论需要先登录，如未登录会自动跳去登录页
3. 输入评论内容: `2222<script>alert(1)</script>`
4. 恶意脚本未经转换，存储到了后台。任何用户访问此页面，都会执行恶意脚本。
5. 防范存储型XSS攻击，需要我们增加字符串的过滤：前端输入时过滤/服务端增加过滤/前端输出时过滤——一句话：谁都别信！
6. 浏览器中访问 `localhost:3000/comments2.html`，输入评论: `2222<script>alert(1)</script>`，不会有弹框，因为做了过滤。

> ## CSRF 攻击

偷走你的钱:

1. 进入 CSRF 目录，运行 server.js，端口号是3001 (runcode就行)
2. 在控制台: node server2.js，端口号3002
3. 浏览器中访问 `http://localhost:3001/`，没有登录的情况下自动跳转登录页
4. 使用 loki/loki 登录，可以看到 loki 的账号有 10W 的余额
5. loki 已经登录了，cookie已经有了，这个时候，有人给你发了个钓鱼网站的链接: `http://localhost:3002/fish.html`，你点过去了，你的钱就被偷偷偷走了~~~
6. loki 的钱在不知不觉中就被转到了 yvette 的账户
7. 可怕不~
8. 不过银行网站的安全都是做的很好的，别慌~

> ### 防御

说明：safe1.html,safe2.html,safe3.html;fish1.html/fish2.html/fish3.html 的区别仅在于请求接口不用。


1. 使用验证码【用户体验不佳】
   
   利用svg-captcha(已安装依赖)
    
    接口: `api/transfer1`

- 浏览器访问 `http://localhost:3001/safe1.html`，登录之后发现转账需要验证码了~
- 现在登录之后，再诱惑你点钓鱼网站 `http://localhost:3002/fish1.html`，你的钱不能被转走，因为服务端需要验证你的验证码，发现验证码错误，不会转账。

2. 判断来源(referer) 【referer并不安全，应该referer是可以被修改的】

    接口: `api/transfer2`

- 浏览器访问 `http://localhost:3001/safe2.html`，登录(loki/loki)~
- 现在登录之后，再诱惑你点钓鱼网站 `http://localhost:3002/fish2.html`，你的钱不能被转走，因为服务端会判断请求来源，发现请求来源是 `localhost:3002`，不会转账。

3. Token【用户无感知】
   
   接口: `api/transfer3`

- 浏览器访问 `http://localhost:3001/safe3.html`，登录(loki/loki)~
- 现在登录之后，再诱惑你点钓鱼网站 `http://localhost:3002/fish3.html`，你的钱不能被转走，因为服务端会判断请求来源，发现请求来源是 `localhost:3002`，不会转账。
