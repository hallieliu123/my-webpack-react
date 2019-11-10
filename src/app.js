import React from 'react';
import ReactDOM from 'react-dom';
import { createStore,applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux'; 
import { BrowserRouter,Link,Route,Switch,Redirect} from 'react-router-dom';
import Home from './component/Home';
// import Test from './component/Test';
// import reducers from './reducer';

function Mgt({ history,match,location }){
    return <div>
                <h4>management</h4>
                <button onClick={ history.goBack }>后退</button>
            </div>
}

function Brand({ history,match,location }){
    return <div>
                <h4>{ match.params.brand }</h4>
                <button onClick={ history.goBack }>后退</button>
            </div>
}
function Account({ history,match,location }){
    return <div>
                <h3>My Account</h3>
            </div>
}

function Login(props){
    console.log('props->',props);
    return <div>
                <h3>Login</h3>
                <button onClick={ () => props.history.push('management') }>跳转</button>
            </div>
}

function PrivateRoute({ component: Component,isLogin,...rest}){
    return <Route { ...rest } render={ props => isLogin ? <Component /> : <Redirect to={{pathname: '/login',state:{redirect: props.location.pathname } }} />} />
}

// 路由事件对象  
// 动态路由      
// 路由守卫   
ReactDOM.render(
    <BrowserRouter>
        <nav>
            <Link to='/'>首页</Link>
            <span> | </span>
            <Link to='/management'>管理</Link>
            <span> | </span>
            <Link to='/detail/sephora'>丝芙兰详情</Link>
            <span> | </span>
            <Link to='/myaccount'>我的</Link>
        </nav>
        <Route path='/' exact component={ Home } />
        <Route path='/management' component={ Mgt } />
        <Route path='/detail/:brand' component={ Brand } />
        <Route path='/login' component={ Login } />
        <PrivateRoute path='/myaccount' component={ Account } />
    </BrowserRouter>,
    document.getElementById('app')
)

/* if(module.hot){ // webpack 实现js的hmr需要使用 react-hot-loader
    module.hot.accept('./b',function(){  
        document.getElementsByClassName('test')[0].innerHTML='456';
    });
} */










