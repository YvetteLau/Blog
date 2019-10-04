const applyMiddleware = (...middlewares) => createStore => (...args) => {
    let store = createStore(...args);
    let dispatch;
    const middlewareAPI = {
        getState: store.getState,
        dispatch: (...args) => dispatch(...args)
    }
    let middles = middlewares.map(middle => middle(middlewareAPI));
    dispatch = middles.reduceRight((prev, current) => current(prev), store.dispatch);
    return {
        ...store,
        dispatch
    }
}

export default applyMiddleware;