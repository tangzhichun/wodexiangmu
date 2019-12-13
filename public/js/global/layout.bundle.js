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
/******/ 	return __webpack_require__(__webpack_require__.s = 354);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(3);
var isBuffer = __webpack_require__(14);

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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__error__ = __webpack_require__(9);
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/* jshint esversion: 6 */




var err = {
    code: "810",
    message: '页面打开人员与当前操作人员不一致',
    success: false
};

__WEBPACK_IMPORTED_MODULE_0_axios___default.a.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

__WEBPACK_IMPORTED_MODULE_0_axios___default.a.interceptors.request.use(function (config) {

    //逐级遍历对象的属性，去除空格
    var trim = function trim(obj) {
        for (var key in obj) {
            if (obj[key] || obj[key] == 0) {
                if (typeof obj[key] === 'string') {
                    obj[key] = obj[key].trim();

                    //空字符串替换成null
                    if (obj[key] == '') {
                        delete obj[key];
                    }
                } else if (_typeof(obj[key]) === 'object') {
                    trim(obj[key]);
                }
            } else {
                delete obj[key];
            }
        }
    };

    //提交数据前，去除首尾空格
    var data = config.params || config.data || {};
    trim(data);

    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

__WEBPACK_IMPORTED_MODULE_0_axios___default.a.interceptors.response.use(function (response) {
    //处理200返回码
    if (response && response.status == '200' && response.data) {
        var result = response.data;
        if (result.success) {
            return result;
        } else {
            //处理全局错误
            if (result.code == '811' || result.code == '810') {
                //取前端翻译后的错误码、或者后端直接抛出的错误消息，都没有值，则提示默认错误消息
                var errorMsg = __WEBPACK_IMPORTED_MODULE_1__error__["default"].SYSTEM_ERROR[result.code] || result.message || __WEBPACK_IMPORTED_MODULE_1__error__["default"].SYSTEM_ERROR.DEFAULT;
                if (Vue && Vue.prototype.$message) {
                    Vue.prototype.$message({
                        message: errorMsg,
                        type: 'error',
                        duration: 5000,
                        onClose: function onClose() {
                            window.location.href = '/logout';
                        }
                    });
                }
            } else {
                //取前端翻译后的错误码、或者后端直接抛出的错误消息，都没有值，则提示默认错误消息
                var _errorMsg = __WEBPACK_IMPORTED_MODULE_1__error__["default"].SYSTEM_ERROR[result.code] || result.message || __WEBPACK_IMPORTED_MODULE_1__error__["default"].SYSTEM_ERROR.DEFAULT;
                if (Vue && Vue.prototype.$message) {
                    Vue.prototype.$message.error(_errorMsg);
                }
                return result;
            }
        }
    } else {
        return response;
    }
}, function (err) {
    //取前端翻译后的错误码，如没有值，则提示默认错误消息。不直接取后端直接抛出的错误消息，因为可能包含异常堆栈等敏感且不友好的提示信息。
    var errorMsg = __WEBPACK_IMPORTED_MODULE_1__error__["default"].NETWORK_ERROR[err.response && err.response.status] || __WEBPACK_IMPORTED_MODULE_1__error__["default"].SYSTEM_ERROR.DEFAULT;
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

/***/ 12:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(13);

/***/ }),

/***/ 13:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);
var bind = __webpack_require__(3);
var Axios = __webpack_require__(15);
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
axios.CancelToken = __webpack_require__(29);
axios.isCancel = __webpack_require__(7);

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(30);

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),

/***/ 14:
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

/***/ 15:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defaults = __webpack_require__(2);
var utils = __webpack_require__(0);
var InterceptorManager = __webpack_require__(24);
var dispatchRequest = __webpack_require__(25);

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

/***/ 16:
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

/***/ 17:
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

/***/ 18:
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

/***/ 19:
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

/***/ 2:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(0);
var normalizeHeaderName = __webpack_require__(16);

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

/***/ 21:
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

/***/ 22:
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

/***/ 23:
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

/***/ 24:
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

/***/ 25:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);
var transformData = __webpack_require__(26);
var isCancel = __webpack_require__(7);
var defaults = __webpack_require__(2);
var isAbsoluteURL = __webpack_require__(27);
var combineURLs = __webpack_require__(28);

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

/***/ 26:
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

/***/ 27:
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

/***/ 28:
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

/***/ 29:
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

/***/ 354:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__scripts_module_axios__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__scripts_module_enums__ = __webpack_require__(43);
/* jshint esversion: 6 */



