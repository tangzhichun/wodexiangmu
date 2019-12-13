/* jshint esversion: 6 */
import Vue from '@/scripts/module/vue';
import axios from '@/scripts/module/axios';
import cropper from '@/components/ui/dsp-cropper.vue';

let self = new Vue({
    components: {
        'dsp-cropper': cropper
    },
    el: '#app',
    delimiters: ['{[', ']}'],
    data: {
        views:{
            loading: false,
            addDialog:false,
            saveLoading:false,
            allocation:false,
            //配置页面对话框
            pageD:false,
            //获取当前小程序页面page loading
            getPage:false,
            //小程序页面 0正常查看 1修改 2 新增
            addPage: 0 ,
            visible:false
        },
        tableData: [],

        $validator: {
            rule: {
                information: {
                    name: {required: true, minLength: 2},
                    appSecret: {required: true},
                    num: {required: true},
                    appId: {required: true},
                    token: {required: true},
                    authority: {required: true},
                    imgUrl: {required: true},
                    uniqueCode: {required: true},
                    gzhAppid: {required: true},
                },
                formPage: {
                    linkName: {required: true},
                    linkPath: {required: true},

                }

            }
        },
        //新增经销商对象
        information: null,
        //配置那个对象
        allocationDate:null,
        //配置页面对象
        xcxPage:{
            xcx:'',
            pages:[],
            //页面对象参数 点击添加页面的时候 将它添加进pages
            pageObj:{
                linkName:'',
                linkPath:'',
            },
        },
        formPage:{}
    },
    methods: {
        //ajax
        fetchData () {
            let self = this;
            let url = `/api/wechat/admin/mp/list`;
            self.views.loading = true;
            axios.get(url).then((response) => {
                self.views.loading = false;
                if (response && response.success && response.data) {
                    self.tableData = response.data;
                }else {
                    self.tableData = [];
                }
            }).catch(error => {
                self.views.loading = false;
                console.error('error: %o', error);
            });
        },
        openAddDialog(obj){
            if(obj){
                this.information = JSON.parse(JSON.stringify(obj));
                if(!this.information.num){
                    this.$set(this.information,'num',0);
                }
                let imgobj = null;
                if(this.information.imgUrl){
                    imgobj = {
                        imageUrl:this.information.imgUrl,
                    };
                }
                this.$set(this.information,'imgUrl',imgobj);

                this.information.zdyId = 'edit';
            }else{
                this.information ={name: null, appSecret: null, appId: null,authority:null,imgUrl:null,uniqueCode:null,gzhAppid:null,num:0};
            }
            this.views.addDialog = true;
            setTimeout(()=>{
                self.$data.$validator.reset();
            },10);
        },
        cancelSave(){
            self.$data.$validator.reset();
            setTimeout(()=>{
                self.views.addDialog = false;
            },10);
        },
        save() {
            this.$data.$validator.validateAll().then(pass => {
                if (pass) {

                    self.views.saveLoading = true;
                    let method = 'post';
                    let url = '/api/wechat/admin/mp/add';
                    if(self.information.zdyId){
                        method='put';
                        url='/api/wechat/admin/mp/update';
                    }

                    let obj = JSON.parse(JSON.stringify(self.information));
                    if(obj && obj.imgUrl && obj.imgUrl.imageUrl){
                        obj.imgUrl = obj.imgUrl.imageUrl;
                    }else {
                        this.$message('请上传小程序图标');
                        return;
                    }
                    if(obj.timeCreated){
                        delete obj.timeCreated;
                    }
                    if(obj.timeUpdated){
                        delete obj.timeUpdated;
                    }
                    axios({
                        method,
                        url,
                        data: obj
                    }).then(res => {
                        self.views.saveLoading = false;
                        if(res.code === '000'){
                            self.cancelSave();
                            self.fetchData();
                        }
                    }).catch(err =>{
                        self.views.saveLoading = false;
                    });
                }
            });
        },
        delXCX(e){
            this.$confirm('此操作将永久删除该小程序吗, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                axios.delete(`/api/wechat/admin/mp/delete?id=${e}`).then(res => {
                    if(res.code === '000'){
                        self.fetchData();
                    }
                });

            }).catch(() => {});
        },


        //获取页面
        getPage(e){
            if (!this.views.getPage){
                this.views.getPage = true;
                this.$set(this.xcxPage , 'xcx', e);
                //获取小程序页面
                axios.get(`/api/wechat/admin/link/list?appId=${this.xcxPage.xcx.appId}`).then(res => {
                    this.views.getPage = false;
                    if(res.data){
                        this.$set(this.xcxPage , 'pages', res.data);
                        this.views.pageD = true;
                    }
                }).catch(err => {
                    this.views.getPage = false;
                });
            }
        },
        //添加页面
        addPage(){
            let obj = JSON.parse(JSON.stringify(this.xcxPage.pageObj));
            this.formPage = obj;
            this.views.addPage = 2;
        },
        //修改页面
        editPages(e){
            this.formPage = JSON.parse(JSON.stringify(e));
            this.views.addPage = 1;
        },
        //删除页面
        delPages(e){
            let self=this;
            this.$confirm('此操作将永久删除此页面, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                if(!self.views.delPage) {
                    self.views.delPage = true;
                    axios.delete(`/api/wechat/admin/link/delete?id=${e}`).then(res => {
                        self.views.delPage = false;
                        if (res.code === '000') {
                            self.views.getPage = true;
                            axios.get(`/api/wechat/admin/link/list?appId=${self.xcxPage.xcx.appId}`).then(res => {
                                self.views.getPage = false;
                                if (res.data) {
                                    self.$set(self.xcxPage, 'pages', res.data);
                                }
                            }).catch(err => {
                                self.views.getPage = false;
                            });
                        }
                    }).catch(err => {
                        self.views.delPage = false;
                    });
                }

            }).catch(() => {});


        },
        saveXCXPage(){
            this.$data.$validator.validateAll().then(pass => {
                if (pass) {
                    setTimeout(()=>{
                        let obj = JSON.parse(JSON.stringify(self.formPage));
                        if(!obj.id){
                            let formData = {
                                appId:this.xcxPage.xcx.appId,
                                linkName:obj.linkName,
                                linkPath:obj.linkPath,
                            };
                            axios.post('/api/wechat/admin/link/add',formData).then(res => {
                                if(res.code === '000'){
                                    self.views.addPage = 0;
                                    self.formPage = {};
                                    axios.get(`/api/wechat/admin/link/list?appId=${this.xcxPage.xcx.appId}`).then(res => {
                                        if(res.data){
                                            this.$set(this.xcxPage , 'pages', res.data);
                                        }
                                    });
                                }
                            });
                        }else {
                            let formData = {
                                appId:obj.appId,
                                id:obj.id,
                                linkName:obj.linkName,
                                linkPath:obj.linkPath,
                            };
                            axios.put('/api/wechat/admin/link/add',formData).then(res => {
                                if(res.code === '000'){
                                    self.views.addPage = 0;
                                    self.formPage = {};
                                    axios.get(`/api/wechat/admin/link/list?appId=${this.xcxPage.xcx.appId}`).then(res => {
                                        if(res.data){
                                            this.$set(this.xcxPage , 'pages', res.data);
                                        }
                                    });
                                }
                            });
                        }
                    },100);
                }
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
    },
});
