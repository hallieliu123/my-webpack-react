import React from 'react';
import { useState,useEffect,useContext } from 'react';

const context = React.createContext();
const Provider = context.Provider;

function FruitsList() {
    let { fruits,setFruit } = useContext(context);
    return (
        <ul>
            { 
                fruits.map((item,index)=>(<li key={index} onClick={ ()=>setFruit(item) }>{ item }</li>))
            }
        </ul>
    )
}

function AddFruit(){
    let [name,setName] = useState('');
    console.log('useContext->',useContext(context));
    let { fruits,setFruits } = useContext(context);
    const addFunc = (event) => {
        if(name && event.keyCode =='13'){
            setFruits([...fruits,name]);
            setName('');
        }
    }
    return <input type='text' onChange={ (event)=>{ setName(event.target.value) } } value={ name } onKeyUp={ addFunc } />
}

function componentName() {
    let [fruit,setFruit] = useState('');
    let [fruits,setFruits] = useState([]);
    useEffect(()=>{  // 组件初始化时就会执行一次副作用操作
        console.log('fruit');
        setTimeout(()=>{
            setFruits(['香蕉','苹果','西瓜','菠萝']);
        },3000);
    },[fruit]); // 副作用依赖项，只要依赖改变就会执行副作用操作  
    
    return (
        <Provider value={{ fruit,fruits,setFruit,setFruits }}>
            <div>
                <AddFruit />
                <div>{ fruit ? `您选择了: ${ fruit }` : `请选择您喜欢的水果: ` }</div>
                <FruitsList />
            </div>
        </Provider>
    )
}

export default componentName








