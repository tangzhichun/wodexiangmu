<template>
    <div v-if="designData">
        {{yanzhe(designData)}}
        <div class="mobile" v-show=" designData.formaled !== false" :class="{'rule-box':designData.kind.split('.')[0] === 'RULE'}" :style="{width: width + 'px',height:width*1.77888 + 'px'}"   v-if="flag && designData && designData.kind.split('.')[0] && flag[designData.kind.split('.')[0]]">
                <!--

               CASE       设计案例
               DESIGN     设计方案
               ACTIVITY   营销活动
               PACKAGE    产品套餐
               -->
                <div class="mobile-header">
                    <div>中国联通</div>
                    <div>12:00</div>
                    <div style="padding:4px 10px;border-radius: 8px;background:#90EE90;border: 1px solid #ccc;font-size: 12px;color: #fff"></div>
                </div>
                <div class="mobile-header" :style="{'background-color': designData.navigationBarBackgroundColor,color: designData.navigationBarBackgroundColor && '#fff'}">
                    <i class="el-icon-arrow-left"></i>
                    <div class="single-line">
                        {{designData.title  || '请填写标题'}}
                    </div>
                    <div></div>

                </div>
                <!--手机屏幕-->
                <div class="mobile-inner">
                    <!--封面-->
                    <div class="coverImg" v-if="flag[designData.kind.split('.')[0]].includes('coverImg')" :style="{'min-height': width * 0.56 -6 +'px'}">
                        <a :href="designData.panorama" target="_blank" class="sanD" v-if="designData.panorama">
                            <span>全屋漫游</span>
                            <div class="sanJiao"></div>
                        </a>
                        <img v-if="designData.wechatImage && designData.wechatImage.imageUrl" :src='dsp.globalConfig.fileBaseUrl + designData.wechatImage.imageUrl' width="100%" />
                        <span class="centerX-Y" v-if="(!designData.wechatImage || !designData.wechatImage.imageUrl ) && !designData.panorama" style=" font-size: 14px">封面</span>
                    </div>
                    <!--内容部分-->
                    <div class="designInner" :class="{padding0:flag[designData.kind.split('.')[0]].includes('padding0')}">
                        <div class="font-size-xxxl" style="margin: 15px 0" v-if="flag[designData.kind.split('.')[0]].includes('title')">
                            {{designData.title  || '请填写标题'}}
                        </div>
                        <div class="font-label font-size-ms" style="margin: 15px 0" v-if="flag[designData.kind.split('.')[0]].includes('designerName')">
                            {{designData.designerName || '索菲亚'}} | {{datetime(dsp.serverTime)}} | 阅读 999
                        </div>
                        <!--摘要-->
                        <div class="wechatArticle-contentSyllabus" v-if="( designData.contentSyllabus || (designData.wechatArticle && designData.wechatArticle.contentSyllabus) ) && flag[designData.kind.split('.')[0]].includes('contentSyllabus')" >
                            <div class="wechatArticle-contentSyllabus-left-top"></div>
                            <div class="wechatArticle-contentSyllabus-bottom-right"></div>
                            {{ designData && designData.contentSyllabus || '摘要'}}
                        </div>
                        <!--户型 面积 预算-->
                        <div class="house-box" v-if="(designData.houseType && designData.area && designData.area !== 0 && designData.hprice && designData.hprice !== 0 && designData.lprice && designData.lprice !== 0 ) && flag[designData.kind.split('.')[0]].includes('area')">
                            <div>
                                <div class="font-label font-size-s">户型</div>
                                <div class="font-size-m font-value font-weight">{{fwhx[designData.houseType]}}</div>

                            </div>
                            <div>
                                <div class="font-label font-size-s">面积</div>
                                <div class="font-size-m font-value font-weight">{{designData.area}}㎡</div>
                            </div>
                            <div>
                                <div class="font-label font-size-s">预算</div>
                                <div class="font-size-m font-value font-weight">{{(designData.lprice / 10000).toFixed(0)}}～{{(designData.hprice / 10000).toFixed(0)}}万</div>
                            </div>
                        </div>
                        <!--富文本模式-->
                        <div class="designContent" :class="{activity: flag[designData.kind.split('.')[0]].includes('activity')}" v-if="designData.wechatArticle && designData.wechatArticle.content &&  designData.contentType !=='dom'" v-html="designData.wechatArticle.content"></div>
                        <!--dom模式-->
                        <div  class="designContent" v-if="designData && designData.contentType ==='dom'" :key="designData.paragraphs" >
                            <div v-if="designData.paragraphs" v-for="item in designData.paragraphs" class="domArr-box" >
                                <!--文字-->
                                <div v-if="['HEAD','SUB_HEAD','TEXT'].includes(item.elementType)"  :class="{'head':item.elementType === 'HEAD', 'sub_head':item.elementType === 'SUB_HEAD', 'text':item.elementType === 'TEXT'} ">{{item.content}}</div>
                                <!--图片-->
                                <img v-if="['GENERAL_PIC','DDD_PIC'].includes(item.elementType)" :src="dsp.globalConfig.fileBaseUrl + item.content" alt="" width="100%">
                                <img v-if="'NET_PIC' === item.elementType" :src="item.content" alt="" width="100%">
                                <a :href="item.content" target="_blank"  class="sanD" v-if="item.qjtUrl && item.elementType === 'DDD_PIC' && item.content ">
                                    <span>3D全景</span>
                                    <div class="sanJiao"></div>
                                </a>
                            </div>

                            <div v-if="!designData.paragraphs || designData.paragraphs.length < 1">
                                每次内容变需要点击预览！谢谢<br/>
                                每次内容变需要点击预览！谢谢<br/>
                                每次内容变需要点击预览！谢谢<br/>
                                每次内容变需要点击预览！谢谢<br/>
                                每次内容变需要点击预览！谢谢<br/>
                                每次内容变需要点击预览！谢谢<br/>
                                每次内容变需要点击预览！谢谢<br/>
                                每次内容变需要点击预览！谢谢<br/>
                                每次内容变需要点击预览！谢谢<br/>
                                每次内容变需要点击预览！谢谢<br/>
                                每次内容变需要点击预览！谢谢<br/>
                                每次内容变需要点击预览！谢谢<br/>
                                每次内容变需要点击预览！谢谢<br/>
                                每次内容变需要点击预览！谢谢<br/>
                                每次内容变需要点击预览！谢谢<br/>
                                每次内容变需要点击预览！谢谢<br/>
                                每次内容变需要点击预览！谢谢<br/>
                                每次内容变需要点击预览！谢谢<br/>
                                每次内容变需要点击预览！谢谢<br/>
                            </div>
                        </div>


                        <div v-if="designData.wechatArticle && !designData.wechatArticle.content && designData.contentType !=='dom'" >
                            每次内容变需要点击预览！谢谢<br/>
                            每次内容变需要点击预览！谢谢<br/>
                            每次内容变需要点击预览！谢谢<br/>
                            每次内容变需要点击预览！谢谢<br/>
                            每次内容变需要点击预览！谢谢<br/>
                            每次内容变需要点击预览！谢谢<br/>
                            每次内容变需要点击预览！谢谢<br/>
                            每次内容变需要点击预览！谢谢<br/>
                            每次内容变需要点击预览！谢谢<br/>
                            每次内容变需要点击预览！谢谢<br/>
                            每次内容变需要点击预览！谢谢<br/>
                            每次内容变需要点击预览！谢谢<br/>
                            每次内容变需要点击预览！谢谢<br/>
                            每次内容变需要点击预览！谢谢<br/>
                            每次内容变需要点击预览！谢谢<br/>
                            每次内容变需要点击预览！谢谢<br/>
                            每次内容变需要点击预览！谢谢<br/>
                            每次内容变需要点击预览！谢谢<br/>
                            每次内容变需要点击预览！谢谢<br/>
                        </div>

                        <div class="fenGe" v-if="flag[designData.kind.split('.')[0]].includes('fenGe')">- THE END -</div>
                        <div class="tags" v-if="flag[designData.kind.split('.')[0]].includes('fenGe')">
                            <div class="tag" v-for=" item in designData.bindingSignResultEntities" :key="item.id">{{item.value}}</div>
                        </div>
                    </div>
                    <!--广告-->
                    <!--猜你喜欢-->

                </div>
                <!--分享给朋友-->
                <div class="shareFriend" v-if="designData && !flag[designData.kind.split('.')[0]].includes('loveCollect') && !flag[designData.kind.split('.')[0]].includes('share')">
                    <i class="icon-share"></i>
                    <span style="padding-left: 10px">分享给朋友</span>
                </div>
                <!--设计方案或客户案例-->
                <div class="design-mobile" v-if="designData && flag[designData.kind.split('.')[0]].includes('loveCollect')">
                        <div class="icon-box">
                            <i class="icon-collection"></i><br/>
                            <sapn class="font-size-ms">收藏</sapn>
                        </div>
                        <div class="icon-box">
                            <i class="icon-thumbs-up"></i><br/>
                            <sapn class="font-size-ms">点赞</sapn>
                        </div>

                        <div class="design-mobile-zdyBtn-box">
                            <div>分享好友</div>
                            <div class="zdyBtn" :key="designData.btnText">
                                <i v-if="designData.btnIcon" :class="designData.btnIcon+' '+ (designData.btnIcon==='icon-gift'?'plummet-animation':'')" style="color: #fff;margin-right: 10px"></i>
                                <span v-if="designData.kind.split('.')[0] === 'DESIGN'" >{{designData.btnText || '为我设计'}}</span>
                                <span v-else>{{designData.btnText || '为我设计'}}</span>
                            </div>
                        </div>

                </div>
                <!--产品套餐-->
                <div class="shareFriend" style="right: 10px;left:auto;background:#fb932b;"  v-if="designData.kind.split('.')[0]==='PACKAGE' && !designData.btnText">
                    <i class="icon-consultation"></i>
                    <span style="padding-left: 10px">咨询客服</span>
                </div>
                <!--营销活动-->
                <div class="shareFriend" style="right: 10px;left:auto;background:#fb932b;"  v-if="designData.kind.split('.')[0]==='ACTIVITY' && !designData.btnText">
                    <i class="icon-gift plummet-animation" ></i>
                    <span style="padding-left: 10px">了解更多</span>
                </div>
                <!--自定义按钮-->
                <div class="shareFriend" style="right: 10px;left:auto;background:rgb(251, 147, 43);"  v-if="designData.btnIcon && designData.btnText && !flag[designData.kind.split('.')[0]].includes('loveCollect') && flag[designData.kind.split('.')[0]].includes('zdyBtn')" :key="designData.btnText">
                    <i v-if="designData.btnIcon " :class="designData.btnIcon+' '+ (designData.btnIcon==='icon-gift'?'plummet-animation':'')" style="margin-right: 10px"></i>
                    <span >{{designData.btnText}}</span>
                </div>
        </div>
    </div>

