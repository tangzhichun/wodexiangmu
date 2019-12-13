'use strict';

const router = module.exports = require('express').Router();
const logger = require('../../lib/logger');
const auth = require('../../lib/auth');

//用户认证-基础认证
router.get('/userAuthentication/dealerUser',auth.privilege('USER_AUTH'), function(req, res, next) {
    //全部经销商
    let dealerEnums = req.dataApi.$getDataSync('/api/dict/CMS_DEALER_ENUMERATE?all=false');
    res.locals.expose.add('dealerEnums', dealerEnums);//经销商

    res.locals.dict = req.dataApi.dictJson({type:'PARTNERSHIP',all:false},{type:"CMS_DEALER_ENUMERATE",filter:true,all:false});
    let PARTNERSHIP = req.dataApi.$getDataSync('/api/dict/PARTNERSHIP?all=true');

    res.locals.expose.add('PARTNERSHIP', PARTNERSHIP);

    res.locals.title = '推广大使';
    res.render('userAuthentication/pages/dealerUser');
});
//审核
router.get('/userAuthentication/audit',auth.privilege('USER_AUTHENTICATION_AUDIT'), function(req, res, next) {
    res.locals.title = '审核';
    res.locals.dict = req.dataApi.dictJson({type:'PARTNERSHIP',all:true},{type:'CXHHR_REJECT_REASON',all:false});
    res.render('userAuthentication/pages/audit');
});
router.get('/userAuthentication/designerCertificationList',auth.privilege('USER_AUTHENTICATION_SJS_LIST'), function(req, res, next) {
    res.locals.title = '设计师认证';
    res.render('userAuthentication/pages/designerCertificationList');
});



