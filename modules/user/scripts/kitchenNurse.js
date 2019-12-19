/* jshint esversion: 6 */
import Vue from '@/scripts/module/vue';
import axios from '@/scripts/module/axios';
import criteria from '@/components/ui/dsp-criteria.vue';
import img from '@/components/ui/dsp-img.vue';

let self = new Vue({
    el: '#app',
    delimiters: ['{[', ']}'],
    components: {
        'dsp-criteria': criteria,
        'dsp-img': img,
    },
    data: {
        views:{
          //  受理
          shouLiDialog:false,
          //  待派工变更服务商
          editShouliFormD:false,
          //  派工
          paigongDialog:false,
          //  取消预约对话框
          openCancelD:false,
          // 防止重复提交  axios 受理 || 派工 || 取消预约
          saveLoading:false,
          //  表格loading
          loading: false,
          //  筛选面板显示隐藏
          filterPanelVisible: false,
          //  设置服务时间对话框
          serviceDate:false,
            dataLoding:false,
            //设置服务时间是否可预约
            setDataL:false
        },
        meta:{
            //  服务商
            serviceProvider:[
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
            {id:'WAIT_EVALUATE', title: '待评价'},
            {id:'EVALUATED', title: '已评价'},
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
            WAIT_EVALUATE: {
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
            EVALUATED: {
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
            WAIT_EVALUATE: {},
            EVALUATED: {},
            CANCELED: {},
        },
        tableData: {
            NEW: [],
            WAIT_STAFF: [],
            WAIT_SERVICE: [],
            WAIT_EVALUATE: [],
            EVALUATED: [],
            CANCELED: []
        },
        // 受理form
        shouliForm:{serviceProvider:'',planServiceTime:''},
        // 变更服务商
        editShouliForm:{serviceProvider:''},
        // 派工form
        paigongForm:{staffName:'',staffMobile:'',planServiceTime:''},
        // 取消预约form
        cancelForm:{cancelReason:''},

        daysObj:{},
        rili:{
            //年月
            ym:[],
            yM:'',
            //那天是否可预约
            getMonthDay:{},
        }
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

            self.views.loading = true;
            self.views.filterPanelVisible = false;

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
        //打开对话框     打开派工 ||  取消预约 || 打开受理
        openDialog(form,e,viewsD,type){
            let obj = this[form];
            let ad =  JSON.parse(JSON.stringify(e));
            Object.keys(obj).map(el => {
                obj[el] = '';
                if(type && e[el]){
                    obj[el] = e[el];
                    if(typeof ad[el] === 'number' && !isNaN(e[el])){
                        obj[el] = self.$filter.datetimes(ad[el]);
                    }
                }
            });
            this[form].data = JSON.parse(JSON.stringify(e));
            if(type){
                this[form].zdy = 'edit';
                this[form].type = type;
            }
            this.views[viewsD] = true;
        },
        // 待派工 更多
        handleCommand(fo,e){
          if(e === 'a'){

              //修改服务商
              this.openDialog('editShouliForm',fo,'editShouliFormD','edit');
          }
          else if (e === 'b'){
              //取消预约
              this.openDialog('cancelForm',fo,'openCancelD');
          }else if(e === 'c'){
              //变更上门时间
              this.openDialog('paigongForm',fo,'paigongDialog','zhiyaoshijian');
          }
        },
        // 保存受理 选服务商  || 待派工修改服务商
        savashouLi(e){
            let obj = {};
            let url = '/api/wechat/admin/service/choice/provider';
            if(e === 'edit'){
                obj = {
                    serviceProvider:this.editShouliForm.serviceProvider,
                    id:this.editShouliForm.data.id,
                };
                url = '/api/wechat/admin/service/change/provider';
            }else {
                obj = {
                    planServiceTime:this.shouliForm.planServiceTime,
                    serviceProvider:this.shouliForm.serviceProvider,
                    id:this.shouliForm.data.id,
                };
            }
            if(!this.views.saveLoading){
                this.views.saveLoading = true;
                axios.put(url,obj).then(res => {
                    this.views.shouLiDialog = false;
                    this.views.editShouliFormD = false;
                    this.views.saveLoading = false;
                    if(res.code === '000'){
                        this.fetchData();
                    }
                }).catch(err => {
                    this.views.saveLoading = false;
                });
            }
        },
        // 保存派工
        savapaigong(){
            let obj = {
                planServiceTime: self.paigongForm.planServiceTime,
                staffMobile: self.paigongForm.staffMobile,
                staffName: self.paigongForm.staffName,
                id:this.paigongForm.data.id,
            };
            if(!this.views.saveLoading){
                this.views.saveLoading = true;
                axios.put(`/api/wechat/admin/service/assign/provider/staff`,obj).then(res => {
                    this.views.saveLoading = false;
                    this.views.paigongDialog = false;
                    if(res.code === '000'){
                        this.fetchData();
                    }
                }).catch(err => {
                    this.views.saveLoading = false;
                });
            }
        },
        // 保存取消预约
        saveCancelD(){
            if(!this.views.saveLoading){
                this.views.saveLoading = true;
                axios.put(`/api/wechat/admin/service/cancel/appoint?id=${self.cancelForm.da.id}&cancelReason=${self.cancelForm.cancelReason}`).then(res => {
                    this.views.saveLoading = false;
                    this.views.openCancelD = false;
                    if(res.code === '000'){
                        this.fetchData();
                    }
                }).catch(err => {
                    this.views.saveLoading = false;
                });
            }
        },
        // 打开服务日期
        openServiceDate(){
            this.views.serviceDate = true;
            let d = self.$filter.date(DSP.serverTime);
            self.rili.yM = d;
                d = d.split("-");
            self.rili.ym = d;
            this.getMonthDay();
        },
        //获取某月能不能预约
        getMonthDay(){
            let day = this.rili.ym[0]+'-'+this.rili.ym[1];
            if(!this.views.dataLoding) {
                this.views.dataLoding = true;
                axios.get(`/api/wechat/admin/service/appoint/month/day/num?date=${day}`).then(res => {
                    this.rili.getMonthDay = res.data;
                    this.calendar();
                    this.views.dataLoding = false;
                }).catch(err => {
                    this.views.dataLoding = false;
                });
            }
        },
        //构建日历
        calendar(){
            let ym =  self.rili.ym;
            // ym 年月
            let y = ym[0];//年
            let m = ym[1];//月
            // 当前月1日是周几
            let firstDay = '';
            // 一共多少天
            let daysLen = '';
            // 要用几行
            let linesCount = 5;
            firstDay = new Date(y + ',' + m + ',01').getDay();
            daysLen = new Date(y,m, 0).getDate();

            if ((firstDay >= 5 && daysLen > 30) || (firstDay > 5 && daysLen >= 30)) {
                linesCount = 6;
            }

            if (Number(firstDay) === 0 && Number(daysLen) === 28) {
                linesCount = 4;
            }
            let len = linesCount * 7;
            let day = 1;
            let daysArr = [];
            for (let i = 0; i < len; i++) {
                if (i >= firstDay && i < (daysLen + firstDay)) {
                    daysArr[i] = day;
                    day++;
                } else {
                    daysArr[i] = '';
                }
            }
            let  monthArr = [];
            daysArr.forEach((o, index) => {
                if (daysArr[index] === "") {
                    monthArr.push({});
                } else {
                    let obj = {
                        day: daysArr[index],
                        day0: daysArr[index] < 10 ? ('0'+daysArr[index]) : daysArr[index],
                        y,
                        m,
                    };
                    obj.appointDate =  obj.y+'-'+obj.m+'-'+obj.day0;
                    if(this.rili.getMonthDay[obj.appointDate] ){
                        obj = Object.assign(obj,self.rili.getMonthDay[obj.appointDate]);
                        // obj.data = self.rili.getMonthDay[obj.appointDate];
                    }
                    monthArr.push(obj);
                }
            });
            self.daysObj = {};
            for (let i = 0; i < daysLen; i++) {
                self.$set(self.daysObj, i, monthArr.slice(i * 7, ((i + 1) * 7 - 1 + 1)));
            }
        },
        //设置当前天是可预约还是不可预约
        setData(da){
            let date = da.y +'-' + da.m + '-' + da.day0;
            let status = 'N';
            if(da.worked === "N"){
                status = 'Y';
            }
            if(!this.views.setDataL){
                this.views.setDataL = true;
                axios.put(`/api/wechat/admin/service/set/date?date=${date}&status=${status}`).then(res=> {
                    this.getMonthDay();
                    this.views.setDataL = false;
                }).catch(err =>{
                    this.views.setDataL = false;
                });
            }
        },
        //上一年上一个月
        changeDate(type){
            console.log(type);
            let a ='';
            if(type) {
                switch(type)
                {
                    case 'prevY':
                       a = (+self.rili.ym[0] -1) + '-' + self.rili.ym[1];
                        break;
                    case 'prevM':
                       a = +self.rili.ym[1] === 1 ? +(self.rili.ym[0] -1) + '-12' : +self.rili.ym[0] + '-' + (+self.rili.ym[1] -1);
                        break;
                    case 'nextM':
                       a = +self.rili.ym[1] === 12 ? +(+self.rili.ym[0] +1) + '-1' : (+self.rili.ym[0]) + '-' + (+self.rili.ym[1]%12 +1);
                        break;
                    case 'nextY':
                        a = (+self.rili.ym[0] +1) + '-' + self.rili.ym[1];
                        break;
                    default:
                        a = type;
                        break;
                }
            }
            self.rili.yM = a;
            self.rili.ym = a.split('-');
            self.getMonthDay();
        },
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
