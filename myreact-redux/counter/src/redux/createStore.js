export default function createStore(reducer, preloadState, enhancer) {
    let state;
    let listeners = [];
    
    const dispatch = action => {
        state = reducer(state, action);
        listeners.forEach(ln => ln());
    }
    const getState = () => {
        return state
    };
    const subscribe = listen => {
        listeners.push(listen);
        return function unsubscribe() {
            listeners = listeners.filter(ln => ln !== listen);
            return listeners;
        }
    }
    dispatch({type: '@@REDUX/__INIT__'});
    return {
        getState,
        dispatch,
        subscribe
    }
}