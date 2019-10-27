import React from 'react';
const { log } = console;
export default class Product extends React.Component{
    constructor(props){
        super(props);
        log('1 constructor');
        this.state = {
            title: 'Product'
        };
    }
    componentWillMount(){
        log('2 componentWillMount');
    }
    componentWillUnmount(){
        log('组件被卸载componentWillUnmount');
    }
    componentDidMount(){
        log('4 componentDidMount');

        setTimeout(()=>{
            this.setState((state,props)=>({title: 'Product' }));
        },3000)
    }
    componentWillReceiveProps(nextProps,nextState){ 
        log('5之前的一步 componentWillReceiveProps');
    }
    shouldComponentUpdate(nextProps,nextState){
        log('5 shouldComponentUpdate');
        if( nextState.title == this.state.title && nextProps.data == this.props.data){
            log('判断不用更新');
            return false
        }
        return true
    }
    componentWillUpdate(nextProps,nextState){
        log('6 componentWillUpdate');
    }
    componentDidUpdate(prevProps,prevState){
        log(' 7 componentDidUpdate,上一个是 3');
    }
    render(){
        log('3 render');
        return <div> { this.state.title } - list - { this.props.data }</div>
    }
}
