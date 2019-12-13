/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 43);
/******/ })
/************************************************************************/
/******/ ({

/***/ 43:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__error__ = __webpack_require__(9);
/* jshint esversion: 6 */



/* harmony default export */ __webpack_exports__["default"] = ({
    //全局错误消息
    ERROR: __WEBPACK_IMPORTED_MODULE_0__error__["default"].SYSTEM_ERROR,
    NETWORK: __WEBPACK_IMPORTED_MODULE_0__error__["default"].NETWORK_ERROR,

    /**************************             枚举值                  **************************/

    //品牌别名用于指派
    BRAND: [{ value: 'SOGAL', label: '衣柜' }, { value: 'SCHMIDT', label: '橱柜' }, { value: 'MILANA', label: '木门' }],
    // 房屋类型
    CUST_HOUSE_TYPE: [{ value: 'MPF', label: '毛坯房' }, { value: 'JZF', label: '精装房' }, { value: 'LF', label: '老房' }, { value: 'new', label: '新房' }, { value: 'old', label: '老房' }],
    //空间类型
    SPACE_TYPE: [{ value: 'LIVING_ROOM', label: '客厅' }, { value: 'DINING_ROOM', label: '餐厅' }, { value: 'COOK_ROOM', label: '厨房' }, { value: 'BALCONY', label: '阳台' }, { value: 'SCHOOL_ROOM', label: '书房' }, { value: 'CLOAK_ROOM', label: '衣帽间' }, { value: 'MASTER_ROOM', label: '主人房' }, { value: 'OLD_ROOM', label: '老人房' }, { value: 'CHILDREN_ROOM', label: '儿童房' }, { value: 'MULTI_FUNCTION_ROOM', label: '多功能室' }, { value: 'HOUSEHOLD', label: '入户' }, { value: 'EXTRA1', label: '次卧1' }, { value: 'EXTRA2', label: '次卧2' }, { value: 'WASHROOM', label: '卫生间' }, { value: 'STUDY', label: '书房' }, { value: 'MASTER', label: '主卧' }, { value: 'BATHROOM', label: '主卫' }, { value: 'RESTROOM', label: '公卫' }, { value: 'OTHER', label: '其它' }],
    //合作方备案类型
    COOPERATOR_TYPE: [{ value: 'DESIGNER', label: '合作设计师' }, { value: 'COMPANY', label: '合作装饰公司' }, { value: 'BRAND', label: '品牌联盟' }, { value: 'DIFFERENT', label: '异业联盟' }, { value: 'SQCOOPERATOR', label: '社群合作平台' }],
    DELIVERY_PART: [{ value: true, label: '是' }, { value: false, label: '否' }],
    //组织机构的类型
    ORG_TYPE: [{ value: 'DEPT', label: '部门' }, { value: 'STORE', label: '专卖店' }, { value: 'P_SHOP', label: 'P店' }],
    //用户类型
    USER_TYPE: [{ value: 'C', label: '客户' }, { value: 'E', label: '员工' }, { value: 'H', label: '合作方' }],
    //性别
    GENDER: [{ value: 'MALE', label: '男' }, { value: 'FEMALE', label: '女' }],
    //审批状态
    APPROVAL_STATUS: [{ value: 'NEW', label: '新建' }, { value: 'APPROVING', label: '审批中' }, { value: 'SENDBACK', label: '已退回' }, { value: 'CANCELLED', label: '已否决' }, { value: 'PASSED', label: '已完成' }],
    //员工状态
    EMPLOYEE_STATUS: [{ value: 'TRAIL', label: '试用' }, { value: 'TRAINEE', label: '实习' }, { value: 'WAIT', label: '待岗' }, { value: 'FORMAL', label: '正式' }, { value: 'RETIRED', label: '退休' }, { value: 'DIMISSION', label: '离职' }],
    //数据权限
    DATA_PRIVILEGE: [{ label: '全部', value: 'ALL' }, { label: '本人', value: 'I' }, { label: '本人及下属', value: 'WE' }, { label: '本部门', value: 'DEPARTMENT' }, { label: '本部门及下级部门', value: 'WEDEPART' }],
    //菜单图标
    MENU_ICON: [{ value: 'icon-user-management', label: 'icon-user-management' }, { value: 'icon-cms', label: 'icon-cms' }, { value: 'icon-wechat', label: 'icon-wechat' }, { value: 'icon-channel', label: 'icon-channel' }, { value: 'icon-distributor', label: 'icon-distributor' }, { value: 'icon-audit', label: 'icon-audit' }, { value: 'icon-sales', label: 'icon-sales' }, { value: 'icon-home', label: 'icon-home' }, { value: 'icon-undue', label: 'icon-undue' }, { value: 'icon-pool', label: 'icon-pool' }, { value: 'icon-finance', label: 'icon-finance' }, { value: 'icon-pay', label: 'icon-pay' }, { value: 'icon-logistics', label: 'icon-logistics' }, { value: 'icon-install', label: 'icon-install' }, { value: 'icon-service', label: 'icon-service' }, { value: 'icon-setup', label: 'icon-setup' }, { value: 'icon-configure', label: 'icon-configure' }, { value: 'icon-user', label: 'icon-user' }, { value: 'icon-search', label: 'icon-search' }, { value: 'icon-focus', label: 'icon-focus' }, { value: 'icon-sun', label: 'icon-sun' }, { value: 'icon-moon', label: 'icon-moon' }, { value: 'el-icon-star-on', label: 'el-icon-star-on' }, { value: 'el-icon-date', label: 'el-icon-date' }, { value: 'el-icon-time', label: 'el-icon-time' }, { value: 'el-icon-goods', label: 'el-icon-goods' }, { value: 'el-icon-bell', label: 'el-icon-bell' }, { value: 'el-icon-service', label: 'el-icon-service' }, { value: 'el-icon-picture-outline', label: 'el-icon-picture-outline' }, { value: 'el-icon-location-outline', label: 'el-icon-location-outline' }],
    //时间单位
    TIME_UNIT: [{ value: 'Y', label: '年' }, { value: 'M', label: '月' }, { value: 'W', label: '周' }, { value: 'D', label: '日' }],
    COOPERATING_STATE: [{ value: 'RUNNING', label: '合作中' }, { value: 'STOPPED', label: '停止合作' }],
    //发布终端
    FBZD: [{ value: 'WEB', label: 'DSP网页端' }, { value: 'MINAPP', label: '索小秘' }],
    //系统设置 - 标签管理 --作用域
    TAGSCOPE: [{ value: 'CUSTOMER', label: '客户' }, { value: 'ORGANIZATION', label: '组织机构' }, { value: 'PLAN', label: '计划' }, { value: 'POSITION', label: '职位' }, { value: 'BUDGET', label: '预算单' }, { value: 'ORDER', label: '订单' }, { value: 'SUPPLEMENT', label: '增补单' }, { value: 'SAMPLE', label: '上样单' }],
    ORG_SELF_TYPE: [{ value: 'C', label: '合作店' }, { value: 'O', label: '外包店' }, { value: 'S', label: '自营店' }],
    // 菜单管理作用域
    MENU_SCOPE: [{ value: 'BI', label: '报表' }, { value: 'DSP', label: '主营' }, { value: 'CONSOLE', label: '管理' }, { value: 'INSTALL', label: '安装小程序' }, { value: 'DELIVERY', label: '物流司机端' }, { value: 'CRM', label: '索小秘' }],

    // todo 悟空快装翻新+ 索菲亚定制+
    //     QRCODE("小程序码"),          //最早的那种分享海报的分享方式
    //     CARD("分享卡"),
    //     CMSQRCODE("CMS二维码"),
    //     MY_CARD("我的名片"),
    //     WECHAT_SERVICE_ACCOUNT("微信公众号"),
    //     POSTER_QRCODE("海报二维码");
    shareMethod: [{ value: 'WECHAT_SERVICE_ACCOUNT', label: '微信公众号' }, { value: 'QRCODE', label: '海报小程序码' }, { value: 'POSTER_QRCODE', label: '海报二维码' }, { value: 'CARD', label: '分享卡' }, { value: 'CMSQRCODE', label: '自定义二维码' }, { value: 'MY_CARD', label: '推广大使名片' }],
    // 客户种类
    levels: [{ value: 'VISITOR', label: '访客' }, { value: 'USER', label: '用户' }],
    // 专题类别
    categories: [{ value: 'DESIGN', label: '全屋定制', key: '索菲亚定制+' }, { value: 'REFORM', label: '局部翻新', key: '悟空快装翻新+' }],
    // 房屋户型
    FWHX: [{ value: 'YSYT', label: '一室一厅' }, { value: 'ESYT', label: '二室一厅' }, { value: 'LSLT', label: '两室两厅' }, { value: 'SSYT', label: '三室一厅' }, { value: 'SSLT', label: '三室两厅' }, { value: 'SISYT', label: '四室一厅' }, { value: 'SISLT', label: '四室两厅' }, { value: 'FSSSLTYS', label: '复式' }, { value: 'BS', label: '别墅' }, { value: 'QT', label: '其他' }],
    //小程序图标     value小程序图标      label电脑显示的图标
    WX_ICON: [{ value: 'icon-consultation', label: 'icon-consultation' }, { value: 'icon-triangle', label: 'icon-triangle' }, { value: 'icon-gift', label: 'icon-gift' }, { value: 'icon-free', label: 'icon-free' }],
    //资深/专业/新手
    stylistGrade: [{ value: 'A_new', label: '新锐' }, { value: 'B_special', label: '专业' }, { value: 'C_senior', label: '资深' }],
    identityList: [{ value: 'mc', label: '主案' }, { value: 'ac', label: '助理' }],
    //公众号用户关注的渠道来源，
    gzhLaiyuan: [{ value: 'ADD_SCENE_SEARCH', label: '公众号搜索' }, { value: 'ADD_SCENE_ACCOUNT_MIGRATION', label: '公众号迁移' }, { value: 'ADD_SCENE_PROFILE_CARD', label: '名片分享' }, { value: 'ADD_SCENE_QR_CODE', label: '扫描二维码' }, { value: 'ADD_SCENE_PROFILE_ LINK', label: '图文页内名称点击' }, { value: 'ADD_SCENE_PROFILE_ITEM', label: '图文页右上角菜单' }, { value: 'ADD_SCENE_PAID', label: '支付后关注' }, { value: 'ADD_SCENE_OTHERS', label: '其他' }],

    //分享卡手机端分享的是那个页面
    generalizePage: [{ value: 'SOGAL_INDEX', label: '全屋定制主页' }, { value: 'WK_INDEX', label: '局部翻新主页' }, { value: 'SOGAL_LIST', label: '全屋定制列表' }, { value: 'WK_LIST', label: '局部翻新列表' }, { value: 'USER_INFO', label: '个人详情页' }, { value: 'WECHAT_DESIGN_C', label: '设计酷家乐分享页' }, { value: 'ACT_ENTER_INDEX', label: '活动报名页' }],
    // 需求品类
    REQUIRECATEGORY: [{
        value: 'BEDROOM',
        label: '衣柜'
    }, {
        value: 'KITCHEN',
        label: '橱柜'
    }, {
        value: 'DOOR',
        label: '木门'
    }, {
        value: 'FLOOR',
        label: '地板'
    }, {
        value: 'FURNITURE',
        label: '家具'
    }, {
        value: 'CURTAIN',
        label: '窗帘'
    }, {
        value: 'ORNAMENTS',
        label: '饰品'
    }, {
        value: 'ELECTRIC_APPLIANCE',
        label: '电器'
    }],

    //创薪合伙人等级
    PROMOTIONLEVEL: [{ value: 'LV0', label: '青铜' }, { value: 'LV1', label: '白银' }, { value: 'LV2', label: '黄金' }],
    INEFFECTIVE_REASONS: [{ "label": "已购买竞品", "value": "BuyCompetingProducts", "sortOrder": 0 }, { "label": "客户手机号错误", "value": "CustomerMobileError", "sortOrder": 0 }, { "label": "无订购意向", "value": "NoOrderIntention", "sortOrder": 0 }, { "label": "产品工艺不好", "value": "PoorProductTechnology", "sortOrder": 0 }, { "label": "价格过高", "value": "Overpriced", "sortOrder": 0 }, { "label": "服务体验不好", "value": "ServiceExperienceDifference", "sortOrder": 0 }, { "label": "设计不满意", "value": "NotSatisfiedWithDesign", "sortOrder": 0 }, { "label": "联系不到客户", "value": "NoContactWithCustomers", "sortOrder": 0 }, { "label": "无客户需求的产品风格", "value": "NoCustomerStyle", "sortOrder": 0 }, { "label": "无效客户", "value": "InvalidCustomer", "sortOrder": 0 }],
    //报名客户状态
    registerUserStage: [{ "label": "待确认", "value": "CONFIRM" }, { "label": "测量且到店", "value": "MEASURE_STORE" }, { "label": "无效", "value": "INVALID" }, { "label": "成交", "value": "TRADED" }],
    //小程序页面链接参数类型

    /**************************             业务字典                  **************************/
    $dict: null,
    dict: function dict(type) {
        var self = this;
        if (!self.$dict) {
            var script = document.querySelector('script[type="text/json"][name="dict"]');
            var text = script && script.innerText || '{}';
            try {
                self.$dict = JSON.parse(text);
            } catch (e) {}
        }
        return type && self.$dict ? self.$dict[type] || [] : self.$dict || {};
    }
});

/***/ }),

