import compose from './compose';

const applyMiddleware = (...middlewares) => createStore => (...args) => {
    let store = createStore(...args);
    let middles = middlewares.map(middleware => middleware(store));
    let dispatch = compose(...middles)(store.dispatch);
    return {
        ...store,
        dispatch
    }
}

export default applyMiddleware;