import * as types from '../action-types';

export default function todos(state = [], action) {
    switch (action.type) {
        case types.ADD_TODO:
            return [
                ...state,
                {
                    text: action.text,
                    completed: false
                }
            ]
        case types.TOGGLE_TODO:
            return state.map((todo, index) => {
                return action.index === index ?
                    {
                        ...todo,
                        completed: !todo.completed
                    } :
                    todo
            })
        default:
            return state;
    }
}
