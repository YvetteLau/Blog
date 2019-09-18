import React, { Component } from 'react';
import store from '../store';
import actions from '../store/actions/theme';
window.store = store;

export default class Pannel extends Component {
    constructor() {
        super();
        this.state = {
            color: store.getState().theme
        }
    }
    componentDidMount() {
        this.unsub = store.subscribe(() => {
            this.setState({
                color: store.getState().theme
            });
        });
    }
    render() {
        return (
            <>
                <div id="header" style={this.state.color}>
                    前端宇宙
                </div>
                <div id="main">
                    <div id="content" style={this.state.color}>大家好，我是前端宇宙作者刘小夕</div>
                    <button 
                        className="change-theme" 
                        id="to-blue"
                        onClick={() => {
                            store.dispatch(actions.changeColor('rgb(0, 51, 254)'));
                        }}
                    >
                        Blue
                    </button>
                    <button 
                        className="change-theme" 
                        id="to-pink"
                        onClick={() => {
                            store.dispatch(actions.changeColor('rgb(247, 109, 132)'));
                        }}
                    >
                        Pink
                    </button>
                </div>
            </>
        )
    }
    componentWillUnmount() {
        this.unsub();
    }
}