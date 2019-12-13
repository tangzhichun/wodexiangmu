<template>
    <el-dialog
            title="图片回复"
            :visible.sync="cmsflag"
            width="600px"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            :show-close="false"
    >
        <div class="stylist-img">
            <el-upload
                    class="avatar-uploader"
                    action="/api/file-service/file/wechat/admin/upload"
                    :before-upload="beforeUpload"
                    :show-file-list="false"
                    :on-success="uploadSucceed"
            >
                <img v-if="mindata.mediaSourseUrl" :src="fileBaseUrl + mindata.mediaSourseUrl" class="avatar">
                <div v-else class="avatar-uploader-icon">
                    <div class="avatar-uploader-icon-yuan">
                        <i class="el-icon-upload"></i>
                    </div>
                </div>
            </el-upload>
        </div>
        <div slot="footer" class="dialog-footer" style="text-align: right">
            <el-button @click="quxiao">取 消</el-button>
            <el-button type="primary" @click="addCardForm">确 定</el-button>
        </div>
    </el-dialog>


</template>

<script>

    export default {
        props: {
            cmsflag:Boolean,
            mindata:Object,
        },
        data(){
            return{
                loading:false,
                fileBaseUrl: DSP.globalConfig.fileBaseUrl,
            }
        },
        methods: {
            beforeUpload(file) {
                //限制上传格式
                let imgtype = ['image/jpeg', 'image/png'];
                if (imgtype.indexOf(file.type) < 0) {
                    this.$message.error('只支持png/jpg格式图片');
                    return false;
                }
                //限制上传大小
                if (file.size / 512 / 1024 > 1) {
                    this.$message.error('文件大小不能超过0.5MB!');
                    return false;
                }
                return true;
            },
            //上传成功后
            uploadSucceed(response) {
                if(response.code === '000'){
                    this.mindata.mediaSourseUrl = response && response.data && response.data.relativePath;
                }else {
                    this.$message.error(response.message);
                }
            },
            quxiao(){
                this.$emit('update:cmsflag',false);
            },
            addCardForm(){
                //type 新增还是编辑
                let self = this;
                //type 新增还是编辑
                let ifSave = true;
                if(!self.mindata.mediaSourseUrl){
                    ifSave =false;
                    this.$message.error('请上传图片');
                }
                if(ifSave){
                    self.mindata.type='image';
                    self.$emit('update:cmsflag',false);
                    self.$emit('mindata',self.mindata);
                }
            }
        },

    }
</script>

<style scoped>

</style>
