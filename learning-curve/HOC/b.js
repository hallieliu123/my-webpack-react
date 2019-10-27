import React, { Component } from 'react';
import HOC from './1HOC';

@HOC
export default class B extends Component {
    render() {
        return (
            <div>
                B组件
                <input type='text' value= { this.props.value } onChange={ this.props.handleChange } />
            </div>
        )
    }
}