new Vue({
    el: '#layout-header-vue',
    delimiters: ['{[', ']}'],

    data: function data() {
        return {
            total: 0, //未读条数
            query: '',
            meta: {
                BRAND: __WEBPACK_IMPORTED_MODULE_1__scripts_module_enums__["default"].BRAND, //品  牌
                EMPLOYEE_STATUS: __WEBPACK_IMPORTED_MODULE_1__scripts_module_enums__["default"].EMPLOYEE_STATUS, //员  工--状态
                COOPERATOR_TYPE: __WEBPACK_IMPORTED_MODULE_1__scripts_module_enums__["default"].COOPERATOR_TYPE, //合作方--类型
                APPROVAL_STATUS: __WEBPACK_IMPORTED_MODULE_1__scripts_module_enums__["default"].APPROVAL_STATUS //合作方--状态
            }
        };
    },


    methods: {
        //进表单
        gotoDSP: function gotoDSP() {
            window.open(DSP.globalConfig.sso.dsp + '/passport/sso?url=/&token=' + DSP.token + '&org=' + DSP.user.currPosition.orgId + '&position=' + DSP.user.currPosition.positionId);
        }
    }
});

(function () {
    /**
     * 菜单栏收缩与展开
     */
    var sideBar = document.querySelector(".sogal-layout.layout-aside");
    var sideBarCollapseBtn = document.querySelector(".sogal-layout.layout-aside .collapse-button");
    var menus = document.querySelectorAll(".sogal-layout.layout-aside .menu"); //展开时样式
    var collapseMenus = document.querySelectorAll(".sogal-layout.layout-aside.collapse .menu"); //折叠时

    //菜单栏收缩与展开
    if (sideBarCollapseBtn) {
        sideBarCollapseBtn.onclick = function () {
            if (sideBar.classList.length < 3) {
                sideBar.classList.add('collapse');
                document.cookie = 'menuCollapsed = true; path=/';
            } else {
                //sideBar折叠状态切换到展开状态
                sideBar.classList.remove('collapse');
                document.cookie = 'menuCollapsed = false; path=/';
            }

            collapseMenus = document.querySelectorAll(".sogal-layout.layout-aside.collapse .menu"); //折叠时
            if (collapseMenus.length > 0) {
                showSubMenu('open');
            } else {
                showSubMenu('close');
                toggleSubMenu();

                menus.forEach(function (node) {
                    node.onmouseenter = function () {
                        return false;
                    };
                });
            }
        };
    }

    //点击一级菜单，展开或隐藏二级菜单
    function toggleSubMenu() {
        menus.forEach(function (m) {
            m.onclick = function (event) {
                if (event.target.offsetParent.classList.contains('sub-menu-item') || event.target.offsetParent.classList.contains('sub-menu')) {
                    //忽略子菜单点击事件
                    return;
                }
                // if (m.classList && m.classList.contains('active')) {
                //     //忽略active状态菜单的点击事件
                //     return;
                // }

                // if (m.classList && m.classList.contains('active')) {
                //     m.classList.remove('active');
                // } else {
                //     m.classList.add('active');
                // }

                if (m.classList && m.classList.contains('active')) {
                    //nothing to do
                } else {
                    menus.forEach(function (m2) {
                        m2.classList.remove('active');
                    });
                    m.classList.add('active');
                }
            };
        });
    }

    //移入一级菜单，展开或隐藏二级菜单
    function showSubMenu(type) {
        if (type === 'open') {
            collapseMenus.forEach(function (nodes) {
                /*
                *  情况- 元素距离可视窗口的高度 + sub的高度 < document.body.clientHeight;正常显示
                * */
                nodes.onmouseenter = function (e) {
                    //可视窗口的高度
                    var sub = nodes.querySelectorAll('ul.sub-menu')[0];
                    if (sub) {
                        var offsetBodyHeight = e.clientY - e.offsetY;
                        var clientHeight = document.body.clientHeight;
                        var subHeight = sub.offsetHeight; //ul的高度

                        if (offsetBodyHeight + subHeight < clientHeight) {
                            sub.style.top = offsetBodyHeight + 'px';
                        } else {
                            sub.style.top = clientHeight - subHeight + 'px';
                        }
                    }
                };
            });
        } else {
            menus.forEach(function (nodes) {
                var sub = nodes.querySelectorAll('ul.sub-menu')[0];
                if (sub) {
                    sub.style.top = 0 + 'px';
                }
            });
            return false;
        }
    }

    if (collapseMenus.length > 0) {
        showSubMenu('open');
    } else {
        toggleSubMenu();
    }

    /**
     * 修改密码
     */
    var modifyPwd = document.querySelector(".modify-password"); //密码盒子显示隐藏
    var modifyPwdTemplate = document.querySelector("#modifyPwdTemplate");
    if (modifyPwd) {
        //点击修改密码
        modifyPwd.onclick = function () {

            if (!document.querySelector('.dsp-modify-password-dialog')) {
                var modifyPwdDialog = document.createElement('div');
                modifyPwdDialog.classList.add('dsp-modify-password-dialog');
                modifyPwdDialog.innerHTML = modifyPwdTemplate.innerHTML;
                document.body.appendChild(modifyPwdDialog);

                //3个密码输入框
                var inputs = modifyPwdDialog.querySelectorAll(".input-change-password");
                var prompt = modifyPwdDialog.querySelector(".prompt-change-password");
                //修改密码按钮
                var submit = modifyPwdDialog.querySelector(".el-button[role=submit]");
                submit.addEventListener('click', function () {
                    if (inputs[0].value.length == 0) {
                        prompt.innerText = '请输入旧密码';
                        return;
                    }

                    if (inputs[1].value.length < 6 || inputs[2].value.length < 6) {
                        prompt.innerText = '新密码不得少于6位';
                        return;
                    }

                    if (inputs[1].value !== inputs[2].value) {
                        prompt.innerText = '两次输入的新密码不一致';
                        return;
                    }

                    var pattern = new RegExp(/^(([a-z]+[0-9]+)|([0-9]+[a-z]+))[a-z0-9]*$/i);
                    if (!pattern.test(inputs[1].value)) {
                        prompt.innerText = '新密码太过简单，必须为数字和字母组合';
                        return;
                    }

                    if (inputs[0].value === inputs[2].value) {
                        prompt.innerText = '新密码与旧密码不能相同';
                        return;
                    }

                    var obj = {
                        mobile: DSP.user && DSP.user.mobile || '',
                        oldPass: inputs[0].value,
                        newPass: inputs[2].value
                    };

                    Object(__WEBPACK_IMPORTED_MODULE_0__scripts_module_axios__["default"])({
                        url: '/api/privilege/auth/password',
                        method: 'put',
                        params: obj
                    }).then(function (response) {
                        if (response.success) {
                            // document.querySelector('.dsp-modify-password-dialog').remove();
                            modifyPwdDialog.remove();

                            if (Vue && Vue.prototype.$message) {
                                Vue.prototype.$message({
                                    message: '密码修改成功，请重新登录',
                                    type: 'success',
                                    duration: 3000,
                                    onClose: function onClose() {
                                        window.location.href = '/logout';
                                    }
                                });
                            } else {
                                alert('密码修改成功，请重新登录');
                                window.location.href = '/logout';
                            }
                        }
                    });
                });
            }
        };
    }

    /**
     * 职位切换
     */
    var positions = document.querySelectorAll(".menu-dropdown > .sub-menu.position");
    if (positions && positions.length && DSP && DSP.user && DSP.user.positions) {
        positions.forEach(function (pos, index) {
            var datas = DSP.user.positions;
            var strCookie = document.cookie;
            var position;
            var org;
            // 根据cookie找到指定的职位
            var arrCookie = strCookie.split(";");
            for (var i = 0; i < arrCookie.length; i++) {
                var c = arrCookie[i].split("=");
                if (c[0].indexOf('position') != -1) {
                    position = c[1];
                }
                if (c[0].indexOf('org') != -1) {
                    org = c[1];
                }
            }
            pos.classList.remove('active');
            // 遍历循环职位，找到与cookie中的positionId 一致的职位加active
            if (datas[index] && datas[index].positionId === position && datas[index].orgId === org) {
                // data.active = true;
                pos.classList.add('active');
            }
            pos.onclick = function (event) {
                positions.forEach(function (po) {
                    po.classList.remove('active');
                });
                pos.classList.add('active');
                var position = DSP.user.positions[index];
                document.cookie = 'position=' + position.positionId + ";path=/;expires=Fri, 31 Dec 9999 23:59:59 GMT;";
                document.cookie = 'org=' + position.orgId + ";path=/;expires=Fri, 31 Dec 9999 23:59:59 GMT;";
                window.location.reload();
            };
        });
    }
})();

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

/***/ 5:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(0);
var settle = __webpack_require__(17);
var buildURL = __webpack_require__(19);
var parseHeaders = __webpack_require__(20);
var isURLSameOrigin = __webpack_require__(21);
var createError = __webpack_require__(6);
var btoa = (typeof window !== 'undefined' && window.btoa && window.btoa.bind(window)) || __webpack_require__(22);

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
      var cookies = __webpack_require__(23);

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

/***/ 6:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(18);

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