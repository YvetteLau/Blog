import { INCRENENT, DECREMENT } from '../action-types';

const counter = {
    add(number) {
        return {
            type: INCRENENT,
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