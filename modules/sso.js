'use strict';

const logger = require('../lib/logger');
const router = module.exports = require('express').Router();

router.get('/passport/sso', (req, res, next) => {
    let url = req.query['url'];

    let token = req.headers['token'] || req.cookies['token'] || req.query['token'];
    let position = req.headers['position'] || req.cookies['position'] || req.query['position'];
    let org = req.headers['org'] || req.cookies['org'] || req.query['org'];

    if (!url || !token || !position || !org) {
        next();
    }

    res.cookie('token', token);
    res.cookie('position', position);
    res.cookie('org', org);

    logger.info('SSO REDIRECT:', {
        from: req.referrer,
        to: url,
        token: token,
        position: position,
        org: org
    });

    res.redirect(url);
});