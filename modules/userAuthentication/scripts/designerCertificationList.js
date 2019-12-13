/* jshint esversion: 6 */
import Vue from '@/scripts/module/vue';
import axios from '@/scripts/module/axios';
import img from '@/components/ui/dsp-img.vue';
import enums from '@/scripts/module/enums';

new Vue({
    el: '#app',
    delimiters: ['{[', ']}'],
    components: {
        'dsp-img': img,
    },
    data: {
        meta:{
            position:[],
        },
        views:{
            loading: false,
        },
        // 界面输入的查询条件
        query: {
            //姓名
            name:'',
            // 总条数
            totalSize: 0,
            // 每页多少条
            pageSize: 15,
            // 当前页面
            currentPage: 1,
        },
        tableData: [],
    },
    methods: {
        indexMethod(index) {
            let i = this.query.pageSize * (this.query.currentPage- 1) + 1;
            return i + index;
        },
        //ajax
        fetchData (e) {
            let self = this;
            if(e ===1){self.query.currentPage=1;}
            //构造地址栏hash参数
            window.location.hash = self.$base64Encode(self.query);
            let url = `/api/mpuser/service/designer/list`;
            let obj = {
                page:self.query.currentPage,
                size:self.query.pageSize,
                name:self.query.name
            };
            if( self.views.loading){return;}
            self.views.loading = true;
            axios.get(url, {params: obj}).then((response) => {
                self.views.loading = false;
                if (response && response.success && response.data) {
                    self.tableData = response.data.results;
                    self.query.totalSize = response.data.totalSize;
                } else {
                    self.tableData = [];
                    self.query.totalSize = 0;
                }
            }).catch(error => {
                self.views.loading =  false;
                console.error('error: %o', error);
            });
        }
    },
    created() {
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
