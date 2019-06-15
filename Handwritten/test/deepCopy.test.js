import { deepCopy, deepClone } from '../src/deepCopy';
import { cloneDeep } from '../node_modules/lodash/lodash';

test('deepCopy 普通对象', () => {
    let source = {
        name: 'Yvette',
        age: 20,
        time: new Date(),
        hobbies: ['reading', 'photography'],
        sayHi: function () {
            return 'Hi';
        }
    };
    let target = deepCopy(source);
    target.name = 'Tom';
    target.hobbies.push('coding');
    //深拷贝意味着 target 和 source 是完全独立的，不会相互影响
    expect(source.name).toBe('Yvette');
    expect(source.hobbies).toEqual(['reading', 'photography']);
    expect(target.sayHi()).toBe('Hi'); //函数正常拷贝
    expect(target.time instanceof Date).toBe(true);//Date数据类型正常

});

test('deepCopy 原型链上属性拷贝', () => {
    function SupSuper() { }
    SupSuper.prototype.from = 'China';

    function Super() { }
    Super.prototype = new SupSuper();
    Super.prototype.location = 'NanJing';

    function Child(name, age, hobbies) {
        this.name = name;
        this.age = age;
        this.hobbies = hobbies;
    }
    Child.prototype = new Super();
    let obj = new Child('Yvette', 18, ['reading', 'photography']);
    let obj2 = deepCopy(obj);
    expect(obj2).toEqual({
        name: 'Yvette',
        age: 18,
        hobbies: ['reading', 'photography']
    });

    /**构造函数原型上的属性可以拷贝 */
    expect(obj2.from).toBe('China');
    /**Super原型上的属性获取不到,返回Undefined */
    expect(obj2.location).toBeUndefined();
    /**obj是能从原型上获取到location属性的 */
    expect(obj.location).toBe('NanJing');
});

test('deepCopy 不支持循环引用', () => {
    let obj = {
        name: 'Yvette',
        age: 20
    }
    obj.info = obj;
    //抛出异常
    // expect(deepCopy(obj)).toThrow();
});


test('deepClone 普通对象', () => {
    let source = {
        name: 'Yvette',
        age: 20,
        time: new Date(),
        hobbies: ['reading', 'photography'],
        sayHi: function () {
            return 'Hi';
        }
    };
    let target = deepClone(source);
    target.name = 'Tom';
    target.hobbies.push('coding');
    //深拷贝意味着 target 和 source 是完全独立的，不会相互影响
    expect(source.name).toBe('Yvette');
    expect(source.hobbies).toEqual(['reading', 'photography']);
    expect(target.sayHi()).toBe('Hi'); //函数正常拷贝
    expect(target.time instanceof Date).toBe(true);//Date数据类型正常

});

test('deepClone 原型链上属性拷贝', () => {
    function SupSuper() { }
    SupSuper.prototype.from = 'China';

    function Super() { }
    Super.prototype = new SupSuper();
    Super.prototype.location = 'NanJing';

    function Child(name, age, hobbies) {
        this.name = name;
        this.age = age;
        this.hobbies = hobbies;
    }
    Child.prototype = new Super();
    let obj = new Child('Yvette', 18, ['reading', 'photography']);
    let obj2 = deepClone(obj);
    expect(obj2).toEqual({
        name: 'Yvette',
        age: 18,
        hobbies: ['reading', 'photography']
    });

    /**构造函数原型上的属性可以拷贝 */
    expect(obj2.from).toBe('China');
    /**Super原型上的属性获取不到,返回Undefined */
    expect(obj2.location).toBeUndefined();
    /**obj是能从原型上获取到location属性的 */
    expect(obj.location).toBe('NanJing');
});

test('deepClone 循环引用', () => {
    let obj = {
        name: 'Yvette',
        age: 20
    }
    obj.info = obj;
    //和 lodash 的 cloneDeep(obj) 结果一致 
    expect(deepClone(obj)).toEqual(cloneDeep(obj));
});