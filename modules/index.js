'use strict';

const router = module.exports = require('express').Router();

//不需要登录就可访问的模块
router.use(require('./error/route'));
router.use(require('./login/route'));
router.use(require('./sso'));

// if (global.devMode) {
    router.use(require('./api'));
// }

//登录验证拦截器
router.use(require('./interceptor'));

//登录后才能访问的模块
router.use(require('./dashboard/route'));
router.use(require('./setting/route'));
router.use(require('./cms/route'));
router.use(require('./user/route'));
router.use(require('./wxpublic/route'));
router.use(require('./userAuthentication/route'));
//cmsui
router.use(require('./ui/route'));

// if (modules.length == 1 && modules[0] == '') {
//     router.use(require('./dashboard/route'));
//     router.use(require('./task/route'));
//     router.use(require('./customer/route'));
//     router.use(require('./sales/route'));
//     router.use(require('./order/route'));
//     router.use(require('./audit/route'));
//     router.use(require('./finance/route'));
//     router.use(require('./plan/route'));
//     router.use(require('./delivery/route'));
//     router.use(require('./warehouse/route'));
//     router.use(require('./install/route'));
//     router.use(require('./service/route'));
//     router.use(require('./channel/route'));
//     router.use(require('./dealer/route'));
//     router.use(require('./setting/route'));
// } else {
//     modules.forEach(module => {
//         router.use(require('./' + module + '/route'));
//     });
// }


//全局模块
router.use(require('./global/route'));
