export default function compose(...fns) {
    if(fns.length === 0) {
        return args => args
    }
    if(fns.length === 1) {
        return fn[0];
    }
    return fns.reduce((a, b) => (...args) => a(b(...args)));
}
