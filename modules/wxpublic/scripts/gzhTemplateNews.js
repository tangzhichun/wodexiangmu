/* jshint esversion: 6 */
import Vue from '@/scripts/module/vue';
import axios from '@/scripts/module/axios';

new Vue({
    el: '#app',
    delimiters: ['{[', ']}'],
    data: {

        // 界面输入的查询条件
        query: {
            // 当前标签
            currentTab: '',
        },

        tableData: {

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
            let i = this.query[tab].size * (this.query[tab].page - 1) + 1;
            return i + index;
        },
        // ajax
        fetchData: function (f) {
            let self = this;
            let tab = this.query.currentTab;

            //构造地址栏hash参数
            window.location.hash = self.$base64Encode(self.query);

            let url = `/api/wechat-service/wechat/queryTemplateMessageLogPage`;
            let params = self.query[tab];
            if(f == 1){
                params.page = 1;
            }
            let qu = {
                page: params.page,
                gzhId: params.gzhId,
                size: params.size,
                nickName: params.nickName,
                sendTime : params.time && params.time[0],
                startTime: params.time && params.time[1],
            };
            self.loading = true;
            self.filterPanelVisible = false;

            axios({
                method: 'post',
                url,
                params:qu
            }).then((response) => {
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
    },
    created: function () {
        let self = this;

        //根据浏览器地址栏的路由参数，初始化查询条件
        let hash = window.location.hash;
        DSP.gzh.forEach(el => {
            let obj = {
                page:1,
                gzhId:el.appid,
                size:15,
                nickName:'',
                endTime:'',
                startTime:'',
                time:'',
                totalSize:'',
            };
            self.$set(self.query,el.appid,obj);
            self.$set(self.tableData,el.appid,[]);
        });
        if (hash != '') {
            try {
                let decoded = self.$base64Decode(hash.slice(1));
                if (typeof(decoded) == 'object') {
                    self.query = decoded;
                }else {

                }
            } catch (error) {}
        }else {
            this.query.currentTab = DSP.gzh[0].appid;
        }

        self.fetchData();
    },
});
