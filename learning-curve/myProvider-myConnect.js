import React,{ Component }  from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from '../../../../Library/Caches/typescript/3.6/node_modules/redux';

export class MyProvider extends Component{
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
/**
 * const mapStateToProps = state => ({
 *     home: state.home
 * })
 * const mapDispatchToProps = dispatch => ({
 *      add,
 *      logig
 * })
 * const mapDispatchToProps = dispatch => ({
 *      category: bindActionCreators(categoryActions, dispatch)
 * })
 */
export const connect = (mapStateToProps,mapDispatchToProps) => (wrappedComponent) => class ComponentName extends Component{
    static contextTypes = {
        store: PropTypes.object
    }
    constructor(props){
        super(props);
        this.state = {};
    }
    componentDidMount(){
        const store = this.context.store;
        this.update(); // 初始化一次   
        store.subscribe(this.update);
    }
    update(){
        const store = this.context.store;
        const stateProps = mapStateToProps(store.getState());
        const dipatchProps = bindActionCreators(mapDispatchToProps, store.dispatch);
        this.setState({
            ...this.state,
            ...stateProps,
            dipatchProps
        });
    }
    render(){
        return <wrappedComponent {...this.state}></wrappedComponent>
    }
}

export function bindActionCreator(creator,dispatch){
    return (...args) => dispatch(creator(...args)); // function(..arg)=>dispatch({type: 'TYPE_TEST'});
}
/**
 * {
 *  login: ()=>({type: ''}),
 *  logout: ()=>({type: ''})
 * }
 */
export function bindActionCreators(creators, dispatch){
    return Object.keys(creators).reduce((prev,cur)=>{ // [login, logout]
        prev[key] = bindActionCreator(creators[cur], dispatch)
        return prev;
    },{});
}
