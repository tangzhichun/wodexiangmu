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
/******/ 	return __webpack_require__(__webpack_require__.s = 720);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(3);
var isBuffer = __webpack_require__(15);

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim
};


/***/ }),

/***/ 10:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__error__ = __webpack_require__(9);
/* jshint esversion: 6 */




let err = {
    code: "810",
    message: '页面打开人员与当前操作人员不一致',
    success: false
};

__WEBPACK_IMPORTED_MODULE_0_axios___default.a.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

__WEBPACK_IMPORTED_MODULE_0_axios___default.a.interceptors.request.use(function (config) {

    //逐级遍历对象的属性，去除空格
    let trim = function (obj) {
        for (let key in obj) {
            if (obj[key] || obj[key] == 0) {
                if (typeof obj[key] === 'string') {
                    obj[key] = obj[key].trim();

                    //空字符串替换成null
                    if (obj[key] == '') {
                        delete obj[key];
                    }
                } else if (typeof obj[key] === 'object') {
                    trim(obj[key]);
                }
            } else {
                delete obj[key];
            }
        }
    };

    //提交数据前，去除首尾空格
    let data = config.params || config.data || {};
    trim(data);

    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

__WEBPACK_IMPORTED_MODULE_0_axios___default.a.interceptors.response.use(function (response) {
    //处理200返回码
    if (response && response.status == '200' && response.data) {
        let result = response.data;
        if (result.success) {
            return result;
        } else {
            //处理全局错误
            if (result.code == '811' || result.code == '810') {
                //取前端翻译后的错误码、或者后端直接抛出的错误消息，都没有值，则提示默认错误消息
                let errorMsg = __WEBPACK_IMPORTED_MODULE_1__error__["default"].SYSTEM_ERROR[result.code] || result.message || __WEBPACK_IMPORTED_MODULE_1__error__["default"].SYSTEM_ERROR.DEFAULT;
                if (Vue && Vue.prototype.$message) {
                    Vue.prototype.$message({
                        message: errorMsg,
                        type: 'error',
                        duration: 5000,
                        onClose: function () {
                            window.location.href = '/logout';
                        }
                    });
                }
            } else {
                //取前端翻译后的错误码、或者后端直接抛出的错误消息，都没有值，则提示默认错误消息
                let errorMsg = __WEBPACK_IMPORTED_MODULE_1__error__["default"].SYSTEM_ERROR[result.code] || result.message || __WEBPACK_IMPORTED_MODULE_1__error__["default"].SYSTEM_ERROR.DEFAULT;
                if (Vue && Vue.prototype.$message) {
                    Vue.prototype.$message.error(errorMsg);
                }
                return result;
            }
        }
    } else {
        return response;
    }
}, function (err) {
    //取前端翻译后的错误码，如没有值，则提示默认错误消息。不直接取后端直接抛出的错误消息，因为可能包含异常堆栈等敏感且不友好的提示信息。
    let errorMsg = __WEBPACK_IMPORTED_MODULE_1__error__["default"].NETWORK_ERROR[err.response && err.response.status] || __WEBPACK_IMPORTED_MODULE_1__error__["default"].SYSTEM_ERROR.DEFAULT;
    console.error(errorMsg + ': %o', {
        status: err.response && err.response.status,
        message: err.message,
        stack: err.stack
    });

    if (Vue && Vue.prototype.$message) {
        Vue.prototype.$message.error(errorMsg);
    }
    return Promise.reject(err);
});

/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_0_axios___default.a);

/***/ }),

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

/***/ 13:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(14);

/***/ }),

/***/ 14:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);
var bind = __webpack_require__(3);
var Axios = __webpack_require__(16);
var defaults = __webpack_require__(2);

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(utils.merge(defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(8);
axios.CancelToken = __webpack_require__(30);
axios.isCancel = __webpack_require__(7);

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(31);

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),

/***/ 141:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_ui_dsp_cropper_vue__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__scripts_module_enums__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__scripts_module_axios_js__ = __webpack_require__(10);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

//cms小程序卡片




/* harmony default export */ __webpack_exports__["a"] = ({
    props: {
        cmsflag: Boolean,
        mindata: Object
    },
    components: {
        'dsp-cropper': __WEBPACK_IMPORTED_MODULE_0__components_ui_dsp_cropper_vue__["a" /* default */]
    },
    data() {
        return {
            loading: false,
            appIdArr: []
        };
    },
    methods: {
        quxiao() {
            this.$emit('update:cmsflag', false);
        },
        addCardForm() {
            let self = this;
            let ifSave = true;
            if (!self.mindata.title) {
                ifSave = false;
                this.$message.error('请输入标题');
            } else if (!self.mindata.pagepath) {
                ifSave = false;
                this.$message.error('请输入小程序路径');
            } else if (!self.mindata.appid) {
                ifSave = false;
                this.$message.error('请输入正确的小程序appid');
            } else if (!self.mindata.mediaSourseUrl) {
                ifSave = false;
                this.$message.error('未上传小程序卡片');
            } else if (self.mindata.mediaSourseUrl) {
                console.log(self.mindata.mediaSourseUrl);
            }
            if (ifSave) {
                this.loading = true;
                setTimeout(() => {
                    self.loading = false;
                }, 500);
                self.mindata.mediaSourseUrl = self.mindata.mediaSourseUrl.imageUrl;
                self.mindata.type = 'miniprogrampage';
                self.$emit('update:cmsflag', false);
                self.$emit('mindata', self.mindata);
            }
        }
    },
    mounted() {
        let gzharr = function (old, filter, flags = 'privilege') {
            let arr = [];
            if (old && old.map) {
                old.map(ele => {
                    if (filter.indexOf(ele[flags]) > -1) {
                        arr.push(ele);
                    } else if (!ele[flags]) {
                        arr.push(ele);
                    }
                });
            }
            return arr;
        };
        let self = this;
        __WEBPACK_IMPORTED_MODULE_2__scripts_module_axios_js__["default"].get('/api/wechat/admin/mp/list').then(res => {
            if (res.data) {
                self.appIdArr = gzharr(res.data, DSP.user.privileges, 'authority');
            }
        });
    }
});

/***/ }),

/***/ 142:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["a"] = ({
    props: {
        cmsflag: Boolean,
        mindata: Object
    },
    data() {
        return {
            loading: false,
            fileBaseUrl: DSP.globalConfig.fileBaseUrl
        };
    },
    methods: {
        beforeUpload(file) {
            //限制上传格式
            let imgtype = ['image/jpeg', 'image/png'];
            if (imgtype.indexOf(file.type) < 0) {
                this.$message.error('只支持png/jpg格式图片');
                return false;
            }
            //限制上传大小
            if (file.size / 512 / 1024 > 1) {
                this.$message.error('文件大小不能超过0.5MB!');
                return false;
            }
            return true;
        },
        //上传成功后
        uploadSucceed(response) {
            if (response.code === '000') {
                this.mindata.mediaSourseUrl = response && response.data && response.data.relativePath;
            } else {
                this.$message.error(response.message);
            }
        },
        quxiao() {
            this.$emit('update:cmsflag', false);
        },
        addCardForm() {
            //type 新增还是编辑
            let self = this;
            //type 新增还是编辑
            let ifSave = true;
            if (!self.mindata.mediaSourseUrl) {
                ifSave = false;
                this.$message.error('请上传图片');
            }
            if (ifSave) {
                self.mindata.type = 'image';
                self.$emit('update:cmsflag', false);
                self.$emit('mindata', self.mindata);
            }
        }
    }

});

/***/ }),

/***/ 143:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

//cms文字 用于添加文字

/* harmony default export */ __webpack_exports__["a"] = ({
    props: {
        cmsflag: Boolean,
        mindata: Object,
        guanjianci: Boolean
    },
    data() {
        return {
            loading: false
        };
    },
    methods: {
        quxiao() {
            this.$emit('update:cmsflag', false);
        },
        addCardForm() {
            let self = this;
            //type 新增还是编辑
            let ifSave = true;
            if (!self.mindata.text) {
                ifSave = false;
                this.$message.error('请输入文字内容');
            }
            if (ifSave) {
                if (this.loading) {
                    return;
                }
                this.loading = true;
                setTimeout(() => {
                    self.loading = false;
                }, 500);
                self.mindata.type = 'text';
                self.$emit('update:cmsflag', false);
                self.$emit('mindata', self.mindata);
            }
        }
    }

});

/***/ }),

/***/ 15:
/***/ (function(module, exports) {

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}


/***/ }),

/***/ 16:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defaults = __webpack_require__(2);
var utils = __webpack_require__(0);
var InterceptorManager = __webpack_require__(25);
var dispatchRequest = __webpack_require__(26);

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = utils.merge({
      url: arguments[0]
    }, arguments[1]);
  }

  config = utils.merge(defaults, this.defaults, { method: 'get' }, config);
  config.method = config.method.toLowerCase();

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),

/***/ 17:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),

/***/ 18:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(6);

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  // Note: status is not exposed by XDomainRequest
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),

/***/ 19:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }
  error.request = request;
  error.response = response;
  return error;
};


/***/ }),

/***/ 2:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(0);
var normalizeHeaderName = __webpack_require__(17);

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(5);
  } else if (typeof process !== 'undefined') {
    // For node use HTTP adapter
    adapter = __webpack_require__(5);
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ }),

/***/ 20:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      }

      if (!utils.isArray(val)) {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),

/***/ 21:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};


/***/ }),

/***/ 217:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_cms_mincade_vue__ = __webpack_require__(141);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_4fee0375_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_cms_mincade_vue__ = __webpack_require__(220);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(218)
}
var normalizeComponent = __webpack_require__(39)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_cms_mincade_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_4fee0375_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_cms_mincade_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "modules/global/components/ui/cms-mincade.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4fee0375", Component.options)
  } else {
    hotAPI.reload("data-v-4fee0375", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 218:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(219);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(41)("4a5a6c33", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/_css-loader@0.28.11@css-loader/index.js!../../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-4fee0375\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../node_modules/_less-loader@4.1.0@less-loader/dist/cjs.js!../../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/selector.js?type=styles&index=0!./cms-mincade.vue", function() {
     var newContent = require("!!../../../../node_modules/_css-loader@0.28.11@css-loader/index.js!../../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-4fee0375\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../node_modules/_less-loader@4.1.0@less-loader/dist/cjs.js!../../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/selector.js?type=styles&index=0!./cms-mincade.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 219:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(40)(false);
// imports


// module
exports.push([module.i, "\n.el-select-mindata .el-input {\n  width: 100% !important;\n}\n", ""]);

// exports


/***/ }),

/***/ 22:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  (function standardBrowserEnv() {
    var msie = /(msie|trident)/i.test(navigator.userAgent);
    var urlParsingNode = document.createElement('a');
    var originURL;

    /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
    function resolveURL(url) {
      var href = url;

      if (msie) {
        // IE needs attribute set twice to normalize properties
        urlParsingNode.setAttribute('href', href);
        href = urlParsingNode.href;
      }

      urlParsingNode.setAttribute('href', href);

      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
      return {
        href: urlParsingNode.href,
        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
        host: urlParsingNode.host,
        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
        hostname: urlParsingNode.hostname,
        port: urlParsingNode.port,
        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
                  urlParsingNode.pathname :
                  '/' + urlParsingNode.pathname
      };
    }

    originURL = resolveURL(window.location.href);

    /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
    return function isURLSameOrigin(requestURL) {
      var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
      return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
    };
  })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return function isURLSameOrigin() {
      return true;
    };
  })()
);


/***/ }),

/***/ 220:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "el-dialog",
    {
      attrs: {
        title: "小程序卡片",
        visible: _vm.cmsflag,
        width: "600px",
        "close-on-click-modal": false,
        "close-on-press-escape": false,
        "show-close": false
      },
      on: {
        "update:visible": function($event) {
          _vm.cmsflag = $event
        }
      }
    },
    [
      _c(
        "div",
        {
          staticClass: "dsp-form",
          attrs: { id: "stylistrenzheng", container: "dialog" }
        },
        [
          _c("div", { staticClass: "dsp-form_body" }, [
            _c(
              "div",
              { staticClass: "stylist-from" },
              [
                _c(
                  "el-row",
                  { attrs: { type: "flex" } },
                  [
                    _c(
                      "el-col",
                      {
                        staticClass: "form-label required",
                        attrs: { span: 4 }
                      },
                      [_vm._v("卡片标题")]
                    ),
                    _vm._v(" "),
                    _c(
                      "el-col",
                      { attrs: { span: 20 } },
                      [
                        _c("el-input", {
                          attrs: { placeholder: "请输入标题", maxlength: 20 },
                          model: {
                            value: _vm.mindata.title,
                            callback: function($$v) {
                              _vm.$set(_vm.mindata, "title", $$v)
                            },
                            expression: "mindata.title"
                          }
                        })
                      ],
                      1
                    )
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "el-row",
                  { attrs: { type: "flex" } },
                  [
                    _c(
                      "el-col",
                      {
                        staticClass: "form-label required",
                        attrs: { span: 4 }
                      },
                      [_vm._v("小程序")]
                    ),
                    _vm._v(" "),
                    _c(
                      "el-col",
                      { attrs: { span: 20 } },
                      [
                        _c(
                          "el-select",
                          {
                            staticClass: "el-select-mindata",
                            attrs: { placeholder: "请选择小程序" },
                            model: {
                              value: _vm.mindata.appid,
                              callback: function($$v) {
                                _vm.$set(_vm.mindata, "appid", $$v)
                              },
                              expression: "mindata.appid"
                            }
                          },
                          _vm._l(_vm.appIdArr, function(item) {
                            return _c("el-option", {
                              key: item.appId,
                              attrs: { label: item.name, value: item.appId }
                            })
                          })
                        )
                      ],
                      1
                    )
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "el-row",
                  { attrs: { type: "flex" } },
                  [
                    _c(
                      "el-col",
                      {
                        staticClass: "form-label required",
                        attrs: { span: 4 }
                      },
                      [_vm._v("小程序路径")]
                    ),
                    _vm._v(" "),
                    _c(
                      "el-col",
                      { attrs: { span: 20 } },
                      [
                        _c("el-input", {
                          attrs: {
                            type: "textarea",
                            rows: 2,
                            resize: "none",
                            maxlength: 255,
                            "show-word-limit": true,
                            placeholder: "请输入小程序路径"
                          },
                          model: {
                            value: _vm.mindata.pagepath,
                            callback: function($$v) {
                              _vm.$set(_vm.mindata, "pagepath", $$v)
                            },
                            expression: "mindata.pagepath"
                          }
                        })
                      ],
                      1
                    )
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "el-row",
                  { attrs: { type: "flex" } },
                  [
                    _c(
                      "el-col",
                      {
                        staticClass: "form-label required",
                        attrs: { span: 4 }
                      },
                      [_vm._v("图片")]
                    ),
                    _vm._v(" "),
                    _c(
                      "el-col",
                      { attrs: { span: 20 } },
                      [
                        _c(
                          "div",
                          {
                            staticClass: "font-label single-line",
                            staticStyle: { margin: "10px 0" }
                          },
                          [_vm._v("图片大小建议不超过200KB；尺寸为200px*150px")]
                        ),
                        _vm._v(" "),
                        _c("dsp-cropper", {
                          attrs: {
                            value: _vm.mindata.mediaSourseUrl,
                            ul: _vm.mindata.mediaSourseUrl,
                            height: "150px",
                            width: "200px"
                          },
                          on: {
                            "update:value": function($event) {
                              _vm.$set(_vm.mindata, "mediaSourseUrl", $event)
                            }
                          }
                        })
                      ],
                      1
                    )
                  ],
                  1
                )
              ],
              1
            )
          ])
        ]
      ),
      _vm._v(" "),
      _c(
        "div",
        {
          staticClass: "dialog-footer",
          staticStyle: { "text-align": "right" },
          attrs: { slot: "footer" },
          slot: "footer"
        },
        [
          _c("el-button", { on: { click: _vm.quxiao } }, [_vm._v("取 消")]),
          _vm._v(" "),
          _c(
            "el-button",
            { attrs: { type: "primary" }, on: { click: _vm.addCardForm } },
            [_vm._v("确 定")]
          )
        ],
        1
      )
    ]
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-4fee0375", esExports)
  }
}

/***/ }),

