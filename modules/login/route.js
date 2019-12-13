'use strict';

const router = module.exports = require('express').Router();
const logger = require('../../lib/logger');

/**
 * 访问登录页面
 */
router.get('/login', function (req, res) {
    //如果已经登录，则跳转至首页
    if (req.user && req.user.id) {
        res.redirect('/dashboard');
        return;
    }
    res.locals.title = '登录';
    res.locals.layout = 'blankLayout';
    res.render('login/pages/login');
});

/**
 * 访问忘记密码页面
 */
router.get('/forget', function (req, res) {

    //如果已经登录，则跳转至首页
    if (req.user && req.user.id) {
        res.redirect('/dashboard');
        return;
    }

    res.locals.title = '忘记密码';
    res.locals.layout = 'blankLayout';
    res.render('login/pages/forget');
});

/**
 * 登录
 */
router.post('/login', function (req, res, next) {
    let access = req.query.access;
    let redirect = access ? new Buffer(access, 'base64').toString() : '/dashboard';
    req.dataApi.login(req.body).then(function (result) {
        if (result && result.success) {
            let position = result.user && result.user.positions && result.user.positions.length && result.user.positions[0] || {};

            //登录成功，将token和职位、组织机构等信息写入cookie
            res.cookie('token', result.token, {maxAge: 999 * 365 * 24 * 60 * 60 * 1000});
            res.cookie('position', position.positionId || '', {maxAge: 999 * 365 * 24 * 60 * 60 * 1000});
            res.cookie('org', position.orgId || '', {maxAge: 999 * 365 * 24 * 60 * 60 * 1000});
            res.cookie('id', result.user && result.user.id || '', {maxAge: 999 * 365 * 24 * 60 * 60 * 1000});
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



/**
 * 退出
 */
router.get('/logout', function (req, res) {

    req.dataApi.logout().then(function (result) {

        //退出登录，清除cookie
        res.clearCookie('token');
        res.clearCookie('position');
        res.clearCookie('org');

        res.redirect('/login');

    }).catch(function (err) {
        logger.error(err);
        next(err);
    });

});

