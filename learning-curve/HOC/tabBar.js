import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './common/css/main.css';
const tabBars = [
    {src: require('../public/iconfonticon-shouye.png'),text: '首页',link: '/'},
    {src: require('../public/icon-category.png'),text: '分类',link: '/category'},
    {src: require('../public/icon-.png'),text: '购物车',link: '/cart'},
    {src: require('../public/aui-icon-my.png'),text: '我的',link: '/user'},
];

export default (WrappedComponent) => class TabBar extends Component {
    constructor(props){
        super(props);
        this.state = {
            index: 0
        }
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(index){
        this.setState({index: index });
    }
    render() {
        return (
            <div>
                <WrappedComponent />
                <ul className='container'>
                {
                    tabBars.map(
                        (item,index)=><Link to={{pathname: `${item.link}`}} key={ index } >
                                        <li 
                                            className={ this.state.index == index ? 'active' : ''} 
                                            onClick={ ()=>this.handleClick(index) }>
                                            <img src={ item.src } alt='' />
                                            <div>{ item.text }</div>
                                        </li>
                                    </Link>)
                }
            </ul>
            </div>
            
        )
    }
}

