'use strict';

const router = module.exports = require('express').Router();
const auth = require('../../lib/auth');

router.get('/setting/menu', auth.privilege('SETTING_MENU'), function(req, res, next) {
    res.locals.title = '菜单管理';
    res.render('setting/pages/menu');

});

router.get('/setting/role', auth.privilege('SETTING_ROLE'), function(req, res, next) {
    res.locals.title = '角色管理';
    res.render('setting/pages/role');

});

router.get('/setting/user', auth.privilege('SETTING_USER'), function(req, res, next) {
    let positionlist = req.dataApi.$getDataSync('/api/dealer/position/list/condition');
    res.locals.expose.add('positionlist', positionlist);

    res.locals.title = '用户管理';
    res.render('setting/pages/user');
});

router.get('/setting/tagmanage', auth.privilege('SETTING_TAGMANGE'), function (req, res, next) {
    res.locals.title = '标签管理';
    res.render('setting/pages/tagmanage');
});


router.get('/log/register', auth.privilege('LOG_LOGIN'), function (req, res, next) {
    res.locals.title = '登录日志';
    res.render('setting/pages/register');
});

router.get('/log/message', auth.privilege('LOG_MESSAGE'), function (req, res, next) {
    res.locals.title = '消息日志';
    res.render('setting/pages/message');
});

router.get('/log/operate', auth.privilege('LOG_OPERATE'), function (req, res, next) {
    res.locals.title = '操作日志';
    res.render('setting/pages/operate');
});
