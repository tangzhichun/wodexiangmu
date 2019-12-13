'use strict';

const router = module.exports = require('express').Router();
const logger = require('../../lib/logger');
const auth = require('../../lib/auth');

router.get('/', function(req, res, next) {
    res.redirect('/dashboard');
});

router.get('/dashboard', auth.token(), function(req, res, next) {
    res.locals.title = '首页';
    res.locals.expose.add('modular','dashboard');//电商推广平台
    res.render('dashboard/pages/dashboard');
});
