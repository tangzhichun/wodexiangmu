/* jshint esversion: 6 */
import Vue from '@/scripts/module/vue';
import axios from '@/scripts/module/axios';
import enums from '@/scripts/module/enums';


new Vue({
    el: '#app',
    delimiters: ['{[', ']}'],
    data: {
        dat : {},
        meta:{
            //dict('INEFFECTIVE_REASONS')
            ineffectiveReasons:enums.INEFFECTIVE_REASONS,
            registerUserStage:enums.registerUserStage,
        },
        // 界面输入的查询条件
        templateQuery: {
            submitDateArr:null,//注册时间数据
            userCity: '北京市',//默认北京市
            mobile: '',
            // 总条数
            totalSize: 0,
            // 每页多少条
            pageSize: 15,
            // 当前页面
            currentPage:1,
        },
        //界面输入的查询条件
        query: {
            category: null,
        },
        // 导出
        exportQuery:{},
        views:{
            saveChange:false,
            dialogVisible:false,
            loading: false,
        },
        tableData: [],
        //导出
        orderExportObj: {
            dialogVisible: false,
            submitDateRange: false,
            submitDateArr: []
        },
        pickerOptions: {
            disabledDate(time) {
                return time.getTime() > DSP.serverTime  ;
            },
        },
        //反馈
        currenItem:{
            item:'',
            type:'',
            time:'',
            reason:'',
        }
    },
    methods: {
        disabledDate: function disabledDate(time) {
            return time.getTime() > DSP.serverTime;
        },
        //点击查询
        doQuery() {
            let self = this;
            //点击查询按钮，重置为第一页
           let tab = self.query[self.query.category].currentPage;
            self.fetchData();
        },
        //  序号
        indexMethod(index) {
            let tab = this.query[this.query.category];
            let i = tab.pageSize * (tab.currentPage - 1) + 1;
            return i + index;
        },
        //ajax
        fetchData () {
            let self = this;

            //构造地址栏hash参数
            window.location.hash = self.$base64Encode(self.query);
            let trueQuery =  self.query[self.query.category];
            let url = `/api/wechat/admin/userMp/register/info?page=${trueQuery.currentPage}&size=${trueQuery.pageSize}`;
            let params = {
                timeCreatedBegin: trueQuery.submitDateArr && trueQuery.submitDateArr[0] ,
                timeCreatedEnd: trueQuery.submitDateArr && trueQuery.submitDateArr[1],
                categories: self.query.category,
                userCity: trueQuery.userCity,
                mobile: trueQuery.mobile,
                stage: trueQuery.stage
            };
            self.exportQuery = params;

            self.views.loading = true;
            axios.get(url, {params: params}).then((response) => {
                self.views.loading = false;

                if (response && response.success) {
                    if (response.data && response.data.results) {
                        self.tableData = response.data.results;
                        trueQuery.totalSize = response.data.totalSize;
                    } else {
                        self.tableData = [];
                        trueQuery.totalSize = 0;
                    }
                }
            }).catch(error => {
                self.views.loading = false;
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
         urlSearch (query) {
            let arr = Object.keys(query);
            let mYsearch = '';
            arr.forEach((el) => {
                mYsearch += el + '=' + query[el] + '&' ;
            });
            mYsearch = mYsearch.substr(0, mYsearch.length - 1);
            return mYsearch;
        },
        // 点击tab获取当前最新的category
        getCurrentCategory(key){
            this.query.category = key;
            this.fetchData();
        },

        //点击反馈
        clickTickling(e){
            let a=  JSON.parse(JSON.stringify(e));
            this.currenItem.item = a;
            this.currenItem.type = a.stage;
            this.currenItem.time = '';
            this.currenItem.reason = '';
            this.views.dialogVisible = true;
        },
        qei(e){
          if(e === 'MEASURE_STORE'){
              this.currenItem.time = this.dat.y+'/'+this.dat.m+'/'+this.dat.d;
          }
        },
        saveChange(){
            let  obj ={
                id:this.currenItem.item.id,
                stage:this.currenItem.type,
            };
            if(obj.stage === this.currenItem.item.stage){
                this.$message.error('您状态没有任何修改，无法保存');
                return;
            }else if(obj.stage === 'INVALID' ){
                obj.invalidReason = this.currenItem.reason;
                if(!obj.invalidReason){
                    this.$message.error('无效客户必须选择无效原因，请选择无效原因');
                    return;
                }
            }else if(obj.stage === 'MEASURE_STORE'){
                obj.storeDate = this.currenItem.time;
                if(!obj.storeDate){
                    this.$message.error('测量且到店必须选择客户到店时间');
                    return;
                }
            }
            if(!this.views.saveChange){
                this.views.saveChange = true;
                axios({
                    method: 'put',
                    url: '/api/wechat/admin/enroll/stage/change',
                    params: obj
                }).then(res => {
                    this.views.saveChange = false;
                    if(res.code === '000'){
                        this.doQuery();
                        this.$message.success('回馈成功');
                        this.views.dialogVisible = false;
                    }
                }).catch(err => {
                    this.views.saveChange = false;
                });
            }
        }
    },
    created () {
        let self = this;
        let tab = JSON.parse(JSON.stringify(DSP.xcx));
        if(DSP.xcx[0]){
            self.query.category = DSP.xcx[0] && DSP.xcx[0].uniqueCode;
            tab.map(el => {
                self.$set(self.query,el.uniqueCode,JSON.parse(JSON.stringify(self.templateQuery)));
            });
        }else {
            this.$message('你无此操作权限，请联系管理员');
            return;
        }
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
        let date = new Date(DSP.serverTime);
        this.dat = {
            y:date.getFullYear(),
            m: (date.getMonth() +1 <10 ?'0' + (date.getMonth() +1) : date.getMonth() +1),
            d: date.getDate(),
        };
    }
});
