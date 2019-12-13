/* jshint esversion: 6 */

import Vue from '@/scripts/module/vue';
import axios from '@/scripts/module/axios';
import enums from "@/scripts/module/enums";

new Vue({
    el: '#app',
    delimiters: ['{[', ']}'],
    data: {
        activeTab: 'menu',
        activeMenu: null,
        activeMenuId: null,
        mode: 'view',
        menus:[],
        subMenus: [],
        privileges:[],
        // 作用域枚举类
        MENU_SCOPE: enums.MENU_SCOPE,
        currenScope: null,
        rules: {
            name: [
                {required: true, message: '请输入菜单名称', trigger: 'blur'},
            ],
            sortOrder: [
                {required: true, message: '请选择排序顺序', trigger: 'blur'},
            ],
            url: [
                {required: true, message: '请输入链接地址', trigger: 'blur'},
                {
                    validator: function (rule, value, callback) {
                        if (/^\//.test(value) == false) {
                            callback(new Error("请输入以/开头的链接地址"));
                        } else {
                            callback();
                        }
                    }, trigger: 'blur'
                }
            ],
            privilege: [
                {required: true, message: '请输入权限值', trigger: 'blur'},

            ],
        },
        buttonRules: {
            name: [
                {required: true, message: '请输入权限名称', trigger: 'change'},
            ],
            sortOrder: [
                {required: true, message: '请选择排序顺序', trigger: 'change'},
            ],
            privilege: [
                {required: true, message: '请输入权限值', trigger: 'change'},

            ],
        },
        secondShow: false,
        menuNumber: 1,
        radio: 2,
        // 作用域（默认为主营）
        newMenu: {
            name: null,
            url: null,
            privilege: null,
            sortOrder: 1,
            parentId: null,
            type: "MENU",
            style: null,
            children: []
        },
        childMenu: {
            name: null,
            url: null,
            privilege: null,
            sortOrder: 1,
            parentId: null,
            type: "MENU",
            style: null,
            children: [],
        },
        button: {
            name: null,
            sortOrder: 1,
            type: "BUTTON",
            privilege: null,
            parentId: null,
            style: null,
        },
        newButton: {
            name: null,
            sortOrder: 1,
            type: "BUTTON",
            privilege: null,
            parentId: null,
            style: null,
        },
        choiceOperation: true,
        editMenuForm: {},
        // 自定义校验方法
        validate: {
            saveMessage: '',
            nameValidate: function (value) {
                if (value == null || value == '') {
                    this.nameMessage = '名字不能为空';
                    this.saveMessage = '必填项不能为空';
                    return false;
                } else {
                    this.nameMessage = '';
                    // this.saveMessage='';
                    return true;
                }

            },
            nameMessage: "",
            styleValidate: function (value) {
                if (value == null || value == '') {
                    this.styleMessage = '字体图标不能为空';
                    this.saveMessage = '必填项不能为空';
                    return false;
                } else {
                    this.styleMessage = '';
                    // this.saveMessage='';
                    return true;
                }

            },
            styleMessage: "",
            privilegeValidate: function (value) {
                if (value == null || value == '') {
                    this.privilegeMessage = '权限不能为空';
                    this.saveMessage = '必填项不能为空';
                    return false;
                } else {
                    this.privilegeMessage = '';
                    return true;
                }

            },
            privilegeMessage: "",
            urlValidate: function (value) {
                if (value == null || value == '') {
                    this.urlMessage = '链接不能为空';
                    this.saveMessage = '必填项不能为空';
                    return false;
                } else if (/^\//.test(value) != true) {
                    this.urlMessage = '链接必须以/开头';
                } else {
                    this.urlMessage = '';
                    return true;
                }
            },
            urlMessage: "",
            childNameValidate: function (value, index) {
                if (value == null || value == '') {
                    this.childNameMessage[index].message = '子级菜单名称不能为空';
                    this.saveMessage = '必填项不能为空';
                    return false;
                } else {
                    this.childNameMessage[index].message = '';
                    return true;
                }

            },
            childNameMessage: [
                {message: ''}
            ],
            childUrlValidate: function (value, index) {
                if (value == null || value == '') {
                    this.childUrlMessage[index].message = '子级菜单链接地址不能为空';
                    this.saveMessage = '必填项不能为空';
                    return false;
                } else {
                    this.childUrlMessage[index].message = '';
                    this.saveMessage = '';
                    return true;
                }

            },
            childUrlMessage: [
                {message: ''}
            ],
            childPrivilegeValidate: function (value, index) {
                if (value == null || value == '') {
                    this.childPrivilegeMessage[index].message = '子级菜单权限不能为空';
                    this.saveMessage = '必填项不能为空';
                    return false;
                } else {
                    this.childPrivilegeMessage[index].message = '';
                    return true;
                }

            },
            childPrivilegeMessage: [
                {message: ''}
            ],
        },
        // 图标选择框
        icons: enums.MENU_ICON,
        queryRole:'',
        privilegeData:null,
        roleList:[]
    },
    methods: {
        // 点击作用域，展示对应二级列表
        checkScope(data) {
            this.currenScope = data;
        },
        // 所选一级菜单改变时触发
        clickMenu(data) {
            this.privilege(data);
            this.distributeChildren(data.children);

            this.activeMenu = data;
            this.activeMenuId = data.id;
            this.choiceOperation = true;
            this.cancel();
        },
        distributeChildren(list){
            list = list || [];
            this.subMenus = [];
            this.privileges = [];
            let self = this;

            list.filter(function (child) {
                if (child.type == 'MENU') {
                    self.subMenus.push(child);
                } else {
                    self.privileges.push(child);
                }

                if (child.children) {
                    child.children.filter(function (item) {
                        if (item.type == 'MENU') {
                            self.subMenus.push(item);
                        } else {
                            self.privileges.push(item);
                        }
                    });
                }
            });
        },
        // 获取菜单树
        getMenus() {
            var url = "/api/menu";
            // 获得左侧的列表内容
            axios.get(url).then(response => {
                if (response.success) {
                    // 储存所有的菜单信息
                    this.menus = response.data || [];

                    if (response.data && response.data.length) {
                        this.clickMenu(response.data[0]);
                        this.currenScope = response.data[0].scope;
                    }
                }

            }).catch(error => {
                console.error('error: %o', error);
            });
        },
        // 添加一级菜单
        createMenu() {
            this.mode = 'createMenu';
            this.secondShow = false;
            this.radio = 2;
            this.newMenu = {
                name: null,
                url: null,
                privilege: null,
                sortOrder: 1,
                parentId: null,
                type: "MENU",
                scope: "DSP",
                style: null,
                children: []
            };
            this.validate = {
                saveMessage: '',
                nameValidate: function (value) {
                    if (value == null || value == '') {
                        this.nameMessage = '名字不能为空';
                        this.saveMessage = '必填项不能为空';
                        return false;
                    } else {
                        this.nameMessage = '';
                        // this.saveMessage='';
                        return true;
                    }

                },
                nameMessage: "",
                styleValidate: function (value) {
                    if (value == null || value == '') {
                        this.styleMessage = '字体图标不能为空';
                        this.saveMessage = '必填项不能为空';
                        return false;
                    } else {
                        this.styleMessage = '';
                        // this.saveMessage='';
                        return true;
                    }

                },
                styleMessage: "",
                privilegeValidate: function (value) {
                    if (value == null || value == '') {
                        this.privilegeMessage = '权限不能为空';
                        this.saveMessage = '必填项不能为空';
                        return false;
                    } else {
                        this.privilegeMessage = '';
                        return true;
                    }

                },
                privilegeMessage: "",
                urlValidate: function (value) {
                    if (value == null || value == '') {
                        this.urlMessage = '链接不能为空';
                        this.saveMessage = '必填项不能为空';
                        return false;
                    } else if (/^\//.test(value) != true) {
                        this.urlMessage = '链接必须以/开头';
                    } else {
                        this.urlMessage = '';
                        return true;
                    }
                },
                urlMessage: "",
                childNameValidate: function (value, index) {
                    if (value == null || value == '') {
                        this.childNameMessage[index].message = '子级菜单名称不能为空';
                        this.saveMessage = '必填项不能为空';
                        return false;
                    } else {
                        this.childNameMessage[index].message = '';
                        return true;
                    }

                },
                childNameMessage: [
                    {message: ''}
                ],
                childUrlValidate: function (value, index) {
                    if (value == null || value == '') {
                        this.childUrlMessage[index].message = '子级菜单链接地址不能为空';
                        this.saveMessage = '必填项不能为空';
                        return false;
                    } else {
                        this.childUrlMessage[index].message = '';
                        this.saveMessage = '';
                        return true;
                    }

                },
                childUrlMessage: [
                    {message: ''}
                ],
                childPrivilegeValidate: function (value, index) {
                    if (value == null || value == '') {
                        this.childPrivilegeMessage[index].message = '子级菜单权限不能为空';
                        this.saveMessage = '必填项不能为空';
                        return false;
                    } else {
                        this.childPrivilegeMessage[index].message = '';
                        return true;
                    }

                },
                childPrivilegeMessage: [
                    {message: ''}
                ],
            };

        },
        // 添加一级菜单时添加子菜单
        showSecond(value) {
            this.secondShow = !this.secondShow;
            if (this.secondShow) {
                // this.newMenu.children.splice(0, 0, this.child);
                var id = new Date().getTime() + Math.random();
                var object = {
                    id,
                    name: null,
                    url: null,
                    privilege: null,
                    sortOrder: 1,
                    parentId: null,
                    type: "MENU",
                    style: null,
                    scope: this.newMenu.scope,
                    children: []
                };
                this.newMenu.children.push(object);
                this.menuNumber = 1;
            } else {
                this.newMenu.children = [];

            }
        },
        // 增加二级菜单数量
        addChild() {
            var id = new Date().getTime() + Math.random();
            var object = {
                id,
                name: null,
                url: null,
                privilege: null,
                sortOrder: 1,
                parentId: null,
                type: "MENU",
                style: null,
                scope: this.newMenu.scope,
                children: []
            };
            console.log(object);
            this.newMenu.children.push(object);
            console.log(this.newMenu);
            this.menuNumber = this.newMenu.children.length;
            var obj = {
                message: ''
            };
            var obj1 = {
                message: ''
            };
            var obj2 = {
                message: ''
            };
            this.validate.childNameMessage.push(obj);
            this.validate.childUrlMessage.push(obj1);
            this.validate.childPrivilegeMessage.push(obj2);

        },
        // 增加一级时删除二级菜单
        deleteChild(index) {
            this.newMenu.children.splice(index, 1);
            this.menuNumber = this.newMenu.children.length;
            this.validate.childNameMessage.splice(index, 1);
            this.validate.childUrlMessage.splice(index, 1);
            this.validate.childPrivilegeMessage.splice(index, 1);

        },
        // 保存一级菜单
        saveMenu() {
            if(this.newMenu && this.newMenu.url && this.newMenu.url.indexOf('/') !== 0){
                this.$message({
                    showClose: true,
                    message: '请填写有效地址，例如:/url！',
                    type: 'error',
                });
                return;
            }
            this.validate.saveMessage = '';
            this.validate.nameValidate(this.newMenu.name);
            this.validate.styleValidate(this.newMenu.style);
            this.validate.privilegeValidate(this.newMenu.privilege);
            if (!this.secondShow) {
                this.validate.urlValidate(this.newMenu.url);
            } else {
                for (var i = 0; i < this.newMenu.children.length; i++) {
                    var value = this.newMenu.children[i].name;
                    this.validate.childNameValidate(value, i);
                    var value1 = this.newMenu.children[i].url;
                    this.validate.childUrlValidate(value1, i);
                    var value2 = this.newMenu.children[i].privilege;
                    this.validate.childPrivilegeValidate(value2, i);
                }
            }

            if (this.validate.saveMessage != '') {
                return false;
            }

            var url = "/api/menu";
            var data = this.newMenu;
            axios.post(url, data).then(response => {
                if (response.success) {
                    this.mode = 'view';
                    this.$message.success('保存成功！');
                    this.newMenu = this.childMenu;
                    this.getMenus();
                }
            }).catch(error => {
                console.error('error: %o', error);
            });

        },
        // 修改树节点
        editMenu(data) {
            this.mode = 'editMenu';
            this.editMenuForm = JSON.parse(JSON.stringify(data));
        },
        // 保存修改树节点
        saveEditMenu(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    var url = '/api/menu';
                    axios.put(url, this.editMenuForm).then(response => {
                        if (response.success) {
                            this.mode = 'view';
                            this.$message.success('保存成功！');
                            this.getMenus();
                        }
                    }).catch(error => {
                        console.error('error: %o', error);
                    });
                } else {
                    return false;
                }
            });

        },


        // 添加权限控制
        createPrivilege() {
            var that = this;
            this.mode = 'createPrivilege';
            var currentMenu = that.menus.find(ele => ele.id === that.activeMenuId);
            this.button = {
                name: null,
                sortOrder: 1,
                type: "BUTTON",
                scope: currentMenu.scope,
                privilege: null,
                parentId: null,
                style: null,
            };
            this.button.parentId = this.activeMenuId;
            this.$refs.button.clearValidate();
        },
        // 保存权限
        savePrivilege() {
            var formName = 'button';
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    var data = this.button;
                    this.save(data, true);
                } else {
                    return false;
                }
            });
        },
        // 修改功能按钮
        editPrivilege(row) {
            this.mode = 'editPrivilege';
            this.button = row;
            this.$refs.editButton.clearValidate();
        },
        // 保存修改权限
        saveEditPrivilege() {
            var self = this;
            var formName = 'editButton';
            self.$refs[formName].validate((valid) => {
                if (valid) {
                    var url = '/api/menu';
                    axios.put(url, self.button).then(response => {
                        if (response.success) {
                            self.mode = 'view';
                            self.$message({
                                message: '修改成功',
                                type: 'success',
                                duration: 1000
                            });

                            var url2 = "/api/menu/" + self.activeMenuId + "/children";
                            axios.get(url2).then(response => {
                                self.activeMenu.children = response.data;
                                self.distributeChildren(response.data);
                            });
                        }
                    }).catch(error => {
                        console.error('error: %o', error);
                    });

                } else {
                    return false;
                }
            });


        },

        // 添加子菜单
        createSubMenu() {
            // this.menuShow=false;
            // this.menuIncreate=true;
            // this.menuEdit=false;
            this.mode = 'createSubMenu';
            this.newMenu = {
                name: null,
                url: null,
                privilege: null,
                sortOrder: 1,
                parentId: null,
                scope: this.activeMenu.scope,
                type: "MENU",
                style: null,
                children: []
            };
            this.newMenu.parentId = this.activeMenuId;
            this.$refs.newMenu.clearValidate();
        },
        // 保存数据添加二级菜单
        saveSubMenu(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    var data = this.newMenu;
                    this.save(data, false);
                } else {
                    return false;
                }
            });
        },
        // 修改二级菜单信息
        editSubMenu(row) {
            this.mode = 'editSubMenu';

            this.newMenu = JSON.parse(JSON.stringify(row));
            this.$refs.editNewMenu.clearValidate();

        },
        // 保存修改二级菜单
        saveEditSubMenu(formName) {
            var self = this;
            self.$refs[formName].validate((valid) => {
                if (valid) {
                    var url = '/api/menu';
                    axios.put(url, self.newMenu).then(response => {
                        if (response.success) {
                            self.mode = 'view';
                            self.$message.success('修改成功！');

                            var url2 = "/api/menu/" + self.activeMenuId + "/children";
                            axios.get(url2).then(response => {
                                self.activeMenu.children = response.data;
                                self.distributeChildren(response.data);
                            });
                        }
                    }).catch(error => {
                        console.error('error: %o', error);
                    });

                } else {
                    return false;
                }
            });


        },

        // 刪除菜单或权限
        deleteMenuOrPrivilege(menu) {
            var self = this;
            self.$confirm('确认删除, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                var id = menu.id;
                var url = '/api/menu/' + id;
                axios.delete(url).then(response => {
                    if (response.success) {
                        this.$message.success('删除成功！');

                        var url2 = "/api/menu/" + self.activeMenuId + "/children";
                        axios.get(url2).then(response => {
                            self.activeMenu.children = response.data;
                            self.distributeChildren(response.data);
                        });
                    }
                });
            });


        },

        save(val) {
            var self = this;
            var url = "/api/menu";
            axios.post(url, val).then(response => {
                if (response.success) {
                    self.$message.success('添加成功！');
                    self.mode = 'view';

                    var url2 = "/api/menu/" + self.activeMenuId + "/children";
                    axios.get(url2).then(response => {
                        self.activeMenu.children = response.data;
                        self.distributeChildren(response.data);

                    });
                }
            }).catch(error => {
                console.error('error: %o', error);
            });

        },
        // 取消
        cancel() {
            this.mode = 'view';
        },

        choiceDelete() {
            this.choiceOperation = false;
        },
        insureOperation(data) {
            this.choiceOperation = true;

            var id = data.id;
            var url = '/api/menu/' + id;
            axios.delete(url).then(response => {
                if (response.success) {
                    this.$message.success('删除成功！');
                    this.getMenus();
                } else {
                    this.$message.error('有子菜单的无法直接删除！');
                }

            });
        },
        cancelOperation(data) {
            this.choiceOperation = true;
        },
        //
        privilege(data){
            this.privilegeData = data;
            let url = '/api/privilege/role/list/privilege/' + (data.privilege || data);
            axios.get(url).then(response => {
                if (response.success) {
                    this.roleList = response.data;
                } else {
                    this.roleList =[];
                }
            }).catch(err => {
                this.roleList =[];
            });
        }

    },
    // 页面加载完成后获取所有菜单信息
    mounted() {
        this.getMenus();
    }
});
