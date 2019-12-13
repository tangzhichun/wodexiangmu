/* jshint esversion: 6 */
import Vue from '@/scripts/module/vue';
import axios from '@/scripts/module/axios';
import enums from '@/scripts/module/enums';
import emp from '@/components/select/dsp-emp.vue';
import pts from '@/components/select/dsp-pts.vue';
import cropper from '@/components/ui/dsp-cropper.vue';

new Vue({
    el: '#app',
    delimiters: ['{[', ']}'],
    components: {
        // 员工组件
        'dsp-emp': emp,
        // 合作方组件
        'dsp-pts': pts,
        'dsp-cropper': cropper,
    },
    data: {
        meta:{
            cmsColumn :enums.dict('CMS_COLUMN')
        },
        $validator: {
            rule: {
                specialFrom: {
                    name: {required: true, minLength: 2},
                    kind:{required: true},
                    imageUrl:{required: true},
                    detailUrl:{required: true},
                }
            }
        },
        //查询条件
        query:{
            name:'',
            kind:'',
            // 总条数
            totalSize: 0,
            // 每页多少条
            pageSize: 100,
            // 当前页面
            currentPage: 1,
        },
        topicList:[],
        views:{

            //获取专题列表loading
            topicListLoading:false,
            //是否打开新增编辑专题框
            addSpecial:false,
            //保存专题loading
            saveSpecial:false,
        },
        specialFrom:{
            //专题名称
            name:'',
            //专题类别
            kind:'',
            //封面img
            imageUrl:'',
            detailUrl:'',
        }
    },
    methods: {
        fetchData(){
            let self = this;
            window.location.hash = self.$base64Encode(self.query);
            let obj ={
                name:self.query.name,
                kind:self.query.kind && self.query.kind[1] ||self.query.kind[0],
            };
            if(self.views.topicListLoading){
                return;
            }
            self.views.topicListLoading = true;
            axios.get(`/api/wechat/admin/special/topic/list?page=${self.query.currentPage}&size=${self.query.pageSize}`, {params: obj}).then(res => {
                self.views.topicListLoading = false;
                if(res.code === '000'){
                    self.topicList = res.data.results;
                    self.query.totalSize = res.data.totalSize;
                }else {
                    self.topicList = [];
                    self.query.totalSize = 0;
                }
            }).catch(err => {
                self.views.topicListLoading = false;
                self.topicList = [];
                self.query.totalSize = 0;
            });
        },
        //编辑||删除||发布||下线下拉框
        handleClick(e){
            let self = this;
            if(e.type === 'edit'){
                this.editSpecial(e.a);
            }
            else if(e.type === 'del'){
                this.$confirm(`此操作将永久删除<span style='color: red'>${e.a.name}</span>专题, 是否继续?`, '提示', {
                    dangerouslyUseHTMLString: true,
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    axios.delete(`/api/wechat/admin/special/topic?id=${e.a.id}`).then(res => {
                        if(res.code === '000'){
                            self.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            self.fetchData();
                        }else if(res.code === '802'){
                            self.$message({
                                type: 'error',
                                message: '该专题包含文章，不许删除!'
                            });
                        }
                    });

                });

            }
            else if(e.type === 'issue'){
                //发布
                axios.put(`/api/wechat/admin/special/topic/publish?id=${e.a.id}`).then(res => {
                    if(res.code === '000'){
                        self.$message({
                            type: 'success',
                            message: '发布成功!'
                        });
                        self.fetchData();
                    }else if(res.code === '802'){
                        self.$message.error('专题最少包含3篇文章才可发布');
                    }
                });
            } else if(e.type === 'soldOut'){
                axios.put(`/api/wechat/admin/special/topic/cancel?id=${e.a.id}`).then(res => {
                    if(res.code === '000'){
                        self.$message({
                            type: 'success',
                            message: '已下线!'
                        });
                        self.fetchData();
                    }
                });
            }
        },
        //打开新增 || 修改 专题
        editSpecial(ele){
            //有ele代表修改  没有代表新增
            if(ele){
                let self =  this;
                console.log(ele);
              this.specialFrom = JSON.parse(JSON.stringify(ele));
              self.specialFrom.imageUrl = {
                  imageUrl:self.specialFrom.imageUrl
              };
                self.specialFrom.detailUrl = {
                    imageUrl:self.specialFrom.detailUrl
                };
              console.log(self.specialFrom);
            }
            this.views.addSpecial = true;
        },
        //关闭添加专题
        handleClose(){
            let self = this;
            this.specialFrom = {name:'', kind:'', imageUrl:''};
            setTimeout(()=>{
                self.$data.$validator.reset();
            },100);
        },
        //save
        saveSpecial(){
            let self  = this;
            this.$data.$validator.validateAll().then(pass => {
                if(pass){
                    let method = 'post';
                    let obj ={
                        name:self.specialFrom.name,
                        imageUrl:self.specialFrom.imageUrl && self.specialFrom.imageUrl.imageUrl,
                        detailUrl:self.specialFrom.detailUrl && self.specialFrom.detailUrl.imageUrl,
                    };
                   if(self.specialFrom && self.specialFrom.id){
                       method = 'put';
                       obj.id = self.specialFrom.id;
                   }else {
                       obj.kind=self.specialFrom.kind && self.specialFrom.kind[1] || self.specialFrom.kind[0];
                   }
                    self.views.saveSpecial = true;
                    axios({
                        method,
                        url: '/api/wechat/admin/special/topic',
                        data:obj
                    }).then(res => {
                        this.views.saveSpecial = false;
                        this.views.addSpecial = false;
                        if(res.success){
                            this.fetchData();
                        }
                    }).catch( err =>{
                        this.views.saveSpecial = false;
                    });

                }
            });
        },
        //转跳详情
        specialDetails(ee){
            window.location='/cms/specialDetails?id='+ee.id;
        }
    },
    mounted() {
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
        self.fetchData();
    }
});
