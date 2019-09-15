import actions from '../actions';
import * as actionTypes from '../actionTypes';

function reducer(state = {number: 0}, action) {
    switch(action.type) {
        case actionTypes.INCREMENT:
            return {
                ...state,
                number: state.number + action.number
            }
        case actionTypes.DECREMENT:
            return {
                ...state,
                number: state.number - action.number
            }
        default:
            return state;
    }
}

export default reducer;