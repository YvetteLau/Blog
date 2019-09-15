import * as actionTypes from '../actionTypes';

const actions = {
    add(number) {
        return {
            type: actionTypes.INCREMENT,
            number
        }
    },
    minus(number) {
        return {
            type: actionTypes.DECREMENT,
            number
        }
    }
}

export default actions;