/***/ 9:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* jshint esversion: 6 */

/* harmony default export */ __webpack_exports__["default"] = ({
    //系统错误
    SYSTEM_ERROR: {
        DEFAULT: '未知错误',
        '999': '未知错误',
        '800': '数据保存失败',
        '801': '数据修改失败',
        '802': '数据删除失败',
        '803': '数据查询失败',
        '804': '【804】违反数据唯一约束',
        '810': '【810】登录会话已过期，请重新登录',
        '811': '【811】用户未登录',
        '812': '【812】用户权限不足',
        '813': '【813】验证码错误',
        '830': '【830】抱歉，系统服务繁忙，请稍后重试！'
    },
    //网络错误
    NETWORK_ERROR: {
        DEFAULT: '网络通信异常，请稍后重试',
        '400': '请求参数错误！',
        '401': '权限不足！系统已记录本次操作，请勿尝试越权操作！',
        '403': '禁止访问！',
        '404': '请求地址错误！',
        '500': '抱歉，系统服务繁忙，请稍后重试！',
        '502': '抱歉，系统服务繁忙，请稍后重试！',
        '503': '抱歉，系统服务繁忙，请稍后重试！',
        '504': '请求超时，您的网络环境不稳定，请稍后重试！'
    }
});

/***/ })

/******/ });