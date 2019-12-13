/* jshint esversion: 6 */
import Vue from '@/scripts/module/vue';
import axios from '@/scripts/module/axios';
import enums from "@/scripts/module/enums";


let self = new Vue({
    el: '#app',
    delimiters: ['{[', ']}'],
    data: {
        cmsColumn:enums.dict('CMS_COLUMN'),


        tab:[
            {label:'单图模版',value:'one'},
            {label:'多图模版',value:'more'},
        ],
        query:{
            // 总条数
            totalSize: 0,
            // 每页多少条
            pageSize: 150,
            // 当前页面
            currentPage: 1,
            templateType:'one',
        },
        informationOne:[
            {
                l:'分享文章配图',
                f:'articleImageValid',
                w:'articleImageWidth',
                h:'articleImageHigh',
                x:'articleImageX',
                y:'articleImageY',
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
                sty:'border-radius: 50%;',
                w:'appletCodeWidth',
                h:'appletCodeWidth',
                x:'appletCodeX',
                y:'appletCodeY',
                d:'/images/qrcode.jpeg',
                type:'img'
            },
        ],
        informationMore:[
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
        dataList:[],

        //用这个模版的方案
        designList:[],
        designListFilter:[],
        designQuery:{
            template: null,
            designTitle:'',
            current:1, //当前页
            size:10,    //每页多少条
            zongData:100,
        },
        views:{
            //用这个模版的方案
            designList:false,
            designListLoading: false
        },

    },
    methods: {
        indexMethod(index) {
            let i = this.designQuery.size * (this.designQuery.current - 1) + 1;
            return i + index;
        },
        change(e){
            this.query.templateType = e;
            this.getTemplate();
        },
        addTemplate(e,type) {
            let url = `/cms/editTemplate?templateType=${this.query.templateType}&type=${type}`;
            if(typeof e === 'string'){
                window.location = url+'&id='+e;
            }else {
                window.location = url;
            }
        },
        getTemplate(){
            let self = this;
            let params = {
                templateType:self.query.templateType
            };
            window.location.hash = self.$base64Encode(self.query);

            axios.get(`/api/wechat/admin/share/template/${self.query.currentPage}/${self.query.pageSize}`,  {params: params}).then(res=>{
                this.dataList =  res.data && res.data.results;
            });
        },
        deleteInformation(e){
            this.$confirm('此操作将永久删除该模版, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                distinguishCancelAndClose:true,
                closeOnClickModal:false,
                type: 'warning'
            }).then(() => {
                axios.delete(`/api/wechat/admin/share/template/${e.id}`).then(res=>{
                    if(res.code === '000'){
                        self.getTemplate();
                        self.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    }
                });

            });

        },
        //打开拥有此模版的方案列表
        openDesignList(e){
            this.designQuery.template = e;
            this.views.designList = true;
            this.queryDesignList();
        },
        queryDesignList(){
            let self = this;
            this.views.designListLoading =  true;
            this.designQuery.current = 1;
            axios.get(`/api/wechat/admin/design/${self.designQuery.template.id}/template`).then(res => {
                this.views.designListLoading =  false;
                if(res.code === '000'){
                    self.designList = res.data;
                    self.designQuery.zongData = res.data.length;
                    self.designListFilter = res.data.slice(0,10);
                }else {
                    self.designList = [];
                    self.designListFilter = [];
                    self.$message(res.message);
                }
            }).catch(err => {
                self.$message('未知错误，请稍后重试');
                self.designList = [];
                self.designListFilter = [];
                self.views.designList =  false;
                self.views.designListLoading =  false;
            });
        },
        location(type,e){
            let hashObj = {
                leftData:{
                    //具体选中了那个
                    column:{
                        value: e.kind
                    },
                }
            };
            if(e.kind.split('.')[1]){
                hashObj.leftData.column.parent = e.kind.split('.')[0];
            }
            window.open(`/wechat/${type}/${e.id}?#${this.$base64Encode(hashObj)}`);
        },

        //分页
        handleCurrentChange(e){
            let self= this;
            self.designQuery.current = e;
            self.designListFilter = self.designList.slice((e-1)*10,(e-1)*10 + 10);
        },
        queryDesignTitle(){
            let self= this;
            this.designQuery.current = 1;
            let arr = self.designList.filter(el => { return el.title.indexOf(self.designQuery.designTitle) > -1;});
            self.designQuery.zongData = arr.length;
            self.designListFilter = arr.slice(0,10);
        }

    },
    created () {
        let self = this;
        let hash = window.location.hash;
        console.log(hash);
        if (hash != '') {
            try {
                let decoded = self.$base64Decode(hash.slice(1));
                if (typeof(decoded) === 'object') {
                    this.query = decoded;
                }
            } catch (error) {}
        }
        this.getTemplate();
    },
});