/***/ 221:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_cms_minimage_vue__ = __webpack_require__(142);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_6d987735_hasScoped_true_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_cms_minimage_vue__ = __webpack_require__(224);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(222)
}
var normalizeComponent = __webpack_require__(39)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-6d987735"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_cms_minimage_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_6d987735_hasScoped_true_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_cms_minimage_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "modules/global/components/ui/cms-minimage.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6d987735", Component.options)
  } else {
    hotAPI.reload("data-v-6d987735", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 222:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(223);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(41)("0a404fa2", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/_css-loader@0.28.11@css-loader/index.js!../../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-6d987735\",\"scoped\":true,\"hasInlineConfig\":false}!../../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/selector.js?type=styles&index=0!./cms-minimage.vue", function() {
     var newContent = require("!!../../../../node_modules/_css-loader@0.28.11@css-loader/index.js!../../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-6d987735\",\"scoped\":true,\"hasInlineConfig\":false}!../../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/selector.js?type=styles&index=0!./cms-minimage.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 223:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(40)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),

/***/ 224:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "el-dialog",
    {
      attrs: {
        title: "图片回复",
        visible: _vm.cmsflag,
        width: "600px",
        "close-on-click-modal": false,
        "close-on-press-escape": false,
        "show-close": false
      },
      on: {
        "update:visible": function($event) {
          _vm.cmsflag = $event
        }
      }
    },
    [
      _c(
        "div",
        { staticClass: "stylist-img" },
        [
          _c(
            "el-upload",
            {
              staticClass: "avatar-uploader",
              attrs: {
                action: "/api/file-service/file/wechat/admin/upload",
                "before-upload": _vm.beforeUpload,
                "show-file-list": false,
                "on-success": _vm.uploadSucceed
              }
            },
            [
              _vm.mindata.mediaSourseUrl
                ? _c("img", {
                    staticClass: "avatar",
                    attrs: { src: _vm.fileBaseUrl + _vm.mindata.mediaSourseUrl }
                  })
                : _c("div", { staticClass: "avatar-uploader-icon" }, [
                    _c("div", { staticClass: "avatar-uploader-icon-yuan" }, [
                      _c("i", { staticClass: "el-icon-upload" })
                    ])
                  ])
            ]
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "div",
        {
          staticClass: "dialog-footer",
          staticStyle: { "text-align": "right" },
          attrs: { slot: "footer" },
          slot: "footer"
        },
        [
          _c("el-button", { on: { click: _vm.quxiao } }, [_vm._v("取 消")]),
          _vm._v(" "),
          _c(
            "el-button",
            { attrs: { type: "primary" }, on: { click: _vm.addCardForm } },
            [_vm._v("确 定")]
          )
        ],
        1
      )
    ]
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-6d987735", esExports)
  }
}

/***/ }),

/***/ 225:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_cms_mintext_vue__ = __webpack_require__(143);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_2c6f3843_hasScoped_true_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_cms_mintext_vue__ = __webpack_require__(228);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(226)
}
var normalizeComponent = __webpack_require__(39)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-2c6f3843"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_cms_mintext_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_2c6f3843_hasScoped_true_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_cms_mintext_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "modules/global/components/ui/cms-mintext.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2c6f3843", Component.options)
  } else {
    hotAPI.reload("data-v-2c6f3843", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 226:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(227);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(41)("42ad8187", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/_css-loader@0.28.11@css-loader/index.js!../../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-2c6f3843\",\"scoped\":true,\"hasInlineConfig\":false}!../../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/selector.js?type=styles&index=0!./cms-mintext.vue", function() {
     var newContent = require("!!../../../../node_modules/_css-loader@0.28.11@css-loader/index.js!../../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-2c6f3843\",\"scoped\":true,\"hasInlineConfig\":false}!../../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/selector.js?type=styles&index=0!./cms-mintext.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 227:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(40)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),

/***/ 228:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "el-dialog",
    {
      attrs: {
        title: "文字回复",
        visible: _vm.cmsflag,
        width: "600px",
        "close-on-click-modal": false,
        "close-on-press-escape": false,
        "show-close": false
      },
      on: {
        "update:visible": function($event) {
          _vm.cmsflag = $event
        }
      }
    },
    [
      _vm.guanjianci
        ? _c(
            "div",
            { staticStyle: { "margin-bottom": "10px", "line-height": "24px" } },
            [
              _vm._v(
                "\n        1、访客数（访问人数）：{FK[20191001~20191031]}"
              ),
              _c("br"),
              _vm._v(
                "\n        2、报名数（报名人数）：{BM[20191001~20191031]}"
              ),
              _c("br"),
              _vm._v(
                "\n        3、曝光数（访问次数）：{BG[20191001~20191031]}"
              ),
              _c("br")
            ]
          )
        : _vm._e(),
      _vm._v(" "),
      _c("el-input", {
        attrs: { maxlength: 500, placeholder: "文字回复" },
        model: {
          value: _vm.mindata.text,
          callback: function($$v) {
            _vm.$set(_vm.mindata, "text", $$v)
          },
          expression: "mindata.text"
        }
      }),
      _vm._v(" "),
      _c(
        "div",
        {
          staticClass: "dialog-footer",
          staticStyle: { "text-align": "right" },
          attrs: { slot: "footer" },
          slot: "footer"
        },
        [
          _c("el-button", { on: { click: _vm.quxiao } }, [_vm._v("取 消")]),
          _vm._v(" "),
          _c(
            "el-button",
            { attrs: { type: "primary" }, on: { click: _vm.addCardForm } },
            [_vm._v("确 定")]
          )
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-2c6f3843", esExports)
  }
}

/***/ }),

/***/ 23:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js

var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

function E() {
  this.message = 'String contains an invalid character';
}
E.prototype = new Error;
E.prototype.code = 5;
E.prototype.name = 'InvalidCharacterError';

function btoa(input) {
  var str = String(input);
  var output = '';
  for (
    // initialize result and counter
    var block, charCode, idx = 0, map = chars;
    // if the next str index does not exist:
    //   change the mapping table to "="
    //   check if d has no fractional digits
    str.charAt(idx | 0) || (map = '=', idx % 1);
    // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
    output += map.charAt(63 & block >> 8 - idx % 1 * 8)
  ) {
    charCode = str.charCodeAt(idx += 3 / 4);
    if (charCode > 0xFF) {
      throw new E();
    }
    block = block << 8 | charCode;
  }
  return output;
}

module.exports = btoa;


/***/ }),

/***/ 24:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
  (function standardBrowserEnv() {
    return {
      write: function write(name, value, expires, path, domain, secure) {
        var cookie = [];
        cookie.push(name + '=' + encodeURIComponent(value));

        if (utils.isNumber(expires)) {
          cookie.push('expires=' + new Date(expires).toGMTString());
        }

        if (utils.isString(path)) {
          cookie.push('path=' + path);
        }

        if (utils.isString(domain)) {
          cookie.push('domain=' + domain);
        }

        if (secure === true) {
          cookie.push('secure');
        }

        document.cookie = cookie.join('; ');
      },

      read: function read(name) {
        var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
        return (match ? decodeURIComponent(match[3]) : null);
      },

      remove: function remove(name) {
        this.write(name, '', Date.now() - 86400000);
      }
    };
  })() :

  // Non standard browser env (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return {
      write: function write() {},
      read: function read() { return null; },
      remove: function remove() {}
    };
  })()
);


/***/ }),

/***/ 25:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),

/***/ 26:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);
var transformData = __webpack_require__(27);
var isCancel = __webpack_require__(7);
var defaults = __webpack_require__(2);
var isAbsoluteURL = __webpack_require__(28);
var combineURLs = __webpack_require__(29);

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Support baseURL config
  if (config.baseURL && !isAbsoluteURL(config.url)) {
    config.url = combineURLs(config.baseURL, config.url);
  }

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers || {}
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),

/***/ 27:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};


/***/ }),

/***/ 28:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),

/***/ 29:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),

/***/ 3:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),

/***/ 30:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(8);

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),

/***/ 31:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


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

/***/ }),

/***/ 39:
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 4:
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ 40:
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ 41:
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(45)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}
var options = null
var ssrIdKey = 'data-vue-ssr-id'

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction, _options) {
  isProduction = _isProduction

  options = _options || {}

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[' + ssrIdKey + '~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }
  if (options.ssrId) {
    styleElement.setAttribute(ssrIdKey, obj.id)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),

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
    dict: function (type) {
        let self = this;
        if (!self.$dict) {
            let script = document.querySelector('script[type="text/json"][name="dict"]');
            let text = script && script.innerText || '{}';
            try {
                self.$dict = JSON.parse(text);
            } catch (e) {}
        }
        return type && self.$dict ? self.$dict[type] || [] : self.$dict || {};
    }
});

/***/ }),

/***/ 45:
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),

/***/ 47:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_cropperjs__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_cropperjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_cropperjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__scripts_module_axios__ = __webpack_require__(10);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["a"] = ({
    props: {
        // 传入的数据对象（必填）
        value: Object,
        // 备用的，暂时不用
        ul: String,
        // 指定宽高（必填）
        width: String,
        height: String,
        // 一个页面如果使用两个，第二个type值传值为poster（选填）
        type: String,
        // 默认的图片地址
        defaultImg: String,
        maxsize: Number //MB
    },
    data() {
        return {
            // 基础图片地址
            fileBaseUrl: DSP.globalConfig.fileBaseUrl,
            headerImage: "",
            picValue: "",
            cropper: "",
            croppable: false,
            panel: false,
            url: this.value && this.value.imageUrl,
            loading: false
        };
    },
    mounted() {
        let that = this;
        var val = that.value;
        var num = new Date().getTime();
        that.$forceUpdate();
        that.num = num;
        if (val && val.imageUrl) {
            that.headerImage = that.fileBaseUrl + val.imageUrl;
        }
        // 现在兼容一个页面同时展示两个此组件，
        // 但是因为cropper对象的渲染需要根据img元素的id渲染，
        // 但是id 必须独一无二，因此根据type来改变id todo 现在仅仅支持两个
        // that.type === 'poster' ? 'poster' : 'image';
        var eleId = ''; // 根据type 判断渲染的id 值
        if (that.type) {
            eleId = that.type + '1';
        } else {
            eleId = 'change1';
        }
        var image = document.getElementById(eleId); // 获取元素
        var width = that.width.split('p')[0]; // 获取指定宽
        var height = that.height.split('p')[0]; // 获取指定高
        // 创建指定Cropper对象
        that.cropper = new __WEBPACK_IMPORTED_MODULE_0_cropperjs___default.a(image, {
            aspectRatio: width / height, // 默认比例
            preview: '.previewImg', // 预览视图
            guides: false, // 裁剪框的虚线(九宫格)
            autoCropArea: 1, // 0-1之间的数值，定义自动剪裁区域的大小，默认0.8
            dragMode: 'move', // 是否允许移除当前的剪裁框，并通过拖动来新建一个剪裁框区域
            movable: true, // 是否允许移动图片
            resizable: false, // 是否允许改变裁剪框的大小
            cropBoxResizable: false,
            zoomable: true, // 是否允许缩放图片大小
            mouseWheelZoom: false, // 是否允许通过鼠标滚轮来缩放图片
            touchDragZoom: false, // 是否允许通过触摸移动来缩放图片
            rotatable: true, // 是否允许旋转图片
            viewMode: 2,
            background: false,
            ready: function () {
                that.croppable = true;
            },
            crop(event) {
                // console.log(event.detail.x);
            }
        });
    },
    methods: {
        imgurl(url) {
            if (url && url.indexOf('http:') > -1) {
                return url;
            } else {
                return DSP.globalConfig.fileBaseUrl + url;
            }
        },
        // 缩放
        scale(type) {
            var that = this;
            var num = type === -1 ? -0.1 : 0.1;
            that.cropper.zoom(num);
        },
        // 旋转
        roteta(direction) {
            var that = this;
            var reg = direction === 'left' ? -90 : 90;
            that.cropper.rotate(reg);
        },
        // 确定截取
        crop() {
            let that = this;
            var croppedCanvas;
            var roundedCanvas;
            if (!this.croppable) {
                return;
            }
            var width = that.width.split('p')[0];
            var height = that.height.split('p')[0];
            // 生成裁切后的图片，指定宽高
            // croppedCanvas = this.cropper.getCroppedCanvas({
            // 	width: width * 2,
            // 	height: height * 2,
            // 	minWidth: width * 2,
            // 	minHeight: height * 2,
            // 	maxWidth: 4096,
            // 	maxHeight: 4096,
            // 	fillColor: '#fff',
            // 	imageSmoothingEnabled: false,
            // 	imageSmoothingQuality: 'high'
            // });
            croppedCanvas = this.cropper.getCroppedCanvas();
            roundedCanvas = this.getRoundedCanvas(croppedCanvas); // 生成裁切后的图片
            that.postImg(roundedCanvas);
        },
        // 截取图片制成canvas
        getRoundedCanvas(sourceCanvas) {
            let that = this;
            var canvas = document.createElement('canvas');
            var context = canvas.getContext('2d');
            var width = sourceCanvas.width;
            var height = sourceCanvas.height;
            canvas.width = width;
            canvas.height = height;
            context.imageSmoothingEnabled = true;
            // context.translate(0.2, -0.2);
            // context.scale(0.2, 0.2);
            // context.drawImage(sourceCanvas, 0, 0, width * 5, height * 5);
            context.drawImage(sourceCanvas, 0, 0, width, height);
            // context.globalCompositeOperation = 'destination-in';
            return canvas;
        },
        getObjectURL(file) {
            var url = null;
            if (window.createObjectURL != undefined) {
                // basic
                url = window.createObjectURL(file);
            } else if (window.URL != undefined) {
                // mozilla(firefox)
                url = window.URL.createObjectURL(file);
            } else if (window.webkitURL != undefined) {
                // webkit or chrome
                url = window.webkitURL.createObjectURL(file);
            }
            return url;
        },
        // 选取的图片更改后
        change(e) {
            var that = this;
            let files = e.target.files || e.dataTransfer.files;
            if (!files.length) return;
            this.panel = true;
            this.picValue = files[0];
            this.url = this.getObjectURL(this.picValue);

            var width = that.width.split('p')[0];
            var height = that.height.split('p')[0];
            that.cropper.setAspectRatio(width / height);
            //每次替换图片要重新得到新的url
            if (this.cropper) {
                this.cropper.replace(this.url);
            }
            // 展示截取的界面
            this.panel = true;
        },
        // 点击取消按钮
        cancelCrop() {
            var that = this;
            that.panel = false;
            that.clearInputFile(); // 清除选中的图片的value
        },
        // 清除选中的图片的value,防止同一图片不能反复提交
        clearInputFile() {
            var that = this;
            var eleId = '';
            if (that.type) {
                eleId = that.type;
            } else {
                eleId = 'change';
            }
            var f = document.getElementById(eleId);
            if (f.value) {
                try {
                    f.value = ''; //for IE11, latest Chrome/Firefox/Opera...
                } catch (err) {}
                if (f.value) {
                    //for IE5 ~ IE10
                    var form = document.createElement('form'),
                        ref = f.nextSibling,
                        p = f.parentNode;
                    form.appendChild(f);
                    form.reset();
                    p.insertBefore(f, ref);
                }
            }
        },
        // 提交图片到后台
        postImg(file) {
            var that = this;
            // file.toBlob() canvas转成blob
            file.toBlob(blob => {
                // 将 blob 图片转成文件格式  var file = new File([file], name)
                var files = new File([blob], 'file.png');
                const formData = new FormData();
                formData.append('file', files);
                let sis = (files.size / 1024 / 1024).toFixed(2);
                console.log(sis);
                if (that.maxsize && that.maxsize < files.size / 1024 / 1024) {
                    let si = (files.size / 1024 / 1024).toFixed(2);
                    that.$message.error(`剪切后图片大小为${si}MB，不能大于${that.maxsize}MB`);
                    return;
                }
                that.loading = true;
                var url = '/api/file-service/file/wechat/admin/upload';
                var config = { headers: { "Content-Type": "multipart/form-data" } };
                __WEBPACK_IMPORTED_MODULE_1__scripts_module_axios__["default"].post(url, formData, config).then(res => {
                    if (res && res.success) {
                        var newValue = that.value && that.value.imageUrl ? JSON.parse(JSON.stringify(that.value)) : {};
                        if (that.value && that.value.id) {
                            newValue.id = that.value.id;
                        }
                        newValue.ext = res.data.fileExt;
                        newValue.imageMd5 = res.data.md5;
                        newValue.imageUrl = res.data.relativePath;
                        newValue.name = res.data.relativePath;
                        newValue.reduceUrl = res.data.ghostRelativePath;
                        newValue.size = files.size;
                        that.$emit('update:value', newValue); // 更新数据
                        that.$emit('update:defaultImg', res.data.relativePath); // 更新图片地址
                        that.panel = false; // 关闭截取界面
                        that.clearInputFile(); // 清除选中的图片的value
                    }
                    that.loading = false;
                }).catch(err => {
                    that.loading = false;
                    console.log(error);
                });
            }, 'image/jpeg');
        },
        // 点击图片或空容器，指向img的点击事件
        chioce() {
            let that = this;
            //that.type === 'poster' ? 'changeP' : 'change'
            var eleId = '';
            if (that.type) {
                eleId = that.type;
            } else {
                eleId = 'change';
            }
            var el = document.getElementById(eleId);
            el.click();
        }
    },
    watch: {
        'value'(val, oldVal) {
            var that = this;
            this.headerImage = this.fileBaseUrl + (val && val.imageUrl);
        }
    }
});

/***/ }),

/***/ 5:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(0);
var settle = __webpack_require__(18);
var buildURL = __webpack_require__(20);
var parseHeaders = __webpack_require__(21);
var isURLSameOrigin = __webpack_require__(22);
var createError = __webpack_require__(6);
var btoa = (typeof window !== 'undefined' && window.btoa && window.btoa.bind(window)) || __webpack_require__(23);

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();
    var loadEvent = 'onreadystatechange';
    var xDomain = false;

    // For IE 8/9 CORS support
    // Only supports POST and GET calls and doesn't returns the response headers.
    // DON'T do this for testing b/c XMLHttpRequest is mocked, not XDomainRequest.
    if (process.env.NODE_ENV !== 'test' &&
        typeof window !== 'undefined' &&
        window.XDomainRequest && !('withCredentials' in request) &&
        !isURLSameOrigin(config.url)) {
      request = new window.XDomainRequest();
      loadEvent = 'onload';
      xDomain = true;
      request.onprogress = function handleProgress() {};
      request.ontimeout = function handleTimeout() {};
    }

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request[loadEvent] = function handleLoad() {
      if (!request || (request.readyState !== 4 && !xDomain)) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        // IE sends 1223 instead of 204 (https://github.com/axios/axios/issues/201)
        status: request.status === 1223 ? 204 : request.status,
        statusText: request.status === 1223 ? 'No Content' : request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = __webpack_require__(24);

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
          cookies.read(config.xsrfCookieName) :
          undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (config.withCredentials) {
      request.withCredentials = true;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ }),

