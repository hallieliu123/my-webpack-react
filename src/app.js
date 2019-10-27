import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter,IndexRoute,Link,Route,Switch,Redirect} from 'react-router-dom';
import Home from './Home';



ReactDOM.render(
    <BrowserRouter>
        <Route path='/' exact component={ Home } /> 
    </BrowserRouter>,
    document.getElementById('app')
);

/* if(module.hot){ // webpack 实现js的hmr需要使用 react-hot-loader
    module.hot.accept('./b',function(){  
        document.getElementsByClassName('test')[0].innerHTML='456';
    });
} */




