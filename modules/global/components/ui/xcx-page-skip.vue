<template>
    <div>
        <div class="key_item">
            <div class="key_name">app</div>
            <el-select class="key_value" v-model="uniquecode" placeholder="请选择小程序" @change="changeXcx">
                <el-option v-for="item in dsp.xcx" :key="item.uniqueCode" :label="item.name" :value="item.uniqueCode"></el-option>
            </el-select>
        </div>
        <div class="key_item">
            <div class="key_name">链接</div>
            <el-select class="key_value" v-model="onclickurl" placeholder="请选择该广告链接到的页面" @change="changePath">
                <el-option  label="无" value=""></el-option>
                <el-option v-for="item in selectList.path" :key="item.id" :label="item.linkName" :value="item.linkPath"></el-option>
            </el-select>
        </div>
        <div class="key_item"
             v-if="onclickurl !== '/pages/appointment/measureWK/main' && onclickurl !== '/pages/appointment/measure/main' && onclickurl"
             v-show="selectList.design.length > 0 && selectList.topic.length > 0 && selectList.package.length > 0"
             :key="onclickparams">
            <div class="key_name">参数</div>
            <!--select todo selectList.design-->
            <!--客户案例详情页/设计方案详情页-->
            <el-select filterable v-if="onclickurl === '/pages/design/detail/main'" class="key_value" v-model="onclickparams" placeholder="请选择方案" @change="changeValue">
                <el-option v-for="item in selectList.design" v-if="item.kind.indexOf('DESIGN') === 0 && item.showLevel !== 'PRIVATE'" :key="item.id" :label="item.title" :value="item.id"></el-option>
            </el-select>
            <el-select filterable v-if="onclickurl === '/pages/case/detail/main'" class="key_value" v-model="onclickparams" placeholder="请选择案例" @change="changeValue">
                <el-option v-for="item in selectList.design" v-if="item.kind.indexOf('CASE') === 0 && item.showLevel !== 'PRIVATE'" :key="item.id" :label="item.title" :value="item.id"></el-option>
            </el-select>
            <!--新闻资讯详情页-->
            <el-select filterable v-if="onclickurl === '/pages/news/detail/main'" class="key_value" v-model="onclickparams" placeholder="请选择新闻资讯" @change="changeValue">
                <el-option v-for="item in selectList.design" v-if="item.kind.indexOf('NEWS') === 0 && item.showLevel !== 'PRIVATE'" :key="item.id" :label="item.title" :value="item.id"></el-option>
            </el-select>
            <!--营销活动详情页-->
            <el-select filterable v-if="onclickurl === '/pages/activity/detail/main'" class="key_value" v-model="onclickparams" placeholder="请选择营销活动" @change="changeValue">
                <el-option v-for="item in selectList.design"
                           :key="item.id" :label="item.title" :value="item.id"
                           v-if="item.kind.indexOf('ACTIVITY') === 0 && item.showLevel !== 'PRIVATE'"></el-option>
            </el-select>
            <!--产品套餐详情页-->
            <el-select filterable v-if="onclickurl === '/pages/product/detail/main'" class="key_value" v-model="onclickparams" placeholder="请选择设计方案" @change="changeValue">
                <el-option v-if="item.kind.indexOf('PACKAGE ') === 0 && item.showLevel !== 'PRIVATE'" v-for="item in selectList.design" :key="item.id" :label="item.title" :value="item.id"></el-option>
            </el-select>
            <!--todo 活动报名页面通过营销活动进 -->
            <el-select filterable v-if="onclickurl === '/pages/activity/sign/main' || onclickurl === '/pages/activity/signWK/main'" class="key_value" v-model="onclickparams" @change="changeValue" placeholder="请选择营销活动">
                <el-option v-for="item in selectList.design" :key="item.id" :label="item.title" :value="item.id + ',' + item.designNo"
                           v-if="item.kind.indexOf('ACTIVITY') > -1 && item.showLevel !== 'PRIVATE'"></el-option>
            </el-select>
            <!--分类对应参数（标签类） select todo DSP.tags.tagCascader-->
            <el-select filterable v-if="onclickurl === '/pages/sort/main'" class="key_value" v-model="onclickparams" placeholder="请选择分类页面默认的标签类" @change="changeValue">
                <el-option v-for="item in dsp.tags.tagCascader" v-if="item.showValid == 'true'" :key="item.type" :label="item.label" :value="item.type"></el-option>
            </el-select>
            <!--todo 产品套餐列表页-->
            <el-select filterable v-if="onclickurl === '/pages/product/list/main'" class="key_value" v-model="onclickparams" placeholder="产品套餐类型" @change="changeValue">
                <el-option v-for="item in selectList.package" :key="item.id" :label="item.value" :value="item.id + ',' + item.value"></el-option>
            </el-select>
            <!--todo 专题详情页-对应的所有专题列-->
            <el-select filterable v-if="onclickurl === '/pages/design/topic/main'" class="key_value" v-model="onclickparams" placeholder="请选择专题" @change="changeValue">
                <el-option v-for="item in selectList.topic" v-if="item.publishStatus == 1" :key="item.id" :label="item.name" :value="item.id + ',' + item.detailUrl"></el-option>
            </el-select>
            <!--标签-->
            <el-cascader
                    class="key_value"
                    v-if="onclickurl === '/pages/design/listBytag/main'"
                    v-model="tagpram"
                    filterable
                    value="code"
                    placeholder="请选择标签"
                    :options="dsp.tags.tagCascader"
                    @change="changeTag">
            </el-cascader>
        </div>
    </div>
