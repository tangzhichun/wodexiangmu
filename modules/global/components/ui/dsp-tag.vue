<template>
    <div class="all-tag">
        <div class="add" v-if=" type == 'add' ">
            <el-tag
                    v-for="tag in tags"
                    :key="tag.id"
                    :closable="tag.creatorId == creatorId"
                    style="margin-left: 4px"
                    size="small"
                    :disable-transitions="false"
                    @close="removeTag(tag)"
                    :class="'random-bg'+parseInt(tag.id,16).toString(10)%5 "
            >
                {{tag.alias}}
            </el-tag>
            <el-button type="text" style="padding: 2px" v-if="privileges.findIndex(ele => ele == privi) > -1 && tags && tags.length < 10" @click.stop="showInput">
                <i class="el-icon-circle-plus" style="margin-right: 10px"></i>
            </el-button>
            <div class="inputAndSelect" v-if="inputVisible && tags" @click.stop>
                <el-input
                        v-model="inputValue"
                        ref="saveTagInput"
                        :maxlength=8
                        size="mini"
                        placeholder="输入标签"
                ></el-input>
                <el-button v-if="inputValue.length > 0 && tagsVisible.filter(it=>{return it.alias.indexOf(inputValue)>-1;}).length < 1" @click="addTag" type="primary" size="mini" style="width: 100%">创建新标签</el-button>
                <ul>
                    <li v-for='(item,index) in tagsVisible.filter(it=>{return it.alias.indexOf(inputValue)>-1;})' @click="clickLi(item)">
                        <span :class="'random-bg'+parseInt(item.id,16).toString(10)%5 " class="tag-color"></span>
                        {{item.alias}}
                        <span class="el-icon-check font-primary" v-if="item.flag" ></span>
                    </li>
                </ul>
            </div>
        </div>
        <div class="select" v-if=" type == 'select' ">
            <el-select
                    v-model="tagId"
                    multiple
                    @change="change"
                    :size="size"
                    clearable
                    filterable
                    :placeholder="placeholder">
                <el-option
                        v-for="tag in tagsVisible"
                        :key="tag.id"
                        :label="tag.alias"
                        :value="tag.id">
                </el-option>
            </el-select>
        </div>
    </div>
</template>

