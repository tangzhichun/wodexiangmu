/* jshint esversion: 6 */

import Vue from '@/scripts/module/vue';
import axios from '@/scripts/module/axios';
import enums from "@/scripts/module/enums";

new Vue({
    el: '#app',
    delimiters: ['{[', ']}'],
    data: {
        // 操作人
        operator: DSP && DSP.user || {},
        // 业务字典
        meta: {
            //意向品类
            INTENTION: enums.dict('INTENTION'),
            //意向品类
            BRAND: enums.BRAND,
            // 年龄段
            AGES: enums.CUST_AGE_RANGE,
            //家庭构成
            FAMILY_COMPOSITION: enums.dict('FAMILY_COMPOSITION'),
            // 区域
            REGION: enums.dict('REGION'),
            //客户来源
            KHLY: enums.dict('KHLY'),
            // 职业
            PROFESSION: enums.dict('PROFESSION'),
            // 房屋面积
            HOUSING_AREA: enums.dict('HOUSING_AREA'),
            // 房屋户型
            FWHX: enums.dict('FWHX'),
            // 装修阶段
            DECORATION_STAGE: enums.dict('DECORATION_STAGE'),
            // 装修风格
            DECORATION_STYLE: enums.dict('DECORATION_STYLE'),
            // 装修预算
            DECORATION_BUDGET: enums.dict('DECORATION_BUDGET'),
            // 装修进度
            START_DATE: enums.dict('START_DATE'),
            // 房屋类型
            CUST_HOUSE_TYPE: enums.CUST_HOUSE_TYPE,


        },
        // 校验规则
        $validator: {
            rule: {
                information: {
                    name: {required: true, minLength: 2},
                    mobileAlt: {
                        minLength: 11,
                        //返回Promise对象
                        customize: function ($data, value) {
                            let pass = true;
                            if ($data.information.mobile == $data.information.mobileAlt) {
                                pass = false;
                            }
                            //返回false，表示验证未通过；返回true，表示验证通过。
                            return Promise.resolve(pass);
                        }
                    },
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
                    // houses: {
                    //     idx: {
                    //         brand: {
                    //             required: true,
                    //         }
                    //     }
                    // }
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
            houses: [
                // {
                //     id: 1,
                //     opportunities: [],
                //     require: [],
                //     intention: null,
                //     intentions: [],
                //     houseCity: [],
                //     specialNeed: null,
                //     amount: null,
                //     houseStyle: null,
                //     houseModel: null,
                //     houseArea: null,
                //     houseType: "MPF",
                //     houseStage: null,
                //     startDate: null,
                //     city: [],
                //     area: null,
                //     addr: null,
                //
                // }
            ]
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
        saveIt($event) {
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
        },
        // 添加销售机会
        addOpportunity() {
            var id = new Date().getTime() + Math.random();
            var object = {
                id,
                opportunities: [],
                require: [],
                houseCity: [],
                specialNeed: null,
                amount: null,
                houseStyle: null,
                houseModel: null,
                houseArea: null,
                houseType: "MPF",
                houseStage: null,
                startDate: null,
                intention: null,
                intentions: [],
                city: [],
                area: null,
                addr: null,
            };
            this.information.houses.push(object);

        },
        // 删除销售机会
        deleteOpportunity(index) {
            this.information.houses.splice(index, 1);
        },
        // 地址下拉框改变后，将市区拆为2个字段存储
        addressChange(value) {
            this.information.familyCity = value[0];
            this.information.familyArea = value[1];

        },
        officeAddressChange(value) {
            this.information.companyCity = value[0];
            this.information.companyArea = value[1];
        },
        reset() {
            this.$data.$validator.reset();
        }
    }
});