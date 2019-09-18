export default function combineReducers(reducers) {
    return function combination(state={}, action) {
        let nextState = {};
        let hasChanged = false; //状态是否改变
        for(let key in reducers) {
            const previousStateForKey = state[key];
            const nextStateForKey = reducers[key](previousStateForKey, action);
            nextState[key] = nextStateForKey;
            //只有所有的 nextStateForKey 均与 previousStateForKey 相等时，hasChanged 的值 false
            hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
        }
        //state 没有改变时，返回原对象
        return hasChanged ? nextState : state;
    }
}

