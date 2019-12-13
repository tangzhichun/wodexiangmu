/* jshint esversion: 6 */

import Vue from '@/scripts/module/vue';
import axios from '@/scripts/module/axios';

new Vue({
    el: '#app',
    delimiters: ['{[', ']}'],
    data() {
        //账号验证
        let mobileValidator = (rule, value, callback) => {
            let m = /^0?(11|12|13|14|15|16|17|18|19)[0-9]{9}$/;
            this.ruleForm.mobile = this.ruleForm.mobile.replace(/\s/g,"");
            console.log(this.ruleForm.mobile);
            if (this.ruleForm.mobile.length<1) {
                callback(new Error('请输入用户名'));
            }else if(m.test(this.ruleForm.mobile) && this.ruleForm.mobile.length === 11) {
                callback();
            } else {
                callback(new Error('手机号不正确'));
            }
            this.ruleForm.ss="";
        };
        return {
            form: {
                mobile: '',
                password: '',
            },
            rules: {
                mobile: [
                    {validator: mobileValidator, trigger: 'blur'}
                ],
                // password:[
                //     {validator: oldpassword, trigger: 'blur'}
                // ],
            },
            ruleForm: {
                go: "登录",
                ss: "",
                checked: false,
                mobile: '',
                password: '',
            },
        };
    },
    methods: {
        //  是否登录
        submitForm: function (formName) {
            if(this.ruleForm.password === ''){
                this.ruleForm.ss = '你还没有输入密码';
                return;
            }
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.ruleForm.go = "登录中...";
                    console.log(this.ruleForm.checked);
                    axios.post('/login' + window.location.search,
                        {
                            "mobile": this.ruleForm.mobile,
                            "password": this.ruleForm.password,
                            "keepMe": this.ruleForm.checked
                        }
                    ).then(response => {
                        const result = response;
                        if (result.success) {
                            //登录成功
                            window.location.href = result.redirect || '/dashboard';
                        } else {
                            this.ruleForm.ss = result.message;
                            this.ruleForm.go = "登录";
                        }
                    }).catch(error => {
                        this.ruleForm.ss = '网络连接错误，请稍后重试';
                        this.ruleForm.go = "登录";
                    });
                } else {
                    return false;
                }
            });
        },
        //
        focusMobile:function () {
            this.$refs.ruleForm.clearValidate();
        }
    },
    watch: {
        'ruleForm.password'(val, oldVal){
            if(val.length > 0){
                this.ruleForm.ss = '';
            }
        },
    }

});
