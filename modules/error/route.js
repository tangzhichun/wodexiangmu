'use strict';

const router = module.exports = require('express').Router();

router.get('/error/browser/nonsupport', function (req, res, next) {

    res.locals.title = '浏览器不支持';
    res.locals.layout = 'blankLayout';
    res.render('error/pages/browser');
});