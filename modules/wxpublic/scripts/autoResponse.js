/* jshint esversion: 6 */
import Vue from '@/scripts/module/vue';
import axios from '@/scripts/module/axios';
//小程序卡片  图片  文字
import mincade from '@/components/ui/cms-mincade.vue';
import minimage from '@/components/ui/cms-minimage.vue';
import mintext from '@/components/ui/cms-mintext.vue';


new Vue({
    el: '#app',
    delimiters: ['{[', ']}'],
    components: {
        'cms-mincade': mincade,
        'cms-minimage': minimage,
        'cms-mintext': mintext,
    },
    data: {
        //查询条件
        query:{
            gzh:null,
        },
        //数据
        followReplyData:{},
        keywordResponseData:{},
        //显示什么东西 loading
        views:{
            miniprogrampage:false,
            text:false,
            image:false,
            //保存
            save:false,
            //获取当前的save
            getfindNews:false
        },
        formData:{
            reply:false,
            replyType:'all',
        },
        replyModal:[],
        //确定是新增还是修改回复内容
        replyModalType:'add',
        //小程序卡片
        miniprogrampage:{
            type:'miniprogrampage',
            //卡片标题
            title:'',
            // 小程序路径
            pagepath:'',
            //小程序appid
            appid:'',
            //图片
            mediaSourseUrl:''
        },
        //文字
        text:{
            type:'text',
            text:'',
        },
        //img
        image:{
            type:'image',
            mediaSourseUrl:''
        }
    },
    methods: {
        //切换tab
        change(e){
            this.query.gzh = e;
            this.getfindNews();
            window.location.hash = this.$base64Encode(this.query);
        },
        // todo 关注后回复
        //获取关注后回复
        getfindNews(){
            if(this.views.getfindNews){
                return;
            }
            this.views.getfindNews = true;
            axios.get(`/api/wechat-service/wechat/more/findNews?gzhId=${this.query.gzh.appid}`).then(res => {
                this.views.getfindNews = false;
                if(res.code === '000' && res.data){
                        this.formData = JSON.parse(JSON.stringify(res.data));
                        this.replyModal = JSON.parse(JSON.stringify(res.data.newsList));
                }else{
                    this.formData = {reply:false, replyType:'all',};
                    this.replyModal = [];
                }
            }).catch(err => {
                this.views.getfindNews = false;
            });
        },
        //新增 小程序卡片 文字 img
        showAddReplyModal(type){
            let self = this;
            let fl = type ;
            if(this.replyModal.length  > 1){
                this.$message('回复内容最多可设置2条');
                return;
            }
            let obj = JSON.parse(JSON.stringify(self[fl]));
            Object.keys(obj).map(el => {
                obj[el] = '';
            });
            self[fl] = Object.assign({},obj);
            this.replyModalType = 'add';
            self.views[fl] = true;
        },
        //编辑  小程序卡片 文字 img
        showEditReplyModal(item,i){
            let self = this;
            this[item.type] = JSON.parse(JSON.stringify(item));
            self.views[item.type] = true;
            if(item.type === 'miniprogrampage'){
                self.miniprogrampage.mediaSourseUrl = {
                    imageUrl: self.miniprogrampage.mediaSourseUrl
                };
            }
            this.replyModalType = i;
        },
        //保存   新增 || 编辑    小程序卡片 文字 img
        addCardForm(data){
            let self = this;
            if (self.replyModalType === 'add'){
                self.replyModal.push(data);
            } else {
                self.replyModal.splice(self.replyModalType,1,data);
            }
        },
        //删除
        delReplyPreviewTemplate(i){
            let self = this;
            let arr = JSON.parse(JSON.stringify(self.replyModal));
            arr.splice(i,1);
            self.replyModal = Object.assign([],arr);
        },
        //保存form
        save(){
            let self = this;
            let obj =  JSON.parse(JSON.stringify(self.formData));
            obj.newsList = this.replyModal;
            if(obj.newsList.length < 1){
                obj.reply = false;
            }
            obj.gzhId = this.query.gzh.appid;
            if(this.views.save){
                return;
            }
            this.views.save = true;
            axios.post('/api/wechat-service/wechat/more/saveNews',obj).then(res => {
                self.views.save = false;
                if(res.code === '000'){
                    this.$message.success('添加成功');
                    this.getfindNews();
                }
            }).catch(err => {
                self.views.save = false;
            });
        },
    },
    created () {
        let self = this;
        let hash = window.location.hash;
        if (hash != '') {
            try {
                let decoded = self.$base64Decode(hash.slice(1));
                if (typeof(decoded) == 'object') {
                    self.query = decoded;
                }
            } catch (error) {}
        }
        if(!self.query.gzh){
            self.$set(self.query,'gzh',DSP.gzh[0]);
        }
        this.getfindNews();
    }

});
