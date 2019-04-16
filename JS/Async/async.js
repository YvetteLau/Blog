const fs = require('fs');
const bluebird = require('bluebird');
const readFile = bluebird.promisify(fs.readFile);


async function read() {
    let info = await readFile('./JS/Async/data/info.txt', 'utf-8');
    let base = await readFile(info, 'utf-8');
    let age = await readFile(base, 'utf-8');
    return age;
}

read().then((data) => {
    console.log(data);
}).catch(err => {
    console.log(err);
});