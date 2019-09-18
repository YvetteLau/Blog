import { INCRENENT, DECREMENT } from '../action-types';

export default function counter(state={number: 0}, action) {
    switch (action.type) {
        case INCRENENT:
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