/* jshint esversion: 6 */

import Vue from '@/scripts/module/vue';
import axios from '@/scripts/module/axios';
import enums from "@/scripts/module/enums";


var diction = new Vue({
    el: '#app',
    delimiters: ['{[', ']}'],
    data: {
        view:1,        //1正常查看    2新增     3操作
        saveLoading:false,       //新增便签loading
        loading: false,          //获取标签列表
        meta:{
            TAGSCOPE:enums.TAGSCOPE,
            DELIVERY_PART:enums.DELIVERY_PART,
            BRAND:enums.BRAND
        },
        // 界面输入的查询条件
        query: {
            alias: null,  //名称     模糊检索
            realm: null,  //作用域   精准查询
            interior:null,//是否为内置标签
        },
        tableData: [],
        //正在查看的标签
        currentTag:{
            tag:null,
            arr:[],
        },
        //检验规则
        $validator: {
            rule: {
                addTagParams: {
                    realm: {required: true,},
                    name: {required: true,},
                    alias: {required: true},
                }
            }
        },
        //新增标签数据
        addTagParams:{
            realm:null,
            name:null,
            alias:null,
            interior:true
        },
        //修改标签数据
        editTagParams:{alias:null,id:null},
        //key1 和 key2搜索
        key2Query:'',
    },
    methods: {
        //ajax
        fetchData () {
            let self = this;
            //构造地址栏hash参数
            window.location.hash = self.$base64Encode(self.query);
            let url = `/api/tag/list/condition`;
            self.loading = true;
            let params = {
                alias: self.query.alias,
                realm: self.query.realm && self.query.realm.value || null,
                interior:self.query.interior && self.query.interior.value,
            };
            axios.get(url, {params: params}).then((response) => {
                self.loading = false;
                if (response && response.success && response.data ) {
                    self.tableData = response.data;
                }else {
                    self.tableData = [];
                }
            }).catch(error => {
                self.loading = false;
                console.error('error: %o', error);
            });
        },
        //删除标签
        tagDeleta(el){
            this.$confirm(`此操作将永久删除${el.alias}标签, 是否继续?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                axios.delete(`/api/tag/delete/id/${el.id}`).then( res => {
                    if(res.success){
                        diction.fetchData();
                        diction.$message({
                            type: 'success',
                            message: '删除成功!'
                        });

                    }else {
                        diction.$message({
                            type: 'info',
                            message: res.message || '未知错误'
                        });
                    }

                }).catch( err => {
                    diction.$message({
                        type: 'info',
                        message: '网络错误，请稍后重试'
                    });
                });

            });
        },
        //新增内置标签
        addTag(el){
            this.view = 2;
        },
        //保存 || 取消 新标签
        saveAddTag(type){
            if(type === 'quxiao'){
                diction.addTagParams={realm:null,name:null,alias:null,interior:true};
                diction.view = 1;
                return;
            }
            this.$data.$validator.validateAll().then(pass => {
                if(pass){
                    diction.saveLoading = true;
                    axios.post(`/api/tag/save?realm=${diction.addTagParams.realm}&name=${diction.addTagParams.name}&alias=${diction.addTagParams.alias}&interior=true`).then(res => {
                        if(res.success){
                            diction.view = 1;
                            diction.$message({
                                type: 'success',
                                message: '新增成功'
                            });
                            diction.saveAddTag('quxiao');
                            diction.fetchData();
                        }else {
                            diction.$message({
                                type: 'info',
                                message:  res.message || '未知错误'
                            });
                        }
                        diction.saveLoading = false;
                    }).catch(err => {
                        diction.$message({
                            type: 'info',
                            message: '网络错误，请稍后重试'
                        });
                        diction.saveLoading = false;
                    });
                }
            });
        },
        look(el, event, column){
            this.currentTag.tag = el;
            this.$refs.singleTable.setCurrentRow(el);
            axios.get(`/api/tag/entity/list/tag?tagId=${el.id}&realm=${el.realm}`).then(res => {
                if(res.success){
                    diction.currentTag.arr =   res.data;
                }else {
                    diction.currentTag.arr =   [];
                    diction.$message({
                        type: 'info',
                        message:  res.message || '未知错误'
                    });
                }
            }).catch( err => {
                diction.$message({
                    type: 'info',
                    message: '未知错误'
                });
                diction.currentTag.arr = [];
            });
        },
        //转跳页面
        changeHref(el){
            let type = this.currentTag.tag.realm;
            let url = '';
            let sub = DSP.globalConfig.fileBaseUrl;
            let q="";
            if(sub === "http://dev.dsp.com/upload/"){
                q='http://dev.dsp.com';
            }else if(sub ==='https://test.yishimeijia.com/upload/'){
                q='https://test.yishimeijia.com';
            }else {
                q='https://www.sfygroup.shop';
            }
            if (type === 'POSITION'){
                let obj = {
                    currentTab:'position',
                    employee:{
                        employeeList:[],
                        currentPage:1,
                        pageSize:15,
                    },
                    position:{
                        name:el.key1,
                        positionList:[],
                        currentPage:1,
                        pageSize:15
                    }
                };
               let a = diction.$base64Encode(obj);
               url = q+"/dealer/position#"+a;
                window.open(url,'_blank');
            }else if(type === 'CUSTOMER'){ //客户详情
                window.open(q+`/customer/details/${el.ENTITY_ID}`,'_blank');
            }else if(['SUPPLEMENT','SAMPLE','ORDER','BUDGET'].indexOf(type) > -1){
                window.open(q+`/order/brand/${el.ENTITY_ID}`,'_blank');
            }

        },
        //点击编辑标签
        tagEdit(el){
            this.editTagParams = JSON.parse(JSON.stringify(el)) ;
        },
        //编辑，保存标签
        tagEditSave(){
            axios.put(`/api/tag/update?realm=${diction.editTagParams.realm}&name=${diction.editTagParams.name}&alias=${diction.editTagParams.alias}&interior=${diction.editTagParams.interior}&id=${diction.editTagParams.id}`).then(res => {
                if(res.success){
                    this.editTagParams = {id:null,alias:null};
                    diction.$message({
                        type: 'success',
                        message: '修改成功'
                    });
                    diction.fetchData();
                }else {
                    diction.$message({
                        type: 'info',
                        message:  res.message || '未知错误'
                    });
                }
                diction.saveLoading = false;
            }).catch(err => {
                diction.$message({
                    type: 'info',
                    message: '网络错误，请稍后重试'
                });
                diction.saveLoading = false;
            });
        },
    //    为某个实体解绑
        unbind(ele){
            this.$confirm(`此操作将给${ele.key1}解绑${diction.currentTag.tag.alias}标签, 是否继续?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                axios.post(`/api/content/unbind?realm=${diction.currentTag.tag.realm}&entityId=${ele.ENTITY_ID}&tagId=${diction.currentTag.tag.id}&isManager=true`).then( res => {
                    if(res.success){
                        diction.look(diction.currentTag.tag );
                        diction.$message({
                            type: 'success',
                            message: '解绑成功!'
                        });

                    }else {
                        diction.$message({
                            type: 'success',
                            message: res.message || '未知错误'
                        });
                    }

                }).catch( err => {
                    diction.$message({
                        type: 'info',
                        message: '网络错误，请稍后重试'
                    });
                });

            });
        }
    },
    created: function () {
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
