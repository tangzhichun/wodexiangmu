'use strict';

const router = module.exports = require('express').Router();
const logger = require('../../lib/logger');
const auth = require('../../lib/auth');
let gzharr = function(old,filter,flags='privilege'){
    let arr = [];
    if(old && old.map ){
        old.map(ele => {
            if(filter.indexOf(ele[flags]) > -1){
                arr.push(ele);
            }else if(!ele[flags]){
                arr.push(ele);
            }
        });
    }
    return arr;
};
//构建标签下拉框
let buildTag = function(tagz,tag,value = 'id'){

    let tags  = JSON.parse(JSON.stringify(tag));
    let tagCascader = [];
    tagz.map((ele) => {
        ele.label = ele.value;
        ele.value = ele.type;
        ele.children = [];
        if(Array.isArray(tags)){
            tags.map(el => {
                el.signType = el.type;
                el.signId = el.id;
                if (el.type === ele.type) {
                    el.label = el.value;
                    el.value = el[value];
                    el.signType = el.type;
                    el.signId = el.id;
                    ele.children.push(el);
                }
            });
        }
        if( ele.children.length > 0){
            tagCascader.push(ele);
        }
    });
    return {
        tags : tags,
        tagCascader : tagCascader
    };
};

/*              设计方案管理                %*/
router.get('/wechat/wechatList',auth.privilege('CLIENT_WECHAT_LIST'), function(req, res, next) {
    res.locals.title = '内容管理';
    res.locals.dict = req.dataApi.dictJson({type:'CMS_COLUMN',all:false,filter:true});
    // 获取标签组
    let tagz = req.dataApi.$getDataSync('/api/wechat/admin/sign/type/index');
    //获取所有标签
    let tag = req.dataApi.$getDataSync('/api/wechat/admin/sign/find');
    let tagObj = buildTag(tagz,tag);
    res.locals.expose.add('tags', tagObj);
    res.render('cms/pages/designList');
});
router.get('/wechat/:type/:id', auth.privilege('CLIENT_WECHAT_EDIT'), function(req, res, next) {
    res.locals.title = req.params.type === 'add' ? '新增内容' : '编辑内容';
    res.locals.expose.add('type',  req.params.type);//设计详情
    if(req.params.id && req.params.type === 'edit'){
        res.locals.expose.add('id',  req.params.id);//设计详情
    }
    res.locals.dict = req.dataApi.dictJson({type:'CMS_COLUMN',all:false,filter:true});
    //海报模版
    let template = req.dataApi.$getDataSync('/api/wechat/admin/share/template/1/150?orderMethod=letter');
    res.locals.expose.add('template', template);
    //小程序
    let xcx = req.dataApi.$getDataSync(`/api/wechat/admin/mp/list`);
    let xcxList =  gzharr(xcx,res.locals.user.privileges,'authority');
    let arr = xcxList.map( (el) => {
        el.pages = req.dataApi.$getDataSync(`/api/wechat/admin/link/list?appId=${el.appId}`)
        return el;
    });
    res.locals.expose.add('xcx', arr);
    // 获取标签组
    let tagz = req.dataApi.$getDataSync('/api/wechat/admin/sign/type/index');
    //获取所有标签
    let tag = req.dataApi.$getDataSync('/api/wechat/admin/sign/find');
    let tagObj = buildTag(tagz,tag);
    res.locals.expose.add('tags', tagObj);
    res.render('cms/pages/design');
});


/*              广告图管理            */
router.get('/banner/list', auth.privilege('CLIENT_BANNER_LIST'), function(req, res, next) {
    res.locals.title = '广告管理';

    let xcx = req.dataApi.$getDataSync(`/api/wechat/admin/mp/list`);
    let xcxList =  gzharr(xcx,res.locals.user.privileges,'authority');
    let arr = xcxList.map( (el) => {
        el.pages = req.dataApi.$getDataSync(`/api/wechat/admin/link/list?appId=${el.appId}`)
        return el;
    });
    res.locals.expose.add('xcx', arr);


    //行政区域
    res.locals.dict = req.dataApi.dictJson({type:'ADMINISTRATIVE_REGION', depth:1,all:false});
    // 获取标签组
    let tagz = req.dataApi.$getDataSync('/api/wechat/admin/sign/type/index');
    //获取所有标签
    let tag = req.dataApi.$getDataSync('/api/wechat/admin/sign/find');
    let tagObj = buildTag(tagz,tag,'code');
    res.locals.expose.add('tags', tagObj);
    res.render('cms/pages/bannerManage');
});

