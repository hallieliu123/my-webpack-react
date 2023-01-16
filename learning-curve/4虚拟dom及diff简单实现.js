const vnodeType = {
    HTML: 'HTML',
    TEXT: 'TEXT',

    COMPONENT: 'COMPONENT',
    CLASS_COMPONENT: 'CLASS_COMPONENT'
}
const childType = {
    EMPTY: 'EMPTY',
    SINGLE: 'SINGLE',
    MULTIPLE: 'MULTIPLE'
}
function createElement(tag,data,children){
    let flags;
    if(typeof tag === 'string'){
        flags = vnodeType.HTML;
    }else if(typeof tag === 'function'){
        if(tag.isReactComponent){ // 判断是不是类组件
            flags = vnodeType.CLASS_COMPONENT;
        }else{
            flags = vnodeType.COMPONENT;
        }
    }else{
        flags = vnodeType.TEXT;
    }
    let childFlags; // children的几种情况：null,text,array->{ 0, multiple }
    if(children === null){
        childFlags = childType.EMPTY;
    }else if(Array.isArray(children)){
        if(children.length === 0){
            childFlags = childType.EMPTY;
        }else{
            childFlags = childType.MULTIPLE;
        }
    }else{
        childFlags = childType.SINGLE;
        children = createTextVnode(children);
    }
    return {
        flags,
        tag,
        key: data && data.key,
        data,
        childFlags,
        children
    }
}

function createTextVnode(text){  
    return {
        flags: vnodeType.TEXT,
        tag: null,
        key: '',
        data: null,
        childFlags: childType.SINGLE,
        children: text
    }
}

// 创建 dom
function render(vnode,container){ 
    if( container.vnode ){
        patch(container.vnode,vnode,container); // 分为两个阶段: reconciliation 阶段 - 执行diff算法,纯js计算; commit阶段 - 将diff结果渲染到dom
    }else{                                  
        mount(vnode,container);
    }
    container.vnode = vnode; // 挂载在container上来识别是否渲染过
}

function mount(vnode,container,flagNode){
    let { flags } = vnode;
    if( flags == vnodeType.HTML ){
        mountElement(vnode,container,flagNode);
    }else if( flags == vnodeType.COMPONENT ){
        mountFuncComp(vnode,container);
    }else if( flags == vnodeType.CLASS_COMPONENT ){
        mountClassComp(vnode,container);
    }else{
        mountText(vnode,container);
    }
}

function  mountElement(vnode,container,flagNode){
    let { tag,children,data,childFlags } = vnode;
    let el = document.createElement(tag);
    vnode.el = el; // 将真实dom节点挂载在vnode上便于后面使用
    if(data){ // 属性操作
       for(let [key,value] of Object.entries(data)){
            patchData(el,key,null,value);
       }
    }
    if( childFlags === childType.SINGLE ){
        mount(children,el);
    }else if( childFlags === childType.MULTIPLE ){
        for(let child of children){
            mount(child,el)
        }
    }
    if(flagNode){
        container.insertBefore(el,flagNode);
        return
    }
    container.appendChild(el);
}

// function mountFuncComp(vnode,container){
//     let { tag,data } = vnode;
//     let node = tag(data);
//     mount(node,container);
// }

// function mountClassComp(vnode,container){
//     let { tag,data } = vnode;
//     let instance = new tag(data);
//     let node = instance.render();
//     mount(node,container);
// }

function mountText(vnode,container){
    let { children } = vnode;
    let text = document.createTextNode(children);
    vnode.el = text;
    container.appendChild(text);
}

function patchData(el,key,prev,next){ // patchData(el,key,null,value)  || patchData(el,key,value,null)
    switch(key){
        case 'style': 
            if(next){
                for(let [key,value] of Object.entries(next)){
                    el.style[key] = value;
                }
            }
            if(prev && !next){
                for(let [key,value] of Object.entries(prev)){
                    el.style[key] = next;
                }
            }
        break;
        case 'className': 
            el[key] = next;
        break;
        default: ;break;

    }
}


// 更新 patch
// 1.如果老的vnode和新的vnode的类型不一样 ->  直接替换
// 2.如果老的vnode和新的vnode类型一样 -> 4种情况，html text func class;   
//    新老都是html再看是否tag类型一样，不一样就直接替换，一样就要去对比更新属性   
//    对于children的对比: 最为复杂,下面这些情况的对比 diff     
//       1.老的是空的   2.老的是一个   3.老的是多个
//       1.新的是空的  2.新的是一个  3.新的是多个

