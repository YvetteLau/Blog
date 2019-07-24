'use strict';

var _rc = require('./utils/rc');

let config = async (action, key, value) => {
    switch (action) {
        case 'get':
            if (key) {
                let result = await (0, _rc.get)(key);
                console.log(result);
            } else {
                let obj = await (0, _rc.getAll)();
                Object.keys(obj).forEach(key => {
                    console.log(`${key}=${obj[key]}`);
                });
            }
            break;
        case 'set':
            (0, _rc.set)(key, value);
            break;
        case 'remove':
            (0, _rc.remove)(key);
            break;
        default:
            break;
    }
}; // 管理 .eosrc 文件 (当前用户目录下)

module.exports = config;