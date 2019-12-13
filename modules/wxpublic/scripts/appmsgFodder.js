/* jshint esversion: 6 */
/* jshint esversion: 8 */
import Vue from '@/scripts/module/vue';
import enums from '@/scripts/module/enums';
import axios from '@/scripts/module/axios';
import cropper from '@/components/ui/dsp-cropper.vue';

// 引用
var E = require('wangeditor');  // 使用 npm 安装
// 创建编辑器
var editor;
var imgUrl;

let self = new Vue({
    el: '#app',
    delimiters: ['{[', ']}'],
    components: {
        'dsp-cropper': cropper,
    },
    data: {
        //从图文管理进来的数据
        appmsg:null,
        //是编辑的数据    原始  sourceData.newsPublish === '2' 不能对他进行删除移动
        sourceData:null,
        //视图显示什么和loading
        views:{
            //保存loading //全局loading
            saveLoading:false,
            //发布对话框
            issueDialog:false,
            //小程序对话框
            xcxDialog:false
        },
        $validator: {
            rule: {
                information: {
                    title: {required: true},
                    mediaSourseUrl: {required: true},
                    'imageUrl.imageUrl': {required: true},
                },
                information2: {
                    appid: {required: true},
                    xcxurl: {required: true},
                    xcxway: {required: true},
                    cardTitle: {required: true},
                    cardimgUrl: {required: true},
                    text: {required: true},
                    imgimg: {required: true},
                }
            }
        },
        //编辑内容
        information:null,
        //给后端的数据
        articlesList:[],
        //编辑内容模版   todo articles对象zdyId需要传给后端 同理需要
        articles:{
            "title": '',                    //标题
            "imageUrl": '',                 //封面图片对象                            todo 这是不需要传给后端的   掉借口返回时需要将mediaSourseUrl赋值给imageUrl
            "mediaSourseUrl": '',           //图文消息的封面图片素材id（必须是永久mediaID）
            "author": '',                   //作者
            "digest": '',                   //图文消息的摘要，仅有单图文消息才有摘要，多图文此处为空。如果本字段为没有填写，则默认抓取正文前64个字。
            "show_cover_pic": 0,              //是否显示封面，0为false，即不显示，1为true，即显示
            "content": '',                  //图文消息的具体内容，支持HTML标签，必须少于2万字符，小于1M，且此处会去除JS,涉及图片url必须来源 "上传图文消息内的图片获取URL"接口获取。外部图片url将被过滤。
            "content2": '',                  //图文消息的具体内容替代品
            "content_source_url": '',       //	图文消息的原文地址，即点击“阅读原文”后的URL
            "need_open_comment":0,            //Uint32 是否打开评论，0不打开，1打开
            "only_fans_can_comment":0          //Uint32 是否粉丝才可评论，0所有人可评论，1粉丝才可评论
        },
        //发布对话框数据
        issueData:{
            title:'',
            isIndeterminate:false,
            //总数据
            userSortDict:null,
            //单纬度数据用于判断是否全选
            ifcheckAll:null,
            checkedCities: [],
            //是否为全选
            checkAll:false,
        },

        information2: {
            app:'',
            //小程序appid
            appid:null,
            //小程序路径
            xcxurl:null,
            //展示方式
            xcxway:null,
            //文字内容
            text:null,
            //卡片标题
            cardTitle:null,
            //卡片图片
            cardimgUrl:null,
            //图片
            imgimg:null,
        },
    },
    methods: {
        changeApp(e){
            this.information2.app = DSP.xcx.find(el => {
                return el.appId === e;
            });
        },
        imgurl(url){
            if(url && url.indexOf('http:') > -1){
                return url;
            }else {
                return DSP.globalConfig.fileBaseUrl + url;
            }
        },
        contentFormat(htms){
            let htm = JSON.parse(JSON.stringify(htms));
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


            //一级标题H1
            const h1Start = new RegExp('<H2', 'gi');
            htm = htm.replace(h1Start, '<H2 style="font-size :24px;color:#303133;font-weight: bold;"');
            //二级标题H2
            const h2Start = new RegExp('<H3', 'gi');
            htm = htm.replace(h2Start, '<H3 style="font-size :18px;color:#303133;font-weight: bold;"');
            //正文部分h3
            const h3Start = new RegExp('<H4', 'gi');
            htm = htm.replace(h3Start, '<H4 style="font-size :14px;color:#606266;font-weight: initial;"');
            const p4 = new RegExp('<p></p>', 'g');
            htm = htm.replace(p4, '');
            return htm;
        },
        //配置创建编辑器
        creatEditor(){
            let self = this;
            // 创建编辑器
            editor = new E('#div1','#editor');
            editor.customConfig.zIndex = 100;
            editor.customConfig.menus = [
                'head',  // 标题
                'bold',  // 粗体
                'image',  // 插入图片
                'undo',  // 撤销
                'justify',  // 对齐方式
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
                    axios.post(`/api/wechat-service/wechat/more/uploadImgMedia?imgUrl=${result.data.relativePath}&gzhId=${self.appmsg.appid.appid}`).then(res => {
                        if(res.code === '000' && res.data ){
                            insertImg(res.data);
                        }else{
                            alert("错误");
                        }
                    }).catch(err => {
                        alert("错误");
                    });
                }
            };

            editor.customConfig.onchange = function (html) {
                let str = '<div style="text-align: left">'+html+'</div>';
                self.information.content = self.contentFormat(str);
            };
            editor.create();
        },
        //获取图文详情 给information赋值 给articlesList赋值
        getmsgid(){
            console.log(this.appmsg);
            let self = this;
            axios.get(`/api/wechat-service/wechat/more/queryNewArticle?newsId=${self.appmsg.msgid}`).then(res => {
                if(res.code === '000'){
                    self.sourceData = JSON.parse(JSON.stringify(res.data));
                    self.articlesList = self.sourceData.newsArticles;
                    self.articlesList.map(ele => {
                        ele.zdyId =ele.id;
                        ele.content2 = JSON.parse(JSON.stringify(ele.content));
                        let obj = {
                            imageUrl:ele.mediaSourseUrl
                        };
                        self.$set(ele,'imageUrl',obj);
                    });
                    self.information =  self.articlesList[0];
                    setTimeout(()=>{
                        self.creatEditor();
                    },100);
                }
            });

        },
        //点击保存并发布按钮  验证数据是否有效 有效打开对话框
        saveWx(){
                self.ifnull();
                this.$data.$validator.validateAll().then(pass => {
                    if (pass) {
                        self.views.issueDialog = true;
                    }
                });
        },
        //发布对话框保存按钮
        issueDialogSave(){
            if(self.issueData.checkedCities.length < 1){
                this.$message('请选择发布给那种类型用户');
                return;
            }
            if(self.views.saveLoading){return;}
            self.views.saveLoading = true;
            if(self.appmsg.msgid){
                self.editUpload();
            }else{
                self.addUpload();
            }
        },
        //新建时上传并发布
        addUpload(){
            let obj = {
                str:self.issueData.checkedCities,
                newsArticles:self.articlesList,
                gzhId:this.appmsg.appid.appid,
            };
            axios.post('/api/wechat-service/wechat/more/addNewsMaterialAndPublish',obj).then(res => {
                if(res.code === '000'){
                    window.location = '/wxpublic/appmsg';
                }else {
                    self.views.saveLoading = false;
                }
            }).catch(err =>{
                self.views.saveLoading = false;
            });
        },
        //修改时上传发布
        editUpload(){
            let obj = {
                id:self.sourceData.id,
                configId:self.sourceData.configId,
                newsPublish : 2,
                newsArticles : self.articlesList,
                str:self.issueData.checkedCities,
                gzhId:this.appmsg.appid.appid,
            };
            if(self.sourceData.mediaId){
                obj.mediaId = self.sourceData.mediaId;
            }

            axios.put('/api/wechat-service/wechat/more/updateNewsMaterialAndPublish',obj).then(res => {
                if(res.code === '000'){
                    window.location = '/wxpublic/appmsg';
                }else {
                    self.views.saveLoading = false;
                }
            }).catch(err =>{
                self.views.saveLoading = false;
            });
        },
        save(){
            self.ifnull();
            this.$data.$validator.validateAll('information').then(pass => {
                if (pass) {
                    //appmsg.msgid有值是修改
                    if(self.appmsg.msgid){
                        self.editSave();
                    }else{
                        self.addSave();
                    }
                }
            });
        },
        xiagao(){
            // if(self.views.saveLoading){return;}
            // self.views.saveLoading = true;
            let obj ={
                id : self.sourceData.id,
                newsPublish : self.sourceData.newsPublish,
                newsArticles : self.articlesList,
                gzhId:this.appmsg.appid.appid,
            };
            axios.put('/api/wechat-service/wechat/more/updateNewsMaterial',obj).then(res => {
                if(res.code === '000'){
                    // window.location = '/wxpublic/appmsg';
                }else {
                    self.views.saveLoading = false;
                }
            }).catch(err =>{
                self.views.saveLoading = false;
            });
        },
        editSave(){
            let self = this;
            if(self.views.saveLoading){return;}
            self.views.saveLoading = true;
            let obj ={
                id : self.sourceData.id,
                newsPublish : self.sourceData.newsPublish,
                newsArticles : self.articlesList,
                gzhId:this.appmsg.appid.appid,
            };
            axios.put('/api/wechat-service/wechat/more/updateNewsMaterial',obj).then(res => {
                if(res.code === '000'){
                    window.location = '/wxpublic/appmsg';
                }else {
                    self.views.saveLoading = false;
                }
            }).catch(err =>{
                self.views.saveLoading = false;
            });
        },
        //新增图文保存
        addSave(){
            if(self.views.saveLoading){return;}
            self.views.saveLoading = true;
            let obj = {
                gzhId:this.appmsg.appid.appid,
                replyContentArticles:self.articlesList
            };
            axios.post('/api/wechat-service/wechat/more/addNewsMaterial',obj).then(res => {
                if(res.code === '000'){
                    window.location = '/wxpublic/appmsg';
                }else {
                    self.views.saveLoading = false;
                }
            }).catch(err =>{
                self.views.saveLoading = false;
            });
        },
        //构建zdyid 用于新建时确定当前选中的图文
        creationId(){
            let idStr = Date.now().toString(36);
            idStr += Math.random().toString(36).substr(3);
            return idStr;
        },
        //新增图文
        addMsg(){
            if(self.articlesList.length < 10){
                let obj = JSON.parse(JSON.stringify(self.articles));
                    obj.zdyId = self.creationId();
                    self.articlesList.push(obj);
            }
        },
        //选中那个图文
        currentMsg(item){
            setTimeout(()=>{
                self.information = item;
                editor.txt.html(item.content);
            },100);
        },
        //非空判断,构建articlesList数据
        ifnull(){
            for(let item of self.articlesList){
                if(item.imageUrl && item.imageUrl.imageUrl){
                    item.mediaSourseUrl = item.imageUrl.imageUrl;
                }
                if(!item.title){
                    self.information = item;
                    return 2;
                }else if(!item.imageUrl || (item.imageUrl && !item.imageUrl.imageUrl)){
                    self.information = item;
                    return 2;
                }
            }
        },
        //删除新增图文cell
        delmsg(e){
            //如果是已经发布的不能删除
            if(this.sourceData && this.sourceData.newsPublish > 1){
                return;
            }
            this.$confirm('确定删除此篇图文？', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                if(self.articlesList[e].zdyId === self.information.zdyId){
                    self.information = self.articlesList[e - 1];
                }
                self.articlesList.splice(e, 1);
            }).catch(err => {
            //
            });
        },
        //移动 type： up上 down下
        move(i , type){
            //如果是已经发布的不能移动
            if(this.sourceData && this.sourceData.newsPublish > 1){
                return;
            }
            //要移动的数据
            let se = this.articlesList[i];
            //要移动到的数据
            let te = '';
            //要移动到的位置
            let ti = '';
            if(type === 'up' ){
                ti = i - 1;
                te = this.articlesList[i - 1];
            }else {
                ti = i + 1;
                te = this.articlesList[i + 1];
            }
            this.articlesList[i] = te;
            this.articlesList[ti] = se;
            this.articlesList = Object.assign([],this.articlesList);
        },
        //获取用户图文推送分类汇总
        getUserSortDict(){
            let self = this;
          axios.get(`/api/wechat-service/wechat/more/getUserSortDict?gzhId=${self.appmsg.appid.appid}`).then(res =>{
            if(res.code === '000'){
                if(res.data && res.data.city && res.data.city[0] && res.data.city[0].value==='all'){
                    res.data.city.shift();
                }
                this.issueData.userSortDict = res.data;
                this.issueData.ifcheckAll = [];
                let obj =JSON.parse(JSON.stringify(res.data));
                for (let i in obj){
                    if(obj[i] instanceof Array){
                        this.issueData.ifcheckAll = this.issueData.ifcheckAll.concat(obj[i]);
                    }
                }
                console.log( this.issueData.ifcheckAll);
            }
          });
          axios.get(`/api/wechat-service/wechat/more/queryContentArticleLogCount?gzhId=${self.appmsg.appid.appid}`).then(res => {
             this.issueData.title = res.data || '0';
          });
        },
        //全选
        handleCheckAllChange(val) {
            this.issueData.checkedCities =[];
            if(val){
                this.issueData.ifcheckAll.map (el => {
                    this.issueData.checkedCities.push(el.value);
                });
            }
            this.issueData.isIndeterminate = false;
        },
        //单选
        handleCheckedCitiesChange(value) {
            //判断是全选还是单选
            this.issueData.checkAll = value.length === this.issueData.ifcheckAll.length;
            //是否为中间态度
            this.issueData.isIndeterminate = value.length  > 0 && value.length  < this.issueData.ifcheckAll.length;
        },
        //确定添加小程序
        async qeding(){
            let self = this;
            const loading = this.$loading({
                lock: true,
                text: '构建数据中',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            let imgUrl =  self.information2.cardimgUrl && self.information2.cardimgUrl.imageUrl; // 卡片的图片的url
            if(imgUrl){
                imgUrl = await axios.post(`/api/wechat-service/wechat/more/uploadImgMedia?imgUrl=${imgUrl}&gzhId=${self.appmsg.appid.appid}`);
                imgUrl = imgUrl && imgUrl.data;
            }
            let imgimg = self.information2.imgimg;
            if(imgimg){
                imgimg = await axios.post(`/api/wechat-service/wechat/more/uploadImgMedia?imgUrl=${imgimg}&gzhId=${self.appmsg.appid.appid}`);
                imgimg = imgimg && imgimg.data;
            }
            setTimeout(() => {
                loading.close();
            }, 10);
            this.$data.$validator.validateAll('information2').then(pass => {
                if (pass) {
                    // 获取到的小程序对象
                    var appid = self.information2.app.appId; // 小程序appid
                    var nickName = self.information2.app.name; // 小程序名字
                    var path = self.information2.xcxurl; // 待定 小程序的url
                    var title= self.information2.cardTitle; // 卡片标题
                    // if(1===1){
                    //     return;
                    // }
                    let p = '';
                    if( self.information2.xcxway === 'text'){
                        p =`<a href="http://www.qq.com" data-miniprogram-appid="${appid}" data-miniprogram-path="${path}">${self.information2.text}</a>`;
                    }else if(self.information2.xcxway === 'card'){
                        p = `<iframe src=\"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=tmpl/weapp_tmpl&appid=${appid}&nickName=${nickName}&path=${path}&title=${title}&imgUrl=${imgUrl}\" class=\"res_iframe weapp_app_iframe js_editor_weapp wxCard\" data-miniprogram-appid=\"${appid}\" data-miniprogram-nickname=\"${nickName}\" data-miniprogram-title=\"${title}\" data-miniprogram-imageUrl=\"${imgUrl}\" data-miniprogram-path=\"${path}\">
                        </iframe><p><mp-miniprogram data-miniprogram-appid=\"${appid}\" data-miniprogram-path=\"${path}\" data-miniprogram-title=\"${title}\" data-miniprogram-imageurl=\"${imgUrl}\"></mp-miniprogram></p >`;
                    }else if ( self.information2.xcxway === 'img'){
                        p =`<a class=\"weapp_image_link"\ data-miniprogram-appid=\"${appid}\" data-miniprogram-path=\"${path}\" data-miniprogram-nickname=\"${nickName}\" href="" data-miniprogram-type="image" data-miniprogram-servicetype="" _href=""><img class="rich_pages" data-ratio="1.0422535211267605" src=\"${imgimg}\" data-type="jpeg"  style=""></a>`;
                    }
                    self.information.content += p;
                    self.$set( self.information,'content2',JSON.parse(JSON.stringify(self.information.content)));
                    self.views.xcxDialog = false;
                }
            });
        },
        //
        handleAvatarSuccess(res, file) {
            var that = this;
            if(res.success){
                that.information2.imgimg = res.data.relativePath;
            }
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
            const isLt200kb = file.size / 1024 < 200;
            if (!isJPG) {
                this.$message.error('上传广告图片只能是 JPG / png格式!');
            }
            if (!isLt200kb) {
                this.$message.error('上传图片大小不能超过 200kb!');
            }
            return isJPG && isLt200kb;
        },
    },

    mounted () {
        let self = this;
        let hash = window.location.hash;
        //通过hash值确定 是新增还是编辑 decoded有msgid是编辑 没有为新增   通过appid.id 确定
        //decoded ={
        //      msgid:''        是编辑 没有为新增   有是编辑掉getmsgid()没有就是新增
        //      appid:''        是那个小程序
        // }
        //
        if (hash) {
            try {
                let decoded = self.$base64Decode(hash.slice(1));
                if (typeof(decoded) === 'object') {
                    self.appmsg = decoded;
                    if(decoded.msgid){
                        self.getmsgid();
                    }else {
                        self.information = JSON.parse(JSON.stringify(self.articles));
                        //赋值zdyid
                        self.information.zdyId = self.creationId();
                        self.articlesList.push(self.information);
                        setTimeout(()=>{
                            self.creatEditor();
                        },100);
                    }
                }
            } catch (error) {}
        }
        this.getUserSortDict();
    }

});
