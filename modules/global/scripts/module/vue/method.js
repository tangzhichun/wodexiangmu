/* jshint esversion: 6 */

import { Base64 } from 'js-base64';

export default {
    // 业务字典翻译
    $translate: function (dict, value) {
        if (!dict || !dict.length || !value) {
            return value;
        }

        let match = null;
        dict.forEach(d => {
            if (d.value == value) {
                match = d;
            } else if (d.children && d.children.length) {
                d.children.forEach(c => {
                    if (c.value == value) {
                        match = c;
                    } else if (c.children && c.children.length) {
                        c.children.forEach(i => {
                            if (i.value == value) {
                                match = i;
                            }
                        });
                    }
                });
            }
        });

        return match && match.label || value;
    },
    $sceneInfo (s) {
        var scene = [];
        s = s*1;
        switch (s) {
            case 1001:
                scene.push(s, '发现栏小程序主入口');
                break;
            case 1005:
                scene.push(s, '顶部搜索框的搜索结果页');
                break;
            case 1006:
                scene.push(s, '发现栏小程序主入口搜索框的搜索结果页');
                break;
            case 1007:
                scene.push(s, '单人聊天会话中的小程序消息卡片');
                break;
            case 1008:
                scene.push(s, '群聊会话中的小程序消息卡片');
                break;
            case 1011:
                scene.push(s, '扫描二维码');
                break;
            case 1012:
                scene.push(s, '长按图片识别二维码');
                break;
            case 1014:
                scene.push(s, '手机相册选取二维码');
                break;
            case 1017:
                scene.push(s, '前往体验版的入口页');
                break;
            case 1019:
                scene.push(s, '微信钱包');
                break;
            case 1020:
                scene.push(s, '公众号profile页相关小程序列表');
                break;
            case 1022:
                scene.push(s, '聊天顶部置顶小程序入口');
                break;
            case 1023:
                scene.push(s, '安卓系统桌面图标');
                break;
            case 1024:
                scene.push(s, '小程序profile页');
                break;
            case 1025:
                scene.push(s, '扫描一维码');
                break;
            case 1026:
                scene.push(s, '附近小程序列表');
                break;
            case 1027:
                scene.push(s, '顶部搜索框搜索结果页“使用过的小程序”列表');
                break;
            case 1028:
                scene.push(s, '我的卡包');
                break;
            case 1029:
                scene.push(s, '卡券详情页');
                break;
            case 1031:
                scene.push(s, '长按图片识别一维码');
                break;
            case 1032:
                scene.push(s, '手机相册选取一维码');
                break;
            case 1034:
                scene.push(s, '微信支付完成页');
                break;
            case 1035:
                scene.push(s, '公众号自定义菜单');
                break;
            case 1036:
                scene.push(s, 'App分享消息卡片');
                break;
            case 1037:
                scene.push(s, '小程序打开小程序');
                break;
            case 1038:
                scene.push(s, '从另一个小程序返回');
                break;
            case 1039:
                scene.push(s, '摇电视');
                break;
            case 1042:
                scene.push(s, '添加好友搜索框的搜索结果页');
                break;
            case 1044:
                scene.push(s, '带shareTicket的小程序消息卡片');
                break;
            case 1047:
                scene.push(s, '扫描小程序码');
                break;
            case 1048:
                scene.push(s, '长按图片识别小程序码');
                break;
            case 1049:
                scene.push(s, '手机相册选取小程序码');
                break;
            case 1052:
                scene.push(s, '卡券的适用门店列表');
                break;
            case 1053:
                scene.push(s, '搜一搜的结果页');
                break;
            case 1054:
                scene.push(s, '顶部搜索框小程序快捷入口');
                break;
            case 1056:
                scene.push(s, '音乐播放器菜单');
                break;
            case 1058:
                scene.push(s, '公众号文章');
                break;
            case 1059:
                scene.push(s, '体验版小程序绑定邀请页');
                break;
            case 1064:
                scene.push(s, '微信连Wifi状态栏');
                break;
            case 1067:
                scene.push(s, '公众号文章广告');
                break;
            case 1068:
                scene.push(s, '附近小程序列表广告');
                break;
            case 1072:
                scene.push(s, '二维码收款页面');
                break;
            case 1073:
                scene.push(s, '客服消息列表下发的小程序消息卡片');
                break;
            case 1074:
                scene.push(s, '公众号会话下发的小程序消息卡片');
                break;
            case 1089:
                scene.push(s, '微信聊天主界面下拉');
                break;
            case 1090:
                scene.push(s, '长按小程序右上角菜单唤出最近使用历史');
                break;
            case 1092:
                scene.push(s, '城市服务入口');
                break;
            default:
                scene.push('未知入口');
                break;
        }
        let str = scene[1] || scene[0];
        return str;
    },
    // 合并两个对象
    $merge: function (obj, src) {
        for (var key in src) {
            if (src.hasOwnProperty(key)) obj[key] = src[key];
        }
        return obj;
    },

    // 解析浏览器地址栏请求参数
    $parseQuery: function () {
        let query = {};
        let search = window.location.search;
        if (search.startsWith('?')) {
            search = search.substr(1, search.length);
            search = search.split('&');

            search.forEach(s => {
                let idx = s.indexOf('=');
                if (idx !== -1) {
                    let prop = s.substr(0, idx);
                    let val = s.substr(idx + 1, s.length);

                    if (query[prop]) {
                        let arr = [].concat(query[prop]).concat(val);
                        query[prop] = arr;
                    } else {
                        query[prop] = val;
                    }

                }
            });
        }

        return query;
    },

    // base64编码
    $base64Encode: function (obj) {
        if (obj == undefined || obj == null) {
            return '';
        }

        if (typeof(obj) == 'object') {
            return Base64.encode(JSON.stringify(obj));
        } else if (typeof(obj) == 'string') {
            return Base64.encode(JSON.stringify(obj));
        } else {
            throw new Error('Only string or object can be encoded');
        }
    },

    // base64解码
    $base64Decode: function (str) {
        if (!str) {
            return;
        }

        let decoded = Base64.decode(str);
        try {
            return JSON.parse(decoded);
        } catch (err) {
            return decoded;
        }
    },

    $math: {
        /**
         * 求和
         * 数组求和，sum([1,2,3]) = 6
         * 参数求和，sum(1,2,3) = 6
         * @returns {number}
         */
        sum: function () {
            if (arguments.length == 0) {
                return 0;
            }

            let args = [];
            if (arguments.length == 1 && arguments[0] instanceof Array) {
                args = arguments[0];
            } else {
                args = arguments;
            }

            let sum = 0;
            for (var i = 0; i < args.length; i++) {
                if (typeof(args[i] == 'number')) {
                    sum += parseFloat(args[i]);
                } else if (typeof(args[i] == 'string') && !isNaN(args[i])) {
                    sum += parseFloat(args[i]);
                }
            }

            return sum;
        }
    },

    $history: {
        back: function () {
            if (document.referrer) {
                window.location.href = document.referrer;
            } else {
                window.history.back();
            }
        }
    },

    /**
     * 是否具备某项功能权限
     * @param privilege 业务权限值
     * @returns {boolean} true：具备，false：不具备
     */
    $hasPrivilege: function (privilege) {
        if (!privilege) {
            return true;
        }

        if (!DSP || !DSP.user || !DSP.user.privileges) {
            return false;
        }

        return DSP.user.privileges.indexOf(privilege) != -1;
    },

    /**
     * 是否具备某项业务权限
     * @param type 业务权限类型
     * @param privilege 业务权限值
     * @returns {boolean} true：具备，false：不具备
     */
    $hasBizPrivilege: function (type, privilege) {
        if (!privilege) {
            return true;
        }

        if (!DSP || !DSP.user || !DSP.user.currPosition) {
            return false;
        }

        if (!DSP.user.currPosition.bizPrivileges || !DSP.user.currPosition.bizPrivileges[type]) {
            //如果未配置业务权限，则默认为具有该权限
            return true;
        }

        return DSP.user.currPosition.bizPrivileges[type].indexOf(privilege) != -1;
    },
    // 根据单位确定计算方式，并返回金额
    $price: function(unit,product){
        var { price,quantity,ratio,width,height} = product;
        var base = ( price || 0 ) * ( ratio || 0 ) * ( quantity || 0 );
        var area = ( ( width || 0 ) * 0.001 * ( height || 0 ) * 0.001 || 0).toFixed(4);
        var  obj = {
            num: 0,
            area: null
        };
        if( unit.indexOf('YG.') > -1){
            obj.num = base;
        }else if(unit.indexOf('YM.') > -1){
            obj.num = base * ( height || 0) * 0.001;
        }else if (unit.indexOf('YP.') > -1){
            obj.area = area;
            obj.num = base * area ;
        }
        obj.num = obj.num.toFixed(2);
        obj.num = obj.num.replace('.00', '');
        return obj;
    },

    // 将java的LocalDateTime时间格式变成时间戳
    $localDateTimeNumber: function  (el, type = 's') {
        el = new Date((`${el.year}-${el.monthValue}-${el.dayOfMonth} ${el.hour}:${el.minute}:${el.second}`).replace(/-/g, '/'));
        el = el.getTime();
        return el ;
    },
};
