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





/**
 * 通过 Promise.all 可以实现多个异步并行执行，同一时刻获取最终结果的问题
 */

Promise.all([
    read('./JS/Async/data/age.txt'),
    read('./JS/Async/data/name.txt')
]).then(data => {
    console.log(data); //['22', 'Yvette']
}).catch(err => console.log(err));

/**
 * 如果使用回调函数实现多个异步并行执行，同一时刻获取最终结果
 * 可以借助 发布订阅/观察者模式
 */

let pubsub = {
    arry: [],
    emit() {
        this.arry.forEach(fn => fn());
    },
    on(fn) {
        this.arry.push(fn);
    }
}

let data = [];
pubsub.on(() => {
    if(data.length === 2) {
        console.log(data);  //[ '22', 'Yvette' ]
    }
});
fs.readFile('./JS/Async/data/age.txt', 'utf-8', (err, value) => {
    data.push(value);
    pubsub.emit();
});
fs.readFile('./JS/Async/data/name.txt', 'utf-8', (err, value) => {
    data.push(value);
    pubsub.emit();
});
