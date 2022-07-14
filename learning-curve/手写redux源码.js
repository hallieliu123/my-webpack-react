
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
        return (args) => args;
    }
    if(funcs.length === 1){ // 没有实际应用意义
        return funcs[0];
    }
    return funcs.reduce((prev,cur)=> (...args) => cur(prev(...args))); // (args)=>fn2(fn1(args));   (dispatch)=>fn3(prev(dispatch))
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
    return dispatch => {  // 按照applyMiddleWare(myLogger,myThunk)顺序, 实际这里的dispatch是myLogger返回的action=>{}
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




// 要再练习
function combineReducer(reducers) {
    // 第一个只是先过滤一遍 把非function的reducer过滤掉
  const reducerKeys = Object.keys(reducers); 
  const finalReducers = {}
  reducerKeys.forEach((key) => {
      if(typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key]
      } 
  })
  const finalReducersKeys = Object.keys(finalReducers) // {home, category}
    // 第二步比较重要 就是将所有reducer合在一起
    // 根据key调用每个reducer，将他们的值合并在一起
    const nextState = {};
    return function combine(state={}, action) { // home: {counter: 1, name: 'sheldon'}
        let hasChange = false;
        finalReducersKeys.forEach((key) => {
            const previousValue = state[key]; // 有值了
            const nextValue = finalReducers[key](previousValue, action); // {counter: 1, name: 'Amy'}
            nextState[key] = nextValue;
            hasChange = hasChange || previousValue !== nextValue
        })
        return hasChange ? nextState : state;
    }
}
