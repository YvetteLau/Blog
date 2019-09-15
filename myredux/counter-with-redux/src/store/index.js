import {createStore, bindActionCreators} from 'redux';
import reducers from './reducers';
import actions from './actions';

let store = createStore(reducers);
let newactions = bindActionCreators(actions, store.dispatch);


export {
    store,
    newactions
};