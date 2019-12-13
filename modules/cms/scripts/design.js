/* jshint esversion: 6 */
import Vue from '@/scripts/module/vue';
import emp from '@/components/select/dsp-emp.vue';
import phone from '@/components/ui/dsp-phone.vue';
import enums from "@/scripts/module/enums";
import cropper from '@/components/ui/dsp-cropper.vue';
import xcxpageskip from '@/components/ui/xcx-page-skip.vue';


import axios from '@/scripts/module/axios';
// 引用
var E = require('wangeditor');  // 使用 npm 安装
// 创建编辑器
var editor;
var imgUrl;

String.prototype.replaceAll = function(s1,s2){
    return this.replace(new RegExp(s1,"gm"),s2);
};

var self = new Vue({
    components: {
        'dsp-emp': emp,
        'dsp-phone': phone,
        'dsp-cropper': cropper,
        'xcx-page-skip': xcxpageskip
    },
    el: '#app',
    delimiters: ['{[', ']}'],
    data: {
        props: {
            multiple: true,
            label: 'label',

        },
        selectedOptions:[],//标签value
        saveLoading:false,
        view:{
            editType : true ,  //true编辑 false预览
            zdyBtn:false,
            viewLoading : false,
            putTag : false,

        },
        mata:{
            topicId:null,
            category:enums.dict('CMS_COLUMN'),
            FWHX: enums.FWHX,
            showLevel:[
                {value:'PUBLIC',label:'公开'},
                {value:'PROTECTED',label:'保护'},
                {value:'PRIVATE',label:'私有'},
            ],
            // category:enums.categories,
            kind:[
                {value:'DESIGN',label:'设计方案'},
                {value:'CASE',label:'案例'},
            ],
            //图标小程序
            WX_ICON:enums.WX_ICON,
            //图标动画
            btnAnimation:[
                {value:'plummet-animation',label:'钟摆'},
                {value:'left-right-move',label:'左右移动'},
            ],
            //渲染模式
            contentType:[
                {label:'富文本模式',value:'rtf'},
                {label:'DOM模式',value:'dom'}
            ],
            //文字大小
            fontSize:[
                {label:'一级标题',value:24},
                {label:'二级标题',value:18},
                {label:'正文',value:14},
            ],
            elementType:[
                {label:'大标题',value:'HEAD',icon:'icon-subtitle'},
                {label:'小标题',value:'SUB_HEAD',icon:'icon-headline'},
                {label:'段落',value:'TEXT',icon:'icon-paragraph'},
                {label:'图片',value:'GENERAL_PIC',icon:'el-icon-picture'},
                {label:'网络图片',value:'NET_PIC',icon:'icon-link'},
                {label:'酷家乐链接',value:'DDD_PIC',icon:'icon-video'},
            ]
        },
        //设计师列表
        designerList:[],
        //上一个页面的数据
        decoded:null,
        $validator: {
            rule: {
                information: {
                    uniqueNo: {
                        required: true ,
                        remote: function ($data, value) {
                            if (!value || value.length < 5) {
                                return Promise.resolve(true);
                            }

                            let url = `/api/wechat-admin-service/wechat/admin/design/check/uniqueNo/repeat?uniqueNo=${value}`;
                            if($data.information && $data.information.id){
                                url += '&id='+$data.information.id;
                            }
                            return axios.get(url).then(response => {
                                //返回false，表示验证未通过；返回true，表示验证通过。
                                return response && response.success && !response.data;
                            });
                        },
                        customize: function ($data, value) {
                            let pass = true;
                            if (!value || value.length < 5) {
                                pass = false;
                            }
                            if (!/^[a-zA-Z0-9]{1,5}$/.test(value)) {
                                pass = false;
                            }
                            //返回false，表示验证未通过；返回true，表示验证通过。
                            return Promise.resolve(pass);
                        },
                    },                        // 编号规章专用
                    designerName: {required: true },                    // 设计师姓名
                    fprice: {required: true },                          // 一口价
                    // houseType: {required: true, minLength: 1},          // 推荐户型
                    // hprice: {required: true },                          // 最高价格
                    // lprice: {required: true },                          // 最低价格
                    // topicId: {required: true },                          // 专题
                    kind: {required: true },                        // 种类
                    // showLevel: {required: true },                       // 展示等级
                    title: {required: true, minLength: 1},              // 设计标题
                    'wechatArticle.content':{required: true},           // 内容
                    'contentSyllabus':{required: true},   // 文章内容大纲
                    'wechatImage.imageUrl':{required: true},            // 封面
                    'posterImage.imageUrl':{required: true},         // 海报
                    btnText: {required: true},                    // 自定义按钮文字
                    btnOnclickUrl: {required: true},              // 自定义按钮路径
                    btnOnclickParams: {required: true},           // 自定义按钮参数
                    btnTag:{required: true},                      // 当是标签的时候，加一个参数

                    templateId:{required: true},                      // 当是标签的时候，加一个参数
                }
            }
        },
        //用来判断案例显示什么 营销活动显示什么  设计方案显示什么
        informationView:{
            uniqueNo:['RULE'],                                                           //唯一编号
            category:['DESIGN','CASE','PACKAGE','ACTIVITY','NEWS'],                    // 栏目
            topicId:['DESIGN','CASE','PACKAGE','ACTIVITY','NEWS'],                     // 专题id
            title:['DESIGN','CASE','PACKAGE','ACTIVITY','NEWS'],                       // 设计标题和内容标题现在是一个
            'wechatArticle-content':['DESIGN','PACKAGE','CASE'],                // 文章内容
            'wechatArticle-contentSyllabus':['DESIGN','PACKAGE','CASE'],        //文章摘要
            panorama:['DESIGN','PACKAGE','CASE'],                               // 3D全景
            houseType:['DESIGN'],                                     // 推荐户型
            designerName:['DESIGN'],                                  // 设计师姓名
            stylist:['DESIGN','CASE'],                               // 有可能有设计师id 选择框模式设计师
            lprice:['DESIGN','PACKAGE','CASE'],                                 // 最低价格
            hprice:['DESIGN','PACKAGE','CASE'],                                 // 最高价格
            signs:['DESIGN','PACKAGE','CASE'],                                  // 标签
            wechatImage:['DESIGN','PACKAGE','CASE','ACTIVITY','NEWS'],                 // 封面
            posterImage:['DESIGN','PACKAGE','CASE','ACTIVITY','NEWS'],                 // 海报
            zdybtn:['DESIGN','CASE','PACKAGE','ACTIVITY','NEWS']                                                  // 自定义按钮
        //产品套餐 PACKAGE  ，设计方案 DESIGN，案例CASE，营销活动ACTIVITY,  新闻资讯NEWS
        },
        information:{
            //富文本rtf       自己渲染dom
            contentType:'',
            paragraphs:[],

            topicId:'',                     // 专题id
            designerType:'rest',        // 设计师手输还是选择  rest是手输
            designerName:null,              // 设计师姓名
            designer:null,                // 设计师Id
            fprice:'',                      // 一口价
            houseType:'',                   // 推荐户型
            hprice:'',                      // 最高价格
            lprice:'',                      // 最低价格
            panorama:'',                    // 酷家乐连接
            title:'',                       // 设计标题
            contentSyllabus:'',                       // 文章内容摘要
            //栏目
            categoryArr:[],
            kind:'',
            wechatArticle: {
                content: "",                // 文章内容
                contentSyllabus: "",        // 文章内容摘要
                title: ""                   // 文章标题
            },
            signs:[],
            wechatImage: {                  // 封面
                ext: "",
                imageMd5: "",
                imageUrl: "",
                name: "",
                reduceUrl: ""
            },
            posterImage: {                  // 海报
                ext: "",
                imageMd5: "",
                imageUrl: "",
                name: "",
                reduceUrl: ""
            },

            btnOnclickUrl:'',
            btnOnclickParams:'',

            //海报id
            templateId:''

        },
        informationData:null,
        editInformation:null,
        //关于海报的参数
        posterImage:{
            w:null,
            h:null,
            template:null,//海报模版
            rw:null,
            rh:null
        }
    },
    methods: {
        contentFormat(htm){
            //特殊字符
            const regeX = new RegExp('spanyes\';', 'gi');
            htm = htm.replace(regeX, 'span ');
            htm = htm.replace(/<style(([\s\S])*?)<\/style>/g, '');
            const reg = /<!--\[if(?:(?!<!\[endif\]-->)[\s\S])*<!\[endif\]-->/gi;
            htm = htm.replace(reg, '');
            //font ==> span
            const fontEnd = new RegExp('/font', 'gi');
            htm = htm.replace(fontEnd, '/span');
            const fontStart = new RegExp('<font', 'gi');
            htm = htm.replace(fontStart, '<span');
            //phelvetica ==》 div
            const phelveticaEnd = new RegExp('</phelvetica', 'gi');
            htm = htm.replace(phelveticaEnd, '</div');
            const phelveticaStart = new RegExp('<phelvetica', 'gi');
            htm = htm.replace(phelveticaStart, '<div');
            //sectionhelvetica ==》 div
            const sectionhelveticaStart = new RegExp('<sectionhelvetica', 'gi');
            htm = htm.replace(sectionhelveticaStart, '<div');
            const sectionhelveticaEnd = new RegExp('</sectionhelvetica', 'gi');
            htm = htm.replace(sectionhelveticaEnd, '</div');
            //一级标题H2
            const h1Start = new RegExp('<H2', 'gi');
            htm = htm.replace(h1Start, '<h2 style="font-size :18px;color:#303133;font-weight: bold;margin:20px 0;"');
            //二级标题H3
            const h2Start = new RegExp('<H3', 'gi');
            htm = htm.replace(h2Start, '<h3 style="font-size :16px;color:#303133;font-weight: bold;margin:14px 0;"');
            //三级标题H4
            const h3Start = new RegExp('<H4', 'gi');
            htm = htm.replace(h3Start, '<h4 style="font-size :14px;color:#303133;font-weight: bold;margin:10px 0;"');
            htm = htm.replaceAll('<p></p>', '');
            return htm;
        },
        //处理方案保存数据
        processing(e){
            let ele = JSON.parse(JSON.stringify(e));
            if(ele.contentType === 'dom'){
                for (let el of ele.paragraphs){
                    if (!el.content){
                        this.$message.error('有dom内容片段为空，请填写正确内容');
                        return false;
                    }else if (el.elementType === 'DDD_PIC' && (!el.content || !el.qjtUrl)){
                        this.$message.error('有dom内容3D全景缺少内容，请填写正确内容');
                        return false;
                    }else if(el.elementType === 'NET_PIC' && !(el.content.indexOf('https:') === 0 || el.content.indexOf('http:') === 0) ){
                        this.$message.error('有dom内容网络图片格式不正确，请填写正确内容');
                        return false;
                    }
                }
                ele.imageNum = ele.paragraphs.filter(el => {
                    return (['NET_PIC','DDD_PIC','GENERAL_PIC'].includes(el.elementType) && el.content);
                }).length;
            }else{
                let con = editor.txt.html();
                ele.wechatArticle = {};
                ele.wechatArticle.title = ele.title ;
                ele.wechatArticle.content = self.contentFormat(con);
                ele.wechatArticle.contentSyllabus = ele.contentSyllabus;
                editor.txt.html(con);
                ele.imageNum = con && (con.split('<img').length -1) || 0 ;
                ele.wechatArticle.imageNum = con && (con.split('<img').length -1) || 0 ;
            }
            if(ele.timeCreated){
                delete ele.timeCreated;
            }
            if(ele.publishTime){
                delete ele.publishTime;
            }
            if(ele.timeUpdated){
                delete ele.timeUpdated;
            }
            if(ele.wechatArticle && ele.wechatArticle.timeCreated){
                delete ele.wechatArticle.timeCreated;
            }
            Object.keys(ele).forEach(i => {
                if(!ele[i]){
                    delete ele[i];
                }
            });
            if(ele.kind === 'RULE'){
                delete ele.posterImage;
                delete ele.wechatImage;
                delete ele.signs;
                delete ele.templateId;
            }
            if(ele.wechatImage && ele.wechatImage.id){
                ele.cover =  ele.wechatImage.id;
            }
            if(ele.posterImage && ele.posterImage.id){
                ele.poster =  ele.posterImage.id;
            }
            //　没有id 是修改
            if(!ele.id && ele.signs && Array.isArray(ele.signs) ){
                ele.signs = ele.signs.map(el => {
                    let obj = {
                        "signType": el[0],
                        "signId": el[1]
                    };
                    return obj;
                });
            }
            delete ele.categoryArr;
            if(ele.btnOnclickParams){
                ele.btnOnclickParams = DSP.tags.tags.find(el => {return el.id === this.information.btnOnclickParams;}).code;
            }
            return ele;
        },
        addSave(){
            let self = this;
            if(DSP.type === 'edit'){
                this.editSave();
                return;
            }
            this.$data.$validator.validateAll().then(pass => {
                if (pass) {
                    let obj = self.processing(self.information);
                    if (!obj){return;}
                    self.saveLoading = true;
                    axios.post(`/api/wechat/admin/design`, obj).then(response => {
                        if (response.success) {
                            if(self.information && self.information.showLevel !== 'PUBLIC'){
                                axios.put(`/api/wechat/admin/design/publish?ids=${self.information.id}`);
                            }
                            self.$message({
                                showClose: true,
                                message: '保存成功方案成功',
                                type: 'success'
                            });
                            window.location.href = `/wechat/wechatList#${window.location.hash}`;
                            self.saveLoading = false;
                        }else {
                            self.saveLoading = false;
                        }
                    }).catch((error) => {
                        self.saveLoading = false;
                        console.error('error: %o', error);
                    });
                }else {
                    console.log(self.information);
                }
            });
        },
        //修改保存
        editSave(){
            this.$data.$validator.validateAll().then(pass => {
                if (pass) {
                    let obj = self.processing(self.information);
                    if (!obj){return;}
                    self.saveLoading = true;
                    axios.put(`/api/wechat-admin-service/wechat/admin/design`,obj).then(response => {
                        if (response.success) {
                            if(self.information && self.information.showLevel !== 'PUBLIC'){
                                axios.put(`/api/wechat/admin/design/publish?ids=${self.information.id}`);
                            }
                            self.$message({
                                showClose: true,
                                message: '修改方案成功',
                                type: 'success'
                            });
                            window.location.href = `/wechat/wechatList#${window.location.hash}`;
                            self.saveLoading = false;
                        }else {
                            self.saveLoading = false;
                        }
                    }).catch((error) => {
                        self.saveLoading = false;
                        console.error('error: %o', error);
                    });
                }else {
                    console.log(self.information);
                }
            });
        },
        //获取编辑数据并赋值
        getEdit(e){
            axios.get(`/api/wechat/admin/design/detail?id=${e}`).then(res =>{
                if(res.success){
                    self.editInformation = JSON.parse(JSON.stringify(res.data));
                    self.information = JSON.parse(JSON.stringify(res.data));
                    if(  !self.information.contentSyllabus){
                        self.information.contentSyllabus = self.information.wechatArticle && self.information.wechatArticle.contentSyllabus;
                    }
                    if(  !self.information.title){
                        self.information.title = self.information.wechatArticle && self.information.wechatArticle.contentSyllabus;
                    }
                    //新增模式
                    if(!self.information.paragraphs){
                        this.$set(self.information,'paragraphs', []);
                    }

                    if(!self.information.wechatImage){
                        self.information.wechatImage = {};
                        this.$set(self.information.wechatImage,'ext', null);
                        this.$set(self.information.wechatImage,'imageMd5', null);
                        this.$set(self.information.wechatImage,'imageUrl', null);
                        this.$set(self.information.wechatImage,'name', null);
                        this.$set(self.information.wechatImage,'reduceUrl', null);
                    }
                    if(!self.information.posterImage){
                        self.information.posterImage = {};
                        this.$set(self.information.posterImage,'ext', null);
                        this.$set(self.information.posterImage,'imageMd5', null);
                        this.$set(self.information.posterImage,'imageUrl', null);
                        this.$set(self.information.posterImage,'name', null);
                        this.$set(self.information.posterImage,'reduceUrl', null);
                    }
                    if(!self.information.bindingSignResultEntities){
                        this.$set(this.information,'signs', []);
                    }else {
                        let ar = JSON.parse(JSON.stringify(self.information.bindingSignResultEntities));
                        let arr = ar.map(el => {
                           return [el.signType,el.signId];
                        });
                        this.$set(this.information,'signs', arr);
                    }
                    if(!self.information.btnOnclickUrl){
                        this.$set(this.information,'btnOnclickUrl', null);
                    }
                    if(!self.information.btnOnclickParams){
                        this.$set(this.information,'btnOnclickParams', null);
                    }
                    self.informationData = JSON.parse(JSON.stringify(self.information));
                    // designerType
                    if(!self.informationData.designer){
                        self.$set(this.information,'designerType', 'rest');
                    }
                    let categoryArr = self.information.kind.split('.');
                    self.decoded={
                            column:{
                                value:self.information.kind,
                                parent:categoryArr[0]
                            },
                            columnDate:{
                                DESIGN:true,
                                REFORM:true
                            }
                        };
                    if(categoryArr.length > 1){
                        this.information.categoryArr = [categoryArr[0],self.information.kind];
                    }else{
                        this.information.categoryArr = [categoryArr[0]];
                    }
                    // 链接转跳标签
                    if(this.information.btnOnclickUrl && this.information.btnOnclickUrl === '/pages/design/listBytag/main' && this.information.btnOnclickParams){
                        let tagobj = DSP.tags.tags.find(el => {return el.code === this.information.btnOnclickParams;});
                        this.information.btnTag = [ tagobj.type,tagobj.id];
                    }


                    self.changeTemplateId('first');
                }
            });
        },
        //更换栏目
        onCategoryChanged(e){
            this.information.topicId =null;
            this.information.kind = e && e[1] || e[0];
            this.decoded.column.parent = e[0];
            //新闻资讯-自定义按钮-路径
            this.information.btnOnclickUrl = null;
            //新闻资讯-自定义按钮-参数
            this.information.btnOnclickParams = null;
            //设计师清空
            if(e && (e[0] === 'DESIGN' || e[0] === 'CASE')){
                this.information.designerType = "stylist";
            }else {
                this.information.designerType = "rest";
            }
            this.information.designerName = null;
            this.information.designer = null;
        },
        // 预览
        preview() {
            let con = editor.txt.html();
            if(!self.information.wechatArticle){
                self.information.wechatArticle = {};
            }
            self.information.wechatArticle.content = JSON.parse(JSON.stringify(con));

            editor.txt.html(con);
        },
        // 自定义按钮链接修改
        bannerChange(e) {
            this.information.btnOnclickParams = null;
        },
        changeXcx() {
            this.information.btnOnclickParams = null;
            this.information.btnOnclickUrl = null;
        },
        blurSigns(flag){
            let self  = this;
            setTimeout(()=>{
                if(!flag && self.information.id && self.information.signs && Array.isArray(self.information.signs)){
                    let shu = JSON.parse(JSON.stringify(self.information.signs ));
                    let obj = {
                        realm: "WECHAT_DESIGN",
                        realmId: self.information.id,
                    };
                    obj.wechatSysSignBindings = shu.map(el => {
                        let ob =   {
                            "realm": "WECHAT_DESIGN",
                            "realmId": obj.realmId,
                            "signId": el[1],
                            "signType": el[0]
                        };
                        return ob;
                    });
                    if(!self.view.putTag){
                        self.view.putTag = true;
                        axios.post('/api/wechat/admin/binding/tag/save',obj).then(ele =>{
                            self.view.putTag = false;
                        }).catch(err => {
                            self.view.putTag = false;
                            self.$message({
                                showClose: true,
                                message: '修改标签错误，请重新修改',
                                type: 'error'
                            });
                        });
                    }else {
                        self.$message({
                            showClose: true,
                            message: '修改标签中，请勿重复操作',
                            type: 'error'
                        });
                    }

                }
            },1);
        },
        // 模版变化
        changeTemplateId(type){
            let self = this;
            if(!this.information.templateId){
                return;
            }
            this.posterImage.template = DSP.template.results.find(el => {return el.id === self.information.templateId;});
            if(this.posterImage.template){
                this.posterImage.w = this.posterImage.template.articleImageWidth;
                this.posterImage.h = this.posterImage.template.articleImageHigh;
            }
            if(type !== 'first' && this.posterImage.w !== this.posterImage.rw){
                // 清除海报配图
                this.$set(self.information.posterImage,'ext', null);
                this.$set(self.information.posterImage,'imageMd5', null);
                this.$set(self.information.posterImage,'imageUrl', null);
                this.$set(self.information.posterImage,'name', null);
                this.$set(self.information.posterImage,'reduceUrl', null);
            }else {
                this.posterImage.rw = JSON.parse(JSON.stringify(this.posterImage.template.articleImageWidth));
                this.posterImage.rw = JSON.parse(JSON.stringify(this.posterImage.template.articleImageHigh));
            }

        },
        handleAvatarSuccess(res, file , item) {
            self.view.viewLoading = false;
            console.log(res.data.relativePath);
            item.content = res.data.relativePath;
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
            const isLt200kb = file.size / 1024 < 200;
            self.view.viewLoading = true;
            if (!isJPG) {
                self.view.viewLoading = false;
                this.$message.error('上传广告图片只能是 JPG / png格式!');
            }
            if (!isLt200kb) {
                self.view.viewLoading = false;
                this.$message.error('上传图片大小不能超过 200kb!');
            }
            return isJPG && isLt200kb;
        },
        //新增节点
        addNode(e){
            let nodeobj = {
                content:'',
                elementType:e,
            };
            if(e === 'DDD_PIC'){
                nodeobj.qjtUrl = '';
            }
            self.information.paragraphs.push(nodeobj);
        },
        //删除节点
        delNode(e){
            self.information.paragraphs.splice(e,1);
            self.information.paragraphs = Object.assign([], self.information.paragraphs);
        },
        //移动节点
        move(e,type,fl) {
            if(fl){return;}
            let self = this;
            let arr = JSON.parse(JSON.stringify(self.information.paragraphs));
            //要换的元素下标
            let yao = type === 'top' ? e*1 - 1 : e*1 + 1;
            //将原来元素保存
            let k = arr[e];
            arr[e] = arr[yao];
            arr[yao] = k;
            self.information.paragraphs = Object.assign([], arr);
        },

        //设计师列表
        getDesignerList(){
            let self = this;
            axios.get('/api/mpuser/service/designer/page/size?page=1&size=10000').then(res => {
                self.designerList = res.data && res.data.results;
            });
        },
        changeDesignerType(){
            this.information.designerName = null;
            this.information.designer = null;
        },
        //切换设计师
        changeDesigner(e){
            let obj = this.designerList.find(el => {
                return el.id === e;
            });
            this.information.designer = e;
            this.information.designerName = obj.name;
        }
    },
    // 页面加载完成后获取所有菜单信息
    mounted() {
        let self = this;
        self.getDesignerList();
        if(DSP.type === 'edit'){
            this.getEdit(DSP.id);
        }else {
            this.information.contentType = 'dom';
        }
        let hash = window.location.hash;
        if (hash != '') {
            try {
                let decoded = this.$base64Decode(hash.slice(1));
                if (typeof(decoded) === 'object') {
                    decoded = decoded.leftData;
                    this.decoded = decoded;
                    this.information.kind = decoded.column.value;
                    if(decoded.column.parent){
                        this.information.categoryArr = [decoded.column.parent,decoded.column.value];
                    }else if(decoded.column.value){
                        this.decoded.column.parent = decoded.column.value;
                        this.information.categoryArr = [decoded.column.value];
                    }
                    console.log(this.information.categoryArr);
                    this.decoded = Object.assign({},this.decoded);
                }
            } catch (error) {
                console.log(error);
            }
        }

        // 创建编辑器
        editor = new E('#editor');
        editor.customConfig.zIndex = 100;
        editor.customConfig.menus = [
            'head',  // 标题
            'bold',  // 粗体
            // 'fontSize',   // 字号
            // 'fontName',  // 字体
            // 'italic',  // 斜体
            // 'underline',  // 下划线
            // 'strikeThrough',  // 删除线
            // 'foreColor',  // 文字颜色
            // 'backColor',  // 背景颜色
            // 'link',  // 插入链接
            // 'list',  // 列表
            // 'justify',  // 对齐方式
            // 'quote',  // 引用
            // 'emoticon',  // 表情
            'image',  // 插入图片
            'table',  // 表格
            // 'video',  // 插入视频
            // 'code',  // 插入代码
            'undo',  // 撤销
            'redo'  // 重复
        ];
        // editor.customConfig.uploadImgShowBase64 = true   // 使用 base64 保存图片
        editor.customConfig.uploadImgParamsWithUrl = true;
        editor.customConfig.withCredentials = true;
        editor.customConfig.uploadImgMaxSize =  1024 * 512;
        // 限制一次最多上传 5 张图片
        editor.customConfig.uploadImgMaxLength = 1;
        // 自定义文件名
        editor.customConfig.uploadFileName = 'file';
        // editor.customConfig.uploadFileType = 'JPG';
        // 将 timeout 时间改为 3s
        editor.customConfig.uploadImgTimeout = 180000;
        editor.customConfig.uploadImgServer = '/api/file-service/file/wechat/admin/upload';  // 上传图片到服务器


        editor.customConfig.uploadImgHooks = {
            before: function (xhr, editor, files) {
                // 图片上传之前触发
                // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，files 是选择的图片文件
                imgUrl = URL.createObjectURL(files[0]);
            },
            success: function (xhr, editor, result) {
                // 图片上传并返回结果，图片插入成功之后触发
                // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
                // var url = result.data.url;
                // alert(JSON.stringify(url));
                // editor.txt.append(url);
                // alert("成功");
            },
            fail: function (xhr, editor, result) {
                // 图片上传并返回结果，但图片插入错误时触发
                // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
                alert("失败");
            },
            error: function (xhr, editor) {
                // 图片上传出错时触发
                // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
                console.log(xhr);
                alert("错误");
            },
            // 如果服务器端返回的不是 {errno:0, data: [...]} 这种格式，可使用该配置
            // （但是，服务器端返回的必须是一个 JSON 格式字符串！！！否则会报错）
            customInsert: function (insertImg, result, editor) {
                // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
                // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果
                // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
                // var url = result.data[0];
                let url = DSP.globalConfig.fileBaseUrl + result.data.relativePath;
                insertImg(url);
                // result 必须是一个 JSON 格式字符串！！！否则报错
            }
        };

        // editor.customConfig.onchange = function (html) {
        //     self.information.wechatArticle.content = self.contentFormat(html);
        // };
        editor.create();


    }
});


