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
/******/ 	return __webpack_require__(__webpack_require__.s = 37);
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

/***/ 12:
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


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

/***/ }),

/***/ 33:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* jshint esversion: 6 */

__webpack_require__(34)();

//汉字的数字
const cnNums = new Array('零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖');
//基本单位
const cnIntRadice = new Array('', '拾', '佰', '仟');
//对应整数部分扩展单位
const cnIntUnits = new Array('', '万', '亿', '兆');
//对应小数部分单位
const cnDecUnits = new Array('角', '分', '毫', '厘');
//整数金额时后面跟的字符
const cnInteger = '整';
//整型完以后的单位
const cnIntLast = '元';
//最大处理的数字
const maxNum = 999999999999999.9999;

/* harmony default export */ __webpack_exports__["default"] = ({

    //小写变大写
    capitalize: function (value) {
        if (!value) return '';
        value = value.toString();
        return value.toUpperCase();
    },

    //金额
    amount: function (value) {
        if (!value && value != 0) return value;
        let old = value;
        value = parseFloat(value).toFixed(2);
        value = value.replace('.00', '');
        if (isNaN(value)) {
            return old;
        }
        // return '￥' + value;
        return value;
    },

    //面积
    area: function (value) {
        if (!value && value != 0) return '';
        value = parseFloat(value).toFixed(4);
        value = value.replace('.0000', '');
        // return value + ' ㎡';
        return value;
    },

    //比率
    rate: function (value) {
        if (!value && value != 0) return '';
        value = parseFloat(value).toFixed(2);
        value = value.replace('.00', '');
        return value + '%';
    },

    //取整
    integer: function (value) {
        if (!value) return '';
        return Math.round(value);
    },

    //保留两位小数
    float: function (value) {
        if (!value) return '';
        return parseFloat(value).toFixed(2);
    },

    //日期
    date: function (value) {
        if (!value) return '';
        if (typeof value == 'number') {
            return new Date(parseInt(value)).format('yyyy-MM-dd');
        } else if (typeof value == 'string' && !isNaN(value)) {
            return new Date(parseInt(value)).format('yyyy-MM-dd');
        } else if (typeof value == 'string' && value.indexOf('-') != -1) {
            return value.substr(0, 10);
        } else {
            return value;
        }
    },

    //日期时间
    time: function (value) {
        if (!value) return '';
        if (typeof value == 'number') {
            return new Date(parseInt(value)).format('hh:mm');
        } else if (typeof value == 'string' && !isNaN(value)) {
            return new Date(parseInt(value)).format('hh:mm');
        } else {
            return value;
        }
    },

    //日期时间
    datetime: function (value) {
        if (!value) return '';
        if (typeof value == 'number') {
            return new Date(parseInt(value)).format('yyyy-MM-dd hh:mm');
        } else if (typeof value == 'string' && !isNaN(value)) {
            return new Date(parseInt(value)).format('yyyy-MM-dd hh:mm');
        } else {
            return value;
        }
    },
    //秒级
    datetimes: function (value) {
        if (!value) return '';
        if (typeof value == 'number') {
            return new Date(parseInt(value)).format('yyyy-MM-dd hh:mm:ss');
        } else if (typeof value == 'string' && !isNaN(value)) {
            return new Date(parseInt(value)).format('yyyy-MM-dd hh:mm:ss');
        } else {
            return value;
        }
    },
    // 61秒，显示成1分1秒； 3800秒， 显示成1时3分20秒
    formatseconds: function (value) {
        var theTime = parseInt(value); // 秒
        var middle = 0; // 分
        var hour = 0; // 小时

        if (theTime > 60) {
            middle = parseInt(theTime / 60);
            theTime = parseInt(theTime % 60);
            if (middle > 60) {
                hour = parseInt(middle / 60);
                middle = parseInt(middle % 60);
            }
        }
        var result = "" + parseInt(theTime) + "秒";
        if (middle > 0) {
            result = "" + parseInt(middle) + "分" + result;
        }
        if (hour > 0) {
            result = "" + parseInt(hour) + "时" + result;
        }
        return result;
    },
    //过滤器
    filter: function (list, keyword, props) {
        if (!list || !list.length || !keyword) return list;

        return list.filter(item => {
            if (props && props.length) {
                return props.map(function (prop) {
                    return prop && item[prop] && item[prop].toLowerCase().indexOf(keyword.toLowerCase()) != -1;
                }).find(result => result);
            } else {
                return typeof item == 'string' ? item.toLowerCase().indexOf(keyword.toLowerCase()) != -1 : true;
            }
        });
    },

    //兼容老系统产生的绝对路径路由
    url: function (value) {
        if (!value) return '';
        if (value.startsWith("http")) {
            return value;
        } else {
            return DSP.globalConfig.fileBaseUrl + value;
        }
    },

    //代码如下所示：
    convertCurrency(money) {
        //金额整数部分
        let integerNum;
        //金额小数部分
        let decimalNum;
        //输出的中文金额字符串
        let chineseStr = '';
        //分离金额后用的数组，预定义
        let parts;
        if (money == '') {
            return '';
        }
        money = parseFloat(money);
        if (money >= maxNum) {
            //超出最大处理数字
            return '';
        }
        if (money == 0) {
            chineseStr = cnNums[0] + cnIntLast + cnInteger;
            return chineseStr;
        }
        //转换为字符串
        money = money.toString();
        if (money.indexOf('.') == -1) {
            integerNum = money;
            decimalNum = '';
        } else {
            parts = money.split('.');
            integerNum = parts[0];
            decimalNum = parts[1].substr(0, 4);
        }
        //获取整型部分转换
        if (parseInt(integerNum, 10) > 0) {
            let zeroCount = 0;
            let IntLen = integerNum.length;
            for (let i = 0; i < IntLen; i++) {
                let n = integerNum.substr(i, 1);
                let p = IntLen - i - 1;
                let q = p / 4;
                let m = p % 4;
                if (n == '0') {
                    zeroCount++;
                } else {
                    if (zeroCount > 0) {
                        chineseStr += cnNums[0];
                    }
                    //归零
                    zeroCount = 0;
                    chineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
                }
                if (m == 0 && zeroCount < 4) {
                    chineseStr += cnIntUnits[q];
                }
            }
            chineseStr += cnIntLast;
        }
        //小数部分
        if (decimalNum != '') {
            let decLen = decimalNum.length;
            for (let i = 0; i < decLen; i++) {
                let n = decimalNum.substr(i, 1);
                if (n != '0') {
                    chineseStr += cnNums[Number(n)] + cnDecUnits[i];
                }
            }
        }
        if (chineseStr == '') {
            chineseStr += cnNums[0] + cnIntLast + cnInteger;
        } else if (decimalNum == '') {
            chineseStr += cnInteger;
        }
        return chineseStr;
    }

});

