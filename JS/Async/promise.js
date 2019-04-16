const fs = require('fs');

/**
 * 将 fs.readFile 包装成promise接口
 */
function read(url) {
    return new Promise((resolve, reject) => {
        fs.readFile(url, 'utf8', (err, data) => {
            if(err) reject(err);
            resolve(data);
        });
    });
}

/**
 * 
 * 解决回调地狱
 * 注: code Runner 的bug导致，相对路径是从根目录开始
 * 
 */

read('./JS/Async/data/info.txt').then((data) => {
    return read(data);
}).then((data) => {
    return read(data);
}).then((data) => {
    console.log(data); //22
}).catch((err) => {
    //可以对错误进行统一处理
    console.log(err);
});