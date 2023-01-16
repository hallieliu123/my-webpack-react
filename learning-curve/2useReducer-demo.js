import React from 'react';
import { useState,useEffect,useReducer } from 'react'; 

function fruitReducer(state,action){
    switch( action.type ){
        case 'add':
            return [...state,...action.value];
            case 'select':
            return action.value;
        default:  
            return state;  
    }
}

// 用起来确实轻便,舒服
function FruitsList({fruits,selectFruit}) {
    return (
        <ul>
            { 
                fruits.map((item,index)=>(<li key={index} onClick={ ()=>selectFruit(item) }>{ item }</li>))
            }
        </ul>
    )
}

function AddFruit({add}){
    let [name,setName] = useState('');
    const addFunc = (event) => {
        if(name && event.keyCode =='13'){
            add(name);
            setName('');
        }
    }
    return <input type='text' onChange={ (event)=>{ setName(event.target.value) } } value={ name } onKeyUp={ addFunc } />
}

function componentName() {
    // 所以这不是专业的写法
    let [fruit,setFruit] = useReducer(fruitReducer,'');
    let [fruits,setFruits] = useReducer(fruitReducer,[]);

    useEffect(()=>{  // 组件初始化时就会执行一次副作用操作
        console.log('fruit');
        setTimeout(()=>{
            setFruits({ type: 'add',value: ['香蕉','苹果','西瓜','菠萝'] });
        },3000);  
    },[]); // 副作用依赖项，只要依赖改变就会执行副作用操作   
    
    return (
        <div>
            <AddFruit add={ (name)=>setFruits({ type: 'add',value: [name] }) } />
            <div>{ fruit ? `您选择了: ${ fruit }` : `请选择您喜欢的水果: ` }</div>
            <FruitsList fruits={ fruits } selectFruit={ (fruit)=>setFruit({ type: 'select',value: fruit }) } />
        </div>
    )
}
function reFruitReducer(state, action) {
    switch( action.type ){
        case 'add':
            return {
                ...state,
                fruits: [
                    ...state.fruits,
                    ...action.value
                ]
            };
            case 'select':
            return {
                ...state,
                fruit: action.value
            }
        default:  
            return state;
    }
}
const initialState = {fruit: '', fruits: []};
function ReComponentName() {  // 没有做测试, 但这种写法才更贴合useReducer的用法
    let [state,dispatch] = useReducer(reFruitReducer, initialState);

    useEffect(()=>{  // 组件初始化时就会执行一次副作用操作
        console.log('fruit');
        setTimeout(()=>{
            dispatch({ type: 'add',value: ['香蕉','苹果','西瓜','菠萝'] });
        },3000);  
    },[]); // 副作用依赖项,只要依赖改变就会执行副作用操作
    
    return (
        <div>
            <AddFruit add={ (name)=>dispatch({ type: 'add',value: [name] }) } />
            <div>{ state.fruit ? `您选择了: ${ state.fruit }` : `请选择您喜欢的水果: ` }</div>
            <FruitsList fruits={ state.fruits } selectFruit={ (fruit)=>dispatch({ type: 'select',value: fruit }) } />
        </div>
    )
}

export default componentName


