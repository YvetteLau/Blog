/**
 * 根据代码的运行结果更多的了解 for...of  for...in  和 forEach, map 之间的区别和性能对比
 * 
 * for...of: 具有 iterator 接口，就可以用 for...of 循环遍历它的成员。
 *           数组的遍历器接口只返回具有数字索引的属性(数组原生具备 iterator 接口, 默认部署了 Symbol.iterator 属性)。
 *           对于普通的对象, for...of 结构不能直接使用，会报错，必须部署了 Iterator 接口后才能使用。
 * 
 * for...in: 遍历对象自身的和继承的可枚举的属性, 不能直接获取属性值
 * 
 * forEach: 只能遍历数组，不能中断，返回值是undefined，不修改原数组
 * 
 * map:     只能遍历数组，不能中断，返回值是修改后的数组，不修改原数组
 * 
 */


/**
 * 
 * 遍历数组
 * 
 * 差异点: 
 *      for...of 遍历的是数组的属性值;
 *      for...in 遍历的是属性名;
 *      forEach 循环不能中断;
 * 
 */

{
    // let arr = ['hello', 'world']; //为了方便大家选中一块，运行代码;在每个代码块中定义了变量
    {
        let arr = ['hello', 'world'];
        for (let item of arr) {
            console.log(item); // hello world; 输出的是属性值
        }
        arr.foo = 1000;
        for (let item of arr) {
            console.log(item); // hello world; 输出的是属性值(foo不是数字索引，不会被遍历)
        }
    }

    {
        let arr = ['hello', 'world'];
        for (let item in arr) {
            console.log(item); //0 1 ; 输出的是属性名
        }
        arr.foo = 1000;
        for (let item in arr) {
            console.log(item); // 0 1 foo;
        }
    }

    {
        let arr = ['hello', 'world'];
        let keys = Object.keys(arr);
        console.log(keys) //[ '0', '1' ]; 返回的是对象的键名组成的数组，
    }

    {
        let arr = ['hello', 'world'];
        let result = arr.forEach((item, index) => {
            console.log(item, index); //hello 0   world 1; 需要特别注意的是 forEach是不能中断的
            item += 's';
        });
        console.log(result, arr);//undefined [ 'hello', 'world' ]; 原数组未被改变
        ['hello', 'world'].forEach((item, index) => {
            console.log(item); //hello world; 尽管我们在 hello 的时候，return了，但是不不能中断循环
            if(item === "hello"){
                return;
            }
        });
    }

    {
        let arr = ['hello', 'world'];
        let result = arr.map((item, index, input) => {
            return item + 's'; 
        });
        console.log(result); //['hellos', 'worlds'] 返回新数组
        console.log(arr);    //[ 'hello', 'world' ] 原数组未被修改
    }
}

/**
 * 
 * 遍历普通对象
 * 
 * 差异点: 
 *      for...of 抛错
 *      for...in 遍历对象自身的和继承的可枚举的属性
 *      普通对象没有 forEach 和 map 方法
 */

{
    let obj = {
        'name': 'Yvette',
        'age': 24
    }

    {
        try{
            for(let item of obj) {
                console.log(item); //抛错，因为普通对象没有 Iterator 接口
            }
        }catch(e) {
            console.log(e);
        }

        //给普通对象增加 Iterator 接口
        let arr = ['hello', 'world'];
        obj[Symbol.iterator] = arr[Symbol.iterator].bind(arr);
        for(let item of obj) {
            console.log(item); //hello world
        }
    }

    {
        for(let item in obj) {
            console.log(item); //name age ; 遍历属性名
        }
       
        function Parent(weight, money) {
            this.weight = weight;
            this.money = money;

        }
        function Child(name) {
            this.name = name;
        }
        Child.prototype = new Parent(50, 1000);
        let Mica = new Child('Mica');
        Mica.age = 20;
        Mica.color = 'white';

        // 遍历对象自身的和继承的可枚举的属性
        for(let i in Mica) {
            console.log(i); //name age color weight money
        }
        // 设置 money 为不可枚举属性
        Object.defineProperty(Mica, 'money', {
            enumerable: false
        });
        for(let i in Mica) {
            console.log(i); //name age color weight;   money被设置为了不可枚举属性
        }
        console.log(Object.keys(Mica)); //[ 'name', 'age', 'color' ]; Object.keys返回的是指定对象自身可枚举属性的字符串数组
    }
}