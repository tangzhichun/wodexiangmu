<template>
    <div class="demo" :refs="num" v-if="fileBaseUrl">
        <!-- 遮罩层 -->
        <div class="show" :style="'width:' + width + ';height:' + height">
            <div class="picture" :style="'backgroundImage:url('+imgurl(defaultImg || (value && value.imageUrl))+');width:' + width + ';height:' + height + ';line-height:' + height" @click="chioce">
                <div class="icon-upload-box" v-if="(!value || !value.imageUrl) && !defaultImg">
                    <i  class="icon-upload"></i>
                </div>
            </div>
        </div>
        <div >
            <div style="margin-top:20px;">
                <!--<input type="file" v-if="type !== 'poster'" id="change" accept="image"  @change="change" style="display:none">-->
                <!--<input type="file" v-else id="changeP" accept="image"  @change="change" style="display:none">-->
                <input type="file" v-if="type" :id="type" accept="image"  @change="change" style="display:none">
                <input type="file" v-else="type" id="change" accept="image"  @change="change" style="display:none">

            </div>
        </div>
        <div class="container" v-show="panel">
            <div class="wrap" v-loading="loading">
                <!--<img id="image" v-if="type !== 'poster'" :src="url" alt="Picture">-->
                <!--<img id="poster" v-else :src="url" alt="Picture">-->

                <img id="change1" v-if="!type" :src="url" alt="Picture">
                <img :id="type+1" v-else :src="url" alt="Picture">
                <div style="margin-top: 10px">
                    <el-button type="button" size="small" :disabled="loading" @click="scale(1)" icon="el-icon-zoom-in">放大</el-button>
                    <el-button type="button" size="small" :disabled="loading" @click="scale(-1)" icon="el-icon-zoom-out">缩小</el-button>
                    <el-button type="button" size="small" :disabled="loading" @click="roteta('right')" icon="el-icon-refresh">旋转</el-button>
                    <el-button type="primary" size="small" :disabled="loading" @click="crop" icon="el-icon-circle-check-outline" class="pull-right">确定</el-button>
                    <el-button type="button" size="small" :disabled="loading" @click="cancelCrop" class="pull-right">取消</el-button>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
    import Cropper from "cropperjs";
    import axios from '@/scripts/module/axios';
    export default {
        props: {
            // 传入的数据对象（必填）
            value: Object,
            // 备用的，暂时不用
            ul: String,
            // 指定宽高（必填）
            width: String,
            height: String,
            // 一个页面如果使用两个，第二个type值传值为poster（选填）
            type: String,
            // 默认的图片地址
            defaultImg: String,
            maxsize:Number,   //MB
        },
        data() {
            return {
                // 基础图片地址
                fileBaseUrl: DSP.globalConfig.fileBaseUrl,
                headerImage: "",
                picValue: "",
                cropper: "",
                croppable: false,
                panel: false,
                url: this.value && this.value.imageUrl,
                loading: false
            };
        },
        mounted() {
            let that = this;
            var val = that.value;
            var num = new Date().getTime();
            that.$forceUpdate();
            that.num = num;
            if(val && val.imageUrl){
                that.headerImage = that.fileBaseUrl + val.imageUrl;
            }
            // 现在兼容一个页面同时展示两个此组件，
            // 但是因为cropper对象的渲染需要根据img元素的id渲染，
            // 但是id 必须独一无二，因此根据type来改变id todo 现在仅仅支持两个
            // that.type === 'poster' ? 'poster' : 'image';
            var eleId = ''; // 根据type 判断渲染的id 值
            if( that.type ){
                eleId = that.type + '1';
            }else {
                eleId = 'change1'
            }
            var image = document.getElementById(eleId); // 获取元素
            var width = that.width.split('p')[0]; // 获取指定宽
            var height = that.height.split('p')[0]; // 获取指定高
            // 创建指定Cropper对象
            that.cropper = new Cropper(image, {
                aspectRatio : width / height,// 默认比例
                preview : '.previewImg',// 预览视图
                guides : false, // 裁剪框的虚线(九宫格)
                autoCropArea : 1, // 0-1之间的数值，定义自动剪裁区域的大小，默认0.8
				dragMode : 'move', // 是否允许移除当前的剪裁框，并通过拖动来新建一个剪裁框区域
                movable : true, // 是否允许移动图片
                resizable : false, // 是否允许改变裁剪框的大小
				cropBoxResizable: false,
                zoomable : true, // 是否允许缩放图片大小
                mouseWheelZoom : false, // 是否允许通过鼠标滚轮来缩放图片
                touchDragZoom : false, // 是否允许通过触摸移动来缩放图片
                rotatable : true, // 是否允许旋转图片
                viewMode: 2,
                background:false,
                ready: function () {
                    that.croppable = true;
                },
                crop(event) {
                    // console.log(event.detail.x);
                },
            });
        },
        methods: {
            imgurl(url){
                if(url && url.indexOf('http:') > -1){
                    return url;
                }else {
                    return DSP.globalConfig.fileBaseUrl + url;
                }
            },
            // 缩放
            scale (type){
                var that = this;
                var num = type === -1 ? - 0.1: 0.1;
                that.cropper.zoom(num);
            },
            // 旋转
            roteta (direction) {
                var that = this;
                var reg = direction === 'left' ? -90 : 90;
                that.cropper.rotate(reg);
            },
            // 确定截取
            crop () {
                let that = this;
                var croppedCanvas;
                var roundedCanvas;
                if (!this.croppable) {
                    return;
                }
                var width = that.width.split('p')[0];
                var height = that.height.split('p')[0];
                // 生成裁切后的图片，指定宽高
				// croppedCanvas = this.cropper.getCroppedCanvas({
				// 	width: width * 2,
				// 	height: height * 2,
				// 	minWidth: width * 2,
				// 	minHeight: height * 2,
				// 	maxWidth: 4096,
				// 	maxHeight: 4096,
				// 	fillColor: '#fff',
				// 	imageSmoothingEnabled: false,
				// 	imageSmoothingQuality: 'high'
				// });
				croppedCanvas = this.cropper.getCroppedCanvas();
				roundedCanvas = this.getRoundedCanvas(croppedCanvas); // 生成裁切后的图片
                that.postImg(roundedCanvas);
            },
            // 截取图片制成canvas
            getRoundedCanvas (sourceCanvas) {
                let that = this;
                var canvas = document.createElement('canvas');
                var context = canvas.getContext('2d');
                var width = sourceCanvas.width;
                var height = sourceCanvas.height;
                canvas.width = width;
                canvas.height = height;
                context.imageSmoothingEnabled = true;
                // context.translate(0.2, -0.2);
                // context.scale(0.2, 0.2);
				// context.drawImage(sourceCanvas, 0, 0, width * 5, height * 5);
				context.drawImage(sourceCanvas, 0, 0, width, height);
                // context.globalCompositeOperation = 'destination-in';
                return canvas;
            },
            getObjectURL (file) {
                var url = null ;
                if (window.createObjectURL!=undefined) { // basic
                    url = window.createObjectURL(file) ;
                } else if (window.URL!=undefined) { // mozilla(firefox)
                    url = window.URL.createObjectURL(file) ;
                } else if (window.webkitURL!=undefined) { // webkit or chrome
                    url = window.webkitURL.createObjectURL(file) ;
                }
                return url ;
            },
            // 选取的图片更改后
            change (e) {
                var that = this;
                let files = e.target.files || e.dataTransfer.files;
                if (!files.length) return;
                this.panel = true;
                this.picValue = files[0];
                this.url = this.getObjectURL(this.picValue);

                var width = that.width.split('p')[0];
                var height = that.height.split('p')[0];
                that.cropper.setAspectRatio(width / height);
                //每次替换图片要重新得到新的url
                if(this.cropper){
                    this.cropper.replace(this.url);
                }
                // 展示截取的界面
                this.panel = true;
            },
            // 点击取消按钮
            cancelCrop () {
                var that = this;
                that.panel = false;
                that.clearInputFile();// 清除选中的图片的value
            },
            // 清除选中的图片的value,防止同一图片不能反复提交
            clearInputFile () {
                var that = this;
                var eleId = '';
                if( that.type ){
                    eleId = that.type;
                }else {
                    eleId = 'change'
                }
                var f = document.getElementById(eleId);
                if(f.value){
                    try{
                        f.value = ''; //for IE11, latest Chrome/Firefox/Opera...
                    }catch(err){
                    }
                    if(f.value){ //for IE5 ~ IE10
                        var form = document.createElement('form'), ref = f.nextSibling, p = f.parentNode;
                        form.appendChild(f);
                        form.reset();
                        p.insertBefore(f,ref);
                    }
                }
            },
            // 提交图片到后台
            postImg (file) {
                var that = this;
                // file.toBlob() canvas转成blob
                file.toBlob(blob => {
                    // 将 blob 图片转成文件格式  var file = new File([file], name)
                    var files = new File([blob], 'file.png');
                    const formData = new FormData();
                    formData.append('file', files);
                    let sis = (files.size / 1024/1024).toFixed(2);
                    console.log(sis);
                    if(that.maxsize && that.maxsize < files.size / 1024/1024){
                        let si = (files.size / 1024/1024).toFixed(2);
                        that.$message.error(`剪切后图片大小为${si}MB，不能大于${that.maxsize}MB`);
                        return;
                    }
                    that.loading = true;
                    var url = '/api/file-service/file/wechat/admin/upload';
                    var config = {headers: {"Content-Type": "multipart/form-data"}};
                    axios.post(url, formData, config).then(res => {
                        if(res && res.success){
                            var newValue = that.value && that.value.imageUrl ? JSON.parse(JSON.stringify(that.value)) : {};
                            if(that.value && that.value.id){
                                newValue.id =  that.value.id;
                            }
                            newValue.ext = res.data.fileExt;
                            newValue.imageMd5 = res.data.md5;
                            newValue.imageUrl = res.data.relativePath;
                            newValue.name = res.data.relativePath;
                            newValue.reduceUrl = res.data.ghostRelativePath;
                            newValue.size = files.size;
                            that.$emit('update:value',newValue);// 更新数据
                            that.$emit('update:defaultImg',res.data.relativePath); // 更新图片地址
                            that.panel = false;// 关闭截取界面
                            that.clearInputFile();// 清除选中的图片的value
                        }
                        that.loading = false;
                    }).catch(err => {
                        that.loading = false;
                        console.log(error);
                    });
                },'image/jpeg');
            },
            // 点击图片或空容器，指向img的点击事件
            chioce () {
                let that = this;
                //that.type === 'poster' ? 'changeP' : 'change'
                var eleId = '';
                if( that.type ){
                    eleId = that.type;
                }else {
                    eleId = 'change'
                }
                var el = document.getElementById(eleId);
                el.click();
            }
        },
        watch:{
            'value'(val, oldVal) {
                var that = this;
                this.headerImage = this.fileBaseUrl + (val && val.imageUrl);
            },
        },
    };
