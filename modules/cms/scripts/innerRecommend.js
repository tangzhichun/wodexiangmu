/* jshint esversion: 6 */
import Vue from '@/scripts/module/vue';
import axios from '@/scripts/module/axios';


new Vue({
    el: '#app',
    delimiters: ['{[', ']}'],
    data: {
        tab:[
            {label:'设计师推荐',value:'tab1'},
        ],
        //需要记录到hash
        query:{
            currTab:'tab1',//那个tab页
            leftListTotalSize: 1000,


            name:'',
            // 总条数
            rightListTotalSize: 1000,
            // 每页多少条
            pageSize: 15,
            // 当前页面
            currentPage: 1,
        },
        views:{
            //防止重复请求
            guardRepetitive:false,
            //推荐名单loading
            leftList:false,
            // 认证设计师loading
            rightList:false,
            //是否排序
            sort:false,
            //排序loading
        },
        leftList:[],
        rightList:[],
        upAndDownShift:{
            sortI:null,
            targetI:null,
            sortData:null,
            targetData:null,
        }
    },
    methods: {
        change(e){
            let self = this;
            this.query.currTab = e;
            window.location.hash = self.$base64Encode(self.query);
        },
        getLeftList(){
            let self =this;
            window.location.hash = self.$base64Encode(self.query);
            if(self.views.leftList){return;}
            self.views.leftList = true;
            axios.get('/api/wechat/admin/content/recommended/leftList').then(res => {
                self.views.leftList = false;
                if(res.data) {
                    this.query.leftListTotalSize = res.data.size;
                    this.leftList = res.data.list;
                }
            }).catch(err => {
                self.views.leftList = false;
            });
        },
        getRightList(tou){
            let self =this;
            if(tou === 1){
                self.query.currentPage = 1;
            }
            window.location.hash = self.$base64Encode(self.query);
            let obj = {
                name:self.query.name,
                page:self.query.currentPage,
                size:self.query.pageSize,
            };
            if(self.views.rightList){return;}
            self.views.rightList = true;
            axios.get('/api/wechat/admin/content/recommended/rightList',{params:obj}).then(res => {
                self.views.rightList = false;
                if(res.data){
                    this.query.rightListTotalSize = res.data.totalSize;
                    this.rightList = res.data.results;
                }
            }).catch(err => {
                self.views.rightList = false;
            });
        },
        //左右移动
        putLeftShift(e,type){
            let obj = {
                id:e
            };
            if(this.views.guardRepetitive){return;}
            this.views.guardRepetitive = true;
            axios.put(`/api/wechat/admin/content/recommended/${type}`,obj).then(res => {
                if(res.code === '000'){
                    this.views.guardRepetitive = false;
                    this.getLeftList();
                    this.getRightList();
                }
            }).catch(err =>{
                this.views.guardRepetitive = false;
            });
        },
        //上下移动
        putUpAndDownShift(e,i){
            if(this.views.guardRepetitive){return;}
            this.views.guardRepetitive = true;
            let source = e;
            let target = this.leftList[i];
            let obj = {
                sourceId:source.id,
                sourceOrderNum:source.orderNum,
                targetId:target.id,
                targetOrderNum:target.orderNum
            };
            axios.put('/api/wechat/admin/content/recommended/dragAndDropShift',obj).then(res =>{
                this.views.guardRepetitive = false;
                if(res.code === '000'){
                    this.getLeftList();
                }else if(res.code === '815'){
                    this.$message('系统繁忙，请稍后重试');
                }
            }).catch(err => {
                this.views.guardRepetitive = false;
            });
        },
        move(e) {
            let odiv = e.target;
            //算出鼠标相对元素的位置
            let disY = e.clientY - odiv.offsetTop;
            //元素的宽高
            let odivW = e.target.offsetWidth;
            document.onmousemove = (e) => {    //鼠标按下并移动的事件
                //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
                let top = e.clientY - disY ;
                top = parseInt(top);
                //移动当前元素
                odiv.style.top = disY + 'px';
                odiv.style.position = 'fixed';
                odiv.style.transform = 'translate(0,'+top+'px)';
                odiv.style.width = odivW+'px';

            };
            document.onmouseup = (e) => {
                odiv.style= '';
                document.onmousemove = null;
                document.onmouseup = null;
            };
        },
        //拖
        dragstart(ele,item,indx){
            this.upAndDownShift.sortData = JSON.parse(JSON.stringify(item));
            this.upAndDownShift.sortI = indx;
        },
        //放
        dragend(ele,item){
            let source = this.upAndDownShift.sortData;
            let target = this.upAndDownShift.targetData;
            if(source.id !== target.id){
                let obj = {
                    sourceId:source.id,
                    sourceOrderNum:source.orderNum,
                    targetId:target.id,
                    targetOrderNum:target.orderNum
                };
                axios.put('/api/wechat/admin/content/recommended/dragAndDropShift',obj).then(res =>{
                    this.views.guardRepetitive = false;
                    this.upAndDownShift={sortI:null, targetI:null, sortData:null, targetData:null};
                    if(res.code === '000'){
                        this.getLeftList();
                    }else if(res.code === '815'){
                        this.$message('系统繁忙，请稍后重试');
                    }
                }).catch(err => {
                    this.upAndDownShift={sortI:null, targetI:null, sortData:null, targetData:null};
                    this.views.guardRepetitive = false;
                });
            }else {
                this.upAndDownShift={sortI:null, targetI:null, sortData:null, targetData:null};
            }
            // this.leftList.splice(this.upAndDownShift.sortI,1);
            // this.leftList.splice(this.upAndDownShift.targetI,0,this.upAndDownShift.sortData);
        },
        //移动到item
        dragenter(ele,item,i){
            this.upAndDownShift.targetData = JSON.parse(JSON.stringify(item));
            this.upAndDownShift.targetI = i;
        },
    },
    created () {
        let self = this;
        let hash = window.location.hash;
        if (hash != '') {
            try {
                let decoded = self.$base64Decode(hash.slice(1));
                if (typeof(decoded) === 'object') {
                    self.query = decoded;
                }
            } catch (error) {

            }
        }
        this.getLeftList();
        this.getRightList();
    }

});
