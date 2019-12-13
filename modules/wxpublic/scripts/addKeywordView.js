/* jshint esversion: 6 */
import Vue from '@/scripts/module/vue';
import axios from '@/scripts/module/axios';
import mincade from '@/components/ui/cms-mincade.vue';
import minimage from '@/components/ui/cms-minimage.vue';
import mintext from '@/components/ui/cms-mintext.vue';


new Vue({
    components: {
        'cms-mincade': mincade,
        'cms-minimage': minimage,
        'cms-mintext': mintext,
    },

    el: '#app',
    delimiters: ['{[', ']}'],
    data: {
        hashData:null,

        //关注后自动回复初始数据
        formData:{
            replyType:'all',
            statusSwitch:true,
            defaultReply:false,
        },
        //关键词
        keyWord:[
            {type:'part',keyword:''}
        ],
        //回复内容列表
        replyModal:[],

        views:{
            miniprogrampage:false,
            text:false,
            image:false,

            save:false
        },
        // 点击小程序卡片 文字 图片   编辑是下标 0，1
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
        //新增框
        showAddReplyModal(type){
            let self = this;
            if(this.replyModal.length  > 9){
                this.$message('回复内容最多可设置10条');
                return;
            }
            let fl = type ;
            let obj = JSON.parse(JSON.stringify(self[fl]));
            Object.keys(obj).map(el => {
                obj[el] = '';
            });
            self[fl] = Object.assign({},obj);
            this.replyModalType = 'add';
            self.views[fl] = true;
        },
        //save新增 || 编辑    小程序卡片 文字 图片
        addCardForm(data){
            let self =this;
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
        //编辑框
        showEditReplyModal(item,i){
            let self = this;
            this[item.type] = JSON.parse(JSON.stringify(item));
            if(item.type === 'miniprogrampage'){
                self.miniprogrampage.mediaSourseUrl = {
                    imageUrl: self.miniprogrampage.mediaSourseUrl
                };
            }
            self.views[item.type] = true;
            this.replyModalType = i;
        },
        //新增关键字
        addKeyWord(){
            this.keyWord.push({type:'part',keyword:''});
        },
        //删除关键字
        delKeyWord(i){
            this.keyWord.splice(i,1);
        },

        save(){
            //关键词
            let self = this;
            let obj = {
                keywordsList:self.keyWord.filter( el => {
                    return el.keyword;
                }),
                newsList:self.replyModal,
                gzhId:self.hashData.gzh.appid
            };
            obj = Object.assign(self.formData,obj);
            delete obj.newsType;
            delete obj.reply;
            if(obj.statusSwitch){
                obj.status = 'enable';
            }else {
                obj.status = 'stop';
            }
            if(obj.keywordsList.length < 1){
                self.$message.error('填写关键词');
                return;
            }
            if(!self.replyModal[0]){
                self.$message.error('填写回复内容');
                return;
            }
            if(self.views.save){
                return;
            }
            self.views.save = true;
            axios.post('/api/wechat-service/wechat/more/saveNewsKeywords',obj).then(res => {
                self.views.save = false;
                if(res.code === '000'){
                    self.$message.success('添加成功');
                    window.location = '/wxpublic/keyWordList'+document.location.hash;
                }
            }).catch(err => {
                self.views.save = false;

            });
        },
        //删除方案
        delKeywor(){
            if( this.views.save){return;}
            this.$confirm('确定要删除吗?', '删除', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.views.save = true;
                axios.delete('/api/wechat-service/wechat/more/deleteNewsKeywords?replyId='+DSP.keywordData.id).then(res => {
                    if(res.code === '000'){
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        window.location = '/wxpublic/keyWordList'+document.location.hash;
                    }else {
                        this.views.save = false;
                    }
                }).catch(err => {
                    this.views.save = false;
                });
            });
        },
    },
    created(){
        if(DSP.keywordData){
            this.keyWord = DSP.keywordData.keywordsList;
            this.replyModal=DSP.keywordData.newsList;
            this.formData=JSON.parse(JSON.stringify(DSP.keywordData));
            if(this.formData.status === 'enable'){
                this.$set(this.formData,'statusSwitch',true);
            }else{
                this.$set(this.formData,'statusSwitch',false);
            }
        }
        let hash = window.location.hash;
        if (hash !== '') {
            try {
                let decoded = this.$base64Decode(hash.slice(1));
                if (typeof(decoded) == 'object') {
                   this.hashData = decoded;
                }
            } catch (error) {}
        }
    }
});
