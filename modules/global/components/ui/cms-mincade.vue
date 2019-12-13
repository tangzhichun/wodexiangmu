<template>
        <el-dialog
            title="小程序卡片"
            :visible.sync="cmsflag"
            width="600px"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            :show-close="false"
    >
        <div class="dsp-form" id='stylistrenzheng' container="dialog">
            <div class="dsp-form_body">
                <div class="stylist-from">
                    <el-row type="flex" >
                        <el-col :span="4"  class="form-label required">卡片标题</el-col>
                        <el-col :span="20">
                            <el-input
                                    placeholder="请输入标题"
                                    :maxlength="20"
                                    v-model="mindata.title"
                            >
                            </el-input>
                        </el-col>
                    </el-row>
                    <el-row type="flex" >
                        <el-col :span="4"  class="form-label required">小程序</el-col>
                        <el-col :span="20">
                            <el-select v-model="mindata.appid" placeholder="请选择小程序" class="el-select-mindata">
                                <el-option
                                        v-for="item in appIdArr"
                                        :key="item.appId"
                                        :label="item.name"
                                        :value="item.appId">
                                </el-option>
                            </el-select>
                        </el-col>
                    </el-row>
                    <el-row type="flex" >
                        <el-col :span="4"  class="form-label required">小程序路径</el-col>
                        <el-col :span="20">
                            <el-input
                                    type="textarea"
                                    :rows="2"
                                    resize="none"
                                    :maxlength="255"
                                    :show-word-limit="true"
                                    placeholder="请输入小程序路径"
                                    v-model="mindata.pagepath"
                            >
                            </el-input>
                        </el-col>
                    </el-row>

                    <el-row type="flex" >
                        <el-col :span="4"  class="form-label required">图片</el-col>
                        <el-col :span="20">
                           <div class="font-label single-line" style="margin:10px 0">图片大小建议不超过200KB；尺寸为200px*150px</div>
                            <dsp-cropper :value.sync="mindata.mediaSourseUrl" :ul="mindata.mediaSourseUrl" height="150px" width="200px"></dsp-cropper>
                        </el-col>
                    </el-row>
                </div>
            </div>
        </div>
        <div slot="footer" class="dialog-footer" style="text-align: right">
            <el-button @click="quxiao">取 消</el-button>
            <el-button type="primary" @click='addCardForm'>确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
    //cms小程序卡片
    import cropper from "@/components/ui/dsp-cropper.vue";
    import enums from '@/scripts/module/enums';
    import axios from '@/scripts/module/axios.js';

    export default {
        props: {
            cmsflag:Boolean,
            mindata:Object,
        },
        components: {
            'dsp-cropper': cropper,
        },
        data(){
            return{
                loading:false,
                appIdArr:[]
            }
        },
        methods: {
            quxiao(){
                this.$emit('update:cmsflag',false);
            },
            addCardForm(){
                let self = this;
                let ifSave = true;
                if(!self.mindata.title){
                    ifSave =false;
                    this.$message.error('请输入标题');
                }else if(!self.mindata.pagepath){
                    ifSave =false;
                    this.$message.error('请输入小程序路径');
                }else if(!self.mindata.appid){
                    ifSave =false;
                    this.$message.error('请输入正确的小程序appid');
                }else if(!self.mindata.mediaSourseUrl){
                    ifSave =false;
                    this.$message.error('未上传小程序卡片');
                }else if(self.mindata.mediaSourseUrl){
                    console.log(self.mindata.mediaSourseUrl);
                }
               if(ifSave){
                   this.loading = true;
                   setTimeout(()=>{
                       self.loading = false;
                   },500);
                   self.mindata.mediaSourseUrl = self.mindata.mediaSourseUrl.imageUrl;
                   self.mindata.type='miniprogrampage';
                   self.$emit('update:cmsflag',false);
                   self.$emit('mindata',self.mindata);
               }
            }
        },
        mounted(){
            let gzharr = function(old,filter,flags='privilege'){
                let arr = [];
                if(old && old.map ){
                    old.map(ele => {
                        if(filter.indexOf(ele[flags]) > -1){
                            arr.push(ele);
                        }else if(!ele[flags]){
                            arr.push(ele);
                        }
                    });
                }
                return arr;
            };
            let self =this;
            axios.get('/api/wechat/admin/mp/list').then(res => {
                if(res.data){
                    self.appIdArr = gzharr(res.data,DSP.user.privileges,'authority')
                }
            });

        }
    }
</script>

<style lang="less">
    .el-select-mindata .el-input{
            width: 100% !important;
        }
</style>
