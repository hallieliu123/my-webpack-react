function Search(props) {
    return (
        <ul>
            {
                props?.list?.map(item=><li key={item.title}>{item.title}</li>)
            }
        </ul>
    )
}

class SearchModule extends Component { // 公共逻辑抽到这里来
    constructor(props) {
        super(props)
        this.state = {
            list: []
        }
    }
    componentDidMount() {
        setTimeout(()=>{
            this.setState({
                list: [{title: 'a'}, {title: 'b'}, {title: 'c'}]
            });
        }, 1000);
    }
    render() {
        return (
            <div>
                {this.props.render(this.state.list)}
            </div>
        )
    }
}


// 使用的时候:
// <SearchModule render={(list)=><Search lsit={list}/>}/>
