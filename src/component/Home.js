import React, { Component } from 'react'
import { connect, } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as home from '../actions/home';

@connect(
    state=>({
        a: state.a
    }),
    {
        add: ()=>({type: 'add',value: 1 }),
    }
)
class Home extends Component {
    handleClick(){
        this.props.add();
    }
    render() {
        return (
            <div onClick={ this.handleClick.bind(this) }>
                { this.props.a.value }
            </div>
        )
    }
}

export default Home;

// connect(
//     state=>({
//         a: state.a,
//         b: state.b
//     }),
//     dispatch=>({
//         home:bindActionCreators(home,dispatch)
//     })
// )(Home);


