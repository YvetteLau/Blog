export default function shallowCopy(obj) {
    //obj是个复杂数据类型
    var result = new obj.constructor();
    for(var key in obj) {
        if(obj.hasOwnProperty(key)) {
            //仅拷贝对象自身的属性，不拷贝原型链上的属性
            result[key] = obj[key];
        }
    }
    return result;
}
