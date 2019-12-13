<template>
<div>
    <el-cascader
            :disabled="disabled"
            v-if="cascader =='cascader'"
            :size="size"
            :placeholder="placeholder"
            :options="options"
            filterable
            clearable
            v-model="orgIds"
            @change="change"
            change-on-select
    ></el-cascader>

    <el-select
            :disabled="disabled"
            v-if="cascader !='cascader'"
            clearable
            filterable
            @change="change"
            v-model="orgId"
            :size="size"
            :placeholder="placeholder">
        <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            <span class="option-value">{{ item.name }}</span>
            <span class="option-tip" v-if="valueTip == 'brand'">
                <span class="icon-SOGAL" v-show="item.sogalCode"></span>
                <span class="icon-SCHMIDT" v-show="item.schmidtCode"></span>
                <span class="icon-MILANA" v-show="item.milanaCode"></span>
            </span>
        </el-option>
    </el-select>
</div>
</template>


<script>
    import axios from '@/scripts/module/axios';

    export default {
        props: {
            cascader: String,//是否树形结构   'cascader'
            placeholder: String,
            size: String,
            type: String,
            brand: String,         //单个'sogal' 多个 'sogal，milana'
            value: Object,
            tip:String,                 //副标题   品牌：brand
            disabled:Boolean
        },
        data() {
            return {
                valueTip: this.tip ? this.tip : null,
                loading: false,
                orgId: this.value ? this.value.name: '',
                // orgIds:this.value && this.value.ids && this.value.ids.split('.') && '',
                orgIds:this.value && this.value.ids && this.value.ids.split('.') || [],
                //查询出来的下拉框
                options: [],
                cascaderMap:{},
            };
        },
        methods: {
            //整理cascader数据
            formatCascader(arr,father,ides){
                let self = this;
                return arr.map(el =>{
                    el.value =  el.id;
                    el.label = el.name;
                    el.names = father ? (father+'/'+el.name) : el.name ;
                    el.ids = father ? (ides+'.'+el.id) : el.id ;
                    if(el.children && el.children.length > 0){
                        let name = el.names || el.name;
                        let ids = el.ids || el.id;
                        el.children = self.formatCascader(el.children,name,ids)
                    }else {
                        delete el.children
                    }
                    self.cascaderMap[el.id] = el;
                    return el;
                })
            },

            remoteQuery(orgId) {
                let self = this;
                let url;
                /**
                 * !type                全部
                 * type=SHOP            门店
                 * type=P_SHOP          P店
                 * type=DEPARTMENT      所有部门
                 */

                let labelFilter = self.type ? 'label=' + self.type + '&' : '';
                let brandFilter = '';
                if(self.brand){
                    let brands = self.brand.split(',');
                    brands.forEach(el=>{
                        brandFilter += (el.toLowerCase()+'=true&');
                    });
                }
                url = `/api/dealer/organization/list/condition?${labelFilter}${brandFilter}`;
                if(self.cascader =='cascader'){
                    url= '/api/dealer/organization/tree/parentId'
                }
                axios.get(url).then(function (response) {
                    self.loading = false;
                    if(self.cascader =='cascader'){
                        //新功能
                        let arr = JSON.parse(JSON.stringify(response.data));
                        //从几级开始
                        self.options = self.formatCascader([arr[0], arr[1]]);
                        if(orgId){
                            self.orgIds = self.cascaderMap[orgId].ids.split('.');
                            self.change(self.orgIds);
                        }
                    }else {
                        // 正常使用
                        if (response && response.success && response.data ) {
                            if(response.data instanceof Array){
                                self.options = [];
                                response.data.forEach(function (ele, i) {
                                    let ori = ele;
                                    ori.value = ele.id;
                                    ori.label = ele.name;
                                    self.options.push(ori);
                                });
                            }else {
                                let arr = [];
                                for (let ele in response.data){
                                    if(response.data[ele] && response.data[ele].length > 0){
                                        arr =  arr.concat(response.data[ele])
                                    }
                                }
                                arr = self.f(arr,'id');
                                self.options = arr.map(ele=>{
                                    ele.value = ele.id;
                                    ele.label = ele.name;
                                    return ele;
                                });
                            }

                        } else {
                            self.options = [];
                        }
                    }

                }).catch(function (error) {
                    self.options = [];
                    console.error('error: %o', error);
                });

            },

            change(value) {
                //值改变传给父元素
                let self = this;
                if(self.cascader =='cascader'){
                    if(value && value.length>0){
                        let le = value.length - 1;
                        let orgobj =  JSON.parse(JSON.stringify(self.cascaderMap[value[le]]));
                        if(orgobj.children){
                            delete orgobj.children;
                        }
                        self.$emit('update:value',orgobj);
                    }else {
                        self.$emit('update:value',[]);
                    }
                }else{
                    if (self.orgId) {
                        let org = self.options.find(ele => ele.value === self.orgId);
                        self.$emit('update:value', org);
                    } else {
                        self.$emit('update:value', null);
                    }
                }

            },
             //去重
             f(arr,key) {
                let aaa = {};
                return arr.reduce(function(item, next) {
                    aaa[next[key]] ? '' : aaa[next[key]] = true && item.push(next);
                    return item
                }, []);
            }
        },
        watch:{
            'value'(val, oldVal) {
                if(!val){
                    this.orgId = '';
                    this.orgIds = '';
                }
            },
        },
        created() {
            let stlf = this;
            if(this.cascader =='cascader' && (typeof this.value == 'string')) {
                let va = this.value;
                this.remoteQuery(va);
            }else {
                this.remoteQuery();
            }
        }

    }
</script>

<style type="text/css">
    .option-value {
        float: left;
    }

    .option-tip {
        float: right; color: #8492a6; font-size: 13px
    }
    .suo.tip-brand{
        padding:2px 5px;
        border-radius: 7px;
        background:#f56c6c;
        color:#fff;
    }
    .si.tip-brand{
        padding:2px 5px;
        border-radius: 7px;
        background:#ffa820;
        color:#fff;
    }
    .mi.tip-brand {
        padding:2px 5px;
        border-radius: 7px;
        background:#6d88ef;
        color:#fff;
    }
</style>

