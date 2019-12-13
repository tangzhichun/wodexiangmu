'use strict';

const config = require('config');
const request = require('superagent');
const sync = require('promise-synchronizer');
const logger = require('./logger');

module.exports = (req) => {
    return {
        $req: req,
        $url: function (url) {
            if (url.startsWith("http")) {
                return url;
            } else {
                return config.oauth.url + url;
            }
        },
        $request: function (method, url) {
            var self = this;

            // const ipAddress = self.$req.headers['x-forwarded-for'] || self.$req.connection.remoteAddress;
            // const contentType = self.$req.headers['content-type'];
            // const userAgent = self.$req.headers['user-agent'];
            // const cookie = self.$req.headers.cookie || '';

            const headers = {
                'x-forwarded-for': self.$req.headers['x-forwarded-for'] || self.$req.connection.remoteAddress,
                'content-type': self.$req.headers['content-type'],
                'user-agent': self.$req.headers['user-agent'],
                'cookie': self.$req.headers.cookie
            }

            let req = request[method](self.$url(url)).accept('application/json');
            for (let key in headers) {
                if (key && headers[key]) {
                    req.set(key, headers[key]);
                }
            }

            return req;
        },
        $get: function (url) {
            var self = this;

            return self.$request('get', url).then((res) => {
                return res.body;
            });
        },
        $post: function (url, body) {
            var self = this;

            return self.$request('post', url).send(body).then((res) => {
                return res.body;
            });
        },
        $put: function (url, body) {
            var self = this;

            return self.$request('put', url).send(body).then((res) => {
                return res.body;
            });
        },
        $delete: function (url, body) {
            var self = this;

            return self.$request('delete', url).send(body).then((res) => {
                return res.body;
            });
        },
        $handle: function (url) {
            if (req.method == 'POST') {
                return this.$post(url, req.body);
            } else if (req.method == 'DELETE') {
                return this.$delete(url, req.body);
            } else if (req.method == 'PUT') {
                return this.$put(url, req.body);
            } else {
                return this.$get(url);
            }
        },
        /**
         * 查询数据
         * @param url
         * @returns Promise
         */
        $getData: function (url) {
            if (!url) {
                return Promise.resolve(null);
            }
            return this.$get(url).then((r) => {
                if (r && r.success) {
                    return r.data;
                }
                return null;
            });
        },
        /**
         * 查询数据（同步）
         * @param url
         * @returns 数据对象
         */
        $getDataSync: function (url) {
            return sync(this.$getData.apply(this, arguments));
        },
        /**
         * 查询列表数据
         * @param url
         * @returns Promise
         */
        $getList: function (url) {
            if (!url) {
                return Promise.resolve(null);
            }

            return this.$get(url).then((r) => {
                if (r && r.success) {
                    return r.data;
                }

                return [];
            }).catch((e) => {
                logger.error(e);
                return [];
            });
        },
        /**
         * 查询列表数据（同步）
         * @param body
         * @returns 列表数据集
         */
        $getListSync: function (url) {
            return sync(this.$getList.apply(this, arguments));
        },
        /**
         * 查询多个接口数据
         * @param body
         * @returns Promise
         */
        $getAll: function () {
            if (!arguments.length) {
                return Promise.resolve(null);
            }

            let self = this;

            const promises = Array.prototype.slice.apply(arguments).map(url => self.$getData(url));
            return Promise.all(promises);
        },
        /**
         * 查询多个接口数据（同步）
         * @param body
         * @returns [] 多个接口数据
         */
        $getAllSync: function () {
            return sync(this.$getAll.apply(this, arguments));
        },
        /**
         * 登录
         * @param body
         * @returns Promise
         */
        login: function (body) {
            if (!body) {
                return Promise.reject('username and password are required');
            }

            var self = this;

            body.appId = config.oauth.appId;
            body.appSecret = config.oauth.appSecret;

            return self.$request('post', '/api/auth/login')
                .send(body || {})
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .then((res) => {
                    return res.body;
                });

        },
        /**
         * 退出登录
         * @returns Promise
         */
        logout: function () {
            return this.$post('/api/auth/logout');
        },
        /**
         * 取得登录用户
         * @returns 登录用户
         */
        myself: function () {
            let result = sync(this.$get(`/api/auth/myself?appid=${config.oauth.appId}`).then(r => {
                if (r && r.success && r.data) {
                    return r.data;
                }
                return null;
            }).catch((e) => {
                logger.error(e);
                return null;
            }));

            return result;
        },
        /**
         * 查询菜单
         * @returns 菜单树
         */
        menu: function () {
            const userId = req.user && req.user.id;
            const scope = config.oauth.appId.split('-')[0];
            return this.$getListSync('/api/menu/list/' + scope + '/byUser/' + userId);
        },
        /**
         * 查询业务字典，支持一次查询多项
         *
         * 传参方式一：dict('DICT_TYPE1', 'DICT_TYPE2')
         * 传参方式二：dict({type:'DICT_TYPE1', filter:true, depth:0, all:true}, {type:'DICT_TYPE2', filter:true, depth:0, all:true})
         * @returns 业务字典对象 {DICT_TYPE1:[{label:'label', value:'value'}, ...], DICT_TYPE2:[{label:'label', value:'value'}, ...]}
         */
        dict: function () {
            if (!arguments || !arguments.length) {
                return Promise.resolve(null);
            }
            const self = this;
            //判断输入是否为数组
            let types =Array.prototype.slice.call(arguments);
            if (arguments[0] instanceof Array){
                 types = Array.prototype.slice.call(arguments)[0];
            }

            const promises = types.map(type => self.$getList('/api/dict/' + (type && type.type || type) +
                '?brief=true&depth=' + (type.depth || 0) +
                '&filter=' + (type.filter || false) +
                (type.value?('&value=' + type.value):'') +
                '&all=' + (type.all !== false) +
                '&' + (type.dictPrivilegeType && ('dictPrivilegeType=' + type.dictPrivilegeType) || '')));

            return sync(Promise.all(promises).then((datas) => {
                let dict = {};
                types.forEach((type, i) => {
                    dict[type && type.type || type] = datas[i];
                });
                return dict;
            }));
        },
        /**
         * 查询业务字典，并且转成JSON输出
         * @returns 业务字典对象转换成的JSON字符串
         */
        /**
         * 查询业务字典，并且转成JSON输出
         * @returns 业务字典对象转换成的JSON字符串
         */
        dictJson: function () {
            let dict = this.dict.apply(this, arguments);
            return dict ? JSON.stringify(dict) : '{}';
        }
    }
};












