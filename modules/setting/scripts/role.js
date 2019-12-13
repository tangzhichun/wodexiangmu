/* jshint esversion: 6 */

import Vue from '@/scripts/module/vue';
import axios from '@/scripts/module/axios';
import enums from "@/scripts/module/enums";

var roleSetting = new Vue({
    el: '#app',
    delimiters: ['{[', ']}'],
    data: {
        MENU_SCOPE: enums.MENU_SCOPE,
        parentList:null,
        roleList:null,
        menuTrees:null,
        title:null,
        keyword:'',
        queryEmployees:'',
        newRole:{
            id: '',
            name: '',
            desc: '',
            isAlive: true,
            privileges: []
        },
        backupRole:{
            id: '',
            name: '',
            desc: '',
            isAlive: true,
            privileges: []
        },
        roles:null,
        rules: {
            name: [
                { required: true, message: '请输入角色名称', trigger: 'blur' }
            ]
        },
        operateIt:false,
        editItem:false,
        operationTitle:'查看',
        // 选中的表单
        multipleSelection:null,
        currentRole:null,
        firstRole:null,
        defaultProps: {
            children: 'children',
            label: 'name'
        },
        checkedKeys:null
    },
    methods:{
        //排序
        objectArraySort (keyName) {
            return function (objectN, objectM) {
                var valueN = objectN[keyName];
                var valueM = objectM[keyName];
                if (valueN < valueM) {return 1;}
                else if (valueN > valueM) {return -1;}
                else {return 0;}
            };
        },
        // 左侧树结构默认值改变时触发
        changeList(item,index){
            // this.$refs.newRole.clearValidate();
            let obj={
                keyword:this.keyword,
                item:item
            };
            window.location.hash = this.$base64Encode(obj);
            var list=document.querySelectorAll('.role-list>.role-item');
            for(var i=0;i<list.length;i++){
                list[i].classList.remove('active');
            }
            if(roleSetting.$refs &&  roleSetting.$refs[item.id] && roleSetting.$refs[item.id][0]){
                roleSetting.$refs[item.id][0].classList.add('active');
            }
            roleSetting.title=item.name;
            roleSetting.operationTitle='查看';
            roleSetting.operateIt= false;
            roleSetting.disabledAll();
            axios.get(`/api/privilege/role/${item.id}`)
                .then(response=>{
                    var result=response;
                    if(result.success){
                        roleSetting.newRole=JSON.parse(JSON.stringify(result.data));
                        roleSetting.currentRole=JSON.parse(JSON.stringify(result.data));
                        roleSetting.checkPrivileges();
                    }

                });
        },
        // 保存提交结果
        submitForm(formName) {
            let self = this;
            if( !roleSetting.newRole.name || !roleSetting.newRole.desc || roleSetting.newRole.name == '' || roleSetting.newRole.desc == ''){
                roleSetting.$message.warning('角色名字和角色描述不能为空!!');
                return false;
            }
            // 将选中的存为数组
            var arr=this.$refs.tree.getCheckedNodes(false,true);
            var arr2=[];
            arr.forEach(function (A) {
                if(A.privilege){
                    arr2.push(A.privilege);
                }
            });
            roleSetting.newRole.privileges=arr2;
            var url='/api/privilege/role';
            axios.post(url,roleSetting.newRole)
                .then(response=>{
                    if(response.success){
                        self.newRole.name = null;
                        self.newRole.desc = null;
                        var url = '/api/privilege/role/list';
                        roleSetting.$message.success('增加成功!');
                        roleSetting.disabledAll();
                        axios.get(url)
                            .then(response=>{
                                var result = response;
                                if(result.success){
                                    roleSetting.roleList=result.data;
                                    roleSetting.roles= result.data.sort(roleSetting.objectArraySort('employeeNum'));
                                    roleSetting.title=result.data[0].name;
                                    var id =response.data ;
                                    roleSetting.$refs[id][0].classList.add('active');
                                    roleSetting.newRole=JSON.parse(JSON.stringify(result.data[0]));
                                    roleSetting.operateIt= false;
                                    roleSetting.checkPrivileges();
                                }

                            });
                    }

                })
                .catch(error=>{
                    console.error('error: %o', error);
                });
        },
        // 提交修改结果
        editForm(formName){
            // 获得所有节点，但不一定包过父节点（子节点不全选的时候）
            var arr=this.$refs.tree.getCheckedNodes(false,true) ;
            var arr2=[];
            arr.forEach(function (A) {
                if (A.privilege){
                    arr2.push(A.privilege);
                }
            });
            console.log(arr2);
            roleSetting.newRole.privileges = arr2;
            roleSetting.disabledAll();

            var url='/api/privilege/role';
            axios.put(url,roleSetting.newRole)
                .then(response=>{
                    if(response.success){
                        roleSetting.$message.success('修改成功');
                        roleSetting.refresh();
                        // 保持查看状态
                        roleSetting.operateIt= false;
                        roleSetting.checkPrivileges();
                        setTimeout(function () {
                            window.location.reload();
                        },1000);
                    }
                });

        },
        // 增加新的角色类型
        increate(){
            // this.$refs.newRole.clearValidate();
            roleSetting.operationTitle='增加新的角色';
            roleSetting.operateIt= true;
            roleSetting.editItem= false;
            roleSetting.freeAll();
            roleSetting.newRole=JSON.parse(JSON.stringify(roleSetting.backupRole));
            this.$refs.tree.setCheckedNodes([]);
            var list=document.querySelectorAll('.role-list>.role-item');
            for(var i=0;i<list.length;i++){
                list[i].classList.remove('active');
            }
        },
        // 改变角色状态
        changeStatus(item){
            this.newRole=JSON.parse(JSON.stringify( roleSetting.currentRole ));
            roleSetting.disabledAll();
            var status= !item.isAlive;
            roleSetting.newRole.isAlive=status;
            var url=`/api/privilege/role/status?id=${item.id}&status=${status}`;
            console.log(1221);
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            axios.put(url).then(response=>{
                setTimeout(() => {
                    loading.close();
                }, 1000);
                var result = response;
                if(result.success){
                    roleSetting.refresh();
                    // 保持查看状态
                    roleSetting.operateIt= false;
                    roleSetting.checkPrivileges();
                }
            }).catch(err => {
                setTimeout(() => {
                    loading.close();
                }, 1000);
            });
        },
        // 编辑角色
        editIt(item){
            roleSetting.operationTitle='编辑';
            roleSetting.newRole=JSON.parse(JSON.stringify(item));
            roleSetting.freeAll();
            roleSetting.operateIt= true;
            roleSetting.editItem= true;
        },
        delRole(item){
            let url=`/api/dealer-service/privilege/role/${item.id}`;
            const h = this.$createElement;
            this.$msgbox({
                title: '提示',
                message:h('p', null, [
                    h('span', null, '此操作将永久删除'),
                    h('span', { style: 'color: red' }, item.name),
                    h('span', null, '角色, 是否继续? '),
                ]),
                showCancelButton: true,
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                window.location.hash = '';
                axios.delete(url).then(response=>{
                    if(response.success){
                        roleSetting.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        setTimeout(function () {
                            window.location.reload();
                        },500);
                    }
                });

            }).catch(() => {

            });
        },
        // 刷新左侧列表
        refresh(){
            var url = '/api/privilege/role/list';
            let self =this;
            axios.get(url)
                .then(response=>{
                    var result = response;
                    if(result.success){
                        roleSetting.roleList=result.data;
                        roleSetting.roles= result.data.sort(self.objectArraySort('employeeNum'));
                        roleSetting.operationTitle='查看';
                        // 筛选
                        roleSetting.checkPrivileges();
                    }
                });
        },
        // 权限选择
        handleSelectionChange(val) {
            roleSetting.multipleSelection = val;
            var privileges=[];
            val.forEach(function (v) {
                if(v.privilege){
                    privileges.push(v.privilege);
                }
            });
            roleSetting.newRole.privileges = privileges;
        },
        // 返回
        back(){
            roleSetting.disabledAll();
            // this.$refs.newRole.clearValidate();
            roleSetting.operationTitle='查看';
            roleSetting.operateIt= false;
            if(roleSetting.editItem){
                this.newRole=JSON.parse(JSON.stringify( roleSetting.currentRole));
                this.title=roleSetting.newRole.name;
                roleSetting.$refs[roleSetting.newRole.id][0].classList.add('active');
            }else{
                roleSetting.newRole=JSON.parse(JSON.stringify( roleSetting.firstRole));
                roleSetting.title=roleSetting.newRole.name;
                roleSetting.$refs[roleSetting.newRole.id][0].classList.add('active');
            }
            this.$nextTick( ()=>{
                roleSetting.checkPrivileges();
            });
        },
        // 根据权限渲染到页面
        checkPrivileges(){
            var arr=roleSetting.newRole.privileges;
            var arr2=[];
            if(roleSetting.menuTrees){
                roleSetting.menuTrees.forEach(function (item) {
                    arr2.push(item);
                    if(item.children){
                        item.children.forEach(function (obj) {
                            arr2.push(obj);
                            if(obj.children){
                                obj.children.forEach(function (chil) {
                                    arr2.push(chil);
                                });
                            }
                        });
                    }
                });
                var arr3=arr2.filter(function (m) {
                    return arr.indexOf(m.privilege) != -1;
                });
                // 将权限渲染到列表
                this.checkedKeys = arr ;
                if(this.$refs.tree){
                    this.$refs.tree.setCheckedNodes(arr3);
                }
            }
        },
        // 是树结构所有节点禁用
        disabledAll(){
            var newTree = JSON.parse( JSON.stringify( this.menuTrees ) ) ;
            if(newTree){
                newTree.forEach( function ( item ) {
                    item.disabled = true;
                    if ( item.children ) {
                        item.children.forEach( function ( menu ) {
                            menu.disabled = true ;
                            if( menu.children ){
                                menu.children.forEach( function ( button ) {
                                    button.disabled = true ;
                                });
                            }
                        });
                    }

                });
                roleSetting.menuTrees = newTree ;
            }
        },
        // 是树结构所有节点不禁用
        freeAll(){
            roleSetting.menuTrees.forEach( function ( item ) {
                item.disabled = false;
                if ( item.children ) {
                    item.children.forEach( function ( menu ) {
                        menu.disabled = false ;
                        if( menu.children ){
                            menu.children.forEach( function ( button ) {
                                button.disabled = false ;
                            });
                        }
                    });
                }

            });
        },
        //    在树形结构上再加一级
        addTree(oldArr){
            let arr1 = JSON.parse(JSON.stringify(this.MENU_SCOPE));
            let a = JSON.parse(JSON.stringify(oldArr));
            let arr = arr1.map(el => {
                el.id =el.value;
                el.name =el.label;
                el.children = a.filter(ele => {
                    return  ele.scope === el.value;
                });
                return el;
            });
            return arr;
        }
    },
    created(){
        let self= this;
        let hash = window.location.hash;
        let obj = self.$base64Decode(hash);
        setTimeout(function () {
            if (hash != '') {
                console.log(obj);
                self.keyword = obj.keyword;
                if(obj.item) {
                    self.changeList(obj.item);
                }
            }
        },500);
        var url = '/api/privilege/role/list';
        axios.get(url)
            .then(response=>{
                var result = response;
                if(result.success){
                    roleSetting.roleList=result.data;
                    roleSetting.roles= result.data.sort(self.objectArraySort('employeeNum'));
                    roleSetting.title=result.data[0].name;
                    roleSetting.operationTitle='查看';
                    roleSetting.newRole=JSON.parse(JSON.stringify(result.data[0]));
                    // 返回一个获取权限的Promise对象
                    return  axios.get('/api/menu/tree/parent');
                }
            })
            .then(response=>{
                var result = response;
                if(result.success){
                    // 储存所有的权限信息
                    roleSetting.menuTrees =this.addTree(result.data) ;
                    var trees = JSON.parse(JSON.stringify(result.data));
                    var parentList = [];
                    trees.forEach(function (item) {
                        if(item.children && item.children[0] && item.children[0].type == 'MENU'){
                            parentList.push(item);
                        }
                    });
                    roleSetting.parentList = parentList;
                    // 获取第一个的权限
                    if(!obj || !obj.item ){
                        axios.get(`/api/privilege/role/${roleSetting.roleList[0].id}`)
                            .then(response=>{
                                var result=response;
                                if(result.success){
                                    roleSetting.newRole=JSON.parse(JSON.stringify( result.data));
                                    roleSetting.currentRole=JSON.parse(JSON.stringify( roleSetting.newRole));
                                    roleSetting.firstRole=JSON.parse(JSON.stringify( roleSetting.newRole));
                                    roleSetting.disabledAll();
                                    return roleSetting.newRole;
                                }

                            })
                            .then( d => {
                                roleSetting.checkPrivileges();

                                if(!obj ) {
                                    roleSetting.$refs[roleSetting.newRole.id][0].classList.add('active');
                                }

                            })
                            .catch( error => {

                            });
                    }

                }
            });
    },
    computed: {
        // 自定义筛选器
        rolesFilter: function () {
            let self = this;
            if (!self.roles || !self.roles.length) {
                return [];
            }

            return self.roles.filter((role) => {
                return !self.keyword || (role.name && role.name.indexOf(self.keyword) != -1);
            });
        }
    }
});
