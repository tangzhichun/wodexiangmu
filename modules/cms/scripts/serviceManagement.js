/* jshint esversion: 6 */
import Vue from '@/scripts/module/vue';
import axios from '@/scripts/module/axios';
import enums from "@/scripts/module/enums";
import empty from '@/components/ui/dsp-empty.vue';
import cropper from '@/components/ui/dsp-cropper.vue';
import phone from '@/components/ui/dsp-phone.vue';

let self = new Vue({
    el: '#app',
    delimiters: ['{[', ']}'],
    components: {
        'empty': empty,
        'dsp-cropper': cropper,
        'dsp-phone': phone,
    },
    data: {
        // 基础图片地址
        fileUrl: DSP.globalConfig.fileBaseUrl,
        meta:{
            categories:[],
        },
        //标签组
        tagGroup: {
            //状态：  0 查看；1编辑；2新增
            status : 0,
            //选中的是那个
            current : null,
            //要修改标签组
            edit:null,
            //要新增标签组
            add:{
                showValid: true,
                stCoverUrlobj: "",
                type: "",
                value: ""
            },
        },
        //标签列表
        tagList: {
            //状态：  0 查看；1编辑；2新增
            status : 0,
            //选中的是那个
            current: null,
            //要修改标签
            edit:null,
            //要新增标签
            add:{
                value:null
            },
        },
        //拥有标签的列表
        article:{
            // 总条数
            totalSize: 0,
            // 每页多少条
            pageSize: 15,
            // 当前页面
            currentPage: 1,
            // 标题
            description:null,
        },

        $validator: {
            rule: {
                addTag: {
                    code: {required: true },
                    value: {required: true },
                    coverImage: {required: true },
                    iconImage: {required: true },
                }
            }
        },
        //新增标签对象
        addTag:{
            imageType:null,
            code:null,
            value:null,
            type:null,
            desc:null,
            coverImage: null,// 标签封面
            iconImage: null,  // 收藏标签图标
            customIcon:null
        },

        //请求出来的数据  标签组 ;标签列表 ;拥有标签的列表
        requestTagGroup:[],
        requesttagList:[],
        requestarticle:[],

        //loading
        loadingS:{
            leftBox:true,
            centerBox:true,
            rightBox:true,

            //保存标签组是否可以点击 todo 新增
            saveTagGroup:true,
            //保存标签组是否可以点击 todo 编辑
            editTagGroup:true,
            //保存标签是否可以点击 todo 新增
            saveTag:true,
            //保存标签是否可以点击 todo 编辑
            editTag:true,

            //查看文章预览掉 文章详情的loading
            lookDesign:false,
            //查看文章预览的对话框
            lookDesignView:false,


        },
        //文章信息用于预览的对象
        information:null,
        //拖动对象 sd源元素；td目标元素 type取值:'标签组group'  '标签tag'
        drag:{},
    },
    methods: {
        //  切换tab
        changeCategories(item){
            this.tagGroup.current = null;
            this.tagList.current = null;
            this.requesttagList = [];
            this.getTagGroup();
        },

        //获取标签组
        getTagGroup: function () {
            this.buildHash();
            this.loadingS.leftBox = false;
            axios.get(`/api/wechat/admin/sign/type/index`).then(res => {
                this.loadingS.leftBox = true;
                this.requestTagGroup = JSON.parse(JSON.stringify(res.data)) || [];
                this.requestTagGroup.map(el => {
                    if(el.showValid === 'true'){
                        el.showValid = true;
                    }
                });
            }).catch(err => {
                this.loadingS.leftBox = true;
            });
        },
        //构建新增标签对象
        addTagObj(){
            this.addTag = {
                imageType:null,
                code:null,
                value:null,
                type:null,
                desc:null,
                coverImage: null,// 标签封面
                iconImage: null,  // 标签图标
                customIcon:null
            };
        },
        //新增  标签 || 标签组
        addTagGroup: function(type){
            if(type === 'tagList'){
                this.addTagObj();
            }
            this[type].edit = null;
            this[type].status = 2;
        },
        //取消新增标签组   清空新增标签组数据
        cancelSaveTagGroup(type){
            this[type].status = 0;
            this[type].add.value = null;
            this[type].add.type = null;
            this[type].add.stCoverUrlobj = null;
            this[type].add.stCoverUrl = null;
            this[type].add.showValid = true;
        },
        //保存标签组  新增
        saveTagGroup(){
            let obj = this.tagGroup.add;
            //判断图片是否为空
            if(!obj.stCoverUrlobj || (obj.stCoverUrlobj && !obj.stCoverUrlobj.imageUrl)){
                this.$message('请上传图片');
                return;
            }
            let regExp =  /^[a-zA-Z_]*$/;
            if(!regExp.test(obj.type)){
                this.$message('只允许英文和_');
                return;
            }
            obj.stCoverUrl= obj.stCoverUrlobj.imageUrl;
            if(!this.loadingS.saveTagGroup){return;}
            this.loadingS.saveTagGroup = false;
            axios({
                method: 'post',
                url:`/api/wechat/admin/sign/type/add`,
                data: obj
            }).then(res => {
                this.loadingS.saveTagGroup = true;
                if(res.success){
                    this.cancelSaveTagGroup('tagGroup');
                    this.getTagGroup();
                }
            }).catch( err =>{
                this.loadingS.saveTagGroup = true;
            });
        },
        //保存标签组  修改
        saveEditTagGroup(){

            let obj = this.tagGroup.edit;
            //判断图片是否为空
            if(!obj.stCoverUrlobj || (obj.stCoverUrlobj && !obj.stCoverUrlobj.imageUrl)){
                this.$message('请上传图片');
                return;
            }
            let regExp =  /^[a-zA-Z_]*$/;
            if(!regExp.test(obj.type)){
                this.$message('只允许英文和_');
                return;
            }
            obj.stCoverUrl= obj.stCoverUrlobj.imageUrl;
            if(!this.loadingS.editTagGroup){return;}
            this.loadingS.editTagGroup = false;
            axios({
                method: 'put',
                url:`/api/wechat/admin/sign/type/${obj.id}/update`,
                data: obj
            }).then(res => {
                this.loadingS.editTagGroup = true;
                if(res.success){
                    this.tagGroup.status = 0;
                    this.tagGroup.edit = null;
                    this.getTagGroup();
                }
            }).catch( err => {
                this.loadingS.editTagGroup = true;
            });
        },

        // +++++++++++ todo 标签 ++++++++++
        //获取标签
        //获取标签列表
        getTagList: function (current,refresh) { //refresh是否为刷新
            this.tagGroup.status = 0 ;
            this.tagGroup.current = current;
            this.tagList.status = 0 ;
            if(refresh !== 'refresh'){
                this.tagList.current = null ;
            }
            this.buildHash();
            let obj ={
                pageStart:1,
                pageSize:100,
                type:current.type
            };
            if(!this.loadingS.centerBox){
                return;
            }
            this.loadingS.centerBox = false;
            axios.get(`/api/wechat/admin/sign/find`, {params: obj}).then(res => {
                console.log(res.data , 123123);
                this.loadingS.centerBox = true;
                this.requesttagList = res.data;
            }).catch(err => {
                this.loadingS.centerBox = true;
            });
        },
        //编辑标签 || 标签组
        editTag(type,item){
            this[type].edit = JSON.parse(JSON.stringify(item));
            if(type === 'tagGroup') {
                this.$set(this[type].edit,'stCoverUrlobj',{imageUrl:item.stCoverUrl});
            }
            this[type].status = 1;
        },
        //保存标签  编辑
        saveTag(){
            let self = this;
            let query = JSON.parse(JSON.stringify(this.tagList.edit));
            delete query.id ;
            if(!this.loadingS.editTag){return;}
            this.loadingS.editTag = false;
            axios.put(`/api/wechat/admin/sign/update/${this.tagList.edit.id}`,query).then(res => {
                this.loadingS.editTag = true;
                if(res.success){
                    //编辑标签对象制成空
                    this.tagList.edit = null;
                    //变成查看状态
                    this.tagList.status = 0;
                    //重新获取标签
                    self.getTagList(self.tagGroup.current );
                }else {
                    self.$message(res.message);
                }
            }).catch( err => {
                this.loadingS.editTag = true;
            });
        },
        //保存标签  新增
        addSaveTag(){
            if(!this.loadingS.saveTag){return;}
            this.addTag.type = this.tagGroup.current.type;
            this.$data.$validator.validateAll().then(pass => {
                if(pass){
                    this.loadingS.saveTag = false;
                    axios.post(`/api/wechat/admin/sign/add`,this.addTag).then(res => {
                        this.loadingS.saveTag = true;
                        if(res){
                            //新增标签对象制成空
                            this.addTagObj();
                            //变成查看状态
                            this.tagList.status = 0;
                            //重新获取标签
                            self.getTagList(self.tagGroup.current );
                        }else {
                            self.$message(res.message);
                        }

                    }).catch(err =>{
                        this.loadingS.saveTag = true;
                    });
                }
            });

        },
        //删除标签 标签组
        delTag(type,item){
            let self =this;
            let url = type === 'tag' ? `/api/wechat/admin/sign/drop/${item.id}` : `/api/wechat/admin/sign/type/delete?id=${item.id}`;
            let title = type === 'tag' ? `${item.value}标签` : `${item.value}标签组`;
            this.$confirm(`此操作将永久删除${title}, 是否继续?`, '提示', {
                closeOnClickModal:false,
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                axios.delete(url).then(res => {
                    if(res.success){
                        if( type === 'tag'){
                            self.getTagList(self.tagGroup.current );
                        }else{
                            self.getTagGroup();
                            self.tagGroup.current= false;
                            self.tagList.current= false;
                        }
                        self.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    }else {
                        self.$message(res.message);
                    }
                });

            }).catch(() => {
                console.log('取消');
            });
        },
        // 图标上传成功后
        handleAvatarSuccess(res, file) {
            var that = this;
            if(res.success){
                if (that.tagList.status === 2) {
                    that.addTag.iconImage = {};
                    that.addTag.iconImage.ext = res.data.fileExt;
                    that.addTag.iconImage.imageMd5 = res.data.md5;
                    that.addTag.iconImage.imageUrl = res.data.relativePath;
                    that.addTag.iconImage.name= res.data.realFileName;
                    that.addTag.iconImage.reduceUrl = res.data.ghostRelativePath;
                    that.addTag.iconImage.size = file.size;
                    console.log(that.addTag);

                } else if (that.tagList.status === 1) {
                    that.tagList.edit.iconUrl = res.data.relativePath;
                    that.tagList.edit.iconImage = {};
                    that.tagList.edit.iconImage.ext = res.data.fileExt;
                    that.tagList.edit.iconImage.imageMd5 = res.data.md5;
                    that.tagList.edit.iconImage.imageUrl = res.data.relativePath;
                    that.tagList.edit.iconImage.name= res.data.realFileName;
                    that.tagList.edit.iconImage.reduceUrl = res.data.ghostRelativePath;
                    that.tagList.edit.iconImage.size = file.size;
                    console.log(that.tagList.edit);
                }

            }
        },
        zdyhandleAvatarSuccess(res, type) {
            var that = this;
            if(res.success){
                if(type === 'tagList.edit'){
                    that.tagList.edit.customIcon = res.data.relativePath;
                }else if(type === 'tagGroup.add'){
                    //新增标签组
                    that.tagGroup.add.stCoverUrlobj = res.data.relativePath;
                }else if(type === 'tagGroup.edit'){
                    //新增修改标签组
                    that.$set(that.tagGroup.edit,'iconImage',res.data.relativePath);
                }else{
                    that[type].customIcon = res.data.relativePath;
                }
                // that.addTag = Object.assign({},that.addTag);
            }
        },
        // 图标上传前
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
            const isLt200kb = file.size / 1024 < 1000;
            if (!isJPG) {
                this.$message.error('上传广告图片只能是 JPG / png格式!');
            }
            if (!isLt200kb) {
                this.$message.error('上传图片大小不能超过 1000kb!');
            }
            return isJPG && isLt200kb;
        },

        // +++++++++++ todo 第三栏 ++++++++++
        //点击每条多少页
        onSizeChange(val) {
            this.article.pageSize = val;
            this.fetchData();
        },
        //点击每条那一页
        onCurrentChange(val) {
            this.article.currentPage = val;
            this.fetchData();
        },
        //点击标签
        getArticle(current){
            this.tagList.current = current;
            self.article.currentPage = 1;
            this.buildHash();
            this.fetchData();
        },
        //查询最右侧
        fetchData(){
            let query = {
                signId:this.tagList.current.id,
                pageStart:this.article.currentPage,
                pageSize:this.article.pageSize,
                title:this.article.description,
            };
            if(!this.loadingS.rightBox){
                return;
            }
            this.loadingS.rightBox = false;
            axios.get(`/api/wechat/admin/binding/find/entities`,{params : query}).then(res => {
                if(res && res.success){
                    this.loadingS.rightBox = true;
                    this.requestarticle = res.data.results || [];
                    this.article.totalSize =res.data.total;
                }else{
                    this.loadingS.rightBox = true;
                    this.requestarticle = [];
                }
            });
        },
        //解绑标签
        unbindTag(e){
            this.$confirm(`此操作将解绑标签, 是否继续?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                axios.delete(`/api/wechat-admin-service/wechat/admin/binding?id=${e.bindingId}`).then(res => {
                    if(res.success){
                        this.fetchData();
                        self.$message({
                            type: 'success',
                            message: '解绑成功!'
                        });
                    }else {
                        self.$message(res.message);
                    }
                });

            }).catch(() => {
                console.log('取消');
            });
        },
        //构建hash
        buildHash(){
            let self = this;
            let hashObj = {
                tagGroup:self.tagGroup,
                tagList:self.tagList,
                article:self.article
            };
            window.location.hash = self.$base64Encode(hashObj);
        },
        imageClick(type) {
            // todo 修改icon或cover时要在以前的基础上+1 ？？？？
            let icon = type === 'iconImage' ? 'icon' : 'cover';
            this.tagList.edit[icon] = this.tagList.edit[icon] + '1';
        },

        //++++++++++  todo 弹出层 ++++++++++
        //预览获取文章详情
        lookDesign(data){
            let self = this;
            let e = data.realmId;
            self.loadingS.lookDesign = true;
            axios.get(`/api/wechat-admin-service/wechat/admin/design/detail?id=${e}`).then(res =>{
                self.loadingS.lookDesign = false;
                if(res.success){
                    self.information = JSON.parse(JSON.stringify(res.data));
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
                        this.$set(this.information,'signs', self.information.bindingSignResultEntities);
                    }
                    self.loadingS.lookDesignView = true;
                }
            }).catch(err => {
                self.loadingS.lookDesign = false;
            });
        },

        //开关标签组
        switchTagGroup(e){
            console.log(e);
            let ms = e.showValid ? `此操作将打开${e.value}标签组,是否继续？` : `此操作将隐藏${e.value}标签组，是否继续？`;
            this.$confirm(ms, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                axios.put(`/api/wechat/admin/sign/type/${e.id}/on/off?showValid=${e.showValid}`).then(res => {
                    if(res.code !== '000'){
                        this.$message('你的网络不稳定，请稍后重试');
                        e.showValid = !e.showValid;
                    }
                }).catch(err => {
                    this.$message('你的网络不稳定，请稍后重试');
                    e.showValid = !e.showValid;
                });
            }).catch(err => {
                e.showValid = !e.showValid;
            });
        },

        //    开始拖动  item拖动的元素  type取值:'标签组group'  '标签tag'
        dragstart(item,type){
            this.$set(this.drag,'type',type);
            this.$set(this.drag,'sd',item);
        },
        dragenter(item,type){
            if(this.drag && this.drag.type && type === this.drag.type){
                this.$set(this.drag,'td',item);
            }
        },
        dragend(){
            let url = '';
            if(this.drag && this.drag.td && this.drag.sd && this.drag.type ==='group'){
                url = `/api/wechat/admin/sign/type/${this.drag.sd.id}/exchange/${this.drag.td.id}/sort`;
                if(!self.loadingS.saveTagGroup ){
                    return;
                }else if(this.drag.sd.id === this.drag.td.id){
                    self.drag = {};
                    return;
                }
                self.loadingS.saveTagGroup = false;
            }else if(this.drag && this.drag.td && this.drag.sd && this.drag.type ==='tag'){
                url =`/api/wechat/admin/sign/${this.drag.sd.id}/change/${this.drag.td.id}/sort`;
                if(!self.loadingS.centerBox ){
                    return;
                }else if(this.drag.sd.id === this.drag.td.id){
                    self.drag = {};
                    return;
                }
                self.loadingS.centerBox = false;
            }
            if(url){
                axios.put(url).then(res=> {
                    self.loadingS.saveTagGroup = true;
                    self.loadingS.centerBox = true;
                    if(res.code === '000' && this.drag.type ==='group'){
                        self.getTagGroup();
                    }else if(res.code === '000' && this.drag.type ==='tag'){
                        self.getTagList(self.tagGroup.current );
                    }
                    self.drag = {};
                }).catch(err =>{
                    self.drag = {};
                    self.loadingS.saveTagGroup = true;
                    self.loadingS.centerBox = true;
                });
            }
        }
    },
    created: function () {
        let self = this;

        //根据浏览器地址栏的路由参数，初始化查询条件
        let hash = window.location.hash;
        if (hash != '') {
            try {
                let decoded = self.$base64Decode(hash.slice(1));
                if (typeof(decoded) == 'object') {
                    this.tagGroup = decoded.tagGroup;
                    this.tagList = decoded.tagList;
                    this.article = decoded.article;
                }
            } catch (error) {}
        }
        //获取标签组
        this.getTagGroup();
        //获取标签
        if(this.tagGroup && this.tagGroup.current){
            this.getTagList(this.tagGroup.current,'refresh');
        }
        //获取标签
        if(this.tagList && this.tagList.current){
            this.fetchData();
        }
    },
});
