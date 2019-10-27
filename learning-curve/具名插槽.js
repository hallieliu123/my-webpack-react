import React, { Component } from 'react';

function Test(props) {
    return (
        <div>
           <div>公共header</div>
           { props.children.first }
           <div>公共中间部分</div>
           { props.children.last }
           <div>公共footer</div>
        </div>
    )
}

export default class Home extends Component {    
    render() {
        return (
            <div>
                <Test>
                    {
                        {
                            first: (<div>first 可能是组件</div>),
                            last: (<div>last 可能是组件</div>)
                        }
                    }
                </Test>   
            </div>
        )
    }
}