/***/ 50:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_dsp_cropper_vue__ = __webpack_require__(47);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_3493686e_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_dsp_cropper_vue__ = __webpack_require__(55);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(52)
}
var normalizeComponent = __webpack_require__(39)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_dsp_cropper_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_3493686e_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_dsp_cropper_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "modules/global/components/ui/dsp-cropper.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3493686e", Component.options)
  } else {
    hotAPI.reload("data-v-3493686e", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 52:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(53);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(41)("3641c26c", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/_css-loader@0.28.11@css-loader/index.js!../../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3493686e\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../node_modules/_less-loader@4.1.0@less-loader/dist/cjs.js!../../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/selector.js?type=styles&index=0!./dsp-cropper.vue", function() {
     var newContent = require("!!../../../../node_modules/_css-loader@0.28.11@css-loader/index.js!../../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3493686e\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../node_modules/_less-loader@4.1.0@less-loader/dist/cjs.js!../../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/selector.js?type=styles&index=0!./dsp-cropper.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 53:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(40)(false);
// imports


// module
exports.push([module.i, "/*@import \"../../global/styles/global\";*/\n.demo #button {\n  width: 80px;\n  height: 40px;\n  border: none;\n  border-radius: 5px;\n  background: white;\n}\n.demo .show {\n  /*width: 375px;*/\n  /*height: 210px;*/\n  overflow: hidden;\n  position: relative;\n  border: 1px solid #d5d5d5;\n}\n.demo .picture {\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n  background-position: center center;\n  background-repeat: no-repeat;\n  background-size: cover;\n  text-align: center;\n  line-height: 300px;\n  font-size: 40px;\n  color: #aeaeae;\n  background-color: #DDE1EA ;\n  cursor: pointer;\n  position: relative;\n}\n.demo .picture .icon-upload-box {\n  width: 68px;\n  height: 68px;\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  border-radius: 50%;\n  background: #fff;\n  margin: auto;\n  text-align: center;\n  line-height: 68px;\n  color: #409EFF;\n}\n.demo .container {\n  z-index: 1000;\n  position: fixed;\n  padding-top: 60px;\n  left: 0;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(0, 0, 0, 0.5);\n}\n.demo .wrap {\n  width: 500px;\n  height: 500px;\n  margin: 80px auto;\n}\n.demo #image {\n  max-width: 100%;\n}\n/*!\n * Cropper.js v1.0.0-rc\n * https://github.com/fengyuanchen/cropperjs\n *\n * Copyright (c) 2017 Fengyuan Chen\n * Released under the MIT license\n *\n * Date: 2017-03-25T12:02:21.062Z\n */\n.cropper-container {\n  font-size: 0;\n  line-height: 0;\n  position: relative;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  direction: ltr;\n  -ms-touch-action: none;\n  touch-action: none;\n}\n.cropper-container img {\n  /* Avoid margin top issue (Occur only when margin-top <= -height) */\n  display: block;\n  min-width: 0 !important;\n  max-width: none !important;\n  min-height: 0 !important;\n  max-height: none !important;\n  width: 100%;\n  height: 100%;\n  image-orientation: NaNdeg;\n}\n.cropper-wrap-box,\n.cropper-canvas,\n.cropper-drag-box,\n.cropper-crop-box,\n.cropper-modal {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n}\n.cropper-wrap-box {\n  overflow: hidden;\n}\n.cropper-drag-box {\n  opacity: 0;\n  background-color: #fff;\n}\n.cropper-modal {\n  opacity: .5;\n  background-color: #000;\n}\n.cropper-view-box {\n  display: block;\n  overflow: hidden;\n  width: 100%;\n  height: 100%;\n  outline: 1px solid #39f;\n  outline-color: rgba(51, 153, 255, 0.75);\n}\n.cropper-dashed {\n  position: absolute;\n  display: block;\n  opacity: .5;\n  border: 1px dashed #eee;\n}\n.cropper-dashed.dashed-h {\n  top: 33.33333%;\n  left: 0;\n  width: 100%;\n  height: 33.33333%;\n  border-top-width: 1px;\n  border-bottom-width: 1px;\n}\n.cropper-dashed.dashed-v {\n  top: 0;\n  left: 33.33333%;\n  width: 33.33333%;\n  height: 100%;\n  border-right-width: 1px;\n  border-left-width: 1px;\n}\n.cropper-center {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  display: block;\n  width: 0;\n  height: 0;\n  opacity: 0.75;\n}\n.cropper-center:before,\n.cropper-center:after {\n  position: absolute;\n  display: block;\n  content: ' ';\n  background-color: #eee;\n}\n.cropper-center:before {\n  top: 0;\n  left: -3px;\n  width: 7px;\n  height: 1px;\n}\n.cropper-center:after {\n  top: -3px;\n  left: 0;\n  width: 1px;\n  height: 7px;\n}\n.cropper-face,\n.cropper-line,\n.cropper-point {\n  position: absolute;\n  display: block;\n  width: 100%;\n  height: 100%;\n  opacity: .1;\n}\n.cropper-face {\n  top: 0;\n  left: 0;\n  background-color: #fff;\n}\n.cropper-line {\n  background-color: #39f;\n}\n.cropper-line.line-e {\n  top: 0;\n  right: -3px;\n  width: 5px;\n  cursor: e-resize;\n}\n.cropper-line.line-n {\n  top: -3px;\n  left: 0;\n  height: 5px;\n  cursor: n-resize;\n}\n.cropper-line.line-w {\n  top: 0;\n  left: -3px;\n  width: 5px;\n  cursor: w-resize;\n}\n.cropper-line.line-s {\n  bottom: -3px;\n  left: 0;\n  height: 5px;\n  cursor: s-resize;\n}\n.cropper-point {\n  width: 5px;\n  height: 5px;\n  opacity: .75;\n  background-color: #39f;\n}\n.cropper-point.point-e {\n  top: 50%;\n  right: -3px;\n  margin-top: -3px;\n  cursor: e-resize;\n}\n.cropper-point.point-n {\n  top: -3px;\n  left: 50%;\n  margin-left: -3px;\n  cursor: n-resize;\n}\n.cropper-point.point-w {\n  top: 50%;\n  left: -3px;\n  margin-top: -3px;\n  cursor: w-resize;\n}\n.cropper-point.point-s {\n  bottom: -3px;\n  left: 50%;\n  margin-left: -3px;\n  cursor: s-resize;\n}\n.cropper-point.point-ne {\n  top: -3px;\n  right: -3px;\n  cursor: ne-resize;\n}\n.cropper-point.point-nw {\n  top: -3px;\n  left: -3px;\n  cursor: nw-resize;\n}\n.cropper-point.point-sw {\n  bottom: -3px;\n  left: -3px;\n  cursor: sw-resize;\n}\n.cropper-point.point-se {\n  right: -3px;\n  bottom: -3px;\n  width: 20px;\n  height: 20px;\n  cursor: se-resize;\n  opacity: 1;\n}\n@media (min-width: 768px) {\n.cropper-point.point-se {\n    width: 15px;\n    height: 15px;\n}\n}\n@media (min-width: 992px) {\n.cropper-point.point-se {\n    width: 10px;\n    height: 10px;\n}\n}\n@media (min-width: 1200px) {\n.cropper-point.point-se {\n    width: 5px;\n    height: 5px;\n    opacity: 0.75;\n}\n}\n.cropper-point.point-se:before {\n  position: absolute;\n  right: -50%;\n  bottom: -50%;\n  display: block;\n  width: 200%;\n  height: 200%;\n  content: ' ';\n  opacity: 0;\n  background-color: #39f;\n}\n.cropper-invisible {\n  opacity: 0;\n}\n.cropper-bg {\n  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC');\n}\n.cropper-hide {\n  position: absolute;\n  display: block;\n  width: 0;\n  height: 0;\n}\n.cropper-hidden {\n  display: none !important;\n}\n.cropper-move {\n  cursor: move;\n}\n.cropper-crop {\n  cursor: crosshair;\n}\n.cropper-disabled .cropper-drag-box,\n.cropper-disabled .cropper-face,\n.cropper-disabled .cropper-line,\n.cropper-disabled .cropper-point {\n  cursor: not-allowed;\n}\n", ""]);

// exports


/***/ }),

/***/ 54:
/***/ (function(module, exports, __webpack_require__) {

/*!
 * Cropper.js v1.5.6
 * https://fengyuanchen.github.io/cropperjs
 *
 * Copyright 2015-present Chen Fengyuan
 * Released under the MIT license
 *
 * Date: 2019-10-04T04:33:48.372Z
 */

(function (global, factory) {
   true ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.Cropper = factory());
}(this, function () { 'use strict';

  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(source, true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(source).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    }
  }

  function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }

  var IS_BROWSER = typeof window !== 'undefined' && typeof window.document !== 'undefined';
  var WINDOW = IS_BROWSER ? window : {};
  var IS_TOUCH_DEVICE = IS_BROWSER ? 'ontouchstart' in WINDOW.document.documentElement : false;
  var HAS_POINTER_EVENT = IS_BROWSER ? 'PointerEvent' in WINDOW : false;
  var NAMESPACE = 'cropper'; // Actions

  var ACTION_ALL = 'all';
  var ACTION_CROP = 'crop';
  var ACTION_MOVE = 'move';
  var ACTION_ZOOM = 'zoom';
  var ACTION_EAST = 'e';
  var ACTION_WEST = 'w';
  var ACTION_SOUTH = 's';
  var ACTION_NORTH = 'n';
  var ACTION_NORTH_EAST = 'ne';
  var ACTION_NORTH_WEST = 'nw';
  var ACTION_SOUTH_EAST = 'se';
  var ACTION_SOUTH_WEST = 'sw'; // Classes

  var CLASS_CROP = "".concat(NAMESPACE, "-crop");
  var CLASS_DISABLED = "".concat(NAMESPACE, "-disabled");
  var CLASS_HIDDEN = "".concat(NAMESPACE, "-hidden");
  var CLASS_HIDE = "".concat(NAMESPACE, "-hide");
  var CLASS_INVISIBLE = "".concat(NAMESPACE, "-invisible");
  var CLASS_MODAL = "".concat(NAMESPACE, "-modal");
  var CLASS_MOVE = "".concat(NAMESPACE, "-move"); // Data keys

  var DATA_ACTION = "".concat(NAMESPACE, "Action");
  var DATA_PREVIEW = "".concat(NAMESPACE, "Preview"); // Drag modes

  var DRAG_MODE_CROP = 'crop';
  var DRAG_MODE_MOVE = 'move';
  var DRAG_MODE_NONE = 'none'; // Events

  var EVENT_CROP = 'crop';
  var EVENT_CROP_END = 'cropend';
  var EVENT_CROP_MOVE = 'cropmove';
  var EVENT_CROP_START = 'cropstart';
  var EVENT_DBLCLICK = 'dblclick';
  var EVENT_TOUCH_START = IS_TOUCH_DEVICE ? 'touchstart' : 'mousedown';
  var EVENT_TOUCH_MOVE = IS_TOUCH_DEVICE ? 'touchmove' : 'mousemove';
  var EVENT_TOUCH_END = IS_TOUCH_DEVICE ? 'touchend touchcancel' : 'mouseup';
  var EVENT_POINTER_DOWN = HAS_POINTER_EVENT ? 'pointerdown' : EVENT_TOUCH_START;
  var EVENT_POINTER_MOVE = HAS_POINTER_EVENT ? 'pointermove' : EVENT_TOUCH_MOVE;
  var EVENT_POINTER_UP = HAS_POINTER_EVENT ? 'pointerup pointercancel' : EVENT_TOUCH_END;
  var EVENT_READY = 'ready';
  var EVENT_RESIZE = 'resize';
  var EVENT_WHEEL = 'wheel';
  var EVENT_ZOOM = 'zoom'; // Mime types

  var MIME_TYPE_JPEG = 'image/jpeg'; // RegExps

  var REGEXP_ACTIONS = /^e|w|s|n|se|sw|ne|nw|all|crop|move|zoom$/;
  var REGEXP_DATA_URL = /^data:/;
  var REGEXP_DATA_URL_JPEG = /^data:image\/jpeg;base64,/;
  var REGEXP_TAG_NAME = /^img|canvas$/i; // Misc
  // Inspired by the default width and height of a canvas element.

  var MIN_CONTAINER_WIDTH = 200;
  var MIN_CONTAINER_HEIGHT = 100;

  var DEFAULTS = {
    // Define the view mode of the cropper
    viewMode: 0,
    // 0, 1, 2, 3
    // Define the dragging mode of the cropper
    dragMode: DRAG_MODE_CROP,
    // 'crop', 'move' or 'none'
    // Define the initial aspect ratio of the crop box
    initialAspectRatio: NaN,
    // Define the aspect ratio of the crop box
    aspectRatio: NaN,
    // An object with the previous cropping result data
    data: null,
    // A selector for adding extra containers to preview
    preview: '',
    // Re-render the cropper when resize the window
    responsive: true,
    // Restore the cropped area after resize the window
    restore: true,
    // Check if the current image is a cross-origin image
    checkCrossOrigin: true,
    // Check the current image's Exif Orientation information
    checkOrientation: true,
    // Show the black modal
    modal: true,
    // Show the dashed lines for guiding
    guides: true,
    // Show the center indicator for guiding
    center: true,
    // Show the white modal to highlight the crop box
    highlight: true,
    // Show the grid background
    background: true,
    // Enable to crop the image automatically when initialize
    autoCrop: true,
    // Define the percentage of automatic cropping area when initializes
    autoCropArea: 0.8,
    // Enable to move the image
    movable: true,
    // Enable to rotate the image
    rotatable: true,
    // Enable to scale the image
    scalable: true,
    // Enable to zoom the image
    zoomable: true,
    // Enable to zoom the image by dragging touch
    zoomOnTouch: true,
    // Enable to zoom the image by wheeling mouse
    zoomOnWheel: true,
    // Define zoom ratio when zoom the image by wheeling mouse
    wheelZoomRatio: 0.1,
    // Enable to move the crop box
    cropBoxMovable: true,
    // Enable to resize the crop box
    cropBoxResizable: true,
    // Toggle drag mode between "crop" and "move" when click twice on the cropper
    toggleDragModeOnDblclick: true,
    // Size limitation
    minCanvasWidth: 0,
    minCanvasHeight: 0,
    minCropBoxWidth: 0,
    minCropBoxHeight: 0,
    minContainerWidth: 200,
    minContainerHeight: 100,
    // Shortcuts of events
    ready: null,
    cropstart: null,
    cropmove: null,
    cropend: null,
    crop: null,
    zoom: null
  };

  var TEMPLATE = '<div class="cropper-container" touch-action="none">' + '<div class="cropper-wrap-box">' + '<div class="cropper-canvas"></div>' + '</div>' + '<div class="cropper-drag-box"></div>' + '<div class="cropper-crop-box">' + '<span class="cropper-view-box"></span>' + '<span class="cropper-dashed dashed-h"></span>' + '<span class="cropper-dashed dashed-v"></span>' + '<span class="cropper-center"></span>' + '<span class="cropper-face"></span>' + '<span class="cropper-line line-e" data-cropper-action="e"></span>' + '<span class="cropper-line line-n" data-cropper-action="n"></span>' + '<span class="cropper-line line-w" data-cropper-action="w"></span>' + '<span class="cropper-line line-s" data-cropper-action="s"></span>' + '<span class="cropper-point point-e" data-cropper-action="e"></span>' + '<span class="cropper-point point-n" data-cropper-action="n"></span>' + '<span class="cropper-point point-w" data-cropper-action="w"></span>' + '<span class="cropper-point point-s" data-cropper-action="s"></span>' + '<span class="cropper-point point-ne" data-cropper-action="ne"></span>' + '<span class="cropper-point point-nw" data-cropper-action="nw"></span>' + '<span class="cropper-point point-sw" data-cropper-action="sw"></span>' + '<span class="cropper-point point-se" data-cropper-action="se"></span>' + '</div>' + '</div>';

  /**
   * Check if the given value is not a number.
   */

  var isNaN = Number.isNaN || WINDOW.isNaN;
  /**
   * Check if the given value is a number.
   * @param {*} value - The value to check.
   * @returns {boolean} Returns `true` if the given value is a number, else `false`.
   */

  function isNumber(value) {
    return typeof value === 'number' && !isNaN(value);
  }
  /**
   * Check if the given value is a positive number.
   * @param {*} value - The value to check.
   * @returns {boolean} Returns `true` if the given value is a positive number, else `false`.
   */

  var isPositiveNumber = function isPositiveNumber(value) {
    return value > 0 && value < Infinity;
  };
  /**
   * Check if the given value is undefined.
   * @param {*} value - The value to check.
   * @returns {boolean} Returns `true` if the given value is undefined, else `false`.
   */

  function isUndefined(value) {
    return typeof value === 'undefined';
  }
  /**
   * Check if the given value is an object.
   * @param {*} value - The value to check.
   * @returns {boolean} Returns `true` if the given value is an object, else `false`.
   */

  function isObject(value) {
    return _typeof(value) === 'object' && value !== null;
  }
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  /**
   * Check if the given value is a plain object.
   * @param {*} value - The value to check.
   * @returns {boolean} Returns `true` if the given value is a plain object, else `false`.
   */

  function isPlainObject(value) {
    if (!isObject(value)) {
      return false;
    }

    try {
      var _constructor = value.constructor;
      var prototype = _constructor.prototype;
      return _constructor && prototype && hasOwnProperty.call(prototype, 'isPrototypeOf');
    } catch (error) {
      return false;
    }
  }
  /**
   * Check if the given value is a function.
   * @param {*} value - The value to check.
   * @returns {boolean} Returns `true` if the given value is a function, else `false`.
   */

  function isFunction(value) {
    return typeof value === 'function';
  }
  var slice = Array.prototype.slice;
  /**
   * Convert array-like or iterable object to an array.
   * @param {*} value - The value to convert.
   * @returns {Array} Returns a new array.
   */

  function toArray(value) {
    return Array.from ? Array.from(value) : slice.call(value);
  }
  /**
   * Iterate the given data.
   * @param {*} data - The data to iterate.
   * @param {Function} callback - The process function for each element.
   * @returns {*} The original data.
   */

  function forEach(data, callback) {
    if (data && isFunction(callback)) {
      if (Array.isArray(data) || isNumber(data.length)
      /* array-like */
      ) {
          toArray(data).forEach(function (value, key) {
            callback.call(data, value, key, data);
          });
        } else if (isObject(data)) {
        Object.keys(data).forEach(function (key) {
          callback.call(data, data[key], key, data);
        });
      }
    }

    return data;
  }
  /**
   * Extend the given object.
   * @param {*} target - The target object to extend.
   * @param {*} args - The rest objects for merging to the target object.
   * @returns {Object} The extended object.
   */

  var assign = Object.assign || function assign(target) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    if (isObject(target) && args.length > 0) {
      args.forEach(function (arg) {
        if (isObject(arg)) {
          Object.keys(arg).forEach(function (key) {
            target[key] = arg[key];
          });
        }
      });
    }

    return target;
  };
  var REGEXP_DECIMALS = /\.\d*(?:0|9){12}\d*$/;
  /**
   * Normalize decimal number.
   * Check out {@link http://0.30000000000000004.com/}
   * @param {number} value - The value to normalize.
   * @param {number} [times=100000000000] - The times for normalizing.
   * @returns {number} Returns the normalized number.
   */

  function normalizeDecimalNumber(value) {
    var times = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100000000000;
    return REGEXP_DECIMALS.test(value) ? Math.round(value * times) / times : value;
  }
  var REGEXP_SUFFIX = /^width|height|left|top|marginLeft|marginTop$/;
  /**
   * Apply styles to the given element.
   * @param {Element} element - The target element.
   * @param {Object} styles - The styles for applying.
   */

  function setStyle(element, styles) {
    var style = element.style;
    forEach(styles, function (value, property) {
      if (REGEXP_SUFFIX.test(property) && isNumber(value)) {
        value = "".concat(value, "px");
      }

      style[property] = value;
    });
  }
  /**
   * Check if the given element has a special class.
   * @param {Element} element - The element to check.
   * @param {string} value - The class to search.
   * @returns {boolean} Returns `true` if the special class was found.
   */

  function hasClass(element, value) {
    return element.classList ? element.classList.contains(value) : element.className.indexOf(value) > -1;
  }
  /**
   * Add classes to the given element.
   * @param {Element} element - The target element.
   * @param {string} value - The classes to be added.
   */

  function addClass(element, value) {
    if (!value) {
      return;
    }

    if (isNumber(element.length)) {
      forEach(element, function (elem) {
        addClass(elem, value);
      });
      return;
    }

    if (element.classList) {
      element.classList.add(value);
      return;
    }

    var className = element.className.trim();

    if (!className) {
      element.className = value;
    } else if (className.indexOf(value) < 0) {
      element.className = "".concat(className, " ").concat(value);
    }
  }
  /**
   * Remove classes from the given element.
   * @param {Element} element - The target element.
   * @param {string} value - The classes to be removed.
   */

  function removeClass(element, value) {
    if (!value) {
      return;
    }

    if (isNumber(element.length)) {
      forEach(element, function (elem) {
        removeClass(elem, value);
      });
      return;
    }

    if (element.classList) {
      element.classList.remove(value);
      return;
    }

    if (element.className.indexOf(value) >= 0) {
      element.className = element.className.replace(value, '');
    }
  }
  /**
   * Add or remove classes from the given element.
   * @param {Element} element - The target element.
   * @param {string} value - The classes to be toggled.
   * @param {boolean} added - Add only.
   */

  function toggleClass(element, value, added) {
    if (!value) {
      return;
    }

    if (isNumber(element.length)) {
      forEach(element, function (elem) {
        toggleClass(elem, value, added);
      });
      return;
    } // IE10-11 doesn't support the second parameter of `classList.toggle`


    if (added) {
      addClass(element, value);
    } else {
      removeClass(element, value);
    }
  }
  var REGEXP_CAMEL_CASE = /([a-z\d])([A-Z])/g;
  /**
   * Transform the given string from camelCase to kebab-case
   * @param {string} value - The value to transform.
   * @returns {string} The transformed value.
   */

  function toParamCase(value) {
    return value.replace(REGEXP_CAMEL_CASE, '$1-$2').toLowerCase();
  }
  /**
   * Get data from the given element.
   * @param {Element} element - The target element.
   * @param {string} name - The data key to get.
   * @returns {string} The data value.
   */

  function getData(element, name) {
    if (isObject(element[name])) {
      return element[name];
    }

    if (element.dataset) {
      return element.dataset[name];
    }

    return element.getAttribute("data-".concat(toParamCase(name)));
  }
  /**
   * Set data to the given element.
   * @param {Element} element - The target element.
   * @param {string} name - The data key to set.
   * @param {string} data - The data value.
   */

  function setData(element, name, data) {
    if (isObject(data)) {
      element[name] = data;
    } else if (element.dataset) {
      element.dataset[name] = data;
    } else {
      element.setAttribute("data-".concat(toParamCase(name)), data);
    }
  }
  /**
   * Remove data from the given element.
   * @param {Element} element - The target element.
   * @param {string} name - The data key to remove.
   */

  function removeData(element, name) {
    if (isObject(element[name])) {
      try {
        delete element[name];
      } catch (error) {
        element[name] = undefined;
      }
    } else if (element.dataset) {
      // #128 Safari not allows to delete dataset property
      try {
        delete element.dataset[name];
      } catch (error) {
        element.dataset[name] = undefined;
      }
    } else {
      element.removeAttribute("data-".concat(toParamCase(name)));
    }
  }
  var REGEXP_SPACES = /\s\s*/;

  var onceSupported = function () {
    var supported = false;

    if (IS_BROWSER) {
      var once = false;

      var listener = function listener() {};

      var options = Object.defineProperty({}, 'once', {
        get: function get() {
          supported = true;
          return once;
        },

        /**
         * This setter can fix a `TypeError` in strict mode
         * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Getter_only}
         * @param {boolean} value - The value to set
         */
        set: function set(value) {
          once = value;
        }
      });
      WINDOW.addEventListener('test', listener, options);
      WINDOW.removeEventListener('test', listener, options);
    }

    return supported;
  }();
  /**
   * Remove event listener from the target element.
   * @param {Element} element - The event target.
   * @param {string} type - The event type(s).
   * @param {Function} listener - The event listener.
   * @param {Object} options - The event options.
   */


  function removeListener(element, type, listener) {
    var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    var handler = listener;
    type.trim().split(REGEXP_SPACES).forEach(function (event) {
      if (!onceSupported) {
        var listeners = element.listeners;

        if (listeners && listeners[event] && listeners[event][listener]) {
          handler = listeners[event][listener];
          delete listeners[event][listener];

          if (Object.keys(listeners[event]).length === 0) {
            delete listeners[event];
          }

          if (Object.keys(listeners).length === 0) {
            delete element.listeners;
          }
        }
      }

      element.removeEventListener(event, handler, options);
    });
  }
  /**
   * Add event listener to the target element.
   * @param {Element} element - The event target.
   * @param {string} type - The event type(s).
   * @param {Function} listener - The event listener.
   * @param {Object} options - The event options.
   */

  function addListener(element, type, listener) {
    var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    var _handler = listener;
    type.trim().split(REGEXP_SPACES).forEach(function (event) {
      if (options.once && !onceSupported) {
        var _element$listeners = element.listeners,
            listeners = _element$listeners === void 0 ? {} : _element$listeners;

        _handler = function handler() {
          delete listeners[event][listener];
          element.removeEventListener(event, _handler, options);

          for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }

          listener.apply(element, args);
        };

        if (!listeners[event]) {
          listeners[event] = {};
        }

        if (listeners[event][listener]) {
          element.removeEventListener(event, listeners[event][listener], options);
        }

        listeners[event][listener] = _handler;
        element.listeners = listeners;
      }

      element.addEventListener(event, _handler, options);
    });
  }
  /**
   * Dispatch event on the target element.
   * @param {Element} element - The event target.
   * @param {string} type - The event type(s).
   * @param {Object} data - The additional event data.
   * @returns {boolean} Indicate if the event is default prevented or not.
   */

  function dispatchEvent(element, type, data) {
    var event; // Event and CustomEvent on IE9-11 are global objects, not constructors

    if (isFunction(Event) && isFunction(CustomEvent)) {
      event = new CustomEvent(type, {
        detail: data,
        bubbles: true,
        cancelable: true
      });
    } else {
      event = document.createEvent('CustomEvent');
      event.initCustomEvent(type, true, true, data);
    }

    return element.dispatchEvent(event);
  }
  /**
   * Get the offset base on the document.
   * @param {Element} element - The target element.
   * @returns {Object} The offset data.
   */

  function getOffset(element) {
    var box = element.getBoundingClientRect();
    return {
      left: box.left + (window.pageXOffset - document.documentElement.clientLeft),
      top: box.top + (window.pageYOffset - document.documentElement.clientTop)
    };
  }
  var location = WINDOW.location;
  var REGEXP_ORIGINS = /^(\w+:)\/\/([^:/?#]*):?(\d*)/i;
  /**
   * Check if the given URL is a cross origin URL.
   * @param {string} url - The target URL.
   * @returns {boolean} Returns `true` if the given URL is a cross origin URL, else `false`.
   */

  function isCrossOriginURL(url) {
    var parts = url.match(REGEXP_ORIGINS);
    return parts !== null && (parts[1] !== location.protocol || parts[2] !== location.hostname || parts[3] !== location.port);
  }
  /**
   * Add timestamp to the given URL.
   * @param {string} url - The target URL.
   * @returns {string} The result URL.
   */

  function addTimestamp(url) {
    var timestamp = "timestamp=".concat(new Date().getTime());
    return url + (url.indexOf('?') === -1 ? '?' : '&') + timestamp;
  }
  /**
   * Get transforms base on the given object.
   * @param {Object} obj - The target object.
   * @returns {string} A string contains transform values.
   */

  function getTransforms(_ref) {
    var rotate = _ref.rotate,
        scaleX = _ref.scaleX,
        scaleY = _ref.scaleY,
        translateX = _ref.translateX,
        translateY = _ref.translateY;
    var values = [];

    if (isNumber(translateX) && translateX !== 0) {
      values.push("translateX(".concat(translateX, "px)"));
    }

    if (isNumber(translateY) && translateY !== 0) {
      values.push("translateY(".concat(translateY, "px)"));
    } // Rotate should come first before scale to match orientation transform


    if (isNumber(rotate) && rotate !== 0) {
      values.push("rotate(".concat(rotate, "deg)"));
    }

    if (isNumber(scaleX) && scaleX !== 1) {
      values.push("scaleX(".concat(scaleX, ")"));
    }

    if (isNumber(scaleY) && scaleY !== 1) {
      values.push("scaleY(".concat(scaleY, ")"));
    }

    var transform = values.length ? values.join(' ') : 'none';
    return {
      WebkitTransform: transform,
      msTransform: transform,
      transform: transform
    };
  }
  /**
   * Get the max ratio of a group of pointers.
   * @param {string} pointers - The target pointers.
   * @returns {number} The result ratio.
   */

  function getMaxZoomRatio(pointers) {
    var pointers2 = _objectSpread2({}, pointers);

    var ratios = [];
    forEach(pointers, function (pointer, pointerId) {
      delete pointers2[pointerId];
      forEach(pointers2, function (pointer2) {
        var x1 = Math.abs(pointer.startX - pointer2.startX);
        var y1 = Math.abs(pointer.startY - pointer2.startY);
        var x2 = Math.abs(pointer.endX - pointer2.endX);
        var y2 = Math.abs(pointer.endY - pointer2.endY);
        var z1 = Math.sqrt(x1 * x1 + y1 * y1);
        var z2 = Math.sqrt(x2 * x2 + y2 * y2);
        var ratio = (z2 - z1) / z1;
        ratios.push(ratio);
      });
    });
    ratios.sort(function (a, b) {
      return Math.abs(a) < Math.abs(b);
    });
    return ratios[0];
  }
  /**
   * Get a pointer from an event object.
   * @param {Object} event - The target event object.
   * @param {boolean} endOnly - Indicates if only returns the end point coordinate or not.
   * @returns {Object} The result pointer contains start and/or end point coordinates.
   */

  function getPointer(_ref2, endOnly) {
    var pageX = _ref2.pageX,
        pageY = _ref2.pageY;
    var end = {
      endX: pageX,
      endY: pageY
    };
    return endOnly ? end : _objectSpread2({
      startX: pageX,
      startY: pageY
    }, end);
  }
  /**
   * Get the center point coordinate of a group of pointers.
   * @param {Object} pointers - The target pointers.
   * @returns {Object} The center point coordinate.
   */

  function getPointersCenter(pointers) {
    var pageX = 0;
    var pageY = 0;
    var count = 0;
    forEach(pointers, function (_ref3) {
      var startX = _ref3.startX,
          startY = _ref3.startY;
      pageX += startX;
      pageY += startY;
      count += 1;
    });
    pageX /= count;
    pageY /= count;
    return {
      pageX: pageX,
      pageY: pageY
    };
  }
  /**
   * Get the max sizes in a rectangle under the given aspect ratio.
   * @param {Object} data - The original sizes.
   * @param {string} [type='contain'] - The adjust type.
   * @returns {Object} The result sizes.
   */

  function getAdjustedSizes(_ref4) // or 'cover'
  {
    var aspectRatio = _ref4.aspectRatio,
        height = _ref4.height,
        width = _ref4.width;
    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'contain';
    var isValidWidth = isPositiveNumber(width);
    var isValidHeight = isPositiveNumber(height);

    if (isValidWidth && isValidHeight) {
      var adjustedWidth = height * aspectRatio;

      if (type === 'contain' && adjustedWidth > width || type === 'cover' && adjustedWidth < width) {
        height = width / aspectRatio;
      } else {
        width = height * aspectRatio;
      }
    } else if (isValidWidth) {
      height = width / aspectRatio;
    } else if (isValidHeight) {
      width = height * aspectRatio;
    }

    return {
      width: width,
      height: height
    };
  }
  /**
   * Get the new sizes of a rectangle after rotated.
   * @param {Object} data - The original sizes.
   * @returns {Object} The result sizes.
   */

  function getRotatedSizes(_ref5) {
    var width = _ref5.width,
        height = _ref5.height,
        degree = _ref5.degree;
    degree = Math.abs(degree) % 180;

    if (degree === 90) {
      return {
        width: height,
        height: width
      };
    }

    var arc = degree % 90 * Math.PI / 180;
    var sinArc = Math.sin(arc);
    var cosArc = Math.cos(arc);
    var newWidth = width * cosArc + height * sinArc;
    var newHeight = width * sinArc + height * cosArc;
    return degree > 90 ? {
      width: newHeight,
      height: newWidth
    } : {
      width: newWidth,
      height: newHeight
    };
  }
  /**
   * Get a canvas which drew the given image.
   * @param {HTMLImageElement} image - The image for drawing.
   * @param {Object} imageData - The image data.
   * @param {Object} canvasData - The canvas data.
   * @param {Object} options - The options.
   * @returns {HTMLCanvasElement} The result canvas.
   */

  function getSourceCanvas(image, _ref6, _ref7, _ref8) {
    var imageAspectRatio = _ref6.aspectRatio,
        imageNaturalWidth = _ref6.naturalWidth,
        imageNaturalHeight = _ref6.naturalHeight,
        _ref6$rotate = _ref6.rotate,
        rotate = _ref6$rotate === void 0 ? 0 : _ref6$rotate,
        _ref6$scaleX = _ref6.scaleX,
        scaleX = _ref6$scaleX === void 0 ? 1 : _ref6$scaleX,
        _ref6$scaleY = _ref6.scaleY,
        scaleY = _ref6$scaleY === void 0 ? 1 : _ref6$scaleY;
    var aspectRatio = _ref7.aspectRatio,
        naturalWidth = _ref7.naturalWidth,
        naturalHeight = _ref7.naturalHeight;
    var _ref8$fillColor = _ref8.fillColor,
        fillColor = _ref8$fillColor === void 0 ? 'transparent' : _ref8$fillColor,
        _ref8$imageSmoothingE = _ref8.imageSmoothingEnabled,
        imageSmoothingEnabled = _ref8$imageSmoothingE === void 0 ? true : _ref8$imageSmoothingE,
        _ref8$imageSmoothingQ = _ref8.imageSmoothingQuality,
        imageSmoothingQuality = _ref8$imageSmoothingQ === void 0 ? 'low' : _ref8$imageSmoothingQ,
        _ref8$maxWidth = _ref8.maxWidth,
        maxWidth = _ref8$maxWidth === void 0 ? Infinity : _ref8$maxWidth,
        _ref8$maxHeight = _ref8.maxHeight,
        maxHeight = _ref8$maxHeight === void 0 ? Infinity : _ref8$maxHeight,
        _ref8$minWidth = _ref8.minWidth,
        minWidth = _ref8$minWidth === void 0 ? 0 : _ref8$minWidth,
        _ref8$minHeight = _ref8.minHeight,
        minHeight = _ref8$minHeight === void 0 ? 0 : _ref8$minHeight;
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    var maxSizes = getAdjustedSizes({
      aspectRatio: aspectRatio,
      width: maxWidth,
      height: maxHeight
    });
    var minSizes = getAdjustedSizes({
      aspectRatio: aspectRatio,
      width: minWidth,
      height: minHeight
    }, 'cover');
    var width = Math.min(maxSizes.width, Math.max(minSizes.width, naturalWidth));
    var height = Math.min(maxSizes.height, Math.max(minSizes.height, naturalHeight)); // Note: should always use image's natural sizes for drawing as
    // imageData.naturalWidth === canvasData.naturalHeight when rotate % 180 === 90

    var destMaxSizes = getAdjustedSizes({
      aspectRatio: imageAspectRatio,
      width: maxWidth,
      height: maxHeight
    });
    var destMinSizes = getAdjustedSizes({
      aspectRatio: imageAspectRatio,
      width: minWidth,
      height: minHeight
    }, 'cover');
    var destWidth = Math.min(destMaxSizes.width, Math.max(destMinSizes.width, imageNaturalWidth));
    var destHeight = Math.min(destMaxSizes.height, Math.max(destMinSizes.height, imageNaturalHeight));
    var params = [-destWidth / 2, -destHeight / 2, destWidth, destHeight];
    canvas.width = normalizeDecimalNumber(width);
    canvas.height = normalizeDecimalNumber(height);
    context.fillStyle = fillColor;
    context.fillRect(0, 0, width, height);
    context.save();
    context.translate(width / 2, height / 2);
    context.rotate(rotate * Math.PI / 180);
    context.scale(scaleX, scaleY);
    context.imageSmoothingEnabled = imageSmoothingEnabled;
    context.imageSmoothingQuality = imageSmoothingQuality;
    context.drawImage.apply(context, [image].concat(_toConsumableArray(params.map(function (param) {
      return Math.floor(normalizeDecimalNumber(param));
    }))));
    context.restore();
    return canvas;
  }
  var fromCharCode = String.fromCharCode;
  /**
   * Get string from char code in data view.
   * @param {DataView} dataView - The data view for read.
   * @param {number} start - The start index.
   * @param {number} length - The read length.
   * @returns {string} The read result.
   */

  function getStringFromCharCode(dataView, start, length) {
    var str = '';
    length += start;

    for (var i = start; i < length; i += 1) {
      str += fromCharCode(dataView.getUint8(i));
    }

    return str;
  }
  var REGEXP_DATA_URL_HEAD = /^data:.*,/;
  /**
   * Transform Data URL to array buffer.
   * @param {string} dataURL - The Data URL to transform.
   * @returns {ArrayBuffer} The result array buffer.
   */

  function dataURLToArrayBuffer(dataURL) {
    var base64 = dataURL.replace(REGEXP_DATA_URL_HEAD, '');
    var binary = atob(base64);
    var arrayBuffer = new ArrayBuffer(binary.length);
    var uint8 = new Uint8Array(arrayBuffer);
    forEach(uint8, function (value, i) {
      uint8[i] = binary.charCodeAt(i);
    });
    return arrayBuffer;
  }
  /**
   * Transform array buffer to Data URL.
   * @param {ArrayBuffer} arrayBuffer - The array buffer to transform.
   * @param {string} mimeType - The mime type of the Data URL.
   * @returns {string} The result Data URL.
   */

  function arrayBufferToDataURL(arrayBuffer, mimeType) {
    var chunks = []; // Chunk Typed Array for better performance (#435)

    var chunkSize = 8192;
    var uint8 = new Uint8Array(arrayBuffer);

    while (uint8.length > 0) {
      // XXX: Babel's `toConsumableArray` helper will throw error in IE or Safari 9
      // eslint-disable-next-line prefer-spread
      chunks.push(fromCharCode.apply(null, toArray(uint8.subarray(0, chunkSize))));
      uint8 = uint8.subarray(chunkSize);
    }

    return "data:".concat(mimeType, ";base64,").concat(btoa(chunks.join('')));
  }
  /**
   * Get orientation value from given array buffer.
   * @param {ArrayBuffer} arrayBuffer - The array buffer to read.
   * @returns {number} The read orientation value.
   */

  function resetAndGetOrientation(arrayBuffer) {
    var dataView = new DataView(arrayBuffer);
    var orientation; // Ignores range error when the image does not have correct Exif information

    try {
      var littleEndian;
      var app1Start;
      var ifdStart; // Only handle JPEG image (start by 0xFFD8)

      if (dataView.getUint8(0) === 0xFF && dataView.getUint8(1) === 0xD8) {
        var length = dataView.byteLength;
        var offset = 2;

        while (offset + 1 < length) {
          if (dataView.getUint8(offset) === 0xFF && dataView.getUint8(offset + 1) === 0xE1) {
            app1Start = offset;
            break;
          }

          offset += 1;
        }
      }

      if (app1Start) {
        var exifIDCode = app1Start + 4;
        var tiffOffset = app1Start + 10;

        if (getStringFromCharCode(dataView, exifIDCode, 4) === 'Exif') {
          var endianness = dataView.getUint16(tiffOffset);
          littleEndian = endianness === 0x4949;

          if (littleEndian || endianness === 0x4D4D
          /* bigEndian */
          ) {
              if (dataView.getUint16(tiffOffset + 2, littleEndian) === 0x002A) {
                var firstIFDOffset = dataView.getUint32(tiffOffset + 4, littleEndian);

                if (firstIFDOffset >= 0x00000008) {
                  ifdStart = tiffOffset + firstIFDOffset;
                }
              }
            }
        }
      }

      if (ifdStart) {
        var _length = dataView.getUint16(ifdStart, littleEndian);

        var _offset;

        var i;

        for (i = 0; i < _length; i += 1) {
          _offset = ifdStart + i * 12 + 2;

          if (dataView.getUint16(_offset, littleEndian) === 0x0112
          /* Orientation */
          ) {
              // 8 is the offset of the current tag's value
              _offset += 8; // Get the original orientation value

              orientation = dataView.getUint16(_offset, littleEndian); // Override the orientation with its default value

              dataView.setUint16(_offset, 1, littleEndian);
              break;
            }
        }
      }
    } catch (error) {
      orientation = 1;
    }

    return orientation;
  }
  /**
   * Parse Exif Orientation value.
   * @param {number} orientation - The orientation to parse.
   * @returns {Object} The parsed result.
   */

  function parseOrientation(orientation) {
    var rotate = 0;
    var scaleX = 1;
    var scaleY = 1;

    switch (orientation) {
      // Flip horizontal
      case 2:
        scaleX = -1;
        break;
      // Rotate left 180°

      case 3:
        rotate = -180;
        break;
      // Flip vertical

      case 4:
        scaleY = -1;
        break;
      // Flip vertical and rotate right 90°

      case 5:
        rotate = 90;
        scaleY = -1;
        break;
      // Rotate right 90°

      case 6:
        rotate = 90;
        break;
      // Flip horizontal and rotate right 90°

      case 7:
        rotate = 90;
        scaleX = -1;
        break;
      // Rotate left 90°

      case 8:
        rotate = -90;
        break;

      default:
    }

    return {
      rotate: rotate,
      scaleX: scaleX,
      scaleY: scaleY
    };
  }

  var render = {
    render: function render() {
      this.initContainer();
      this.initCanvas();
      this.initCropBox();
      this.renderCanvas();

      if (this.cropped) {
        this.renderCropBox();
      }
    },
    initContainer: function initContainer() {
      var element = this.element,
          options = this.options,
          container = this.container,
          cropper = this.cropper;
      addClass(cropper, CLASS_HIDDEN);
      removeClass(element, CLASS_HIDDEN);
      var containerData = {
        width: Math.max(container.offsetWidth, Number(options.minContainerWidth) || 200),
        height: Math.max(container.offsetHeight, Number(options.minContainerHeight) || 100)
      };
      this.containerData = containerData;
      setStyle(cropper, {
        width: containerData.width,
        height: containerData.height
      });
      addClass(element, CLASS_HIDDEN);
      removeClass(cropper, CLASS_HIDDEN);
    },
    // Canvas (image wrapper)
    initCanvas: function initCanvas() {
      var containerData = this.containerData,
          imageData = this.imageData;
      var viewMode = this.options.viewMode;
      var rotated = Math.abs(imageData.rotate) % 180 === 90;
      var naturalWidth = rotated ? imageData.naturalHeight : imageData.naturalWidth;
      var naturalHeight = rotated ? imageData.naturalWidth : imageData.naturalHeight;
      var aspectRatio = naturalWidth / naturalHeight;
      var canvasWidth = containerData.width;
      var canvasHeight = containerData.height;

      if (containerData.height * aspectRatio > containerData.width) {
        if (viewMode === 3) {
          canvasWidth = containerData.height * aspectRatio;
        } else {
          canvasHeight = containerData.width / aspectRatio;
        }
      } else if (viewMode === 3) {
        canvasHeight = containerData.width / aspectRatio;
      } else {
        canvasWidth = containerData.height * aspectRatio;
      }

      var canvasData = {
        aspectRatio: aspectRatio,
        naturalWidth: naturalWidth,
        naturalHeight: naturalHeight,
        width: canvasWidth,
        height: canvasHeight
      };
      canvasData.left = (containerData.width - canvasWidth) / 2;
      canvasData.top = (containerData.height - canvasHeight) / 2;
      canvasData.oldLeft = canvasData.left;
      canvasData.oldTop = canvasData.top;
      this.canvasData = canvasData;
      this.limited = viewMode === 1 || viewMode === 2;
      this.limitCanvas(true, true);
      this.initialImageData = assign({}, imageData);
      this.initialCanvasData = assign({}, canvasData);
    },
    limitCanvas: function limitCanvas(sizeLimited, positionLimited) {
      var options = this.options,
          containerData = this.containerData,
          canvasData = this.canvasData,
          cropBoxData = this.cropBoxData;
      var viewMode = options.viewMode;
      var aspectRatio = canvasData.aspectRatio;
      var cropped = this.cropped && cropBoxData;

      if (sizeLimited) {
        var minCanvasWidth = Number(options.minCanvasWidth) || 0;
        var minCanvasHeight = Number(options.minCanvasHeight) || 0;

        if (viewMode > 1) {
          minCanvasWidth = Math.max(minCanvasWidth, containerData.width);
          minCanvasHeight = Math.max(minCanvasHeight, containerData.height);

          if (viewMode === 3) {
            if (minCanvasHeight * aspectRatio > minCanvasWidth) {
              minCanvasWidth = minCanvasHeight * aspectRatio;
            } else {
              minCanvasHeight = minCanvasWidth / aspectRatio;
            }
          }
        } else if (viewMode > 0) {
          if (minCanvasWidth) {
            minCanvasWidth = Math.max(minCanvasWidth, cropped ? cropBoxData.width : 0);
          } else if (minCanvasHeight) {
            minCanvasHeight = Math.max(minCanvasHeight, cropped ? cropBoxData.height : 0);
          } else if (cropped) {
            minCanvasWidth = cropBoxData.width;
            minCanvasHeight = cropBoxData.height;

            if (minCanvasHeight * aspectRatio > minCanvasWidth) {
              minCanvasWidth = minCanvasHeight * aspectRatio;
            } else {
              minCanvasHeight = minCanvasWidth / aspectRatio;
            }
          }
        }

        var _getAdjustedSizes = getAdjustedSizes({
          aspectRatio: aspectRatio,
          width: minCanvasWidth,
          height: minCanvasHeight
        });

        minCanvasWidth = _getAdjustedSizes.width;
        minCanvasHeight = _getAdjustedSizes.height;
        canvasData.minWidth = minCanvasWidth;
        canvasData.minHeight = minCanvasHeight;
        canvasData.maxWidth = Infinity;
        canvasData.maxHeight = Infinity;
      }

      if (positionLimited) {
        if (viewMode > (cropped ? 0 : 1)) {
          var newCanvasLeft = containerData.width - canvasData.width;
          var newCanvasTop = containerData.height - canvasData.height;
          canvasData.minLeft = Math.min(0, newCanvasLeft);
          canvasData.minTop = Math.min(0, newCanvasTop);
          canvasData.maxLeft = Math.max(0, newCanvasLeft);
          canvasData.maxTop = Math.max(0, newCanvasTop);

          if (cropped && this.limited) {
            canvasData.minLeft = Math.min(cropBoxData.left, cropBoxData.left + (cropBoxData.width - canvasData.width));
            canvasData.minTop = Math.min(cropBoxData.top, cropBoxData.top + (cropBoxData.height - canvasData.height));
            canvasData.maxLeft = cropBoxData.left;
            canvasData.maxTop = cropBoxData.top;

            if (viewMode === 2) {
              if (canvasData.width >= containerData.width) {
                canvasData.minLeft = Math.min(0, newCanvasLeft);
                canvasData.maxLeft = Math.max(0, newCanvasLeft);
              }

              if (canvasData.height >= containerData.height) {
                canvasData.minTop = Math.min(0, newCanvasTop);
                canvasData.maxTop = Math.max(0, newCanvasTop);
              }
            }
          }
        } else {
          canvasData.minLeft = -canvasData.width;
          canvasData.minTop = -canvasData.height;
          canvasData.maxLeft = containerData.width;
          canvasData.maxTop = containerData.height;
        }
      }
    },
    renderCanvas: function renderCanvas(changed, transformed) {
      var canvasData = this.canvasData,
          imageData = this.imageData;

      if (transformed) {
        var _getRotatedSizes = getRotatedSizes({
          width: imageData.naturalWidth * Math.abs(imageData.scaleX || 1),
          height: imageData.naturalHeight * Math.abs(imageData.scaleY || 1),
          degree: imageData.rotate || 0
        }),
            naturalWidth = _getRotatedSizes.width,
            naturalHeight = _getRotatedSizes.height;

        var width = canvasData.width * (naturalWidth / canvasData.naturalWidth);
        var height = canvasData.height * (naturalHeight / canvasData.naturalHeight);
        canvasData.left -= (width - canvasData.width) / 2;
        canvasData.top -= (height - canvasData.height) / 2;
        canvasData.width = width;
        canvasData.height = height;
        canvasData.aspectRatio = naturalWidth / naturalHeight;
        canvasData.naturalWidth = naturalWidth;
        canvasData.naturalHeight = naturalHeight;
        this.limitCanvas(true, false);
      }

      if (canvasData.width > canvasData.maxWidth || canvasData.width < canvasData.minWidth) {
        canvasData.left = canvasData.oldLeft;
      }

      if (canvasData.height > canvasData.maxHeight || canvasData.height < canvasData.minHeight) {
        canvasData.top = canvasData.oldTop;
      }

      canvasData.width = Math.min(Math.max(canvasData.width, canvasData.minWidth), canvasData.maxWidth);
      canvasData.height = Math.min(Math.max(canvasData.height, canvasData.minHeight), canvasData.maxHeight);
      this.limitCanvas(false, true);
      canvasData.left = Math.min(Math.max(canvasData.left, canvasData.minLeft), canvasData.maxLeft);
      canvasData.top = Math.min(Math.max(canvasData.top, canvasData.minTop), canvasData.maxTop);
      canvasData.oldLeft = canvasData.left;
      canvasData.oldTop = canvasData.top;
      setStyle(this.canvas, assign({
        width: canvasData.width,
        height: canvasData.height
      }, getTransforms({
        translateX: canvasData.left,
        translateY: canvasData.top
      })));
      this.renderImage(changed);

      if (this.cropped && this.limited) {
        this.limitCropBox(true, true);
      }
    },
    renderImage: function renderImage(changed) {
      var canvasData = this.canvasData,
          imageData = this.imageData;
      var width = imageData.naturalWidth * (canvasData.width / canvasData.naturalWidth);
      var height = imageData.naturalHeight * (canvasData.height / canvasData.naturalHeight);
      assign(imageData, {
        width: width,
        height: height,
        left: (canvasData.width - width) / 2,
        top: (canvasData.height - height) / 2
      });
      setStyle(this.image, assign({
        width: imageData.width,
        height: imageData.height
      }, getTransforms(assign({
        translateX: imageData.left,
        translateY: imageData.top
      }, imageData))));

      if (changed) {
        this.output();
      }
    },
    initCropBox: function initCropBox() {
      var options = this.options,
          canvasData = this.canvasData;
      var aspectRatio = options.aspectRatio || options.initialAspectRatio;
      var autoCropArea = Number(options.autoCropArea) || 0.8;
      var cropBoxData = {
        width: canvasData.width,
        height: canvasData.height
      };

      if (aspectRatio) {
        if (canvasData.height * aspectRatio > canvasData.width) {
          cropBoxData.height = cropBoxData.width / aspectRatio;
        } else {
          cropBoxData.width = cropBoxData.height * aspectRatio;
        }
      }

      this.cropBoxData = cropBoxData;
      this.limitCropBox(true, true); // Initialize auto crop area

      cropBoxData.width = Math.min(Math.max(cropBoxData.width, cropBoxData.minWidth), cropBoxData.maxWidth);
      cropBoxData.height = Math.min(Math.max(cropBoxData.height, cropBoxData.minHeight), cropBoxData.maxHeight); // The width/height of auto crop area must large than "minWidth/Height"

      cropBoxData.width = Math.max(cropBoxData.minWidth, cropBoxData.width * autoCropArea);
      cropBoxData.height = Math.max(cropBoxData.minHeight, cropBoxData.height * autoCropArea);
      cropBoxData.left = canvasData.left + (canvasData.width - cropBoxData.width) / 2;
      cropBoxData.top = canvasData.top + (canvasData.height - cropBoxData.height) / 2;
      cropBoxData.oldLeft = cropBoxData.left;
      cropBoxData.oldTop = cropBoxData.top;
      this.initialCropBoxData = assign({}, cropBoxData);
    },
    limitCropBox: function limitCropBox(sizeLimited, positionLimited) {
      var options = this.options,
          containerData = this.containerData,
          canvasData = this.canvasData,
          cropBoxData = this.cropBoxData,
          limited = this.limited;
      var aspectRatio = options.aspectRatio;

      if (sizeLimited) {
        var minCropBoxWidth = Number(options.minCropBoxWidth) || 0;
        var minCropBoxHeight = Number(options.minCropBoxHeight) || 0;
        var maxCropBoxWidth = limited ? Math.min(containerData.width, canvasData.width, canvasData.width + canvasData.left, containerData.width - canvasData.left) : containerData.width;
        var maxCropBoxHeight = limited ? Math.min(containerData.height, canvasData.height, canvasData.height + canvasData.top, containerData.height - canvasData.top) : containerData.height; // The min/maxCropBoxWidth/Height must be less than container's width/height

        minCropBoxWidth = Math.min(minCropBoxWidth, containerData.width);
        minCropBoxHeight = Math.min(minCropBoxHeight, containerData.height);

        if (aspectRatio) {
          if (minCropBoxWidth && minCropBoxHeight) {
            if (minCropBoxHeight * aspectRatio > minCropBoxWidth) {
              minCropBoxHeight = minCropBoxWidth / aspectRatio;
            } else {
              minCropBoxWidth = minCropBoxHeight * aspectRatio;
            }
          } else if (minCropBoxWidth) {
            minCropBoxHeight = minCropBoxWidth / aspectRatio;
          } else if (minCropBoxHeight) {
            minCropBoxWidth = minCropBoxHeight * aspectRatio;
          }

          if (maxCropBoxHeight * aspectRatio > maxCropBoxWidth) {
            maxCropBoxHeight = maxCropBoxWidth / aspectRatio;
          } else {
            maxCropBoxWidth = maxCropBoxHeight * aspectRatio;
          }
        } // The minWidth/Height must be less than maxWidth/Height


        cropBoxData.minWidth = Math.min(minCropBoxWidth, maxCropBoxWidth);
        cropBoxData.minHeight = Math.min(minCropBoxHeight, maxCropBoxHeight);
        cropBoxData.maxWidth = maxCropBoxWidth;
        cropBoxData.maxHeight = maxCropBoxHeight;
      }

      if (positionLimited) {
        if (limited) {
          cropBoxData.minLeft = Math.max(0, canvasData.left);
          cropBoxData.minTop = Math.max(0, canvasData.top);
          cropBoxData.maxLeft = Math.min(containerData.width, canvasData.left + canvasData.width) - cropBoxData.width;
          cropBoxData.maxTop = Math.min(containerData.height, canvasData.top + canvasData.height) - cropBoxData.height;
        } else {
          cropBoxData.minLeft = 0;
          cropBoxData.minTop = 0;
          cropBoxData.maxLeft = containerData.width - cropBoxData.width;
          cropBoxData.maxTop = containerData.height - cropBoxData.height;
        }
      }
    },
    renderCropBox: function renderCropBox() {
      var options = this.options,
          containerData = this.containerData,
          cropBoxData = this.cropBoxData;

      if (cropBoxData.width > cropBoxData.maxWidth || cropBoxData.width < cropBoxData.minWidth) {
        cropBoxData.left = cropBoxData.oldLeft;
      }

      if (cropBoxData.height > cropBoxData.maxHeight || cropBoxData.height < cropBoxData.minHeight) {
        cropBoxData.top = cropBoxData.oldTop;
      }

      cropBoxData.width = Math.min(Math.max(cropBoxData.width, cropBoxData.minWidth), cropBoxData.maxWidth);
      cropBoxData.height = Math.min(Math.max(cropBoxData.height, cropBoxData.minHeight), cropBoxData.maxHeight);
      this.limitCropBox(false, true);
      cropBoxData.left = Math.min(Math.max(cropBoxData.left, cropBoxData.minLeft), cropBoxData.maxLeft);
      cropBoxData.top = Math.min(Math.max(cropBoxData.top, cropBoxData.minTop), cropBoxData.maxTop);
      cropBoxData.oldLeft = cropBoxData.left;
      cropBoxData.oldTop = cropBoxData.top;

      if (options.movable && options.cropBoxMovable) {
        // Turn to move the canvas when the crop box is equal to the container
        setData(this.face, DATA_ACTION, cropBoxData.width >= containerData.width && cropBoxData.height >= containerData.height ? ACTION_MOVE : ACTION_ALL);
      }

      setStyle(this.cropBox, assign({
        width: cropBoxData.width,
        height: cropBoxData.height
      }, getTransforms({
        translateX: cropBoxData.left,
        translateY: cropBoxData.top
      })));

      if (this.cropped && this.limited) {
        this.limitCanvas(true, true);
      }

      if (!this.disabled) {
        this.output();
      }
    },
    output: function output() {
      this.preview();
      dispatchEvent(this.element, EVENT_CROP, this.getData());
    }
  };

  var preview = {
    initPreview: function initPreview() {
      var element = this.element,
          crossOrigin = this.crossOrigin;
      var preview = this.options.preview;
      var url = crossOrigin ? this.crossOriginUrl : this.url;
      var alt = element.alt || 'The image to preview';
      var image = document.createElement('img');

      if (crossOrigin) {
        image.crossOrigin = crossOrigin;
      }

      image.src = url;
      image.alt = alt;
      this.viewBox.appendChild(image);
      this.viewBoxImage = image;

      if (!preview) {
        return;
      }

      var previews = preview;

      if (typeof preview === 'string') {
        previews = element.ownerDocument.querySelectorAll(preview);
      } else if (preview.querySelector) {
        previews = [preview];
      }

      this.previews = previews;
      forEach(previews, function (el) {
        var img = document.createElement('img'); // Save the original size for recover

        setData(el, DATA_PREVIEW, {
          width: el.offsetWidth,
          height: el.offsetHeight,
          html: el.innerHTML
        });

        if (crossOrigin) {
          img.crossOrigin = crossOrigin;
        }

        img.src = url;
        img.alt = alt;
        /**
         * Override img element styles
         * Add `display:block` to avoid margin top issue
         * Add `height:auto` to override `height` attribute on IE8
         * (Occur only when margin-top <= -height)
         */

        img.style.cssText = 'display:block;' + 'width:100%;' + 'height:auto;' + 'min-width:0!important;' + 'min-height:0!important;' + 'max-width:none!important;' + 'max-height:none!important;' + 'image-orientation:0deg!important;"';
        el.innerHTML = '';
        el.appendChild(img);
      });
    },
    resetPreview: function resetPreview() {
      forEach(this.previews, function (element) {
        var data = getData(element, DATA_PREVIEW);
        setStyle(element, {
          width: data.width,
          height: data.height
        });
        element.innerHTML = data.html;
        removeData(element, DATA_PREVIEW);
      });
    },
    preview: function preview() {
      var imageData = this.imageData,
          canvasData = this.canvasData,
          cropBoxData = this.cropBoxData;
      var cropBoxWidth = cropBoxData.width,
          cropBoxHeight = cropBoxData.height;
      var width = imageData.width,
          height = imageData.height;
      var left = cropBoxData.left - canvasData.left - imageData.left;
      var top = cropBoxData.top - canvasData.top - imageData.top;

      if (!this.cropped || this.disabled) {
        return;
      }

      setStyle(this.viewBoxImage, assign({
        width: width,
        height: height
      }, getTransforms(assign({
        translateX: -left,
        translateY: -top
      }, imageData))));
      forEach(this.previews, function (element) {
        var data = getData(element, DATA_PREVIEW);
        var originalWidth = data.width;
        var originalHeight = data.height;
        var newWidth = originalWidth;
        var newHeight = originalHeight;
        var ratio = 1;

        if (cropBoxWidth) {
          ratio = originalWidth / cropBoxWidth;
          newHeight = cropBoxHeight * ratio;
        }

        if (cropBoxHeight && newHeight > originalHeight) {
          ratio = originalHeight / cropBoxHeight;
          newWidth = cropBoxWidth * ratio;
          newHeight = originalHeight;
        }

        setStyle(element, {
          width: newWidth,
          height: newHeight
        });
        setStyle(element.getElementsByTagName('img')[0], assign({
          width: width * ratio,
          height: height * ratio
        }, getTransforms(assign({
          translateX: -left * ratio,
          translateY: -top * ratio
        }, imageData))));
      });
    }
  };

  var events = {
    bind: function bind() {
      var element = this.element,
          options = this.options,
          cropper = this.cropper;

      if (isFunction(options.cropstart)) {
        addListener(element, EVENT_CROP_START, options.cropstart);
      }

      if (isFunction(options.cropmove)) {
        addListener(element, EVENT_CROP_MOVE, options.cropmove);
      }

      if (isFunction(options.cropend)) {
        addListener(element, EVENT_CROP_END, options.cropend);
      }

      if (isFunction(options.crop)) {
        addListener(element, EVENT_CROP, options.crop);
      }

      if (isFunction(options.zoom)) {
        addListener(element, EVENT_ZOOM, options.zoom);
      }

      addListener(cropper, EVENT_POINTER_DOWN, this.onCropStart = this.cropStart.bind(this));

      if (options.zoomable && options.zoomOnWheel) {
        addListener(cropper, EVENT_WHEEL, this.onWheel = this.wheel.bind(this), {
          passive: false,
          capture: true
        });
      }

      if (options.toggleDragModeOnDblclick) {
        addListener(cropper, EVENT_DBLCLICK, this.onDblclick = this.dblclick.bind(this));
      }

      addListener(element.ownerDocument, EVENT_POINTER_MOVE, this.onCropMove = this.cropMove.bind(this));
      addListener(element.ownerDocument, EVENT_POINTER_UP, this.onCropEnd = this.cropEnd.bind(this));

      if (options.responsive) {
        addListener(window, EVENT_RESIZE, this.onResize = this.resize.bind(this));
      }
    },
    unbind: function unbind() {
      var element = this.element,
          options = this.options,
          cropper = this.cropper;

      if (isFunction(options.cropstart)) {
        removeListener(element, EVENT_CROP_START, options.cropstart);
      }

      if (isFunction(options.cropmove)) {
        removeListener(element, EVENT_CROP_MOVE, options.cropmove);
      }

      if (isFunction(options.cropend)) {
        removeListener(element, EVENT_CROP_END, options.cropend);
      }

      if (isFunction(options.crop)) {
        removeListener(element, EVENT_CROP, options.crop);
      }

      if (isFunction(options.zoom)) {
        removeListener(element, EVENT_ZOOM, options.zoom);
      }

      removeListener(cropper, EVENT_POINTER_DOWN, this.onCropStart);

      if (options.zoomable && options.zoomOnWheel) {
        removeListener(cropper, EVENT_WHEEL, this.onWheel, {
          passive: false,
          capture: true
        });
      }

      if (options.toggleDragModeOnDblclick) {
        removeListener(cropper, EVENT_DBLCLICK, this.onDblclick);
      }

      removeListener(element.ownerDocument, EVENT_POINTER_MOVE, this.onCropMove);
      removeListener(element.ownerDocument, EVENT_POINTER_UP, this.onCropEnd);

      if (options.responsive) {
        removeListener(window, EVENT_RESIZE, this.onResize);
      }
    }
  };

  var handlers = {
    resize: function resize() {
      var options = this.options,
          container = this.container,
          containerData = this.containerData;
      var minContainerWidth = Number(options.minContainerWidth) || MIN_CONTAINER_WIDTH;
      var minContainerHeight = Number(options.minContainerHeight) || MIN_CONTAINER_HEIGHT;

      if (this.disabled || containerData.width <= minContainerWidth || containerData.height <= minContainerHeight) {
        return;
      }

      var ratio = container.offsetWidth / containerData.width; // Resize when width changed or height changed

      if (ratio !== 1 || container.offsetHeight !== containerData.height) {
        var canvasData;
        var cropBoxData;

        if (options.restore) {
          canvasData = this.getCanvasData();
          cropBoxData = this.getCropBoxData();
        }

        this.render();

        if (options.restore) {
          this.setCanvasData(forEach(canvasData, function (n, i) {
            canvasData[i] = n * ratio;
          }));
          this.setCropBoxData(forEach(cropBoxData, function (n, i) {
            cropBoxData[i] = n * ratio;
          }));
        }
      }
    },
    dblclick: function dblclick() {
      if (this.disabled || this.options.dragMode === DRAG_MODE_NONE) {
        return;
      }

      this.setDragMode(hasClass(this.dragBox, CLASS_CROP) ? DRAG_MODE_MOVE : DRAG_MODE_CROP);
    },
    wheel: function wheel(event) {
      var _this = this;

      var ratio = Number(this.options.wheelZoomRatio) || 0.1;
      var delta = 1;

      if (this.disabled) {
        return;
      }

      event.preventDefault(); // Limit wheel speed to prevent zoom too fast (#21)

      if (this.wheeling) {
        return;
      }

      this.wheeling = true;
      setTimeout(function () {
        _this.wheeling = false;
      }, 50);

      if (event.deltaY) {
        delta = event.deltaY > 0 ? 1 : -1;
      } else if (event.wheelDelta) {
        delta = -event.wheelDelta / 120;
      } else if (event.detail) {
        delta = event.detail > 0 ? 1 : -1;
      }

      this.zoom(-delta * ratio, event);
    },
    cropStart: function cropStart(event) {
      var buttons = event.buttons,
          button = event.button;

      if (this.disabled // Handle mouse event and pointer event and ignore touch event
      || (event.type === 'mousedown' || event.type === 'pointerdown' && event.pointerType === 'mouse') && ( // No primary button (Usually the left button)
      isNumber(buttons) && buttons !== 1 || isNumber(button) && button !== 0 // Open context menu
      || event.ctrlKey)) {
        return;
      }

      var options = this.options,
          pointers = this.pointers;
      var action;

      if (event.changedTouches) {
        // Handle touch event
        forEach(event.changedTouches, function (touch) {
          pointers[touch.identifier] = getPointer(touch);
        });
      } else {
        // Handle mouse event and pointer event
        pointers[event.pointerId || 0] = getPointer(event);
      }

      if (Object.keys(pointers).length > 1 && options.zoomable && options.zoomOnTouch) {
        action = ACTION_ZOOM;
      } else {
        action = getData(event.target, DATA_ACTION);
      }

      if (!REGEXP_ACTIONS.test(action)) {
        return;
      }

      if (dispatchEvent(this.element, EVENT_CROP_START, {
        originalEvent: event,
        action: action
      }) === false) {
        return;
      } // This line is required for preventing page zooming in iOS browsers


      event.preventDefault();
      this.action = action;
      this.cropping = false;

      if (action === ACTION_CROP) {
        this.cropping = true;
        addClass(this.dragBox, CLASS_MODAL);
      }
    },
    cropMove: function cropMove(event) {
      var action = this.action;

      if (this.disabled || !action) {
        return;
      }

      var pointers = this.pointers;
      event.preventDefault();

      if (dispatchEvent(this.element, EVENT_CROP_MOVE, {
        originalEvent: event,
        action: action
      }) === false) {
        return;
      }

      if (event.changedTouches) {
        forEach(event.changedTouches, function (touch) {
          // The first parameter should not be undefined (#432)
          assign(pointers[touch.identifier] || {}, getPointer(touch, true));
        });
      } else {
        assign(pointers[event.pointerId || 0] || {}, getPointer(event, true));
      }

      this.change(event);
    },
    cropEnd: function cropEnd(event) {
      if (this.disabled) {
        return;
      }

      var action = this.action,
          pointers = this.pointers;

      if (event.changedTouches) {
        forEach(event.changedTouches, function (touch) {
          delete pointers[touch.identifier];
        });
      } else {
        delete pointers[event.pointerId || 0];
      }

      if (!action) {
        return;
      }

      event.preventDefault();

      if (!Object.keys(pointers).length) {
        this.action = '';
      }

      if (this.cropping) {
        this.cropping = false;
        toggleClass(this.dragBox, CLASS_MODAL, this.cropped && this.options.modal);
      }

      dispatchEvent(this.element, EVENT_CROP_END, {
        originalEvent: event,
        action: action
      });
    }
  };

  var change = {
    change: function change(event) {
      var options = this.options,
          canvasData = this.canvasData,
          containerData = this.containerData,
          cropBoxData = this.cropBoxData,
          pointers = this.pointers;
      var action = this.action;
      var aspectRatio = options.aspectRatio;
      var left = cropBoxData.left,
          top = cropBoxData.top,
          width = cropBoxData.width,
          height = cropBoxData.height;
      var right = left + width;
      var bottom = top + height;
      var minLeft = 0;
      var minTop = 0;
      var maxWidth = containerData.width;
      var maxHeight = containerData.height;
      var renderable = true;
      var offset; // Locking aspect ratio in "free mode" by holding shift key

      if (!aspectRatio && event.shiftKey) {
        aspectRatio = width && height ? width / height : 1;
      }

      if (this.limited) {
        minLeft = cropBoxData.minLeft;
        minTop = cropBoxData.minTop;
        maxWidth = minLeft + Math.min(containerData.width, canvasData.width, canvasData.left + canvasData.width);
        maxHeight = minTop + Math.min(containerData.height, canvasData.height, canvasData.top + canvasData.height);
      }

      var pointer = pointers[Object.keys(pointers)[0]];
      var range = {
        x: pointer.endX - pointer.startX,
        y: pointer.endY - pointer.startY
      };

      var check = function check(side) {
        switch (side) {
          case ACTION_EAST:
            if (right + range.x > maxWidth) {
              range.x = maxWidth - right;
            }

            break;

          case ACTION_WEST:
            if (left + range.x < minLeft) {
              range.x = minLeft - left;
            }

            break;

          case ACTION_NORTH:
            if (top + range.y < minTop) {
              range.y = minTop - top;
            }

            break;

          case ACTION_SOUTH:
            if (bottom + range.y > maxHeight) {
              range.y = maxHeight - bottom;
            }

            break;

          default:
        }
      };

      switch (action) {
        // Move crop box
        case ACTION_ALL:
          left += range.x;
          top += range.y;
          break;
        // Resize crop box

        case ACTION_EAST:
          if (range.x >= 0 && (right >= maxWidth || aspectRatio && (top <= minTop || bottom >= maxHeight))) {
            renderable = false;
            break;
          }

          check(ACTION_EAST);
          width += range.x;

          if (width < 0) {
            action = ACTION_WEST;
            width = -width;
            left -= width;
          }

          if (aspectRatio) {
            height = width / aspectRatio;
            top += (cropBoxData.height - height) / 2;
          }

          break;

        case ACTION_NORTH:
          if (range.y <= 0 && (top <= minTop || aspectRatio && (left <= minLeft || right >= maxWidth))) {
            renderable = false;
            break;
          }

          check(ACTION_NORTH);
          height -= range.y;
          top += range.y;

          if (height < 0) {
            action = ACTION_SOUTH;
            height = -height;
            top -= height;
          }

          if (aspectRatio) {
            width = height * aspectRatio;
            left += (cropBoxData.width - width) / 2;
          }

          break;

        case ACTION_WEST:
          if (range.x <= 0 && (left <= minLeft || aspectRatio && (top <= minTop || bottom >= maxHeight))) {
            renderable = false;
            break;
          }

          check(ACTION_WEST);
          width -= range.x;
          left += range.x;

          if (width < 0) {
            action = ACTION_EAST;
            width = -width;
            left -= width;
          }

          if (aspectRatio) {
            height = width / aspectRatio;
            top += (cropBoxData.height - height) / 2;
          }

          break;

        case ACTION_SOUTH:
          if (range.y >= 0 && (bottom >= maxHeight || aspectRatio && (left <= minLeft || right >= maxWidth))) {
            renderable = false;
            break;
          }

          check(ACTION_SOUTH);
          height += range.y;

          if (height < 0) {
            action = ACTION_NORTH;
            height = -height;
            top -= height;
          }

          if (aspectRatio) {
            width = height * aspectRatio;
            left += (cropBoxData.width - width) / 2;
          }

          break;

        case ACTION_NORTH_EAST:
          if (aspectRatio) {
            if (range.y <= 0 && (top <= minTop || right >= maxWidth)) {
              renderable = false;
              break;
            }

            check(ACTION_NORTH);
            height -= range.y;
            top += range.y;
            width = height * aspectRatio;
          } else {
            check(ACTION_NORTH);
            check(ACTION_EAST);

            if (range.x >= 0) {
              if (right < maxWidth) {
                width += range.x;
              } else if (range.y <= 0 && top <= minTop) {
                renderable = false;
              }
            } else {
              width += range.x;
            }

            if (range.y <= 0) {
              if (top > minTop) {
                height -= range.y;
                top += range.y;
              }
            } else {
              height -= range.y;
              top += range.y;
            }
          }

          if (width < 0 && height < 0) {
            action = ACTION_SOUTH_WEST;
            height = -height;
            width = -width;
            top -= height;
            left -= width;
          } else if (width < 0) {
            action = ACTION_NORTH_WEST;
            width = -width;
            left -= width;
          } else if (height < 0) {
            action = ACTION_SOUTH_EAST;
            height = -height;
            top -= height;
          }

          break;

        case ACTION_NORTH_WEST:
          if (aspectRatio) {
            if (range.y <= 0 && (top <= minTop || left <= minLeft)) {
              renderable = false;
              break;
            }

            check(ACTION_NORTH);
            height -= range.y;
            top += range.y;
            width = height * aspectRatio;
            left += cropBoxData.width - width;
          } else {
            check(ACTION_NORTH);
            check(ACTION_WEST);

            if (range.x <= 0) {
              if (left > minLeft) {
                width -= range.x;
                left += range.x;
              } else if (range.y <= 0 && top <= minTop) {
                renderable = false;
              }
            } else {
              width -= range.x;
              left += range.x;
            }

            if (range.y <= 0) {
              if (top > minTop) {
                height -= range.y;
                top += range.y;
              }
            } else {
              height -= range.y;
              top += range.y;
            }
          }

          if (width < 0 && height < 0) {
            action = ACTION_SOUTH_EAST;
            height = -height;
            width = -width;
            top -= height;
            left -= width;
          } else if (width < 0) {
            action = ACTION_NORTH_EAST;
            width = -width;
            left -= width;
          } else if (height < 0) {
            action = ACTION_SOUTH_WEST;
            height = -height;
            top -= height;
          }

          break;

        case ACTION_SOUTH_WEST:
          if (aspectRatio) {
            if (range.x <= 0 && (left <= minLeft || bottom >= maxHeight)) {
              renderable = false;
              break;
            }

            check(ACTION_WEST);
            width -= range.x;
            left += range.x;
            height = width / aspectRatio;
          } else {
            check(ACTION_SOUTH);
            check(ACTION_WEST);

            if (range.x <= 0) {
              if (left > minLeft) {
                width -= range.x;
                left += range.x;
              } else if (range.y >= 0 && bottom >= maxHeight) {
                renderable = false;
              }
            } else {
              width -= range.x;
              left += range.x;
            }

            if (range.y >= 0) {
              if (bottom < maxHeight) {
                height += range.y;
              }
            } else {
              height += range.y;
            }
          }

          if (width < 0 && height < 0) {
            action = ACTION_NORTH_EAST;
            height = -height;
            width = -width;
            top -= height;
            left -= width;
          } else if (width < 0) {
            action = ACTION_SOUTH_EAST;
            width = -width;
            left -= width;
          } else if (height < 0) {
            action = ACTION_NORTH_WEST;
            height = -height;
            top -= height;
          }

          break;

        case ACTION_SOUTH_EAST:
          if (aspectRatio) {
            if (range.x >= 0 && (right >= maxWidth || bottom >= maxHeight)) {
              renderable = false;
              break;
            }

            check(ACTION_EAST);
            width += range.x;
            height = width / aspectRatio;
          } else {
            check(ACTION_SOUTH);
            check(ACTION_EAST);

            if (range.x >= 0) {
              if (right < maxWidth) {
                width += range.x;
              } else if (range.y >= 0 && bottom >= maxHeight) {
                renderable = false;
              }
            } else {
              width += range.x;
            }

            if (range.y >= 0) {
              if (bottom < maxHeight) {
                height += range.y;
              }
            } else {
              height += range.y;
            }
          }

          if (width < 0 && height < 0) {
            action = ACTION_NORTH_WEST;
            height = -height;
            width = -width;
            top -= height;
            left -= width;
          } else if (width < 0) {
            action = ACTION_SOUTH_WEST;
            width = -width;
            left -= width;
          } else if (height < 0) {
            action = ACTION_NORTH_EAST;
            height = -height;
            top -= height;
          }

          break;
        // Move canvas

        case ACTION_MOVE:
          this.move(range.x, range.y);
          renderable = false;
          break;
        // Zoom canvas

        case ACTION_ZOOM:
          this.zoom(getMaxZoomRatio(pointers), event);
          renderable = false;
          break;
        // Create crop box

        case ACTION_CROP:
          if (!range.x || !range.y) {
            renderable = false;
            break;
          }

          offset = getOffset(this.cropper);
          left = pointer.startX - offset.left;
          top = pointer.startY - offset.top;
          width = cropBoxData.minWidth;
          height = cropBoxData.minHeight;

          if (range.x > 0) {
            action = range.y > 0 ? ACTION_SOUTH_EAST : ACTION_NORTH_EAST;
          } else if (range.x < 0) {
            left -= width;
            action = range.y > 0 ? ACTION_SOUTH_WEST : ACTION_NORTH_WEST;
          }

          if (range.y < 0) {
            top -= height;
          } // Show the crop box if is hidden


          if (!this.cropped) {
            removeClass(this.cropBox, CLASS_HIDDEN);
            this.cropped = true;

            if (this.limited) {
              this.limitCropBox(true, true);
            }
          }

          break;

        default:
      }

      if (renderable) {
        cropBoxData.width = width;
        cropBoxData.height = height;
        cropBoxData.left = left;
        cropBoxData.top = top;
        this.action = action;
        this.renderCropBox();
      } // Override


      forEach(pointers, function (p) {
        p.startX = p.endX;
        p.startY = p.endY;
      });
    }
  };

  var methods = {
    // Show the crop box manually
    crop: function crop() {
      if (this.ready && !this.cropped && !this.disabled) {
        this.cropped = true;
        this.limitCropBox(true, true);

        if (this.options.modal) {
          addClass(this.dragBox, CLASS_MODAL);
        }

        removeClass(this.cropBox, CLASS_HIDDEN);
        this.setCropBoxData(this.initialCropBoxData);
      }

      return this;
    },
    // Reset the image and crop box to their initial states
    reset: function reset() {
      if (this.ready && !this.disabled) {
        this.imageData = assign({}, this.initialImageData);
        this.canvasData = assign({}, this.initialCanvasData);
        this.cropBoxData = assign({}, this.initialCropBoxData);
        this.renderCanvas();

        if (this.cropped) {
          this.renderCropBox();
        }
      }

      return this;
    },
    // Clear the crop box
    clear: function clear() {
      if (this.cropped && !this.disabled) {
        assign(this.cropBoxData, {
          left: 0,
          top: 0,
          width: 0,
          height: 0
        });
        this.cropped = false;
        this.renderCropBox();
        this.limitCanvas(true, true); // Render canvas after crop box rendered

        this.renderCanvas();
        removeClass(this.dragBox, CLASS_MODAL);
        addClass(this.cropBox, CLASS_HIDDEN);
      }

      return this;
    },

    /**
     * Replace the image's src and rebuild the cropper
     * @param {string} url - The new URL.
     * @param {boolean} [hasSameSize] - Indicate if the new image has the same size as the old one.
     * @returns {Cropper} this
     */
    replace: function replace(url) {
      var hasSameSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (!this.disabled && url) {
        if (this.isImg) {
          this.element.src = url;
        }

        if (hasSameSize) {
          this.url = url;
          this.image.src = url;

          if (this.ready) {
            this.viewBoxImage.src = url;
            forEach(this.previews, function (element) {
              element.getElementsByTagName('img')[0].src = url;
            });
          }
        } else {
          if (this.isImg) {
            this.replaced = true;
          }

          this.options.data = null;
          this.uncreate();
          this.load(url);
        }
      }

      return this;
    },
    // Enable (unfreeze) the cropper
    enable: function enable() {
      if (this.ready && this.disabled) {
        this.disabled = false;
        removeClass(this.cropper, CLASS_DISABLED);
      }

      return this;
    },
    // Disable (freeze) the cropper
    disable: function disable() {
      if (this.ready && !this.disabled) {
        this.disabled = true;
        addClass(this.cropper, CLASS_DISABLED);
      }

      return this;
    },

    /**
     * Destroy the cropper and remove the instance from the image
     * @returns {Cropper} this
     */
    destroy: function destroy() {
      var element = this.element;

      if (!element[NAMESPACE]) {
        return this;
      }

      element[NAMESPACE] = undefined;

      if (this.isImg && this.replaced) {
        element.src = this.originalUrl;
      }

      this.uncreate();
      return this;
    },

    /**
     * Move the canvas with relative offsets
     * @param {number} offsetX - The relative offset distance on the x-axis.
     * @param {number} [offsetY=offsetX] - The relative offset distance on the y-axis.
     * @returns {Cropper} this
     */
    move: function move(offsetX) {
      var offsetY = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : offsetX;
      var _this$canvasData = this.canvasData,
          left = _this$canvasData.left,
          top = _this$canvasData.top;
      return this.moveTo(isUndefined(offsetX) ? offsetX : left + Number(offsetX), isUndefined(offsetY) ? offsetY : top + Number(offsetY));
    },

    /**
     * Move the canvas to an absolute point
     * @param {number} x - The x-axis coordinate.
     * @param {number} [y=x] - The y-axis coordinate.
     * @returns {Cropper} this
     */
    moveTo: function moveTo(x) {
      var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : x;
      var canvasData = this.canvasData;
      var changed = false;
      x = Number(x);
      y = Number(y);

      if (this.ready && !this.disabled && this.options.movable) {
        if (isNumber(x)) {
          canvasData.left = x;
          changed = true;
        }

        if (isNumber(y)) {
          canvasData.top = y;
          changed = true;
        }

        if (changed) {
          this.renderCanvas(true);
        }
      }

      return this;
    },

    /**
     * Zoom the canvas with a relative ratio
     * @param {number} ratio - The target ratio.
     * @param {Event} _originalEvent - The original event if any.
     * @returns {Cropper} this
     */
    zoom: function zoom(ratio, _originalEvent) {
      var canvasData = this.canvasData;
      ratio = Number(ratio);

      if (ratio < 0) {
        ratio = 1 / (1 - ratio);
      } else {
        ratio = 1 + ratio;
      }

      return this.zoomTo(canvasData.width * ratio / canvasData.naturalWidth, null, _originalEvent);
    },

    /**
     * Zoom the canvas to an absolute ratio
     * @param {number} ratio - The target ratio.
     * @param {Object} pivot - The zoom pivot point coordinate.
     * @param {Event} _originalEvent - The original event if any.
     * @returns {Cropper} this
     */
    zoomTo: function zoomTo(ratio, pivot, _originalEvent) {
      var options = this.options,
          canvasData = this.canvasData;
      var width = canvasData.width,
          height = canvasData.height,
          naturalWidth = canvasData.naturalWidth,
          naturalHeight = canvasData.naturalHeight;
      ratio = Number(ratio);

      if (ratio >= 0 && this.ready && !this.disabled && options.zoomable) {
        var newWidth = naturalWidth * ratio;
        var newHeight = naturalHeight * ratio;

        if (dispatchEvent(this.element, EVENT_ZOOM, {
          ratio: ratio,
          oldRatio: width / naturalWidth,
          originalEvent: _originalEvent
        }) === false) {
          return this;
        }

        if (_originalEvent) {
          var pointers = this.pointers;
          var offset = getOffset(this.cropper);
          var center = pointers && Object.keys(pointers).length ? getPointersCenter(pointers) : {
            pageX: _originalEvent.pageX,
            pageY: _originalEvent.pageY
          }; // Zoom from the triggering point of the event

          canvasData.left -= (newWidth - width) * ((center.pageX - offset.left - canvasData.left) / width);
          canvasData.top -= (newHeight - height) * ((center.pageY - offset.top - canvasData.top) / height);
        } else if (isPlainObject(pivot) && isNumber(pivot.x) && isNumber(pivot.y)) {
          canvasData.left -= (newWidth - width) * ((pivot.x - canvasData.left) / width);
          canvasData.top -= (newHeight - height) * ((pivot.y - canvasData.top) / height);
        } else {
          // Zoom from the center of the canvas
          canvasData.left -= (newWidth - width) / 2;
          canvasData.top -= (newHeight - height) / 2;
        }

        canvasData.width = newWidth;
        canvasData.height = newHeight;
        this.renderCanvas(true);
      }

      return this;
    },

    /**
     * Rotate the canvas with a relative degree
     * @param {number} degree - The rotate degree.
     * @returns {Cropper} this
     */
    rotate: function rotate(degree) {
      return this.rotateTo((this.imageData.rotate || 0) + Number(degree));
    },

    /**
     * Rotate the canvas to an absolute degree
     * @param {number} degree - The rotate degree.
     * @returns {Cropper} this
     */
    rotateTo: function rotateTo(degree) {
      degree = Number(degree);

      if (isNumber(degree) && this.ready && !this.disabled && this.options.rotatable) {
        this.imageData.rotate = degree % 360;
        this.renderCanvas(true, true);
      }

      return this;
    },

    /**
     * Scale the image on the x-axis.
     * @param {number} scaleX - The scale ratio on the x-axis.
     * @returns {Cropper} this
     */
    scaleX: function scaleX(_scaleX) {
      var scaleY = this.imageData.scaleY;
      return this.scale(_scaleX, isNumber(scaleY) ? scaleY : 1);
    },

    /**
     * Scale the image on the y-axis.
     * @param {number} scaleY - The scale ratio on the y-axis.
     * @returns {Cropper} this
     */
    scaleY: function scaleY(_scaleY) {
      var scaleX = this.imageData.scaleX;
      return this.scale(isNumber(scaleX) ? scaleX : 1, _scaleY);
    },

    /**
     * Scale the image
     * @param {number} scaleX - The scale ratio on the x-axis.
     * @param {number} [scaleY=scaleX] - The scale ratio on the y-axis.
     * @returns {Cropper} this
     */
    scale: function scale(scaleX) {
      var scaleY = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : scaleX;
      var imageData = this.imageData;
      var transformed = false;
      scaleX = Number(scaleX);
      scaleY = Number(scaleY);

      if (this.ready && !this.disabled && this.options.scalable) {
        if (isNumber(scaleX)) {
          imageData.scaleX = scaleX;
          transformed = true;
        }

        if (isNumber(scaleY)) {
          imageData.scaleY = scaleY;
          transformed = true;
        }

        if (transformed) {
          this.renderCanvas(true, true);
        }
      }

      return this;
    },

    /**
     * Get the cropped area position and size data (base on the original image)
     * @param {boolean} [rounded=false] - Indicate if round the data values or not.
     * @returns {Object} The result cropped data.
     */
    getData: function getData() {
      var rounded = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var options = this.options,
          imageData = this.imageData,
          canvasData = this.canvasData,
          cropBoxData = this.cropBoxData;
      var data;

      if (this.ready && this.cropped) {
        data = {
          x: cropBoxData.left - canvasData.left,
          y: cropBoxData.top - canvasData.top,
          width: cropBoxData.width,
          height: cropBoxData.height
        };
        var ratio = imageData.width / imageData.naturalWidth;
        forEach(data, function (n, i) {
          data[i] = n / ratio;
        });

        if (rounded) {
          // In case rounding off leads to extra 1px in right or bottom border
          // we should round the top-left corner and the dimension (#343).
          var bottom = Math.round(data.y + data.height);
          var right = Math.round(data.x + data.width);
          data.x = Math.round(data.x);
          data.y = Math.round(data.y);
          data.width = right - data.x;
          data.height = bottom - data.y;
        }
      } else {
        data = {
          x: 0,
          y: 0,
          width: 0,
          height: 0
        };
      }

      if (options.rotatable) {
        data.rotate = imageData.rotate || 0;
      }

      if (options.scalable) {
        data.scaleX = imageData.scaleX || 1;
        data.scaleY = imageData.scaleY || 1;
      }

      return data;
    },

    /**
     * Set the cropped area position and size with new data
     * @param {Object} data - The new data.
     * @returns {Cropper} this
     */
    setData: function setData(data) {
      var options = this.options,
          imageData = this.imageData,
          canvasData = this.canvasData;
      var cropBoxData = {};

      if (this.ready && !this.disabled && isPlainObject(data)) {
        var transformed = false;

        if (options.rotatable) {
          if (isNumber(data.rotate) && data.rotate !== imageData.rotate) {
            imageData.rotate = data.rotate;
            transformed = true;
          }
        }

        if (options.scalable) {
          if (isNumber(data.scaleX) && data.scaleX !== imageData.scaleX) {
            imageData.scaleX = data.scaleX;
            transformed = true;
          }

          if (isNumber(data.scaleY) && data.scaleY !== imageData.scaleY) {
            imageData.scaleY = data.scaleY;
            transformed = true;
          }
        }

        if (transformed) {
          this.renderCanvas(true, true);
        }

        var ratio = imageData.width / imageData.naturalWidth;

        if (isNumber(data.x)) {
          cropBoxData.left = data.x * ratio + canvasData.left;
        }

        if (isNumber(data.y)) {
          cropBoxData.top = data.y * ratio + canvasData.top;
        }

        if (isNumber(data.width)) {
          cropBoxData.width = data.width * ratio;
        }

        if (isNumber(data.height)) {
          cropBoxData.height = data.height * ratio;
        }

        this.setCropBoxData(cropBoxData);
      }

      return this;
    },

    /**
     * Get the container size data.
     * @returns {Object} The result container data.
     */
    getContainerData: function getContainerData() {
      return this.ready ? assign({}, this.containerData) : {};
    },

    /**
     * Get the image position and size data.
     * @returns {Object} The result image data.
     */
    getImageData: function getImageData() {
      return this.sized ? assign({}, this.imageData) : {};
    },

    /**
     * Get the canvas position and size data.
     * @returns {Object} The result canvas data.
     */
    getCanvasData: function getCanvasData() {
      var canvasData = this.canvasData;
      var data = {};

      if (this.ready) {
        forEach(['left', 'top', 'width', 'height', 'naturalWidth', 'naturalHeight'], function (n) {
          data[n] = canvasData[n];
        });
      }

      return data;
    },

    /**
     * Set the canvas position and size with new data.
     * @param {Object} data - The new canvas data.
     * @returns {Cropper} this
     */
    setCanvasData: function setCanvasData(data) {
      var canvasData = this.canvasData;
      var aspectRatio = canvasData.aspectRatio;

      if (this.ready && !this.disabled && isPlainObject(data)) {
        if (isNumber(data.left)) {
          canvasData.left = data.left;
        }

        if (isNumber(data.top)) {
          canvasData.top = data.top;
        }

        if (isNumber(data.width)) {
          canvasData.width = data.width;
          canvasData.height = data.width / aspectRatio;
        } else if (isNumber(data.height)) {
          canvasData.height = data.height;
          canvasData.width = data.height * aspectRatio;
        }

        this.renderCanvas(true);
      }

      return this;
    },

    /**
     * Get the crop box position and size data.
     * @returns {Object} The result crop box data.
     */
    getCropBoxData: function getCropBoxData() {
      var cropBoxData = this.cropBoxData;
      var data;

      if (this.ready && this.cropped) {
        data = {
          left: cropBoxData.left,
          top: cropBoxData.top,
          width: cropBoxData.width,
          height: cropBoxData.height
        };
      }

      return data || {};
    },

    /**
     * Set the crop box position and size with new data.
     * @param {Object} data - The new crop box data.
     * @returns {Cropper} this
     */
    setCropBoxData: function setCropBoxData(data) {
      var cropBoxData = this.cropBoxData;
      var aspectRatio = this.options.aspectRatio;
      var widthChanged;
      var heightChanged;

      if (this.ready && this.cropped && !this.disabled && isPlainObject(data)) {
        if (isNumber(data.left)) {
          cropBoxData.left = data.left;
        }

        if (isNumber(data.top)) {
          cropBoxData.top = data.top;
        }

        if (isNumber(data.width) && data.width !== cropBoxData.width) {
          widthChanged = true;
          cropBoxData.width = data.width;
        }

        if (isNumber(data.height) && data.height !== cropBoxData.height) {
          heightChanged = true;
          cropBoxData.height = data.height;
        }

        if (aspectRatio) {
          if (widthChanged) {
            cropBoxData.height = cropBoxData.width / aspectRatio;
          } else if (heightChanged) {
            cropBoxData.width = cropBoxData.height * aspectRatio;
          }
        }

        this.renderCropBox();
      }

      return this;
    },

    /**
     * Get a canvas drawn the cropped image.
     * @param {Object} [options={}] - The config options.
     * @returns {HTMLCanvasElement} - The result canvas.
     */
    getCroppedCanvas: function getCroppedCanvas() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (!this.ready || !window.HTMLCanvasElement) {
        return null;
      }

      var canvasData = this.canvasData;
      var source = getSourceCanvas(this.image, this.imageData, canvasData, options); // Returns the source canvas if it is not cropped.

      if (!this.cropped) {
        return source;
      }

      var _this$getData = this.getData(),
          initialX = _this$getData.x,
          initialY = _this$getData.y,
          initialWidth = _this$getData.width,
          initialHeight = _this$getData.height;

      var ratio = source.width / Math.floor(canvasData.naturalWidth);

      if (ratio !== 1) {
        initialX *= ratio;
        initialY *= ratio;
        initialWidth *= ratio;
        initialHeight *= ratio;
      }

      var aspectRatio = initialWidth / initialHeight;
      var maxSizes = getAdjustedSizes({
        aspectRatio: aspectRatio,
        width: options.maxWidth || Infinity,
        height: options.maxHeight || Infinity
      });
      var minSizes = getAdjustedSizes({
        aspectRatio: aspectRatio,
        width: options.minWidth || 0,
        height: options.minHeight || 0
      }, 'cover');

      var _getAdjustedSizes = getAdjustedSizes({
        aspectRatio: aspectRatio,
        width: options.width || (ratio !== 1 ? source.width : initialWidth),
        height: options.height || (ratio !== 1 ? source.height : initialHeight)
      }),
          width = _getAdjustedSizes.width,
          height = _getAdjustedSizes.height;

      width = Math.min(maxSizes.width, Math.max(minSizes.width, width));
      height = Math.min(maxSizes.height, Math.max(minSizes.height, height));
      var canvas = document.createElement('canvas');
      var context = canvas.getContext('2d');
      canvas.width = normalizeDecimalNumber(width);
      canvas.height = normalizeDecimalNumber(height);
      context.fillStyle = options.fillColor || 'transparent';
      context.fillRect(0, 0, width, height);
      var _options$imageSmoothi = options.imageSmoothingEnabled,
          imageSmoothingEnabled = _options$imageSmoothi === void 0 ? true : _options$imageSmoothi,
          imageSmoothingQuality = options.imageSmoothingQuality;
      context.imageSmoothingEnabled = imageSmoothingEnabled;

      if (imageSmoothingQuality) {
        context.imageSmoothingQuality = imageSmoothingQuality;
      } // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D.drawImage


      var sourceWidth = source.width;
      var sourceHeight = source.height; // Source canvas parameters

      var srcX = initialX;
      var srcY = initialY;
      var srcWidth;
      var srcHeight; // Destination canvas parameters

      var dstX;
      var dstY;
      var dstWidth;
      var dstHeight;

      if (srcX <= -initialWidth || srcX > sourceWidth) {
        srcX = 0;
        srcWidth = 0;
        dstX = 0;
        dstWidth = 0;
      } else if (srcX <= 0) {
        dstX = -srcX;
        srcX = 0;
        srcWidth = Math.min(sourceWidth, initialWidth + srcX);
        dstWidth = srcWidth;
      } else if (srcX <= sourceWidth) {
        dstX = 0;
        srcWidth = Math.min(initialWidth, sourceWidth - srcX);
        dstWidth = srcWidth;
      }

      if (srcWidth <= 0 || srcY <= -initialHeight || srcY > sourceHeight) {
        srcY = 0;
        srcHeight = 0;
        dstY = 0;
        dstHeight = 0;
      } else if (srcY <= 0) {
        dstY = -srcY;
        srcY = 0;
        srcHeight = Math.min(sourceHeight, initialHeight + srcY);
        dstHeight = srcHeight;
      } else if (srcY <= sourceHeight) {
        dstY = 0;
        srcHeight = Math.min(initialHeight, sourceHeight - srcY);
        dstHeight = srcHeight;
      }

      var params = [srcX, srcY, srcWidth, srcHeight]; // Avoid "IndexSizeError"

      if (dstWidth > 0 && dstHeight > 0) {
        var scale = width / initialWidth;
        params.push(dstX * scale, dstY * scale, dstWidth * scale, dstHeight * scale);
      } // All the numerical parameters should be integer for `drawImage`
      // https://github.com/fengyuanchen/cropper/issues/476


      context.drawImage.apply(context, [source].concat(_toConsumableArray(params.map(function (param) {
        return Math.floor(normalizeDecimalNumber(param));
      }))));
      return canvas;
    },

    /**
     * Change the aspect ratio of the crop box.
     * @param {number} aspectRatio - The new aspect ratio.
     * @returns {Cropper} this
     */
    setAspectRatio: function setAspectRatio(aspectRatio) {
      var options = this.options;

      if (!this.disabled && !isUndefined(aspectRatio)) {
        // 0 -> NaN
        options.aspectRatio = Math.max(0, aspectRatio) || NaN;

        if (this.ready) {
          this.initCropBox();

          if (this.cropped) {
            this.renderCropBox();
          }
        }
      }

      return this;
    },

    /**
     * Change the drag mode.
     * @param {string} mode - The new drag mode.
     * @returns {Cropper} this
     */
    setDragMode: function setDragMode(mode) {
      var options = this.options,
          dragBox = this.dragBox,
          face = this.face;

      if (this.ready && !this.disabled) {
        var croppable = mode === DRAG_MODE_CROP;
        var movable = options.movable && mode === DRAG_MODE_MOVE;
        mode = croppable || movable ? mode : DRAG_MODE_NONE;
        options.dragMode = mode;
        setData(dragBox, DATA_ACTION, mode);
        toggleClass(dragBox, CLASS_CROP, croppable);
        toggleClass(dragBox, CLASS_MOVE, movable);

        if (!options.cropBoxMovable) {
          // Sync drag mode to crop box when it is not movable
          setData(face, DATA_ACTION, mode);
          toggleClass(face, CLASS_CROP, croppable);
          toggleClass(face, CLASS_MOVE, movable);
        }
      }

      return this;
    }
  };

  var AnotherCropper = WINDOW.Cropper;

  var Cropper =
  /*#__PURE__*/
  function () {
    /**
     * Create a new Cropper.
     * @param {Element} element - The target element for cropping.
     * @param {Object} [options={}] - The configuration options.
     */
    function Cropper(element) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      _classCallCheck(this, Cropper);

      if (!element || !REGEXP_TAG_NAME.test(element.tagName)) {
        throw new Error('The first argument is required and must be an <img> or <canvas> element.');
      }

      this.element = element;
      this.options = assign({}, DEFAULTS, isPlainObject(options) && options);
      this.cropped = false;
      this.disabled = false;
      this.pointers = {};
      this.ready = false;
      this.reloading = false;
      this.replaced = false;
      this.sized = false;
      this.sizing = false;
      this.init();
    }

    _createClass(Cropper, [{
      key: "init",
      value: function init() {
        var element = this.element;
        var tagName = element.tagName.toLowerCase();
        var url;

        if (element[NAMESPACE]) {
          return;
        }

        element[NAMESPACE] = this;

        if (tagName === 'img') {
          this.isImg = true; // e.g.: "img/picture.jpg"

          url = element.getAttribute('src') || '';
          this.originalUrl = url; // Stop when it's a blank image

          if (!url) {
            return;
          } // e.g.: "http://example.com/img/picture.jpg"


          url = element.src;
        } else if (tagName === 'canvas' && window.HTMLCanvasElement) {
          url = element.toDataURL();
        }

        this.load(url);
      }
    }, {
      key: "load",
      value: function load(url) {
        var _this = this;

        if (!url) {
          return;
        }

        this.url = url;
        this.imageData = {};
        var element = this.element,
            options = this.options;

        if (!options.rotatable && !options.scalable) {
          options.checkOrientation = false;
        } // Only IE10+ supports Typed Arrays


        if (!options.checkOrientation || !window.ArrayBuffer) {
          this.clone();
          return;
        } // Detect the mime type of the image directly if it is a Data URL


        if (REGEXP_DATA_URL.test(url)) {
          // Read ArrayBuffer from Data URL of JPEG images directly for better performance
          if (REGEXP_DATA_URL_JPEG.test(url)) {
            this.read(dataURLToArrayBuffer(url));
          } else {
            // Only a JPEG image may contains Exif Orientation information,
            // the rest types of Data URLs are not necessary to check orientation at all.
            this.clone();
          }

          return;
        } // 1. Detect the mime type of the image by a XMLHttpRequest.
        // 2. Load the image as ArrayBuffer for reading orientation if its a JPEG image.


        var xhr = new XMLHttpRequest();
        var clone = this.clone.bind(this);
        this.reloading = true;
        this.xhr = xhr; // 1. Cross origin requests are only supported for protocol schemes:
        // http, https, data, chrome, chrome-extension.
        // 2. Access to XMLHttpRequest from a Data URL will be blocked by CORS policy
        // in some browsers as IE11 and Safari.

        xhr.onabort = clone;
        xhr.onerror = clone;
        xhr.ontimeout = clone;

        xhr.onprogress = function () {
          // Abort the request directly if it not a JPEG image for better performance
          if (xhr.getResponseHeader('content-type') !== MIME_TYPE_JPEG) {
            xhr.abort();
          }
        };

        xhr.onload = function () {
          _this.read(xhr.response);
        };

        xhr.onloadend = function () {
          _this.reloading = false;
          _this.xhr = null;
        }; // Bust cache when there is a "crossOrigin" property to avoid browser cache error


        if (options.checkCrossOrigin && isCrossOriginURL(url) && element.crossOrigin) {
          url = addTimestamp(url);
        }

        xhr.open('GET', url);
        xhr.responseType = 'arraybuffer';
        xhr.withCredentials = element.crossOrigin === 'use-credentials';
        xhr.send();
      }
    }, {
      key: "read",
      value: function read(arrayBuffer) {
        var options = this.options,
            imageData = this.imageData; // Reset the orientation value to its default value 1
        // as some iOS browsers will render image with its orientation

        var orientation = resetAndGetOrientation(arrayBuffer);
        var rotate = 0;
        var scaleX = 1;
        var scaleY = 1;

        if (orientation > 1) {
          // Generate a new URL which has the default orientation value
          this.url = arrayBufferToDataURL(arrayBuffer, MIME_TYPE_JPEG);

          var _parseOrientation = parseOrientation(orientation);

          rotate = _parseOrientation.rotate;
          scaleX = _parseOrientation.scaleX;
          scaleY = _parseOrientation.scaleY;
        }

        if (options.rotatable) {
          imageData.rotate = rotate;
        }

        if (options.scalable) {
          imageData.scaleX = scaleX;
          imageData.scaleY = scaleY;
        }

        this.clone();
      }
    }, {
      key: "clone",
      value: function clone() {
        var element = this.element,
            url = this.url;
        var crossOrigin = element.crossOrigin;
        var crossOriginUrl = url;

        if (this.options.checkCrossOrigin && isCrossOriginURL(url)) {
          if (!crossOrigin) {
            crossOrigin = 'anonymous';
          } // Bust cache when there is not a "crossOrigin" property (#519)


          crossOriginUrl = addTimestamp(url);
        }

        this.crossOrigin = crossOrigin;
        this.crossOriginUrl = crossOriginUrl;
        var image = document.createElement('img');

        if (crossOrigin) {
          image.crossOrigin = crossOrigin;
        }

        image.src = crossOriginUrl || url;
        image.alt = element.alt || 'The image to crop';
        this.image = image;
        image.onload = this.start.bind(this);
        image.onerror = this.stop.bind(this);
        addClass(image, CLASS_HIDE);
        element.parentNode.insertBefore(image, element.nextSibling);
      }
    }, {
      key: "start",
      value: function start() {
        var _this2 = this;

        var image = this.image;
        image.onload = null;
        image.onerror = null;
        this.sizing = true; // Match all browsers that use WebKit as the layout engine in iOS devices,
        // such as Safari for iOS, Chrome for iOS, and in-app browsers.

        var isIOSWebKit = WINDOW.navigator && /(?:iPad|iPhone|iPod).*?AppleWebKit/i.test(WINDOW.navigator.userAgent);

        var done = function done(naturalWidth, naturalHeight) {
          assign(_this2.imageData, {
            naturalWidth: naturalWidth,
            naturalHeight: naturalHeight,
            aspectRatio: naturalWidth / naturalHeight
          });
          _this2.sizing = false;
          _this2.sized = true;

          _this2.build();
        }; // Most modern browsers (excepts iOS WebKit)


        if (image.naturalWidth && !isIOSWebKit) {
          done(image.naturalWidth, image.naturalHeight);
          return;
        }

        var sizingImage = document.createElement('img');
        var body = document.body || document.documentElement;
        this.sizingImage = sizingImage;

        sizingImage.onload = function () {
          done(sizingImage.width, sizingImage.height);

          if (!isIOSWebKit) {
            body.removeChild(sizingImage);
          }
        };

        sizingImage.src = image.src; // iOS WebKit will convert the image automatically
        // with its orientation once append it into DOM (#279)

        if (!isIOSWebKit) {
          sizingImage.style.cssText = 'left:0;' + 'max-height:none!important;' + 'max-width:none!important;' + 'min-height:0!important;' + 'min-width:0!important;' + 'opacity:0;' + 'position:absolute;' + 'top:0;' + 'z-index:-1;';
          body.appendChild(sizingImage);
        }
      }
    }, {
      key: "stop",
      value: function stop() {
        var image = this.image;
        image.onload = null;
        image.onerror = null;
        image.parentNode.removeChild(image);
        this.image = null;
      }
    }, {
      key: "build",
      value: function build() {
        if (!this.sized || this.ready) {
          return;
        }

        var element = this.element,
            options = this.options,
            image = this.image; // Create cropper elements

        var container = element.parentNode;
        var template = document.createElement('div');
        template.innerHTML = TEMPLATE;
        var cropper = template.querySelector(".".concat(NAMESPACE, "-container"));
        var canvas = cropper.querySelector(".".concat(NAMESPACE, "-canvas"));
        var dragBox = cropper.querySelector(".".concat(NAMESPACE, "-drag-box"));
        var cropBox = cropper.querySelector(".".concat(NAMESPACE, "-crop-box"));
        var face = cropBox.querySelector(".".concat(NAMESPACE, "-face"));
        this.container = container;
        this.cropper = cropper;
        this.canvas = canvas;
        this.dragBox = dragBox;
        this.cropBox = cropBox;
        this.viewBox = cropper.querySelector(".".concat(NAMESPACE, "-view-box"));
        this.face = face;
        canvas.appendChild(image); // Hide the original image

        addClass(element, CLASS_HIDDEN); // Inserts the cropper after to the current image

        container.insertBefore(cropper, element.nextSibling); // Show the image if is hidden

        if (!this.isImg) {
          removeClass(image, CLASS_HIDE);
        }

        this.initPreview();
        this.bind();
        options.initialAspectRatio = Math.max(0, options.initialAspectRatio) || NaN;
        options.aspectRatio = Math.max(0, options.aspectRatio) || NaN;
        options.viewMode = Math.max(0, Math.min(3, Math.round(options.viewMode))) || 0;
        addClass(cropBox, CLASS_HIDDEN);

        if (!options.guides) {
          addClass(cropBox.getElementsByClassName("".concat(NAMESPACE, "-dashed")), CLASS_HIDDEN);
        }

        if (!options.center) {
          addClass(cropBox.getElementsByClassName("".concat(NAMESPACE, "-center")), CLASS_HIDDEN);
        }

        if (options.background) {
          addClass(cropper, "".concat(NAMESPACE, "-bg"));
        }

        if (!options.highlight) {
          addClass(face, CLASS_INVISIBLE);
        }

        if (options.cropBoxMovable) {
          addClass(face, CLASS_MOVE);
          setData(face, DATA_ACTION, ACTION_ALL);
        }

        if (!options.cropBoxResizable) {
          addClass(cropBox.getElementsByClassName("".concat(NAMESPACE, "-line")), CLASS_HIDDEN);
          addClass(cropBox.getElementsByClassName("".concat(NAMESPACE, "-point")), CLASS_HIDDEN);
        }

        this.render();
        this.ready = true;
        this.setDragMode(options.dragMode);

        if (options.autoCrop) {
          this.crop();
        }

        this.setData(options.data);

        if (isFunction(options.ready)) {
          addListener(element, EVENT_READY, options.ready, {
            once: true
          });
        }

        dispatchEvent(element, EVENT_READY);
      }
    }, {
      key: "unbuild",
      value: function unbuild() {
        if (!this.ready) {
          return;
        }

        this.ready = false;
        this.unbind();
        this.resetPreview();
        this.cropper.parentNode.removeChild(this.cropper);
        removeClass(this.element, CLASS_HIDDEN);
      }
    }, {
      key: "uncreate",
      value: function uncreate() {
        if (this.ready) {
          this.unbuild();
          this.ready = false;
          this.cropped = false;
        } else if (this.sizing) {
          this.sizingImage.onload = null;
          this.sizing = false;
          this.sized = false;
        } else if (this.reloading) {
          this.xhr.onabort = null;
          this.xhr.abort();
        } else if (this.image) {
          this.stop();
        }
      }
      /**
       * Get the no conflict cropper class.
       * @returns {Cropper} The cropper class.
       */

    }], [{
      key: "noConflict",
      value: function noConflict() {
        window.Cropper = AnotherCropper;
        return Cropper;
      }
      /**
       * Change the default options.
       * @param {Object} options - The new default options.
       */

    }, {
      key: "setDefaults",
      value: function setDefaults(options) {
        assign(DEFAULTS, isPlainObject(options) && options);
      }
    }]);

    return Cropper;
  }();

  assign(Cropper.prototype, render, preview, events, handlers, change, methods);

  return Cropper;

}));


