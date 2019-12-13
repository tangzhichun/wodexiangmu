'use strict';

const router = module.exports = require('express').Router();
const auth = require('../lib/auth');



/**
 * 未登录: 拦截并转向登录页
 * 已登录: 验证token并解析, 解析成功刷新token
 */
router.get(auth.token());

/**
 * 加载菜单
 */
router.get('*', function (req, res, next) {
    var pattern = new RegExp('/login|api|fonts|css|js|images|vendor/*');
    if(req.xhr || pattern.test(req.url)){
        //公共部分，放行
        next();
        return;
    }

    let idx = req.url.indexOf('?');
    let requestUrl = req.url.substr(0, idx != -1 ? idx : req.url.length);
    let menuCollapsed = req.cookies && req.cookies.menuCollapsed;

    let menus = req.dataApi.menu() || [];

    menus.forEach((menu)=>{

        if (menu.children && menu.children.length) {
            menu.children.forEach((sub)=>{
                sub.active = sub.url && (sub.url.trim() == requestUrl);
            });
        }


        menu.active = menu.url && (menu.url == requestUrl) || menu.children && menu.children.find(m => {return m.active});

        if (!menu.url) {
            menu.url = 'javascript:void(0)';
        }
    });

    res.locals.menus = menus;
    res.locals.menuCollapsed = menuCollapsed == 'true';
    next();
});
