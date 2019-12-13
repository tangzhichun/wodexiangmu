/* jshint esversion: 6 */
import Vue from '@/scripts/module/vue';
import axios from '@/scripts/module/axios';
new Vue({
    el: '#app',
    delimiters: ['{[', ']}'],
    data: {
        //动态tab页构建 多个公众号tab
        tab:[],
        //公用查询条件
        query:{
            keyword:'',
            // 总条数
            totalSize: 0,
            // 每页多少条
            pageSize: 30,
            // 当前页面
            currentPage: 1,
        },
        //所有的查询条件 hash
        axiosQuery:{
            gzh:null,
        },
        //数据
        views:{
            loading:false
        },
        //所有的列表
        list:{

        }
    },
    methods: {
        //切换tab
        change(e){
            this.$set(this.axiosQuery,'gzh',e);
            this.fetchData(1);
            window.location.hash = this.$base64Encode(this.axiosQuery);
        },
        // todo 查询关键词列表
        fetchData (e) {
            let self = this;
            let tab = this.axiosQuery.gzh;
            let query  = this.axiosQuery[tab.query];
            if(e === 1){
                query.currentPage = 1;
            }
            //构造地址栏hash参数
            window.location.hash = self.$base64Encode(self.axiosQuery);
            let url = `/api/wechat-service/wechat/more/findNewsKeywordsList`;
            let obj ={
                page:query.currentPage,
                size:query.pageSize,
                keyword:query.keyword,
                gzhId:tab.appid
            };
            if(self.views.loading){return;}
            self.views.loading = true;
            axios.get(url,{params:obj}).then((response) => {
                self.views.loading = false;
                if (response.data && response.data.results) {
                        self.$set(self.list,tab.query+'',response.data.results);
                        query.totalSize = response.data.totalSize;
                    } else {
                        self.$set(self.list,tab.query+'',response.data.results);
                        query.totalSize = 0;
                    }
                self.list = Object.assign({},self.list );
            }).catch(error => {
                self.views.loading = false;
                console.error('error: %o', error);
            });
        },
        //新增修改关键词回复
        addKeywordView(e){
            if (e === 'add'){
                window.location='/wxpublic/addKeywordView'+document.location.hash;
            } else {
                window.location='/wxpublic/addKeywordView?id='+e+document.location.hash;
            }
        }
    },
    created () {
        let self = this;
        //构建tab页  构建查询条件 构建list
       this.tab = DSP.gzh.map((el,i) => {
           el.query = 'query'+i;
           //查询关键词查询条件
           self.$set(self.axiosQuery,'query'+i,JSON.parse(JSON.stringify(self.query)));
           //查询关键词列表
           self.list['query'+i] = [];
           return el;
       });
        let hash = window.location.hash;
        if (hash != '') {
            try {
                let decoded = self.$base64Decode(hash.slice(1));
                if (typeof(decoded) == 'object') {
                    self.axiosQuery = decoded;
                }
            } catch (error) {}
        }
        if(!self.axiosQuery.gzh){
            self.$set(self.axiosQuery,'gzh',DSP.gzh[0]);
        }
        this.fetchData();

    }

});
