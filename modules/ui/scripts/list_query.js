/* jshint esversion: 6 */
import Vue from '@/scripts/module/vue';
import axios from '@/scripts/module/axios';

new Vue({
    el: '#app',
    delimiters: ['{[', ']}'],
    data: {
        // 界面输入的查询条件
        query: {
            name: null,
            mobile: null,

            // 总条数
            totalSize: 0,
            // 每页多少条
            pageSize: 15,
            // 当前页面
            currentPage: 1,
        },

        loading: false,
        tableData: []
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

            let url = `/ui/list/data?currentPage=${self.query.currentPage}&pageSize=${self.query.pageSize}`;
            let params = {
                name: self.query.name,
                mobile: self.query.mobile,
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
