import reducer from './reducers';
import reduxLogger from 'redux-logger';
import { createStore, applyMiddleware } from '../redux';
/**
 * state = {
 *    counter: {
 *       number: XXX
 *    }
 * }
 */

let store = createStore(reducer);

export default applyMiddleware(reduxLogger)(createStore)(reducer);