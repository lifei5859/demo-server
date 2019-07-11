const Koa = require('koa');
const Router = require('koa-router');
const body = require('koa-better-body');
const static = require('./routers/static');
const page = require('koa-ejs');
const session = require('koa-session');
const api = require('./routers/api');
const admin = require('./routers/admin');
const www = require('./routers/www');
const db = require('./libs/database');
const fs = require('fs');
const { HTTP_PORT, HTTP_TEMPLATE, HTTP_UPLOAD } = require('./config');

let server = new Koa();
server.keys = fs.readFileSync('.keys').toString().split('\n');
server.use(session({
    maxAge: 20*60*1000,
    renew: true
}, server));
server.context.db = db;
server.listen(HTTP_PORT, () => {
    console.log(`服务器启动成功请通过 127.0.0.1:${HTTP_PORT} 访问`)
});

server.use(body({uploadDir: HTTP_UPLOAD}));

let router = new Router();

page(server, {
    root: HTTP_TEMPLATE,
    layout: false,
    viewExt: 'ejs',
    cache: false,
    debug: false
})
router.use('/admin', admin);
router.use('/api', api);
router.use('', www);
static(router, {});
server.use(router.routes());
