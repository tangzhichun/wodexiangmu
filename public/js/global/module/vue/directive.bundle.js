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
/******/ 	return __webpack_require__(__webpack_require__.s = 32);
/******/ })
/************************************************************************/
/******/ ({

/***/ 11:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* jshint esversion: 6 */

/* harmony default export */ __webpack_exports__["default"] = ({

    /**
     * 获取对象的属性值
     * @param obj       对象
     * @param prop      可以是'prop.prop[i].prop'的格式
     * @returns {*}
     */
    getProp: function (obj, prop) {
        let self = this;

        if (!obj || !prop) {
            return obj;
        }

        if (typeof prop != 'string') {
            throw new Error('prop must be a string');
        }

        if (prop.startsWith('.')) {
            prop = prop.substr(1);
            return self.getProp(obj, prop);
        }

        if (prop.endsWith('.')) {
            prop = prop.substr(0, prop.length - 1);
            return self.getProp(obj, prop);
        }

        if (obj[prop]) {
            return obj[prop];
        }

        //数组取值
        let i1 = prop.indexOf('[');
        let i2 = prop.indexOf('.');
        if (i1 != -1 && i2 != -1 && i1 < i2 || i1 != -1 && i2 == -1) {
            let p1 = prop.substr(0, i1);
            let p2 = prop.substr(i1, prop.length);
            let v1 = obj[p1];
            if (!v1) {
                return v1;
            } else if (typeof v1 != 'object' || !(v1 instanceof Array)) {
                //非数组
                return null;
            } else {
                let props = p2.split('.');
                prop = props.shift().replace('[', '').replace(']', '');

                if (props.length > 0) {
                    return self.getProp(v1[prop], props.join('.'));
                } else {
                    return v1[prop];
                }
            }
        }

        //对象取值
        let props = prop.split('.');
        prop = props.shift();

        if (props.length > 0) {
            return self.getProp(obj[prop], props.join('.'));
        } else {
            return obj[prop];
        }
    },

    /**
     * 设置对象的属性值
     * @param obj       对象
     * @param prop      可以是'prop.prop.prop'的格式
     * @param prop      值
     * @returns {*}
     */
    setProp: function (obj, prop, val) {
        let self = this;

        if (!obj || !prop) {
            return obj;
        }

        if (typeof prop != 'string') {
            throw new Error('prop must be a string');
        }

        if (prop.startsWith('.')) {
            prop = prop.substr(1);
            self.setProp(obj, prop, val);
            return;
        }

        if (prop.endsWith('.')) {
            prop = prop.substr(0, prop.length - 1);
            self.setProp(obj, prop, val);
            return;
        }

        let props = prop.split('.');
        prop = props.shift();

        if (props.length > 0) {
            if (obj[prop] && typeof obj[prop] == 'object' && !(obj[prop] instanceof Array)) {
                self.setProp(obj[prop], props.join('.'), val);
            } else {
                obj[prop] = {};
                self.setProp(obj[prop], props.join('.'), val);
                return;
            }
        } else {
            obj[prop] = val;
        }
    }
});

/***/ }),

/***/ 32:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(11);
/* jshint esversion: 6 */



