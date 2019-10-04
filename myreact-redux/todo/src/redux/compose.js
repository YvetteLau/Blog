export default function compose(...funcs) {
    //如果没有中间件
    if (funcs.length === 0) {
        return arg => arg
    }
    //中间件长度为1
    if (funcs.length === 1) {
        return funcs[0]
    }

    return funcs.reduce((prev, current) => (...args) => prev(current(...args)));
}