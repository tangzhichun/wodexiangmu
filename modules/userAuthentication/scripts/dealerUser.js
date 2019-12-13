/* jshint esversion: 6 */
import Vue from '@/scripts/module/vue';
import axios from '@/scripts/module/axios';
import enums from '@/scripts/module/enums';


let self = new Vue({
    el: '#app',
    delimiters: ['{[', ']}'],
    data: {
        views:{
            //  新增对话框 经销商员工 || 经销商合作方 || 其他
            addDialog:false,
            //防止重复提交
            saveLoading:false,
            //
            dialogVisible:false,

            loading:false,
        },
        meta:{
            positionS:enums.dict('PARTNERSHIP'),
            dealerEnums:enums.dict('CMS_DEALER_ENUMERATE'),
            position:[],
        },
        tab:[
            {label:'员工',value:'tab0'},
            {label:'合作方',value:'tab2'},
            {label:'其他',value:'tab4'}
        ],
        //上传对象
        importObj: {
            uploadPath: '/api/mpuser/service/agent/importExcel',
            currentFile: {
                category: '',
                agent:'',
            },
            currentFile2: {
                category: 4,
                agent:'',
                company:[],
            },
            isUploading: false,
            fileUploadList: [],
            hasImported: false
        },
        query:{
            currTab:'',
            jian:'',
            agent:'',
            tab0Query:{
                // 总条数
                totalSize: 50,
                // 每页多少条
                pageSize: 15,
                // 当前页面
                currentPage:1,
                name:'',
            },
            tab2Query:{
                // 总条数
                totalSize: 50,
                // 每页多少条
                pageSize: 15,
                // 当前页面
                currentPage:1,
                name:'',
            },
            tab4Query:{
                // 总条数
                totalSize: 50,
                // 每页多少条
                pageSize: 15,
                // 当前页面
                currentPage:1,
                name:'',
            },
        },
        tab0Data:[],
        tab2Data:[],
        tab4Data:[],
        $validator: {
            rule: {
                information: {
                    name: {required: true, minLength: 2},
                    mobile: {
                        required: true,
                        minLength: 11,
                    },
                    agent: {required: true},
                    company: {required: true},
                }
            }
        },
        //新增经销商对象
        information: null
    },
    methods: {
        indexMethod(index,tab) {
            let i = this.query[tab+'Query'].pageSize * (this.query[tab+'Query'].currentPage- 1) + 1;
            return i + index;
        },
        //切换tab
        change(e){
            let self = this;
            this.query.currTab = e;
            window.location.hash = self.$base64Encode(self.query);
            this.fetchData();
        },
        changeAgent(e){
            this.query.agent = e;
            this.query[this.query.currTab+'Query'].currentPage = 1;
            this.fetchData();
        },
        //获取列表
        fetchData (e) {
            let self = this;
            let url = '/api/mpuser/service/agent/list';
            let tab = this.query.currTab;
            if(!tab){
                this.$message.error('请先选择tab');
                return;
            }
            let query =this.query[tab+'Query'];
            if(e === 1){
                query.currentPage = 1;
            }
            console.log(query);
            let obj = {
                page:query.currentPage,
                size:query.pageSize,
                name:query.name,
                agent:this.query.agent,
                category:tab.charAt(tab.length - 1)
            };
            window.location.hash = self.$base64Encode(self.query);
            self.views.loading = true;
            axios.get(url, {params: obj}).then((res) => {
                self.views.loading = false;
                if(res.data){
                    this[tab+'Data'] = res.data.results;
                    query.totalSize = res.data.totalSize;
                }else {
                    this[tab+'Data'] = [];
                    query.totalSize = 0;
                }
            }).catch(error => {
                self.views.loading = false;
                this[tab+'Data'] = [];
                query.totalSize = 0;
            });
        },
        //  打开新增对话框  || 编辑对话框  当有obj就是修改没有就是新增
        openAddDialog(e,obj){
            if(obj){
                this.information = JSON.parse(JSON.stringify(obj));
                if(this.information.company && this.information.category > 3){
                    this.information.company = this.information.company.split(',');
                }
            }else{
                let obj ={
                    name: null,             //姓名
                    mobile: null,           //手机号
                    company: null,          //部门/门店 ||  公司
                    agent:null,             //经销商
                    remarks:null,           //备注
                };
                obj.category = e.charAt(e.length - 1);
                this.information = Object.assign({},obj);
            }
            this.views.addDialog = true;
            setTimeout(()=>{
                self.$data.$validator.reset();
            },10);
        },
        //取消 新增||修改 经销商
        cancelSave(){
            self.$data.$validator.reset();
            setTimeout(()=>{
                self.views.addDialog = false;
            },10);
        },
        // 保存录入信息
        save() {
            this.$data.$validator.validateAll().then(pass => {
                if (pass) {
                    let method = self.information.id ? 'put' :'post';
                    let url = self.information.id ? '/api/mpuser/service/agent/update' :'/api/mpuser/service/agent/add';
                    let obj = {
                        category : self.query.currTab.charAt(self.query.currTab.length - 1),
                        name: self.information.name,             //姓名
                        mobile: self.information.mobile,           //手机号
                        company:Array.isArray(self.information.company) ? self.information.company.join(',') : self.information.company ,          //部门/门店 ||  公司
                        agent:self.information.agent,             //经销商
                        remarks:self.information.remarks,           //备注
                        id:self.information.id,
                    };
                    self.views.saveLoading = true;
                    axios({
                        method,
                        url,
                        data: obj
                    }).then(response => {
                        self.views.saveLoading  = false;
                        if (response.success) {
                            this.fetchData();
                            this.cancelSave();
                        }
                    }).catch(error => {
                        self.views.saveLoading = false;
                    });
                }
            });
        },
        //删除合作方
        delAgent(e){
            console.log(e);
            let title = '';
            if(e.category === 0){
                title = '您确定将' + e.name + '在经销商员工列表中删除吗？';
            }else if(e.category === 2){
                title = '您确定将' + e.name + '在经销商合作方列表中删除吗？';
            }else {
                title = '您确定将' + e.name + '在其他列表中删除吗？';
            }
            this.$confirm(title, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let obj = {
                    category : e.category,
                    id:e.id
                };
                axios.delete(`/api/mpuser/service/agent/delete`,{params:obj}).then(res => {
                    if(res.code !== '000'){
                        e.showValid = !e.showValid;
                    }else {
                        this.fetchData();
                    }
                }).catch(err => {
                    this.$message('你的网络不稳定，请稍后重试');
                });
            });
        },

        //上传之前判断文件大小和格式
        importBeforeUpload(file) {
            let self = this;
            self.importObj.currentFile.category = self.query.currTab.charAt(self.query.currTab.length - 1);
            self.importObj.isUploading = true;
            return true;
        },

        //上传成功后
        importUploadSucceed(response, file, fileList){
            let self = this;
            self.importObj.isUploading = false;
            if(response.success && response.code==='000') {
                self.$message.success(`文件上传成功`);
                self.views.dialogVisible = false;
                self.fetchData();
            } else {
                let title = '';
                switch(response.code) {
                    case '804':title = '手机号重复';break;
                    case '851':title = '请检查文件，除备注都是必填字段';break;
                    case '850':title = '请检查文件，所填写字段长度太长';break;
                    case '70011':title = '无效excel';break;
                    case '70012':title = '导入excel为空';break;
                    case '70013':title = '导入excel失败';break;
                    case '70014':title = '导入excel失败';break;
                    case '70015':title = 'excel数据太多';break;
                    default:title = '当前网络不佳，请稍后重试';
                }
                self.$message({
                    message: title,
                    type: 'error',
                    duration: 3000
                });
            }
        },

        //上传失败后
        importUploadFailed(response, file, fileList){
            let self = this;
            self.importObj.isUploading = false;
            self.$message.error(`文件上传失败，请稍后重试`);
        },
    },
    created () {
        let self = this;
        let arr = JSON.parse(JSON.stringify(DSP.PARTNERSHIP));
        arr.map(el => {
            if(el.children && Array.isArray(el.children)){
                el.children.map(ele => {
                    let obj1 = {
                        label:el.label +'--'+ele.label,
                        value:el.value+','+ ele.value,
                    };
                    let obj = {
                        label:el.label +'--'+ele.label,
                        value:ele.value.replace('.',','),
                    };
                    self.meta.position.push(obj);
                    self.meta.position.push(obj1);
                });
            }
        });

        let hash = window.location.hash;
        if( DSP.user.privileges.includes('RZ_CREATE_TAB_EMPLOYEE')){
            this.query.currTab = 'tab0';
        }else if( DSP.user.privileges.includes('RZ_CREATE_TAB_PARTNER')){
            this.query.currTab = 'tab2';
        }else if( DSP.user.privileges.includes('RZ_CREATE_TAB_OTHER')){
            this.query.currTab = 'tab4';
        }else {
            return;
        }
        if (hash != '') {
            try {
                let decoded = self.$base64Decode(hash.slice(1));
                if (typeof(decoded) === 'object') {
                    self.query = decoded;
                }
            } catch (error) {}
        }else if(this.meta.dealerEnums.length < DSP.dealerEnums.length){
            this.query.agent=this.meta.dealerEnums && this.meta.dealerEnums[0]  && this.meta.dealerEnums[0].value;
        }
        this.fetchData();
    }

});
