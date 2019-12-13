/* jshint esversion: 6 */

import Vue from '@/scripts/module/vue';
import axios from '@/scripts/module/axios';

let forget = new Vue({
    el: '#app',
    delimiters: ['{[', ']}'],
    data() {
        //账号验证
        let mobileValidator = (rule, value, callback) => {
            let m = /^0?(11|12|13|14|15|16|17|18|19)[0-9]{9}$/;
            if (m.test(this.ruleForm.mobile)) {
                callback();
            } else {
                callback(new Error('手机号不正确'));
            }
            this.ruleForm.ss="";
        };
        let oldpassword = (rule, value, callback) => {
            if (this.ruleForm.password.length>4 &&this.ruleForm.password.length<23||value.length===0) {
                callback();
            } else {
                callback(new Error('密码强度太弱'));
            }
            this.ruleForm.ss="";
            callback();
        };
        let newpassword = (rule, value, callback) => {
            if (this.ruleForm.password === value) {
                callback();
            } else {
                callback(new Error('两次密码不一样'));
            }
            this.ruleForm.ss="";
            callback();
        };
        return {
            ruleForm:{
                mobile: '',
                password:"",
                newPassword:"",
                validation:"",
                validation1:"发送验证码",
                time:"q",
                ok:"重置密码"
            },
            rules: {
                mobile: [
                    {validator: mobileValidator, trigger: 'blur'}
                ],
                password: [
                    {validator:oldpassword, trigger: 'blur'},
                ],
                newpassword: [
                    {validator:newpassword, trigger: 'blur'},
                ],
            },
            //验证码
            yesNo:{
                timer: null,
                show: true,
                count: '',
            }
        };
    },
    methods: {
        getCode:function () {
            let self = this;
                const TIME_COUNT = 60;
            let m = /^0?(11|12|13|14|15|16|17|18|19)[0-9]{9}$/;
            if (m.test(this.ruleForm.mobile)) {
                if (!this.yesNo.timer) {
                    this.yesNo.count = TIME_COUNT;
                    this.yesNo.show = false;
                    this.yesNo.timer = setInterval(() => {
                        
                        if (this.yesNo.count > 0 && this.yesNo.count <= TIME_COUNT) {
                            this.yesNo.count--;
                        } else {
                            this.yesNo.show = true;
                            clearInterval(this.yesNo.timer);
                            this.yesNo.timer = null;
                        }
                    }, 1000);
                }
                if(this.ruleForm.validation1==='发送验证码'){
                    let mobile = this.ruleForm.mobile;
                    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
                    axios({
                        method: 'post',
                        url: '/api/message/send/captcha',
                        headers: {
                            'Content-type': 'application/x-www-form-urlencoded'
                        },
                        params: {
                            captchaType: 'changePwd',
                            mobile:mobile
                        }
                    }).then(res=>{
                        if(res.code !== '000'){
                            self.yesNo.show = true;
                            clearInterval(this.yesNo.timer);
                            self.yesNo.timer = null;
                        }
                    });
                }
            } else {
                this.$message.error( '手机号格式不正确');
            }
        },
        submitForm(){
            let m = /^0?(13|14|15|17|18|19)[0-9]{9}$/;
            if(! m.test(this.ruleForm.mobile)){
                forget.$message.error('手机格式不正确');
            }else if(this.ruleForm.validation.length !== 6){
                forget.$message.error('请输入6位验证码');
            }else if(this.ruleForm.password !== this.ruleForm.newPassword){
                forget.$message.error('两次密码不一样');
            } else if(this.ruleForm.password<6){
                forget.$message.error( '密码太过简单');
            } else {
                let mobile = this.ruleForm.mobile;
                forget.$message({
                    type:'success',
                    dangerouslyUseHTMLString: true,
                    message: `<a href="/login">修改成功3秒后自动跳转到首页</a>`
                });


                axios({
                    method: 'put',
                    url: '/api/privilege/auth/password/reset',
                    params: {
                        mobile:mobile,
                        code: forget.ruleForm.validation,
                        onePass:forget.ruleForm.password,
                        twoPass:forget.ruleForm.newPassword
                    }
                }).then(response => {
                    const result = response;
                    if(result.success){
                        forget.$message({
                            type:'success',
                            dangerouslyUseHTMLString: true,
                            message: `<a href="/login">修改成功3秒后，自动跳转到登录页</a>`
                        });
                        setTimeout(function () {
                            window.location.href = '/logout';
                        }, 3000);
                    }
                }).catch(error => {
                    console.error('error: %o', error);
                });
            }
        }
    },

});
