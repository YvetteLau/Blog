/**
 * 根据代码的运行结果更多的了解 for...of  for...in  和 forEach 之间的区别和性能对比
 * 
 * for...of: 具有 iterator 接口，就可以用 for...of 循环遍历它的成员。
 *           数组的遍历器接口只返回具有数字索引的属性(数组原生具备 iterator 接口, 默认部署了 Symbol.iterator 属性)。
 *           对于普通的对象, for...of 结构不能直接使用，会报错，必须部署了 Iterator 接口后才能使用。
 * 
 * for...in: 只遍历对象自身的和继承的可枚举的键名, 不能直接获取属性值
 * 
 * 
 * 
 * forEach，需要注意的一点是 forEach 是不能中断的
 * 
 */


/**
 * 
 * 遍历数组
 * 
 * 差异点: 
 *      for...of遍历的是数组的属性值，
 *      for...in 遍历的是属性名, 
 *      forEach 循环不能中断。
 * 
 * 
 */

{
    let arr = ['hello', 'world', ];
    {
        for (let item of arr) {
            console.log(item); // hello world; 输出的是属性值
        }
    }

    {
        for (let item in arr) {
            console.log(item); //0 1 ; 输出的是属性名
        }
    }

    {
        let keys = Object.keys(arr);
        console.log(keys) //[ '0', '1' ]; 返回的是对象的键名组成的数组，
    }

    {
        arr.forEach((item, index) => {
            console.log(item, index); //hello 0   world 1; 需要特别注意的是 forEach是不能中断的
        });
        arr.forEach((item, index) => {
            console.log(item); //hello world; 尽管我们在 hello 的时候，return了，但是不不能中断循环
            if(item === "hello"){
                return;
            }
        });
    }
    
}

/**
 * 
 * 遍历普通对象
 * 
 * for...of 抛错
 * 
 */

{
    let obj = {
        'name': 'Yvette',
        'age': 24
    }
    {
        for(let item of obj) {
            console.log(item); //抛错，因为普通对象没有 Iterator 接口
        }
    }
}