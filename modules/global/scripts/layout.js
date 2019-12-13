/* jshint esversion: 6 */
import axios from '@/scripts/module/axios';
import enums from '@/scripts/module/enums';

new Vue({
    el: '#layout-header-vue',
    delimiters: ['{[', ']}'],

    data() {
        return {
            total: 0,//未读条数
            query:'',
            meta:{
                BRAND:enums.BRAND,                              //品  牌
                EMPLOYEE_STATUS:enums.EMPLOYEE_STATUS,          //员  工--状态
                COOPERATOR_TYPE:enums.COOPERATOR_TYPE,          //合作方--类型
                APPROVAL_STATUS:enums.APPROVAL_STATUS,          //合作方--状态
            }
        };
    },

    methods: {//进表单
        gotoDSP() {
            window.open(DSP.globalConfig.sso.dsp + '/passport/sso?url=/&token=' + DSP.token + '&org=' + DSP.user.currPosition.orgId + '&position=' + DSP.user.currPosition.positionId);
        },
    }
});

(function ()
{
    /**
     * 菜单栏收缩与展开
     */
    var sideBar = document.querySelector(".sogal-layout.layout-aside");
    var sideBarCollapseBtn = document.querySelector(".sogal-layout.layout-aside .collapse-button");
    var menus = document.querySelectorAll(".sogal-layout.layout-aside .menu"); //展开时样式
    var collapseMenus = document.querySelectorAll(".sogal-layout.layout-aside.collapse .menu"); //折叠时

    //菜单栏收缩与展开
    if (sideBarCollapseBtn) {
        sideBarCollapseBtn.onclick = function () {
            if (sideBar.classList.length < 3) {
                sideBar.classList.add('collapse');
                document.cookie = 'menuCollapsed = true; path=/';
            } else {
                //sideBar折叠状态切换到展开状态
                sideBar.classList.remove('collapse');
                document.cookie = 'menuCollapsed = false; path=/';
            }

            collapseMenus = document.querySelectorAll(".sogal-layout.layout-aside.collapse .menu"); //折叠时
            if (collapseMenus.length > 0) {
                showSubMenu('open');
            } else {
                showSubMenu('close');
                toggleSubMenu();

                menus.forEach(node => {
                    node.onmouseenter = function () {
                        return false;
                    };
                });
            }
        };
    }

    //点击一级菜单，展开或隐藏二级菜单
    function toggleSubMenu() {
        menus.forEach(function (m) {
            m.onclick = function (event) {
                if (event.target.offsetParent.classList.contains('sub-menu-item') || event.target.offsetParent.classList.contains('sub-menu')) {
                    //忽略子菜单点击事件
                    return;
                }
                // if (m.classList && m.classList.contains('active')) {
                //     //忽略active状态菜单的点击事件
                //     return;
                // }

                // if (m.classList && m.classList.contains('active')) {
                //     m.classList.remove('active');
                // } else {
                //     m.classList.add('active');
                // }

                if (m.classList && m.classList.contains('active')) {
                    //nothing to do
                } else {
                    menus.forEach(function (m2) {
                        m2.classList.remove('active');
                    });
                    m.classList.add('active');
                }
            };
        });
    }

    //移入一级菜单，展开或隐藏二级菜单
    function showSubMenu(type) {
        if (type === 'open') {
            collapseMenus.forEach(function (nodes) {
                /*
                *  情况- 元素距离可视窗口的高度 + sub的高度 < document.body.clientHeight;正常显示
                * */
                nodes.onmouseenter = function (e) {                                 //可视窗口的高度
                    let sub = nodes.querySelectorAll('ul.sub-menu')[0];
                    if (sub) {
                        let offsetBodyHeight = e.clientY - e.offsetY;
                        let clientHeight = document.body.clientHeight;
                        let subHeight = sub.offsetHeight;                                           //ul的高度

                        if (offsetBodyHeight + subHeight < clientHeight) {
                            sub.style.top = offsetBodyHeight + 'px';
                        } else {
                            sub.style.top = clientHeight - subHeight + 'px';
                        }
                    }
                };
            });
        } else {
            menus.forEach(function (nodes) {
                let sub = nodes.querySelectorAll('ul.sub-menu')[0];
                if (sub) {
                    sub.style.top = 0 + 'px';
                }
            });
            return false;
        }
    }

    if (collapseMenus.length > 0) {
        showSubMenu('open');
    } else {
        toggleSubMenu();
    }

    /**
     * 修改密码
     */
    var modifyPwd = document.querySelector(".modify-password");//密码盒子显示隐藏
    var modifyPwdTemplate = document.querySelector("#modifyPwdTemplate");
    if (modifyPwd) {
        //点击修改密码
        modifyPwd.onclick = function () {

            if (!document.querySelector('.dsp-modify-password-dialog')) {
                let modifyPwdDialog = document.createElement('div');
                modifyPwdDialog.classList.add('dsp-modify-password-dialog');
                modifyPwdDialog.innerHTML = modifyPwdTemplate.innerHTML;
                document.body.appendChild(modifyPwdDialog);

                //3个密码输入框
                var inputs = modifyPwdDialog.querySelectorAll(".input-change-password");
                var prompt = modifyPwdDialog.querySelector(".prompt-change-password");
                //修改密码按钮
                var submit = modifyPwdDialog.querySelector(".el-button[role=submit]");
                submit.addEventListener('click', function () {
                    if (inputs[0].value.length == 0) {
                        prompt.innerText = '请输入旧密码';
                        return;
                    }

                    if (inputs[1].value.length < 6 || inputs[2].value.length < 6) {
                        prompt.innerText = '新密码不得少于6位';
                        return;
                    }

                    if (inputs[1].value !== inputs[2].value) {
                        prompt.innerText = '两次输入的新密码不一致';
                        return;
                    }

                    var pattern = new RegExp(/^(([a-z]+[0-9]+)|([0-9]+[a-z]+))[a-z0-9]*$/i);
                    if (!pattern.test(inputs[1].value)) {
                        prompt.innerText = '新密码太过简单，必须为数字和字母组合';
                        return;
                    }

                    if (inputs[0].value === inputs[2].value) {
                        prompt.innerText = '新密码与旧密码不能相同';
                        return;
                    }

                    var obj = {
                        mobile: DSP.user && DSP.user.mobile || '',
                        oldPass: inputs[0].value,
                        newPass: inputs[2].value
                    };

                    axios({
                        url: '/api/privilege/auth/password',
                        method: 'put',
                        params: obj
                    }).then(function (response) {
                        if (response.success) {
                            // document.querySelector('.dsp-modify-password-dialog').remove();
                            modifyPwdDialog.remove();

                            if (Vue && Vue.prototype.$message) {
                                Vue.prototype.$message({
                                    message: '密码修改成功，请重新登录',
                                    type: 'success',
                                    duration: 3000,
                                    onClose: function () {
                                        window.location.href = '/logout';
                                    }
                                });
                            } else {
                                alert('密码修改成功，请重新登录');
                                window.location.href = '/logout';
                            }
                        }
                    });
                });
            }
        };
    }

    /**
     * 职位切换
     */
    var positions = document.querySelectorAll(".menu-dropdown > .sub-menu.position");
    if (positions && positions.length && DSP && DSP.user && DSP.user.positions) {
        positions.forEach(function (pos, index) {
            var datas = DSP.user.positions;
            var strCookie = document.cookie;
            var position;
            var org;
            // 根据cookie找到指定的职位
            var arrCookie = strCookie.split(";");
            for (var i = 0; i < arrCookie.length; i++) {
                var c = arrCookie[i].split("=");
                if (c[0].indexOf('position') != -1) {
                    position = c[1];
                }
                if (c[0].indexOf('org') != -1) {
                    org = c[1];
                }
            }
            pos.classList.remove('active');
            // 遍历循环职位，找到与cookie中的positionId 一致的职位加active
            if (datas[index] && datas[index].positionId === position && datas[index].orgId === org) {
                // data.active = true;
                pos.classList.add('active');
            }
            pos.onclick = function (event) {
                positions.forEach(function (po) {
                    po.classList.remove('active');
                });
                pos.classList.add('active');
                var position = DSP.user.positions[index];
                document.cookie = 'position=' + position.positionId + ";path=/;expires=Fri, 31 Dec 9999 23:59:59 GMT;";
                document.cookie = 'org=' + position.orgId + ";path=/;expires=Fri, 31 Dec 9999 23:59:59 GMT;";
                window.location.reload();
            };
        });
    }
})();