/***/ }),

/***/ 55:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm.fileBaseUrl
    ? _c("div", { staticClass: "demo", attrs: { refs: _vm.num } }, [
        _c(
          "div",
          {
            staticClass: "show",
            style: "width:" + _vm.width + ";height:" + _vm.height
          },
          [
            _c(
              "div",
              {
                staticClass: "picture",
                style:
                  "backgroundImage:url(" +
                  _vm.imgurl(
                    _vm.defaultImg || (_vm.value && _vm.value.imageUrl)
                  ) +
                  ");width:" +
                  _vm.width +
                  ";height:" +
                  _vm.height +
                  ";line-height:" +
                  _vm.height,
                on: { click: _vm.chioce }
              },
              [
                (!_vm.value || !_vm.value.imageUrl) && !_vm.defaultImg
                  ? _c("div", { staticClass: "icon-upload-box" }, [
                      _c("i", { staticClass: "icon-upload" })
                    ])
                  : _vm._e()
              ]
            )
          ]
        ),
        _vm._v(" "),
        _c("div", [
          _c("div", { staticStyle: { "margin-top": "20px" } }, [
            _vm.type
              ? _c("input", {
                  staticStyle: { display: "none" },
                  attrs: { type: "file", id: _vm.type, accept: "image" },
                  on: { change: _vm.change }
                })
              : _c("input", {
                  staticStyle: { display: "none" },
                  attrs: { type: "file", id: "change", accept: "image" },
                  on: { change: _vm.change }
                })
          ])
        ]),
        _vm._v(" "),
        _c(
          "div",
          {
            directives: [
              {
                name: "show",
                rawName: "v-show",
                value: _vm.panel,
                expression: "panel"
              }
            ],
            staticClass: "container"
          },
          [
            _c(
              "div",
              {
                directives: [
                  {
                    name: "loading",
                    rawName: "v-loading",
                    value: _vm.loading,
                    expression: "loading"
                  }
                ],
                staticClass: "wrap"
              },
              [
                !_vm.type
                  ? _c("img", {
                      attrs: { id: "change1", src: _vm.url, alt: "Picture" }
                    })
                  : _c("img", {
                      attrs: { id: _vm.type + 1, src: _vm.url, alt: "Picture" }
                    }),
                _vm._v(" "),
                _c(
                  "div",
                  { staticStyle: { "margin-top": "10px" } },
                  [
                    _c(
                      "el-button",
                      {
                        attrs: {
                          type: "button",
                          size: "small",
                          disabled: _vm.loading,
                          icon: "el-icon-zoom-in"
                        },
                        on: {
                          click: function($event) {
                            _vm.scale(1)
                          }
                        }
                      },
                      [_vm._v("放大")]
                    ),
                    _vm._v(" "),
                    _c(
                      "el-button",
                      {
                        attrs: {
                          type: "button",
                          size: "small",
                          disabled: _vm.loading,
                          icon: "el-icon-zoom-out"
                        },
                        on: {
                          click: function($event) {
                            _vm.scale(-1)
                          }
                        }
                      },
                      [_vm._v("缩小")]
                    ),
                    _vm._v(" "),
                    _c(
                      "el-button",
                      {
                        attrs: {
                          type: "button",
                          size: "small",
                          disabled: _vm.loading,
                          icon: "el-icon-refresh"
                        },
                        on: {
                          click: function($event) {
                            _vm.roteta("right")
                          }
                        }
                      },
                      [_vm._v("旋转")]
                    ),
                    _vm._v(" "),
                    _c(
                      "el-button",
                      {
                        staticClass: "pull-right",
                        attrs: {
                          type: "primary",
                          size: "small",
                          disabled: _vm.loading,
                          icon: "el-icon-circle-check-outline"
                        },
                        on: { click: _vm.crop }
                      },
                      [_vm._v("确定")]
                    ),
                    _vm._v(" "),
                    _c(
                      "el-button",
                      {
                        staticClass: "pull-right",
                        attrs: {
                          type: "button",
                          size: "small",
                          disabled: _vm.loading
                        },
                        on: { click: _vm.cancelCrop }
                      },
                      [_vm._v("取消")]
                    )
                  ],
                  1
                )
              ]
            )
          ]
        )
      ])
    : _vm._e()
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-3493686e", esExports)
  }
}

