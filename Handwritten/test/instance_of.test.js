import instance_of from '../src/instance_of';

test(' instance_of(L, R) ', () => {
    function A(){}
    function B(){}
    function C(){}
    A.prototype = new B();
    let a = new A();

    expect(instance_of({a:1}, Object)).toEqual(true);
    expect(instance_of(A, Function)).toEqual(A instanceof Function);

    let result1 = instance_of(a, C);
    let correct1 = a instanceof C;
    expect(result1).toEqual(correct1);

    let result2 = instance_of(a, A);
    let correct2 = a instanceof A;
    expect(result2).toEqual(correct2);

    let result3 = instance_of(a, B);
    let correct3 = a instanceof B;
    expect(result3).toEqual(correct3);
})
