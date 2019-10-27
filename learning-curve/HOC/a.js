import React, { Component } from 'react';
import HOC from './1HOC';

@HOC
export default class A extends Component {
    
    render() {
        return (
            <div>
                A组件
                <input type='text' value= { this.props.value } onChange={ this.props.handleChange } />
            </div>
        )
    }
}

