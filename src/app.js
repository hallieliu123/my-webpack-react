import React from 'react';
import ReactDOM from 'react-dom';
// import axios from 'axios';

import C from './c';
import B from './b';









// import { a } from './a';  // webpack 自身就能编译es6 module，不需要任何loaderss
// import { b } from './b';

// a();
// b();

import './common/css/main.css'; 

// import 'font-awesome/css/font-awesome.css';  // 引入font-awesome, 全局使用，不能模块化
// import main from './common/css/main.css';  // css 模块化
// console.log('main->',main);

// import './common/css/main.scss'; // 为模块化时
// import M from './common/css/main.scss';  // 模块化时
// console.log('M->',M)


// import view1 from './common/img/1.jpg'; // 引入图片的方式
// import view2 from './common/img/2.gif';
// import view3 from './common/img/3.jpeg';

// const test  = () => {
//     console.log('hello');
// }
// test();

// const test1 = () => {
//     axios.get('/api/info')
//         .then( data => {
//             console.log('data--->',data);
//         })
// }

// let obj = {a:'1',b:'2'};
// console.log({...obj,c:'3'});

// class A{}
// console.log(new A());


// console.log('a-->',a);
// let Com = a.Com;


ReactDOM.render(
    // <div>React</div>,
    <div>  
        {/* <button onClick={ test1 }>test</button> */}
        {/* <div className='fa-bicycle'>React!</div> */}
        <div className='test'>123!</div>
        <B />
        {/* <img src={ view1 } />
        <img src={ view2 } />
        <img src={ view3 } /> */}
    </div>,
    document.getElementById('app')
);

// <div>   // 引入图片的方式
//     <img src={ view1 } />
//     <img src={ view2 } />
//     <img src={ view3 } />
// </div>,

// <div className='bicycle'>React!</div>,  // 引入字体  

// <div className='fa-bicycle'>React!</div>,  // 使用第三方图标，字体  

//<span className='prod'>你好</span>

{/* <div className={main.ot}>
<div className='fa-bicycle'></div>
React
<span id={main.hell}>HELLO</span>
<span className={M.prod}>你好</span>
</div> */}


if(module.hot){
    module.hot.accept('./b',function(){  // 第一个参数是引入的路径(注意是引入过的路径)，第二个参数是改变后要做的行为
        document.getElementsByClassName('test')[0].innerHTML='456';
    });
}
