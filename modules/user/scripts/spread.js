/* jshint esversion: 6 */
import Vue from '@/scripts/module/vue';
import axios from '@/scripts/module/axios';
import enums from '@/scripts/module/enums';


new Vue({
    el: '#app',
    delimiters: ['{[', ']}'],
    data: {
        categoryList: [
            {value:'USER', label: '员工'},
            {value:'OPERATION', label: '合作方'},
        ],
        category: 'USER',
        loading: false,
        // 界面输入的查询条件
        query: {
            OPERATION: {
                // 总条数
                totalSize: 0,
                // 每页多少条
                pageSize: 15,
                // 当前页面
                currentPage: 1,
                tableData: null
            },
            USER: {
                // 总条数
                totalSize: 0,
                // 每页多少条
                pageSize: 15,
                // 当前页面
                currentPage: 1,
                tableData: null
            }
        }
    },
    methods: {
        // 获得用户
        fetchData: function () {
            let that = this;

            //构造地址栏hash参数
            window.location.hash = that.$base64Encode(that.query);

            let url = `/api/wechat/admin/user?page=${that.query[that.category].currentPage}&size=${that.query[that.category].pageSize}`;
            that.loading = true;
            axios.get(url).then((response) => {
                that.loading = false;

                if (response && response.success) {
                    if (response.data && response.data.results) {
                        that.tableData = response.data.results;
                        that.query[that.category].totalSize = response.data.totalSize;
                    } else {
                        that.tableData = [];
                        that.query[that.category].totalSize = 0;
                    }
                }
            }).catch(error => {
                that.loading = false;
                console.error('error: %o', error);
            });
        },
        // 点击tab获取当前最新的category
        getCurrentCategory(key){
            this.category = key;
        },
        //点击每条多少页
        onSizeChange(val) {
            let that = this;
            this.query[that.category].pageSize = val;
            // this.fetchData();
        },
        //点击每条那一页
        onCurrentChange(val) {
            let that = this;
            this.query[that.category].currentPage = val;
            // this.fetchData();
        },
        //  序号
        indexMethod(index) {
            let that = this;
            let i = that.query[that.category].pageSize * (that.query[that.category].currentPage - 1) + 1;
            return i + index;
        },
    },
    mounted() {
        let that = this;
        // self.fetch();
        //根据浏览器地址栏的路由参数，初始化查询条件
        // let hash = window.location.hash;
        // if (hash != '') {
        //     try {
        //         let decoded = self.$base64Decode(hash.slice(1));
        //         if (typeof(decoded) == 'object') {
        //             self.query = decoded;
        //         }
        //     } catch (error) {}
        // }

        // console.log(this.categoryList);
    }
});
