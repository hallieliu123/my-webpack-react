// redux 功能
// 1提供存储状态的功能
// 2提供获取状态的功能
// 3提供修改状态的功能
// 4提供订阅功能
// 5处理中间件功能

export function createStore(reducer,enhancer){
    if(enhancer){
        enhancer(createStore)(reducer);
    }   
    let state = undefined;
    let funcs = [];
    function getState(){
        return state;
    }
    function dispatch(action){
        state = reducer(state,action);
        funcs.forEach( func => func());
        return action; // 提供给中间件使用
    }
    function subscribe(callback){
        funcs.push(callback);
    }
    return {
        getState,
        dispatch,
        subscribe
    }
}

// 中间件功能
// 增强dipatch方法,dispatch提交action后，先执行一系列中间件再发到reducer更改状态
export function applyMiddleware(...middlewares){
    return createStore => reducer => {
        let store = createStore();
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

function compose(...funcs){

    return funcs.reduce((prev,cur)=>(...args)=>prev(cur(...args)));
}




const thunk = ({getState,dispatch}) => dispatch => action => {
    if(typeof action == 'function'){
        action(getState,dispatch);
    }
    return dispatch(action);
}



