const httpProxy = require('http-proxy');
const koa = require('koa');
const bodyParse = require('body-parser');
const PORT = 3000;

const app = new koa()

// logger

// app.use(async (ctx, next) => {
//     const start = Date.now();
//     const ms = Date.now() - start;
//     // console.info(ctx.req);
//     // post请求方式
//     let str = ''
//     ctx.req.on('data', (data) => {
//         str = data.toString().substr(0, 2048)
//         console.info('data', typeof data, );
//     })
//     ctx.req.on('end', () => { 
//         console.info('end-----', str);
//     })
//     // console.info(ctx.req)
//     console.log(`${ctx.method} ${ctx.url} - ${ms}`);
//     await next();
//   });
  
  // response
  

const proxy = httpProxy.createProxyServer({target:'http://localhost:3000'}).listen(6000);

app.use(async (ctx, next) => {
            const start = Date.now();
            const ms = Date.now() - start;
            // console.info(ctx.req);
            // post请求方式
            let str = ''
            ctx.req.on('data', (data) => {
                str = data.toString().substr(0, 2048)
                console.info('data', typeof data, );
            })
            ctx.req.on('end', () => { 
                console.info('end-----', str);
            })
            proxy.on('proxyReq', function(proxyReq, req,res) {
                let body = Buffer('')
                proxyReq.on('data1', data => {
                    console.info('data1', data.toString());
                    body = Buffer.concat([body, data])
                })
                proxyReq.on('end1', function () {
                    console.info('proxyRes1---str', str );
                })
            })
            // proxy.on('proxyRes', function(proxyRes, req,res) {
            //     let body = Buffer('')
            //     proxyRes.on('data', data => {
            //         console.info('data', data.toString());
            //         body = Buffer.concat([body, data])
            //     })
            //     proxyRes.on('end', function () {
            //         console.info('proxyRes---str', str );
            //     })
            // })
            // console.info(ctx.req)
            await proxy.web(ctx.req, ctx.res)
            console.log(`${ctx.method} ${ctx.url} - ${ms}`);
            await next();
        })

  app.use(async ctx => {
    ctx.body = 'Hello World';
  });

app.listen(PORT, () => {
    console.info(`listening on port ${PORT}`);
})
