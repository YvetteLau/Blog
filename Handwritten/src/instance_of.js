export default function instance_of(L, R) {
    let prototype = R.prototype;
    L = L.__proto__;
    while (true) {
        if (L === prototype) {
            return true;
        } else if (L === null) {
            //Object.__proto__.__proto__ === null；原型链的顶端
            return false
        }
        L = L.__proto__;
    }
}