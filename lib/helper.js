'use strict';

/**
 * Handlebars Helper
 */
module.exports = {
    /**
     * 判断数组是否包含
     * @param array
     * @param target
     * @param options
     * @returns {*}
     */
    contains: function (array, target, options) {
        if (array && array.indexOf(target) == -1) {
            return options.inverse(this);
        } else {
            return options.fn(this);
        }
    },
    /**
     * 判断v1和v2是否相等
     * @param v1
     * @param v2
     * @param options
     * @returns {*}
     */
    eq: function (v1, v2, options) {
        if (v1 === v2) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    },
    /**
     * 判断v1和v2是否不等
     * @param v1
     * @param v2
     * @param options
     * @returns {*}
     */
    ne: function (v1, v2, options) {
        if (v1 !== v2) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    },
    /**
     * 判断多个条件社否成立
     * @returns {*}
     */
    and: function () {
        if (arguments.length <= 1) {
            return options.inverse(this);
        }

        arguments.pop();

        let r = true;
        arguments.forEach(arg => {
            r = r && arg;
        });

        if (!r) {
            return options.inverse(this);
        } else {
            return options.fn(this);
        }
    },
    /**
     * 判断数组是否为空
     * @returns {*}
     */
    empty: function (v1, options) {
        if (!v1) {
            return options.fn(this);
        } else if ((v1 instanceof Array) && !v1.length){
            return options.fn(this);
        }
        return options.inverse(this);
    },
};