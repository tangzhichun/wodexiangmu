/* jshint esversion: 6 */
import Vue from '@/scripts/module/vue';
import axios from '@/scripts/module/axios';
import enums from '@/scripts/module/enums';
import emp from '@/components/select/dsp-emp.vue';
import employee from '@/components/select/cms-employee.vue';
import pts from '@/components/select/dsp-pts.vue';
import cropper from '@/components/ui/dsp-cropper.vue';
import sjs from '@/components/ui/cms-sjsRZ.vue';

new Vue({
    el: '#app',
    delimiters: ['{[', ']}'],
    components: {
        // 员工组件
        'dsp-emp': emp,
        'cms-employee': employee,
        // 合作方组件
        'dsp-pts': pts,
        'dsp-cropper': cropper,
        'cms-sjsrz': sjs,
    },
    data: {
        meta:{
            categoryList: enums.categories,
            //设计师级别
            stylistGrade:enums.stylistGrade,
            identityList:enums.identityList,
            spreadType: [
                {value:'USER', label: '员工'},
                {value:'OPERATION', label: '合作方'},
                {value:'EDIT', label: '其他'}
            ],
        },
        employeeQuery:{
            category:0
        },
        views:{
            // 设置备注
            dialogVisible: false,
            // 推广认证
            spreadVisible: false,
            //设计师认证
            setDesignDesign:false,
            //用户列表
            loading: false,
            // 认证设计师防止重复提交
            saveStylistLoading: false,
        },
        //设计师认证的一些基本信息，从列表里面的item拿
        currDesign:null,
        // 模版查询条件
        templateQuery: {
            nickName: null,//昵称备注
            userCity: null,//昵称备注
            // 总条数
            totalSize: 0,
            // 每页多少条
            pageSize: 30,
            // 当前页面
            currentPage: 1,
            tableData: null
        },
        //界面输入的查询条件
        query: {
            category: null,
        },
        // 设置备注对话框数据
        currenItem:{
            remark: null,
            userId: null,
            id: null,
        },
        // 推广认证信息
        currenSpread:{
            userId: null,
            // 推广大使
            spreadName: {},
            mobile: null,
            emissaryType: null,
            agreement: null,
            name: null,
			dealerCode: null
        },
        //设计师认证
        $validator: {
            rule: {
                information: {
                    name: {required: true, minLength: 2},
                    addr:{required: true},
                    identity:{required: true},
                    level:{required: true},
                    imageUrl:{required: true},
                    wxQrcodeUrl:{required: true},
                    briefIntroduction:{required: true},
                }
            }
        },
        information: {
            identity:null,

            //设计师头像
            imageUrl:null,
            wxQrcodeUrl:null,
            designerCoverUrl:null,
            //姓名
            name: null,
            //地区
            addr: null,
            //级别
            level:null,
            myStyle:null,
            //门店/公司
            company:null,
            //简介
            briefIntroduction:null
        },
        list:{

        }
},
    methods: {
        // 获得用户
        fetchData: function (e) {
            let that = this;
            var tab = that.query.category;
            if(!tab){
                return;
            }
            if(e === 1){
                that.query[tab].currentPage = 1;
            }
            //构造地址栏hash参数
            window.location.hash = that.$base64Encode(that.query);
            let url = `/api/wechat/admin/userMp/findUserMps?page=${that.query[tab].currentPage}&size=${that.query[tab].pageSize}`;
            let params = {
                category: tab,
                userCity: that.query[tab].userCity,
                nickName: that.query[tab].nickName,
            };
            that.views.loading = true;
            axios.get(url, {params: params}).then((response) => {
                that.views.loading = false;

                if (response && response.success) {
                    if (response.data && response.data.results) {
                        that.$set(that.list,tab,response.data.results);
                        that.query[tab].totalSize = response.data.totalSize;
                    } else {
                        that.query[tab].tableData = [];
                        that.query[tab].totalSize = 0;
                    }
                }
            }).catch(error => {
                that.views.loading = false;
                console.error('error: %o', error);
            });
        },
        // 点击tab获取当前最新的category
        getCurrentCategory(key){
            this.query.category = key;
            this.fetchData();
        },
        // 设置备注
        setRemark(item, i) {
            this.addRemark = item.remarks && item.remarks.length ===  0   ? true : false;
            this.views.dialogVisible = true;
            this.currenItem = JSON.parse(JSON.stringify(item));
            // this.currenItem.id = item.remarks && item.remarks[0] && item.remarks[0].id;
            // this.currenItem.userId = item.id;
        },
        // 推广认证
        setSpread(item, i) {
            this.views.spreadVisible = true;
            this.currenSpread.userId = item.id;
            this.currenSpread.userData = JSON.parse(JSON.stringify(item));
            this.currenSpread.mobile = null;
            this.currenSpread.agreement = null;
            this.currenSpread.emissaryType = null;
            this.currenSpread.name = null;
			this.currenSpread.spreadName = {};
			this.currenSpread.dealerCode = null;
        },
        //设计师认证
        setDesign(item,i){
            this.views.setDesignDesign = true;
            this.currDesign = JSON.parse(JSON.stringify(item));
        },
        // 类别更改
        typeChange(val) {
            if(val ==='员工'){
                this.employeeQuery.category = 0;
            }else if(val === '合作方'){
                this.employeeQuery.category = 2;
            }else{
                this.employeeQuery.category = 4 ;
            }
            this.currenSpread.mobile = null;
            this.currenSpread.spreadName = {};
            this.currenSpread.agreement = null;
            this.currenSpread.name = null;
			this.currenSpread.dealerCode = null;
		},
        // /新建/保存备注
        saveRemark () {
            let that = this;
            //构造地址栏hash参数
            window.location.hash = that.$base64Encode(that.query);
            var currenItem = this.currenItem;
            let url = `/api/wechat-admin-service/wechat/admin/userMp/updateRemark?id=${currenItem.id}&remark=${currenItem.remark}`;
            that.views.loading = true;
            axios.put(url).then((response) => {
                that.views.loading = false;
                if (response && response.success) {
                    that.views.dialogVisible = false;
                    this.fetchData();
                }
            }).catch(error => {
                that.views.loading = false;
                console.error('error: %o', error);
            });
        },
        //点击每条多少页
        onSizeChange(val) {
            let that = this;
            that.query[that.query.category].pageSize = val;
            that.fetchData();
        },
        //点击每条那一页
        onCurrentChange(val) {
            let that = this;
            that.query[that.query.category].currentPage = val;
            that.fetchData();
        },
        // 保存推广大使
        saveEmissaryType() {
            let that = this;
            let currenSpread = that.currenSpread;
            // name:currenSpread.spreadName && currenSpread.spreadName.name,
            //     authMobile:currenSpread.spreadName && currenSpread.spreadName.mobile,
            //     unionId:currenSpread.userData.unionId,
            //     category:currenSpread.userData.category,
            let obj = {
                emissaryType:currenSpread.emissaryType,
                id:currenSpread.userId,
                repoId:currenSpread.spreadName.id,
            };
            if(currenSpread.spreadName && currenSpread.spreadName.agent){
                obj.dealerCode = currenSpread.spreadName.agent;
            }

            let url = `/api/wechat/admin/userMp/toBeEmissary`;
            that.views.loading = true;
            axios.put(url,obj).then((response) => {
                that.views.loading = false;
                if (response && response.success) {
                    that.views.spreadVisible = false;
                    this.fetchData();
                }
            }).catch(error => {
                that.views.loading = false;
                console.error('error: %o', error);
            });
        },
        // 进入用户详情
        userInformation(e){
            window.open('/user/userInformation?userId='+e.id);
        },
        //认证设计师
        saveStylist(e){
            let self = this;
            if(!self.views.saveStylistLoading ){
                const loading = this.$loading({
                    lock: true,
                    text: '认证中',
                    spinner: 'el-icon-loading',
                });
                this.views.saveStylistLoading = true;
                e.userId = self.currDesign.id;

                axios.post(`/api/mpuser/service/designer/add`,e).then(res => {
                    if(res.code === '000'){
                            self.views.saveStylistLoading = false;
                            self.views.setDesignDesign = false;
                            self.fetchData();
                            self.$message.success('认证成功');
                    }
                    self.views.saveStylistLoading = false;
                    loading.close();
                }).catch(err => {
                    loading.close();
                    self.views.saveStylistLoading = false;
                });
            }
        },
    },
    mounted() {
        let that = this;
        let tab = JSON.parse(JSON.stringify(DSP.xcx));
        if(tab[0]){
            that.query.category = tab[0] && tab[0].uniqueCode;
            tab.map(el => {
                that.$set(that.query,el.uniqueCode,JSON.parse(JSON.stringify(that.templateQuery)));
            });
        }else {
            this.$message('你无此操作权限，请联系管理员');
        }
        //根据浏览器地址栏的路由参数，初始化查询条件
        let hash = window.location.hash;
        if (hash != '') {
            try {
                let decoded = that.$base64Decode(hash.slice(1));
                if (typeof(decoded) == 'object') {
                    that.query = decoded;
                }
            } catch (error) {
                console.log(error);
            }
        }
        that.fetchData();
    }
});
