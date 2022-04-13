const httpProxy = require('http-proxy');
const koa = require('koa');
const PORT = 3000;
const bodyParser = require('koa-bodyparser')

const app = new koa()

const proxy = httpProxy.createProxyServer({ target: 'http://localhost:3000' }).listen(6000);

app.use(bodyParser())
app.use(async (ctx, next) => {
    const start = Date.now();
    console.info('start request-------------------');
    // post请求方式
    let reqData = Buffer.from('');
    ctx.req.on('data', (data) => {
        reqData = Buffer.concat([reqData, data])
        console.info('data---str', typeof data, reqData.toString());
    })
    ctx.req.on('end', () => {
        console.info('end-----', reqData.toString());
    })
    proxy.on('error', function (err, req, res) {
        log.info('出错啦', JSON.stringify(err))
    });
    await next()
    console.info(ctx.request.body);
    const ms = Date.now() - start;


    // proxy.on('proxyRes', function (proxyRes, req, res) {
    //     let body = Buffer.from('')
    //     proxyRes.on('data', data => {
    //         body = Buffer.concat([body, data])
    //     })
    //     proxyRes.on('error', function (err, req, res) {
    //         log.info('出错啦', JSON.stringify(err))
    //       });
    //     proxyRes.on('end', function () {
    //         console.info('proxyRes---data', body.toString());
    //         console.info('proxyRes---str', ctx.req.body);
    //         console.info('proxyRes---str', ctx.request.query);
    //     })
    // })
    // console.info(ctx.req)
    console.log(`${ctx.method} ${ctx.url} - ${ms}`);
})

app.use(async (ctx, next) => {
    // if (ctx.request.path === '/test') {
    ctx.body = 'Hello World';
    // }
});

app.listen(PORT, () => {
    console.info(`listening on port ${PORT}`);
})
