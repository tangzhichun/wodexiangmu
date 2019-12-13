<template>
	<!--===============查集产品（可根据品牌查询）====================-->
	<div class="dsp-pro-vue">
		<el-autocomplete
				class="inline-input"
				v-model="empId"
				:size="size"
				clearable
				:fetch-suggestions="$doQuery"
				:placeholder="placeholder"
				value-key='no'
				@select="$emmitEvent"
				@blur="focusInput"
		>
			<template slot-scope="{ item }">
				<div class="item">
					<div class="name" style="float: left">{{ item.no }}</div>
					<div class="name" style="float: right; color: #8492a6; font-size: 13px">{{item.name}}</div>
				</div>
			</template>
		</el-autocomplete>
	</div>
</template>

<script>
    import axios from '@/scripts/module/axios';
    export default {
        props: {
            value: String,
            placeholder: String,
	        brand: String,
	        size: String,
            type: String,
            disa: Boolean
        },
        data() {
            return {
                options: [],
                empId: this.value && this.value.no && this.value.name ? this.value.name: '',
            };
        },
        methods: {
            $doQuery(queryString, cb) {
                let self = this;
                var query = queryString;
                if (query && query.length > 0) {
                    let url = `/api/product/search/1/50?pageStart=1&pageSize=50`;
                    var brand = this.brand ;
                    var type = this.type;
                    let params = {
                        brand,
                        type,
                        nameAndCode: query
                    };
                    axios.get(url,{
                        params
                    }).then(function (response) {
                        if (response && response && response.success && response.data) {
                            var options =  response.data.results;
                            cb(options);
                        }else{
                            var options =  [];
                            cb(options);
                        }
                    }).catch(function (error) {
						console.error('error: %o', error);
					});
                }else{
                    var options =  [];
                    cb(options);
				}
            },
            $emmitEvent(val) {
                let self = this;
                if(val){
                    val.quantity = 1;
                    self.$emit('update:value', val);
                }else{
                    self.$emit('update:value', {});
                }

            },
            focusInput(){
                this.empId = this.value && this.value.no && this.value.name ? this.value.name: ''
			}
        },
        watch: {
            value(val,oldVal){
                if(!val){
                    this.empId= null;
                }
            }
        },
        created(){
        }
    }
</script>
<style lang="less">
	.el-autocomplete-suggestion.el-popper {
		min-width: fit-content!important;
	}
	.dsp-pro-vue .el-autocomplete {
		display: block;
	}
</style>


