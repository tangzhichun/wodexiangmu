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
        },
        tableData: [],
        $validator: {
            rule: {
                information: {
                    name: {required: true, minLength: 2},
                    appsecret: {required: true},
                    appid: {required: true},
                    token: {required: true},
                    privilege: {required: true},
                    imgUrl: {required: true},
                }
            }
        },
        //新增经销商对象
        information: null,
        //配置那个对象
        allocationDate:null,
    },
    methods: {
        //ajax
        fetchData () {
            let self = this;
            let url = `/api/wechat-service/wechat/more/queryAccessTokens`;
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
                let imgobj = null;
                if(this.information.imgUrl){
                     imgobj = {
                        imageUrl:this.information.imgUrl,
                    };
                }
                this.$set(this.information,'imgUrl',imgobj);

                this.information.zdyId = 'edit';
            }else{
                this.information ={name: null, appsecret: null, appid: null,privilege:null,imgUrl:null};
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
                    let url = '/api/wechat-service/wechat/more/insertAccessToken';
                    if(self.information.zdyId){
                        method='put';
                        url='/api/wechat-service/wechat/more/updateAccessToken';
                    }

                    let obj = JSON.parse(JSON.stringify(self.information));
                    if(obj && obj.imgUrl && obj.imgUrl.imageUrl){
                        obj.imgUrl = obj.imgUrl.imageUrl;
                    }else {
                        this.$message('请上传公众号头像');
                        return;
                    }
                    axios({
                        method,
                        url,
                        data: obj
                    }).then(res => {
                        self.views.saveLoading = false;
                        if(res.code === '000'){
                            if(method === 'post'){
                                //异步调菜单拉取线上数据 获取用户
                                axios.get(`/api/wechat-service/wechat/more/recoveryCurrentSelfmenuInfo?gzhId=${self.information.appid}`);
                                axios.get(`/api/wechat-service/wechat/more/getUsers?gzhId=${self.information.appid}`);
                                axios.get(`/api/wechat-service/wechat/more/pullReplyContentArticles?gzhId=${self.information.appid}`);
                            }
                            self.cancelSave();
                            self.fetchData();
                        }
                    }).catch(err =>{
                        self.views.saveLoading = false;
                    });
                }
            });
        },
        delGZH(e){
            this.$confirm('此操作将永久删除该公众号, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                axios.delete(`/api/wechat-service/wechat/more/deleteAccessToken?appid=${e}`).then(res => {
                    if(res.code === '000'){
                        self.fetchData();
                    }
                });

            }).catch(() => {});
        },
        openAllocation(e){
            console.log( this.views.allocation );
            this.allocationDate = e;
            this.views.allocation = true;
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
