import { INCREMENT, DECREMENT } from '../action-types';

const counter = {
    add(number) {
        return {
            type: INCREMENT,
            number
        }
    },
    minus(number) {
        return {
            type: DECREMENT,
            number
        }
    }
}

export default counter;