/* jshint esversion: 6 */
import Vue from '@/scripts/module/vue';
import axios from '@/scripts/module/axios';
import enums from '@/scripts/module/enums';


new Vue({
    el: '#app',
    delimiters: ['{[', ']}'],
    data: {
        value5: [],
        // 界面输入的查询条件
        query: {
            sharerNo:null,//分享者编号
            submitDateArr:null,//注册时间数据
            levelsArr:[],      //用户种类
            categoriesArr:[],  //专题类别
            // 总条数
            totalSize: 0,
            // 每页多少条
            pageSize: 15,
            // 当前页面
            currentPage: 1,
        },
        // 导出
        exportQuery:{},
        meta:{
            levels:enums.levels,
            categories:enums.categories
        },
        loading: false,
        tableData: [],
        //导出
        orderExportObj: {
            dialogVisible: false,
            submitDateRange: false,
            submitDateArr: []
        },
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

            let url = `/api/wechat-admin-service/wechat/admin/userMp/findUserMps?page=${self.query.currentPage}&size=${self.query.pageSize}`;
            let params = {
                sharerNo: self.query.sharerNo,
                timeCreatedBegin: self.query.submitDateArr && self.query.submitDateArr[0] ,
                timeCreatedEnd: self.query.submitDateArr && self.query.submitDateArr[1],
                levels: self.query.levelsArr && self.query.levelsArr.join(','),
                categories: self.query.categoriesArr && self.query.categoriesArr.join(',')
            };
            self.exportQuery = params;

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
        //判断是否可以导出Excel(待回访订单)
        handleOrderSubmitDateRangeSet() {
            let self = this;
            let submitDateRangeCount = 0;

            self.orderExportObj.submitDateRange = false;

            if(!self.orderExportObj.submitDateArr) {
                return;
            }

            submitDateRangeCount = (new Date(self.orderExportObj.submitDateArr[1]).getTime() - new Date(self.orderExportObj.submitDateArr[0]).getTime()) / (24*60*60*1000) + 1;
            self.orderExportObj.submitDateRange = submitDateRangeCount <= 31 ? true : false;
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
         urlSearch (query) {
            let arr = Object.keys(query);
            let mYsearch = '';
            arr.forEach((el) => {
                mYsearch += el + '=' + query[el] + '&' ;
            });
            mYsearch = mYsearch.substr(0, mYsearch.length - 1);
            return mYsearch;
        },
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
    computed: {
        exportLinkStr : function() {
            let self = this;
            let exportLinkStr = '?submitStartDate=' + self.orderExportObj.submitDateArr[0] + '&submitEndDate=' + self.orderExportObj.submitDateArr[1];

            return exportLinkStr;
        },

    },
});
