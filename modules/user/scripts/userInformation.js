/* jshint esversion: 6 */
import Vue from '@/scripts/module/vue';
import axios from '@/scripts/module/axios';
import enums from "@/scripts/module/enums";
import phone from '@/components/ui/dsp-phone.vue';
//设计师认证
import sjs from '@/components/ui/cms-sjsRZ.vue';
// 图片组件
import img from '@/components/ui/dsp-img.vue';

var echarts = require('echarts');


new Vue({
    el: '#app',
    delimiters: ['{[', ']}'],
    components: {
        'dsp-phone': phone,
        'cms-sjsrz': sjs,
        'dsp-img': img,

    },
    data: {
        meta:{
            FWHX: enums.FWHX,
            registerUserStage: enums.registerUserStage,
            CUST_HOUSE_TYPE: enums.CUST_HOUSE_TYPE,
            shareMethod:enums.shareMethod,
            identityList:enums.identityList,
            gzhLaiyuan:enums.gzhLaiyuan,
            generalizePage:enums.generalizePage,
            BRAND:enums.BRAND,
            productCategorie:enums.REQUIRECATEGORY,
            KHLY: enums.dict('KHLY'),
            TIME_UNIT: enums.TIME_UNIT,
            //创薪合伙人等级
            PROMOTIONLEVEL: enums.PROMOTIONLEVEL,
            //小程序，公众号
            xiaochengxu:[],
            position:[],
            xianshangmei:[
                {label:'小程序:悟空快装翻新',value:'REFORM'},
                {label:'小程序:索菲亚定制+',value:'DESIGN'},
                {label:'公众号:索菲亚定制+',value:'sogal'},
                {label:'公众号:悟空快装翻新',value:'wukong'},
                {label:'公众号:美家创薪',value:'mjcx'},
            ]
        },
        // 用户详情
        userData:null,
        loading:{
            visit:false,
            lookDesign:false,
            //加载设计方案预览
            lookDesignView:false,
            //点击canvas
            clickCanvas:true,
            //加载裂变图数据
            lieBianTuData:false,
            //方案列表
            fangan:false,

            //其他报名-收藏-订单
            qturl1:false,
            qturl2:false,
            qturl3:false,
            qturl4:false,

            //防止重复调用下拉菜单
            get:false,
            setDesignDesign:false,
             //    修改设计师
            designerUpdate:false,
            //访问记录列表 对话框
            visitD:false,
            visitL:false,

            //对话框
            monthBillD:false,
            monthBillL:false,

        },
        //修改设计师data
        designData:null,
        //预览设计方案数据
        information:null,
        //右侧tab
        currtab:'visit',
        tab:[
                {value:'visit',label:'访问记录'},
                {value:'lieBianTu',label:'裂变图'},
                {value:'generalize',label:'推广记录'},
                {value:'user',label:'客户报名'},
                {value:'fangan',label:'设计方案',sjs:true},
                {value:'other',label:'其他'},

            ],

        //todo 裂变图
        //默认显示层级
        tierValue:2,
        //人物关系数据
        lieBianTu:null,
        //最近优先 || 最早优先
        method:'FIRST',
        //层级翻译
        ceng : {
            firstUserId:{next:'secondUserId',i:1,top:null},
            secondUserId:{next:'thirdUserId',i:2,top:'firstUserId'},
            thirdUserId:{next:'fourthUserId',i:3,top:'secondUserId'},
            fourthUserId:{next:'fifthUserId',i:4,top:'thirdUserId'},
            fifthUserId:{next:'sixthUserId',i:5,top:'fourthUserId'},
            sixthUserId:{next:'seventhUserId',i:6,top:'fifthUserId'},
            seventhUserId:{next:'eighthUserId',i:7,top:'sixthUserId'},
            eighthUserId:{next:'eighthUserId',i:8,top:'seventhUserId'},
            ninthUserId:{next:'ninthUserId',i:9,top:'eighthUserId'},
            tenthUserId:{next:null,i:10,top:'ninthUserId'},
        },
        //可以看到对数据
        echarts:{
            lookName:[],
        },
        //其他
        otherList:{
            url1:[],
            url2:[],
            url3:[],
            url4:[],
        },



        listAll:{
            visitList:[],           //tab   访问记录
            generalizeList:[],      //tab   推广记录
            userList:[],            //tab   客户报名
            fanganList:[],          //tab   设计方案
            groupList:[],           //tab   团队
            monthBillList:[],       //tab   月结账单
            visitDList:[],          //对话框 推广记录-访问记录
            monthBillDList:[],      //对话框 月结账单明细
        },
        queryAll:{
            visitQuery:{
                time:'',
                // 总条数
                totalSize: 0,
                // 每页多少条
                pageSize: 15,
                // 当前页面
                currentPage: 1,
            },
            generalizeQuery:{
                visitMethods:'',
                time:'',
                // 总条数
                totalSize: 0,
                // 每页多少条
                pageSize: 15,
                // 当前页面
                currentPage: 1,
            },
            userQuery:{
                //时间
                time:'',
                // 总条数
                totalSize: 0,
                // 每页多少条
                pageSize: 15,
                // 当前页面
                currentPage: 1,
            },
            fanganQuery:{
                // 总条数
                totalSize: 0,
                // 每页多少条
                pageSize: 15,
                // 当前页面
                currentPage: 1,
            },
            groupQuery:{
                // 总条数
                totalSize: 0,
                // 每页多少条
                pageSize: 15,
                // 当前页面
                currentPage: 1,
                promotionName:'',
                level:'',
            },
            monthBillQuery:{
                // 总条数
                totalSize: 0,
                // 每页多少条
                pageSize: 15,
                // 当前页面
                currentPage: 1,
                currentYears: '',
            },
            visitDQuery:{
                tuidata:null,
                method:'',
                time:'',
                // 总条数
                totalSize: 0,
                // 每页多少条
                pageSize: 15,
                // 当前页面
                currentPage: 1,
            },
            monthBillDQuery:{
                rewardType:'' // ''总收入 0成交 1测量 2团队
            },
        },
    },
    methods: {
        //获取拥有那些账户 小程序 公众号
        handleClick(e) {
            if (e) {
                if (this.loading.get) {
                    return;
                }
                this.loading.get = true;
                let id = this.userData.unionId || this.userData.unionid;
                console.log(id);
                axios.get('/api/wechat/admin/userMp/getCategoryTypeByUnionId?unionId=' + id).then(res => {
                    if (res.code === '000' && Array.isArray(res.data)) {
                        this.meta.xiaochengxu = res.data;
                    } else {
                        this.meta.xiaochengxu = [];
                    }
                    this.loading.get = false;
                }).catch(err => {
                    this.meta.xiaochengxu = [];
                    this.loading.get = false;
                });
            }
        },
        handleCommand(e) {
            console.log(e);
            if (e.type === 'mp') {
                location.href = '/user/userInformation?userId=' + e.id;
            } else {
                location.href = '/user/userInformation?gzhUserId=' + e.id;
            }
        },
        handleCommandfu(e) {
            let str = '';
            if (e === 'openId') {
                str = this.userData.openId || this.userData.openid;
            } else {
                str = this.userData.unionId || this.userData.unionid;
            }
            var tag = document.createElement('input');
            tag.setAttribute('id', 'cp_hgz_input');
            tag.value = str;
            document.getElementsByTagName('body')[0].appendChild(tag);
            document.getElementById('cp_hgz_input').select();
            document.execCommand('copy');
            document.getElementById('cp_hgz_input').remove();
            this.$message('已复制好' + e + '，可贴粘。');
        },
        // 获取用户基础信息
        getUserInfo(type = false) {
            let self = this;
            axios.get(`/api/wechat/admin/userMp/${DSP.userId}/detail/info`).then(res => {
                if (res.data) {
                    this.userData = res.data;
                    //获取用户所在部门
                    if (res.data && res.data.emissaryType && res.data.authMobile && res.data.isEmissary) {
                        this.getAuthDepartment(res.data);
                    }
                    //创薪合伙人
                    if(res.data.promotionStatus === 1 && res.data.unionId){
                        self.getExtendResult(res.data.unionId);
                    }
                    if (type) {
                        self.changeTab(self.currtab);
                    }
                }
            });
        },
        //  获取创薪合伙人
        getExtendResult(e){
            axios.get(`/api/mpuser/service/reward/getExtendResult?unionId=${e}`).then(res => {
                if (res.data) {
                    this.userData=Object.assign(res.data,this.userData);
                }
            });
        },
        //  获取认证部门
        getAuthDepartment(el) {
            axios.get(`/api/mpuser/service/agent/getAuthDepartment?mobile=${el.authMobile}&emissaryType=${el.emissaryType}`).then(res => {
                if (res.code === '000' && res.data) {
                    this.userData.company = res.data && res.data.company;
                }
            });
        },

        //查看desing
        lookDesign(e, id) {
            let self = this;
            this.loading.lookDesignView = true;
            this.loading.lookDesign = true;
            axios.get(`/api/wechat/admin/design/detail?id=${id || e.designId || e.id}`).then(res => {
                self.loading.lookDesignView = false;
                if (res.success) {
                    self.information = JSON.parse(JSON.stringify(res.data));
                    if (!self.information.wechatImage) {
                        self.information.wechatImage = {};
                        this.$set(self.information.wechatImage, 'ext', null);
                        this.$set(self.information.wechatImage, 'imageMd5', null);
                        this.$set(self.information.wechatImage, 'imageUrl', null);
                        this.$set(self.information.wechatImage, 'name', null);
                        this.$set(self.information.wechatImage, 'reduceUrl', null);
                    }
                    if (!self.information.posterImage) {
                        self.information.posterImage = {};
                        this.$set(self.information.posterImage, 'ext', null);
                        this.$set(self.information.posterImage, 'imageMd5', null);
                        this.$set(self.information.posterImage, 'imageUrl', null);
                        this.$set(self.information.posterImage, 'name', null);
                        this.$set(self.information.posterImage, 'reduceUrl', null);
                    }
                    console.log(self.information.kind);
                    self.information.categoryArr = [];
                    self.information.categoryArr.push(self.information.category);
                    self.information.categoryArr.push(self.information.kind);
                    if (!self.information.bindingSignResultEntities) {
                        this.$set(this.information, 'signs', []);
                    } else {
                        this.$set(this.information, 'signs', self.information.bindingSignResultEntities);
                    }
                    self.loadingS.lookDesignView = true;
                }
            }).catch(err => {
                self.loading.lookDesignView = false;
            });
        },
        //获取关系图数据
        getcavas() {
            let self = this;
            self.echarts.lookName = [];
            self.loading.lieBianTuData = true;
            axios.get(`/api/wechat/admin/userMp/${self.method}/${DSP.userId}/fission/info`).then(res => {
                self.loading.lieBianTuData = false;
                if (res.data) {
                    let obj = res.data;
                    let background = {
                        1: '#409eff',
                        2: '#f98064',
                        3: '#56bb8a',
                        4: '#fabb00',
                        5: '#f98064',
                        6: '#56bb8a',
                        7: '#fabb00',
                        8: '#f98064',
                        9: '#56bb8a',
                        10: '#fabb00'
                    };
                    //组合成树形结构
                    if (res.data && res.data.userInfo) {
                        obj.echartsData = res.data && res.data.userInfo && res.data.userInfo.map(el => {
                            let obj2 = {
                                name: el.id,
                                value: el.name || el.nickName
                            };
                            if (res.data && res.data.userNextNum && res.data.userNextNum[el.id]) {
                                obj2.value = obj2.value + '\n' + res.data.userNextNum[el.id];
                                if (res.data.userNextNum[el.id] * 10 > 140) {
                                    obj2.symbolSize = 120;
                                } else if (res.data.userNextNum[el.id] * 10 < 50) {
                                    obj2.symbolSize = 50;
                                } else {
                                    obj2.symbolSize = res.data.userNextNum[el.id] * 10;
                                }
                            } else {
                                obj2.value = obj2.value + '\n' + 0;
                                obj2.symbolSize = 50;
                                obj2.itemStyle = {
                                    color: '#bebebe'
                                };
                            }
                            obj.levelInfo.map(i => {
                                let arr = Object.keys(i);
                                // let bc = background[self.randomNum(3,3)];
                                //每一条关系
                                arr.map(k => {
                                    if (i[k] === el.id) {
                                        if (!obj2.ji) {
                                            obj2.ji = self.ceng[k].i;
                                        }
                                        if (!obj2.itemStyle) {
                                            obj2.itemStyle = {
                                                color: background[obj2.ji]
                                            };
                                        }
                                        if (self.ceng[k].i !== 1) {
                                            obj2.top = i[self.ceng[k].top];
                                        }
                                    }
                                });
                            });
                            return obj2;
                        });
                    }
                    this.lieBianTu = obj;
                    setTimeout(() => {
                        self.createdCanvas();
                    }, 100);
                }
            }).catch(err => {
                self.loading.lieBianTuData = false;
            });
        },
        //查询他的下一级人
        countPerson(el) {
            let self = this;
            let arr = [];
            self.lieBianTu.echartsData.map(k => {
                if (k.top === el && !self.echarts.lookName.find(j => {
                    return k.name === j.name;
                })) {
                    arr.push(k);
                }
            });
            self.echarts.lookName = arr.concat(self.echarts.lookName);
            self.createdCanvas();
        },
        //构建canvas
        createdCanvas() {
            let self = this;
            // 基于准备好的dom，初始化echarts实例
            let myChart = echarts.init(document.getElementById('main'));
            myChart.on('click', function (params) {
                if (params.dataType === 'node' && self.loading.clickCanvas && params.data.ji !== 1) {
                    self.loading.clickCanvas = false;
                    self.countPerson(params.name);
                }
                setTimeout(() => {
                    self.loading.clickCanvas = true;
                }, 500);
            });
            let mylabel = {
                show: true,                  //是否显示标签。
                position: "inside",          //标签的位置。// 绝对的像素值[10, 10],// 相对的百分比['50%', '50%'].'top','left','right','bottom','inside','insideLeft','insideRight','insideTop','insideBottom','insideTopLeft','insideBottomLeft','insideTopRight','insideBottomRight'
                // offset:[30, 40],             //是否对文字进行偏移。默认不偏移。例如：[30, 40] 表示文字在横向上偏移 30，纵向上偏移 40。
                formatter: '{c}',       //标签内容格式器。模板变量有 {a}、{b}、{c}，分别表示系列名，数据名，数据值。
            };
            let arr = [];
            if (self.lieBianTu && self.lieBianTu.echartsData) {
                self.lieBianTu.echartsData.map(el => {
                    if (el.ji <= self.tierValue) {
                        arr.push(el);
                    }
                });
            }
            arr = arr.concat(self.echarts.lookName);
            let option = {
                series: [
                    {
                        type: 'graph', // 类型:关系图
                        layout: 'force', //图的布局，类型为力导图
                        // symbolSize: 40, // 调整节点的大小
                        roam: true, // 是否开启鼠标缩放和平移漫游。默认不开启。如果只想要开启缩放或者平移,可以设置成 'scale' 或者 'move'。设置成 true 为都开启
                        // edgeSymbol: ['circle', 'arrow'],
                        edgeSymbolSize: [2, 10],
                        force: {
                            repulsion: 2500,
                            edgeLength: [10, 50],
                            // layoutAnimation:false
                        },
                        // draggable: true,
                        label: {                      //图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等，
                            normal: mylabel,
                            emphasis: mylabel
                        },

                        // 数据
                        data: arr,
                        links: self.lieBianTu && self.lieBianTu.userFissonInfo,
                    }
                ]
            };
            myChart.setOption(option);
        },
        //取消认证
        delSpread() {
            let self = this;
            this.$confirm(`你确定取消${self.userData.name}认证吗?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                axios.put(`/api/wechat/admin/userMp/cancel/emissary/${self.userData.id}`).then(res => {
                    if (res.code === '000') {
                        self.getUserInfo();
                        self.$message({
                            type: 'success',
                            message: '已取消认证!'
                        });
                    }
                });
            });
        },
        deldesignerStatus() {
            let self = this;
            this.$confirm(`你确定取消${self.userData.designerName}设计认证吗?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                axios.put(`/api/mpuser/service/designer/cancel/auth/${self.userData.unionId}`).then(res => {
                    if (res.code === '000') {
                        self.getUserInfo();
                        self.$message({
                            type: 'success',
                            message: '已取消认证!'
                        });
                    }
                });
            });
        },
        //  其他
        getOther() {
            let that = this;
            //报名
            let url1 = `/api/wechat/admin/user/${this.userData.id}/self/sign/up/info`;
            //收藏
            let url2 = `/api/wechat/admin/user/${this.userData.id}/self/collect/info?pageStart=1&pageSize=100&isPaged=false`;
            //订单
            let url3 = `/api/wechat/admin/user/${this.userData.id}/self/order/info`;
            //优惠券
            let url4 = `/api/wechat/admin/userMp/view/user/coupon?userId=${this.userData.id}`;

            this.qtaxios(url1, 'qturl1', 'url1');
            this.qtaxios(url2, 'qturl2', 'url2');
            this.qtaxios(url3, 'qturl3', 'url3');
            this.qtaxios(url4, 'qturl4', 'url4');
        },
        qtaxios(url, loading, list) {
            let that = this;
            this.loading[loading] = true;
            axios.get(url).then(res => {
                that.loading[loading] = false;
                if (Array.isArray(res.data)) {
                    that.otherList[list] = res.data;
                } else {
                    that.otherList[list] = res.data && res.data.results || [];
                }
            }).catch(err => {
                console.log(err);
                that.otherList[list] = [];
                that.loading[loading] = false;
            });
        },
        //查询公众号用户详情
        getgzhUserInfo(type = false) {
            let self = this;
            axios.get(`/api/wechat-service/wechat/more/getUserDetail?id=${DSP.gzhUserId}`).then(res => {
                if (res.data) {
                    this.userData = res.data;
                }
            });
        },
        //  取消设计师认证或者修改认证
        sjs(e) {
            let self = this;
            if (e === 'a') {
                this.deldesignerStatus();
            } else {
                axios.get(`/api/mpuser/service/designer/getDesigner?unionId=${self.userData.unionId || self.userData.unionid}`).then(res => {
                    if (res.code === '000' && res.data) {
                        self.designData = JSON.parse(JSON.stringify(res.data));
                        self.loading.setDesignDesign = true;
                    }
                });
            }
        },
        saveStylist(e) {
            let self = this;
            if (self.loading.designerUpdate) {
                return;
            }
            const loading = this.$loading({
                lock: true,
                text: '修改中',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            self.loading.designerUpdate = true;
            axios.put(`/api/mpuser/service/designer/update`, e).then(res => {
                loading.close();
                self.loading.designerUpdate = false;
                if (res.code === '000') {
                    this.loading.setDesignDesign = false;
                    this.getUserInfo();
                }
            }).catch(err => {
                loading.close();
                self.loading.designerUpdate = false;
            });
        },
        // 取消创薪合伙人认证
        delPromotion(){
            let self = this;
            this.$confirm(`你确定取消此创薪合伙人认证吗?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                axios.put(`/api/mpuser/service/promotion/cancel/${self.userData.unionId}`).then(res => {
                    if(res.code === '000'){
                        self.getUserInfo();
                        self.$message({
                            type: 'success',
                            message: '已取消认证!'
                        });
                    }
                });
            });
        },
        //构造地址栏hash参数
        createHash() {
            let obj = {
                currtab: this.currtab,
                fanganQuery: this.fanganQuery,
                generalizeQuery: this.generalizeQuery,
                userQuery: this.userQuery,

                queryAll: this.queryAll,
            };
            window.location.hash = this.$base64Encode(obj);
        },
        //  序号
        indexMethod(index, type) {
            let i = this.queryAll[type].pageSize * (this.queryAll[type].currentPage - 1) + 1;
            return i + index;
        },
        //切换tab 查询列表回到第一页
        changeTab(e,ty) {
            let self = this;
            this.currtab = e;
            this.createHash();
            if (!DSP.userId) {
                return;
            }
            if (this.currtab === 'visit') {
                if(ty){
                    this.queryAll[e + 'Query'].currentPage = 1;
                }
                let url = `/api/wechat/admin/userMp/${DSP.userId}/visit/record/${this.queryAll[e + 'Query'].currentPage}/${this.queryAll[e + 'Query'].pageSize}`;
                let obj = JSON.parse(JSON.stringify(self.queryAll[e + 'Query']));
                let params = {
                    visitDateBegin: obj && obj.time && obj.time[0],
                    visitDateEnd: obj && obj.time && obj.time[1],
                };
                this.getAll(url,params,'fangan',`${e}List`,`${e}Query`);
            }
            else if (this.currtab === 'lieBianTu') {
                this.getcavas();
            }
            else if (this.currtab === 'generalize') {
                if(ty){
                    this.queryAll[e + 'Query'].currentPage = 1;
                }
                let obj = JSON.parse(JSON.stringify(self.queryAll[e + 'Query']));
                let url = `/api/wechat/admin/userMp/share/record/${obj.currentPage}/${obj.pageSize}?userId=${DSP.userId}`;
                let params = {
                    queryTimeBegin: obj && obj.time && obj.time[0],
                    queryTimeEnd: obj && obj.time && obj.time[1],
                    methods:obj && obj.methods
                };
                this.getAll(url,params,'fangan',`${e}List`,`${e}Query`);
            }
            else if (this.currtab === 'user') {
                if(ty){
                    this.queryAll[e + 'Query'].currentPage = 1;
                }
                let obj = JSON.parse(JSON.stringify(self.queryAll[e + 'Query']));
                let url = `/api/wechat/admin/userMp/${DSP.userId}/sign/up/info/${obj.currentPage}/${obj.pageSize}`;
                let params = {
                    pageStart:obj.currentPage,
                    pageSize: obj.pageSize,
                    userId: DSP.userId,
                    dateCreatedBegin :obj.time && obj.time[0],
                    dateCreatedEnd :obj.time && obj.time[1]
                };
                this.getAll(url,params,'fangan',`${e}List`,`${e}Query`);
            }
            else if (this.currtab === 'other') {
                this.getOther();
            }
            else if (this.currtab === 'group') {
                let obj = JSON.parse(JSON.stringify(self.queryAll[e + 'Query']));
                let url = `/api/user-service/mpuser/service/reward/getGroupList`;
                let params = {
                    page: obj.currentPage,
                    size: obj.pageSize,
                    promotionName: obj.promotionName,
                    level: obj.level,
                    userNo: self.userData.userNo,
                };
                this.getAll(url,params,'group',`${e}List`,`${e}Query`);
            }
            else if (this.currtab === 'monthBill') {
                let url = `/api/mpuser/service/reward/getMonthSettleAccounts`;
                let obj = JSON.parse(JSON.stringify(self.queryAll[e + 'Query']));
                let params = {
                    page: obj.currentPage,
                    size: obj.pageSize,
                    unionId:self.userData.unionId,
                    currentYears:obj.currentYears,
                };
                this.getAll(url,params,'monthBill',`${e}List`,`${e}Query`);
            }
            else {
                //设计师
                let obj = JSON.parse(JSON.stringify(self.queryAll[e + 'Query']));
                let url = `/api/wechat/admin/design/${self.userData.designerId}/page/size?page=${obj.currentPage}&size=${obj.pageSize}`;
                this.getAll(url,{},'fangan',`${e}List`,`${e}Query`);
            }
        },
        /*
        * 必传    url       接口路径
        * 必传    query     请求参数
        * 必传    loading   防止重复调用loading状态
        * 必传    list      请求出来list的赋值给谁
        * 必传    qu        要对总条数赋值
        * */
        getAll(url,query,loading,list,qu){
            let self = this;
            this.createHash();
            self.loading[loading] = true;
            axios.get(url, {params: query}).then((response) => {
                self.loading[loading] = false;
                if(response && response.success){
                    if(response.data && Array.isArray(response.data)){
                        self.listAll[list] = response.data;
                        self.queryAll[qu].totalSize = response.data.length;
                    }else if(response.data && response.data.results && Array.isArray(response.data.results)){
                        self.listAll[list] = response.data.results;
                        console.log(2);
                        self.queryAll[qu].totalSize = response.data.totalSize;
                    }else {
                        self.listAll[list] = [];
                        self.queryAll[qu].totalSize = 0;
                    }
                }else {
                    self.listAll[list] = [];
                }
            }).catch(error => {
                self.listAll[list] = [];
                self.loading[loading] = false;
                console.error('error: %o', error);
            });
        },
        //打开访问记录列表
        openVisitD(e) {
            this.queryAll.visitDQuery.tuidata = JSON.parse(JSON.stringify(e));
            this.loading.visitD = true;
            this.queryAll.visitDQuery.currentPage = 1;
            this.getVisit();
        },
        //对话框 访问记录
        getVisit(e) {
            let self = this;
            if(e){
                self.queryAll.visitDQuery.currentPage = 1;
            }
            let url = `/api/wechat/admin/userMp/visit/record/${self.queryAll.visitDQuery.currentPage}/${self.queryAll.visitDQuery.pageSize}`;
            let obj = JSON.parse(JSON.stringify(self.queryAll.visitDQuery));
            let params = {
                shareRecordId: obj.tuidata && obj.tuidata.shareRecordId,
                visitMethods: obj.visitMethods,
                visitDateBegin: obj.time && obj.time[0]+ ':00:00',
                visitDateEnd: obj.time && obj.time[1]+ ':00:00',
            };
            this.getAll(url,params,'visitl','visitDList','visitDQuery');
        },
        //打开月结算单明细
        openMonthBillD(e) {
            this.queryAll.monthBillDQuery.data = JSON.parse(JSON.stringify(e));
            console.log(this.queryAll.monthBillDQuery);
            this.loading.monthBillD = true;
            this.getMonthBillD();
        },
        getMonthBillD() {
            let self = this;
            let url = `/api/mpuser/service/reward/getMonthSettleAccountsDetail`;
            let obj = JSON.parse(JSON.stringify(self.queryAll.monthBillDQuery));
            console.log(obj);
            let params = {
                id:obj.data.id,
                rewardType:obj.rewardType
            };
            this.getAll(url,params,'monthBillL','monthBillDList','monthBillDQuery');
        },


    },
    mounted(){
        //根据浏览器地址栏的路由参数，初始化查询条件
        let hash = window.location.hash;
        let self = this;
        let arr = JSON.parse(JSON.stringify(enums.dict('PARTNERSHIP')));
        arr.map(el => {
            if(Array.isArray(el.children)){
                el.children.map(ele => {
                    let obj1 = {
                        label:el.label +'--'+ele.label,
                        value:el.value+','+ ele.value,
                    };
                    let obj = {
                        label:el.label +'--'+ele.label,
                        value:ele.value.replace('.',','),
                    };
                    self.meta.position.push(obj);
                    self.meta.position.push(obj1);
                });
            }
        });
        if (hash != '') {
            try {
                let decoded = this.$base64Decode(hash.slice(1));
                if (typeof(decoded) == 'object') {
                  this.currtab = decoded.currtab;
                  // this.visitQuery =  decoded.query;
                  this.generalizeQuery =  decoded.generalizeQuery;
                  this.userQuery =  decoded.userQuery;

                  this.queryAll =  decoded.queryAll;
                }
            } catch (error) {}
        }
        if(DSP.userId){
            this.getUserInfo(true);
        }else if(DSP.gzhUserId){
            this.getgzhUserInfo(true);
        }
    }
});
