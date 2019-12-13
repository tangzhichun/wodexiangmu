/* jshint esversion: 6 */
import  Vue from '@/scripts/module/vue';
import axios from '@/scripts/module/axios';
import empty from "@/components/ui/dsp-empty.vue";
import phone from '@/components/ui/dsp-phone.vue';
import enums from '@/scripts/module/enums';


let wxList = new Vue({
    el: '#app',
    delimiters: ['{[', ']}'],
    components: { empty,
            'dsp-phone': phone,
    },
    data: {
        meta:{
            cmsColumn :enums.dict('CMS_COLUMN')
        },
        specialDetails:null,
        value:true,
        views:{
            specialDetails:false,
            tableData:false,
            //是否禁用更改
            disabledPublishStatus:false,
            visible:false,
            //预览
            lookDesign:false,
            lookDesignView:false,
        },
        query:{
            // 总条数
            totalSize: 0,
            // 每页多少条
            pageSize: 15,
            // 当前页面
            currentPage: 1,
            // 标题
            title:null,
        },
        information:null,
        tableData:[],
    },
    methods: {
        indexMethod(index) {
            let i = this.query.pageSize * (this.query.currentPage - 1) + 1;
            return i + index;
        },

        fetchData () {
            let self = this;
            let url = `/api/wechat/admin/special/topic/articleList?page=${self.query.currentPage}&size=${self.query.pageSize}`;
            let params ={
                specialId:DSP.specialDetailsId,
                title:self.query.title
            };
            window.location.hash = self.$base64Encode(self.query);
            axios.get(url, {params: params}).then((res) => {
                if(res.code === '000'){
                    this.tableData = res.data.results;
                    this.query.totalSize = res.data.totalSize;
                }
            }).catch(error => {
            });
        },
        getSpecialDetails(){
            axios.get(`/api/wechat/admin/special/topic/detail?id=${DSP.specialDetailsId}`).then(res => {
                if(res.code === '000' && res.data){
                    if ( res.data.publishStatus === 0 ){
                        res.data.publishStatusFlag = false;
                    }else {
                        res.data.publishStatusFlag = true;
                    }
                    this.specialDetails = res.data;
                }
            });
        },
        editPublishStatus(e){
            let url = '/api/wechat/admin/special/topic/cancel?id='+DSP.specialDetailsId;
            if(e){
                 url = '/api/wechat/admin/special/topic/publish?id='+DSP.specialDetailsId;
            }
            this.views.disabledPublishStatus =true;
            axios.put(url).then(res => {
                this.views.disabledPublishStatus =false;
                this.getSpecialDetails();
                if(res.code === '802'){
                    this.$message.error('专题最少包含3篇文章才可发布');
                }
            }).catch(err => {
                this.getSpecialDetails();
                this.views.disabledPublishStatus =false;
            });
        },
        del(e){
            let self = this;
            let obj = {
                designId: e.designId,
                specialId: e.specialId
            };
            this.$confirm(`你确定将此文章移出${self.specialDetails.name}专题吗?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                axios.delete('/api/wechat/admin/special/topic/deleteArticle', {data:obj}).then(res => {
                    if(res.code === '000'){
                        self.views.visible = false;
                        self.$message('移除成功');
                        self.fetchData();
                        self.getSpecialDetails();
                    }else if(res.code === '802'){
                        self.$message.error('已发布专题最少包含3篇文章');
                    }
                });
            });

        },
        //预览获取文章详情
        lookDesign(e){
            let self = this;
            self.views.lookDesign = true;
            axios.get(`/api/wechat/admin/design/detail?id=${e}`).then(res =>{
                self.views.lookDesign = false;
                if(res.success){
                    self.information = JSON.parse(JSON.stringify(res.data));
                    if(!self.information.wechatImage){
                        self.information.wechatImage = {};
                        this.$set(self.information.wechatImage,'ext', null);
                        this.$set(self.information.wechatImage,'imageMd5', null);
                        this.$set(self.information.wechatImage,'imageUrl', null);
                        this.$set(self.information.wechatImage,'name', null);
                        this.$set(self.information.wechatImage,'reduceUrl', null);
                    }
                    if(!self.information.posterImage){
                        self.information.posterImage = {};
                        this.$set(self.information.posterImage,'ext', null);
                        this.$set(self.information.posterImage,'imageMd5', null);
                        this.$set(self.information.posterImage,'imageUrl', null);
                        this.$set(self.information.posterImage,'name', null);
                        this.$set(self.information.posterImage,'reduceUrl', null);
                    }
                    self.information.categoryArr = [];
                    self.information.categoryArr.push(self.information.category);
                    self.information.categoryArr.push(self.information.kind);
                    if(!self.information.bindingSignResultEntities){
                        this.$set(this.information,'signs', []);
                    }else {
                        this.$set(this.information,'signs', self.information.bindingSignResultEntities);
                    }
                    self.views.lookDesignView = true;
                }
            }).catch(err => {
                self.views.lookDesign = false;
            });
        },
    },
    created () {
        let self = this;
        let hash = window.location.hash;
        if (hash != '') {
            try {
                let decoded = self.$base64Decode(hash.slice(1));
                if (typeof(decoded) === 'object') {
                    self.query = decoded;
                }
            } catch (error) {}
        }
        if(DSP.specialDetailsId){
            self.fetchData();
            self.getSpecialDetails();
        }

    }
});
