/* jshint esversion: 6 */

import Vue from '@/scripts/module/vue';

import map from '@/components/ui/dsp-map.vue';
import location from '@/components/select/dsp-location.vue';
import time from '@/components/ui/dsp-time.vue';
import org from '@/components/select/dsp-org.vue';
import emp from '@/components/select/dsp-emp.vue';
import img from '@/components/ui/dsp-img.vue';
import attachment from '@/components/ui/dsp-attachment.vue';

new Vue({
    el: '#app',
    delimiters: ['{[', ']}'],

    components: {
        'dsp-map': map,
        'dsp-location': location,
        'dsp-time': time,
        'dsp-org': org,
        'dsp-emp': emp,
        'dsp-img': img,
        'dsp-attachment': attachment,
    },
    data: {
        component: {
            model: {
                eventList: [
                    {timeCreated: '2018-05-01', operatorName: 'Reshine', content: 'say hello'},
                    {timeCreated: '2018-05-02', operatorName: 'Reshine', content: 'say hello'},
                    {timeCreated: '2018-05-03', operatorName: 'Reshine', content: 'say hello'}
                ],

                attachmentList: [
                    {name:'aaa.jpg', type:'image/jpeg',     path: 'relative/aaa.jpg'},
                    {name:'bbb.txt', type:'text',           path: 'relative/bbb.txt'},
                    {name:'ccc.zip', type:'application/zip',path: 'relative/ccc.zip'},
                    {name:'ddd.pdf', type:'image/jpeg',     path: 'relative/ddd.pdf'},
                ],


                map:{
                    addr0:'北京',
                    addr:'',
                    addr2:'',
                    addr3:['北京天安门','北京市故宫','北京市东城区正义路甲5号'],
                    points4:[[116.417854,39.921988]],
                    points5:[[116.417854,39.921988],[116.412222,39.811245,"地址：北京市东城区正义路甲5号"]],
                    warpWeft:''
                },

                orgId0: null,
                orgId: null,
                shop1: null,
                shop2: null,
                shop3: null,
                shop4: null,
                shop9: null,

                emp0: null,
                emp1: null,
                emp2: null,
                emp3: null,
                emp4: null,
                emp5: null,
                emp6: null,
                emp7: null,
                emp8: null,
                emp9: null,
                emp10: null,
                popoverPanelVisible: false,

                imageUrl: null,
                uploadFile: {fileType:'JPG'}
            },
        },
        extension: {
            model: {
                currTime: new Date().getTime(),
                amount: 20072.5367,
                array: ['A', 'AB', 'ABC', 'BC', 'CDE'],
                code:null,
                mobile: null,
            }
        },
        activeNames:[]
    },
    methods: {
        //上传之前判断文件大小和格式
        beforeUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            if (!isJPG) {
                this.$message.error('图片只能是 JPG 格式!');
                return false;
            }

            const isLt5M = file.size / 1024 / 1024 < 5;
            if (!isLt5M) {
                this.$message.error('文件大小不能超过 5MB!');
                return false;
            }

            return true;
        },
        //上传成功后
        uploadSucceed(response, file, fileList){
            if (response.success) {
                this.component.model.imageUrl = URL.createObjectURL(file.raw);
                this.$message.success(`文件上传成功`);
            } else {
                this.$message.error(`文件上传失败，请稍后重试`);
            }
        },
        //上传失败后
        uploadFailed(response, file, fileList){
            this.$message.error(`文件上传失败，请稍后重试`);
        },
    },
    created() {
    }
});


laydate.render({
    elem: '#dateDemo',
    theme: '#008bff',
    showBottom: false,
    min: '2016-10-14',
    max: '2020-10-14'
});