/***/ }),

/***/ 34:
/***/ (function(module, exports) {

module.exports = function () {
    /**
     * 微信浏览器不支持的方法
     */
    if (typeof String.prototype.startsWith != 'function') {
        String.prototype.startsWith = function (prefix) {
            return this.slice(0, prefix.length) === prefix;
        };
    }
    if (typeof String.prototype.endsWith != 'function') {
        String.prototype.endsWith = function (suffix) {
            return this.indexOf(suffix, this.length - suffix.length) !== -1;
        };
    }
    if (typeof Array.prototype.find != 'function') {
        Array.prototype.find = function (callback) {
            var found;

            this.forEach(function (item, i) {
                if (callback(item, i)) {
                    found = item;
                }
            });

            return found;
        };
    }
    if (typeof Array.prototype.remove != 'function') {
        Array.prototype.remove = function (callback) {
            var index = -1;

            this.forEach(function (item, i) {
                if (callback(item, i)) {
                    index = i;
                }
            });

            if (index != -1) {
                this.splice(index, 1);
            }
        };
    }
    if (typeof Array.prototype.filter != 'function') {
        Array.prototype.filter = function (callback) {
            var results = [];

            this.forEach(function (item, i) {
                if (callback(item, i)) {
                    results.push(item);
                }
            });

            return results;
        };
    }
    if (typeof Array.prototype.map != 'function') {
        Array.prototype.map = function (callback) {
            var results = [];

            this.forEach(function (item, i) {
                results.push(callback(item, i));
            });

            return results;
        };
    }

    Date.prototype.format = function (fmt) {
        var o = {
            "M+": this.getMonth() + 1, //月份
            "d+": this.getDate(), //日
            "h+": this.getHours(), //小时
            "m+": this.getMinutes(), //分
            "s+": this.getSeconds(), //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o) if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        return fmt;
    };

    Number.prototype.toFixed = function (n) {
        if (n > 20 || n < 0) {
            throw new RangeError('tofixed()数字参数必须是0和20之间');
        }
        const number = this;
        if (isNaN(number) || number >= Math.pow(10, 21)) {
            return number.toString();
        }
        if (typeof n == 'undefined' || n == 0) {
            return Math.round(number).toString();
        }

        let result = number.toString();
        const arr = result.split('.');

        // 整数的情况
        if (arr.length < 2) {
            result += '.';
            for (let i = 0; i < n; i += 1) {
                result += '0';
            }
            return result;
        }

        const integer = arr[0];
        const decimal = arr[1];
        if (decimal.length == n) {
            return result;
        }
        if (decimal.length < n) {
            for (let i = 0; i < n - decimal.length; i += 1) {
                result += '0';
            }
            return result;
        }
        result = integer + '.' + decimal.substr(0, n);
        const last = decimal.substr(n, 1);

        // 四舍五入，转换为整数再处理，避免浮点数精度的损失
        if (parseInt(last, 10) >= 5) {
            const x = Math.pow(10, n);
            result = (Math.round(parseFloat(result) * x) + 1) / x;
            result = result.toFixed(n);
        }

        return result;
    };
};

/***/ }),

/***/ 35:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_js_base64__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_js_base64___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_js_base64__);
/* jshint esversion: 6 */



