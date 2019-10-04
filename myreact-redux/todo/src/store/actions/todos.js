import * as types from '../action-types';

const todos = {
    addTodo(text) {
        return {
            type: types.ADD_TODO,
            text
        }
    },
    toggleTodo(index) {
        return {
            type: types.TOGGLE_TODO,
            index
        }
    }
}

export default todos;