</template>

<script>
    import axios from '@/scripts/module/axios';
    //需要DSP.tags.tags 这个东西是什么看广告管理的node路由
    export default {
        props: {
            //小程序的唯一码
            uniquecode: String,
            //链接路径
            onclickurl:String,
            //链接参数
            onclickparams:String,
            //链接参数 是标签特殊
            tagpram:Array,
            dsp:Object,

        },
        data() {
            return {
                dsp:this.dsp,
                //下拉框数据..
                selectList:{
                    //链接的list
                    path:[],
                    //下面分别是是参数的来源 文章列表  专题列表  标签-产品套餐
                    design:[],
                    topic:[],
                    package:[]
                },
            };
        },
        methods:{
            //修改小程序             路径变空 参数变空
            changeXcx(e){
                this.$emit('update:uniquecode', e);
                this.$emit('update:onclickurl', '');
                this.$emit('update:tagpram', '');
                this.$emit('update:onclickparams','');
            },
            //修改参数路径
            changePath(e){
                this.$emit('update:onclickurl', e);
                this.$emit('update:tagpram', '');
                this.$emit('update:onclickparams','');
            },
            //修改参数 修改标签
            changeTag(e){
                this.$emit('update:tagpram', e);
                this.$emit('update:onclickparams', e && e[1]);
            },
            //修改参数xcxManage
            changeValue(e){
                this.$emit('update:onclickparams', e);
            },
            getSelectList(url,list){
                if(this.selectList[list].length < 1){
                    axios.get(url).then((response) => {
                        if( Array.isArray(response.data)){
                            this.selectList[list] = response.data;
                        }else if(response.data && response.data.results &&  Array.isArray(response.data.results)){
                            this.selectList[list] = response.data.results;
                        }
                    }).catch(err => {
                        console.error(err);
                    });
                }
            }
        },
        mounted(){
            let self  = this ;
            //文章列表
            this.getSelectList('/api/wechat/admin/design/page/size?page=1&size=1000','design');
            //专题列表
            this.getSelectList('/api/wechat/admin/special/topic/list?page=1&size=100','topic');
            //标签-产品套餐
            this.getSelectList('/api/wechat/admin/sign/find?pageStart=1&pageSize=100&type=PACKAGE','package');
            let xcx = self.dsp.xcx.find(el => {
                return el.uniqueCode === self.uniquecode;
            });
            this.selectList.path = xcx && xcx.pages;
        },
        watch: {
            'uniquecode'(val) {
                let self  = this ;
                let xcx = self.dsp.xcx.find(el => {
                    return el.uniqueCode === val;
                });
                this.selectList.path = xcx &&  xcx.pages;
            },
        },

    }
</script>

<style  lang="less" scoped>
    .key_item{
        overflow: hidden;
        display: flex;
        margin: 10px 0;
    .key_name, .key_value{
        float: left;
        font-size: 16px;
        height: 40px;
        line-height: 40px;
    }
    .key_name{
        color: #909399;
        padding-right: 0;
        width:68px;
            &.must{
                 color: #F56C6C;
             }
        }
    }


</style>
