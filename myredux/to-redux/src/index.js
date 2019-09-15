function createStore(reducer) {
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

const initialState = {
    color: 'blue'
}

function reducer(state = initialState, action) {
    switch (action.type) {
        case 'CHANGE_COLOR':
            return {
                ...state,
                color: action.color
            }
        default:
            return state;
    }
}
const store = createStore(reducer);

function renderApp(state) {
    console.log(state)
    renderHeader(state);
    renderContent(state);
}
function renderHeader(state) {
    const header = document.getElementById('header');
    header.style.color = state.color;
}
function renderContent(state) {
    const content = document.getElementById('content');
    content.style.color = state.color;
}

document.getElementById('to-blue').onclick = function () {
    store.dispatch({
        type: 'CHANGE_COLOR',
        color: 'rgb(0, 51, 254)'
    });
    // unsub();
}
document.getElementById('to-pink').onclick = function () {
    store.dispatch({
        type: 'CHANGE_COLOR',
        color: 'rgb(247, 109, 132)'
    });
}

renderApp(store.getState());
var unsub = store.subscribe(() => renderApp(store.getState()));