let bindFieldValidator = function (el, binding, vnode) {
    // 解析动态表达式
    let prop = binding.expression;
    for (let key of Object.keys(vnode.data.attrs)) {
        if (key && key.startsWith('dsp-index-')) {
            prop = prop.replace(key.substr('dsp-index-'.length, key.length), vnode.data.attrs[key]);
        }
    }

    //binding.expression.replace(/\[[a-zA-Z0-9]*]/g, '.');
    // let ruleProp = binding.expression.replace(/\[/g, '.').replace(/]/g, '');
    let ruleProp = binding.expression;

    // 解析校验规则
    let rules = __WEBPACK_IMPORTED_MODULE_0__utils__["default"].getProp(vnode.context, '$data.$validator.rule');
    let rule = __WEBPACK_IMPORTED_MODULE_0__utils__["default"].getProp(rules, ruleProp);
    if (!rule) {
        //没有规则，不做校验
        console.warn('can not find validate rule config for ' + ruleProp + ' in $validator.rule, it will not be verified. ');
        return;
    }

    if (!vnode.context.$data.$validator.validator) {
        vnode.context.$data.$validator.validator = {};
    }

    // 字段校验
    let fieldValidator = function (value) {
        let val = value || __WEBPACK_IMPORTED_MODULE_0__utils__["default"].getProp(vnode.context, '$data.' + prop);

        return Promise.resolve({ $prop: prop }).then(error => {
            if (rule.required) {
                if (!val) {
                    error.required = true;
                } else if (typeof val == 'string' && val.trim().length == 0) {
                    error.required = true;
                } else if (val instanceof Array && val.length == 0) {
                    error.required = true;
                } else if (typeof val == 'object' && Object.keys(val).length == 0) {
                    error.required = true;
                } else {
                    error.required = false;
                }
            }
            return error;
        }).then(error => {
            if (rule.minLength) {
                if (!val) {
                    error.minLength = false;
                } else if (typeof val == 'string' && val.trim().length < rule.minLength) {
                    error.minLength = true;
                } else if (val instanceof Array && val.length < rule.minLength) {
                    error.minLength = true;
                } else {
                    error.minLength = false;
                }
            }

            return error;
        }).then(error => {
            if (rule.min || rule.min === 0) {
                if (!val) {
                    error.min = false;
                } else if (typeof val == 'string') {
                    if (val.trim().length == 0 || isNaN(val)) {
                        error.min = false;
                    } else {
                        error.min = parseFloat(val) <= rule.min;
                    }
                } else {
                    error.min = false;
                }
            }

            return error;
        }).then(error => {
            if (rule.max) {
                if (!val) {
                    error.max = false;
                } else if (typeof val == 'string') {
                    if (val.trim().length == 0 || isNaN(val)) {
                        error.max = false;
                    } else {
                        error.max = parseFloat(val) > rule.max;
                    }
                } else {
                    error.max = false;
                }
            }

            return error;
        }).then(error => {
            if (rule.remote && typeof rule.remote == 'function') {
                return rule.remote(vnode.context.$data, val).then(pass => {
                    if (!pass) {
                        error.remote = true;
                    } else {
                        error.remote = false;
                    }

                    return error;
                });
            }

            return error;
        }).then(error => {
            if (rule.customize && typeof rule.customize == 'function') {
                return rule.customize(vnode.context.$data, val).then(pass => {
                    if (!pass) {
                        error.customize = true;
                    } else {
                        error.customize = false;
                    }

                    return error;
                });
            }

            return error;
        }).then(error => {
            error.$pass = Object.keys(error).map(key => error[key]).filter(v => v == true).length == 0;

            if (!error.$pass) {
                // 未通过校验
                if (!vnode.context.$data.$validator.error) {
                    vnode.context.$data.$validator.error = {};
                }

                vnode.context.$data.$validator.error[prop] = error;
            } else {
                // 通过校验
                if (vnode.context.$data.$validator.error) {
                    delete vnode.context.$data.$validator.error[prop];
                }
            }

            return error;
        }).then(error => {
            /* 添加CSS */

            if (!el.classList.contains('form-validate-field')) {
                el.classList.add('form-validate-field');
            }

            if (!error.$pass) {
                // 未通过校验
                if (!el.classList.contains('is-error')) {
                    el.classList.add('is-error');
                }
            } else {
                // 通过校验
                el.classList.remove('is-error');
            }

            if (error.required) {
                if (!el.classList.contains('err-required')) {
                    el.classList.add('err-required');
                }
            } else {
                el.classList.remove('err-required');
            }

            if (error.minLength) {
                if (!el.classList.contains('err-minlength')) {
                    el.classList.add('err-minlength');
                }
            } else {
                el.classList.remove('err-minlength');
            }

            if (error.min) {
                if (!el.classList.contains('err-min')) {
                    el.classList.add('err-min');
                }
            } else {
                el.classList.remove('err-min');
            }

            if (error.max) {
                if (!el.classList.contains('err-max')) {
                    el.classList.add('err-max');
                }
            } else {
                el.classList.remove('err-max');
            }

            if (error.remote) {
                if (!el.classList.contains('err-remote')) {
                    el.classList.add('err-remote');
                }
            } else {
                el.classList.remove('err-remote');
            }

            if (error.customize) {
                if (!el.classList.contains('err-customize')) {
                    el.classList.add('err-customize');
                }
            } else {
                el.classList.remove('err-customize');
            }

            return error.$pass;
        });
    };

    // 注册到表单校验器中
    vnode.context.$data.$validator.validator[prop] = fieldValidator;

    // 字段监听，变化后自动校验
    if (!vnode.context.$data.$validator.watcher) {
        vnode.context.$data.$validator.watcher = {};
    }

    // 字段监听
    let unwatch = vnode.context.$watch(prop, function (newVal, oldVal) {
        console.debug(prop + ' value changed from %o to: %o', oldVal, newVal);
        fieldValidator(newVal);
    });

    // 表单监听器中存在该字段监听，则先注销旧的字段监听器
    if (vnode.context.$data.$validator.watcher[prop]) {
        vnode.context.$data.$validator.watcher[prop]();
        delete vnode.context.$data.$validator.watcher[prop];
        console.debug('watcher removed:' + prop);
    }

    // 注册到表单监听器中
    console.debug('watcher added:' + prop);
    vnode.context.$data.$validator.watcher[prop] = unwatch;

    console.debug('validator: %o', vnode.context.$data.$validator);
};