function patch(prev,next,container){
    let prevFlags = prev.flags;
    let nextFlags = next.flags;
    if( nextFlags != prevFlags ){ // 如果类型不同
        replaceVnode(prev,next,container);
    }else{ // 类型相同
        if( nextFlags === vnodeType.HTML ){ // 如果是html
            patchElement(prev,next,container);
        }else if( nextFlags === vnodeType.TEXT ){ // 如果是text
            patchText(prev,next);
        }else if( nextFlags === vnodeType.COMPONENT ){ // 如果是component 
        }else{  // 如果是func
        }
    }
}

function patchElement(prev,next,container){
    if( prev.tag != next.tag ){ // 如果 tag 不一样 一个div vs 一个p
        replaceVnode(prev,next,container);
    }else{ // 一样的话就去对比更新属性  
        let el = ( next.el = prev.el ); // 先把dom节点给新的 vdom  
        let prevData = prev.data;
        let nextData = next.data;
        if(nextData){ // 去做更新和添加属性
            for(let [key,value] of Object.entries(nextData)){ 
                patchData(el,key,null,value);
            }
        }
        if(prevData){ // 去做删除属性操作 --> 这个逻辑 patchData 中没写
            for(let [key,value] of Object.entries(prevData)){
                if(!nextData.hasOwnProperty(key)){
                    patchData(el,key,value,null);
                }
            }
        }
        patchChildren(prev.childFlags,next.childFlags,prev.children,next.children,container);
    }
}

function  patchChildren(
    prevChildFlags,
    nextChildFlags,
    prevChildren,
    nextChildren,
    container
){
    switch(prevChildFlags){
        case childType.EMPTY:
            switch(nextChildFlags){
                case childType.EMPTY:
                break;
                case childType.SINGLE:
                    mount(nextChildren,container);
                break;
                case childType.MULTIPLE:
                    for(let i=0;i<nextChildren.length;i++){
                        mount(nextChildren[i],container);
                    }
                break;
                default:;break;
            }
        break;
        case childType.SINGLE:
            switch(nextChildFlags){
                case childType.EMPTY:
                    container.removeChild(prevChildren.el);
                break;
                case childType.SINGLE:
                    patch(prevChildren,nextChildren,container);
                break;
                case childType.MULTIPLE:
                    container.removeChild(prevChildren.el);
                    for(let i=0;i<nextChildren.length;i++){
                        mount(nextChildren(i),container);
                    }
                break;
                default:;break;
            }
        break;
        case childType.MULTIPLE:
            switch(nextChildFlags){
                case childType.EMPTY:
                    for(let i=0;i<prevChildren.length;i++){
                        container.removeChild(prevChildren.el);
                    }
                break;
                case childType.SINGLE:
                    for(let i=0;i<prevChildren.length;i++){
                        container.removeChild(prevChildren.el);
                    }
                    mount(nextChildren,container);
                break;
                case childType.MULTIPLE:
                    lastIndex = 0;
                    for(let i=0;i<nextChildren.length;i++){ // [a,b,c] -> 1
                        let find = false;
                        for(let j=0;j<prevChildren.length;j++){ // [b,a,c] -> 0
                            if(prevChildren.key == nextChildren.key){
                                find = true;
                                patch(prevChildren[j], nextChildren[i], container);
                                if(j<lastIndex){ // 要移位置
                                    let refNode = nextChildren[i-1].el.nextSibling;
                                    container.insertBefore(prevChildren[j].el,refNode);
                                }else{ // 不需要移位置就记住上次查到的元素下标
                                    lastIndex = j;
                                }
                            }
                        }
                        if(!find){ // 没有就插入
                            const refNode = i - 1 < 0 ? prevChildren[0].el : nextChildren[i - 1].el.nextSibling;
                            mount(nextChildren[i],container,refNode);
                        }
                         // 删除中没有的 [a,b,c]      [a,b,c,d] 
                        for(let i=0;i<prevChildren.length;i++){
                            let has = nextChildren.find(child=>prevChildren[i].key==child.key);
                            if(!has){
                                container.removeChild(prevChildren[i].el);
                            }
                        }
                    }
                break;
                default:;break;
            }
        break;
        default:;break;
    }

}

function patchText(prev,next){
    console.log(prev.el);
    let el = (next.el = prev.el);
    if( next.children != prev.children ){
        el.nodeValue = next.children;
    }
}

function replaceVnode(prev,next,container){
    container.removeChild(prev.el);
    mount(next,container);
}

