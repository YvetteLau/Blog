import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';
import { store, newactions } from './store';

class Counter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            number: store.getState().number
        }
        store.subscribe(()=>{
            this.setState({
                number: store.getState().number
            });
        })
    }
    render() {
        return (
            <div>
                <p>{this.state.number}</p>
                <button onClick={() => newactions.add(2)}>+</button>
                <button onClick={() => newactions.minus(3)}>-</button>
            </div>
        )
    }
}


ReactDOM.render(<Counter />, document.getElementById('root'));