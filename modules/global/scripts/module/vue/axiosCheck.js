/* jshint esversion: 6 */
import axiosCheck from '../../../components/ui/dsp-login-check.vue';
//参数配置
const defaults = {
    show: false,
    title: '',
    text: '',
    button: []

};

const confirmVueConstructor = Vue.extend(axiosCheck);
var axiosCheckElId = null;
//这里关闭的时候返回promise
const confirmBox = (options = {}) => {
    let parent = document.body;

    if (axiosCheckElId) {
        return null;
    }

    let instance = new confirmVueConstructor({
        el: document.createElement('div'),
        data: options
    });

    parent.appendChild(instance.$el);
    axiosCheckElId = instance;
    instance.close = function () {
        instance.show = false;
        parent.removeChild(instance.$el);
        axiosCheckElId = null;
    };

    Vue.nextTick(() => {
        instance.show = true;
    });
    return instance;
};

const closeBox = () => {
    if (axiosCheckElId) {
        axiosCheckElId.close();
    }
};

export default {
    closeBox: closeBox,
    confirmBox: confirmBox
};





