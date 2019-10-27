import React, { Component } from 'react';
import HOC from './2HOC';

@HOC
export default class D extends Component {
    
    render() {
        return (
            <p {...this.props }>
                D组件 -- p
            </p>
        )
    }
}

