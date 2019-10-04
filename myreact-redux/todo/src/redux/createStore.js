export default function createStore(reducer) {
    let state;
    let listeners = [];
    const getState = () => state;
    const subscribe = (ln) => {
        listeners.push(ln);
        //订阅之后，也要允许取消订阅。不能只准订，不准退~
        const unsubscribe = () => {
            listeners = listeners.filter(listener => ln !== listener);
        }
        return unsubscribe;
    };
    const dispatch = (action) => {
        //reducer(state, action) 返回一个新状态
        state = reducer(state, action);
        listeners.forEach(ln => ln());
    }
    //你要是有个 action 的 type 的值正好和 `@@redux/__INIT__${Math.random()}` 相等，我敬你是个狠人
    dispatch({ type: `@@redux/__INIT__${Math.random()}` });

    return {
        getState,
        dispatch,
        subscribe
    }
}