/***/ }),

/***/ 6:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(19);

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),

/***/ 7:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),

/***/ 720:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__scripts_module_vue__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__scripts_module_axios__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_ui_cms_mincade_vue__ = __webpack_require__(217);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_ui_cms_minimage_vue__ = __webpack_require__(221);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_ui_cms_mintext_vue__ = __webpack_require__(225);
/* jshint esversion: 6 */


//小程序卡片  图片  文字




new __WEBPACK_IMPORTED_MODULE_0__scripts_module_vue__["default"]({
    el: '#app',
    delimiters: ['{[', ']}'],
    components: {
        'cms-mincade': __WEBPACK_IMPORTED_MODULE_2__components_ui_cms_mincade_vue__["a" /* default */],
        'cms-minimage': __WEBPACK_IMPORTED_MODULE_3__components_ui_cms_minimage_vue__["a" /* default */],
        'cms-mintext': __WEBPACK_IMPORTED_MODULE_4__components_ui_cms_mintext_vue__["a" /* default */]
    },
    data: {
        //查询条件
        query: {
            gzh: null
        },
        //数据
        followReplyData: {},
        keywordResponseData: {},
        //显示什么东西 loading
        views: {
            miniprogrampage: false,
            text: false,
            image: false,
            //保存
            save: false,
            //获取当前的save
            getfindNews: false
        },
        formData: {
            reply: false,
            replyType: 'all'
        },
        replyModal: [],
        //确定是新增还是修改回复内容
        replyModalType: 'add',
        //小程序卡片
        miniprogrampage: {
            type: 'miniprogrampage',
            //卡片标题
            title: '',
            // 小程序路径
            pagepath: '',
            //小程序appid
            appid: '',
            //图片
            mediaSourseUrl: ''
        },
        //文字
        text: {
            type: 'text',
            text: ''
        },
        //img
        image: {
            type: 'image',
            mediaSourseUrl: ''
        }
    },
    methods: {
        //切换tab
        change(e) {
            this.query.gzh = e;
            this.getfindNews();
            window.location.hash = this.$base64Encode(this.query);
        },
        // todo 关注后回复
        //获取关注后回复
        getfindNews() {
            if (this.views.getfindNews) {
                return;
            }
            this.views.getfindNews = true;
            __WEBPACK_IMPORTED_MODULE_1__scripts_module_axios__["default"].get(`/api/wechat-service/wechat/more/findNews?gzhId=${this.query.gzh.appid}`).then(res => {
                this.views.getfindNews = false;
                if (res.code === '000' && res.data) {
                    this.formData = JSON.parse(JSON.stringify(res.data));
                    this.replyModal = JSON.parse(JSON.stringify(res.data.newsList));
                } else {
                    this.formData = { reply: false, replyType: 'all' };
                    this.replyModal = [];
                }
            }).catch(err => {
                this.views.getfindNews = false;
            });
        },
        //新增 小程序卡片 文字 img
        showAddReplyModal(type) {
            let self = this;
            let fl = type;
            if (this.replyModal.length > 1) {
                this.$message('回复内容最多可设置2条');
                return;
            }
            let obj = JSON.parse(JSON.stringify(self[fl]));
            Object.keys(obj).map(el => {
                obj[el] = '';
            });
            self[fl] = Object.assign({}, obj);
            this.replyModalType = 'add';
            self.views[fl] = true;
        },
        //编辑  小程序卡片 文字 img
        showEditReplyModal(item, i) {
            let self = this;
            this[item.type] = JSON.parse(JSON.stringify(item));
            self.views[item.type] = true;
            if (item.type === 'miniprogrampage') {
                self.miniprogrampage.mediaSourseUrl = {
                    imageUrl: self.miniprogrampage.mediaSourseUrl
                };
            }
            this.replyModalType = i;
        },
        //保存   新增 || 编辑    小程序卡片 文字 img
        addCardForm(data) {
            let self = this;
            if (self.replyModalType === 'add') {
                self.replyModal.push(data);
            } else {
                self.replyModal.splice(self.replyModalType, 1, data);
            }
        },
        //删除
        delReplyPreviewTemplate(i) {
            let self = this;
            let arr = JSON.parse(JSON.stringify(self.replyModal));
            arr.splice(i, 1);
            self.replyModal = Object.assign([], arr);
        },
        //保存form
        save() {
            let self = this;
            let obj = JSON.parse(JSON.stringify(self.formData));
            obj.newsList = this.replyModal;
            if (obj.newsList.length < 1) {
                obj.reply = false;
            }
            obj.gzhId = this.query.gzh.appid;
            if (this.views.save) {
                return;
            }
            this.views.save = true;
            __WEBPACK_IMPORTED_MODULE_1__scripts_module_axios__["default"].post('/api/wechat-service/wechat/more/saveNews', obj).then(res => {
                self.views.save = false;
                if (res.code === '000') {
                    this.$message.success('添加成功');
                    this.getfindNews();
                }
            }).catch(err => {
                self.views.save = false;
            });
        }
    },
    created() {
        let self = this;
        let hash = window.location.hash;
        if (hash != '') {
            try {
                let decoded = self.$base64Decode(hash.slice(1));
                if (typeof decoded == 'object') {
                    self.query = decoded;
                }
            } catch (error) {}
        }
        if (!self.query.gzh) {
            self.$set(self.query, 'gzh', DSP.gzh[0]);
        }
        this.getfindNews();
    }

});

/***/ }),

/***/ 8:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


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