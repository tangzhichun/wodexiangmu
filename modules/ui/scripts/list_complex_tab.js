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

        tabList: [
            {id:'tab1', title: '我关注的'},
            {id:'tab2', title: '我负责的'},
            {id:'tab3', title: '我参与的'},
        ],

        // 界面输入的查询条件
        query: {
            tab1: {
                name: null,
                mobile: null,
                wechat: null,

                // 总条数
                totalSize: 0,
                // 每页多少条
                pageSize: 15,
                // 当前页面
                currentPage: 1,
            },
            tab2: {
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
            tab3: {
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


            // 当前标签
            currentTab: 'tab1',
        },

        // 界面显示的查询条件
        criteria: {
            tab1: {},
            tab2: {},
            tab3: {},
        },

        tableData: {
            tab1: [],
            tab2: [],
            tab3: [],
        },


        loading: false,
        filterPanelVisible: false
    },
    methods: {
        // 切换Tab
        showTab(tab) {
            let self = this;
            self.query.currentTab = tab;
            self.filterPanelVisible = false;

            if (!self.tableData[tab] || !self.tableData[tab].length) {
                self.buildCriteria();
                self.fetchData();
            }
        },

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
            let tab = this.query.currentTab;

            //点击查询按钮，重置为第一页
            self.query[tab].currentPage = 1;

            self.buildCriteria();
            self.fetchData();
        },
        // 重置查询条件
        doReset() {
            let self = this;
            let tab = this.query.currentTab;

            self.query[tab].name = null;
            self.query[tab].mobile = null;
            self.query[tab].email = null;
            self.query[tab].wechat = null;
            self.query[tab].qq = null;
        },
        // 锁定查询条件，供页面显示用
        buildCriteria() {
            let self = this;
            let tab = this.query.currentTab;

            self.criteria[tab] = {};
            if (self.query[tab].name) {
                self.criteria[tab].name = {
                    prop: '姓名',
                    value: self.query[tab].name
                };
            }

            if (self.query[tab].mobile) {
                self.criteria[tab].mobile = {
                    prop: '手机号',
                    value: self.query[tab].mobile
                };
            }

            if (self.query[tab].email) {
                self.criteria[tab].email = {
                    prop: '邮箱',
                    value: self.query[tab].email
                };
            }

            if (self.query[tab].qq) {
                self.criteria[tab].qq = {
                    prop: 'QQ',
                    value: self.query[tab].qq
                };
            }

            if (self.query[tab].wechat) {
                self.criteria[tab].wechat = {
                    prop: '微信',
                    value: self.query[tab].wechat
                };
            }
        },
        // 删除筛选条件
        removeCriteria(key) {
            let self = this;
            let tab = this.query.currentTab;

            self.query[tab][key] = null;
            self.$delete(self.criteria[tab], key);

            self.fetchData();
            self.buildCriteria();
        },
        // 序号
        indexMethod(index) {
            let tab = this.query.currentTab;
            let i = this.query[tab].pageSize * (this.query[tab].currentPage - 1) + 1;
            return i + index;
        },
        // ajax
        fetchData: function () {
            let self = this;
            let tab = this.query.currentTab;

            //构造地址栏hash参数
            window.location.hash = self.$base64Encode(self.query);

            let url = `/ui/list/data?currentPage=${self.query[tab].currentPage}&pageSize=${self.query[tab].pageSize}`;
            let params = {
                name: self.query[tab].name,
                mobile: self.query[tab].mobile,
            };

            self.loading = true;
            self.filterPanelVisible = false;

            axios.get(url, {params: params}).then((response) => {
                self.loading = false;

                if (response && response.success) {
                    if (response.data && response.data.results) {
                        self.tableData[tab] = response.data.results;
                        self.query[tab].totalSize = response.data.totalSize;
                    } else {
                        self.tableData[tab] = [];
                        self.query[tab].totalSize = 0;
                    }
                }
            }).catch(error => {
                self.loading = false;
                console.error('error: %o', error);
            });
        },
        // 点击每条多少页
        onSizeChange(val) {
            let tab = this.query.currentTab;
            this.query[tab].pageSize = val;
            this.fetchData();
        },
        // 点击每条那一页
        onCurrentChange(val) {
            let tab = this.query.currentTab;
            this.query[tab].currentPage = val;
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