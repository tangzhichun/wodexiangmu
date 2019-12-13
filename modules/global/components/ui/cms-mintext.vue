<template>
    <el-dialog
            title="文字回复"
            :visible.sync="cmsflag"
            width="600px"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            :show-close="false"
    >
        <div v-if="guanjianci" style="margin-bottom: 10px;line-height: 24px">
            1、访客数（访问人数）：{FK[20191001~20191031]}<br/>
            2、报名数（报名人数）：{BM[20191001~20191031]}<br/>
            3、曝光数（访问次数）：{BG[20191001~20191031]}<br/>
        </div>
        <el-input
                :maxlength="500"
                placeholder="文字回复"
                v-model="mindata.text"
        >
        </el-input>
        <div slot="footer" class="dialog-footer" style="text-align: right">
                <el-button @click="quxiao">取 消</el-button>
                 <el-button type="primary" @click='addCardForm'>确 定</el-button>
            </div>
    </el-dialog>
</template>

<script>
    //cms文字 用于添加文字

    export default {
        props: {
            cmsflag:Boolean,
            mindata:Object,
            guanjianci:Boolean,
        },
        data(){
            return{
                loading:false,
            }
        },
        methods: {
            quxiao(){
                this.$emit('update:cmsflag',false);
            },
            addCardForm(){
                let self = this;
                //type 新增还是编辑
                let ifSave = true;
                if(!self.mindata.text){
                    ifSave =false;
                    this.$message.error('请输入文字内容');
                }
                if(ifSave){
                    if(this.loading){return;}
                    this.loading = true;
                    setTimeout(()=>{
                        self.loading = false;
                    },500);
                    self.mindata.type='text';
                    self.$emit('update:cmsflag',false);
                    self.$emit('mindata',self.mindata);
                }
            }
        },

    }
</script>

<style scoped>

</style>
