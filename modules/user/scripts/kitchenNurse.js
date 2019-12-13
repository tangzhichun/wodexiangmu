/* jshint esversion: 6 */
import Vue from '@/scripts/module/vue';
import axios from '@/scripts/module/axios';
import criteria from '@/components/ui/dsp-criteria.vue';

let self = new Vue({
    el: '#app',
    delimiters: ['{[', ']}'],
    components: {
        'dsp-criteria': criteria,
    },
    data: {
        views:{
          //  受理
          shouLiDialog:false,
          //  派工
          paigongDialog:false,
          loading: false,
          filterPanelVisible: false,
        },
        meta:{
            //  服务商
            fuwushang:[
                {value:'A',label:'A服务商'},
                {value:'B',label:'B服务商'},
                {value:'C',label:'C服务商'},
            ],
            //  工人
            gongren:[
                {value:'A',label:'A工人'},
                {value:'B',label:'B工人'},
            ],
            //  评价等级
            pingjiadengji:[
                {value:'A',label:'太棒了'},
                {value:'B',label:'满意'},
                {value:'C',label:'很一般'},
                {value:'D',label:'不满意'},
                {value:'E',label:'太差了'},
            ],
        },
        tabList: [
            {id:'NEW', title: '待受理'},
            {id:'WAIT_STAFF', title: '待派工'},
            {id:'WAIT_SERVICE', title: '待上门'},
            {id:'tab4', title: '待评价'},
            {id:'tab5', title: '已评价'},
            {id:'CANCELED', title: '已取消'},
        ],
        // 界面输入的查询条件
        query: {
            NEW: {
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
            WAIT_STAFF: {
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
            WAIT_SERVICE: {
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
            tab4: {
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
            tab5: {
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
            CANCELED: {
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
            currentTab: 'NEW',
        },
        // 界面显示的查询条件
        criteria: {
            NEW: {},
            WAIT_STAFF: {},
            WAIT_SERVICE: {},
            tab4: {},
            tab5: {},
            CANCELED: {},
        },
        tableData: {
            NEW: [
                {
                    id: '12987122',
                    name: '好滋好味鸡蛋仔',
                    category: '江浙小吃、小吃零食',
                    desc: '荷兰优质淡奶，奶香浓而不腻',
                    address: '上海市普陀区真北路',
                    shop: '王小虎夫妻店',
                    shopId: '10333'
                }, {
                    id: '12987123',
                    name: '好滋好味鸡蛋仔',
                    category: '江浙小吃、小吃零食',
                    desc: '荷兰优质淡奶，奶香浓而不腻',
                    address: '上海市普陀区真北路',
                    shop: '王小虎夫妻店',
                    shopId: '10333'
                }, {
                    id: '12987125',
                    name: '好滋好味鸡蛋仔',
                    category: '江浙小吃、小吃零食',
                    desc: '荷兰优质淡奶，奶香浓而不腻',
                    address: '上海市普陀区真北路',
                    shop: '王小虎夫妻店',
                    shopId: '10333'
                }, {
                    id: '12987126',
                    name: '好滋好味鸡蛋仔',
                    category: '江浙小吃、小吃零食',
                    desc: '荷兰优质淡奶，奶香浓而不腻',
                    address: '上海市普陀区真北路',
                    shop: '王小虎夫妻店',
                    shopId: '10333'
                }
            ],
            WAIT_STAFF: [
                {
                    id: '12987122',
                    name: '好滋好味鸡蛋仔',
                    category: '江浙小吃、小吃零食',
                    desc: '荷兰优质淡奶，奶香浓而不腻',
                    address: '上海市普陀区真北路',
                    shop: '王小虎夫妻店',
                    shopId: '10333'
                }, {
                    id: '12987123',
                    name: '好滋好味鸡蛋仔',
                    category: '江浙小吃、小吃零食',
                    desc: '荷兰优质淡奶，奶香浓而不腻',
                    address: '上海市普陀区真北路',
                    shop: '王小虎夫妻店',
                    shopId: '10333'
                }, {
                    id: '12987125',
                    name: '好滋好味鸡蛋仔',
                    category: '江浙小吃、小吃零食',
                    desc: '荷兰优质淡奶，奶香浓而不腻',
                    address: '上海市普陀区真北路',
                    shop: '王小虎夫妻店',
                    shopId: '10333'
                }, {
                    id: '12987126',
                    name: '好滋好味鸡蛋仔',
                    category: '江浙小吃、小吃零食',
                    desc: '荷兰优质淡奶，奶香浓而不腻',
                    address: '上海市普陀区真北路',
                    shop: '王小虎夫妻店',
                    shopId: '10333'
                }
            ],
            WAIT_SERVICE: [
                {
                    id: '12987122',
                    name: '好滋好味鸡蛋仔',
                    category: '江浙小吃、小吃零食',
                    desc: '荷兰优质淡奶，奶香浓而不腻',
                    address: '上海市普陀区真北路',
                    shop: '王小虎夫妻店',
                    shopId: '10333'
                }, {
                    id: '12987123',
                    name: '好滋好味鸡蛋仔',
                    category: '江浙小吃、小吃零食',
                    desc: '荷兰优质淡奶，奶香浓而不腻',
                    address: '上海市普陀区真北路',
                    shop: '王小虎夫妻店',
                    shopId: '10333'
                }, {
                    id: '12987125',
                    name: '好滋好味鸡蛋仔',
                    category: '江浙小吃、小吃零食',
                    desc: '荷兰优质淡奶，奶香浓而不腻',
                    address: '上海市普陀区真北路',
                    shop: '王小虎夫妻店',
                    shopId: '10333'
                }, {
                    id: '12987126',
                    name: '好滋好味鸡蛋仔',
                    category: '江浙小吃、小吃零食',
                    desc: '荷兰优质淡奶，奶香浓而不腻',
                    address: '上海市普陀区真北路',
                    shop: '王小虎夫妻店',
                    shopId: '10333'
                }
            ],
            tab4: [
                {
                    id: '12987122',
                    name: '好滋好味鸡蛋仔',
                    category: '江浙小吃、小吃零食',
                    desc: '荷兰优质淡奶，奶香浓而不腻',
                    address: '上海市普陀区真北路',
                    shop: '王小虎夫妻店',
                    shopId: '10333'
                }, {
                    id: '12987123',
                    name: '好滋好味鸡蛋仔',
                    category: '江浙小吃、小吃零食',
                    desc: '荷兰优质淡奶，奶香浓而不腻',
                    address: '上海市普陀区真北路',
                    shop: '王小虎夫妻店',
                    shopId: '10333'
                }, {
                    id: '12987125',
                    name: '好滋好味鸡蛋仔',
                    category: '江浙小吃、小吃零食',
                    desc: '荷兰优质淡奶，奶香浓而不腻',
                    address: '上海市普陀区真北路',
                    shop: '王小虎夫妻店',
                    shopId: '10333'
                }, {
                    id: '12987126',
                    name: '好滋好味鸡蛋仔',
                    category: '江浙小吃、小吃零食',
                    desc: '荷兰优质淡奶，奶香浓而不腻',
                    address: '上海市普陀区真北路',
                    shop: '王小虎夫妻店',
                    shopId: '10333'
                }
            ],
            tab5: [
                {
                    id: '12987122',
                    name: '好滋好味鸡蛋仔',
                    category: '江浙小吃、小吃零食',
                    desc: '荷兰优质淡奶，奶香浓而不腻',
                    address: '上海市普陀区真北路',
                    shop: '王小虎夫妻店',
                    shopId: '10333'
                }, {
                    id: '12987123',
                    name: '好滋好味鸡蛋仔',
                    category: '江浙小吃、小吃零食',
                    desc: '荷兰优质淡奶，奶香浓而不腻',
                    address: '上海市普陀区真北路',
                    shop: '王小虎夫妻店',
                    shopId: '10333'
                }, {
                    id: '12987125',
                    name: '好滋好味鸡蛋仔',
                    category: '江浙小吃、小吃零食',
                    desc: '荷兰优质淡奶，奶香浓而不腻',
                    address: '上海市普陀区真北路',
                    shop: '王小虎夫妻店',
                    shopId: '10333'
                }, {
                    id: '12987126',
                    name: '好滋好味鸡蛋仔',
                    category: '江浙小吃、小吃零食',
                    desc: '荷兰优质淡奶，奶香浓而不腻',
                    address: '上海市普陀区真北路',
                    shop: '王小虎夫妻店',
                    shopId: '10333'
                }
            ],
            CANCELED: [
                {
                    id: '12987122',
                    name: '好滋好味鸡蛋仔',
                    category: '江浙小吃、小吃零食',
                    desc: '荷兰优质淡奶，奶香浓而不腻',
                    address: '上海市普陀区真北路',
                    shop: '王小虎夫妻店',
                    shopId: '10333'
                }, {
                    id: '12987123',
                    name: '好滋好味鸡蛋仔',
                    category: '江浙小吃、小吃零食',
                    desc: '荷兰优质淡奶，奶香浓而不腻',
                    address: '上海市普陀区真北路',
                    shop: '王小虎夫妻店',
                    shopId: '10333'
                }, {
                    id: '12987125',
                    name: '好滋好味鸡蛋仔',
                    category: '江浙小吃、小吃零食',
                    desc: '荷兰优质淡奶，奶香浓而不腻',
                    address: '上海市普陀区真北路',
                    shop: '王小虎夫妻店',
                    shopId: '10333'
                }, {
                    id: '12987126',
                    name: '好滋好味鸡蛋仔',
                    category: '江浙小吃、小吃零食',
                    desc: '荷兰优质淡奶，奶香浓而不腻',
                    address: '上海市普陀区真北路',
                    shop: '王小虎夫妻店',
                    shopId: '10333'
                }
            ]
        },

        // 受理form
        shouliForm:{fuwushang:'',time:''},
        // 派工form
        paigongForm:{gongren:'',time:''}
    },
    methods: {
        // 切换Tab
        showTab(tab) {
            let self = this;
            self.query.currentTab = tab;
            self.views.filterPanelVisible = false;
                self.buildCriteria();
                self.fetchData();
        },

        // 显示筛选面板
        showFilterPanel() {
            this.views.filterPanelVisible = true;
        },
        // 隐藏筛选面板
        hideFilterPanel() {
            this.views.filterPanelVisible = false;
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

            let url = `/api/wechat/admin/service/appoint/page/size`;
            let params = {
                page: self.query[tab].currentPage,
                size: self.query[tab].pageSize,
                stage:self.query.currentTab,
                name: self.query[tab].name,
                mobile: self.query[tab].mobile,
            };

            // self.views.loading = true;
            // self.views.filterPanelVisible = false;

            axios.get(url, {params: params}).then((response) => {
                self.views.loading = false;

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
                self.views.loading = false;
                console.error('error: %o', error);
            });
        },
        //   打开受理
        openshouLiDialog(e){
            this.shouliForm.data = JSON.parse(JSON.stringify(e));
            this.shouliForm.fuwushang = '';
            this.shouliForm.time = '';
            this.views.shouLiDialog = true;
        },
        savashouLi(){
            console.log(this.shouliForm);
            // const loading = this.$loading({
            //     lock: true,
            //     text: 'Loading',
            //     spinner: 'el-icon-loading',
            //     background: 'rgba(0, 0, 0, 0.7)'
            // });
            let obj = {
                planServiceTime:this.shouliForm.time,
                serviceProvider:this.shouliForm.fuwushang,
                id:this.shouliForm.data.id,
            };
            axios.put(`/api/wechat/admin/service/choice/provider`,obj).then(res => {

            });
            // setTimeout(() => {
            //     self.views.shouLiDialog = false;
            //     loading.close();
            // }, 2000);
        },

        //   打开派工
        openpaigongDialog(e){
            this.paigongForm.data = JSON.parse(JSON.stringify(e));
            this.paigongForm.gongren = '';
            this.paigongForm.time = '';
            this.views.paigongDialog = true;
        },
        savapaigong(){
            console.log(this.paigongForm);
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            setTimeout(() => {
                self.views.paigongDialog = false;
                loading.close();
            }, 2000);
        }
    },
    created () {
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
