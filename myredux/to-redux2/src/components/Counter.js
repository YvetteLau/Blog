import React, { Component } from 'react';
import store from '../store';
import actions from '../store/actions/counter';

export default class Counter extends Component {
    constructor() {
        super();
        this.state = {
            number: store.getState().counter.number
        }
    }
    componentDidMount() {
        this.unsub = store.subscribe(()=>{
            this.setState({
                number: store.getState().counter.number
            })
        })
    }
    render() {
        return (
            <div>
                <button 
                    className="counter"
                    onClick={()=>{
                        store.dispatch(actions.add(2));
                    }}
                >
                    +
                </button>
                <span>{this.state.number}</span>
                <button 
                    className="counter"
                    onClick={()=>{
                        store.dispatch(actions.minus(2));
                    }}
                >
                    -
                </button>
            </div>
        )
    }
    componentWillUnmount() {
        this.unsub();
    }
}