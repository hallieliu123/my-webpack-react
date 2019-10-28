import React, { Component } from 'react';
import { connect } from '../myProvider-myConnect';

@connect(
    state=>({
        a: state.value
    }),
    {
        test: () => (dispatch,getState) => {dispatch({type:'add',value: 1})}
    }
)
class componentName extends Component {
    handleClick(){
       this.props.test();
    }
    render() {
        return (
            <div onClick={ this.handleClick.bind(this) }>
                123
                { this.props.a }
            </div>
        )
    }
}

export default componentName;