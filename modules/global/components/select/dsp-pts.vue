<template>
    <!--==============合作方===================dsp-cooperator-->
    <div >
        <el-select
                :size="size"
                filterable
                :filter-method='remoteMethod'
                clearable
                @change="change"
                v-model="partner"
                :placeholder="placeholder"
                :loading="loading">
            <el-option
                    class="dsp-pts"
                    v-for="item in options"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                <div>{{item.name}}</div>
                <div style="font-size: 12px">{{item.mobile}}</div>
            </el-option>
        </el-select>
    </div>
</template>
<!---->
<script>
    import axios from '@/scripts/module/axios';

    export default {
        props:{
            size:String,
            placeholder:String,
            value:Object,//value值
            types:String,//合作方类型(现有):DESIGNER-合作设计师，COMPANY-合作装饰公司，CUSTOMER-合作老客户，DIFFERENT-异业联盟
            preciseQuery:String,//是否模糊查询 默认false为精准查询
            states:String       //  RUNNING("合作中"),STOPPED("停止合作");
        },
        data() {
            return {
                loading:false,
                partner:this.value && this.value.name || '',
                allData:[],
                options:[],//查询出来的下拉框
                url:'/api/channel/cooperator/type/keyword/50'
            };
        },
        methods: {
            ajax(url,data){
                let self = this;
                let qu = data && data.keyword && data.keyword.replace(/\s/g,"");
                let isName =isNaN(qu * 1); //true就是姓名，false就是电话
                if (this.states){
                    data.states = this.states;
                }
                axios.get(url, {
                    params: data
                }) .then(function (response) {
                    if (response && response && response.success && response.data && response.data.length > 0) {
                        let allda = JSON.parse(JSON.stringify(response.data));
                        if(self.preciseQuery){//模糊查询
                            if (isName || qu.length > 3){
                                //姓名查询电话查询
                                setTimeout(() => {
                                    self.loading = false;
                                    self.options = allda.filter(item => {
                                        return (item.name.toLowerCase().indexOf(qu.toLowerCase()) > -1) || ( item.mobile && item.mobile === qu.replace(/\s/g,""));
                                    });
                                }, 200);
                            }
                        }else {//
                            setTimeout(() => {//精准查询
                                self.loading = false;
                                self.options = allda.filter(item => {
                                    return (item.name === qu.replace(/\s/g,"") ) || ( item.mobile && item.mobile === qu.replace(/\s/g,"") );
                                });
                            }, 200);
                        }
                    } else {
                        self.options = [];
                    }
                });
                return self.allData;
            },
            change(val){
                let self =this;
                //值改变传给父元素
                if(val){
                    self.options.forEach(function (ele,index) {
                        if(ele.id === val){
                            self.$emit('update:value', ele);
                        }
                    });
                }else {
                    self.$emit('update:value', null);
                }
            },
            remoteMethod(query) {
                let self = this;
                let qu = query.replace(/\s/g,"");
                let isName =isNaN(qu * 1); //true就是姓名，false就是电话
                if (query) {
                    if((isName && qu.length > 1) || (!isName && qu.length > 5) ){//姓名   或  电话    长度符合查询
                        let obj ={
                            types:self.types,
                            keyword:  qu
                        };
                        self.ajax(self.url,obj);
                    }
                }
            }
        },
        watch: {
            'value'(val, oldVal) {
                if(!this.value){
                    this.partner = null;
                }
            },
            // 'types'(val){
            //     let self =this;
            //         this.ajax(self.url,val);
            //         this.partner=null;
            // }
        },
        created:function () {
            // let self =this;
            // if(self.types){
            //     this.ajax(`/api/channel/cooperator/list/type?types=${self.types}`)
            // }else {
            //     this.ajax(`/api/channel/cooperator/list/type`)
            // }
        }
    }
</script>

<style type="text/css">
    .dsp-pts {
        padding: 5px 20px 0;
        line-height: 20px;
        height: 50px;
    }
</style>

