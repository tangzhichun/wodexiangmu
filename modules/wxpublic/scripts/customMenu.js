/* jshint esversion: 6 */
import Vue from '@/scripts/module/vue';
import axios from '@/scripts/module/axios';
import enums from '@/scripts/module/enums';

let self = new Vue({
    el:'#app',
    delimiters: ['{[',']}'],
    data:{
        gzh:null,
        views:{
            save:false,
            getMenu:false,
            hufu:false
        },
        customMenuLi:[],
        $validator: {
            rule: {
                information: {
                    name: {required: true },
                    type: {required: true },
                    newsType: {required: true },
                    text: {required: true },
                    mediaSourseUrl: {required: true },
                    appid: {required: true },
                    pagepath: {required: true ,},
                    url: {required: true,
                            customize: function ($data, value) {
                                let pass = false;
                                if (value && value.substring(0,8)=== 'https://' || value.substring(0,7)=== 'http://') {
                                    pass = true;
                                }
                                //返回false，表示验证未通过；返回true，表示验证通过。
                                return Promise.resolve(pass);
                            }
                    },
                    x_url: {required: true , customize: function ($data, value) {
                            let pass = false;
                            if (value && value.substring(0,8)=== 'https://' || value.substring(0,7)=== 'http://') {
                                pass = true;
                            }
                            //返回false，表示验证未通过；返回true，表示验证通过。
                            return Promise.resolve(pass);
                        }},
                }
            }
        },
        //主菜单
        currMenu:null,
        //当前子菜单
        currSub_button:null,

        information:null,
        obj:{
            name:'菜单名称',
            type:'miniprogram', //菜单内容   click发送消息    view跳转网页    miniprogram跳转小程序
            newsType:'text',    //当是click发送消息有值   text || image
            mediaSourseUrl:'',
            text:'',
            url:'',          //view跳转网页
            x_url:'',          //view跳转网页
            appid:'',
            pagepath:''
        },
        //主菜单
        upAndDownShift:{
            sortData:null,
            sortI:null,
            targetData:null,
            targetI:null,
        },
        //子菜单
        upAndDown:{
            sD:null,
            sI:null,
            tD:null,
            tI:null
        }
    },
    methods: {
        change(e){
            this.gzh = e;
            window.location.hash = this.$base64Encode(e);
            this.getMenu();

        },
        //新增的li
        addLi(item){
            let idStr = Date.now().toString(36);
            idStr += Math.random().toString(36).substr(3);
                let obj = JSON.parse(JSON.stringify(this.obj));
                obj.zdyId=idStr;
                obj.sub_button=[];
                obj.gzhId = this.gzh.appid;
                this.customMenuLi.push(obj);
        },
        //修改主菜单
        editMenu(item){
            this.currMenu = item;
            this.currSub_button = null;
            this.information = item;
            let self =this;
            setTimeout(()=>{
                self.$data.$validator.reset();
            },100);
        },
        //增加子菜单
        addSub(item){
            let idStr = Date.now().toString(36);
            idStr += Math.random().toString(36).substr(3);
            let obj = JSON.parse(JSON.stringify(this.obj));
            obj.zdyId=idStr;
            obj.name='子菜单名称';
            obj.parentzdyId=item.zdyId;
            if(item.sub_button.length < 1){
                this.$confirm('添加子菜单后，一级菜单的内容将被清除。确定添加子菜单？', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let obj1 = JSON.parse(JSON.stringify(item));
                    let objs = Object.assign(item,this.obj);
                    item.sub_button.push(obj);
                    objs.name = obj1.name;
                    objs.newsType = '';
                    objs.type='';
                    item = objs;
                });
            }else {
                item.sub_button.push(obj);
            }
        },
        //修改子菜单
        editSub(item){
            this.currSub_button = item;
            this.information = item;
        },
        //修改
        changeType(e){
            this.information.newsType = '';
            this.information.mediaSourseUrl = '';
            this.information.text = '';
            this.information.url='';
            this.information.appid='';
            this.information.pagepath='';
            this.information.x_url='';
            if(e==='click'){
                 this.information.newsType='text';
            }
            let self =this;
            setTimeout(()=>{
                self.$data.$validator.reset();
            },100);

        },
        changeNewsType(e){
            if(e === 'text'){
                this.information.mediaSourseUrl = '';
            }else {
                this.information.text = '';
            }
            let self =this;
            setTimeout(()=>{
                self.$data.$validator.reset();
            },100);

        },
        getMenu(){
            if(this.views.getMenu ){return;}
            this.views.getMenu = true;
            let obj ={
                gzhId:this.gzh && this.gzh.appid
            };
            // /api/wechat-service/wechat/more/findMenus
            axios.get('/api/wechat-service/wechat/more/findMenus',{params:obj}).then(res => {
                this.views.getMenu = false;
                if(res.data && res.data.button){
                    this.customMenuLi = res.data.button;
                    this.customMenuLi.map(el => {
                        if(!el.zdyId){
                            el.zdyId = el.id;
                        }
                        if(el.sub_button && el.sub_button.length >0){
                            el.sub_button.map(sub => {
                                if(!sub.zdyId){
                                    sub.zdyId = sub.id;
                                    sub.parentzdyId = el.id;
                                }
                            });
                        }
                    });
                }else{
                    this.customMenuLi = [];
                }
            }).catch(err =>{
                this.views.getMenu = false;
            });
        },
        // 上传成功
        handleAvatarSuccess(res, file) {
            var that = this;
            if(res.success){
                that.information.mediaSourseUrl = res.data.relativePath;
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

        //删除菜单
        delMenu(item){
            this.$confirm(`删除后“${item.name}”菜单下设置的内容将被删除`, {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                if(item.parentzdyId){
                    //删除子菜单
                    //拿到他的上级
                    let parent = this.customMenuLi.find(el => {return el.zdyId === item.parentzdyId;});
                    //  该子菜单在他父级的位置
                    let indx = parent.sub_button.findIndex(el => {return item.zdyId === el.zdyId;});
                    parent.sub_button.splice(indx,1);
                }else {
                    // 删除菜单
                    let indx = this.customMenuLi.findIndex(el => {return item.zdyId === el.zdyId;});
                    this.customMenuLi.splice(indx,1);
                }
                this.information = null;

            });

        },

        save(){
            let self = this;
            let flag = true;
            for(let k = 0; k<this.customMenuLi.length; k++) {
                if(this.ifNull(this.customMenuLi[k])){
                    this.information = this.customMenuLi[k];
                    this.currMenu = this.customMenuLi[k];
                    flag = false;
                    break;
                }
                if(this.customMenuLi[k].sub_button && this.customMenuLi[k].sub_button.length > 0){
                    let arr = this.customMenuLi[k].sub_button;
                    let a = true;
                    for(let j = 0; j<arr.length; j++) {
                        if(this.ifNull(arr[j])){
                            this.information = arr[j];
                            this.currSub_button = arr[j];
                            this.currMenu = this.customMenuLi[k];
                            a = false;
                            flag = false;
                            break;
                        }
                    }
                    if(!a){
                        flag = false;
                        break;
                    }
                }
            }
            setTimeout(() => {
                self.$data.$validator.validateAll().then(pass => {
                    if (pass) {
                        let obj = {
                            button:this.customMenuLi,
                            gzhId:self.gzh.appid
                        };
                        if(self.views.save){return;}
                        self.views.save = true;
                        axios.post('/api/wechat-service/wechat/more/createMenu',obj).then(res => {
                            if(res.code === '000'){
                                self.$message.success('保存成功');
                            }
                            self.views.save = false;
                            setTimeout(() => {
                                self.views.save = false;
                            },1000);
                        }).catch(err=> {
                            window.location.reload();
                            self.views.save = false;
                        });
                    }
                });
            },100);

        },
        ifNull(item){
            //主菜单并且有子菜单
            if(item.sub_button && item.sub_button.length > 0){
                if(!item.name){
                    return item;
                }
            }else {
                //子菜单
                if(!item.name){
                    return item;
                }
                // click发送消息    view跳转网页    miniprogram跳转小程序
                if(item.type === 'click'){
                    if(item.newsType === 'text' && !item.text){
                        return item;
                    }else if(item.newsType === 'image' && !item.mediaSourseUrl){
                        return item;
                    }
                }else if (item.type === 'view' && !item.url){
                    return item;
                }else if (item.type === 'miniprogram' ){
                    if(!item.appid || !item.pagepath || !item.x_url){
                        return item;
                    }
                }
            }
        },

        //拖zhu
        dragstart(ele,item,indx){
            this.upAndDownShift.sortData = JSON.parse(JSON.stringify(item));
            this.upAndDownShift.sortI = indx;
        },
        //放zhu
        dragend(ele,item){
            if(this.upAndDownShift.targetData && this.upAndDownShift.sortData && this.upAndDownShift.sortI !== this.upAndDownShift.targetI){
                let sI = this.upAndDownShift.sortI;
                let so = this.upAndDownShift.sortData;
                let to = this.upAndDownShift.targetData;
                let tI = this.upAndDownShift.targetI;
                this.customMenuLi[sI] = to;
                this.customMenuLi[tI] = so;
                this.customMenuLi = Object.assign([],this.customMenuLi);
                this.upAndDownShift={sortData:null, sortI:null, targetData:null, targetI:null};
            }else {
                this.upAndDownShift={sortData:null, sortI:null, targetData:null, targetI:null};
            }
        },
        //移动到item主
        dragenter(ele,item,i){
            if(this.upAndDownShift && this.upAndDownShift.sortData){
                this.upAndDownShift.targetData = JSON.parse(JSON.stringify(item));
                this.upAndDownShift.targetI = i;
            }
        },

        //拖zhu
        dragstartSub(ele,indx,arr){
            this.upAndDown.sD = ele;
            this.upAndDown.sI = indx;
        },
        //放zhu
        dragendSub(ele,item,fI){
            let sI = this.upAndDown.sI;
            let sD = this.upAndDown.sD;
            let tD = this.upAndDown.tD;
            let tI = this.upAndDown.tI;
            let arr = this.customMenuLi[fI] && this.customMenuLi[fI].sub_button;
            if(sD  && tD  && arr && tI !== sI ){
                arr[sI] = tD;
                arr[tI] = sD;
                this.customMenuLi[fI].sub_button= Object.assign([],arr);
                this.upAndDown = {sD:null, sI:null, tD:null, tI:null};
            }else {
                this.upAndDown = {sD:null, sI:null, tD:null, tI:null};
            }
        },
        //移动到item主
        dragenterSub(item,i,arr){
            this.upAndDown.tD = item;
            this.upAndDown.tI = i;
        },
        hufu(){
            if(this.views.hufu ){return;}
            this.views.hufu = true;
            axios.get(`/api/wechat-service/wechat/more/recoveryMenu?gzhId=${this.gzh.appid}`).then(res => {
                this.views.hufu = false;
                if(res.code === '000'){
                    this.getMenu();
                }
            }).catch(err => {
                this.views.hufu = false;
            });
        },
        delUp(){
            let self = this;
            this.$confirm('此操作将删除线上菜单, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                if(self.views.delUp ){return;}
                self.views.delUp = true;
                axios.delete(`/api/wechat-service/wechat/more/deleteMenu?gzhId=${self.gzh.appid}`).then(res => {
                    self.views.delUp = false;
                    if(res.code === '000'){
                        self.getMenu();
                    }
                }).catch(err => {
                    self.views.delUp = false;
                });
            });

        }
    },
    created() {
        let self = this;
        let hash = window.location.hash;
        if (hash !== '') {
            try {
                let decoded = self.$base64Decode(hash.slice(1));
                if (typeof(decoded) == 'object') {
                    this.gzh = decoded;
                }
            } catch (error) {}
        }
        if(!self.gzh){
            self.gzh = DSP.gzh[0];
        }
        this.getMenu();
    }
});
