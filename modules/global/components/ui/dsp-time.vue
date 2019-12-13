<template>
    <div class="dsp-time-wrapper">
        <div class="select-type">
            <span class="select-item" :class="{select: currentSelect == 'all'}" @click="selectShow('all')">全部</span>
            <el-badge :value="results.filter(ele => ele.artificial).length == 0 ? '' : results.filter(ele => ele.artificial).length" class="item">
                <span class="select-item" :class="{select: currentSelect == 'artificial'}" @click="selectShow('artificial')">人工</span>
            </el-badge>
            <span class="select-item" :class="{select: currentSelect == 'system'}" @click="selectShow('system')">系统</span>
        </div>
        <loading v-if="loading"></loading>
        <div v-else-if="error"></div>
        <div class="dsp-time" v-else-if="results && results.length">
            <div class="dsp-time_items">
                <div class="dsp-time__item" v-for=" ( item, index) in results" v-if="currentSelect == 'all' || (currentSelect == 'artificial' && item.artificial) || (currentSelect == 'system' && !item.artificial)" :key="index">
                    <div class="dsp-time__description">
                        <span v-if="item.artificial" class="icon-artificial font-icon"></span>
                        <span v-if="!item.artificial" class="icon-computer font-icon"></span>
                        <span class="content" :class="{artificial:item.artificial}">{{item.operatorName}}&nbsp;&nbsp;{{item.content}}</span>
                    </div>
                    <div class="dsp-time__title">{{item.timeCreated | datetime}}</div>
                </div>
            </div>
        </div>
        <empty v-else-if="renderEmpty"></empty>
    </div>
</template>

<script>
    import loading from "@/components/ui/dsp-loading.vue";
    import empty from "@/components/ui/dsp-empty.vue";
    import axios from "@/scripts/module/axios";

    export default {
        // select 当想要切换人工和系统时可用，只用来显示全部时不用添加该属性
        props: ['list','url','select'],
        components: {empty, loading},
        data () {
            return {
                loading: false,
                error: false,
                results: this.list || [],
                renderEmpty: true,
                // 当前选中的动态类型
                currentSelect: 'all'
            }
        },
        methods: {
            fetchData() {
                let self = this;
                self.loading = true;
                axios.get(self.url).then((response) => {
                    self.loading = false;
                    if (response && response.success) {
                        self.$emit('update:value', response);
                        if (response.data) {
                            self.results = response.data || [];
                        } else {
                            self.results = [];
                        }
                    } else {
                        self.error = true;
                        self.results = [];
                    }
                }).catch(err => {
                    self.loading = false;
                    self.error = true;
                    self.results = [];
                    console.error('error: %o', err);
                });
            },
            refresh() {
                if (this.url) {
                    this.fetchData();
                }
            },
            // 切换动态类型
            selectShow(type){
                var self = this;
                self.currentSelect = type;
                self.loading = true;
                setTimeout(function () {
                    self.loading = false;
                },200);
            }
        },
        watch: {
            'list' (val, oldVal) {
                console.debug('[TIME] list changed to %o', val);
                console.log(val);
                this.results = val;
            }
        },
        created() {
            console.debug('[TIME] url = %o', this.url);
            console.debug('[TIME] list = %o', this.list);
            if (this.url) {
                this.fetchData();
            }
        }
    }
</script>
<style lang="less">
    //时间轴
    .dsp-time{
        width: auto;
        height: calc(~"100% - 42px");
        overflow-y: auto;
        overflow-x: hidden;
        padding: 0;
        .dsp-time__item{
            position: relative;

            .dsp-time__title{
                color:#c0c4cc;
                font-size: 12px;
                padding-left: 21px;
                position: relative;
                height: 20px;
                line-height: 20px;
            }
            .dsp-time__description{
                color:#606266;
                font-size: 14px;
                padding: 3px 0 3px 20px;
                word-break: break-all;
                .content{
                    &.artificial{
                        color:#fb932b;
                    }
                }
                .font-icon{
                    color: #dcdfe6;
                    position: absolute;
                    top: 6px;
                    left: 0;
                }
            }
        }
        .dsp-time__item + .dsp-time__item {
            margin-top: 12px;
        }
    }
    .select-type{
        .select-item{
            background:#f2f6fc;
            border-radius:100px;
            width:44px;
            display: inline-block;
            height:22px;
            line-height: 22px;
            text-align: center;
            font-size: 12px;
            color: #909399;
            cursor: pointer;
            &.select{
                background: #ecf5ff;
                color:#409eff;
            }
        }
        .el-badge {
            margin: 10px;
        }
    }
    .el-tabs .el-tabs__content .el-tab-pane {
        height: 100%;
    }
    .dsp-time-wrapper{
        position: relative;
        width: 100%;
        height: 100%;
    }

</style>