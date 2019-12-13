/* jshint esversion: 6 */
import Vue from '@/scripts/module/vue';
import axios from '@/scripts/module/axios';
import criteria from '@/components/ui/dsp-criteria.vue';

new Vue({
    el: '#app',
    delimiters: ['{[', ']}'],
    components: {
        'dsp-criteria': criteria,
    },
    data: {
        // 界面输入的查询条件
        query: {
            name: null,
            mobile: null,
            wechat: null,
            email: null,
            qq: null,

            // 总条数
            totalSize: 0,
            // 每页多少条
            pageSize: 15,
            // 当前页面
            currentPage: 1,
        },
        // 界面显示的查询条件
        criteria: {},

        // 表格数据
        tableData: [],

        filterPanelVisible: false,
        loading: false,
    },
    methods: {

        // 显示筛选面板
        showFilterPanel() {
            this.filterPanelVisible = true;
        },
        // 隐藏筛选面板
        hideFilterPanel() {
            this.filterPanelVisible = false;
        },
        // 点击查询
        doQuery() {
            let self = this;

            //点击查询按钮，重置为第一页
            self.query.currentPage = 1;

            self.buildCriteria();
            self.fetchData();
        },
        // 重置查询条件
        doReset() {
            let self = this;
            self.query.name = null;
            self.query.mobile = null;
            self.query.email = null;
            self.query.wechat = null;
            self.query.qq = null;
        },
        // 锁定查询条件，供页面显示用
        buildCriteria() {
            let self = this;

            self.criteria = {};

            if (self.query.name) {
                self.criteria.name = {
                    prop: '姓名',
                    value: self.query.name
                };
            }

            if (self.query.mobile) {
                self.criteria.mobile = {
                    prop: '手机号',
                    value: self.query.mobile
                };
            }

            if (self.query.email) {
                self.criteria.email = {
                    prop: '邮箱',
                    value: self.query.email
                };
            }

            if (self.query.qq) {
                self.criteria.qq = {
                    prop: 'QQ',
                    value: self.query.qq
                };
            }

            if (self.query.wechat) {
                self.criteria.wechat = {
                    prop: '微信',
                    value: self.query.wechat
                };
            }
        },
        // 删除筛选条件
        removeCriteria(key) {
            let self =this;
            self.query[key] = null;
            self.$delete(self.criteria, key);

            self.fetchData();
            self.buildCriteria();
        },
        // 序号
        indexMethod(index) {
            let i = this.query.pageSize * (this.query.currentPage - 1) + 1;
            return i + index;
        },
        // ajax
        fetchData: function () {
            let self = this;

            //构造地址栏hash参数
            window.location.hash = self.$base64Encode(self.query);

            let url = `/ui/list/data?currentPage=${self.query.currentPage}&pageSize=${self.query.pageSize}`;
            let params = {
                orgId: self.query.orgId && self.query.orgId.value || self.query.orgId,
                name: self.query.name,
                mobile: self.query.mobile,
            };

            self.loading = true;
            self.filterPanelVisible = false;

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
        // 点击每条多少页
        onSizeChange(val) {
            this.query.pageSize = val;
            this.fetchData();
        },
        // 点击每条那一页
        onCurrentChange(val) {
            this.query.currentPage = val;
            this.fetchData();
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

        self.buildCriteria();
        self.fetchData();
    },
});