</script>

<style lang="less" >
    /*@import "../../global/styles/global";*/
    .demo #button {
    //position: absolute;
    //right: 50px;
    //bottom: 50px;
        width: 80px;
        height: 40px;
        border:none;
        border-radius: 5px;
        background:white;
    }
    .demo .show {
        /*width: 375px;*/
        /*height: 210px;*/
        overflow: hidden;
        position: relative;
        border: 1px solid #d5d5d5;
    }
    .demo .picture {
        width: 100%;
        height: 100%;
        overflow: hidden;
        background-position: center center;
        background-repeat: no-repeat;
        background-size: cover;
        text-align: center;
        line-height: 300px;
        font-size: 40px;
        color: #aeaeae;
        background-color: #DDE1EA ;
        cursor: pointer;
        position: relative;
    }
    .demo .picture .icon-upload-box{
        width: 68px;
        height: 68px;
        position: absolute;
        top: 0;
        bottom: 0;
        left:0;
        right:0;
        border-radius: 50%;
        background: #fff;
        margin: auto;
        text-align: center;
        line-height: 68px;
        color:#409EFF;
    }
    .demo .container {
        z-index: 1000;
        position: fixed;
        padding-top: 60px;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.5);
    }
    .demo .wrap{
        width: 500px;
        height: 500px;
        margin: 80px auto;
    }
    .demo #image {
        max-width: 100%;
    }
    .cropper-view-box,.cropper-face {
    //border-radius: 50%;
    }
    /*!
     * Cropper.js v1.0.0-rc
     * https://github.com/fengyuanchen/cropperjs
     *
     * Copyright (c) 2017 Fengyuan Chen
     * Released under the MIT license
     *
     * Date: 2017-03-25T12:02:21.062Z
     */
    .cropper-container {
        font-size: 0;
        line-height: 0;
        position: relative;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        direction: ltr;
        -ms-touch-action: none;
        touch-action: none
    }
    .cropper-container img {
        /* Avoid margin top issue (Occur only when margin-top <= -height) */
        display: block;
        min-width: 0 !important;
        max-width: none !important;
        min-height: 0 !important;
        max-height: none !important;
        width: 100%;
        height: 100%;
        image-orientation: 0deg
    }
    .cropper-wrap-box,
    .cropper-canvas,
    .cropper-drag-box,
    .cropper-crop-box,
    .cropper-modal {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
    }
    .cropper-wrap-box {
        overflow: hidden;
    }
    .cropper-drag-box {
        opacity: 0;
        background-color: #fff;
    }
    .cropper-modal {
        opacity: .5;
        background-color: #000;
    }
    .cropper-view-box {
        display: block;
        overflow: hidden;
        width: 100%;
        height: 100%;
        outline: 1px solid #39f;
        outline-color: rgba(51, 153, 255, 0.75);
    }
    .cropper-dashed {
        position: absolute;
        display: block;
        opacity: .5;
        border: 1px dashed #eee
    }
    .cropper-dashed.dashed-h {
        top: 33.33333%;
        left: 0;
        width: 100%;
        height: 33.33333%;
        border-top-width: 1px;
        border-bottom-width: 1px
    }
    .cropper-dashed.dashed-v {
        top: 0;
        left: 33.33333%;
        width: 33.33333%;
        height: 100%;
        border-right-width: 1px;
        border-left-width: 1px
    }
    .cropper-center {
        position: absolute;
        top: 50%;
        left: 50%;
        display: block;
        width: 0;
        height: 0;
        opacity: .75
    }
    .cropper-center:before,
    .cropper-center:after {
        position: absolute;
        display: block;
        content: ' ';
        background-color: #eee
    }
    .cropper-center:before {
        top: 0;
        left: -3px;
        width: 7px;
        height: 1px
    }
    .cropper-center:after {
        top: -3px;
        left: 0;
        width: 1px;
        height: 7px
    }
    .cropper-face,
    .cropper-line,
    .cropper-point {
        position: absolute;
        display: block;
        width: 100%;
        height: 100%;
        opacity: .1;
    }
    .cropper-face {
        top: 0;
        left: 0;
        background-color: #fff;
    }
    .cropper-line {
        background-color: #39f
    }
    .cropper-line.line-e {
        top: 0;
        right: -3px;
        width: 5px;
        cursor: e-resize
    }
    .cropper-line.line-n {
        top: -3px;
        left: 0;
        height: 5px;
        cursor: n-resize
    }
    .cropper-line.line-w {
        top: 0;
        left: -3px;
        width: 5px;
        cursor: w-resize
    }
    .cropper-line.line-s {
        bottom: -3px;
        left: 0;
        height: 5px;
        cursor: s-resize
    }
    .cropper-point {
        width: 5px;
        height: 5px;
        opacity: .75;
        background-color: #39f
    }
    .cropper-point.point-e {
        top: 50%;
        right: -3px;
        margin-top: -3px;
        cursor: e-resize
    }
    .cropper-point.point-n {
        top: -3px;
        left: 50%;
        margin-left: -3px;
        cursor: n-resize
    }
    .cropper-point.point-w {
        top: 50%;
        left: -3px;
        margin-top: -3px;
        cursor: w-resize
    }
    .cropper-point.point-s {
        bottom: -3px;
        left: 50%;
        margin-left: -3px;
        cursor: s-resize
    }
    .cropper-point.point-ne {
        top: -3px;
        right: -3px;
        cursor: ne-resize
    }
    .cropper-point.point-nw {
        top: -3px;
        left: -3px;
        cursor: nw-resize
    }
    .cropper-point.point-sw {
        bottom: -3px;
        left: -3px;
        cursor: sw-resize
    }
    .cropper-point.point-se {
        right: -3px;
        bottom: -3px;
        width: 20px;
        height: 20px;
        cursor: se-resize;
        opacity: 1
    }
    @media (min-width: 768px) {
        .cropper-point.point-se {
            width: 15px;
            height: 15px
        }
    }
    @media (min-width: 992px) {
        .cropper-point.point-se {
            width: 10px;
            height: 10px
        }
    }
    @media (min-width: 1200px) {
        .cropper-point.point-se {
            width: 5px;
            height: 5px;
            opacity: .75
        }
    }
    .cropper-point.point-se:before {
        position: absolute;
        right: -50%;
        bottom: -50%;
        display: block;
        width: 200%;
        height: 200%;
        content: ' ';
        opacity: 0;
        background-color: #39f
    }
    .cropper-invisible {
        opacity: 0;
    }
    .cropper-bg {
        background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC');
    }
    .cropper-hide {
        position: absolute;
        display: block;
        width: 0;
        height: 0;
    }
    .cropper-hidden {
        display: none !important;
    }
    .cropper-move {
        cursor: move;
    }
    .cropper-crop {
        cursor: crosshair;
    }
    .cropper-disabled .cropper-drag-box,
    .cropper-disabled .cropper-face,
    .cropper-disabled .cropper-line,
    .cropper-disabled .cropper-point {
        cursor: not-allowed;
    }
</style>
