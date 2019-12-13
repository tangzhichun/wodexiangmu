/* jshint esversion: 6 */
import Vue from '@/scripts/module/vue';
import axios from '@/scripts/module/axios';


let self = new Vue({
    el: '#app',
    delimiters: ['{[', ']}'],
    data: {
        views:{
            //列数
            listNum:4,
            delLoading:false,
        },
        query:{},
        tab0Data:[],
    },
    methods: {
        imgurl(url){
            if(url.indexOf('http:') > -1){
                return url;
            }else {
                return DSP.globalConfig.fileBaseUrl + url;
            }
        },
        //切换tab—
        change(e){
            let self = this;
            this.query.gzh = e;
            window.location.hash = self.$base64Encode(self.query);
            this.fetchData();
        },
        //获取列表
        fetchData (e) {
            let self = this;
            if(self.views.listView){return;}
            let tab = this.query.gzh;
            let obj = {
                gzhId:tab.appid
            };
            window.location.hash = self.$base64Encode(self.query);
            self.views.listView = true;
            axios.get('/api/wechat-service/wechat/more/queryNewArticleList',{params:obj}).then((res) => {
                self.views.listView = false;
                if(res.data){
                    this.tab0Data = res.data;
                }else {
                    this.tab0Data = [];
                }
            }).catch(error => {
                self.views.listView = false;
                self.loading = false;
                this.tab0Data = [];
            });
        },
        //新建或者编辑图片素材
        appOrEditmsg(e,msgid){
            let obj = {
                appid:this.query.gzh,       //是那个小程序
            };
            if(msgid){
                obj.msgid= msgid;
            }
            window.open(`/wxpublic/appmsgFodder#${self.$base64Encode(obj)}`);
        },
        getOnLine(e){
            if(self.views.listView){return;}
            self.views.listView = true;
            axios.get(`/api/wechat-service/wechat/more/pullReplyContentArticles?gzhId=${e.appid}`).then(res =>{
                self.views.listView = false;
                if(res.code === '000'){
                    self.fetchData();
                }
            }).catch(err =>{
                self.views.listView = false;
            });
        },
        delMsg(item){
            let self =this;
            this.$confirm('此操作将永久删除该图文, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                if(!self.views.delLoading ){
                    self.views.delLoading = true;
                    const loading = this.$loading({
                        lock: true,
                        text: '删除中',
                        spinner: 'el-icon-loading',
                        background: 'rgba(0, 0, 0, 0.7)'
                    });
                    axios.delete(`/api/wechat-service/wechat/more/delNewsMaterial?newsId=${item.id}&configId=${item.configId}&gzhId=${ this.query.gzh.appid}`).then(res => {
                        loading.close();
                        self.views.delLoading = false;
                        if(res.code === '000'){
                            self.fetchData();
                        }
                    }).catch(err => {
                        loading.close();
                        self.views.delLoading = false;
                    });
                    // this.$message({
                    //     type: 'success',
                    //     message: '删除成功!'
                    // });
                }

            });
        }
    },
    created () {
        let self = this;
        let hash = window.location.hash;
        if (hash != '') {
            try {
                let decoded = self.$base64Decode(hash.slice(1));
                if (typeof(decoded) === 'object') {
                    self.query = decoded;
                }
            } catch (error) {}
        }
        if(!self.query.gzh){
            self.$set(self.query,'gzh',DSP.gzh[0]);
        }
        this.fetchData();
        window.onresize = function() {
            let dom = document.getElementsByClassName('msg-box')[0];
            self.views.listNum =parseInt(dom.offsetWidth / 320);
        };
    },
    mounted(){
        let dom = document.getElementsByClassName('msg-box')[0];
        this.views.listNum = parseInt(dom.offsetWidth / 320);
    }

});