<script>
    import axios from '@/scripts/module/axios';

    export default {
        props:['realm','entityId','type','size','placeholder','value','privi'],
        data() {
            return {
                inputVisible: false,// 输入框是否显示
                inputValue: '',//input的值
                tagsVisible: [],//下拉框可选的标签
                tags:[],//指定实体的所有标签
                tagId: null,
                // 用户的权限
                privileges: DSP.user.privileges,
                creatorId: null
            };
        },
        methods:{
            // 获得指定实体类型可选标签和已有标签
            getTags(){
                var self = this;
                // //标签显示
                let tag =`/api/content/list?realm=${self.realm}&entityId=${self.entityId}`;
                // 所有的标签下拉框所需
                let tagsVisible =`/api/tag/list/${self.realm}`;
                axios.all([axios.get(tag),axios.get(tagsVisible)])
                    .then(axios.spread(function ( pag,tagsVisible) {
                        pag.data.forEach(pag=>{
                            let i = pag.id.substring(0,2);
                        });
                        self.tags=pag.data;
                        self.tagsVisible =tagsVisible.data;

                    }))
                    .catch(error => {
                        console.error('error: %o', error);
                    });
            },
            // 更新已有标签
            refreshTags(){
                var self = this;
                var url =`/api/tag/list/${self.realm}`;
                axios.get(url).then(response => {
                    if(response.success){
                        self.tagsVisible = response.data;
                        var arr = [];
                        if(this.value && this.value.length){
                            this.value.forEach(function (item) {
                                arr.push(item.id);
                            });
                            self.tagId = arr;
                        }
                    }
                }).catch( error => {
                    console.error('error: %o', error);
                });
            },
            //创建一个新的标签再添加标签
            addTag(){
                var self = this;
                if(this.tags.length > 9){
                    var mess = self.realm == 'USER' ? '客户': '订单';
                    this.$message({
                        showClose: true,
                        message: `每个${mess}最多拥有10个标签`,
                        type: 'warning'
                    });
                    return;
                }
                let value = self.inputValue;
                if(value){
                    //先创建再添加
                    axios({
                        method : 'post',
                        url:'/api/tag/save',
                        params: {
                            realm: self.realm,
                            name:value,
                            alias:value,
                            interior:false
                        }
                    }).then(function (response) {
                        if(response.success && response.success){
                            //创建成功添加
                            let tagId = response.data.id;
                            return axios({
                                    method : 'post',
                                    url:'/api/content/bind',
                                    params: {
                                        realm:self.realm,
                                        entityId:self.entityId,
                                        tagId: tagId
                                    }
                                });
                        }
                    }).then(function (response) {
                        if(response && response.code && response.success){
                            self.getTags();
                        }
                    }).catch(error => {
                        console.error('error: %o', error);
                    });
                }
                self.inputVisible=false;
                self.inputValue='';
            },
            //点击li
            clickLi(item){
                let self =this;
                if(item.flag){
                    self.removeTag(item);
                }else{
                    self.addRealmTag(item);
                }

            },
            //删除个体标签
            removeTag(item){
                let self =this;
                axios({
                    method : 'post',
                    url:'/api/content/unbind',
                    params: {
                        realm: self.realm,
                        entityId:self.entityId,
                        tagId:item.id,
                    }
                }).then(function (response) {
                    if( response && response.data == 1){
                        // 所有的标签下拉框所需
                        var url =`/api/content/list?realm=${self.realm}&entityId=${self.entityId}`;
                        return axios.get(url);
                    }else if( response && response.data == 0){
                        self.$message.warning('此标签不是本人添加无法解绑！');
                    }
                }).then(response => {
                    if(response && response.success){
                        self.tags = response.data;
                        //改变对号
                        self.tagsVisible.map(function (ele,index) {
                            if(ele.id === item.id){
                                self.tagsVisible[index].flag=false;
                            }
                        });
                    }
                }).catch( error => {
                    console.error('error: %o', error);
                });
            },
            //添加个体标签
            addRealmTag(item){
                let self =this;
                axios({
                    method : 'post',
                    url:'/api/content/bind',
                    params: {
                        realm: self.realm,
                        entityId:self.entityId,
                        tagId:item.id,
                    }
                }).then(response => {
                    if(response.success){
                        // 所有的标签下拉框所需
                        var url =`/api/content/list?realm=${self.realm}&entityId=${self.entityId}`;
                        return axios.get(url);

                    }
                }).then(response => {
                    if(response.success){
                        self.tags = response.data;
                        if(self.tags.length > 9){
                            self.inputVisible = false;
                        }
                        //改变对号
                        self.tagsVisible.map(function (ele,index) {
                            if(ele.id === item.id){
                                self.tagsVisible[index].flag=true;
                            }
                        });
                    }
                }).catch( error => {
                    console.error('error: %o', error);
                });
            },
            //点击新增标签
            showInput() {
                var self = this;
                self.inputVisible = !self.inputVisible;
                for (let i of self.tagsVisible){
                    for(let k of self.tags){
                        if(k.id === i.id){
                            i.flag=true;
                            break;
                        }
                    }
                }

            },
            // 标签的值改变时
            change(val) {
                var self = this;
                if(val && val.length){
                    var arr = [];
                    val.forEach(function (item) {
                        var el = self.tagsVisible.find(ele => ele.id == item);
                        arr.push(el);
                    });
                    self.$emit('update:value', arr);
                }else{
                    self.$emit('update:value', []);
                }

            },
        },
        mounted:function () {
            var self = this;
            function getCookie(name) {
                var  reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
                return document.cookie.match(reg)[2];
            }
            this.creatorId = getCookie('id');
            if(self.type == 'add'){
                self.getTags();
            }else if(self.type == 'select'){
                self.refreshTags();
            }
            var body = document.querySelector('body');
            body.onclick = function(event){
                self.inputVisible = false;
            }
        },
        watch:{
            value(val,old){
                var self = this;
                if( this.value && this.value.length == 0){
                    self.tagId = [];
                }else if(this.value && this.value.length){
                    var arr = [];
                    this.value.forEach(function (item) {
                        arr.push(item.id);
                    });
                    self.tagId = arr;
                }else if( !this.value ){
                    self.tagId = [];
                }
            }
        }
    }
</script>

<style lang="less">
    .all-tag{
        //新增标签
        .addTag{
            display: inline-block;
            width: 200px;
        }
        .add .el-tag{
            line-height: 24px;
            border-radius: 20px;
            color:#303133;
            border: aliceblue;
            .el-icon-close:before{
                color: #303133;
                border-radius: 50%;
            }
            .el-icon-close:hover:before{
                color: #fff;
            }
            .el-icon-close:hover{
                background: rgba(000,000,000,0.1);
            }
        }
        //+
        .addbtn{
            width: 20px;
            height: 20px;
            padding: 0;
            font-size: 14px;
            text-align: center;
            line-height: 18px;
            border-radius: 50%;
        }
        .inputAndSelect{
            display: inline-block;
            width: 160px;
            position: fixed;
            z-index: 1000;
            max-height: 300px;
            overflow-y: auto;
            overflow-x: hidden;
            box-shadow: 1px 2px 12px 1px rgba(0, 0, 0, 0.1);
            padding:36px 14px 14px;
            background: #fff;
            top: auto;
            margin-left: 10px;
            .el-button--primary{
                width: 160px;

            }
            .el-input{
                width: 160px;
                top: 4px;
                position: absolute;
            }
            &>.select{
                background: #fff;
                max-height: 200px;
                margin-top: 4px;
                overflow-y: auto;
                overflow-x: hidden;
                li{
                    line-height: 20px;
                    height: 20px;
                    font-size: 14px;
                    cursor: pointer;
                }
                li:hover{
                    background:rgba(000,000,000,.1);
                }
            }
            ul{
                max-height: 290px;
                overflow-y: auto;
                margin-top: 10px;
            }
            li{
                cursor: pointer;
                .tag-color{
                    display: inline-block;
                    height: 10px;
                    width: 10px;
                    border-radius:50%;
                }
                .el-icon-check{
                    margin-top: 9px;
                }
            }
            li:hover{
                background: #eee;
            }
        }
    }
</style>