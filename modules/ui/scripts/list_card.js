/* jshint esversion: 6 */
import Vue from '@/scripts/module/vue';
import axios from '@/scripts/module/axios';

new Vue({
    el: '#app',
    delimiters: ['{[', ']}'],
    data: {

        tabList: [
            {id:'tab1', title: '我关注的'},
            {id:'tab2', title: '我负责的'},
        ],

        // 界面输入的查询条件
        query: {
            tab1: {
                // 总条数
                totalSize: 0,
                // 每页多少条
                pageSize: 15,
                // 当前页面
                currentPage: 1,
            },
            tab2: {
                // 总条数
                totalSize: 0,
                // 每页多少条
                pageSize: 15,
                // 当前页面
                currentPage: 1,
            },
            // 当前标签
            currentTab: 'tab1',
            //
            card:'',
        },
        meta:[
                {value:'北京',label:'北京'},
                {value:'上海',label:'上海'},
                {value:'贵阳',label:'贵阳'},
                {value:'深圳',label:'深圳'},
            ],
        tableData: {
            tab1: [],
            tab2: [],
        },

        loading: false,
    },
    methods: {
        // 切换Tab
        showTab(tab) {
            let self = this;
            self.query.currentTab = tab;

            self.fetchData();
        },
        //  序号
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
                card:self.query.card
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
        //
        changeAgent(va){
            this.query.card = va;
            this.query[this.query.currentTab].currentPage = 1;
            this.fetchData();
        },
        //点击每条多少页
        onSizeChange(val) {
            let tab = this.query.currentTab;
            this.query[tab].pageSize = val;
            this.fetchData();
        },
        //点击每条那一页
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

        self.fetchData();
    },
});
