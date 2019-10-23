import React from 'react';
import ReactDOM from 'react-dom';
import C from './c';
class B extends React.Component{
    render(){
        return <C/>
    }
}

export default B


const request = ()=>{
    return new Promise((resolve,reject)=>{
        return resolve('ok');
    })
}

request()
    .then(data=>{
        console.log('data');
    })

// export const b = () => { 
//     console.log('World');
// }


