/* jshint esversion: 6 */

export default {

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

        if (typeof(prop) != 'string') {
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
        if ((i1 != -1 && i2 != -1 && i1 < i2) || (i1 != -1 && i2 == -1)) {
            let p1 = prop.substr(0, i1);
            let p2 = prop.substr(i1, prop.length);
            let v1 = obj[p1];
            if (!v1) {
                return v1;
            } else if (typeof(v1) != 'object' || !(v1 instanceof Array)) {
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

        if (typeof(prop) != 'string') {
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
            if (obj[prop] && typeof(obj[prop]) == 'object' && !(obj[prop] instanceof Array)) {
                self.setProp(obj[prop], props.join('.'), val);
            } else {
                obj[prop] = {};
                self.setProp(obj[prop], props.join('.'), val);
                return;
            }
        } else {
            obj[prop] = val;
        }
    },
};