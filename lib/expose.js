'use strict';

module.exports = function () {
    return {
        $data: null,

        add: function (key, val) {
            let self = this;
            if (!self.$data) {
                self.$data = {};
            }

            this.$data[key] = val;
            return this;
        },

        /**
         * 暴露数据给JS
         * @returns {string}
         */
        get script() {
            let self = this;
            let name = 'DSP';

            let out = 'var ' + name + ' = {};';

            let keys = Object.keys(self.$data);
            if (keys && keys.length) {
                keys.forEach(function (key) {
                    out += name + '.' + key + ' = ' + JSON.stringify(self.$data[key]) + ';';
                });
            }

            self.$data = {};

            return out;
        }
    };
};