</template>

<script>
    export default {
        props:{
            dsp:Object,        //无法直接拿到DSP需要传一下
            designData: Object,
            width: String
        },
        data(){
            return {
                fwhx:  {
                    BS: '别墅',
                    ESYT: '二室一厅',
                    FSSSLTYS: '复式',
                    LSLT: '两室两厅',
                    QT: '其他',
                    SISLT: '四室两厅',
                    SISYT: '四室一厅',
                    SSLT: '三室两厅',
                    SSYT: '三室一厅',
                    YSYT: '一室一厅'
                },
                flag:{
                    //设计方案 DESIGN，案例CASE，产品套餐 PACKAGE ，营销活动ACTIVITY,  新闻资讯NEWS ,规章制度RULE
                    /*
                    * 封面            coverImg
                    * 内容有无内边距   padding0
                    * 标题            title
                    * 设计师          designerName
                    * 内容摘要         contentSyllabus
                    * 户型面积预算      area
                    * 文章内容class     activity
                    * 标签分割线              fenGe
                    *  点赞收藏           loveCollect
                    * 我要报名||咨询客服  service
                    * 自定义按钮          zdyBtn
                    * 分享给朋友          share
                    * */
                    DESIGN:['coverImg','title','designerName','contentSyllabus','area','activity','fenGe','loveCollect','zdyBtn'],
                    CASE:['coverImg','title','designerName','contentSyllabus','area','activity','fenGe','loveCollect','zdyBtn'],
                    PACKAGE:['coverImg','title','activity','service','zdyBtn'],
                    NEWS:['padding0','zdyBtn'],
                    ACTIVITY:['padding0','service','zdyBtn'],
                    RULE:['padding0','share'],
                }
            }
        },
        methods: {
            datetime: function (value) {


                if (!value) return '';
                if (typeof(value) == 'number') {
                    return new Date(parseInt(value)).format('MM-dd hh:mm');
                } else if (typeof(value) == 'string' && !isNaN(value)) {
                    return new Date(parseInt(value)).format('MM-dd hh:mm');
                } else {
                    return value;
                }
            },
            yanzhe(dat){
               if(dat && dat.formaled === false && dat.panorama){
                   window.location.href = dat.panorama;
               }
            }
        },
        created() {

            if(  !this.designData.contentSyllabus){

                this.designData.contentSyllabus = this.designData.wechatArticle && this.designData.wechatArticle.contentSyllabus;
            }
            if(  !this.designData.title){
                this.designData.title = this.designData.wechatArticle && this.designData.wechatArticle.contentSyllabus;
            }
        }
    }
