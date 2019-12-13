/* jshint esversion: 6 */
import Vue from '@/scripts/module/vue';
import axios from '@/scripts/module/axios';
import org from '@/components/select/dsp-org.vue';
import enums from "@/scripts/module/enums";

new Vue({
    el: '#app',
    delimiters: ['{[', ']}'],
    components: {
        'dsp-org': org
    },
    data: {
        meta:{
            EMPLOYEE_STATUS: enums.EMPLOYEE_STATUS,
            MENU_SCOPE: enums.MENU_SCOPE,
        },
        // 界面输入的查询条件
        query: {
            mobile: null,
            positionId:null,
            orgId:null,
            name:null,
            // 总条数
            totalSize: 0,
            // 每页多少条
            pageSize: 15,
            // 当前页面
            currentPage: 1,
        },
        view:{
            privilege:false,
        },
        defaultProps: {
            children: 'children',
            label: 'name'
        },
        role: {
            data: [],//总角色
            value: [],//拥有的角色
            visibleBox: false,
            id: ''
        },
        resrole:[],
        loading: false,
        tableData: [],
        allPosition:[],
        privilege:{
            //所有权限
            allPrivilege:[],
            //自己拥有的权限
            myPrivilege:[],
            //自己拥有的角色
            myRoleList:[],
        },
        bindType: 'login',
        account: null,
        currentUser: null,
        bindLoading: false
    },
    methods: {
        //点击查询
        doQuery() {
            let self = this;

            //点击查询按钮，重置为第一页
            self.query.currentPage = 1;

            self.fetchData();
        },
        //  序号
        indexMethod(index) {
            let i = this.query.pageSize * (this.query.currentPage - 1) + 1;
            return i + index;
        },
        //ajax
        fetchData: function () {
            let self = this;

            //构造地址栏hash参数
            window.location.hash = self.$base64Encode(self.query);

            let url = `/api/user/page/condition/${self.query.currentPage}/${self.query.pageSize}`;
            let params = {
                orgId: self.query.orgId && self.query.orgId.value || null,
                name: self.query.name,
                mobile: self.query.mobile,
                positionId: self.query.positionId,
            };

            self.loading = true;
            axios.get(url, {params: params}).then((response) => {
                self.loading = false;

                if (response && response.success) {
                    if (response.data && response.data.results) {
                        self.tableData = response.data.results;
                        self.query.totalSize = response.data.totalSize;
                    } else {
                        self.tableData = [];
                        self.query.totalSize = 0;
                    }
                }
            }).catch(error => {
                self.loading = false;
                console.error('error: %o', error);
            });
        },
        filterMethod(query, item) {
            return item.label.indexOf(query) > -1;
        },
        //是否禁用
        disable(row) {
            let self =this;
            let url =`/api/user/status?id=${row.id}&status=${!row.valid}`;
            axios({
                method: 'put',
                url:url,
            }).then(function(response) {
                if(response.success) {
                    row.valid = !row.valid;
                    self.$message({
                        message: row.valid ? '已启用' : '已禁用',
                        type: 'success'
                    });
                }
            });
        },
        //重置密码
        reset(row){
            let self =this;
            let url = '/api/user/resetPwd/'+row.id;
            this.$confirm('此操作将重置为随机密码, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then((res) => {
                axios({
                    method: 'put',
                    url:url,
                }) .then(function(response) {
                    if(response.success){
                        self.$message({
                            message: '重置成功',
                            type: 'success'
                        });
                    }
                });

            }).catch(error => {
                console.error('error: %o', error);
            });

        },
        //确认
        roleConfirm(ele) {
            let self = this;
            this.role.visibleBox = false;
            let params = this.role;
            let arr =params.value.join(',');
            console.log(self.resrole.join(',') );
            console.log(arr);
            if(self.resrole.join(',') === arr){
                this.$message('角色没有改变');
                return;
            }
            axios({method: 'post',
                url: '/api/privilege/role/authorize',
                params: {
                    userId: params.id,
                    roleIds: arr
                }
            }) .then(function(response) {
                if(response.success){
                    self.$message({
                        message: '分配成功',
                        type: 'success'
                    });
                }
            });
        },
        //分配角色
        distributionRole(row) {
            let self = this;
            this.role.id = row.id;
            this.role.visibleBox = true;
            let url = `/api/privilege/role/list/user/${row.id}`;
            axios({method: 'get',url: url}).then(function (response) {
                if (response.success) {
                    self.role.value = [];
                    response.data.map(function (item) {
                        self.role.value.push(item.id);
                    });
                }
                self.resrole = JSON.parse(JSON.stringify(self.role.value));

            });
        },
        //点击每条多少页
        onSizeChange(val) {
            this.query.pageSize = val;
            this.fetchData();
        },
        //点击每条那一页
        onCurrentChange(val) {
            this.query.currentPage = val;
            this.fetchData();
        },
        //查看所有职位
        clickPosition(data){
            let self = this;
            axios.get(`/api/dealer/position/list/employee/${data.id}`).then((response) => {
                if(response.data){
                    self.allPosition = response.data.filter(ele =>{
                        if(!ele.primary){
                            return ele;
                        }
                    });
                }else {
                    self.allPosition = [];
                }
            });
        },
        //查看权限
        lookPrivilege(data){
            let self = this;
            let reTree = JSON.parse(JSON.stringify(self.privilege.allPrivilege));
            this.view.privilege = true;
            axios.get(`/api/privilege/auth/list/user/${data.id}`).then((response) => {
                if(response.data){
                    let roleList = [];
                    let arr = JSON.parse(JSON.stringify(self.meta.MENU_SCOPE));
                    let arr2 = reTree.filter( pr =>{
                        if(pr.children){
                            pr.children = pr.children.filter(pr1 =>{
                                if(response.data[pr1.privilege]){
                                    response.data[pr1.privilege].forEach(privilege =>{
                                        if(!roleList.find( el =>{return el.id == privilege.id;})){
                                            roleList.push(privilege);
                                        }
                                    });
                                    pr1.user = response.data[pr1.privilege];
                                }
                                return response.data[pr1.privilege];
                            });
                        }
                       // 所拥有的角色
                       if(response.data[pr.privilege]){
                           response.data[pr.privilege].forEach(privilege =>{
                               if(!roleList.find( el =>{return el.id == privilege.id;})){
                                   roleList.push(privilege);
                               }
                           });
                           pr.user = response.data[pr.privilege];
                       }
                       return response.data[pr.privilege];
                    });
                    self.privilege.myPrivilege = [];
                    arr.map(el => {
                        el.id =el.value;
                        el.name =el.label;
                        el.children = arr2.filter(ele => {
                            return  ele.scope === el.value;
                        });
                        if(el.children && el.children.length > 0){
                            self.privilege.myPrivilege.push(el);
                        }
                    });
                    console.log(arr2);
                  self.privilege.myRoleList = roleList;
                }else {
                    console.log('失败');
                }
            });
        },
        //转跳到角色管理
        urlRole(role){
          let query ={
              item:{
                  id:role.id,
                  name:role.name,
              },
              keyword:role.name,
          };
          console.log(`/setting/user#${this.$base64Encode(query)}`);
            window.location = `/setting/role#${this.$base64Encode(query)}`;
        },
        //职位管理
        administrationPosition(type,data){
            console.log(type);
            console.log(data);
            let query ={
                currentPage:1,
                pageSize:15,
                orgId:data.orgId,
            };
            if(type == 'zhu'){
                query.name = data.position.name;
            }else {
                query.name = data.positionName;
            }
            let sub = DSP.globalConfig.fileBaseUrl;
            let q="";
            if(sub === "http://dev.dsp.com/upload/"){
                q='http://dev.dsp.com';
            }else if(sub ==='https://test.yishimeijia.com/upload/'){
                q='https://test.yishimeijia.com';
            }else {
                q='https://www.sfygroup.shop';
            }
            window.location = q+`/dealer/position#${this.$base64Encode(query)}`;
        },
        // 绑定酷家乐账号
        kjlBind(){
            var self = this;
            var row = self.currentUser;
            var url = self.bindType == 'login' ? `/api/kjl/register?name=${row.employee.name}&email=${row.mobile}&userId=${row.id}&group=${row.employee.organization.name}&account=${self.account}` : `/api/kjl/register?name=${row.employee.name}&email=${row.mobile}&userId=${row.id}&group=${row.employee.organization.name}`;
            self.bindLoading = true;
            axios.get(url).then(function (response) {
                if ( response.success) {
                    self.bindLoading = false;
                    self.$message.success('绑定成功!');
                    window.location.reload();
                }else{
                    self.$message.error(response.message);
                    self.bindLoading = false;
                }
            }).catch(function (error) {
                self.bindLoading = false;
                console.error('error: %o', error);
            });

        }
    },
    created: function () {
        let self = this;
        //根据浏览器地址栏的路由参数，初始化查询条件
        let hash = window.location.hash;
        if (hash != '') {
            try {
                let decoded = self.$base64Decode(hash.slice(1));
                if (typeof(decoded) == 'object') {
                    self.query = decoded;
                }
            } catch (error) {}
        }

        self.fetchData();
        let url = "/api/privilege/role/list?status=true";
        axios({
            method: 'get',
            url: url,
        })
            .then(function (response) {
                if (response.success) {
                    response.data.map(function (item) {
                        self.role.data.push({
                            key: item.id,
                            label: item.name,
                        });
                    });
                }
                return  axios.get('/api/menu/tree/parent');
            }).then(response=>{
                self.privilege.allPrivilege = response.data;
            });

    },
});
