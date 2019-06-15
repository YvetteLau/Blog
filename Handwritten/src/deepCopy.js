/**
 * 
 * @param {*} obj 
 * 未考虑循环引用的问题
 * 
 */
function deepCopy(obj) { //递归拷贝
    if (obj instanceof RegExp) return new RegExp(obj);
    if (obj instanceof Date) return new Date(obj);
    if (obj === null || typeof obj !== 'object') {
        //如果不是复杂数据类型，直接返回
        return obj;
    }
    /**
     * 如果obj是数组，那么 new obj.constructor() 返回的是一个数组
     * 如果obj是对象，那么 new obj.constructor() 返回的是一个对象
     */
    let t = new obj.constructor();
    for (let key in obj) {
        //递归
        if (obj.hasOwnProperty(key)) {
            if (obj.hasOwnProperty(key)) {//是否是自身的属性
                t[key] = deepCopy(obj[key]);
            }
        }
    }
    return t;
}





function deepClone(obj, hash = new WeakMap()) { //递归拷贝
    if (obj instanceof RegExp) return new RegExp(obj);
    if (obj instanceof Date) return new Date(obj);
    if (obj === null || typeof obj !== 'object') {
        //如果不是复杂数据类型，直接返回
        return obj;
    }
    if (hash.has(obj)) {
        return hash.get(obj);
    }
    /**
     * 如果obj是数组，那么 obj.constructor 是 [Function: Array]
     * 如果obj是对象，那么 obj.constructor 是 [Function: Object]
     */
    let t = new obj.constructor();
    hash.set(obj, t);
    for (let key in obj) {
        //递归
        if (obj.hasOwnProperty(key)) {//是否是自身的属性
            t[key] = deepClone(obj[key], hash);
        }
    }
    return t;
}

export { deepCopy, deepClone };

