'use strict';

const router = module.exports = require('express').Router();
const logger = require('../../lib/logger');
const auth = require('../../lib/auth');
//处理公众号 没有公众号权限的就不返回过去
let gzharr = function(old,filter,flags='privilege'){
    let arr = [];
    if(old && old.map ){
        old.map(ele => {
            if(filter.indexOf(ele[flags]) > -1){
                arr.push(ele);
            }else if(!ele[flags]){
                arr.push(ele);
            }
        });
    }
    return arr;
};

//公众号管理
router.get('/wxpublic/management',auth.privilege('GZH_ MANAGEMENT'), function(req, res, next) {
    res.locals.title = '公众号管理';
    res.render('wxpublic/pages/management');
});
//公众号用户
router.get('/user/wechatUser',auth.privilege('GZH_USER'), function(req, res, next) {
    let gzh = req.dataApi.$getDataSync(`/api/wechat-service/wechat/more/queryAccessTokens`);
    res.locals.expose.add('gzh', gzharr(gzh,res.locals.user.privileges));
    res.locals.title = '用户';
    res.render('user/pages/wechatUser');
});
//菜单
router.get('/wxpublic/customMenu',auth.privilege('GZH_MENU'), function(req, res, next) {
    let gzh = req.dataApi.$getDataSync(`/api/wechat-service/wechat/more/queryAccessTokens`);
    res.locals.expose.add('gzh', gzharr(gzh,res.locals.user.privileges));

    let xcx = req.dataApi.$getDataSync(`/api/wechat/admin/mp/list`);
    res.locals.expose.add('xcx', gzharr(xcx,res.locals.user.privileges,'authority'));
    res.locals.title = '自定义菜单';
    res.render('wxpublic/pages/customMenu');
});
//消息
router.get('/wxpublic/appmsg',auth.privilege('GZH_MSG'), function(req, res, next) {
    let gzh = req.dataApi.$getDataSync(`/api/wechat-service/wechat/more/queryAccessTokens`);
    res.locals.expose.add('gzh', gzharr(gzh,res.locals.user.privileges));
    res.locals.title = '图文管理';
    res.render('wxpublic/pages/appmsg');
});
//新增图文消息
router.get('/wxpublic/appmsgFodder',auth.privilege('GZH_MSG'), function(req, res, next) {
    let gzh = req.dataApi.$getDataSync(`/api/wechat-service/wechat/more/queryAccessTokens`);
    res.locals.expose.add('gzh', gzharr(gzh,res.locals.user.privileges));

    let xcx = req.dataApi.$getDataSync(`/api/wechat/admin/mp/list`);
    res.locals.expose.add('xcx', gzharr(xcx,res.locals.user.privileges,'authority'));
    res.locals.title = '公众号平台';
    res.render('wxpublic/pages/appmsgFodder');
});
//自动回复
router.get('/wxpublic/autoResponse',auth.privilege('GZH_REPLY'), function(req, res, next) {
    let gzh = req.dataApi.$getDataSync(`/api/wechat-service/wechat/more/queryAccessTokens`);
    res.locals.expose.add('gzh', gzharr(gzh,res.locals.user.privileges));
    res.locals.title = '自动回复';
    res.render('wxpublic/pages/autoResponse');
});
//关键词列表
router.get('/wxpublic/keyWordList',auth.privilege('GZH_KEYWORD'), function(req, res, next) {
    let gzh = req.dataApi.$getDataSync(`/api/wechat-service/wechat/more/queryAccessTokens`);
    res.locals.expose.add('gzh', gzharr(gzh,res.locals.user.privileges));
    res.locals.title = '关键词';
    res.render('wxpublic/pages/keyWordList');
});
//关键词回复
router.get('/wxpublic/addKeywordView', auth.privilege('GZH_REPLY'),function(req, res, next) {
    res.locals.title = '关键词回复';
    let keywordId = req.query.id;
    let gzh = req.dataApi.$getDataSync(`/api/wechat-service/wechat/more/queryAccessTokens`);
    res.locals.expose.add('gzh', gzharr(gzh,res.locals.user.privileges));
    if(keywordId){
        let keywordData = req.dataApi.$getDataSync(`/api/wechat-service/wechat/more/findNewsKeywords?replyId=${keywordId}`);
        res.locals.expose.add('keywordData', keywordData);
    }
    res.render('wxpublic/pages/addKeywordView');
});
//
router.get('/wxpublic/gzhTemplateNews', auth.privilege('GZH_TEMPLATENEWS'),function(req, res, next) {
    res.locals.title = '模版消息';
    let gzh = req.dataApi.$getDataSync(`/api/wechat-service/wechat/more/queryAccessTokens`);
    res.locals.expose.add('gzh', gzharr(gzh,res.locals.user.privileges));
    res.render('wxpublic/pages/gzhTemplateNews');
});


