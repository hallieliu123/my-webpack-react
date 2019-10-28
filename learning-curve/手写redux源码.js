
// redux 功能
// 1.提供一个store,存储状态
// 2.提供获取状态的方法,getState
// 3.提供派发action的方法dispatch
// 4.提供订阅功能

export function createStore(reducer,enhancer){
    if(enhancer){
        return enhancer(createStore)(reducer);
    }   
    let state = undefined;
    let fns = [];

    function getState(){
        return state;
    }

    function dispatch(action){
        state = reducer(state,action);
        fns.forEach( fn => fn());
        return action   //  返回给中间件
    }

    function subscribe(callback){
        fns.push(callback);
    }

    dispatch({ type: 'MYREDUCE' })
    return {
        getState,
        dispatch,
        subscribe
    }

} 
// 中间件功能
// 增强dipatch方法,dispatch提交action后，先执行一系列中间件再发到reducer更改状态
export const applyMiddleware = (...middlewares) => {
    return createStore => {
        return reducer => {
            let store = createStore(reducer);
            // 给中间件注入{getState,dispatch}
            let funcs = middlewares.map(middleware=>middleware({
                getState: store.getState,
                dispatch: store.dispatch
            }));
            // 获得增强后的dipatch
            let dispatch = compose(...funcs)(store.dispatch);
            return {
                ...store,
                dispatch
            }
        }
    }
}

function compose(...funcs){ // [fn1,fn2,fn3] 
    if(funcs.length === 0){ // 没有实际应用意义
        return (...args) => args;
    }
    if(funcs.length === 1){ // 没有实际应用意义
        return funcs[0]
    }
    return funcs.reduce((prev,cur)=> (...args) => prev(cur(...args)) );  
}  




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
