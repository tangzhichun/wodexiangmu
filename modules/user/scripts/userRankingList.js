/* jshint esversion: 6 */
import Vue from '@/scripts/module/vue';
import axios from '@/scripts/module/axios';

new Vue({
    el: '#app',
    delimiters: ['{[', ']}'],
    data: {
        lists:[
                {label:'曝光次数排行榜',value:'cishu',inner:'按访客的访问次数合计值排序'},
                {label:'曝光人数排行榜',value:'renshu',inner:'按访客总数排序，一个访客多次访问只统计一次'},
                {label:'获客排行榜',value:'huoke',inner:'按报名总数排序，一个客户多次报名只统计一次'},
            ],
        // 界面输入的查询条件
        query: {
            cishu:{
                queryTime: 'THIS_WEEK',
                // 总条数
                totalSize: 0,
                // 每页多少条
                pageSize: 15,
                // 当前页面
                currentPage: 1,
            },
            renshu:{
                queryTime: 'THIS_WEEK',
                // 总条数
                totalSize: 0,
                // 每页多少条
                pageSize: 15,
                // 当前页面
                currentPage: 1,
            },
            huoke:{
                queryTime: 'THIS_WEEK',
                // 总条数
                totalSize: 0,
                // 每页多少条
                pageSize: 15,
                // 当前页面
                currentPage: 1,
            }
        },

        loading:{
            cishu:false,
            renshu:false,
            huoke:false,
        },
        tableData: {
            cishu:[],
            renshu:[],
            cishhuokeu:[]
        }
    },
    methods: {
        //点击查询
        // doQuery() {
        //     let self = this;
        //
        //     //点击查询按钮，重置为第一页
        //     self.query.currentPage = 1;
        //
        //     self.fetchData();
        // },
        //  序号
        // indexMethod(index) {
        //     let i = this.query.pageSize * (this.query.currentPage - 1) + 1;
        //     return i + index;
        // },
        //ajax
        fetchData (e) {
            let self = this;
            //构造地址栏hash参数
            window.location.hash = self.$base64Encode(self.query);
            let url = '';
            if(e === 'cishu'){
                url = `/api/wechat/admin/userMp/charts/visit/total/1/100?pageStart=1&pageSize=100`;
            }else if (e === 'renshu'){
                url = `/api/wechat/admin/userMp/charts/visitor/total/1/100?pageStart=1&pageSize=100`;
            }else {
                url = `/api/wechat/admin/userMp/charts/sign/up/total/1/100?pageStart=1&pageSize=100`;
            }
            let params = {
                queryTime: self.query[e].queryTime,
            };
            self.loading[e] = true;
            axios.get(url, {params: params}).then((response) => {
                self.loading[e] = false;
                if (response && response.success) {
                    if (response.data && response.data.results) {
                        self.tableData[e] = response.data.results;
                        self.query[e].totalSize = response.data.totalSize;
                    } else {
                        self.tableData[e] = [];
                        self.query[e].totalSize = 0;
                    }
                }
            }).catch(error => {
                self.loading[e] = false;
                console.error('error: %o', error);
            });
        },

        //点击每条多少页
        onSizeChange(val) {
            this.fetchData(val);
        },
        //点击每条那一页
        onCurrentChange(val) {
            this.fetchData(val);
        },

        //转跳
        open(el,value){
            let obj = {
                currtab: value ==='huoke' ? 'user': "generalize",
                fanganQuery:{currentPage: 1, pageSize: 15, totalSize: 0},
                generalizeQuery:{currentPage: 1, pageSize: 15, totalSize: 0,time: "",visitMethods:''},
                query:{currentPage: 1, pageSize: 15, totalSize: 0,time: ""},
                userQuery:{currentPage: 1, pageSize: 15, totalSize: 0,time: ""}
            };
            window.open('/user/userInformation?userId='+ el.userId+'#'+this.$base64Encode(obj));
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

        self.fetchData('cishu');
        self.fetchData('renshu');
        self.fetchData('huoke');
    },
});
