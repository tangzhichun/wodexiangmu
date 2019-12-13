/* jshint esversion: 6 */
import Vue from '@/scripts/module/vue';
import axios from '@/scripts/module/axios';
import enums from '@/scripts/module/enums';
import cropper from '@/components/ui/dsp-cropper.vue';
import xcxpageskip from '@/components/ui/xcx-page-skip.vue';

var self = new Vue({
    el: '#app',
    delimiters: ['{[', ']}'],
    components: {
        'dsp-cropper': cropper,
        'xcx-page-skip': xcxpageskip,
    },
    data: {
        //行政区域业务字典
        adRigion: enums.dict('ADMINISTRATIVE_REGION'),
        // 页面类型
        pageTypes: DSP.globalConfig.wechatPage,
        // 当前的页面
        currenPage: null,
        // 全屋定制还是悟空快装
        categoryList: enums.categories,
        category:null,
        // 当前的广告位的数据
        currentBanner: null,
        // 图片基础地址
        fileUrl: DSP.globalConfig.fileBaseUrl,
        // 当前展示图的下标
        currentIndex: 0,
        // 可修改的数据
        currenItem: null,
        currentBannerIndex: 0,
        // 是否预览
        previewBanner: null,
        dad:{
            ext: null,
            imageMd5: null,
            imageUrl: null,
            reduceUrl: null,
            name: null,
            size: null
        },
		productList: null,
		tagPram: null,
		tagTypeDESIGN: DSP.tagTypeDESIGN
    },
    computed: {},
    methods: {
        // 点击tab获取当前最新的category
        getCurrentCategory(key){
            this.category = key;
            this.currenPage = this.pageTypes[key][0];
            this.getBanner(this.pageTypes[key][0]);
        },
        // 点击页面，获得当前页面模拟效果和相关广告
        getBanner(item){
            var that =this;
            that.currenPage = item;
            that.currentIndex = 0;
            that.currentBanner = null;
            that.currenItem = null;
            that.currenPage.banners.forEach(function (ban, i) {
                that.getBannerDetail(ban, i);
            });
        },
        // 获得指定group的广告
        getBannerDetail(ban, i, n){
            var that =this;
            var url =  `/api/wechat/admin/banner/get/info/group?group=${ban.group}`;
            axios.get(url).then((response) => {
                if(response.success){
                    var arr = [];
                    response.data.forEach(function (item, index) {
                        var obj = {
                            city:item.administrativeRegions && item.administrativeRegions.split(',') || [],
                            id: item.id,
                            onclickUrl: item.onclickUrl,
                            onclickParams: item.onclickParams,
                            group: item.group,
                            imageUrl: item.imageUrl,
                            sorted: item.sorted,
                            wechatImage: {
                                ext: item.ext,
                                imageMd5: item.imageMd5,
                                imageUrl: item.imageUrl,
                                reduceUrl: item.reduceUrl,
                                name: item.name,
                                size: item.size
                            }
                        };
                        arr[index] = obj;
                    });
                    // previewBanner
                    that.$set(that.currenPage.banners[i], 'previewBanner', arr[0] && arr[0].imageUrl);
                    that.$set(that.currenPage.banners[i], 'groupDetails', arr);
                    if(n != null){
                        that.currentBanner = JSON.parse(JSON.stringify(that.currenPage.banners[i]));
                        that.currenItem = JSON.parse(JSON.stringify(that.currenPage.banners[i].groupDetails[n]));
                        if(!that.currenItem.targetApp){
                            that.currenItem.targetApp = that.category;
                        }
                        console.log(that.currenItem ,10000);
                    }
                }
            }).catch(err => {
                console.error(err);
            });
        },
        // 点击指定位置的广告，去展示该广告位的编辑页面
        editBanner(banner, i){
            var that = this;
            // 当前广告位的数据
            that.currentBanner = JSON.parse(JSON.stringify(banner));
            that.currentBannerIndex = i;
            that.currentIndex = 0;
            that.currenItem = JSON.parse(JSON.stringify(that.currentBanner.groupDetails[that.currentIndex] || null));
            if(!that.currenItem.targetApp){
                that.currenItem.targetApp = that.category;
            }
            console.log(that.currenItem ,10002);
            if (that.currenItem && that.currenItem.onclickUrl && (that.currenItem.onclickUrl === '/pages/design/listBytag/main')) {
				var arr = [];
				var el = DSP.tags.tags.find(ele => ele.code === that.currenItem.onclickParams);
				arr[0] = el && el.type;
				arr[1] = that.currenItem.onclickParams;
				that.tagPram = arr;
				console.log(el);
				console.log(that.tagPram);
			}
            if(that.currentBanner.groupDetails.length === 0){
                that.plusItem();
            }
        },
        // 修改指定广告位的指定下标的图片
        editItem(item, index) {
            var that = this;
            that.currentIndex = index;
            that.currenItem = JSON.parse(JSON.stringify(item));
            console.log(that.currenItem ,10001);
            if (that.currenItem.onclickUrl === '/pages/design/listBytag/main') {
            	var arr = [];
				var el = DSP.tags.tags.find(ele => ele.code === that.currenItem.onclickParams);
				arr[0] = el && el.type;
				arr[1] = that.currenItem.onclickParams;
            	that.tagPram = arr;
                console.log(that.tagPram ,111);
            }
        },
        // 增加广告张数
        plusItem(){
            var that = this;
            var sort = that.currentBanner.groupDetails[0] && that.currentBanner.groupDetails[0].sorted || 0;
            var obj = {
                onclickUrl: null,
                onclickParams: null,
                group: that.currentBanner.group,
                imageUrl: null,
                sorted: sort + 4,
                wechatImage: {
                    ext: null,
                    imageMd5: null,
                    imageUrl: null,
                    reduceUrl: null,
                    name: null,
                    size: null
                }
            };
            that.currenItem = JSON.parse(JSON.stringify(obj));
            console.log(that.currenItem ,10003);
            that.currentBanner.groupDetails.unshift(obj);
            that.currentIndex = 0;
        },
        // 删除指定广告位的某个图片
        deleteIndexImage(item, index) {
            var that = this;
			this.$confirm(`确定删除此广告吗?`, '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				// 新增的未添加到后台的
				if(!item.id){
					// that.currentBanner.groupDetails.push(obj);
					that.currentBanner.groupDetails.splice(index,1);
					if(that.currentBanner.groupDetails.length) {
						that.currentIndex = 0;
						that.currenItem = JSON.parse(JSON.stringify(that.currentBanner.groupDetails[that.currentIndex]));
					}else {
						that.currentIndex = 0;

						that.currenPage.banners[that.currentBannerIndex].previewImage = null;
					}
					var curenD = JSON.parse(JSON.stringify(that.currentBanner.groupDetails));
					that.$set(that.currenPage.banners[that.currentBannerIndex], 'groupDetails', curenD);
					// that.currenPage[that.currentBannerIndex] = ;
					return;
				}
				var url =  `/api/wechat/admin/banner/drop?id=${item.id}`;
				axios.delete(url).then((response) => {
					if(response.success){
						that.currentBanner.groupDetails.splice(index,1);
						if(that.currentBanner.groupDetails.length) {
							that.currentIndex = 0;
							that.currenItem = JSON.parse(JSON.stringify(that.currentBanner.groupDetails[that.currentIndex]));
						}else {
							that.currentIndex = 0;
							// that.currenItem = null;
							var obj =  {
								onclickUrl: null,
								onclickParams: null,
								group: that.currentBanner.group,
								imageUrl: null,
								sorted: 1,
								wechatImage: {
									ext: null,
									imageMd5: null,
									imageUrl: null,
									reduceUrl: null,
									name: null,
									size: null
								}
							};
							that.currenItem = JSON.parse(JSON.stringify(obj));
							that.currentBanner.groupDetails.unshift(obj);
						}
						var curenD = JSON.parse(JSON.stringify(that.currentBanner.groupDetails));
						that.$set(that.currenPage.banners[that.currentBannerIndex], 'groupDetails', curenD);

					}
				}).catch(err => {
					console.error(err);
				});

			});

        },
        //    封面上传
        handleAvatarSuccess(res, file) {
            var that = this;
            if(res.success){
                that.currenItem.imageUrl = res.data.relativePath;
                that.currenItem.wechatImage.ext = res.data.fileExt;
                that.currenItem.wechatImage.imageMd5 = res.data.md5;
                that.currenItem.wechatImage.imageUrl = res.data.relativePath;
                that.currenItem.wechatImage.name= res.data.realFileName;
                that.currenItem.wechatImage.reduceUrl = res.data.ghostRelativePath;
                that.currenItem.wechatImage.size = file.size;
            }
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
            const isLt200kb = file.size / 1024 < 200;
            if (!isJPG) {
                this.$message.error('上传广告图片只能是 JPG / png格式!');
            }
            if (!isLt200kb) {
                this.$message.error('上传图片大小不能超过 200kb!');
            }
            return isJPG && isLt200kb;
        },
        // 保存并发布按钮点击(增加)
        saveAndSubmit() {
            var that = this;
            var url = `/api/wechat/admin/banner/add`;
            var item = JSON.parse(JSON.stringify(that.currenItem));
            // var height = this.$refs[that.currenItem.imageUrl].height;
            // var height_tip = that.currentBanner.sizeHeight/2;
            // if((that.currentBanner.group === 'INDEX_HEAD' || that.currentBanner.group === 'WUKONG_HEAD') && height !== height_tip){
            //     that.$message.warning('图片格式必须为' + that.currentBanner.sizeWidth + 'px*' + that.currentBanner.sizeHeight + 'px');
            //     return;
            // }
            if(item.city && Array.isArray(item.city) && item.city.length > 0){
                item.administrativeRegions = item.city.join(',');
            }
            console.log(item);
            // if (1===1){return;}
            delete item.imageUrl;
            axios.post(url, item).then((response) => {
                that.$message.success('保存并发布此广告成功！');
                if(that.currentBanner.groupDetails.length == 1){
                    var ie = JSON.parse(JSON.stringify(that.currenItem));
                    var arr = [
                        ie
                    ];
                    that.$set(that.currentBanner, 'groupDetails', arr);
                    that.$set(that.currenPage.banners[that.currentBannerIndex], 'previewBanner', that.currenItem.imageUrl);

                }else {
                    that.currentBanner.groupDetails[that.currentIndex] = JSON.parse(JSON.stringify(that.currenItem));
                }
                var curenD = JSON.parse(JSON.stringify(that.currentBanner.groupDetails));
                that.$set(that.currenPage.banners[that.currentBannerIndex], 'groupDetails', curenD);
                that.getBannerDetail(that.currenPage.banners[that.currentBannerIndex], that.currentBannerIndex, that.currentIndex);
            }).catch(err => {
                console.error(err);
            });
        },
        // 修改并保存按钮点击
        editAndSubmit() {
            var that = this;
            var url = '/api/wechat/admin/banner/update/id';
            var item = JSON.parse(JSON.stringify(that.currenItem));
            // var height = this.$refs[that.currenItem.imageUrl].height;
            // var height_tip = that.currentBanner.sizeHeight/2;
            // if((that.currentBanner.group === 'INDEX_HEAD' || that.currentBanner.group === 'WUKONG_HEAD') && height !== height_tip){
            //     that.$message.warning('图片格式必须为' + that.currentBanner.sizeWidth + 'px*' + that.currentBanner.sizeHeight + 'px');
            //     return;
            // }
            delete item.imageUrl;
            if(item.city && Array.isArray(item.city) && item.city.length > 0){
                item.administrativeRegions = item.city.join(',');
            }
            console.log(item);
            // if (1===1){return;}
            axios.put(url, item).then((response) => {
                that.$message.success('修改并保存此广告成功！');
                that.currentBanner.groupDetails[that.currentIndex] = JSON.parse(JSON.stringify(that.currenItem));
                var curenD = JSON.parse(JSON.stringify(that.currentBanner.groupDetails));
                that.$set(that.currenPage.banners[that.currentBannerIndex], 'groupDetails', curenD);
            }).catch(err => {
                console.error(err);
            });
        },
        // 图片更改的整理
        bannerChange(val) {
            var that = this;
			that.currenItem.onclickParams = null;
			that.tagPram = null;
        },
        onclickParams() {
            var that = this;
            that.previewBanner = that.currentBanner;
        },
        // 预览图片
        previewImage() {
            var that = this;
            that.currenPage.banners[that.currentBannerIndex].previewBanner = that.currenItem.imageUrl;
        },
        // 更改排序
        changeOrder1(direct, item, index) {
            var that = this;
            var url = '/api/wechat/admin/banner/update/id';
            // var index
            if(direct === 'right') {
                that.currentBanner.groupDetails.splice(index,1);
                that.currentIndex = index + 1;
                //确定排序值
                var next_n = that.currentBanner.groupDetails[index].sorted;
                var next_n1 = that.currentBanner.groupDetails[index + 1] && that.currentBanner.groupDetails[index + 1].sorted;
                that.currenItem.sorted = (next_n + (next_n1 || 0))/2;
                var currenItem = JSON.parse(JSON.stringify(that.currenItem));
                if(index + 1 === that.currentBanner.groupDetails.length){
                    that.currentBanner.groupDetails.push(currenItem);
                } else {
                    that.currentBanner.groupDetails.splice(index + 1, 0, currenItem);
                }
            } else {
                that.currentBanner.groupDetails.splice(index,1);
                that.currentIndex = index - 1;
                // 确定排序值
                var last_n = that.currentBanner.groupDetails[index - 1].sorted;
                var last_n1 = that.currentBanner.groupDetails[index - 2] && that.currentBanner.groupDetails[index -2].sorted;
                that.currenItem.sorted = (last_n + (last_n1 || last_n + 1))/2;
                let currenItem = JSON.parse(JSON.stringify(that.currenItem));
                that.currentBanner.groupDetails.splice(index - 1, 0, currenItem);
            }
            that.editAndSubmit();
        },
        changeOrder(direct, item, index) {
            var that = this;
            var arr = [];
            that.currentBanner.groupDetails.forEach(function (group, i) {
                arr.push(group.id);
            });
            var id = arr[index];
            arr.splice(index, 1);
            if(direct === 'right') {
                that.currentIndex = index + 1;
                if(index + 1 === arr.length){
                    arr.push(id);
                } else {
                    arr.splice(index + 1, 0, id);
                }
            } else {
                that.currentIndex = index - 1;
                arr.splice(index - 1, 0, id);
            }

            var ids = arr.join(',');

            var url =  `/api/wechat/admin/banner/adjust/order?ids=${ids}`;
            axios.put(url).then((response) => {
                if(response.success){
                    // that.$message.success('');
                    that.getBannerDetail(that.currenPage.banners[that.currentBannerIndex], that.currentBannerIndex, that.currentIndex);
                }
            }).catch(err => {
                console.error(err);
            });
        },
		//    选择标签
		changeTag(tag){
			let that = this;
			that.currenItem.onclickParams = tag && tag[1];
			console.log(tag);
			// if(tag && tag[1]){
			// 	tag = self.mata.tagsTrue.find(el => {return el.id === tag[1];});
			// 	self.information.btnOnclickParams = tag.code;
			// }
		}
    },
    created: function () {
        var that =this;
        if(DSP.xcx[0]){
            that.category = DSP.xcx[0] && DSP.xcx[0].uniqueCode;
            // tab.map(el => {
            //     that.$set(that.query,el.uniqueCode,JSON.parse(JSON.stringify(that.templateQuery)))
            // })
        }else {
            that.$message('你无此操作权限，请联系管理员');
            return;
        }
        var item = DSP.globalConfig.wechatPage.DESIGN[0];
        that.currenPage = item;
        that.getBanner(item);
	}
});
