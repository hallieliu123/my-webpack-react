import React, { Component } from 'react';
//import axios from 'axios';
// import { connect, } from 'react-redux';
// import { connect } from '../myProvider-myConnect';
// import { bindActionCreators } from 'redux';
// import * as home from '../actions/home';

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            time: new Date().toLocaleTimeString(),
            counter: 0
        };
    }
    test = () => {
        this.setState({counter: this.state.counter + 1});
        this.setState({counter: this.state.counter + 1});
        console.log('click setState', this.state.counter); // 0, 以上也会被合并执行
    }
    componentDidMount() {
        // this.myTimer = setInterval(()=>{
        //     this.setState({time: new Date().toLocaleTimeString()});
        // }, 1000);
        
        // this.setState({ counter: this.state.counter + 1}, ()=>{ console.log('setState 1',this.state.counter);}); // 1
        // this.setState({ counter: this.state.counter + 1}, ()=>{ console.log('setState 2',this.state.counter);}); // 1
        // this.setState({ counter: this.state.counter + 1}, ()=>{ console.log('setState 3',this.state.counter);}); // 1
        // console.log('this.state.counter--->', this.state.counter); // 0

        // this.setState((state, props)=>{return {counter: state.counter + 1}},()=>{ console.log('setState 函数式 1',this.state.counter);}); // 3
        // this.setState((state, props)=>{return {counter: state.counter + 1}},()=>{ console.log('setState 函数式 1',this.state.counter);}); // 3
        // this.setState((state, props)=>{return {counter: state.counter + 1}},()=>{ console.log('setState 函数式 1',this.state.counter);}); // 3
        // console.log('this.state.counter-函数式后-->', this.state.counter); // 0

        // setTimeout(()=>{
        //     console.log('setTimeout-->', this.state.counter); // 3
        // });

        
        setTimeout(()=>{
            this.setState({counter: this.state.counter + 1}, ()=>{
                console.log('callback...');
            });
            console.log('setTimeout');
        },0);
    }
    componentDidUpdate() {
        console.log('did update...');
    }
    // componentWillUnmount() {
        // this.myTimer && clearInterval(this.myTimer);
    // }
    render() {
        console.log('render...');
        return (
            <div onClick={this.test}>
                <h1> HOME </h1>
                {this.state.time}
                <p>counter: {this.state.counter}</p>
            </div>
        )
    }
}

export default Home;









