'use strict';

const proxy = require('express-http-proxy');
const logger = require('../lib/logger');
const router = module.exports = require('express').Router();

router.use("/api/", function (req, res, next) {

    let proxyOptions = {
        preserveHostHdr: true,
        parseReqBody: true,
        proxyReqPathResolver: function(req) {
            if (req.url.startsWith('/file/upload')) {
                //经过dev环境的反向代理，绕过4100端口直达文件服务
                return req.url;
            } else {
                return '/api' + req.url;
            }
        }
    };

    let contentType = req.headers['content-type'];
    if (contentType && contentType.startsWith('multipart/form-data')) {
        proxyOptions.parseReqBody = false;
    } else {
        proxyOptions.parseReqBody = true;
    }

    let fn = proxy(config.oauth.url, proxyOptions);
    return fn(req, res, next);
});


router.use("/file/upload/", function (req, res, next) {

    let proxyOptions = {
        preserveHostHdr: true,
        parseReqBody: false,
        proxyReqPathResolver: function (req) {
            if (req.url.startsWith('/file/upload')) {
                //经过dev环境的反向代理，绕过4100端口直达文件服务
                return req.url;
            } else {
                return '/file/upload' + req.url;
            }
        }
    };

    let fn = proxy('http://dev.dsp.com', proxyOptions);
    return fn(req, res, next);
});