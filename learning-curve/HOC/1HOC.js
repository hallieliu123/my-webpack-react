import React, { Component } from 'react'

export default (WrappedComponent) => class componentName extends Component {
    constructor(props){
        super(props)
        this.state = {
            value: ''
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event){
        this.setState({value: event.target.value});
    }
    render() {
        return (
            <div>
                <div style={{width: '300px',height:'100px',border:'1px yellow solid'}}>
                    <WrappedComponent { ...this.props } value={ this.state.value } handleChange={ this.handleChange } />  
                </div>
            </div>
        )
    }
}









