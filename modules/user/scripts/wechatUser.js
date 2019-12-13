/* jshint esversion: 6 */
import Vue from '@/scripts/module/vue';
import axios from '@/scripts/module/axios';

new Vue({
    el: '#app',
    delimiters: ['{[', ']}'],

    data: {
        views:{
            //用户列表
            loading: false,
            dialogVisible:false,
            synchronization:false,
        },
        // 界面输入的查询条件
        query: {
            nickName: null,//昵称备注
            userCity: null,//昵称备注
            // 总条数
            totalSize: 0,
            // 每页多少条
            pageSize: 30,
            // 当前页面
            currentPage: 1,
        },
        // 设置备注对话框数据
        currenItem:{
            remarks: null,
            item:null,
        },
        tableData:[],
    },
    methods: {
        // 获得用户
        fetchData (e) {
            let that = this;
            if(e === 1){
                that.query.currentPage = 1;
            }
            //构造地址栏hash参数
            window.location.hash = that.$base64Encode(that.query);
            let url = `/api/wechat-service/wechat/more/queryUsers`;
            let params = {
                page:that.query.currentPage,
                size:that.query.pageSize,
                nickName: that.query.nickName,
                gzhId:that.query.gzh.appid
            };
            that.views.loading = true;
            axios.get(url, {params: params}).then((response) => {
                that.views.loading = false;
                if (response && response.success) {
                    if (response.data && response.data.results) {
                        that.tableData = response.data.results;
                        that.query.totalSize = response.data.totalSize;
                    } else {
                        that.tableData = [];
                        that.query.totalSize = 0;
                    }
                }
            }).catch(error => {
                that.views.loading = false;
                console.error('error: %o', error);
            });
        },
        // 点击tab获取当前最新的category
        getCurrentCategory(key){
            this.query.gzh = key;
            this.query.currentPage = 1;
            this.fetchData();
        },
        // 进入用户详情
        userInformation(e){
            window.open('/user/userInformation?userId='+e.id);
        },
        // 设置备注
        setRemark(item, i) {
            this.views.dialogVisible = true;
            this.currenItem.item = item;
            this.currenItem.remarks = JSON.parse(JSON.stringify(item)).remarks || '';
        },
        // /新建/保存备注
        saveRemark () {
            let that = this;
            //构造地址栏hash参数
            window.location.hash = that.$base64Encode(that.query);
            let currenItem = this.currenItem;
            let url = `/api/wechat-service/wechat/more/updateUserRemarks?id=${currenItem.item.id}&remarks=${currenItem.remarks}`;
            if(that.views.loading ){return;}
            that.views.loading = true;
            axios.put(url).then(res => {
                that.views.loading = false;
                if(res.code === '000'){
                    that.fetchData();
                    that.views.dialogVisible = false;
                }
            }).catch(err => {
                that.views.loading = false;
            });

        },
        //拉取线上数据
        synchronization(){
            let that = this;
            if(!that.views.synchronization){
                that.views.synchronization = true;
                axios.get(`/api/wechat-service/wechat/more/getUsers?gzhId=${that.query.gzh.appid}`).then(res => {
                    that.views.synchronization = false;
                    if(res.code === '000'){
                        that.fetchData(1);
                    }
                }).catch(err => {
                    that.views.synchronization = false;
                });
            }
        },
        //进用户
        openUser(e){
            window.open(`/user/userInformation?gzhUserId=${e.id}`);
        }
    },
    mounted() {
        let that = this;
        //根据浏览器地址栏的路由参数，初始化查询条件
        let hash = window.location.hash;
        if (hash != '') {
            try {
                let decoded = that.$base64Decode(hash.slice(1));
                if (typeof(decoded) == 'object') {
                    that.query = decoded;
                }
            } catch (error) {
                console.log(error);
            }
        }
        if(!that.query.gzh){
            that.$set(that.query,'gzh',DSP.gzh[0]);
        }
        that.fetchData();
    }
});
