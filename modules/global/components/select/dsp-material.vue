<template>
	<!--===============根据品牌查询物料--支持模糊查询====================-->
	<div class="dsp-mat-vue">
		<el-autocomplete
				v-if="!type"
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
					<div class="name" style="float: left">{{ item.name }}</div>
					<div class="name" style="float: right; color: #8492a6; font-size: 13px">{{item.code}}</div>
				</div>
			</template>
		</el-autocomplete>
		<el-autocomplete
				v-if="type"
				class="inline-input"
				v-model="empIds"
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
					<div class="name" style="float: left">{{ item.materialName }}</div>
					<div class="name" style="float: right; color: #8492a6; font-size: 13px">{{item.materialCode}}</div>
				</div>
			</template>
		</el-autocomplete>
	</div>
</template>

<script>
    import axios from '@/scripts/module/axios';
    export default {
        props: [ 'value', 'placeholder', 'brand', 'category', 'size', 'categoryPath','version' ,'type','disa'],
        data() {
            return {
                options: [],
                empId: this.value && this.value.code && this.value.name ? this.value.name: '',
                empIds: this.value && this.value.materialCode && this.value.materialName ? this.value.materialName : '',
            };
        },
        methods: {
            $doQuery(queryString,cb) {
                let self =this;
                if (queryString && queryString.trim() && queryString.trim().length > 0) {
                    var brand = this.brand.toLowerCase();
                    var search = queryString.trim();
                    var que = encodeURI(search);
                    if(que.indexOf('/') > -1 || que.indexOf('+') > -1){
                        que = encodeURIComponent(search);
                    }
                    var url;
                    if(brand == 'sogal'){
                        url = `/api/product/material/sogal/version/${self.version}/search/page/1/size/50?nameAndCode=${que}`;
                    }else if(brand == 'schmidt'){
                        url = self.type ?  `/api/product/material/schmidt/version/${self.version}/page/1/size/50`: `/api/product/material/schmidt/condition/version/${self.version}/size/50?condition=${que}`;
                    }else if(brand == 'milana'){
                        // url = `/api/product/material/milana/name/version/${self.version}/size/50`;
                        url = `/api/product/material/milana/search/matrial/${self.version}/50`;
                    }
                    // self.ajax(url,search);

                    var brand = self.brand.toLowerCase();
                    let params = {
                        category: self.category,
                        categoryPath: self.categoryPath,
                    };
                    if(brand == 'milana'){
                        params.codeOrName = search;
                    }else if( !self.type && brand == 'schmidt'){
                    }
                    var promise =  axios.get(url,{params});
                    promise.then(function (response) {
                        if (response && response && response.success && response.data) {
                            var options =  response.data;
                            if (self.brand != 'MILANA') {
                                cb(options || []);
                            }else{
                                cb(options.codeAndName || []);
                            }
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
                    self.$emit('update:value', val);
                    self.$emit('material');
                    var material = JSON.parse(JSON.stringify(val));
                    var old = JSON.parse(JSON.stringify(self.value));
                    console.log(self.value);
                    if(self.brand == 'MILANA' && val.name != self.value.name && val.code != self.value.code){
                        console.log('即可拉升发动机拉升');
                        material.width = self.value.width;
                        material.height = self.value.height;
                        material.depth = self.value.depth;
                        self.$emit('update:value', material);
                        self.$emit('material');
                    }else if(self.brand == 'MILANA' && val.name == self.value.name && val.code == self.value.code){
                        self.$emit('update:value', old);
                    }else if(self.brand != 'MILANA'){
                        self.$emit('update:value', val);
                        self.$emit('material');
                    }
                }else{
                    self.$emit('update:value', {});
                    self.$emit('material');
                }

            },
            focusInput(){
                if(!this.type && this.brand != 'MILANA'){
                    this.empId = this.value && this.value.code && this.value.name ? this.value.name: '';
                }else if(!this.type && this.brand == 'MILANA'){
                    // this.name = this.value;
                    this.empId = this.value && this.value.code && this.value.name ? this.value.name: '';
                }else if(this.type){
                    this.empIds = this.value && this.value.materialCode && this.value.materialName ? this.value.materialName : '';

                }

            }
        },
        watch: {
        },
        created(){
        }
    }
</script>
<style lang="less">
	.el-autocomplete-suggestion.el-popper {
		min-width: fit-content!important;
	}
	.dsp-mat-vue .el-autocomplete {
		display: block;
	}
</style>