router.get('/banner/:type/:id', auth.privilege('CLIENT_BANNER_EDIT'), function(req, res, next) {
    res.locals.title = req.params.type === 'add' ? '新增广告图' : '编辑广告图';
    res.locals.expose.add('type',  req.params.type);//设计详情
    if(req.params.id && req.params.type === 'edit'){
        res.locals.expose.add('id',  req.params.id);//设计详情
    }
    res.render('cms/pages/bannerEdie');
});

/*               标签管理               */

router.get('/tag/list', auth.privilege('CLIENT_TAG_EDIT'), function(req, res, next) {
    res.locals.title = '标签管理';
    res.render('cms/pages/newtags');
});

/*模版管理*/
router.get('/cms/template', auth.privilege('CMS_TEMPLATE'), function (req, res, next) {
    res.locals.title = '海报模版';
    res.locals.dict = req.dataApi.dictJson({type:'CMS_COLUMN',all:true});
    res.render('cms/pages/template')
});
router.get('/cms/editTemplate', auth.privilege('CMS_TEMPLATE_EDIT'), function (req, res, next) {
    res.locals.title = '增改模版';
    if(req.query && req.query.id){
        let template = req.dataApi.$getDataSync(`/api/wechat/admin/share/template/detail?id=${req.query.id}`);
        res.locals.expose.add('template', template);
    }
    if(req.query && req.query.type){
        res.locals.expose.add('type', req.query.type);
        res.locals.title = req.query.type === 'edit' ? '修改模版' : '增加模版';
    }
    res.locals.expose.add('templateType', req.query.templateType);
    //处理公众号 没有公众号权限的就不返回过去
    let gzharr = function(old,filter){
        let arr = [];
        if(old && old.map ){
            old.map(ele => {
                if(filter.indexOf(ele.privilege) > -1){
                    arr.push(ele);
                }else if(!ele.privilege){
                    arr.push(ele);
                }
            });
        }
        return arr;
    };
    let gzh = req.dataApi.$getDataSync(`/api/wechat-service/wechat/more/queryAccessTokens`);
    res.locals.expose.add('gzh', gzharr(gzh,res.locals.user.privileges));
    if(req.query.templateType === 'one'){
        res.render('cms/pages/editTemplate')
    }else {
        res.render('cms/pages/editTemplateMore')
    }
});
/*专题管理*/
router.get('/cms/specialManage',auth.privilege('CMS_SPECIAL_MANAGE'), function(req, res, next) {
    res.locals.title = '专题管理';
    res.locals.dict = req.dataApi.dictJson({type:'CMS_COLUMN',all:false,filter:true});
    res.render('cms/pages/specialManage');
});
router.get('/cms/specialDetails',auth.privilege('CMS_SPECIAL_MANAGE'), function(req, res, next) {
    res.locals.title = '专题详情';
    res.locals.dict = req.dataApi.dictJson({type:'CMS_COLUMN',all:false,filter:true});
    if (!req.query.id) {
        res.status(404);
        next();
        return;
    }
    res.locals.expose.add('specialDetailsId',req.query.id);
    res.render('cms/pages/specialDetails');
});


//
router.get('/cms/innerRecommend',auth.privilege('CMS_INNERRECOMMEND'), function(req, res, next) {
    res.locals.title = '专题详情';
    res.render('cms/pages/innerRecommend');
});

router.get('/cms/serviceManagement',auth.privilege('CMS_SERVICE_MANAGEMENT'), function(req, res, next) {
    res.locals.title = '服务商管理';
    res.render('cms/pages/serviceManagement');
});
