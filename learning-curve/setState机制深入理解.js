import React, { Component } from 'react'

class ComponentName extends Component {
    constructor(props) {
        super(props)
        this.state = {
            count: 0
        };
    }
    componentDidMount() {
        let _this = this;
        let { log } = console;
        this.setState({count: this.state.count + 1},()=>{
            log('11111',this.state.count)  // 1
        });
        this.setState({count: this.state.count + 1},()=>{
            log('22222',this.state.count)  // 1
        });
        setTimeout(function() {
            _this.setState({count: _this.state.count + 1}, function() {
                log('33333 callback');
            });
            log('4444444444');
            _this.setState({count: _this.state.count + 1}, function() {
                log('555555555555 callback');
            });
            log('666666666666666666');
        }, 0);
    }
    componentDidUpdate() {
        console.log('did update');  //  这个会执行 3 次
    }
    render() {
        console.log('render');  // 2 次
        return (
            <div>
                <h1>{this.state.count}</h1>  {/* // 1 */}
            </div>
        )
    }
}

export default ComponentName


// render -> render -> did update -> 111 -> 222 -> render -> did update -> 333 -> 444 --> render -> didUpdate -> 5555 -> 666666 // v




