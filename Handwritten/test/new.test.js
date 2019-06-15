import _new from '../src/new';

test('_new 无返回值', () => {
    function Parent(name, age) {
        this.name = name;
        this.age = age;
    }
    expect(_new(Parent, 'Yvette', 22)).toEqual({name: 'Yvette', age: 22});
    expect(_new(Parent, 'Yvette', 22)).toEqual(new Parent('Yvette', 22));
});

test('_new 返回普通值', () => {
    function Parent(name, age) {
        this.name = name;
        this.age = age;
        return 'hello';
    }
    expect(_new(Parent, 'Yvette', 22)).toEqual({name: 'Yvette', age: 22});
    expect(_new(Parent, 'Yvette', 22)).toEqual(new Parent('Yvette', 22));
});

test('_new 返回对象', () => {
    function Parent(name, age) {
        this.name = name;
        this.age = age;
        return {
            info: 'nothing'
        }
    }
    //当构造函数返回一个Object时;a = new Parent(); a 是 Parent 返回的Object
    expect(_new(Parent, 'Yvette', 22)).toEqual({info: 'nothing'});
    expect(_new(Parent, 'Yvette', 22)).toEqual(new Parent('Yvette', 22));
});

test('_new 返回函数', () => {
    function Parent(name, age) {
        this.name = name;
        this.age = age;
        return function Hello(){
            return 'hello';
        }
    }
    //当构造函数返回一个函数时;a = new Parent(); a 是 Parent返回的函数
    expect(_new(Parent, 'Yvette', 22)()).toEqual(new Parent('Yvette', 22)());   
});
