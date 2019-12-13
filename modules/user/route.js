'use strict';

const router = module.exports = require('express').Router();
const logger = require('../../lib/logger');
const auth = require('../../lib/auth');
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
// 用户管理
router.get('/user/manage',auth.privilege('MP_USER'), function(req, res, next) {
    res.locals.title = '用户';
    let xcx = req.dataApi.$getDataSync(`/api/wechat/admin/mp/list`);
    res.locals.expose.add('xcx', gzharr(xcx,res.locals.user.privileges,'authority'));
    res.render('user/pages/userManage');
});
//厨房护理
router.get('/user/kitchenNurse',auth.privilege('XCX_KITCHENNURSE'), function(req, res, next) {
    res.locals.title = '厨房护理';
    res.render('user/pages/kitchenNurse');
});
//积分兑换
router.get('/user/integralExchange',auth.privilege('XCX_INTEGRALEXCHANGE'), function(req, res, next) {
    res.locals.title = '积分兑换';
    res.render('user/pages/integralExchange');
});
//推广排行榜
router.get('/user/rankingList',auth.privilege('MP_USER_RANKING'), function(req, res, next) {
    res.locals.title = '推广排行榜';
    res.render('user/pages/userRankingList');
});
// 用户报名
router.get('/user/register',auth.privilege('MP_USER_REGISTER'), function(req, res, next) {
    let xcx = req.dataApi.$getDataSync(`/api/wechat/admin/mp/list`);
    res.locals.expose.add('xcx', gzharr(xcx,res.locals.user.privileges,'authority'));
    res.locals.title = '用户报名';

    res.locals.dict = req.dataApi.dictJson('INEFFECTIVE_REASONS');

    res.render('user/pages/register');
});

// 查看用户
router.get('/user/check',auth.privilege('USER_CHECK'), function(req, res, next) {
    res.locals.title = '查看用户';
    res.render('user/pages/user');
});
//用户详情
router.get('/user/userInformation',auth.token(),function (req, res, next) {
    let dealerEnums = req.dataApi.$getDataSync('/api/dict/CMS_DEALER_ENUMERATE?all=false');
    res.locals.expose.add('dealerEnums', dealerEnums);//经销商
    //f房屋风格
    let findSign = req.dataApi.$getDataSync('/api/wechat/admin/sign/find');
    res.locals.expose.add('findSign', findSign);
    let userId = req.query.userId;
    res.locals.expose.add('userId', userId);
    //公众号id
    let gzhUserId = req.query.gzhUserId;
    res.locals.expose.add('gzhUserId', gzhUserId);
    res.locals.title='用户详情';
    res.locals.dict = req.dataApi.dictJson({type:'KHLY', depth:1,all:false},{type:'PARTNERSHIP',all:true});
    res.render('user/pages/userInformation')
});
// 认证管理
router.get('/user/spread',auth.privilege('USER_MANAGE'), function(req, res, next) {
    res.locals.title = '认证管理';
    res.render('user/pages/spread');
});
//小程序管理
router.get('/user/xcxManage',auth.privilege('XCX_MANAGE'), function(req, res, next) {
    let gzh = req.dataApi.$getDataSync(`/api/wechat-service/wechat/more/queryAccessTokens`);
    res.locals.expose.add('gzh', gzharr(gzh,res.locals.user.privileges));


    res.locals.title = '小程序管理';
    res.render('user/pages/xcxManage');
});
//小程序模版消息
router.get('/user/xcxTemplateNews',auth.privilege('XCX_TEMPLATENEWS'), function(req, res, next) {
    res.locals.title = '模版消息';
    res.render('user/pages/xcxTemplateNews');
});

