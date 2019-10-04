import React from 'react';
import store from '../store';
import actions from '../store/actions/counter';
/**
 * reducer 是 combineReducer({counter, ...})
 * state 的结构为 
 * {
 *      counter: {number: 0},
 *      ....
 * }
 */
class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            number: store.getState().counter.number
        }
    }
    componentDidMount() {
        this.unsub = store.subscribe(() => {
            if(this.state.number === store.getState().counter.number) {
                return;
           	}
            this.setState({
                number: store.getState().counter.number
            });
        });
    }
    render() {
        return (
            <div>
                <p>{`number: ${this.state.number}`}</p>
                <button onClick={() => {store.dispatch(actions.add(2))}}>+</button>
                <button onClick={() => {store.dispatch(actions.minus(2))}}>-</button>
            <div>
        )
    }
    componentWillUnmount() {
        this.unsub();
    }
}