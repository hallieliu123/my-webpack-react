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
    static getDerivedStateFromProps(nextProps,prevState){
        log('2 getDerivedStateFromProps');
        // props有变化的时候是nextProps，自身状态更新的时候还是原来的props，所以处理要小心
        return null
    }
    componentDidMount(){
        log('4 componentDidMount');

        // setTimeout(()=>{
        //     this.setState((state,props)=>({title: 'Product' }));
        // },3000)
    }
    shouldComponentUpdate(nextProps,nextState){
        log('5 shouldComponentUpdate');
        // if( nextState.title == this.state.title && nextProps.data == this.props.data){
        //     log('判断不用更新');
            // return false
        // }
        return true
    }
    
    componentDidUpdate(prevProps,prevState){
        log('6 componentDidUpdate,上一个是 3');
    }

    render(){
        log('3 render');
        return <div> { this.state.title } - list - { this.props.data }</div>
    }
}





setTimeout(() => { 
    console.log("A"); 
    Promise.resolve().then(() => { 
      console.log("B"); 
    }); 
  }, 1000); 
  Promise.resolve().then(() => { 
    console.log("C"); 
  }); 
  new Promise((resolve) => { 
    console.log("D"); 
    resolve(""); 
  }).then(() => { 
    console.log("E"); 
  }); 
  async function sum(a, b) { 
    console.log("F"); 
  } 
  async function asyncSum(a, b) { 
    await Promise.resolve(); 
    console.log("G"); 
    return Promise.resolve(a + b); 
  }
  sum(3, 4); 
  asyncSum(3, 4); 
  console.log("H");

  // D, F, H, C, E, G, A, B

