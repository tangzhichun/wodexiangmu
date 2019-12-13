<template>
    <div class="attachments" v-cloak>
        <loading v-if="loading && type==='file'"></loading>
        <div v-else-if="error"></div>

        <tempalte v-else-if="type==='file' && list && list.length && list.length > 0">
            <el-checkbox v-if="choseable" v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">全选
            </el-checkbox>
            <ul class="el-upload-list el-upload-list--text">
                <li tabindex="0" class="el-upload-list__item" v-for=" ( item, index) in list" :key="index">
                    <div class="el-upload-list__item-name" style="display: flex"
                         v-if="item.path && (item.path.slice(-4) == '.png' || item.path.slice(-4) == '.jpg' || item.path.slice(-4) == '.gif') ">
                        <el-checkbox v-if="choseable" v-model="item.chose"
                                     @change="handleChecked($event,item)"></el-checkbox>
                        <i class="el-icon-document" style="margin-right: 12px"></i>
                        <dsp-img trigger="link" :title="item.name"
                                 :src="(item.path +  ((item.path.indexOf('http:') == -1 && item.name) ? '?name=' + item.name : '') )| url"></dsp-img>
                    </div>
                    <a class="el-upload-list__item-name"
                       v-else
                       :href="(item.path +  ((item.path.indexOf('http:') == -1 && item.name) ? '?name=' + item.name : '') )| url"
                       target="_blank">
                        <el-checkbox v-if="choseable" v-model="item.chose"
                                     @change="handleChecked($event,item)"></el-checkbox>
                        <i class="el-icon-document"></i>
                        {{item.name}}
                    </a>
                    <div class="upload-time">{{item.creatorName}} {{item.createdTime}}</div>
                    <!--当存在本人创建且可删除权限开启时可以进行删除操作-->
                    <i class="el-icon-close" v-if="showDelete(item)"
                       @click="deleteAttachmet(item)"></i>
                    <!--<i class="el-icon-close-tip" v-if="deleteAble">按 delete 键可删除</i>-->
                </li>
            </ul>
        </tempalte>

        <empty v-else-if="type==='file' && renderEmpty"></empty>
        <!--<el-button v-if="deletedFiles.length" @click="withdrawDelete">-->
        <!--撤回-->
        <!--</el-button>-->
        <div :class="type === 'image-list'?'flex-box':'file-list'">
            <div class="upload-border image-box"
                 style="position: relative"
                 v-if="list && type === 'image-list'"
                 v-for="(item,index) in list"
                 :key="index">
                <dsp-img
                        :ref="'img'+index"
                        :src="base + item.path"
                        width="150px"
                        height="150px">
                </dsp-img>
                <div class="hover-row" v-if="showDelete(item)">
                    <i class="icon-search hover-white" @click="previewImage('img'+index)"></i>
                    <i class="icon-delete hover-white" @click="deleteAttachmet(item)"></i>
                </div>
            </div>
            <el-upload
                    v-if="renderUpload"
                    ref="upload"
                    action="/file/upload/unsafe"
                    :data="uploadFile"
                    :before-upload="beforeUpload"
                    :on-success="uploadSucceed"
                    :on-error="uploadFailed"
                    :on-change="onFileChange"
                    :show-file-list="false"
                    :class="type==='file'?'w100':''">
                <div v-if="type==='file'"
                     :class="{'align-left': list && list.length, 'align-center': !list || !list.length }"
                     style="padding-left: 5px">
                    <a href="javascript:void(0)"><i class="icon-upload" style="margin-right: 5px"></i>
                        <small>点击上传文件</small>
                    </a>
                </div>
                <div v-if="type==='image-list'" class="upload-border image-box upload-div">
                    <i class="el-icon-plus "></i>
                </div>
            </el-upload>
        </div>

    </div>
</template>