/* harmony default export */ __webpack_exports__["default"] = ({
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
    $sceneInfo(s) {
        var scene = [];
        s = s * 1;
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

        if (typeof obj == 'object') {
            return __WEBPACK_IMPORTED_MODULE_0_js_base64__["Base64"].encode(JSON.stringify(obj));
        } else if (typeof obj == 'string') {
            return __WEBPACK_IMPORTED_MODULE_0_js_base64__["Base64"].encode(JSON.stringify(obj));
        } else {
            throw new Error('Only string or object can be encoded');
        }
    },

    // base64解码
    $base64Decode: function (str) {
        if (!str) {
            return;
        }

        let decoded = __WEBPACK_IMPORTED_MODULE_0_js_base64__["Base64"].decode(str);
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
                if (typeof (args[i] == 'number')) {
                    sum += parseFloat(args[i]);
                } else if (typeof (args[i] == 'string') && !isNaN(args[i])) {
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
    $price: function (unit, product) {
        var { price, quantity, ratio, width, height } = product;
        var base = (price || 0) * (ratio || 0) * (quantity || 0);
        var area = ((width || 0) * 0.001 * (height || 0) * 0.001 || 0).toFixed(4);
        var obj = {
            num: 0,
            area: null
        };
        if (unit.indexOf('YG.') > -1) {
            obj.num = base;
        } else if (unit.indexOf('YM.') > -1) {
            obj.num = base * (height || 0) * 0.001;
        } else if (unit.indexOf('YP.') > -1) {
            obj.area = area;
            obj.num = base * area;
        }
        obj.num = obj.num.toFixed(2);
        obj.num = obj.num.replace('.00', '');
        return obj;
    },

    // 将java的LocalDateTime时间格式变成时间戳
    $localDateTimeNumber: function (el, type = 's') {
        el = new Date(`${el.year}-${el.monthValue}-${el.dayOfMonth} ${el.hour}:${el.minute}:${el.second}`.replace(/-/g, '/'));
        el = el.getTime();
        return el;
    }
});

/***/ }),

