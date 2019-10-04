import React, { Component } from 'react';
import storeShape from '../utils/storeShape';

export default class Provider extends Component {
    static childContextTypes = {
        store: storeShape.isRequired
    }
    
    constructor(props) {
        super(props);
        this.store = props.store;
    }

    getChildContext() {
        return {
            store: this.store
        }
    }

    render() {
        /**
         * 早前返回的是 return Children.only(this.props.children)
         * 导致Provider只能包裹一个子组件，后来取消了此限制
         * 因此此处，我们直接返回 this.props.children
         */
        return this.props.children
    }
}