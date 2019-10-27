import React, { Component } from 'react';
import HOC from './2HOC';

@HOC
export default class C extends Component {
    
    render() {
        return (
            <div {...this.props }>
                C组件 -- div
            </div>
        )
    }
}