/***/ 36:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
 *  base64.js
 *
 *  Licensed under the BSD 3-Clause License.
 *    http://opensource.org/licenses/BSD-3-Clause
 *
 *  References:
 *    http://en.wikipedia.org/wiki/Base64
 */
;(function (global, factory) {
     true
        ? module.exports = factory(global)
        : typeof define === 'function' && define.amd
        ? define(factory) : factory(global)
}((
    typeof self !== 'undefined' ? self
        : typeof window !== 'undefined' ? window
        : typeof global !== 'undefined' ? global
: this
), function(global) {
    'use strict';
    // existing version for noConflict()
    global = global || {};
    var _Base64 = global.Base64;
    var version = "2.5.1";
    // if node.js and NOT React Native, we use Buffer
    var buffer;
    if (typeof module !== 'undefined' && module.exports) {
        try {
            buffer = eval("require('buffer').Buffer");
        } catch (err) {
            buffer = undefined;
        }
    }
    // constants
    var b64chars
        = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    var b64tab = function(bin) {
        var t = {};
        for (var i = 0, l = bin.length; i < l; i++) t[bin.charAt(i)] = i;
        return t;
    }(b64chars);
    var fromCharCode = String.fromCharCode;
    // encoder stuff
    var cb_utob = function(c) {
        if (c.length < 2) {
            var cc = c.charCodeAt(0);
            return cc < 0x80 ? c
                : cc < 0x800 ? (fromCharCode(0xc0 | (cc >>> 6))
                                + fromCharCode(0x80 | (cc & 0x3f)))
                : (fromCharCode(0xe0 | ((cc >>> 12) & 0x0f))
                   + fromCharCode(0x80 | ((cc >>>  6) & 0x3f))
                   + fromCharCode(0x80 | ( cc         & 0x3f)));
        } else {
            var cc = 0x10000
                + (c.charCodeAt(0) - 0xD800) * 0x400
                + (c.charCodeAt(1) - 0xDC00);
            return (fromCharCode(0xf0 | ((cc >>> 18) & 0x07))
                    + fromCharCode(0x80 | ((cc >>> 12) & 0x3f))
                    + fromCharCode(0x80 | ((cc >>>  6) & 0x3f))
                    + fromCharCode(0x80 | ( cc         & 0x3f)));
        }
    };
    var re_utob = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g;
    var utob = function(u) {
        return u.replace(re_utob, cb_utob);
    };
    var cb_encode = function(ccc) {
        var padlen = [0, 2, 1][ccc.length % 3],
        ord = ccc.charCodeAt(0) << 16
            | ((ccc.length > 1 ? ccc.charCodeAt(1) : 0) << 8)
            | ((ccc.length > 2 ? ccc.charCodeAt(2) : 0)),
        chars = [
            b64chars.charAt( ord >>> 18),
            b64chars.charAt((ord >>> 12) & 63),
            padlen >= 2 ? '=' : b64chars.charAt((ord >>> 6) & 63),
            padlen >= 1 ? '=' : b64chars.charAt(ord & 63)
        ];
        return chars.join('');
    };
    var btoa = global.btoa ? function(b) {
        return global.btoa(b);
    } : function(b) {
        return b.replace(/[\s\S]{1,3}/g, cb_encode);
    };
    var _encode = buffer ?
        buffer.from && Uint8Array && buffer.from !== Uint8Array.from
        ? function (u) {
            return (u.constructor === buffer.constructor ? u : buffer.from(u))
                .toString('base64')
        }
        :  function (u) {
            return (u.constructor === buffer.constructor ? u : new  buffer(u))
                .toString('base64')
        }
        : function (u) { return btoa(utob(u)) }
    ;
    var encode = function(u, urisafe) {
        return !urisafe
            ? _encode(String(u))
            : _encode(String(u)).replace(/[+\/]/g, function(m0) {
                return m0 == '+' ? '-' : '_';
            }).replace(/=/g, '');
    };
    var encodeURI = function(u) { return encode(u, true) };
    // decoder stuff
    var re_btou = new RegExp([
        '[\xC0-\xDF][\x80-\xBF]',
        '[\xE0-\xEF][\x80-\xBF]{2}',
        '[\xF0-\xF7][\x80-\xBF]{3}'
    ].join('|'), 'g');
    var cb_btou = function(cccc) {
        switch(cccc.length) {
        case 4:
            var cp = ((0x07 & cccc.charCodeAt(0)) << 18)
                |    ((0x3f & cccc.charCodeAt(1)) << 12)
                |    ((0x3f & cccc.charCodeAt(2)) <<  6)
                |     (0x3f & cccc.charCodeAt(3)),
            offset = cp - 0x10000;
            return (fromCharCode((offset  >>> 10) + 0xD800)
                    + fromCharCode((offset & 0x3FF) + 0xDC00));
        case 3:
            return fromCharCode(
                ((0x0f & cccc.charCodeAt(0)) << 12)
                    | ((0x3f & cccc.charCodeAt(1)) << 6)
                    |  (0x3f & cccc.charCodeAt(2))
            );
        default:
            return  fromCharCode(
                ((0x1f & cccc.charCodeAt(0)) << 6)
                    |  (0x3f & cccc.charCodeAt(1))
            );
        }
    };
    var btou = function(b) {
        return b.replace(re_btou, cb_btou);
    };
    var cb_decode = function(cccc) {
        var len = cccc.length,
        padlen = len % 4,
        n = (len > 0 ? b64tab[cccc.charAt(0)] << 18 : 0)
            | (len > 1 ? b64tab[cccc.charAt(1)] << 12 : 0)
            | (len > 2 ? b64tab[cccc.charAt(2)] <<  6 : 0)
            | (len > 3 ? b64tab[cccc.charAt(3)]       : 0),
        chars = [
            fromCharCode( n >>> 16),
            fromCharCode((n >>>  8) & 0xff),
            fromCharCode( n         & 0xff)
        ];
        chars.length -= [0, 0, 2, 1][padlen];
        return chars.join('');
    };
    var _atob = global.atob ? function(a) {
        return global.atob(a);
    } : function(a){
        return a.replace(/\S{1,4}/g, cb_decode);
    };
    var atob = function(a) {
        return _atob(String(a).replace(/[^A-Za-z0-9\+\/]/g, ''));
    };
    var _decode = buffer ?
        buffer.from && Uint8Array && buffer.from !== Uint8Array.from
        ? function(a) {
            return (a.constructor === buffer.constructor
                    ? a : buffer.from(a, 'base64')).toString();
        }
        : function(a) {
            return (a.constructor === buffer.constructor
                    ? a : new buffer(a, 'base64')).toString();
        }
        : function(a) { return btou(_atob(a)) };
    var decode = function(a){
        return _decode(
            String(a).replace(/[-_]/g, function(m0) { return m0 == '-' ? '+' : '/' })
                .replace(/[^A-Za-z0-9\+\/]/g, '')
        );
    };
    var noConflict = function() {
        var Base64 = global.Base64;
        global.Base64 = _Base64;
        return Base64;
    };
    // export Base64
    global.Base64 = {
        VERSION: version,
        atob: atob,
        btoa: btoa,
        fromBase64: decode,
        toBase64: encode,
        utob: utob,
        encode: encode,
        encodeURI: encodeURI,
        btou: btou,
        decode: decode,
        noConflict: noConflict,
        __buffer__: buffer
    };
    // if ES5 is available, make Base64.extendString() available
    if (typeof Object.defineProperty === 'function') {
        var noEnum = function(v){
            return {value:v,enumerable:false,writable:true,configurable:true};
        };
        global.Base64.extendString = function () {
            Object.defineProperty(
                String.prototype, 'fromBase64', noEnum(function () {
                    return decode(this)
                }));
            Object.defineProperty(
                String.prototype, 'toBase64', noEnum(function (urisafe) {
                    return encode(this, urisafe)
                }));
            Object.defineProperty(
                String.prototype, 'toBase64URI', noEnum(function () {
                    return encode(this, true)
                }));
        };
    }
    //
    // export Base64 to the namespace
    //
    if (global['Meteor']) { // Meteor.js
        Base64 = global.Base64;
    }
    // module.exports and AMD are mutually exclusive.
    // module.exports has precedence.
    if (typeof module !== 'undefined' && module.exports) {
        module.exports.Base64 = global.Base64;
    }
    else if (true) {
        // AMD. Register as an anonymous module.
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function(){ return global.Base64 }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    }
    // that's it!
    return {Base64: global.Base64}
}));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(12)))