</script>
<style lang="less">
    .mobile{
        margin-left: 16px;
        width: 300px;
        min-width: 300px;
        background: #fff;
        height: 534px;
        min-height: 534px;
        max-height: 100%;
        box-sizing: border-box;
        overflow-y: auto;
        border-radius: 4px;
        position: relative;
        .padding0{
            padding: 0 !important;
        }
        img {
            vertical-align: bottom;
        }
        .mobile-header{
            color: #606266;
            justify-content:  space-between ;
            align-items: center;
            display: flex;
            padding: 4px 10px;
            box-sizing: border-box;
            height: 36px;
        }
        .mobile-inner{
            width: 100%;
            max-height:calc(~"100% - 72px");
            min-height:calc(~"100% - 72px");
            overflow-y: auto;
            background:#eeeeee;
            /*封面*/
            .coverImg{
                min-height: 165px;
                position: relative;
                background: #ccc;
                overflow: hidden;
                .sanD{
                    position: absolute;
                    top: 0;
                    display: flex;
                    align-items: center;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    margin: auto;
                    font-size: 14px;
                    color: #fff;
                    line-height: 35px;
                    justify-content: center;
                    text-align: center;
                    opacity:0.7;
                    background:#303133;
                    border-radius:35px;
                    width:90px;
                    height:35px;
                    .sanJiao{
                        margin-left: 10px ;
                        width: 0;
                        height: 0;
                        border: 6px solid transparent;
                        border-left:6px solid #fff ;
                    }
                }
            }
            /*水平垂直居中*/
            .centerX-Y{
                position: absolute;
                width: 100px;
                text-align: center;
                height: 30px;
                line-height: 30px;
                margin: auto;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
            }
            /*文章内容*/
            .designInner{
                padding: 0 15px 40px;
                background: #fff;
                overflow: hidden;
            }
            /*摘要*/
            .wechatArticle-contentSyllabus{
                background:#fbfbfb;
                padding: 18px 50px;
                font-size: 14px;
                margin-top: 15px;
                position: relative;
                .wechatArticle-contentSyllabus-left-top{
                    position: absolute;
                    left: 8px;
                    top: 8px;
                    border-left: 4px solid #ccc;
                    border-top: 4px solid #ccc;
                    width: 9px;
                    height: 20px;
                }
                .wechatArticle-contentSyllabus-bottom-right{
                    position: absolute;
                    right: 8px;
                    bottom:8px;
                    border-right: 2px solid #ccc;
                    border-bottom: 2px solid #ccc;
                    width: 9px;
                    height: 9px;
                }
            }
            /*户型 | 面积 预算*/
            .house-box{
                display: flex;
                height:80px;
                background:#fbfbfb;
                margin: 5px 0;
                align-items: center;
                & > div{
                    width: 33.33333%;
                    box-sizing: border-box;
                    height: 40px;
                    text-align: center;
                    border-right: 1px solid #e6e6e6;
                }
                & > div:last-child{
                    border-right: 0
                }
            }
        }
        /*设计方案*/
        .designContent{
            color:#606266;
            img{
                max-width: 100% !important;
                min-width: 100%!important;
            }
        }
        .fenGe{
            color: #c9c9c9;
            font-size: 12px;
            margin-top: 50px;
            text-align: center;
        }
        /*营销活动详情页*/
        .designContent.activity{
            img{
                margin: 40px 0px 15px !important;
            }
        }
        /*标签*/
        .tags{
            width: 100%;
            display: inline-block;
            padding-top: 15px;
        }
        .tag{
            float: left;
            font-size: 14px;
            display: inline-block;
            height: 24px;
            line-height: 24px;
            background: rgba(201, 206, 212, 0.2);
            color: #b1b1b1;
            border-radius: 4px;
            margin: 0 10px 10px 0;
            padding: 0  8px;
        }

        .shareFriend{
            opacity:0.9;
            background:#303133;
            box-shadow:0 2px 10px 0 rgba(0,0,0,0.20);
            border-radius:72.15px;
            width:145px;
            height:40px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size:16px;
            color:#fffefc;
            position: absolute;
            bottom: 20px;
            left: 20px;
        }
        .design-mobile{
            position: absolute;
            display: flex;
            width:100%;
            box-sizing:border-box;
            padding:8px 15px 8px 0;
            bottom:0;
            background:#ffffff;
            border-top:1px solid #c9c9c9;
            .icon-box{
                text-align: center;
                padding:0 15px;

            }
            .zdyBtn{
                opacity:0.9;
                background:#FB932B ;
                border-radius:2px;
                justify-content: center;
                font-size:14px;
                font-weight:bold;
                height:34px;
                box-sizing:border-box;
                display:flex;
                align-items:center;
                margin-left: auto;
            }
        }

        /*钟摆动画*/
        .plummet-animation{
            animation: plummet 3s infinite linear;
        }
        @keyframes plummet {
            0% {transform:rotate(45deg);}
            5% {transform:rotate(0deg);}
            10% {transform:rotate(-45deg);}
            15% {transform:rotate(0deg);}
            20% {transform:rotate(45deg);}
            25% {transform:rotate(0deg);}
            100% {transform:rotate(0deg);}
        }

        /*左右移动动画*/
        .left-right-move {
            animation: level 2s infinite linear;
        }
        @keyframes level {
            0% {transform:translateX(0px);}
            5% {transform:translateX(2px);}
            15% {transform:translateX(0px);}
            20% {transform:translateX(-2px);}
            25% {transform:translateX(0px);}
            100% {transform:translateX(0px);}
        }

        .domArr-box{
            position: relative;
            .sanD{
                position: absolute;
                top: 0;
                display: flex;
                align-items: center;
                bottom: 0;
                left: 0;
                right: 0;
                margin: auto;
                font-size: 14px;
                color: #fff;
                line-height: 35px;
                justify-content: center;
                text-align: center;
                opacity:0.7;
                background:#303133;
                border-radius:35px;
                width:90px;
                height:35px;
                .sanJiao{
                    margin-left: 10px ;
                    width: 0;
                    height: 0;
                    border: 6px solid transparent;
                    border-left:6px solid #fff ;
                }
            }
            .head{
                font-size: 18px;
                line-height: 18px;
                margin-top:  40px;
                margin-bottom: 25px;
                text-align: center;
                font-weight: bold;
                color: #303133;
            }
            .head:after{
                content: '——';
            }
            .head:before{
                content: '——';
            }
            .sub_head{
                font-size: 16px;
                line-height: 18px;
                font-weight: bold;
                color: #303133;
                margin-top:  20px;
                margin-bottom: 10px;
            }
            .text{
                margin:10px 0;
                line-height: 20px;
                font-size: 14px;
                color: #606266;
            }
            img{
                margin-top: 20px;
                margin-bottom: 15px;
                display: block;
            }
        }

    }
    .mobile.rule-box{
        font-size: 12px;
    }

    .design-mobile-zdyBtn-box{
        width:200px;
        height:34px;
        border-radius: 34px;
        margin-left: auto;
        display: flex;
        overflow: hidden;
        &>div{
            background:#fabb00;
            width: 100px;
            color: #fff;
            line-height: 34px;
            text-align: center;
            max-width: 100px;
        }
    }
</style>
