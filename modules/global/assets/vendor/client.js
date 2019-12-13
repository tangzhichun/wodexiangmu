window.onload=function(){
	var str = window.location.href;
	if (wx){
		// 处理案例参数
		function urlParam (url) {
			let obj = {};
			let reg = /[?&][^?&]+=[^?&]+/g;
			let arr = url.match(reg);
			if (arr) {
				arr.forEach((item) => {
					let tempArr = item.substr(1).split('=');
					let key = decodeURIComponent(tempArr[0]);
					let val = decodeURIComponent(tempArr[1]);
					obj[key] = val;
				});
			}
			return obj;
		}
		var PARAMS = urlParam(str);
		console.log(PARAMS);
		// 判断是智能漫游，还是普通漫游
		var fullscreenable = document.querySelector('.fullscreenable .pano-viewer');
		console.log(fullscreenable);
		if (fullscreenable) {
			// 智能漫游
			// 创建一个容齐储存三个按钮
			let menus = document.createElement('div');
			menus.classList.add('full-all-menu');
			document.body.appendChild(menus);

			// todo 创建 - 分享按钮
			let share = document.createElement('div');
			share.classList.add('full-menu-share', 'full-menu');
			share.innerHTML = '<div class="full_client_button_share"></div><div class="desc">分享</div>';
			share.addEventListener('click',function (e) {
				console.log('这是share的点击事件');
				if (PARAMS.realmNo) {
					wx.miniProgram.navigateTo({ url: '/pages/design/share/main?realmNo=' + PARAMS.realmNo});
				} else {
					var str = window.location.href;
					console.log(str);
					var ur = str.split('?');
					var arr = ur[0].split('/');
					// 获取id
					var id;
					if (PARAMS.designId) {
						id = PARAMS.designId;
					} else {
						id = arr[arr.length - 1] === 'show'  || arr[arr.length - 1] === 'airoaming' ? arr[arr.length - 2] : arr[arr.length - 1];
					}
					console.log('id取' + id);
					var enURL = encodeURIComponent(str);
					console.log('/pages/design/share/main?id=' + id + '&url=' + enURL);
					wx.miniProgram.navigateTo({ url: '/pages/design/share/main?id=' + id + '&url=' + enURL});
				}
			});
			menus.insertBefore( share, menus.children[0] );

			// todo 创建元素-更多按钮
			let more = document.createElement('div');
			more.classList.add('full-menu-more', 'full-menu');
			more.innerHTML = '<div class="full_client_button_more"></div><div class="desc">更多</div>';
			// 给更多按钮添加点击事件
			more.addEventListener('click',function (e) {
				console.log('这是更多按钮的点击事件');
				// 更多的下拉菜单
				var side = document.querySelector('.client-more-mask.hiden');
				side.classList.remove('hiden');
				// 隐藏工具和户型的容器
				let alMenu = document.querySelector('.main-button-list');
				alMenu.classList.add('hiden');
				// 隐藏更多分享和免费设计的按钮
				var butts = document.querySelector('.full-all-menu');
				butts.classList.add('hiden');
				// 隐藏工具弹框
				var toolsButton = document.querySelector('.pano-viewer-drawer.more-tools-drawer');
				toolsButton.classList.add('hiden');

			});
			// 插入底排父元素内
			menus.insertBefore( more, menus.children[0] );

			// todo 创建元素-免费设计
			let newBtn = document.createElement('div');
			newBtn.innerHTML = "免费设计";
			newBtn.classList.add("full-menu-appoint");
			// 给-免费设计按钮添加事件
			newBtn.addEventListener('click',function (e) {
				console.log('这是免费设计full-menu-appoint的点击事件');
				wx.miniProgram.getEnv(function (res) {
					console.log(res.miniprogram)
				});
				let kind = PARAMS.kind ?  'measureWK' : 'measure';
				let ul = PARAMS && PARAMS.id ? '/pages/appointment/' + kind + '/main?id=' + PARAMS.id : '/pages/appointment/' + kind + '/main';
				wx.miniProgram.navigateTo({ url: ul});
			});
			//免费设计的元素添加到底部父元素
			menus.insertBefore(newBtn, menus.children[0]);

			var moreMask = document.createElement('div');
			moreMask.classList.add('client-more-mask', 'hiden');
			moreMask.innerHTML = '<div class="more_content"><div class="client_more_item more_design">查看更多设计</div><div class="client_more_item more_price">查看报价</div><div class="client_more_item back_home">返回首页</div></div>';
			// 如果有设计师
			if (PARAMS.designer) {
				moreMask.innerHTML = '<div class="more_content"><div class="client_more_item more_design">查看更多设计</div><div class="client_more_item more_designer">查看设计师</div><div class="client_more_item more_price">查看报价</div><div class="client_more_item back_home">返回首页</div></div>';
			}
			if (!PARAMS.realmNo) {
				moreMask.innerHTML = '<div class="more_content"><div class="client_more_item more_design">查看更多设计</div><div class="client_more_item back_home">返回首页</div></div>';
			}
			// 当局部翻新，仅有查看报价和返回首页
			if (PARAMS.kind) {
				moreMask.innerHTML = '<div class="more_content"><div class="client_more_item more_price">查看报价</div><div class="client_more_item back_home">返回首页</div></div>';
			}
			document.body.appendChild(moreMask);
			// 页面弹层
			var mask = document.querySelector('.client-more-mask');
			mask.addEventListener('click',function (e) {
				console.log('页面弹层123');
				var side = document.querySelector('.client-more-mask');
				side.classList.add('hiden');
				let alMenu = document.querySelector('.main-button-list.hiden');
				console.log(alMenu);
				// 去掉工具和户型的容器的隐藏
				if (alMenu) {
					alMenu.classList.remove('hiden');
				}
				// 去掉更多分享和免费设计的按钮的隐藏
				var butts = document.querySelector('.full-all-menu.hiden');
				if (butts) {
					butts.classList.remove('hiden');
				}
				// 去掉工具弹框的隐藏
				var toolsButton = document.querySelector('.pano-viewer-drawer.more-tools-drawer.hiden');
				if (toolsButton) {
					toolsButton.classList.remove('hiden');
				}
			});
			// 页面弹层-内容
			var maskContent = document.querySelector('.client-more-mask .more_content');
			maskContent.addEventListener('click',function (e) {
				console.log('页面弹层-内容');
				// var side = document.querySelector('.client-more-mask');
				// side.classList.add('hiden');
				event.stopPropagation();
			});
			// 不是局部翻新的
			if (!PARAMS.kind) {
				// 页面弹层-查看更多设计
				var checkDesign = document.querySelector('.client_more_item.more_design');
				checkDesign.addEventListener('click',function (e) {
					wx.miniProgram.switchTab({ url: '/pages/find/main'});
				});
			}
			if (PARAMS.designer) {
				// 页面弹层-查看设计师
				var checkDesigner = document.querySelector('.client_more_item.more_designer');
				checkDesigner.addEventListener('click',function (e) {
					// 跳到小程序设计师详情页
					wx.miniProgram.navigateTo({ url: '/pages/design/designer/main?id=' + PARAMS.designer});
				});
			}
			if (PARAMS.realmNo) {
				// 页面弹层-查看报价
				var checkPrice = document.querySelector('.client_more_item.more_price');
				checkPrice.addEventListener('click',function (e) {
					// 跳到小程序设计方案详情(产品套餐详情、案例详情)页
					if (PARAMS.kind) {
						var url = '/pages/' + PARAMS.kind + '/detail/main?no=' + PARAMS.realmNo;
						wx.miniProgram.navigateTo({ url: url});
					} else {
						wx.miniProgram.navigateTo({ url: '/pages/design/detail/main?no=' + PARAMS.realmNo});
					}
				});
			}
			// 页面弹层-返回首页
			var backHome = document.querySelector('.client_more_item.back_home');
			backHome.addEventListener('click',function (e) {
				var ul = PARAMS.kind ? '/pages/renovation/main' : '/pages/customization/main';
				wx.miniProgram.switchTab({ url: ul});
			});


			document.body.addEventListener('click',function (e) {
				console.log('智能漫游遮罩部分点击');
			});

		} else {
			// 普通漫游
			document.body.addEventListener('click',function (e) {
				console.log('页面遮罩部分点击');
				// 获取遮幕
				var mask = document.querySelector('.pano-viewer-drawer-wrapper .pano-viewer-drawer-mask');
				var menusAll = document.querySelector('.main-menu.enterprise .menu-bar.clearfix .client_button_home');
				if (mask && !menusAll) {
					var findParent = setInterval(function () {
						var menusP = document.querySelector('.main-menu.enterprise .menu-bar.clearfix');
						// 如果是房间位置的点击取消添加
						var floorplan = document.querySelector('.floorplan-guider');
						if (floorplan) {
							window.clearInterval(findParent);
						}
						console.log('findParent');
						if (menusP) {
							window.clearInterval(findParent);
							// 获取底排父元素
							var menus = document.querySelector('.main-menu.enterprise .menu-bar.clearfix');
							//创建一个免费设计的元素
							var newBtn = document.createElement('div');
							newBtn.innerHTML = "免费设计";
							newBtn.classList.add("client_button_home");
							//免费设计的元素添加到底部父元素
							menus.appendChild(newBtn);
							var bu = document.querySelector('.client_button_home');
							// 给-免费设计按钮添加事件
							bu.addEventListener('click',function (e) {
								console.log('这是client_button_home的点击事件');
								wx.miniProgram.getEnv(function (res) {
									console.log(res.miniprogram)
								});
								var kind = PARAMS.kind ?  'measureWK' : 'measure';
								var ul = PARAMS && PARAMS.id ? '/pages/appointment/' + kind + '/main?id=' + PARAMS.id : '/pages/appointment/' + kind + '/main';
								// alert(ul);
								wx.miniProgram.navigateTo({ url: ul});
							});
							// 创建 - 分享按钮
							var share = document.createElement('div');
							share.classList.add('client_button_share');
							// share.innerHTML = '分享';
							share.addEventListener('click',function (e) {
								console.log('这是share的点击事件');
								if (PARAMS.realmNo) {
									wx.miniProgram.navigateTo({ url: '/pages/design/share/main?realmNo=' + PARAMS.realmNo});
								} else {
									var str = window.location.href;
									console.log(str);
									var ur = str.split('?');
									var arr = ur[0].split('/');
									// 获取id
									var id;
									if (PARAMS.designId) {
										id = PARAMS.designId;
									} else {
										id = arr[arr.length - 1] === 'show' || arr[arr.length - 1] === 'airoaming' ? arr[arr.length - 2] : arr[arr.length - 1];
									}
									console.log('id取' + id);
									var enURL = encodeURIComponent(str);
									console.log('/pages/design/share/main?id=' + id + '&url=' + enURL);
									wx.miniProgram.navigateTo({ url: '/pages/design/share/main?id=' + id + '&url=' + enURL});
								}
							});
							menus.appendChild(share);
							// 创建元素-更多按钮
							var more = document.createElement('div');
							// more.innerHTML = "更多";
							more.classList.add("client_button_more");
							// 插入底排父元素内
							menus.appendChild(more);
							var moreb = document.querySelector('.client_button_more');
							// 给更多按钮添加点击事件
							moreb.addEventListener('click',function (e) {
								console.log('这是更多按钮的点击事件');
								// 更多的下拉菜单
								var side = document.querySelector('.client-more-mask.hiden');
								side.classList.remove('hiden');
								var alMenu = document.querySelector('.main-menu');
								alMenu.classList.add('hiden');
								// event.stopPropagation();
							});
						} else {
							console.log('没有');
						}
					},100);
					setTimeout(function () {
						window.clearInterval(findParent);
					},3000);
				}

			});
			// 获取底排父元素
			var menus = document.querySelector('.main-menu.enterprise .menu-bar.clearfix');
			//创建一个免费设计的元素
			var newBtn = document.createElement('div');
			newBtn.innerHTML = "免费设计";
			newBtn.classList.add("client_button_home");
			//免费设计的元素添加到底部父元素
			menus.appendChild(newBtn);
			var bu = document.querySelector('.client_button_home');
			// 给-免费设计按钮添加事件
			bu.addEventListener('click',function (e) {
				console.log('这是client_button_home的点击事件');
				wx.miniProgram.getEnv(function (res) {
					console.log(res.miniprogram)
				});
				var kind = PARAMS.kind ?  'measureWK' : 'measure';
				var ul = PARAMS && PARAMS.id ? '/pages/appointment/' + kind + '/main?id=' + PARAMS.id : '/pages/appointment/' + kind + '/main';
				// alert(ul);
				wx.miniProgram.navigateTo({ url: ul});
			});
			// 创建 - 分享按钮
			var share = document.createElement('div');
			share.classList.add('client_button_share');
			// share.innerHTML = '分享';
			share.addEventListener('click',function (e) {
				console.log('这是share的点击事件');
				if (PARAMS.realmNo) {
					wx.miniProgram.navigateTo({ url: '/pages/design/share/main?realmNo=' + PARAMS.realmNo});
				} else {
					var str = window.location.href;
					console.log(str);
					var ur = str.split('?');
					var arr = ur[0].split('/');
					// 获取id
					var id;
					if (PARAMS.designId) {
						id = PARAMS.designId;
					} else {
						id = arr[arr.length - 1] === 'show'  || arr[arr.length - 1] === 'airoaming' ? arr[arr.length - 2] : arr[arr.length - 1];
					}
					console.log('id取' + id);
					var enURL = encodeURIComponent(str);
					console.log('/pages/design/share/main?id=' + id + '&url=' + enURL);
					wx.miniProgram.navigateTo({ url: '/pages/design/share/main?id=' + id + '&url=' + enURL});
				}
			});
			menus.appendChild(share);
			// 创建元素-更多按钮
			var more = document.createElement('div');
			// more.innerHTML = "更多";
			more.classList.add("client_button_more");
			// 插入底排父元素内
			menus.appendChild(more);
			var moreb = document.querySelector('.client_button_more');
			// 给更多按钮添加点击事件
			moreb.addEventListener('click',function (e) {
				console.log('这是更多按钮的点击事件');
				// 更多的下拉菜单
				var side = document.querySelector('.client-more-mask.hiden');
				side.classList.remove('hiden');
				var alMenu = document.querySelector('.main-menu');
				alMenu.classList.add('hiden');
				// event.stopPropagation();
			});
			// 创建 - 更多的下拉菜单（在body即可）
			var moreMask = document.createElement('div');
			moreMask.classList.add('client-more-mask', 'hiden');
			moreMask.innerHTML = '<div class="more_content"><div class="client_more_item more_design">查看更多设计</div><div class="client_more_item more_price">查看报价</div><div class="client_more_item back_home">返回首页</div></div>';
			// 如果有设计师
			if (PARAMS.designer) {
				moreMask.innerHTML = '<div class="more_content"><div class="client_more_item more_design">查看更多设计</div><div class="client_more_item more_designer">查看设计师</div><div class="client_more_item more_price">查看报价</div><div class="client_more_item back_home">返回首页</div></div>';
			}
			if (!PARAMS.realmNo) {
				moreMask.innerHTML = '<div class="more_content"><div class="client_more_item more_design">查看更多设计</div><div class="client_more_item back_home">返回首页</div></div>';
			}
			// 当局部翻新，仅有查看报价和返回首页
			if (PARAMS.kind) {
				moreMask.innerHTML = '<div class="more_content"><div class="client_more_item more_price">查看报价</div><div class="client_more_item back_home">返回首页</div></div>';
			}
			document.body.appendChild(moreMask);
			// 页面弹层
			var mask = document.querySelector('.client-more-mask');
			mask.addEventListener('click',function (e) {
				console.log('页面弹层123');
				var side = document.querySelector('.client-more-mask');
				side.classList.add('hiden');
				var alMenu = document.querySelector('.main-menu.hiden');
				console.log(alMenu);
				if (alMenu) {
					alMenu.classList.remove('hiden');
				}
			});
			// 页面弹层-内容
			var maskContent = document.querySelector('.client-more-mask .more_content');
			maskContent.addEventListener('click',function (e) {
				console.log('页面弹层-内容');
				// var side = document.querySelector('.client-more-mask');
				// side.classList.add('hiden');
				event.stopPropagation();
			});
			// 不是局部翻新的
			if (!PARAMS.kind) {
				// 页面弹层-查看更多设计
				var checkDesign = document.querySelector('.client_more_item.more_design');
				checkDesign.addEventListener('click',function (e) {
					wx.miniProgram.switchTab({ url: '/pages/find/main'});
				});
			}
			if (PARAMS.designer) {
				// 页面弹层-查看设计师
				var checkDesigner = document.querySelector('.client_more_item.more_designer');
				checkDesigner.addEventListener('click',function (e) {
					// 跳到小程序设计师详情页
					wx.miniProgram.navigateTo({ url: '/pages/design/designer/main?id=' + PARAMS.designer});
				});
			}
			if (PARAMS.realmNo) {
				// 页面弹层-查看报价
				var checkPrice = document.querySelector('.client_more_item.more_price');
				checkPrice.addEventListener('click',function (e) {
					// 跳到小程序设计方案详情(产品套餐详情、案例详情)页
					if (PARAMS.kind) {
						var url = '/pages/' + PARAMS.kind + '/detail/main?no=' + PARAMS.realmNo;
						wx.miniProgram.navigateTo({ url: url});
					} else {
						wx.miniProgram.navigateTo({ url: '/pages/design/detail/main?no=' + PARAMS.realmNo});
					}
				});
			}
			// 页面弹层-返回首页
			var backHome = document.querySelector('.client_more_item.back_home');
			backHome.addEventListener('click',function (e) {
				var ul = PARAMS.kind ? '/pages/renovation/main' : '/pages/customization/main';
				wx.miniProgram.switchTab({ url: ul});
			});
		}


	}
};
