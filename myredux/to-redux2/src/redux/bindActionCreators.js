function bindActionCreator(actionCreator, dispatch) {
    return (...args) => dispatch(actionCreator(...args));
}
function bindActionCreators(actionCreator, dispatch) {
    //actionCreators 可以是一个普通函数或者是一个对象
    if (typeof actionCreator === 'function') {
        //如果是函数，返回一个函数，调用时，dispatch 这个函数的返回值
        bindActionCreator(actionCreator, dispatch);
    } else if (typeof actionCreator === 'object') {
        //如果是一个对象，那么对象的每一项都要都要返回 bindActionCreator
        const boundActionCreators = {}
        for (let key in actionCreator) {
            boundActionCreators[key] = bindActionCreator(actionCreator[key], dispatch);
        }
        return boundActionCreators;
    }
}

export default bindActionCreators;