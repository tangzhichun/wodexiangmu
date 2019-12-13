<template>
    <div class="data-ri-yue-cell">
        <div class="data-ri-yue-cell-title"><i :class="icon"></i><sapn>{{title}}</sapn></div>
        <div class="data-list-box">
            <div class="data-list" v-for="item in arr">
                <div v-show="!item.is">
                    <div class="font-size-xxxl " :class="item.sort && (item.sort ==='zheng' ? zheng(item.value) : fu(item.value) )">{{item.before}}{{item.value || 0}}{{item.later}}</div>
                    <div class="font-size-s " style="color: #b0b5b9;">
                        <sapn>{{item.name}}</sapn>
                        <el-popover
                                placement="top"
                                width="200"
                                trigger="hover"
                                :content="item.title">
                            <i class="el-icon-question" slot="reference" style="color:#dcdfe6;"></i>
                        </el-popover>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    /*arr [
      {
         label: 'autoReturnNum',
         name: '自动审图退回',
         title:'提示',
         value:'数值number'，
         before:'数值前符号  ￥'，
         later:'数值n后符号   %'，
         sort：颜色排序    zheng fu  控制颜色变化
         }

     ],*/
    export default {
        props: {
            title:String,
            icon:String,
            arr: Object,
        },
        methods:{
            zheng(va){
                if(va >= 75){return 'A'}else if(va >= 50 ){return 'B'}else {return 'C'}
            },
            fu(va){
                if(va >= 75){return 'C'}else if(va >= 50 ){return 'B'}else {return 'A'}
            }
        }
    }
</script>

<style scoped>
    .A{
        color:#56bb8a;
    }
    .B{
        color:#fb932b;
    }
    .C{
        color:#f56c6c;
    }
</style>