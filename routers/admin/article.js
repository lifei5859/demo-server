// const Router = require('koa-router');
// const path = require('path');
// const fs = require('await-fs');
// const common = require('../../libs/common');
// const {PASS_SUFFIX, HTTP_HOST, HTTP_UPLOAD} = require('../../config');

// let router=new Router();
const renderList = require('../../libs/list');

const tableConf = [
  {title: '标题', name: 'title', type: 'text'},
  {title: '类目', name: 'catalog_ID', type: 'select', from: "SELECT ID,title FROM catalog"},
  {title: '时间', name: 'c_time', type: 'date', isWrite: true},
  {title: '作者', name: 'author', type: 'text'},
  {title: '浏览', name: 'view', type: 'number', isWrite: true},
  {title: '评论', name: 'comment', type: 'number', isWrite: true},
  {title: '列表图', name: 'list_img_src', type: 'file'},
  {title: 'banner图', name: 'banner_img_src', type: 'file'},
  {title: '内容', name: 'content', type: 'textarea'}
];
const list = 'article';
const title = 'article管理';
const page_type = 'article';

module.exports = renderList(tableConf, list, title, page_type);
// router.get('/', async ctx => {
//     let data = await ctx.db.query(`SELECT * FROM ${list}`);
//     await ctx.render('admin/index', {
//         data,
//         tableConf,
//         page_types,
//         title,
//         page_type
//     })
// });
// router.post('/list', async ctx => {
//     let {title} = ctx.request.fields;
//     await ctx.db.query(`INSERT INTO ${list} (title) VALUES(?)`, [title]);
//     ctx.body = common.resJson(1, '添加成功');
// });

// module.exports = router.routes();