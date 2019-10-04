import React, { Component } from 'react';
import { connect } from '../react-redux';

class Page extends Component {
    render() {
        console.log(this.props.store);
        return (
            <div>Page</div>
        )
    }
}

export default connect(()=>({}), ()=>({}))(Page);