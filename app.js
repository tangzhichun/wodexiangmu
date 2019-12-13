'use strict';

global.devMode = process.env.NODE_ENV != 'test';
global.port = process.env.PORT || 3000;
global.config = require('config');

console.log('config:', JSON.stringify(global.config, null, '    '));

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const handlebars = require('express-handlebars');
const userAgent = require('useragent');
const app = express();

const dataApi = require('./lib/data');
const expose = require('./lib/expose');
const helper = require('./lib/helper');
const handlebarsOptions = {
    defaultLayout: 'frameLayout',
    layoutsDir: 'modules/global/layouts/',
    partialsDir: 'modules/global/partials/',
    extname: '.html',
    helpers: helper
};

app.engine('html', handlebars(handlebarsOptions));
app.set('views', __dirname + '/modules');
app.set('view engine', 'html');
app.set('x-powered-by', false);
if (!global.devMode) {
    app.enable('view cache');
}


//全局设置
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(function (req, res, next) {

    const pattern = new RegExp('/fonts|css|js|images|vendor/*');
    if (pattern.test(req.url)) {
        //公共部分，放行
        next();
        return;
    }

    //构造后端API代理
    req.dataApi = dataApi(req);

    next();
});

app.get('*', function (req, res, next) {
    var ua = userAgent.parse(req.headers['user-agent']);
    if (!req.xhr && ua.family != 'Chrome' && ua.family != 'Safari' && req.path != '/error/browser/nonsupport') {
        return res.redirect('/error/browser/nonsupport');
    }

    //标记环境
    res.locals.devMode = global.devMode;
    //标记服务器时间
    res.locals.serverTime = new Date().getTime();
    //标记是否支持WebP
    // res.locals.supportWebP = req.headers['accept'] && req.headers['accept'].indexOf('image/webp') != -1;

    const token = req.cookies['token'] || req.headers['token'];
    if (token) {
        let payload = req.dataApi.myself();
        if (payload) {
            if (payload.positions) {
                let currPositionId = req.cookies['position'];
                payload.currPosition = payload.positions.find(p => p.positionId == currPositionId);
                if (!payload.currPosition) {
                    payload.currPosition = payload.primaryPosition;
                    res.cookie('position', payload.currPosition && payload.currPosition.positionId || '', {maxAge: 999 * 365 * 24 * 60 * 60 * 1000});
                    res.cookie('org', payload.currPosition && payload.currPosition.orgId || '', {maxAge: 999 * 365 * 24 * 60 * 60 * 1000});
                }
            }
            res.cookie('id', payload.id || '', {maxAge: 999 * 365 * 24 * 60 * 60 * 1000});

            delete payload.primaryPosition;
            delete payload.$ttl;
            delete payload.valid;

            req.user = payload;
            res.locals.user = payload;
        }
    }

    //暴露数据给页面
    res.locals.expose = expose()
        .add('devMode', global.devMode)
        .add('token', token)
        .add('serverTime', res.locals.serverTime)
        .add('globalConfig', global.config.globalConfig)
        .add('user', res.locals.user);

    next();
});

//注册路由
app.use(require('./modules'));
//接管日志
const logger = require('./lib/logger');

/**
 * 全局错误处理
 */
app.use(function (err, req, res, next) {
    logger.error(req.path + ' not available:' + err);

    if (req.xhr) {
        res.status(err.statusCode || err.status || 500).send({
            success: false,
            error: err.message
        });
    } else {
        res.locals.error = err;

        res.locals.title = '发生错误啦~';
        res.locals.layout = 'headerLayout';
        res.locals.statusCode = '500';
        res.locals.errorMsg = 'Sorry！服务端开了个小差~';
        res.render('error/pages/index');
    }
});


/**
 * 全局404
 */
app.use(function (req, res, next) {
    logger.error(req.path + ' not found.');

    if (req.xhr) {
        res.status(404).send({
            success: false,
            error: req.path + ' not found.'
        });
    } else {

        res.locals.title = '页面不存在~';
        res.locals.layout = 'headerLayout';
        res.locals.statusCode = '404';
        res.locals.errorMsg = 'Sorry！您访问的页面走丢了~';
        res.render('error/pages/index');
    }
});

app.listen(global.port, function () {
    console.log('web server listening on port: ' + global.port);
});


