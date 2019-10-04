import { INCREMENT, DECREMENT } from '../action-types';

function counter(state = { number: 0 }, action) {
    switch (action.type) {
        case INCREMENT:
            return {
                ...state,
                number: state.number + action.number
            }
        case DECREMENT:
            return {
                ...state,
                number: state.number - action.number
            }
        default:
            return state;
    }
}

export default counter;