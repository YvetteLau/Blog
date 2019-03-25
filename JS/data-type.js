/**
 * 
 * 如何准确判断JS数据类型？
 * 
 * typeof 无法准确判断复杂数据类型
 * instanceof 无法正确判断基本数据类型
 * 
 * 本文提供两个思路:
 *  1.首先通过typeof判断出是否是复杂数据类型，如果是，再使用instanceof判断
 *  2.定义自己的数据类型
 *  (附测试代码)
 */


/**
 * isComplex判断是否是复杂数据类型，如果是返回true,否则返回false
 * @param {*} data 需要被判断类型的数据
 */

function isComplex(data) {
    if (data && (typeof data === 'object' || typeof data === 'function')) {
        return true;
    }
    return false;
}


/**
 * 定义自己的基本数据类型
 */

class PrimitiveString {
    static [Symbol.hasInstance](data) {
        return typeof data === 'string';
    }
}

class PrimitiveNumber {
    static [Symbol.hasInstance](data) {
        return typeof data === 'number';
    }
}

class PrimitiveUndefined {
    static [Symbol.hasInstance](data) {
        return typeof data === 'undefined';
    }
}

class PrimitiveBool {
    static [Symbol.hasInstance](data) {
        return typeof data === 'boolean';
    }
}

class PrimitiveNull {
    static [Symbol.hasInstance](data) {
        return data === null;
    }
}

class PrimitiveSymbol {
    static [Symbol.hasInstance](data) {
        return typeof data === 'symbol';
    }
}




/**
 * 测试 
 */

let num = 2;
console.log(num instanceof PrimitiveNumber);    //true
console.log('isComplex: ', isComplex(num));

let str = 'Yvette';
console.log(str instanceof PrimitiveString);    //true
console.log('isComplex: ', isComplex(str));

let flag = false;
console.log(flag instanceof PrimitiveBool);     //true
console.log('isComplex: ', isComplex(flag));

let und = undefined;
console.log(und instanceof PrimitiveUndefined); //true
console.log('isComplex: ', isComplex(und));

let nul = null;
console.log(nul instanceof PrimitiveNull);      //true
console.log('isComplex: ', isComplex(nul));

let sym = Symbol(10);
console.log(sym instanceof PrimitiveSymbol);    //true
console.log('isComplex: ', isComplex(sym));

console.log('isComplex: ', isComplex(isComplex)); //true