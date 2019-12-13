<template>
    <el-dialog
            title="设计师认证"
            :visible.sync="cmsflag"
            :close-on-press-escape="false"
            :close-on-click-modal="false"
            :show-close="false"
            width="680px"
            @opened="open"
            height="640px">
        <div class="dsp-form" container="dialog" v-dsp-form-validate id="stylistrenzheng">
            <div class="dsp-form_body stylist" v-if="information">
                <div class="stylist-img">
                    <div v-dsp-validate="information.imageUrl"
                         dsp-err-required="请上传形象照">
                        <dsp-cropper :value.sync="information.imageUrl" :ul="information.imageUrl" height="140px" width="140px"></dsp-cropper>
                    </div>
                    <div class="font-weight form-label required label" >形象照</div>

                    <div v-dsp-validate="information.wxQrcodeUrl"
                         dsp-err-required="建议上传微信二维码">
                        <dsp-cropper :value.sync="information.wxQrcodeUrl" type="poster" :ul="information.qrcode" height="140px" width="140px"></dsp-cropper>
                    </div>
                    <div class="font-weight form-label required label">二维码</div>
                    <div >
                        <dsp-cropper :value.sync="information.designerCoverUrl" type="posters" :ul="information.fengmian" height="52px" width="140px"></dsp-cropper>
                    </div>
                    <div class="font-weight  label">封面</div>
                </div>
                <div class="stylist-from">
                    <el-row type="flex" >
                        <el-col :span="4"  class="form-label required">
                            姓名
                        </el-col>
                        <el-col :span="20"
                                v-dsp-validate="information.name"
                                dsp-err-required="姓名必须填写"
                        >
                            <el-input
                                    placeholder="姓名"
                                    maxlength="10"
                                    v-model="information.name"
                                    v-dsp-input-trim>
                            </el-input>
                        </el-col>
                    </el-row>

                    <el-row type="flex" >
                        <el-col :span="4"  class="form-label required">
                            地区
                        </el-col>
                        <el-col :span="20"
                                maxlength="10"
                                v-dsp-validate="information.addr"
                                dsp-err-required="地区必填"
                        >
                            <el-input
                                    placeholder="地区（10个字符以内）"
                                    maxlength="10"
                                    v-model="information.addr"
                                    v-dsp-input-trim>
                            </el-input>
                        </el-col>
                    </el-row>
                    <el-row type="flex" >
                        <el-col :span="4"  class="form-label required">
                            级别
                        </el-col>
                        <el-col :span="20"
                                v-dsp-validate="information.level"
                                dsp-err-required="请选择级别"
                        >
                            <el-select v-model="information.level" placeholder="请选择级别">
                                <el-option
                                        v-for="item in stylistGrade"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-col>
                    </el-row>
                    <el-row type="flex" >
                        <el-col :span="4"  class="form-label required">
                            类别
                        </el-col>
                        <el-col :span="20" v-dsp-validate="information.identity"
                                dsp-err-required="请选择类别"
                        >
                            <el-select v-model="information.identity">
                                <el-option
                                        v-for="item in identityList"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-col>
                    </el-row>

                    <el-row type="flex" >
                        <el-col :span="4"  class="form-label">
                            门店/公司
                        </el-col>
                        <el-col :span="20">
                            <el-input
                                    placeholder="门店/公司名称（30个字符以内）"
                                    maxlength="30"
                                    v-model="information.company"
                                    v-dsp-input-trim>
                            </el-input>
                        </el-col>
                    </el-row>
                    <el-row type="flex" >
                        <el-col :span="4"  class="form-label required">
                            简介
                        </el-col>
                        <el-col :span="20"
                                v-dsp-validate="information.briefIntroduction"
                                dsp-err-required="简介必须填写"
                        >
                            <el-input
                                    type="textarea"
                                    style="resize:none;height: 60px"
                                    class="intro-textarea"
                                    placeholder="请简单介绍下自己（50个字符以内）"
                                    v-model="information.briefIntroduction"
                                    maxlength="50"
                                    show-word-limit
                            >
                            </el-input>
                        </el-col>
                    </el-row>
                    <el-row type="flex" >
                        <el-col :span="4"  class="form-label ">
                            风格
                        </el-col>
                        <el-col :span="20">
                            <el-input
                                    type="textarea"
                                    style="height: 60px;resize:none"
                                    class="intro-textarea"
                                    placeholder="请简单介绍下自己擅长风格（30个字符以内）"
                                    v-model="information.myStyle"
                                    maxlength="30"
                                    show-word-limit
                            >
                            </el-input>
                        </el-col>
                    </el-row>
                </div>
            </div>
        </div>

        <span slot="footer" class="dialog-footer" >
            <div style="text-align: right">
                <el-button @click="quxiao">取 消</el-button>
                <el-button type="primary"  @click="addCardForm">保 存</el-button>
            </div>
        </span>
    </el-dialog>

