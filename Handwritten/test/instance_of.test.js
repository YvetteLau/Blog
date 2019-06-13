import instance_of from '../src/instance_of';

test(' instance_of(L, R) ', () => {
    function A(){}
    function B(){}
    function C(){}
    A.prototype = new B();
    let a = new A();

    expect(instance_of({a:1}, Object)).toBe(true);
    expect(instance_of(A, Function)).toBe(A instanceof Function);
    expect(instance_of(a, C)).toBe(a instanceof C);
    expect(instance_of(a, A)).toBe(a instanceof A);
    expect(instance_of(a, B)).toBe(a instanceof B);
})
