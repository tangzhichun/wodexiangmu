<template>
    <el-dialog title="提示" :visible.sync="show"
               :show-close="false"
               close-on-press-escape="false"
               width="400px" :close-on-click-modal="false">
        <div style="width: 224px;height: 16px;text-align:center;">{{userInfo}}的登录已过期，请重新登录！</div>

        <div class="input-div">
            <div class="el-input el-input--small el-input-group el-input-group--prepend el-input--suffix">
                <div class="el-input-group__prepend">账号</div>
                <input type="text" v-model="mobile" autocomplete="off" class="el-input__inner" placeholder="请输入账号">
            </div>
        </div>
        <div class="input-div">
            <div class="el-input el-input--small el-input-group el-input-group--prepend el-input--suffix">
                <div class="el-input-group__prepend">密码</div>
                <input type="password" autocomplate="off"
                       v-model="password"
                       placeholder="请输入密码"
                       class="el-input__inner">
            </div>
        </div>
        <div style="font-size:12px;color:#fb932b;">返回登录页会丢失之前编辑的信息，建议当前页面直接登录！</div>

        <div slot="footer" class="dialog-footer align-right">
            <el-button @click="returnLoginPage" size="small">
                返回登录页
            </el-button>
            <el-button @click="login" size="small" type="primary">
                登录
            </el-button>
        </div>
    </el-dialog>
</template>

<script>
    import axios from '@/scripts/module/axios';

    export default {
        data() {
            return {
                cookie: null,
                mobile: null,
                password: null,
                userInfo: DSP.user.name,
                show: true,
                button: [],
                dangerouslyUseHTMLString: false,
                passwordType: "password",
            }
        },
        methods: {
            returnLoginPage() {
                document.cookie = "REFRESH_SIGN=false;path=/";
                window.location.href = '/logout';
            },
            login() {
                let self = this;
                if (self.mobile && !self.mobile.trim()) {
                    self.$message({
                        type: 'error',
                        message: '电话号码不能为空'
                    });
                    return
                } else if (!(/^1[34578]\d{9}$/.test(self.mobile))) {
                    self.$message({
                        type: 'error',
                        message: '手机号码格式有误'
                    });
                    return
                }
                if (!self.password || !self.password.trim()) {
                    self.$message({
                        type: 'error',
                        message: '密码不能为空'
                    });
                    return
                }
                axios.post('/login',
                    {
                        "mobile": self.mobile,
                        "password": self.password,
                    }
                ).then(response => {
                    const result = response;
                    if (result.success) {
                        document.cookie = "REFRESH_SIGN=false;path=/";
                        if (self.mobile != DSP.user.mobile) {
                            self.$message({
                                type: 'success',
                                message: '人员变动，进入首页'
                            });
                            setTimeout(function () {
                                window.location.href = '/dashboard';
                            }, 2000);
                        } else {
                            Vue.prototype.$message({
                                type: 'success',
                                message: '登录成功'
                            });
                            self.show = false;
                            self.close();
                        }
                    }
                });
            },
            setCookie(name, value) {
                var Days = 30;
                var exp = new Date();
                exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
                document.cookie = name + "=" + escape(value) + ";path=/;expires=" + exp.toGMTString();
            }
        },
        mounted() {
            this.mobile = DSP.user.mobile;
            this.setCookie("REFRESH_SIGN", true);
        }
    }
</script>

<style lang="less">
    .input-div {
        width: 358px;
        height: 39px;
        margin-top: 30px;
    }
</style>