import React from 'react';
import ReactDOM from 'react-dom';
// import { createStore,applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
// import { Provider } from 'react-redux'; 
import { BrowserRouter,Link,Route,Switch,Redirect} from 'react-router-dom';
import reducers from './reducer';
// import Home from './component/Home';
import Test from './component/Test';

import { createStore,applyMiddleware } from './myRedux';
import { MyProvider } from './myProvider-myConnect';

// middleware中间件的功能:
const myLogger = ({getState,dispatch}) => {
    console.log('myLogger 1');
    return dispatch => {
        console.log('myLogger 2');
        return action => {
            console.log('action.type-->',action.type);
            console.log('myLogger 3');
            return dispatch(action);
        }
    }
}
const myThunk = ({getState,dispatch}) => { 
    console.log('myThunk 1');
    return dispatch => {  
        console.log('myThunk 2');  
        return action => {
            console.log('myThunk 3');
            if(typeof action === 'function'){
                return action(dispatch,getState);
            }
            return dispatch(action);
        }
    }
}
const store = createStore(
    reducers,
    applyMiddleware(myThunk,myLogger)
);

ReactDOM.render(
    <MyProvider>
        <BrowserRouter>
            <Route path='/abc' exact component={ Test } />
        </BrowserRouter>
    </MyProvider>,
    document.getElementById('app')
)
/**
 * 
 */

/* if(module.hot){ // webpack 实现js的hmr需要使用 react-hot-loader
    module.hot.accept('./b',function(){  
        document.getElementsByClassName('test')[0].innerHTML='456';
    });
} */

/**
 * * react-redux
 const store = createStore(
    reducers,
    // applyMiddleware(thunk)
);
 <Provider store={ store }>
    <BrowserRouter>
        <Route path='/' exact component={ Home } />
    </BrowserRouter>
</Provider>
ReactDOM.render(  
    <BrowserRouter>
        <Route path='/abc' exact component={ Test } />
    </BrowserRouter>,
    document.getElementById('app')
);
 */











