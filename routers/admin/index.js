const Router = require('koa-router');
const path = require('path');
const fs = require('await-fs');
const common = require('../../libs/common');
const {PASS_SUFFIX, HTTP_HOST, HTTP_UPLOAD} = require('../../config');
const catalog = require('./catalog');
const banner = require('./banner');
const article = require('./article');
let router = new Router();

router.get('/login', async ctx => {
    await ctx.render('admin/login', {
        HTTP_HOST,
    });
});

router.post('/login', async ctx => {
    let {user, password} = ctx.request.fields
    let data = await fs.readFile(path.resolve(__dirname, '../../static/admin.json'));
    let adminArr = JSON.parse(data);
    ctx.assert(user, 400, 'user is required');
    ctx.assert(password, 400, 'password is required');
    let tempAdmin = adminArr.filter(item => {
        return (item.name === user);
    });
    if (tempAdmin.length === 0) {
        ctx.body = common.resJson(0, '用户不存在');
        return;
    }
    if (tempAdmin[0].pass !== common.md5(password + PASS_SUFFIX)) {
        ctx.body = common.resJson(0, '密码错误');
        return;
    }
    ctx.session['admin'] = user;
    ctx.body = common.resJson(1, '登录成功');
    // ctx.redirect('/admin');
})
router.all('*', async (ctx, next) => {
    if (ctx.session['admin']) {
        await next();
    } else {
        ctx.redirect('/admin/login');
    }
});

// const tableConf = [
//     {title: '标题', name: 'title', type: 'text'},
//     {title: '图片', name: 'img_src', type: 'file'},
//     {title: '链接', name: 'src', type: 'text'},
//     {title: '序号', name: 'serial_num', type: 'number'}
// ];
// const page_type = 'banner';
// const page_types={
//     'banner': 'banner管理',
//     'catalog': '类目管理',
//     'article': '文章管理',
//   };

// router.get('/', async ctx => {
//     const data = await ctx.db.query(`SELECT * FROM banner_list`);
//     try {
//         await ctx.render('admin/index', {
//         title: 'banner编辑',
//         tableConf,
//         page_types,
//         page_type,
//         data
//         });
//     } catch (e) {
//         console.log(e)
//         ctx.body = { err: 1, msg: 'server error' }
//     }
// });

// router.post('/list', async ctx => {
//     let {title, serial_num, src, img_src} = ctx.request.fields;
//     img_src = path.basename(img_src[0].path);
//     await ctx.db.query(`INSERT INTO banner_list (title, serial_num, src, img_src) VALUES(?,?,?,?)`, [title, serial_num, src, img_src]);
//     ctx.body = common.resJson(1, '添加成功');
// });

// router.get('/getList/:id', async ctx => {
//     let {id} = ctx.params;
//     let data = await ctx.db.query(`SELECT * FROM banner_list WHERE ID=?`, [Number(id)]);
//     ctx.assert(data.length, 400, common.resJson(0, '数据错误'));
//     ctx.body = common.resJson(1, data[0]);
// });

// router.post('/update/:id', async ctx => {
//     let {id} = ctx.params;
//     let {img_src} = ctx.request.fields;
//     let size = img_src[0].size;
//     img_src = path.basename(img_src[0].path);
//     let post = ctx.request.fields;
//     let data = await ctx.db.query(`SELECT img_src FROM banner_list WHERE ID=?`, [Number(id)]);
//     ctx.assert(data.length, 500, common.resJson(0, '数据错误'));
//     let oldImg = data[0]['img_src'];
//     let keys = ['title', 'serial_num', 'src'];
//     let values = [];
//     if (size) {
//         keys.push('img_src');
//         await common.remove(path.resolve(HTTP_UPLOAD, oldImg));
//         post.img_src = img_src;
//     } else {
//         await common.remove(path.resolve(HTTP_UPLOAD, img_src));
//     }
//     keys.forEach(item => {
//         values.push(post[item]);
//     });
//     await ctx.db.query(`UPDATE banner_list SET ${
//         keys.map(key => {
//             return `${key}=?`
//         }).join(',')
//     } WHERE ID=? `, [...values, Number(id)]);
//     ctx.body = common.resJson(1, '修改成功');
// });

// router.get('/delete/:id', async ctx => {
//     try {
//         let {id} = ctx.params;
//         let data = await ctx.db.query(`SELECT img_src FROM banner_list WHERE ID=?`, [Number(id)]);
//         ctx.assert(data.length, 400, common.resJson(0, '数据错误'));
//         let img_path = path.resolve(HTTP_UPLOAD, data[0]['img_src'])
//         fs.stat(img_path, async function(err) {
//             if (!err) {
//                 await common.remove(path.resolve(HTTP_UPLOAD, data[0]['img_src']));
//             }
//         });
//         await ctx.db.query(`DELETE FROM banner_list WHERE ID=?`, [id]);
//         ctx.body = common.resJson(1, '删除成功');
//     } catch (e) {
//         ctx.status = 500;
//         ctx.body = common.resJson(0, '数据错误');
//     }
// });

router.use('/catalog', catalog);
router.use('/banner', banner);
router.use('/article', article);

module.exports = router.routes();