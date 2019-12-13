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
            CXHHR_REJECT_REASON:enums.dict('CXHHR_REJECT_REASON'),
        },
        tab:[
            {label:'待审核',value:'tab0'},
            {label:'已通过',value:'tab1'},
            {label:'已拒绝',value:'tab2'}
        ],

        views:{
            loading: false,
            auditD:false,
            auditL:false
        },
        // 界面输入的查询条件
        query:{
            currTab:'tab0',

            tab0: {
                name:'',
                recommendInfo:'',
                time:'',
                // 总条数
                totalSize: 0,
                // 每页多少条
                pageSize: 15,
                // 当前页面
                currentPage: 1,
            },
            tab1: {
                name:'',
                recommendInfo:'',
                time:'',
                // 总条数
                totalSize: 0,
                // 每页多少条
                pageSize: 15,
                // 当前页面
                currentPage: 1,
            },
            tab2: {
                name:'',
                recommendInfo:'',
                time:'',
                // 总条数
                totalSize: 0,
                // 每页多少条
                pageSize: 15,
                // 当前页面
                currentPage: 1,
            },
        },
        list:{
            tab0: [],
            tab1: [],
            tab2: [],
        },
        //审核数据
        auditData:{
            remark:null,
        },
    },
    methods: {
        changeTab(ba){
            this.query.currTab = ba;
            this.query[ba].currentPage = 1;
            this.fetchData();
        },
        //ajax
        fetchData (page) {
            let self = this;
            let query = self.query[self.query.currTab];
            //构造地址栏hash参数
            window.location.hash = self.$base64Encode(self.query);
            let url = `/api/mpuser/service/promotion/list`;
            let params ={
                category:self.query.currTab.charAt(self.query.currTab.length-1),
                page:page || query.currentPage,
                size:query.pageSize,
                promotionName:query.name,
                recommendName:query.recommendInfo,
                startDate:query.time && query.time[0],
                endDate:query.time && query.time[1],
            };
            if( self.views.loading){return;}
            self.views.loading = true;
            axios.get(url,{params:params}).then((response) => {
            self.views.loading = false;
                if (response && response.success && response.data) {
                        self.list[self.query.currTab] = response.data.results;
                        query.totalSize = response.data.totalSize;
                    } else {
                        self.list[self.query.currTab] = [];
                        query.totalSize = 0;
                    }
            }).catch(error => {
                self.views.loading =  false;
                console.error('error: %o', error);
            });
        },
        //打开对话框
        openAudit(el) {
            let self =this;
            this.auditData.temporaryData = JSON.parse(JSON.stringify(el));
            if( self.views.loading){return;}
            self.views.loading = true;
            axios.get(`/api/mpuser/service/promotion/selectRemark?id=${el.id}`).then(res => {
                self.views.loading = false;
                if(res.code === '000'){
                    self.auditData.history = res.data;
                    self.views.auditD = true;
                }
            }).catch(err => {
                self.views.loading = false;
            });
        },
        //审核type===yes通过
        save(type){
            let self =this;
            let obj = {
                "mobile": self.auditData.temporaryData.mobile,
                "name": self.auditData.temporaryData.name,
                "remark":  self.auditData.remark,
                "unionId": self.auditData.temporaryData.unionId,
                "id": self.auditData.temporaryData.id,
            };
            if(type ==='yes'){
                obj.status = 1;
                f(obj);
            }else {
                obj.status = 2;
                if(!obj.remark){
                    this.$message('亲！请输入审核备注');
                    return;
                }
                this.$confirm(`你确定拒绝${obj.name}的认证吗？`, {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    f(obj);
                });
            }
            function f(obj) {
                if(self.views.auditL){return;}
                self.views.auditL = true;
                axios.put('/api/mpuser/service/promotion/updateStatus',obj).then(res => {
                    self.views.auditL = false;
                    if(res.code === '000'){
                        self.closeAudit();
                        self.fetchData();
                    }
                }).catch(err =>{
                    self.views.auditL = false;
                });
            }

        },
        //关闭对话框
        closeAudit(){
            this.auditData.remark = null;
            this.auditData.temporaryData = null;
            this.views.auditD = false;
        }
    },
    created() {
        let self = this;
        let arr = JSON.parse(JSON.stringify(enums.dict('PARTNERSHIP')));
        arr.map(el => {
            if(el.children && Array.isArray(el.children)){
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
