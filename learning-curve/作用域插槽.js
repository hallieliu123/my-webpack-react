import React from 'react';

//什么作用域插槽，我绝对叫函数传参式插槽更容易理解

const data = [
    { name: 'Simon',content: 'Gay' },
    { name: 'Nick',content: 'Straight' }
];
function Com(props) {
    const { first,last } =  props.children(data[0]); // 里面children这个属性，里面不管是函数，组件还是对象，一个就是原来的数据，多个就自动组成数组
    return (
        <div>
            <div>公共header</div>
            { first }
            <div>公共中间部分</div>
            { last }
            <div>公共footer</div>
        </div>
    )
}

export default class Home extends Component {
    render() {
        return (
            <div>
                <Com>
                    {
                        ({name,content})=>(
                            {
                                first: (<div> { name } first 可能是组件 </div>),
                                last: (<div> { name } last 可能是组件 </div>)
                            }
                        )
                    }
                </Com>
            </div>
        )
    }
}