const Koa = require('koa');
const app = new Koa();

// app.use((ctx,next)=>{
//     ctx.set("Access-Control-Allow-Origin", "http://localhost:3000/");
//     ctx.set("Access-Control-Allow-Methods", "OPTIONS,POST,GET,HEAD,DELETE,PUT");
//     next()
// });

app.use(ctx=>{
    ctx.set("Access-Control-Allow-Origin", "http://localhost:3000");
    // ctx.set("Access-Control-Allow-Methods", "OPTIONS,POST,GET,HEAD,DELETE,PUT");
    console.log('ctx.request.url-->',ctx.request.url);
    if(ctx.request.url == '/api/info' ){
        ctx.body = { name:'Simon' };
    }
});


app.listen(8080,()=>{
    console.log('listening...');
});





