import { createStore, applyMiddleware } from '../redux';
import reduxLogger from 'redux-logger';
import reducer from './reducers';

export default applyMiddleware(reduxLogger)(createStore)(reducer);