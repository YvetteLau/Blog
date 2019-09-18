import counter from './counter';
import theme from './theme';
import {combineReducers} from '../../redux';

export default combineReducers({
    counter,
    theme
});;