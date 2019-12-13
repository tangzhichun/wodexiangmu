<template>
    <div class="dsp-location">
        <div >
            <el-input
                      :placeholder="placeholder"
                      size="small"
                      :id="suggestId"
                      :value="address"
                      @change="changeAddr">
            </el-input>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            placeholder: String,
            address:''         //value值
        },
        data() {
            return {
                address:'',
                suggestId: Math.random().toString(36).substr(3),
            };
        },
        methods: {
            changeAddr(val){
                let self = this;
                self.address = val;
                self.$emit('update:address', self.address);
            },
            //搜索
            search(){
                let self = this;
                let ac = new BMap.Autocomplete({ //建立一个自动完成的对象
                    input:self.suggestId,
                });
                ac.setInputValue(self.address);
                ac.addEventListener("onconfirm", function(e) {
                    self.address = '';
                    if(e.item.value.city){ self.address += e.item.value.city;}
                    if(e.item.value.district){ self.address += e.item.value.district;}
                    if(e.item.value.street){ self.address += e.item.value.street;}
                    if(e.item.value.streetNumber){ self.address += e.item.value.streetNumber;}
                    if(e.item.value.business){ self.address += e.item.value.business;}
                    self.value = self.address;
                    self.$emit('update:address', self.address);
                })
            },

        },
        mounted() {
            let self = this;
            self.search()
        }
    }
</script>
<style lang="less">
     .tangram-suggestion-main{
         z-index: 2016;
     }
</style>