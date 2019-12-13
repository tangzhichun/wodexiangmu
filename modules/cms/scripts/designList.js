/* jshint esversion: 6 */
import  Vue from '@/scripts/module/vue';
import axios from '@/scripts/module/axios';
import enums from "@/scripts/module/enums";
import phone from "@/components/ui/dsp-phone.vue";
import empty from "@/components/ui/dsp-empty.vue";
let QRCode = require('qrcode');


let wxList = new Vue({
    el: '#app',
    delimiters: ['{[', ']}'],
    components: { empty,
        'dsp-phone': phone
    },
    data: {
        canvas:{
            canvasSize:null,
            model:null,
            query:{
                list:null,
                value:'',
                wx:'DESIGN'
            }
        },
        meta:{
            categories:enums.categories,
            FWHX: enums.FWHX,
            cmsColumn: enums.dict('CMS_COLUMN'),
            tagListREFORM:[],
            tagListDESIGN:[],
            resTagListDESIGN:[],
            resTagListREFORM:[]
        },
        //左侧数据
        leftData:{
            //打开了什么栏目
            columnDate:{
                DESIGN: true,
                REFORM: true
            },
            //具体选中了那个
            column:null,
        },
        //专题查询
        query:{
            // 总条数
            totalSize: 0,
            // 每页多少条
            pageSize: 15,
            // 当前页面
            currentPage: 1,
            // 标题
            designTitle:null,
            //标签
            signIdsDESIGN:null,
            noSignIdsDESIGN:null,
            signIdsREFORM:null,
            noSignIdsREFORM:null
        },
        //loading || view
        loading:{
            //是否加载中
            tableData:false,
            //专题管理
            dialog:false,
            //保存新增专题
            savaAddTopicLoading:false,
            qRCode:false,
            //设置
            set:false,
            // 远程搜索用户
            canvasQueryList:false,
            //添加专题框
            addSpecialBox:false,
            addSpecialLoading:false,

            lookDesignView:false

        },
        //点赞数 || 转发数 || 查看数 || 排序 （方案的其他设置）
        setDesign:{
            view:false,     //显示框隐藏显示
            curr:null,      //更改那个设置
        },
        //方案列表
        tableData:null,
        //专题列表
        topicList:null,
        //专题状态  0 初始 1添加  2编辑
        topicType:0,
        //新增专题对象
        addTopicObj:null,
        //编辑专题
        editTopicObj:null,

        //当前要添加到专题到设计方案数据
        currDesign:null,
        //专题列表
        specialList:[],
        information:null,
        currSpecial:''

    },
    methods: {
        //控制表格每一行颜色
        tableRowClassName({row, rowIndex}) {
            if (!row.valid) {
                return 'validNo';
            }
            return '';
        },
        //排序
        indexMethod(index) {
            let i = this.query.pageSize * (this.query.currentPage - 1) + 1;
            return i + index;
        },
        //开关栏目
        switchColumn(item){
            if (this.leftData.columnDate[item]){
                this.$set(this.leftData.columnDate, item ,false);
            }else {
                this.$set(this.leftData.columnDate, item ,true);
            }
            this.buildHash();
        },
        //点击那个具体栏目
        columnActive(item){
            this.leftData.column = {};
            if(item.children){
                this.leftData.column.parent = item.value;
                return;
            }else {

            }
            this.leftData.column =Object.assign(this.leftData.column,item) ;
            this.query.currentPage=1;
            console.log(this.leftData.column.value);
            this.fetchData();
        },
        //点击每条多少页
        onSizeChange(val) {
            this.query.pageSize = val;
            this.fetchData();
        },
        //点击每条那一页
        onCurrentChange(val) {
            this.query.currentPage = val;
            this.fetchData();
        },
        //查询设计
        fetchData: function () {
                    let self = this;
                    let url = `/api/wechat-admin-service/wechat/admin/design/page/size?page=${self.query.currentPage}&size=${self.query.pageSize}`;
                    let params = {
                        category:self.leftData.column.father,
                        kind:self.leftData.column.value,
                    };
                    //判断是标题还是编码
                    let type = self.query.designTitle && self.query.designTitle.substring(1) && self.query.designTitle.substring(1) *1;
                    if(isNaN(type)){
                        params.designTitle = self.query.designTitle;
                    }else{
                        params.designNo = self.query.designTitle;
                    }
                    if( self.query['signIds'+params.category] && self.query['signIds'+params.category].length > 0){
                        params.signIds = self.query['signIds'+params.category][1] || self.query['signIds'+params.category][0];
                    }
                     // 无标签查询
                    if( self.query['noSignIds'+params.category] && self.query['noSignIds'+params.category].length > 0){
                        params.signIdsExcluding = self.query['noSignIds'+params.category][1] || self.query['noSignIds'+params.category][0];
                    }
                     if(self.loading.tableData){return;}
                     this.buildHash();
                     self.loading.tableData = true;
                    axios.get(url, {params: params}).then((response) => {
                        self.loading.tableData = false;
                        if (response && response.success) {
                            if (response.data && response.data.results) {
                                self.tableData = response.data.results;
                                self.query.totalSize = response.data.totalSize;
                            } else {
                                self.tableData = [];
                                self.query.totalSize = 0;
                            }
                        }
                    }).catch(error => {
                        self.loading.tableData = false;
                    });
                },
        //查询标签
        getTag(){
            // let obj ={
            //     pageStart:1,
            //     pageSize:100
            // };
            // let tagDESIGNArr =JSON.parse(JSON.stringify(DSP.tagTypeDESIGN));
            // let tagREFORMArr =JSON.parse(JSON.stringify(DSP.tagTypeREFORM));
            // axios.get(`/api/wechat/admin/sign/find/DESIGN`, {params: obj}).then(res => {
            //     let tags = [];
            //     tagDESIGNArr.map((ele) => {
            //         ele.label = ele.value;
            //         ele.value = ele.type;
            //         ele.children = [];
            //         res.data.map(el => {
            //             if (el.type === ele.type) {
            //                 el.label = el.value;
            //                 el.value = el.id;
            //                 ele.children.push(el);
            //             }
            //         });
            //         if( ele.children.length > 0){
            //             tags.push(ele);
            //         }
            //     });
            //     this.meta.tagListDESIGN = JSON.parse(JSON.stringify(tags));
            //     this.meta.resTagListDESIGN = tags;
            //     this.meta.tagListDESIGN.unshift({value:'NOSIGN',label:'无标签'});
            // }).catch(err => {
            //     // this.loadingS.centerBox = true;
            // });
            //
            // axios.get(`/api/wechat/admin/sign/find/REFORM`, {params: obj}).then(res => {
            //     let tags = [];
            //     tagREFORMArr.map((ele) => {
            //         ele.label = ele.value;
            //         ele.value = ele.type;
            //         ele.children = [];
            //         res.data.map(el => {
            //             if (el.type === ele.type) {
            //                 el.label = el.value;
            //                 el.value = el.id;
            //                 ele.children.push(el);
            //             }
            //         });
            //         if( ele.children.length > 0){
            //             tags.push(ele);
            //         }
            //     });
            //     this.meta.tagListREFORM = JSON.parse(JSON.stringify(tags));
            //     this.meta.resTagListREFORM = tags;
            //     this.meta.tagListREFORM.unshift({value:'NOSIGN',label:'无标签'});
            // }).catch(err => {
            //
            // });
        },
        //构建hash
        buildHash(){
            let self = this;
            let hashObj = {
                leftData:self.leftData,
                query:self.query
            };
            window.location.hash = self.$base64Encode(hashObj);
        },
        // 查看备案
        look(e){
            window.location = `/wechat/edit/${e}`;
        },
        //ty ? 禁止访问 : 允许访问
        del(e,ty){
            let url = ty ? `/api/wechat/admin/design?id=${e}` : `/api/wechat/admin/design/act/multi?ids=${e}`;
            this.$confirm(`此操作将${ty ? '无法访问' : '允许访问'}到该文章,是否继续?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                axios({
                        method: ty ? 'delete':'put',
                        url
                }).then((response) => {
                    if(response.success){
                        wxList.$message({
                            type: 'success',
                            message: ty ? '以禁止访问' : '以允许访问'
                        });
                        wxList.fetchData();
                    }else {
                        wxList.$message(response.message);
                    }
                }).catch(error => {
                    console.info('无效');
                });
            });
        },
        //打开其他设置点赞 还是收藏 还是查看
        changeNumber(el){
            this.setDesign.curr = JSON.parse(JSON.stringify(el));
            this.setDesign.view = true;
        },
        //保存更改点赞  收藏  查看
        saveSetDesign(){
            let arr = [
                {label:'查看',value:'viewNum'},
                {label:'收藏',value:'collectNum'},
                {label:'点赞',value:'praiseNum'},
                {label:'排序',value:'sorted'},
            ];

            let obj = {
                id:wxList.setDesign.curr.id
            };
            let flag = true;
            for (let el of arr){
                if(!isNaN(wxList.setDesign.curr[el.value] * 1)){
                    obj[el.value] = wxList.setDesign.curr[el.value];
                }else{
                    this.$message(el.label + '数值不合法');
                    flag = false;
                    break;
                }
            }
            //收藏总数
            let collectNumSum = obj.collectNum*1 + wxList.setDesign.curr.actualCollectNumStr*1;
            //点赞总数
            let praiseNumSum = obj.praiseNum*1 + wxList.setDesign.curr.actualPraiseNumStr*1;
            //查看总数
            let viewNumSum = obj.viewNum*1 + wxList.setDesign.curr.actualViewNumStr*1;
            if(collectNumSum > viewNumSum){
                this.$message('收藏总数不能大于查看总数');
                flag = false;
            }else if(praiseNumSum > viewNumSum){
                this.$message('点赞总数不能大于查看总数');
                flag = false;
            }
            if(flag){
                wxList.loading.set = true;
                axios.put(`/api/wechat-admin-service/wechat/admin/design/change/index`,obj).then(res => {
                    wxList.fetchData();
                    wxList.loading.set = false;
                    wxList.setDesign.view = false;
                }).catch(err=>{
                    wxList.loading.set = false;
                });
            }

        },
        //出现二维码框
        accrueQRcode(row){
            this.loading.qRCode =true;
            this.canvas.model = row;
            this.unripeQRcode();
            this.fetchDataUser('');
            this.canvas.query.value = null;
        },
        //生成url
        unripeQRcodeUrl(wx){
            let self = this;
            let url = '';
            let type = self.canvas.model.kind === 'PACKAGE' ? 'product' : self.canvas.model.kind.toLowerCase();
            type = type.split('.')[0];
            if(self.canvas.query.wx === "REFORM"){
                url = `https://app.wukongkuaizhuang.com/${type}?no=${self.canvas.model.designNo}&realmShareNo=${self.canvas.model.designNo}&method=CMSQRCODE&realm=WECHAT_DESIGN`;
            }else {
                url = `https://app.sfygroup.shop/${type}?no=${self.canvas.model.designNo}&realmShareNo=${self.canvas.model.designNo}&method=CMSQRCODE&realm=WECHAT_DESIGN`;
            }
            if(window.location.host === 'console.yishimeijia.com'){
                url = `https://test.yishimeijia.com/${type}?no=${self.canvas.model.designNo}&realmShareNo=${self.canvas.model.designNo}&method=CMSQRCODE&realm=WECHAT_DESIGN`;
            }

            let shareRecordId = Number(Math.random().toString().substr(3,16) + Date.now()).toString(36);
            url += '&shareRecordId='+ shareRecordId;
            let obj = {
                category:self.canvas.query.wx,
                realmShareNo:self.canvas.model.designNo,
                realmSharerNo:this.canvas.query.value,
                realmType:'WECHAT_DESIGN',
                method:'CMSQRCODE',
                shareRecordId:shareRecordId
            };
            if(this.canvas.query.value){
                url += `&realmSharerNo=${this.canvas.query.value}`;
                axios.post('/api/wechat/admin/userMp/share/action/record',obj);
            }
            console.log(url);
            return url;
        },
        //生成二维码
        unripeQRcode(){
            let url = this.unripeQRcodeUrl();
            setTimeout(()=>{
                let obj = {
                    type: 'svg',
                    width:450
                };
                QRCode.toCanvas(document.getElementById('canvas'), url,obj, function (error) {
                    if (error) console.error(error);
                });
            },100);
        },
        saveCanvas(type,size){
            let url = this.unripeQRcodeUrl();
            let obj = {
                type: 'svg',
                width:size
            };
            QRCode.toCanvas(document.getElementById('canvas2'), url,obj, function (error) {
                if (error) console.error(error);
            });
            // setTimeout(()=>{
            let canvas = document.getElementById('canvas2');
            let dataURL = canvas.toDataURL("image/png");
            let a = document.getElementById(type);
            a.setAttribute("href",dataURL);
            // },100);
        },
        //发布
        publish(e){
            axios.put(`/api/wechat/admin/design/cancel/publish?ids=${e}`).then((response) => {
                if(response.success){
                    wxList.fetchData();
                    wxList.$message({
                        type: 'success',
                        message: '已取消发布!'
                    });
                }else {
                    wxList.$message(response.message);
                }
            }).catch(error => {

            });
        },
        //转跳
        location(type,id){
            let hashObj = {
                leftData:this.leftData,
                query:this.query
            };
            window.location.href = `/wechat/${type}/${id}?#${this.$base64Encode(hashObj)}`;
        },
        //获取用户
        fetchDataUser(e) {
            let that = this;
            var tab = that.canvas.query.wx;
            let url = `/api/wechat-admin-service/wechat/admin/userMp/findUserMps?page=1&size=50`;
            let params = {
                category: tab,
            };
            //姓名昵称检索
            if(e){
                params.nickName = e;
            }
             that.loading.canvasQueryList = true;
            setTimeout(() => {
                axios.get(url, {params: params}).then((response) => {
                    that.loading.canvasQueryList = false;
                    if (response && response.success) {
                        if (response.data && response.data.results) {
                            that.canvas.query.list = response.data.results;
                        } else {
                            that.query[tab].tableData = [];
                        }
                    }
                }).catch(error => {
                    that.loading.canvasQueryList = false;
                    console.error('error: %o', error);
                });
            },200);
        },
        //    切换小程序
        changeWx(){
            this.fetchDataUser('');
            this.unripeQRcodeUrl();
        },
        //打开添加到专题框
        addSpecial(e){
            this.currDesign = e;
            this.loading.addSpecialBox =true;
            this.currSpecial = '';
            axios.get(`/api/wechat/admin/special/topic/getSpecialTopicNamelistByKind?kind=${e.kind}`).then(res => {
                if(res.code=== '000'){
                    this.specialList = res.data;
                }
            });
        },
        //添加到专题
        saveAddSpecialDesign(){
            let self =this;
            this.loading.addSpecialLoading =true;
            let obj ={
                designId:self.currDesign.id,
                specialId:self.currSpecial
            };
            axios.post('/api/wechat/admin/special/topic/addArticle',obj).then(res => {
                this.loading.addSpecialLoading =false;
                if(res.code === '000'){
                    this.$message.success(`添加成功`);
                    this.loading.addSpecialBox =false;
                    self.fetchData();
                }else if(res.code === '804'){
                    this.$message.error('该设计已在本专题，不可重复添加');
                }
            }).catch(err => {
                this.loading.addSpecialLoading =false;
            });
        },

        lookDesign(e){
            let self = this;
            self.loading.lookDesign = true;
            axios.get(`/api/wechat/admin/design/detail?id=${e}`).then(res =>{
                self.loading.lookDesign = false;
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
                    self.information.categoryArr = [];
                    self.information.categoryArr.push(self.information.category);
                    self.information.categoryArr.push(self.information.kind);
                    if(!self.information.bindingSignResultEntities){
                        this.$set(this.information,'signs', []);
                    }else {
                        this.$set(this.information,'signs', self.information.bindingSignResultEntities);
                    }
                    self.loading.lookDesignView = true;
                }
            }).catch(err => {
                self.loading.lookDesign = false;
            });
        },

    },
    created: function () {
        let self = this;
        this.getTag();
        //根据浏览器地址栏的路由参数，初始化查询条件
        let hash = window.location.hash;
        if (hash != '') {
            try {
                let decoded = self.$base64Decode(hash.slice(1));
                if (typeof(decoded) === 'object') {
                    if(decoded.leftData){this.leftData = decoded.leftData;}
                    if(decoded.query){this.query = decoded.query;}
                    //查询
                    if(this.leftData && this.leftData.column){self.fetchData();}
                }
            } catch (error) {}
        }
        console.log(this.meta.cmsColumn);

    }
});
