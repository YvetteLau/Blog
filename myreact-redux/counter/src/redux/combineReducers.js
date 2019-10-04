export default function combineReducers(reducers) {
    //返回 reducer
    return function combination(state = {}, action) {
        let hasChanged = false;
        let nextState = {};
        for(let key in reducers) {
            const previousStateForKey = state[key];
            const nextStateForKey = reducers[key](previousStateForKey, action);
            nextState[key] = nextStateForKey;
            hasChanged = hasChanged || previousStateForKey !== nextStateForKey;
        }
        return hasChanged ? nextState : state;
    }
}