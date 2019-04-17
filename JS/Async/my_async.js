const fs = require('fs');
const bluebird = require('bluebird');
const readFile = bluebird.promisify(fs.readFile);
const co = require('co');
/**
 * 假设要实现以下功能:
 * 先读取A--->再读取B--->最后读取C
 */
function* read() {
    let info = yield readFile('./JS/Async/data/info.txt', 'utf-8');
    let base = yield readFile(info, 'utf-8');
    let age = yield readFile(base, 'utf-8');
    return age;
}

/**
 * 不考虑封装的情况，我们可以写出下面的代码
 */
// let it = read();
// let { value, done } = it.next();
// value.then((data) => {
//     let { value, done } = it.next(data); //data赋值给了 info
//     value.then((data) => {
//         let { value, done } = it.next(data); //data赋值给了 base
//         value.then((data) => {
//             let { value, done } = it.next(data); //data赋值给base
//             //此时done为false
//             return value;
//         });
//     });
// });

/**
 * 可以看出上面的代码，其实是重复的，我们可以进行封装
 */

function my_co(it) {
    return new Promise((resolve, reject) => {
        function next(data) {
            try {
                var { value, done } = it.next(data);
                
            }catch(e){
                return reject(e);
            }
            if (!done) { 
                //done为true,表示迭代完成
                //value 不一定是 Promise，可能是一个普通值。使用 Promise.resolve 进行包装。
                Promise.resolve(value).then(val => {
                    next(val);
                }, reject);
            } else {
                resolve(value);
            }
        }
        next(); //执行一次next
    });
}
function* test() {
    yield new Promise((resolve, reject) => {
        setTimeout(resolve, 100);
    });
    yield new Promise((resolve, reject) => {
        // throw Error(1);
        resolve(10)
    });
    yield 10;
    return 1000;
}

my_co(test()).then(data => {
    console.log(data); //输出22
}).catch((err) => {
    console.log('err: ', err);
});


my_co(read()).then(data => {
    console.log(data);
}).catch((err) => {
    console.log('err: ', err);
});


/**
 * async 是 await 的语法糖。
 * 以上需要使用 async/await 实现
 */

async function readAsync() {
    let info = await readFile('./JS/Async/data/info.txt', 'utf-8');
    let base = await readFile(info, 'utf-8');
    let age = await readFile(base, 'utf-8');
    return age;
}

readAsync().then((data) => {
    console.log('async: ' + data);
}).catch(err => {
    console.log(err);
});