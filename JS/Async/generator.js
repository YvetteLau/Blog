const fs = require('fs');
const bluebird = require('bluebird');
const readFile = bluebird.promisify(fs.readFile);

/**
 * 读取A--->读取B--->读取C
 */
function* read() {
    let info = yield readFile('./JS/Async/data/info.txt', 'utf-8');
    let base = yield readFile(info, 'utf-8');
    let age = yield readFile(base, 'utf-8');
    return age;
}

let it = read();
let { value, done } = it.next();
value.then((data) => {
    let { value, done } = it.next(data); //data赋值给了 info
    value.then((data) => {
        let { value, done } = it.next(data); //data赋值给了 base
        value.then((data) => {
            let { value, done } = it.next(data); //data赋值给base
            console.log(value); //输出22
        });
    });
});


// 引入co

const co = require('co');
co(read()).then(data => {
    console.log(data); //输出22
}).catch(err => {
    console.log(err);
});


/**
 * 自己实现一个 co
 * 接受一个迭代器
 * 
 */ 

function my_co (it) {
    return new Promise((resolve, reject) => {
        function next(data) {
            let {value, done} = it.next(data);
            if(!done) {
                value.then(val => {
                    next(val);
                }, reject);
            }else{
                resolve(value);
            }
            
        }
        next();
    });
}

my_co(read()).then(data => {
    console.log(data); //输出22
});