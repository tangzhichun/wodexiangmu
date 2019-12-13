/* jshint esversion: 6 */
import Vue from '@/scripts/module/vue';
import axios from '@/scripts/module/axios';
import cropper from '@/components/ui/dsp-cropper.vue';

let self = new Vue({
    el: '#app',
    delimiters: ['{[', ']}'],
    components: {
        'dsp-cropper': cropper
    },
    data: {
        // 校验规则
        $validator: {
            rule: {
                information: {
                    templateNo:{
                        required: true,
                        //返回Promise对象
                        remote: function ($data, value) {
                            let pass ={
                                id:self.information && self.information.id || null,
                                templateNo : value
                            };
                            return axios.get(`/api/wechat/admin/share/template/check/template/no`,{params:pass}).then(response => {
                                //返回false，表示验证未通过；返回true，表示验证通过。
                                return response && response.success && !response.data;
                            });
                        }
                    },
                    backgroundImage: {required: true},
                }
            }
        },

        // src图片路径 w宽度 h高度 x左坐标  y坐标 text文字 f是否显示 d默认的图片
        informationOne:[
            {
                l:'分享文章配图',
                f:'articleImageValid',
                w:'articleImageWidth',
                h:'articleImageHigh',
                x:'articleImageX',
                y:'articleImageY',
                src:'backgroundImage',
                d: 'http://ftp.sfygroup.shop/upload/wechat/20190618/20190618103450670_e90db12c0a0f45d0b476048a059172da.png',
                type:'img'
            },
            {
                l:'分享文章标题',
                f:'articleTitleValid',
                // w:'articleTitleWidth',
                // h:'articleTitleHigh',
                x:'articleTitleX',
                y:'articleTitleY',
                s:'articleTitleSize',
                type:'div'
            },
            {
                l:'分享人头像',
                f:'avatarUrlValid',
                w:'avatarUrlWidth',
                h:'avatarUrlWidth',
                x:'avatarUrlX',
                y:'avatarUrlY',
                d: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=436058079,3311955223&fm=26&gp=0.jpg',
                type:'img'
            },
            {
                l:'分享人昵称',
                f:'nickNameValid',
                // w:'nickNameWidth',
                // h:'nickNameHigh',
                x:'nickNameX',
                y:'nickNameY',
                s:'nickNameSize',
                type:'div'
            },
            {
                l:'前景图1',
                f:'foreground1Valid',
                w:'foreground1Width',
                h:'foreground1High',
                src:'foreground1',
                x:'foreground1X',
                y:'foreground1Y',
                type:'img'
            },
            {
                l:'前景图2',
                f:'foreground2Valid',
                src:'foreground2',
                w:'foreground2Width',
                h:'foreground2High',
                x:'foreground2X',
                y:'foreground2Y',
                type:'img'
            },
            {
                w:'appletCodeWidth',
                h:'appletCodeWidth',
                x:'appletCodeX',
                y:'appletCodeY',
                d:'/images/qrcode.jpeg',
                type:'img'
            },
        ],
        //templateType      one 单图   more多图
        //   用以显示的其他参数
        qt:{
            // 单图模版的样式
            'templateMobile':'',

            wechatImage:'',
            imageUrl:'',
        },
        information: {
            templateNo:null,            //海报编号
            backgroundImage:null,       //背景图
            posterWidth:1800,           //海报宽
            posterHigh:1800,            //海报高
            //分享文章配图    也就是文章的海报配图
            articleImageValid:true,
            articleImageWidth:1800,          //分享文章配图宽
            articleImageHigh:1800,           //分享文章配图高
            articleImageX:0,         //分享文章配图X
            articleImageY:0,         //分享文章配图Y
            //文章标题
            articleTitle:null,
            articleTitleValid: false,   //文章标题是否显示
            // articleTitleWidth:null,     //文章尺寸
            articleTitleSize:35,
            articleTitleX: 0,
            articleTitleY: 0,
            //分享人头像
            avatarUrl:null,
            avatarUrlValid:false,       //分享人头像是否显示
            avatarUrlWidth:50,       //分享人头像尺寸
            avatarUrlX:100,           //分享人头像位置
            avatarUrlY:400,           //分享人头像位置
            //分享人昵称
            nickNameValid:false,
            nickNameX:0,
            nickNameY:0,
            // nickNameWidth:null,
            // nickNameHigh:null,
            nickNameSize:28,
            //前景图1
            foreground1:null,
            foreground1Valid:false,
            foreground1Width:100,
            foreground1High:100,
            foreground1X:0,
            foreground1Y:0,
            //前景图2
            foreground2:null,
            foreground2Valid:false,
            foreground2Width:100,
            foreground2High:100,
            foreground2X:0,
            foreground2Y:0,
            //小程序码
            appletCode:'小程序码',
            appletCodeType:'APPLET',
            appletCodeWidth:600,
            appletCodeX:600,
            appletCodeY:600,
            templateType:'more',
            posterNum:9
        },
        imgUrl:null,
        loading:{
            save:false,

            clickpreview:false,
            viewPreview:false,
        },
        previewImg:null

    },
    methods: {
        move(e) {
            let odiv = e.target;
            let x = e.target.getAttribute('data-x');
            let y = e.target.getAttribute('data-y');
            let scale = 1;
            if(self.information.posterWidth > 420){
                scale =  420/self.information.posterWidth;
            }
            //算出鼠标相对元素的位置
            let disX = e.clientX/scale - odiv.offsetLeft;
            let disY = e.clientY/scale - odiv.offsetTop;

            //元素的宽高
            let odivW = e.target.offsetWidth;
            let odivH = e.target.offsetHeight;


            let fuW = self.information.posterWidth || 420;
            let fuH = self.information.posterHigh || 746;
            document.onmousemove = (e) => {    //鼠标按下并移动的事件
                //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
                let left = e.clientX/scale - disX > fuW - odivW ? fuW - odivW : e.clientX/scale - disX < 0 ? 0 : e.clientX/scale - disX;
                let top = e.clientY/scale - disY > fuH - odivH ? fuH - odivH : e.clientY/scale - disY < 0 ? 0 : e.clientY/scale - disY;

                left = parseInt(left);
                top = parseInt(top);
                //绑定元素位置到positionX和positionY上面
                this.information[x]= left;
                this.information[y]= top;

                //移动当前元素
                odiv.style.left = left + 'px';
                odiv.style.top = top + 'px';
            };
            document.onmouseup = (e) => {
                document.onmousemove = null;
                document.onmouseup = null;
            };
        },
        beforeUpload(file) {
            console.log(file);
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
        //上传失败后
        uploadFailed(response, file, fileList) {
            this.$message.error(`文件上传失败，请稍后重试`);
        },
        uploadSucceed(response, file, fileList) {
            this.$message.success(`文件上传成功`);
            this.information[this.imgUrl] = response && response.data && response.data.relativePath;
            if(this.imgUrl==='backgroundImage'){
                setTimeout(()=>{
                    let fu = document.getElementsByClassName('template-mobile')[0];
                    self.information.posterWidth = fu.offsetWidth;
                    self.information.posterHigh = fu.offsetHeight;
                    if(fu.offsetWidth > 420){
                        self.qt.templateMobile = `transform-origin: 0px 0px;transform:scale(${420/fu.offsetWidth})`;
                    }
                },100);
            }else {
                let a = '[data-w="'+this.imgUrl+'Width"]';
                setTimeout(()=>{
                    let ele=document.querySelector(a);
                    self.information[self.imgUrl+'Width'] = ele.naturalWidth;
                    self.information[self.imgUrl+'High'] = ele.naturalHeight;
                },100);
            }
        },


        addSave(){
            let self = this;
            if(this.information.id && DSP.type === 'edit'){
                this.editSave();
                return;
            }
            this.$data.$validator.validateAll().then(pass => {
                if (pass) {
                    console.log(this.information);
                    delete self.information.id;
                    delete self.information.timeCreated;
                    delete self.information.timeUpdated;
                    self.loading.save = true;
                    if(!this.information.previewImage){
                        this.information.previewImage={
                            avatarUrl: "string",
                            nickName: "string",
                            realmNo: "string",
                            userNo: "string"
                        };
                    }
                    let obj = JSON.parse(JSON.stringify(this.information));
                    if( obj.appletCodeType !== 'WECHAT_SERVICE_ACCOUNT'){
                        delete obj.appId;
                    }
                    axios.post('/api/wechat/admin/share/template/add',obj).then(res=> {
                        if(res.code==='000'){
                            this.$message.success('保存成功');
                            window.location = '/cms/template#eyJ0b3RhbFNpemUiOjAsInBhZ2VTaXplIjoxNTAsImN1cnJlbnRQYWdlIjoxLCJ0ZW1wbGF0ZVR5cGUiOiJtb3JlIn0=';
                        }else {
                            self.loading.save = false;
                            this.$message.error(res.message);
                        }
                    }).catch(err => {
                        self.loading.save = false;
                    });
                }
            });
        },
        editSave(){
            let self = this;
            this.$data.$validator.validateAll().then(pass => {
                if (pass) {
                    delete self.information.timeCreated;
                    delete self.information.timeUpdated;
                    let obj = JSON.parse(JSON.stringify(this.information));
                    if( obj.appletCodeType !== 'WECHAT_SERVICE_ACCOUNT'){
                        delete obj.appId;
                    }
                    self.loading.save = true;
                    axios.put(`/api/wechat/admin/share/template/${self.information.id}`,obj).then(res=> {
                        if(res.code==='000'){
                            this.$message.success('保存成功');
                            window.location = '/cms/template#eyJ0b3RhbFNpemUiOjAsInBhZ2VTaXplIjoxNTAsImN1cnJlbnRQYWdlIjoxLCJ0ZW1wbGF0ZVR5cGUiOiJtb3JlIn0=';
                        }else {
                            self.loading.save = false;
                            this.$message.error(res.message);
                        }
                    });
                }
            });
        },
        changePosterNum(){
            if(this.information.posterNum !== 4){
                this.information.posterHigh = 200 *  this.information.posterNum;
                this.information.articleImageHigh = 200 *  this.information.posterNum;
            }else {
                this.information.posterHigh = 1800;
                this.information.articleImageHigh = 1800;
            }

            this.information.backgroundImage = null;
        },

        //等比例w
        wh(e,querySelector){
            let a = '[data-w="'+querySelector+'Width"]';
            let ele=document.querySelector(a);

            if(ele && !(querySelector==='articleImage' && DSP.type === 'add')){
                let bi = ele.naturalWidth /ele.naturalHeight;
                if(e.indexOf('Width') > -1){
                    self.information[querySelector+'High'] = parseInt(self.information[querySelector+'Width'] / bi);
                }else {
                    self.information[querySelector+'Width'] = parseInt(self.information[querySelector+'High'] * bi);
                }
            }
        },
        //生成预览图
        clickpreview(e){
            this.loading.clickpreview=true;
            let query={
                avatarUrl: "string",
                nickName: "string",
                realmNo: "string",
                userNo: "string"
            };
            axios.post(`/api/wechat/admin/share/template/generate/preview/image/${self.information.id}`,query).then(res=> {
                this.loading.clickpreview=false;
                if(res.code==='000'){
                    this.loading.viewPreview = true;
                    this.previewImg = res.data.path;
                }
            }).catch(err => {
                this.loading.clickpreview=false;
            });
        },
        changeAppletCodeType(e){
                //APPLET            小程序码    /images/qrcode.jpeg
                //WECHAT_SERVICE_ACCOUNT              公众号码    /images/cms_qrcode.png
                //POSTER_QRCODE     海报二维码   /images/qrcodewithlogo.jpg
            switch( this.information.appletCodeType){
                    case 'APPLET':
                        this.informationOne[6].d = '/images/qrcode.jpeg';
                    break;
                    case 'WECHAT_SERVICE_ACCOUNT':
                        this.informationOne[6].d = '/images/cms_qrcode.png';
                        this.$set(this.information,'appId',DSP.gzh[0].appid);
                    break;
                    case 'POSTER_QRCODE':
                        this.informationOne[6].d = '/images/qrcodewithlogo.jpg';
                    break;
                }
        }
    },
    created(){
        this.$set(this.information,'templateType', DSP.templateType);
        if(DSP.template){
            this.information = DSP.template;
            this.changeAppletCodeType();
        }
        if(!this.information.appletCodeType){
            this.$set(this.information,'appletCodeType', 'APPLET');
        }
        this.qt.templateMobile = `transform-origin: 0px 0px;transform:scale(${420/1800 })`;
        if(this.information.posterNum !== 4){
            this.information.posterHigh = 200 *  this.information.posterNum;
            this.information.articleImageHigh = 200 *  this.information.posterNum;
        }else {
            this.information.posterHigh = 1800;
            this.information.articleImageHigh = 1800;
        }
        if(DSP.type === 'add'){
            delete this.information.id;
        }
    }
});
