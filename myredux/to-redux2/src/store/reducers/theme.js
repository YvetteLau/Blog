import { CHANGE_COLOR } from '../action-types';

export default function theme(state = {color: 'blue'}, action) {
    switch (action.type) {
        case CHANGE_COLOR:
            return {
                ...state,
                color: action.color
            }
        default:
            return state;
    }
}