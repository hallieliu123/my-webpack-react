import React,{ useState,useEffect } from 'react';

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
    let [fruit,setFruit] = useState('');
    let [fruits,setFruits] = useState([]);
    useEffect( async ()=>{  // 组件初始化时就会执行一次副作用操作
        console.log('fruit');
        setTimeout(()=>{
            setFruits(['香蕉','苹果','西瓜','菠萝']);
        },3000);
    },[fruit]); // 副作用依赖项，只要依赖改变就会执行副作用操作  
    
    return (
        <div>
            <AddFruit add={ (name)=>setFruits([...fruits,name]) } />
            <div>{ fruit ? `您选择了: ${ fruit }` : `请选择您喜欢的水果: ` }</div>
            <FruitsList fruits={ fruits } selectFruit={ setFruit } />
        </div>
    )
}

export default componentName








