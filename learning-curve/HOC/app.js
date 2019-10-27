import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter,IndexRoute,Link,Route,Switch,Redirect} from 'react-router-dom';
// import Home from './Home';
import Home from './index';
import Category from './category';
import Cart from './cart';
import User from './user';


ReactDOM.render(
    <BrowserRouter>
        <Route path='/category' component={ Category } /> 
        <Route path='/cart' component={ Cart } /> 
        <Route path='/user' component={ User } /> 
        <Route path='/' exact component={ Home } /> 
    </BrowserRouter>,
    document.getElementById('app')
);

/* if(module.hot){ // webpack 实现js的hmr需要使用 react-hot-loader
    module.hot.accept('./b',function(){  
        document.getElementsByClassName('test')[0].innerHTML='456';
    });
} */