<script>
    import loading from "@/components/ui/dsp-loading.vue";
    import empty from "@/components/ui/dsp-empty.vue";
    import axios from "@/scripts/module/axios";
    import img from "@/components/ui/dsp-img.vue";

    export default {
        props: {
            type: {
                type: String,
                default: "file",
            },
            realm: String,
            target: String,
            base: String,
            empty: String,

            //{enable: true, length: 1, size: 3, type: 'jpg'}
            upload: {
                type: Boolean | Object,
            },
            //不能使用大小写，估计原因html不识别大小写，js识别大小写
            deleteable: Boolean,
            // 可以选中
            choseable: Boolean,
        },
        components: {empty, loading, 'dsp-img': img,},
        data() {
            return {
                loading: false,
                error: false,
                list: [],
                renderEmpty: this.empty === 'disable' ? false : true,
                renderUpload: this.upload && this.upload.enable,
                uploadFile: {},
                deletedFiles: [],

                //多选
                isIndeterminate: false,
                checkAll: false,
            }
        },
        methods: {
            handleCheckAllChange(val) {
                this.list.forEach(value => this.$set(value, 'chose', val));
                this.isIndeterminate = false;
                this.$emit("chose", this.list.filter(value=> value.chose));
            },
            handleChecked(value, item) {
                //遍历是否全选
                if (value) {
                    //选中，遍历所有判断是否满足全选
                    let unchose = this.list.find(value => value !== item && !value.chose);
                    this.isIndeterminate = !!unchose;
                    if (!unchose) {
                        //不存在未选中的
                        this.checkAll = true;
                    }
                } else {
                    //不选,判断是否存在选中的
                    let chose = this.list.find(value => value.chose);
                    this.isIndeterminate = !!chose;
                    this.checkAll = false;
                }
                this.$emit("chose", this.list.filter(value=> value.chose));
            },
            previewImage(ref) {
                this.$refs[ref][0].showPreview();
            },

            showDelete(item) {
                return this.deleteable && item.createdBy && item.createdBy === DSP.user.id;
            },
            fetchData() {
                let self = this;
                if (!self.realm || !self.target) {
                    self.loading = false;
                    self.error = true;
                    self.list = [];
                    return;
                }
                let url = '/api/attachment/' + self.realm + '/' + self.target;
                self.loading = true;
                axios.get(url).then((response) => {
                    self.loading = false;
                    if (response && response.success) {
                        if (response.data) {
                            self.$set(self,'list',response.data || []);
                        } else {
                            self.list = [];
                        }
                    } else {
                        self.error = true;
                        self.list = [];
                    }
                    self.$emit("attachmetsLoaded", self.list);
                }).catch(err => {
                    self.loading = false;
                    self.error = true;
                    self.list = [];
                    console.error('error occur while fetch attachment: %o', err);
                });

            },

            //上传之前判断文件大小和格式
            beforeUpload(file) {
                const option = this.upload;

                //限制上传格式
                const limitType = option.type ? (file.type === option.type) || (option.type.indexOf && option.type.indexOf(file.type) != -1) : true;
                if (!limitType) {
                    this.$message.error('文件格式不支持!');
                    return false;
                }

                //限制上传大小
                const limitSize = option.size ? (file.size / 1024 / 1024 < option.size) : true;
                if (!limitSize) {
                    this.$message.error('文件大小不能超过 ' + option.size + 'MB!');
                    return false;
                }

                return true;
            },
            //上传成功后
            uploadSucceed(response, file, fileList) {
                const self = this;
                const option = self.upload;

                //限制上传数量
                if (option && option.length && fileList && fileList.length > option.length) {
                    fileList.splice(0, option.length);
                }

                if (response.success && response.data) {
                    let attachment = {
                        realm: self.realm,
                        realmId: self.target,
                    };
                    attachment.id = response.data.pkUuid;
                    attachment.path = response.data.relativePath;
                    attachment.name = file.name;
//                    attachment.type = file.raw.type;
                    attachment.type = file.name.substring(file.name.lastIndexOf('.') + 1);
                    attachment.size = file.size;
                    attachment.source = 'COMPONENT';
                    attachment.createdBy = DSP.user.id;

                    axios({
                        method: 'post',
                        url: '/api/attachment',
                        data: attachment
                    }).then(function (response) {
                        if (response && response.success) {
                            self.$emit("uploadSuccess", self.list);
                            self.fetchData();
                        }
                    });
                }


            },
            //上传失败后
            uploadFailed(response, file, fileList) {
                this.$message.error(`文件上传失败，请稍后重试`);
            },

            onFileChange(file, fileList) {
                let type = file.name.split('.');
                this.uploadFile.fileType = type[type.length - 1];
            },
            //删除附件
            deleteAttachmet(file) {
                let self = this;
                self.$confirm('确认删除附件', '提示', {
                    confirmButtonText: '确认',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(function () {
                    //缓存当前删除的附件（便于能够撤回操作）
                    self.deletedFiles.push(file);
                    axios({
                        method: 'delete',
                        url: `/api/attachment/${file.id}`,
                    }).then(function (response) {
                        if (response && response.success) {
                            self.fetchData();
                        }
                    });
                })
            },
            //撤回附件删除操作
            withdrawDelete() {
                let self = this;
                let length = self.deletedFiles.length;
                for (let x = 0; x < length; x++) {
                    let file = self.deletedFiles.pop();
                    file.realm = self.realm;
                    file.realmId = self.target;
                    file.source = "COMPONENT";
                    file.createdBy = DSP.user.id;
                    axios({
                        method: 'post',
                        url: '/api/attachment',
                        data: file
                    }).then(function (response) {
                        if (response && response.success) {
                            self.fetchData();
                        }
                    });
                }
            }
        },
        created() {
            console.debug('[ATTACHMENT] realm = %o', this.realm);
            console.debug('[ATTACHMENT] target = %o', this.target);
            console.debug('[ATTACHMENT] base = %o', this.base);
            this.fetchData();
        },
        computed: {
            listType() {
                if (this.type === 'image-list') {
                    return 'picture-card'
                } else {
                    return null;
                }
            }

        }
    }
</script>
<style lang="less">
    .attachments {
        ul.el-upload-list.el-upload-list--text {
            li.el-upload-list__item {
                margin: 0;
                line-height: 30px;
                -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
                outline: none;
            }
        }

        .w100 {
            margin-top: 40px;

            .el-upload {
                width: 100%;
            }
        }

        .upload-time {
            padding-left: 30px;
            font-size: 80%;
            color: gray;
        }
    }

    .flex-box {
        display: flex;
        flex-wrap: wrap;
    }

    .image-box {
        margin: 5px;
    }

    .upload-border {
        background: #fbfdff;
        border: 1px dashed #c1cddb;
        border-radius: 8px;
        text-align: center;
    }

    .upload-div {
        width: 148px;
        height: 148px;
        line-height: 148px;
    }

    .padding20 {
        padding: 10px 10px;
    }

    .hover-row:hover {
        text-align: center;
        color: #fff;
        opacity: 0.8;
        font-size: 32px;
        background-color: rgba(0, 0, 0, .5);
        transition: opacity 1s;
    }

    .hover-row {
        position: absolute;
        width: 150px;
        height: 150px;
        line-height: 150px;
        left: 0;
        top: 0;
        cursor: default;
        font-size: 0px;
        background-color: transparent;
        color: transparent;
        z-index: 100
    }

    .hover-white {
        color: #fff;
        opacity: 1;
        z-index: 101
    }

    .file-list {
        text-align: center;
    }


</style>