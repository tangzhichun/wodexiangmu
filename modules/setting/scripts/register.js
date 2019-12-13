/* jshint esversion: 6 */
import Vue from '@/scripts/module/vue';
import axios from '@/scripts/module/axios';

var loglogin = new Vue({
    el: '#app',
    delimiters: ['{[', ']}'],
    data: {
        loading:false,
        isClickQuery: false,
        tableData: [],
        query: {},
        pagination: {
            totalSize: 0,
            pageSize: 15,
            currentPage: 2,
        },
        daterange: '',
        pickerOptions: {
            shortcuts: [
                {
                    text: '最近一周',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                    }
                }],
            disabledDate(time) {
                return time.getTime() > DSP.serverTime;
            },
        },
        validate: {
            mobile: function (value) {
                let reg = /^0?(13|14|15|17|18|19)[0-9]{9}$/;
                let flag = false;
                if (value) flag = true;
                if (flag && !reg.test(value)) {
                    this.mobileMsg = true;
                    return true;
                } else {
                    this.mobileMsg = false;
                    return false;
                }
            },
            mobileMsg: false,
        }
    },
    methods: {
        getQueryObject (url) {
            url = url == null ? window.location.hash : url;
            var search = url.substring(url.lastIndexOf("?") + 1);
            var obj = {};
            var reg = /([^?&=]+)=([^?&=]*)/g;
            // [^?&=]+表示：除了？、&、=之外的一到多个字符
            // [^?&=]*表示：除了？、&、=之外的0到多个字符（任意多个）
            search.replace(reg, function (rs, $1, $2) {
                var name = decodeURIComponent($1);
                var val = decodeURIComponent($2);
                val = String(val);
                obj[name] = val;
                return rs;
            });
            return obj;
        },
        //  序号
        indexMethod(index) {
            let i = this.pagination.pageSize * (this.pagination.currentPage - 1) + 1;
            return i + index;
        },
        //把对象变成URL查询字符串
        urlCord(url, data) {
            if (typeof(url) === 'undefined' || url === null || url === '') {
                return '';
            }
            if (typeof(data) === 'undefined' || data === null || typeof(data) !== 'object') {
                return '';
            }

            let flag = false;//标识query属性是否为空
            let param = "";//带问号的查询参数字符串
            for (let k in data) {
                //当前查询值不为空时则不拼接
                if (data[k]) {
                    param += ((param.indexOf("=") !== -1) ? "&" : "") + k + "=" + encodeURI(data[k]);
                    flag = true;
                }
            }
            //如果没有查询条件
            if (flag) {
                url += (url.indexOf("?") !== -1) ? "" : "?";
                url += param;
            }
            return url;
        },
        //请求地址（根据query拼接参数）
        getUrl() {
            if (this.daterange) {
                this.query.startTime = this.daterange[0];
                this.query.endTime = this.daterange[1];
            } else {
                this.query.startTime = "";
                this.query.endTime = "";
            }

            let obj = this.query;
            //区分是点击查询按键查询还是其它方式查询，如果是点击查询按钮则将页数还原到第1页
            if (this.isClickQuery) {
                this.pagination.currentPage = 1;
            }
            let url = this.urlCord("/api/privilege/auth/login/log/" + this.pagination.currentPage + "/" + this.pagination.pageSize, obj);
            let search = this.urlCord("?page=" + this.pagination.currentPage + "&size=" + this.pagination.pageSize +'&totalSize='+ this.pagination.totalSize+'&', obj);
            return {url:url , search:search};
        },
        //点击查询按钮
        clickQuery() {
            this.isClickQuery = true;
            this.doQuery();
        },
        //执行查询
        doQuery() {
            let self =this;
            this.loading = true;
            let flag = this.validate.mobile(this.query.mobile);
            if (flag) return;
            let url = this.getUrl().url;
            axios.get(url).then((response) => {
                this.loading = false;
                if (response && response.success) {
                    if (response && response.data && response.data.results) {
                        if (response.data.results) {
                            self.tableData = response.data.results;
                            self.pagination.totalSize = response.data.totalSize;
                            location.hash = self.getUrl().search;
                        }
                    } else {
                        this.tableData = [];
                        this.pagination.totalSize = 0;
                    }
                }
            });
            //每次查询后将点击查询按钮复原
            this.isClickQuery = false;

        },
        //点击每页多少条
        onSizeChange(val) {
            this.pagination.pageSize = val;
            this.doQuery();
        },
        //点击第几页
        onCurrentChange(val) {
            this.pagination.currentPage = val * 1;
            this.doQuery();
        },
    },
    created: function () {
        let urlQuery = this.getQueryObject();
        if(urlQuery.size === 'undefined'){
            this.pagination.pageSize = 15;
        }else {
            this.pagination.pageSize = Number(urlQuery.size) || 15;
        }

        if(urlQuery.totalSize){
            this.pagination.totalSize = Number(urlQuery.totalSize);
        }
        if(urlQuery.startTime){
            let arr = [];
            arr.push(urlQuery.startTime);
            arr.push(urlQuery.endTime);
            this.daterange = arr;
        }
        if(urlQuery.mobile){
            this.query.mobile = urlQuery.mobile;
        }
        if(urlQuery.success){
            this.query.success = urlQuery.success;
        }
        if(urlQuery.page){
            this.onCurrentChange(urlQuery.page*1 );
        }else {
            this.pagination.currentPage = 1;
            this.onCurrentChange(1);
        }
        // this.doQuery();
    },
    watch: {
        //处理返回值的登录结果
        tableData: function (curVal, oldVal) {
            for (let obj in curVal) {
                curVal[obj].success = curVal[obj].success ? '成功' : '失败';
            }
        },
    },
});
