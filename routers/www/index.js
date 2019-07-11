const Router = require('koa-router');
const path = require('path');
const fs = require('await-fs');

let router = new Router();

router.get('/', async ctx => {
    await ctx.render('index', {
        title: '主页'
    });
});
router.get('/about', async ctx => {
    await ctx.render('index', {
        title: '关于'
    });
})
router.get('/reat', async ctx => {
    await ctx.render('index', {
        title: '读书会，敬请期待'
    });
})

module.exports = router.routes();