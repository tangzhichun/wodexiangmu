'use strict';
const auth = require('../../lib/auth');
const router = module.exports = require('express').Router();
const logger = require('../../lib/logger');

router.get('/global/search', auth.privilege('GLOBAL_QUERY'), function (req, res, next) {
    let keyword = (req.query.keyword || '');
    if (keyword.length == 0) {
        res.json({
            success: true,
            code: '000',
            data: null
        });
        return;
    }
    let data = null;
    let customer,orders,cooperator,emp,gongdan;
    // var reg = new RegExp("^[0-9a-zA-Z]+$","g");//只有数字和英文
    var reg = new RegExp("[\\u4E00-\\u9FFF]+","g");
    if (keyword.length === 11 && !isNaN(keyword*1)) {
         //客户详情
         customer = req.dataApi.$getDataSync(`/api/customer/find/${keyword}`);
        //合作方
         cooperator = req.dataApi.$getDataSync(`/api/channel-service/channel/cooperator/basic/info/${keyword}/mobile`);
        // 员工
        emp = req.dataApi.$getDataSync(`/api/dealer/employee/page/condition/1/11?mobile=${keyword}`);
        emp = emp.results || null ;
        if(emp  && emp.length < 1){
            emp = null
        }
        //订单
        if (customer && customer.id) {
            orders = req.dataApi.$getListSync(`/api/order/brand/stage?customerId=${customer.id}`);
            if(orders && orders.length<1){
                orders=null;
            }
        }
    } else if (keyword.length >= 7 && !reg.test(keyword) ) {
        //关键字是11位，作为订单号查询
        let order = req.dataApi.$getDataSync(`/api/order/brand?no=${keyword}`);
        if (order) {
                if(order.type !== 'SAMPLE' && order.type !== 'BUDGET'){
                    customer = order.customer;
                }
                orders =  [order];
        }
    }
    if (keyword.length >= 6){
        gongdan = req.dataApi.$getDataSync(`/api/afterSales/order/no/${keyword}`);
        if(gongdan && gongdan.length < 1){
            gongdan = null;
        }
    }
    if(customer || orders || cooperator || emp || gongdan){
        data ={
            customer : customer || null,
            orders:orders || null,
            cooperator:cooperator || null,
            emp:emp && emp || null,
            gongdan:gongdan || null,
        }
    }
    res.json({
        success: true,
        code: '000',
        data: data
    });
});


/**
 * 切换用户登录
 */
router.get('/account/switch/:mobile', auth.privilege('GLOBAL_SWITCH_USER'), function (req, res, next) {
    let redirect = '/dashboard';

    req.dataApi.switchUser(req.params.mobile).then(function (result) {
        if (result && result.success) {
            let position = result.user && result.user.positions && result.user.positions.length && result.user.positions[0] || {};

            //登录成功，将token和职位、组织机构等信息写入cookie
            res.cookie('token', result.token, {maxAge: 999 * 365 * 24 * 60 * 60 * 1000});
            res.cookie('position', position.positionId || '', {maxAge: 999 * 365 * 24 * 60 * 60 * 1000});
            res.cookie('org', position.orgId || '', {maxAge: 999 * 365 * 24 * 60 * 60 * 1000});
            res.json({
                success: true,
                redirect: redirect
            });

        } else {
            //登录失败
            res.json(result);
        }
    }).catch(function (err) {
        logger.error(err);
        next(err);
    });
});