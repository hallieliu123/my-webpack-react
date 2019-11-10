import React, { Component } from 'react'



export default (WrappedComponent) => class componentName extends WrappedComponent {
    render() {
        let el = super.render();
        console.log(el);
        let newStyle = {
            style:{
                color: el.type == 'div' ? 'red' : 'blue'
            }
        }
        return <div style={{width: '300px',height:'100px',border:'1px yellow solid'}}>
                    { React.cloneElement(el,{...this.props,...newStyle },el.props.children) }
                </div>
    }
}











