/* jshint esversion: 6 */

// import Vue from 'vue';
import directive from './directive';
import filter from './filter';
import method from './method';


Vue.directive('dsp-input-code', directive.code);
Vue.directive('dsp-input-integer', directive.integer);
Vue.directive('dsp-input-mobile', directive.mobile);
//座机电话和电话
Vue.directive('dsp-input-telephone', directive.telephone);
Vue.directive('dsp-input-number', directive.number);
Vue.directive('dsp-input-discount', directive.discount);
Vue.directive('dsp-input-captcha', directive.captcha);
Vue.directive('dsp-input-trim', directive.trim);
Vue.directive('dsp-input-rate', directive.percentRate);


Vue.directive('dsp-validate', directive.validate);
Vue.directive('dsp-form-validate', directive.validateForm);
Vue.directive('dsp-panel-collapsable', directive.collapsable);
Vue.directive('dsp-drapable', directive.imgdrag);


for (var prop in filter) {
    Vue.filter(prop, filter[prop]);

    if (!Vue.prototype.$filter) {
        Vue.prototype.$filter = {};
    }
    Vue.prototype.$filter[prop] = filter[prop];
}

for (var $method in method){
    Vue.prototype[$method] = method[$method];
}

export default Vue;

