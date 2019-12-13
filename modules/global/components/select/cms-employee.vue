<template>
    <!--===============cms员工====================-->
    <div>
        <el-select
                :filter-method='remoteMethod'
                filterable
                clearable
                @change="change"
                v-model="employee"
                :size="size"
                :placeholder="placeholder"
                :loading="loading"
                :disabled="disabled"
        >
            <el-option
                    v-for="item in options"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
            </el-option>
        </el-select>
    </div>
</template>

<script>
    import axios from '@/scripts/module/axios';
    // /*
    // query{
    //      category: 0 员工 2合作方 4其他
    // }
    // */
    export default {
        props: {
            value: Object,          /*初始值 */
            placeholder:String,     /*显示值*/
            size:String,            /*大小*/
            query:Object,           /*查询条件*/
            disabled:Boolean        /*是否禁用*/
        },
        data() {
            return {
                employee: this.value && this.value.id || this.value || '',
                loading:false,
                options:[],
                meta: {
                    FOSTER_COMMISSIONER: '培育专员',
                    GUIDE: '导购',
                    DESIGNER: '设计师',
                    SHOP_MANAGER: '店经理',
                    GUIDE_TEAM_LEADER: '销售纵队长',
                    DESIGNER_TEAM_LEADER: '设计纵队长',
                },
                TeamTypes:[
                    {value: 'SALE_TEAM',  label: '销售纵队'},
                    {value: 'DESIGN_TEAM',label: '设计纵队'},
                    {value: 'TROOP_TEAM', label: '结队分部'},
                    {value: 'BASE_TEAM', label: '大本营'},
                    {value: 'COLUMN_TEAM', label: '纵队'},
                ],
                userQuery:{},//查询条件
            }
        },
        methods: {
            //构建查询条件
            remoteMethod(query) {
                let self = this;
                if (query !== '' ) {
                    this.loading = true;
                    setTimeout(() => {
                        self.userQuery.name = query.replace(/\s+/g,"");
                        if( self.userQuery.name &&  self.userQuery.name.length > 1){
                            self.referUser()
                        }else {
                            self.loading = false;
                            this.options= [];
                        }
                    }, 500);
                } else {
                    delete self.userQuery.name;
                    self.loading = false;
                    this.options= [];
                }
            },
            //查询
            referUser(){
                let self = this;
                let obj = self.userQuery;
                axios.get('/api/mpuser/service/agent/userIdentityList',{params: obj}).then(res => {
                    self.loading = false;
                    if(res.data){
                        this.options= res.data;
                    }else {
                        this.options= [];
                    }
                }).catch(err => {
                    self.loading = false;
                })
            },
            //值改变传给父元素value值
            change() {
                let self = this;
                if (self.employee) {
                    let emp = null;
                    emp = this.options.find(ele => ele.id === self.employee );
                    self.$emit('update:value', emp);
                } else {
                    self.$emit('update:value', null);
                }
            },
        },
        watch: {
            query:{//深度监听，可监听到对象、数组的变化
                handler(val, oldVal){
                    this.userQuery = val || {};
                    this.employee = null;
                },
                deep:true
            }
        },
        created: function () {
            this.userQuery = this.query || {};
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
</style>
