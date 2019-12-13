/* jshint esversion: 6 */

import Vue from '@/scripts/module/vue';
import axios from '@/scripts/module/axios';
import enums from "@/scripts/module/enums";

new Vue({
    el: '#app',
    delimiters: ['{[', ']}'],
    data: {
        // 业务字典
        meta: {
            //意向品类
            BRAND: enums.BRAND,
            // 年龄段
            AGES: enums.CUST_AGE_RANGE,
            // 房屋类型
            CUST_HOUSE_TYPE: enums.CUST_HOUSE_TYPE,
        },
        // 校验规则
        $validator: {
            rule: {
                information: {
                    name: {required: true, minLength: 2},
                    mobile: {
                        required: true,
                        minLength: 11,
                        //返回Promise对象
                        remote: function ($data, value) {
                            if (!value || value.length < 11) {
                                return Promise.resolve(true);
                            }
                            return axios.get(`/api/customer/duplicate/check/${value}`).then(response => {
                                //返回false，表示验证未通过；返回true，表示验证通过。
                                return response && response.success && !response.data;
                            });
                        }
                    },
                    ageRange: {required: true},
                    wechat: {required: true},
                    mobileAlt: {
                        minLength: 11,
                        //返回Promise对象
                        customize: function ($data, value) {
                            console.log(22);
                            let pass = true;
                            if ($data.information.mobile == $data.information.mobileAlt) {
                                pass = false;
                            }
                            //返回false，表示验证未通过；返回true，表示验证通过。
                            return Promise.resolve(pass);
                        }
                    }
                }
            }
        },
        information: {
            cooperatorId: null,
            name: null,
            mobile: null,
            source: null,
            secondSource: null,
            thirdSource: null,
            gender: "MALE",
            wechat: [],
            ageRange: null,
            remark: null,
            job: null,
            company: null,
            companyCity: null,
            companyArea: null,
            companyAddr: null,
            familyCity: null,
            familyArea: null,
            familyAddr: null,
            family: null,
            old: null,
            child: null,
        },
        // 日历控件配置
        pickerOptions: {
            disabledDate(time) {
                //只能选择今天以后的时间
                return time.getTime() < DSP.serverTime;
            }
        },
        // 防止重复提交
        saveLoading: false,
    },
    methods: {
        // 保存录入信息
        save() {
            console.log(this.$data.$validator);
            this.$data.$validator.validateAll().then(pass => {
                if (pass) {
                    var url = "/ui/form/submit";
                    var data = this.information;
                    this.saveLoading = true;
                    axios.post(url, data).then(response => {
                        this.saveLoading = false;
                        if (response.success) {
                            this.$message.success('录入客户成功!');
                        }
                    }).catch(error => {
                        this.saveLoading = false;
                        console.error('err: %o', error);
                    });
                }
            });
        }
    }
});