let unbindFieldValidator = function (el, binding, vnode) {
    // 解析动态表达式
    let prop = binding.expression;
    for (let key of Object.keys(vnode.data.attrs)) {
        if (key && key.startsWith('dsp-index-')) {
            prop = prop.replace(key.substr('dsp-index-'.length, key.length), vnode.data.attrs[key]);
        }
    }

    // 从校验错误中移除
    if (vnode.context.$data.$validator.error) {
        delete vnode.context.$data.$validator.error[prop];
        console.debug('error removed:' + prop);
    }

    // 从表单校验器中移除
    if (vnode.context.$data.$validator.validator) {
        delete vnode.context.$data.$validator.validator[prop];
        console.debug('validator removed:' + prop);
    }

    // 从表单监听器中移除
    if (vnode.context.$data.$validator.watcher && vnode.context.$data.$validator.watcher[prop]) {
        vnode.context.$data.$validator.watcher[prop]();
        delete vnode.context.$data.$validator.watcher[prop];
        console.debug('watcher removed:' + prop);
    }

    console.debug('validator: %o', vnode.context.$data.$validator);
};

/* harmony default export */ __webpack_exports__["default"] = ({

    //只允许输入整数
    integer: {
        bind: function (el, binding, vnode) {
            let input = el.tagName === 'INPUT' ? el : el.querySelector('input');
            el.onkeydown = function ($event) {
                let keyCode = $event.keyCode;
                let val = input.value;

                if (keyCode === 8 || keyCode === 9 || keyCode === 46 || keyCode === 37 || keyCode === 39 || keyCode === 17 || keyCode === 86) {
                    //退格、Tab键、删除、方向、Control+V键
                } else {
                    //只允许输入整数
                    if (keyCode >= 48 && keyCode <= 57 || keyCode >= 96 && keyCode <= 105) {
                        // if (val === '0') {
                        //     //首位数字为0，禁止输入
                        //     $event.preventDefault();
                        // }
                    } else {
                        $event.preventDefault();
                    }
                }
            };

            let prop = binding.expression;
            if (prop) {
                vnode.context.$watch(prop, function (newVal, oldVal) {
                    // let regExp =  /^0{1}$|^[1-9]{1}\d*$/;
                    let regExp = /^0{1}$|^[0-9]{1}\d*$/;
                    if (newVal && !regExp.test(newVal)) {
                        console.debug('%o 不是有效的整数, 还原到上次有效值 %o', newVal, oldVal);
                        //
                        // let bytes = newVal.split('');
                        // let validVal;
                        //
                        // while (bytes.length > 0) {
                        //     bytes.pop();
                        //     validVal = bytes.join('');
                        //     if (regExp.test(validVal)) {
                        //         break;
                        //     }
                        // }

                        __WEBPACK_IMPORTED_MODULE_0__utils__["default"].setProp(vnode.context, '$data.' + prop, oldVal);
                    }
                });
            } else {
                console.warn('%o v-dsp-input-integer 输入框未指定监听属性，无法避免中文输入法或鼠标事件引起的输入错误，正确用法：v-dsp-input-integer="vm.your.property"', input);
            }
        }
    },

    //允许输入6位数字验证码
    captcha: {
        bind: function (el, binding, vnode) {
            let input = el.tagName === 'INPUT' ? el : el.querySelector('input');
            el.onkeydown = function ($event) {
                let keyCode = $event.keyCode;

                if (keyCode === 8 || keyCode === 9 || keyCode === 46 || keyCode === 37 || keyCode === 39 || keyCode === 17 || keyCode === 86) {
                    //退格、Tab键、删除、方向、Control+V键
                } else {
                    //验证码这种纯数字
                    if (keyCode < 48 || keyCode > 105 || keyCode > 57 && keyCode < 96) {
                        $event.preventDefault();
                    }
                }
            };

            let prop = binding.expression;
            if (prop) {
                vnode.context.$watch(prop, function (newVal, oldVal) {
                    let regExp = /^\d{0,6}$/;
                    if (newVal && !regExp.test(newVal)) {
                        console.debug('%o 不是有效的验证码, 还原到上次有效值 %o', newVal, oldVal);
                        //
                        // let bytes = newVal.split('');
                        // let validVal;
                        //
                        // while (bytes.length > 0) {
                        //     bytes.pop();
                        //     validVal = bytes.join('');
                        //     if (regExp.test(validVal)) {
                        //         break;
                        //     }
                        // }

                        __WEBPACK_IMPORTED_MODULE_0__utils__["default"].setProp(vnode.context, '$data.' + prop, oldVal);
                    }
                });
            } else {
                console.warn('%o v-dsp-input-captcha 输入框未指定监听属性，无法避免中文输入法或鼠标事件引起的输入错误，正确用法：v-dsp-input-captcha="vm.your.property"', input);
            }
        }
    },

    //允许输入整数或浮点数，小数点后保留2位
    number: {
        bind: function (el, binding, vnode) {
            let input = el.tagName === 'INPUT' ? el : el.querySelector('input');

            el.onkeydown = function ($event) {
                let keyCode = $event.keyCode;
                let val = input.value;
                if (keyCode === 8 || keyCode === 9 || keyCode === 46 || keyCode === 37 || keyCode === 39 || keyCode === 17 || keyCode === 86) {
                    //退格、Tab键、删除、方向、Control+V键

                } else {
                    //可输入整数或小数（精确到小数点后两位）
                    if (keyCode >= 48 && keyCode <= 57 || keyCode >= 96 && keyCode <= 105 || keyCode === 110 || keyCode === 190) {

                        if (val === '' && (keyCode === 110 || keyCode === 190)) {
                            //不允许直接输入小数点
                            $event.preventDefault();
                        }

                        /*if (val === '0' && (keyCode !== 110 && keyCode !== 190)) {
                            //首位数字为0，只允许输入小数点
                            $event.preventDefault();
                        }*/

                        if (val.indexOf('.') !== -1 && (keyCode === 110 || keyCode === 190)) {
                            //已经有小数点，不允许再次输入小数点
                            $event.preventDefault();
                        }

                        if (val.indexOf('.') !== -1 && val.substring(val.indexOf('.') + 1).length >= 2) {
                            //精确到小数点后两位
                            $event.preventDefault();
                        }
                    } else {
                        $event.preventDefault();
                    }
                }
            };

            let prop = binding.expression;
            if (prop) {
                vnode.context.$watch(prop, function (newVal, oldVal) {
                    let regExp = /^0{1}$|^0\.\d{0,2}$|^[1-9]{1}\d*\.?\d{0,2}$/;
                    if (newVal && !regExp.test(newVal)) {
                        console.debug('%o 不是有效的数值, 还原到上次有效值 %o', newVal, oldVal);
                        //
                        // let bytes = newVal.split('');
                        // let validVal;
                        //
                        // while (bytes.length > 0) {
                        //     bytes.pop();
                        //     validVal = bytes.join('');
                        //     if (regExp.test(validVal)) {
                        //         break;
                        //     }
                        // }

                        __WEBPACK_IMPORTED_MODULE_0__utils__["default"].setProp(vnode.context, '$data.' + prop, oldVal);
                    }
                });
            } else {
                console.warn('%o v-dsp-input-number 输入框未指定监听属性，无法避免中文输入法或鼠标事件引起的输入错误，正确用法：v-dsp-input-number="vm.your.property"', input);
            }
        }
    },

    //座机电话和电话
    telephone: {
        bind: function (el, binding, vnode) {
            let input = el.tagName === 'INPUT' ? el : el.querySelector('input');
            el.onkeydown = function ($event) {
                let keyCode = $event.keyCode;
                let val = input.value;

                if (keyCode === 8 || keyCode === 9 || keyCode === 46 || keyCode === 37 || keyCode === 39 || keyCode === 17 || keyCode === 86) {
                    //退格、Tab键、删除、方向、Control+V键
                } else {
                    //只允许输入整数
                    if (keyCode >= 48 && keyCode <= 57 || keyCode >= 96 && keyCode <= 105) {
                        // if (val === '0') {
                        //     //首位数字为0，禁止输入
                        //     $event.preventDefault();
                        // }
                    } else {
                        $event.preventDefault();
                    }
                }
            };

            let prop = binding.expression;
            if (prop) {
                vnode.context.$watch(prop, function (newVal, oldVal) {
                    // let regExp =  /^0{1}$|^[1-9]{1}\d*$/;
                    let regExp = /^[\d-]*$/;
                    if (newVal && !regExp.test(newVal)) {
                        console.debug('%o 不是有效的整数, 还原到上次有效值 %o', newVal, oldVal);
                        //
                        // let bytes = newVal.split('');
                        // let validVal;
                        //
                        // while (bytes.length > 0) {
                        //     bytes.pop();
                        //     validVal = bytes.join('');
                        //     if (regExp.test(validVal)) {
                        //         break;
                        //     }
                        // }

                        __WEBPACK_IMPORTED_MODULE_0__utils__["default"].setProp(vnode.context, '$data.' + prop, oldVal);
                    }
                });
            } else {
                console.warn('%o v-dsp-input-integer 输入框未指定监听属性，无法避免中文输入法或鼠标事件引起的输入错误，正确用法：v-dsp-input-integer="vm.your.property"', input);
            }
        }
    },

    //允许输入整数或浮点数，小数点后保留4位,用于折扣的输入框
    discount: {
        bind: function (el, binding, vnode) {
            let input = el.tagName === 'INPUT' ? el : el.querySelector('input');

            el.onkeydown = function ($event) {
                let keyCode = $event.keyCode;
                let val = input.value;
                if (keyCode === 8 || keyCode === 9 || keyCode === 46 || keyCode === 37 || keyCode === 39 || keyCode === 17 || keyCode === 86) {
                    //退格、Tab键、删除、方向、Control+V键

                } else {
                    //可输入整数或小数（精确到小数点后两位）
                    if (keyCode >= 48 && keyCode <= 57 || keyCode >= 96 && keyCode <= 105 || keyCode === 110 || keyCode === 190) {

                        if (val === '' && (keyCode === 110 || keyCode === 190)) {
                            //不允许直接输入小数点
                            $event.preventDefault();
                        }

                        /*if (val === '0' && (keyCode !== 110 && keyCode !== 190)) {
                            //首位数字为0，只允许输入小数点
                            $event.preventDefault();
                        }*/

                        if (val.indexOf('.') !== -1 && (keyCode === 110 || keyCode === 190)) {
                            //已经有小数点，不允许再次输入小数点
                            $event.preventDefault();
                        }

                        if (val.indexOf('.') !== -1 && val.substring(val.indexOf('.') + 1).length >= 4) {
                            //精确到小数点后两位
                            $event.preventDefault();
                        }
                    } else {
                        $event.preventDefault();
                    }
                }
            };

            let prop = binding.expression;
            if (prop) {
                vnode.context.$watch(prop, function (newVal, oldVal) {
                    let regExp = /^0{1}$|^0\.\d{0,4}$|^1{1}$/;
                    if (newVal && !regExp.test(newVal)) {
                        console.debug('%o 不是有效的数值, 还原到上次有效值 %o', newVal, oldVal);
                        //
                        // let bytes = newVal.split('');
                        // let validVal;
                        //
                        // while (bytes.length > 0) {
                        //     bytes.pop();
                        //     validVal = bytes.join('');
                        //     if (regExp.test(validVal)) {
                        //         break;
                        //     }
                        // }

                        __WEBPACK_IMPORTED_MODULE_0__utils__["default"].setProp(vnode.context, '$data.' + prop, oldVal);
                    }
                });
            } else {
                console.warn('%o v-dsp-input-number 输入框未指定监听属性，无法避免中文输入法或鼠标事件引起的输入错误，正确用法：v-dsp-input-number="vm.your.property"', input);
            }
        }
    },

    //允许输入手机号码
    mobile: {
        bind: function (el, binding, vnode) {
            let input = el.tagName === 'INPUT' ? el : el.querySelector('input');
            el.onkeydown = function ($event) {
                let keyCode = $event.keyCode;
                let val = input.value;
                if (keyCode === 8 || keyCode === 9 || keyCode === 46 || keyCode === 37 || keyCode === 39 || keyCode === 17 || keyCode === 86) {
                    //退格、Tab键、删除、方向、Control+V键
                } else {
                    if (val.length >= 11) {
                        //只允许输入11位
                        $event.preventDefault();
                    }

                    //可输入整数或小数（精确到小数点后两位）
                    if (keyCode >= 48 && keyCode <= 57 || keyCode >= 96 && keyCode <= 105) {
                        if (val === '' && keyCode !== 49 && keyCode !== 97) {
                            //手机号以1开头
                            $event.preventDefault();
                        }

                        if (val === '1' && (keyCode < 51 || keyCode > 57) && (keyCode < 99 || keyCode > 105)) {
                            //手机号第2位只能是3~9
                            $event.preventDefault();
                        }
                    } else {
                        $event.preventDefault();
                    }
                }
            };

            let prop = binding.expression;
            if (prop) {
                vnode.context.$watch(prop, function (newVal, oldVal) {
                    let regExp = /^1{1}([3|4|5|6|7|8|9]{1}\d{0,9}){0,1}$/;
                    if (newVal && !regExp.test(newVal)) {
                        console.debug('%o 不是有效的手机号码, 还原到上次有效值 %o', newVal, oldVal);
                        //
                        // let bytes = newVal.split('');
                        // let validVal;
                        //
                        // while (bytes.length > 0) {
                        //     bytes.pop();
                        //     validVal = bytes.join('');
                        //     if (regExp.test(validVal)) {
                        //         break;
                        //     }
                        // }

                        __WEBPACK_IMPORTED_MODULE_0__utils__["default"].setProp(vnode.context, '$data.' + prop, oldVal);
                    }
                });
            } else {
                console.warn('%o v-dsp-input-mobile输入框未指定监听属性，无法避免中文输入法或鼠标事件引起的输入错误，正确用法：v-dsp-input-mobile="vm.your.property"', input);
            }
        }
    },

    //只允许输入数字和字母
    code: {
        bind: function (el, binding, vnode) {
            let input = el.tagName === 'INPUT' ? el : el.querySelector('input');
            el.onkeydown = function ($event) {
                let keyCode = $event.keyCode;
                if (keyCode === 8 || keyCode === 9 || keyCode === 46 || keyCode === 37 || keyCode === 39 || keyCode === 17 || keyCode === 86) {
                    //退格、Tab键、删除、方向、Control+V键
                } else {
                    //只允许输入字母和数字
                    if (keyCode >= 48 && keyCode <= 57 || keyCode >= 96 && keyCode <= 105 || keyCode >= 65 && keyCode <= 90) {} else {
                        $event.preventDefault();
                    }
                }
            };

            let prop = binding.expression;
            if (prop) {
                vnode.context.$watch(prop, function (newVal, oldVal) {
                    let regExp = /^[0-9a-zA-Z]*$/;
                    if (newVal && !regExp.test(newVal)) {
                        console.debug('%o 不是有效的编码, 还原到上次有效值 %o', newVal, oldVal);
                        __WEBPACK_IMPORTED_MODULE_0__utils__["default"].setProp(vnode.context, '$data.' + prop, oldVal);
                    }
                });
            } else {
                console.warn('%o v-dsp-input-code 输入框未指定监听属性，无法避免中文输入法或鼠标事件引起的输入错误，正确用法：v-dsp-input-code="vm.your.property"', input);
            }
        }
    },

    //不允许空格
    trim: {
        bind: function (el, binding, vnode) {
            let input = el.tagName === 'INPUT' ? el : el.querySelector('input');
            el.onkeydown = function ($event) {
                let key = $event.key;
                let keyCode = $event.keyCode;
                let val = input.value;
                if (keyCode === 32) {
                    $event.preventDefault();
                }
            };

            let prop = binding.expression;
            if (prop) {
                vnode.context.$watch(prop, function (newVal, oldVal) {
                    __WEBPACK_IMPORTED_MODULE_0__utils__["default"].setProp(vnode.context, '$data.' + prop, newVal && newVal.trim() || oldVal);
                });
            } else {
                console.warn('%o v-dsp-input-trim 输入框未指定监听属性，无法避免中文输入法或鼠标事件引起的输入错误，正确用法：v-dsp-input-trim="vm.your.property"', input);
            }
        }
    },

    //字段校验
    validate: {
        // bind: function (el, binding, vnode) {
        //     console.debug('bind: %o', binding.expression);
        //     console.debug('添加校验: %o', binding.expression);
        // },
        inserted: function (el, binding, vnode) {
            console.debug('inserted 添加校验: %o', binding.expression);
            bindFieldValidator(el, binding, vnode);
        },
        // update: function (el, binding, vnode) {
        //     console.debug('update: %o', binding.expression);
        // },
        // componentUpdated: function (el, binding, vnode, oldVnode) {
        //     console.debug('componentUpdated 变更校验: %o', binding.expression);
        //     bindFieldValidator(el, binding, vnode);
        // },
        unbind: function (el, binding, vnode) {
            console.debug('unbind 取消校验: %o', binding.expression);
            unbindFieldValidator(el, binding, vnode);
        }
    },

    //表单校验
    validateForm: {
        bind: function (el, binding, vnode) {
            console.debug('form bind');

            // 监听器
            vnode.context.$data.$validator.watcher = {};
            // 校验器
            vnode.context.$data.$validator.validator = {};
            // 校验错误
            vnode.context.$data.$validator.error = {};

            // 取消监听
            vnode.context.$data.$validator.unwatch = function () {
                if (vnode.context.$data.$validator.watcher) {
                    for (let key in vnode.context.$data.$validator.watcher) {
                        vnode.context.$data.$validator.watcher[key]();
                        delete vnode.context.$data.$validator.watcher[key];
                    }
                }
            };
            // 表单校验
            vnode.context.$data.$validator.validateAll = function (group) {

                return Promise.resolve().then(() => {
                    let validator = vnode.context.$data.$validator.validator;
                    let promises = [];

                    for (let key of Object.keys(validator)) {
                        if (group) {
                            if (key.startsWith(group + '.')) {
                                //按组检验
                                promises.push(validator[key]());
                            }
                        } else {
                            //逐个遍历并校验
                            promises.push(validator[key]());
                        }
                    }

                    return Promise.all(promises);
                }).then(() => {
                    let error = vnode.context.$data.$validator.error;
                    return !error || Object.keys(error).length == 0;
                });
            };
            // 重置表单校验
            vnode.context.$data.$validator.reset = function () {

                //清空错误消息
                vnode.context.$data.$validator.error = {};

                el.querySelectorAll('.is-error').forEach(i => {
                    i.classList.remove('is-error');
                });

                el.querySelectorAll('.err-required').forEach(i => {
                    i.classList.remove('err-required');
                });

                el.querySelectorAll('.err-minlength').forEach(i => {
                    i.classList.remove('err-minlength');
                });

                el.querySelectorAll('.err-min').forEach(i => {
                    i.classList.remove('err-min');
                });

                el.querySelectorAll('.err-remote').forEach(i => {
                    i.classList.remove('err-remote');
                });

                el.querySelectorAll('.err-customize').forEach(i => {
                    i.classList.remove('err-customize');
                });
            };

            console.debug(vnode.context.$data.$validator);
        },
        unbind: function (el, binding, vnode) {
            console.debug('form unbind');

            vnode.context.$data.$validator.unwatch();
            vnode.context.$data.$validator.reset();

            delete vnode.context.$data.$validator.unwatch;
            delete vnode.context.$data.$validator.validateAll;
            delete vnode.context.$data.$validator.reset;

            delete vnode.context.$data.$validator.watcher;
            delete vnode.context.$data.$validator.validator;
            delete vnode.context.$data.$validator.error;

            console.debug(vnode.context.$data.$validator);
        }
    },

    //折叠面板
    collapsable: {
        bind: function (el, binding, vnode) {
            let target = el.getAttribute('target');
            let collapsed = el.getAttribute('collapsed') == 'true';
            if (!el.classList.contains('dsp-panel-collapsable')) {
                el.classList.add('dsp-panel-collapsable');
            }
            if (collapsed && !el.classList.contains('collapsed')) {
                el.classList.add('collapsed');
            }
            el.addEventListener("click", function () {
                let targetDom = document.querySelector(target);
                if (targetDom) {
                    if (targetDom.classList.contains('dsp-panel-collapsed__content')) {
                        targetDom.classList.remove('dsp-panel-collapsed__content');
                        el.classList.remove('collapsed');
                    } else {
                        targetDom.classList.add('dsp-panel-collapsed__content');
                        el.classList.add('collapsed');
                    }
                } else {
                    console.debug('target not found: %o', target);
                }
            });
        }
    },

    //图片拖拽
    imgdrag: {
        bind: function (el, binding, vnode) {

            const dialogHeaderEl = el.querySelector('.dsp-img-header');
            const dragDom = el.querySelector('.dsp-img-preview');
            const sty = function () {
                if (window.document.currentStyle) {
                    return (dom, attr) => dom.currentStyle[attr];
                } else {
                    return (dom, attr) => getComputedStyle(dom, false)[attr];
                }
            }();
            dialogHeaderEl.onmousedown = e => {
                // 鼠标按下，计算当前元素距离可视区的距离
                const disX = e.clientX - dialogHeaderEl.offsetLeft;
                const disY = e.clientY - dialogHeaderEl.offsetTop;

                // body当前宽度
                const screenWidth = document.body.clientWidth;
                // 可见区域高度(应为body高度，可某些环境下无法获取)
                const screenHeight = document.documentElement.clientHeight;

                // 宽度
                const dragDomWidth = dragDom.offsetWidth;
                // 高度
                const dragDomheight = dragDom.offsetHeight;

                const minDragDomLeft = dragDom.offsetLeft;
                const maxDragDomLeft = screenWidth - dragDom.offsetLeft - dragDomWidth;

                const minDragDomTop = dragDom.offsetTop;
                const maxDragDomTop = screenHeight - dragDom.offsetTop - dragDomheight;

                // 获取到的值带px 正则匹配替换
                let styL = sty(dragDom, 'left');
                let styT = sty(dragDom, 'top');

                if (styL.includes('%')) {
                    styL = +document.body.clientWidth * (+styL.replace(/%/g, '') / 100);
                    styT = +document.body.clientHeight * (+styT.replace(/%/g, '') / 100);
                } else {
                    styL = +styL.replace(/px/g, '');
                    styT = +styT.replace(/px/g, '');
                }
                document.onmousemove = function (e) {
                    // 通过事件委托，计算移动的距离
                    let left = e.clientX - disX;
                    let top = e.clientY - disY;
                    // 边界处理
                    if (-left > minDragDomLeft) {
                        left = -minDragDomLeft;
                    } else if (left > maxDragDomLeft) {
                        left = maxDragDomLeft;
                    }
                    if (-top > minDragDomTop) {
                        top = -minDragDomTop;
                    } else if (top > maxDragDomTop) {
                        top = maxDragDomTop;
                    }
                    // 移动当前元素
                    dragDom.style.cssText += `;left:${left + styL}px;top:${top + styT}px;`;
                };
                document.onmouseup = function (e) {
                    document.onmousemove = null;
                    document.onmouseup = null;
                };
            };
        }
    },

    //允许输入0-100的整数或者小数，小数点后保留4位,用于服务费返款费率的输入框
    percentRate: {
        bind: function (el, binding, vnode) {
            let input = el.tagName === 'INPUT' ? el : el.querySelector('input');

            el.onkeydown = function ($event) {
                let keyCode = $event.keyCode;
                let val = input.value;
                if (keyCode === 8 || keyCode === 9 || keyCode === 46 || keyCode === 37 || keyCode === 39 || keyCode === 17 || keyCode === 86) {
                    //退格、Tab键、删除、方向、Control+V键

                } else {
                    //可输入整数或小数（精确到小数点后两位）
                    if (keyCode >= 48 && keyCode <= 57 || keyCode >= 96 && keyCode <= 105 || keyCode === 110 || keyCode === 190) {

                        if (val === '' && (keyCode === 110 || keyCode === 190)) {
                            //不允许直接输入小数点
                            $event.preventDefault();
                        }

                        /*if (val === '0' && (keyCode !== 110 && keyCode !== 190)) {
                         //首位数字为0，只允许输入小数点
                         $event.preventDefault();
                         }*/

                        if (val.indexOf('.') !== -1 && (keyCode === 110 || keyCode === 190)) {
                            //已经有小数点，不允许再次输入小数点
                            $event.preventDefault();
                        }

                        if (val.indexOf('.') !== -1 && val.substring(val.indexOf('.') + 1).length >= 4) {
                            //精确到小数点后两位
                            $event.preventDefault();
                        }
                    } else {
                        $event.preventDefault();
                    }
                }
            };

            let prop = binding.expression;
            if (prop) {
                vnode.context.$watch(prop, function (newVal, oldVal) {
                    let regExp = /^(\d|[1-9]\d|100)(\.\d{0,4})?$/;
                    if (newVal && !regExp.test(newVal)) {
                        console.debug('%o 不是有效的数值, 还原到上次有效值 %o', newVal, oldVal);
                        //
                        // let bytes = newVal.split('');
                        // let validVal;
                        //
                        // while (bytes.length > 0) {
                        //     bytes.pop();
                        //     validVal = bytes.join('');
                        //     if (regExp.test(validVal)) {
                        //         break;
                        //     }
                        // }

                        __WEBPACK_IMPORTED_MODULE_0__utils__["default"].setProp(vnode.context, '$data.' + prop, oldVal);
                    }
                });
            } else {
                console.warn('%o v-dsp-input-number 输入框未指定监听属性，无法避免中文输入法或鼠标事件引起的输入错误，正确用法：v-dsp-input-number="vm.your.property"', input);
            }
        }
    }
});

/***/ })

/******/ });