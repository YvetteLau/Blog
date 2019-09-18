import { CHANGE_COLOR } from '../action-types';

let theme = {
    changeColor(color) {
        return {
            type: CHANGE_COLOR,
            color
        }
    }
}

export default theme;