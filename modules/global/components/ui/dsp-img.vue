<template>
    <div class="dsp-img" v-if="src">
        <a href="javascript:void(0)" :class="cssClass || ''" @click.stop="showPreview" v-if="trigger == 'link'">
            <span v-if="imgTitle && imgTitle.indexOf('icon-') == 0">
                <i :class="imgTitle"></i>
            </span>
            <span v-else>
                {{ title }}
            </span>
            
        </a>
        <el-card shadow="hover" :style="{'width':imgWidth, 'padding':'0px'}" class="dsp-img-container" v-else>
            <img :src="src" :style="{maxHeight:height || '',maxWidth:imgWidth || '',}"  @click.stop="showPreview">
            <div class="dsp-img-title" v-if="imgTitle">
                {{ imgTitle }}
            </div>
        </el-card>

        <div class="dsp-mask" v-if="preview && !dragable" @click.stop="hidePreview">
            <div class="dsp-img-preview">
                <img :src="src" title="点击图片旋转" @click.stop="rotateImg" :style="{transform: 'rotate(' + rotate + 'deg', zoom: zoom + '%', 'margin-top': marginTop + 'px'}">
                <div class="dsp-img-preview-bar">
                    <a href="javascript:void(0)" @click.stop="original"><i class="el-icon-picture-outline"></i> 查看原图</a>
                    <a href="javascript:void(0)" @click.stop="zoomIn"><i class="el-icon-zoom-in"></i> 放大</a>
                    <a href="javascript:void(0)" @click.stop="zoomOut"><i class="el-icon-zoom-out"></i> 缩小</a>
                    <a href="javascript:void(0)" @click.stop="hidePreview"><i class="el-icon-circle-close-outline"></i> 退出预览</a>
                </div>
            </div>
        </div>

        <div class="dsp-mask" v-if="preview && dragable" @click.stop="hidePreview" v-dsp-drapable>
            <div class="dsp-img-preview">
                <div class="dsp-img-header" @click.stop="" v-if="dragable" :style="{width: currentWidth + 'px', zoom: zoom + '%'}">拖拽本区域可移动小票图片</div>
                <img :src="src" title="点击图片旋转" @click.stop="rotateImg" :style="{transform: 'rotate(' + rotate + 'deg', zoom: zoom + '%', 'margin-top': marginTop + 'px'}">
                <div class="dsp-img-preview-bar">
                    <a href="javascript:void(0)" @click.stop="original"><i class="el-icon-picture-outline"></i> 查看原图</a>
                    <a href="javascript:void(0)" @click.stop="zoomIn"><i class="el-icon-zoom-in"></i> 放大</a>
                    <a href="javascript:void(0)" @click.stop="zoomOut"><i class="el-icon-zoom-out"></i> 缩小</a>
                    <a href="javascript:void(0)" @click.stop="hidePreview"><i class="el-icon-circle-close-outline"></i> 退出预览</a>
                </div>
            </div>
        </div>
    </div>
    <div v-else>
        {{ title }}
    </div>
</template>


<script>
    export default {
        props: {
            src: String,
            width: String,
            height: String,
            cssClass: String,
            title: String,
            trigger: String,    //触发方式：link/thumbnail
            // 图片是否可拖拽
            dragable: Boolean,
        },
        data() {
            return {
                imgWidth: this.width || '200px',
                // imgHeight: this.height || '160px',
                imgTitle: this.title,
                rotate: 0,
                zoom: 100,
                marginTop: 0,
                preview: false,
                dragable: this.dragable || false,
                // 实时宽度
                currentWidth: this.width || '200px',
                isRotate: false,
            };
        },
        methods: {
            showPreview() {
                this.marginTop = 0;
                this.rotate = 0;
                this.zoom = 100;
                this.preview = true;
                this.isRotate = false;
                this.currentWidth = this.width;
            },
            hidePreview() {
                this.preview = false;
                this.isRotate = false;
            },
            rotateImg($event) {
                const offset = ($event.target.width - $event.target.height) / 2;
                this.marginTop = (((this.rotate + 90) / 90) % 2) * offset - 1;
                this.rotate = (this.rotate + 90) % 360;

                this.currentWidth = this.isRotate ? $event.target.width + 10 :  $event.target.height + 10;

                this.isRotate = !this.isRotate;
            },
            zoomIn() {
                this.zoom = this.zoom + 20;
            },
            zoomOut() {
                if (this.zoom > 20) {
                    this.zoom = this.zoom - 20;
                }
            },
            original() {
                window.open(this.src);
            },
        }

    }
</script>
<style type="text/css">
    .dsp-img-container {
        box-sizing: padding-box;
        cursor: pointer;
        position: relative;
    }

    .dsp-img-container img {
        width: 100%;
        display: block;
    }

    .dsp-img-preview {
        position: relative;
        display: inline-block;
        max-width: 80%;
        z-index: 99999;
    }

    .dsp-img-preview .dsp-img-header {
        height: 40px;
        line-height: 46px;
        border: 5px solid #fff;
        background: #fff;
        color: #909399;
        font-size: 16px;
        font-weight: bold;
        margin: 0 auto;

        moz-user-select: -moz-none;
        -moz-user-select: none;
        -o-user-select:none;
        -khtml-user-select:none;
        -webkit-user-select:none;
        -ms-user-select:none;
        user-select:none;
    }

    .dsp-img-preview img {
        max-width: 600px;
        width: 100%;
        border: 5px solid #fff;
        box-sizing: border-box;
    }

    .dsp-img-title {
        padding: 14px;
        text-align: center;
        white-space: nowrap;
        text-overflow:ellipsis;
        overflow: hidden;
    }

    .dsp-img-preview-bar {
        text-align: center;
        line-height: 60px;
        height: 60px;
        color: #fff;
        position: fixed;
        background-color: rgba(0, 0, 0, 0.3);
        top: 0;
        left: 0;
        right: 0;
    }

    .dsp-img-preview-bar a, .dsp-img-preview-bar a:active, .dsp-img-preview-bar a:visited {
        color: #fff;
    }
    .dsp-img-preview-bar a:hover {
        color: #94ccfe;
    }

    .dsp-img-preview-bar a+a {
        margin-left: 10px;
    }
</style>

