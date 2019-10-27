import React from 'react';

function Test(props){
    return (
        <div>
            <div>公共header</div>
            { props.children }
            <div>公共footer</div>
        </div>
    )
}


export default class Home extends Component {    
    render() {
        return (
            <div>
                <Test>
                   <div>可能是组件</div>
                   <div>可能是 react element</div>
                </Test>   
            </div>
        )
    }
}