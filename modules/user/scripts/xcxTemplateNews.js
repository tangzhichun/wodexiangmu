/* jshint esversion: 6 */
import Vue from '@/scripts/module/vue';
import axios from '@/scripts/module/axios';

new Vue({
    el: '#app',
    delimiters: ['{[', ']}'],
    data: {
        // 界面输入的查询条件
        query: {
            mobile: null,
            nickName:null,
            // 总条数
            totalSize: 0,
            // 每页多少条
            pageSize: 15,
            // 当前页面
            currentPage: 1,
        },
        pickerOptions: {
            shortcuts: [{
                text: '最近一周',
                onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit('pick', [start, end]);
                }
            }, {
                text: '最近一个月',
                onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                    picker.$emit('pick', [start, end]);
                }
            }, {
                text: '最近三个月',
                onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                    picker.$emit('pick', [start, end]);
                }
            }],
            disabledDate(time) {
                return time.getTime() > DSP.serverTime;
            },
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

            let url = `/api/wechat/admin/messageLog/list?page=${self.query.currentPage}&size=${self.query.pageSize}`;
            let params = {
                nickName: self.query.nickName,
                startDate: self.query.time && self.query.time[0],
                endDate: self.query.time && self.query.time[1],
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
