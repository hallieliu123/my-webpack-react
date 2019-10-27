const Koa = require('koa');
const app = new Koa();

app.use(ctx=>{
    console.log('ctx.request.url-->',ctx.request.url);
    if(ctx.request.url == '/api/info' ){
        ctx.body = { name:'Simon' };
    }
});


app.listen(8080,()=>{
    console.log('listening...');
});





