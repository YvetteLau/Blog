import shallowCopy from '../src/shallowCopy';

test('shallowCopy 字面量对象', () => {
    let source = {
        name: 'Yvette',
        age: 20,
        hobbies: ['reading', 'photography'],
        sayHi: function() {
            return 'Hi';
        }
    };
    let target = shallowCopy(source);
    /**
     * 浅拷贝意味着只复制一层，那么属性值是原始数据类型的，目标对象和源对象之间互不影响
     * 
     * 如果属性值是复杂数据类型，复制的是引用地址，目标对象和源对象的属性值指向的是同一块栈内存
     */
    
    target.name = 'Tom';
    target.hobbies.push('coding'); //源对象的hoobies属性值也发生了变化

    expect(source.name).toBe('Yvette'); //基本数据类型，二者不相干
    expect(source.hobbies).toEqual(['reading', 'photography', 'coding']);//属性值是复杂数据类型时，互相影响
    expect(target.sayHi()).toEqual('Hi');
});


test('shallowCopy 数组', () => {
    let source = ['Yvette', 'age', ['reading', 'photography']];
    let target = shallowCopy(source);

    target[0] = 'Tom';
    target[2].push('coding');

    expect(source[0]).toBe('Yvette'); //基本数据类型，二者不相干
    expect(source[2]).toEqual(['reading', 'photography', 'coding']);//属性值是复杂数据类型时，互相影响
});