/***/ }),

/***/ 37:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__directive__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__filter__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__method__ = __webpack_require__(35);
/* jshint esversion: 6 */

// import Vue from 'vue';




Vue.directive('dsp-input-code', __WEBPACK_IMPORTED_MODULE_0__directive__["default"].code);
Vue.directive('dsp-input-integer', __WEBPACK_IMPORTED_MODULE_0__directive__["default"].integer);
Vue.directive('dsp-input-mobile', __WEBPACK_IMPORTED_MODULE_0__directive__["default"].mobile);
//座机电话和电话
Vue.directive('dsp-input-telephone', __WEBPACK_IMPORTED_MODULE_0__directive__["default"].telephone);
Vue.directive('dsp-input-number', __WEBPACK_IMPORTED_MODULE_0__directive__["default"].number);
Vue.directive('dsp-input-discount', __WEBPACK_IMPORTED_MODULE_0__directive__["default"].discount);
Vue.directive('dsp-input-captcha', __WEBPACK_IMPORTED_MODULE_0__directive__["default"].captcha);
Vue.directive('dsp-input-trim', __WEBPACK_IMPORTED_MODULE_0__directive__["default"].trim);
Vue.directive('dsp-input-rate', __WEBPACK_IMPORTED_MODULE_0__directive__["default"].percentRate);

Vue.directive('dsp-validate', __WEBPACK_IMPORTED_MODULE_0__directive__["default"].validate);
Vue.directive('dsp-form-validate', __WEBPACK_IMPORTED_MODULE_0__directive__["default"].validateForm);
Vue.directive('dsp-panel-collapsable', __WEBPACK_IMPORTED_MODULE_0__directive__["default"].collapsable);
Vue.directive('dsp-drapable', __WEBPACK_IMPORTED_MODULE_0__directive__["default"].imgdrag);

for (var prop in __WEBPACK_IMPORTED_MODULE_1__filter__["default"]) {
    Vue.filter(prop, __WEBPACK_IMPORTED_MODULE_1__filter__["default"][prop]);

    if (!Vue.prototype.$filter) {
        Vue.prototype.$filter = {};
    }
    Vue.prototype.$filter[prop] = __WEBPACK_IMPORTED_MODULE_1__filter__["default"][prop];
}

for (var $method in __WEBPACK_IMPORTED_MODULE_2__method__["default"]) {
    Vue.prototype[$method] = __WEBPACK_IMPORTED_MODULE_2__method__["default"][$method];
}

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/***/ })

/******/ });