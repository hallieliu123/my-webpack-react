import React,{ Component }  from 'react';
import PropTypes from 'prop-types';

export class MyProvider extends Component {
    static childContextTypes = {
        store: PropTypes.object
    }
    constructor(props,context){
        super(props,context);
        this.store = props.store;
    }
    getChildContext(){ // 使子组件可以通过this.context.store拿到store
        return { store: this.store }
    }
    render(){
        return this.props.children
    }
}


// connect(mapStateToProps,mapDispatchToProps)(wrappedComponent);

export const connect = (mapStateToProps,mapDispatchToProps) => (WrappedComponent) => class ComponentName extends Component{
    static contextTypes = {
        store: PropTypes.object
    }
    constructor(props,context){
        super(props,context);
        this.state = {};
    }
    componentDidMount(){
        const store = this.context.store;
        console.log('this.context--->',this.context);
        this.update(); // 初始化一次
        store.subscribe(this.update)
    }
    update(){
        const store = this.context.store;
        const stateProps = mapStateToProps(store.getState());
        const dipatchProps = bindActionCreators(mapDispatchToProps,store.dipatch);
        this.setState({
            ...this.state,
            ...stateProps,
            dipatchProps
        });
    }
    render(){
        return <WrappedComponent {...this.state }></WrappedComponent>
    }
}



export function bindActionCreator(creator,dipatch){
    return (...args) => dispatch(creator(...args));
}

export function bindActionCreators(creators,dipatch){
    return Object.keys(creators).reduce((prev,cur)=>{
        prev[key] = bindActionCreator(cur,dipatch)
        return prev;
    },{});
}