</template>

<script>
    import enums from '@/scripts/module/enums';
    import cropper from "@/components/ui/dsp-cropper.vue";

    export default {
        components: {
            'dsp-cropper': cropper,
        },
        props: {
            cmsflag:Boolean,
            sjsdata:Object,
        },
        data(){
            return{
                loading:false,
                fileBaseUrl: DSP.globalConfig.fileBaseUrl,
                stylistGrade:enums.stylistGrade,
                identityList:enums.identityList,
                $validator: {
                    rule: {
                        information: {
                            name: {required: true, minLength: 2},
                            addr:{required: true},
                            identity:{required: true},
                            level:{required: true},
                            imageUrl:{required: true},
                            wxQrcodeUrl:{required: true},
                            briefIntroduction:{required: true},
                        }
                    }
                },
                information:JSON.parse(JSON.stringify(this.sjsdata))
            }
        },
        methods: {
            open(){
                let self = this;
                this.information =JSON.parse(JSON.stringify(this.sjsdata));
                if ( self.information.avatarUrl && typeof(self.information.avatarUrl) == 'string'){
                    self.information.imageUrl = {
                        imageUrl:self.information.avatarUrl
                    }
                }
                if ( self.information.wxQrcodeUrl  && typeof(self.information.wxQrcodeUrl) == 'string'){
                    self.information.wxQrcodeUrl = {
                        imageUrl:self.information.wxQrcodeUrl
                    }
                }
                if (self.information.designerCoverUrl  && typeof(self.information.designerCoverUrl) == 'string'){
                    self.information.designerCoverUrl = {
                        imageUrl:self.information.designerCoverUrl
                    }
                }
                if(document.getElementById('stylistrenzheng')){
                    setTimeout(()=>{
                        self.$data.$validator.reset();
                    },10)
                }
            },
            quxiao(){
                this.$data.$validator.reset();
                console.log( this.information );
                this.$emit('update:cmsflag',false);
            },
            addCardForm(){
                let self = this;
                let obj = JSON.parse(JSON.stringify(self.information));
                if (obj.imageUrl && obj.imageUrl.imageUrl){
                    obj.avatarUrl = obj.imageUrl && obj.imageUrl.imageUrl;
                }
                if (obj.wxQrcodeUrl && obj.wxQrcodeUrl.imageUrl){
                    obj.wxQrcodeUrl = obj.wxQrcodeUrl && obj.wxQrcodeUrl.imageUrl;
                }
                if (obj.designerCoverUrl && obj.designerCoverUrl.imageUrl){
                    obj.designerCoverUrl = obj.designerCoverUrl && obj.designerCoverUrl.imageUrl;
                }

                if (obj.timeCreated ){
                    delete obj.timeCreated;
                }
                if (obj.timeUpdated ){
                    delete obj.timeUpdated;
                }

                this.$data.$validator.validateAll().then(pass => {
                    if (pass) {
                        self.$emit('sjsdata',obj);
                    }
                });
            }
        },

    }
</script>

<style lang="less">
    //设计师认证
    .stylist{
        display: flex;
        min-height: 340px;
        .form-label{
            box-sizing: border-box;
            min-width: 100px;
            max-width: 100px;
            padding-right: 16px;
            font-weight: bold;
            text-align: right !important;
        }
        //上传头像
        .stylist-img{
            min-width: 140px;
            max-width: 140px;
            text-align: center;
            .label{
                padding: 0;line-height: 10px;color: #303133;
                margin-top: -2px;
                margin-bottom: 20px;
            }
        }

        .stylist-from{
            width: 100%;
            .el-row{
                margin-bottom: 30px;
                padding: 0;
                .form-label{
                    color :#303133;
                    font-size:14px;
                    font-weight: bold;
                }
            }
        }

        //简介
        .intro-textarea{
            textarea{
                resize: none;
            }
        }
    }

</style>
