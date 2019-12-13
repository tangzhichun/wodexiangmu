<template>
    <div :id="mapId" class="map"></div>
</template>

<script>
    export default {
        props: {
            addr: String,          //初始点可变化
            addrs: Array,
            points: Array,           //[[x1, y1], [x2, y2]]
            options: Array,         //[{point:[x1, y1], window:{header: '', body:'', width:''}}, ...]

        },
        data() {
            return {
                mapId: Math.random().toString(36).substr(3),
                map: null,
                geo: null,
                defaultPoint: new BMap.Point(116.404, 39.915),      //北京市
                defaultZoom: 9,
                minZoom: 9,
                maxZoom: 16,
                style: 'googlelite', //grayscale/googlelite
                enableAnimation: false,
                clearTime: new Date().getTime(),

                overlays:[],
                markers:[],
                invalidAddr:[
                    {lng:'116.413387',lat:'39.910924',addr:'北京市'},             //北京市
                    {lng:'116.422397',lat:'39.934828',addr:'北京市东城区'},       //北京市东城区
                    {lng:'116.372514' ,lat:'39.918125' ,addr:'北京市西城区'},       //北京市西城区
                    {lng:'116.449562',lat:'39.926373',addr:'北京市朝阳区'},       //北京市朝阳区
                    {lng:'116.292404' ,lat:'39.864938',addr:'北京市丰台区'},       //北京市丰台区
                    {lng:'116.229612',lat:'39.911353',addr:'北京市石景山区'},     //北京市石景山区
                    {lng:'116.305438',lat:'39.965488',addr:'北京市海淀区'},       //北京市海淀区
                    {lng:'116.107604',lat:'39.946148',addr:'北京市门头沟区'},     //北京市门头沟区
                    {lng:'116.149447',lat:'39.754327',addr:'北京市房山区'},     //北京市房山区
                    {lng:'116.661427',lat:'40.136352',addr:'北京市顺义区'},       //北京市顺义区
                    {lng:'116.237616',lat:'40.226413',addr:'北京市昌平区'},       //北京市昌平区
                    {lng:'116.348628',lat:'39.732555' ,addr:'北京市大兴区'},       //北京市大兴区
                    {lng:'116.638386',lat:'40.322618',addr:'北京市怀柔区'},       //北京市怀柔区
                    {lng:'117.127378',lat:'40.146949',addr:'北京市平谷区'},       //北京市平谷区
                    {lng:'116.849551',lat:'40.382175',addr:'北京市密云区'},       //北京市密云区
                    {lng:'115.981635',lat:'40.462171',addr:'北京市延庆区'},       //北京市延庆区
                    {lng:'116.663413',lat:'39.916019',addr:'北京市通州区'},       //北京市通州区
                    {lng:'117.20952',lat:'39.093669' ,addr:'天津市'},                     //天津市
                    {lng:'117.221467',lat:'39.12339',addr:'天津市和平区'},               //天津市和平区



                    //TODO 一下地址的坐标有误差，需要重新矫正
                    {lng:'117.261693',lat:'39.126626',addr:'天津市河东区'},               //天津市河东区
                    {lng:'117.236165',lat:'39.084494',addr:'天津市河西区'},               //天津市河西区
                    {lng:'117.162728',lat:'39.116987',addr:'天津市南开区'},               //天津市南开区
                    {lng:'117.220297',lat:'39.173149',addr:'天津市河北区'},               //天津市河北区
                    {lng:'117.162217',lat:'39.170621',addr:'天津市红桥区'},               //天津市红桥区
                    {lng:'117.414782',lat:'39.139605',addr:'天津市东丽区'},               //天津市东丽区
                    {lng:'117.126201',lat:'39.035065',addr:'天津市西青区'},               //天津市西青区
                    {lng:'117.39291' ,lat:'38.969791',addr:'天津市津南区'},               //天津市津南区
                    {lng:'117.180606',lat:'39.259131',addr:'天津市北辰区'},               //天津市北辰区
                    {lng:'117.034578',lat:'39.457043',addr:'天津市武清区'},               //天津市武清区
                    {lng:'117.411421',lat:'39.615544',addr:'天津市宝坻区'},               //天津市宝坻区
                    {lng:'117.646286',lat:'39.059177',addr:'天津市滨海新区'},             //天津市滨海新区
                    {lng:'117.631236',lat:'39.390422',addr:'天津市宁河区'},               //天津市宁河区
                    {lng:'116.986825',lat:'38.837511',addr:'天津市静海区'},               //天津市静海区
                    {lng:'117.441159',lat:'40.009614',addr:'天津市蓟州区'},                 //天津市蓟州区
                ],
            };
        },
        methods: {
            //地图初始化
            init() {
                let self = this;

                // 创建地址解析器实例
                self.map = new BMap.Map(self.mapId, {
                    minZoom: self.minZoom,
                    maxZoom: self.maxZoom,
                    enableMapClick: false
                });
                self.map.addControl(new BMap.NavigationControl({anchor: BMAP_ANCHOR_TOP_RIGHT, type: BMAP_NAVIGATION_CONTROL_ZOOM}));
                //开启鼠标滚轮缩放
                // self.map.enableScrollWheelZoom(true);
                self.map.setMapStyle({style:self.style});
                self.map.centerAndZoom(self.defaultPoint, self.defaultZoom);

                self.geo = new BMap.Geocoder();
            },
            markAddr(val) {
                let self = this;

                if(!val && self.points && self.points.length ==1 && self.points[0] && self.points[0][0] && self.points[0][0] !==0 && self.points[0] && self.points[0][1] && self.points[0][1] !==0 ){
                    var point = new BMap.Point(self.points[0][0],self.points[0][1]);  // 创建点坐标
                    self.map.centerAndZoom(point, 11);
                    self.map.addOverlay(new BMap.Marker(point));
                    return;
                }
                val = val || self.addr;

                if (val) {
                    let options = {
                        onSearchComplete: function(results){
                            // 判断状态是否正确
                            if (self.local.getStatus() == BMAP_STATUS_SUCCESS){
                                console.debug("地图查询结果: %s 的查询结果集为 %o", val, results);

                                if (results.getCurrentNumPois() > 0) {
                                    let point = results.getPoi(0).point;

                                    if (point) {
                                        console.debug("地图查询结果: %s 的坐标为 %o", val, point);
                                        self.map.centerAndZoom(point, 11);
                                        self.map.addOverlay(new BMap.Marker(point));

                                        let po = self.invalidAddr.find(els =>{return (els.lat ==point.lat && els.lng == point.lng);});
                                        let result = po || point;
                                        self.$emit('update:result', result);
                                        return;
                                    }

                                } else {
                                    console.warn("地图查询失败: %s 的查无结果", val);
                                    self.$emit('update:result', null);
                                }

                            } else {
                                console.warn("地图查询失败: %s 的查询结果为 %o", val, self.local.getStatus());
                                self.$emit('update:result', null);
                            }
                        }
                    };
                    self.local = new BMap.LocalSearch(self.map, options);
                    self.local.search(val);
                }
            },
            markPoints(val) {
                let self = this;
                let points = val || self.points || [];
                // 将多个点加到地图里面
                for (let i = 0; i < points.length; i++) {
                    // 创建标注
                    let info = points[i][2];
                    let mapPoint = new BMap.Point(points[i][0], points[i][1]);
                    let marker = new BMap.Marker(mapPoint);
                    if (self.enableAnimation) {
                        //跳动的动画
                        marker.setAnimation(BMAP_ANIMATION_BOUNCE);
                    }

                    if (info && info.header && info.body) {
                        marker.addEventListener("click", function (e) {
                            var opts = {
                                width: info.width || 250,
                                // height: info.height || 80,
                                title: info.header,
                                enableMessage: true//设置允许信息窗发送短息
                            };
                            var infoWindow = new BMap.InfoWindow(info.body, opts);
                            self.map.openInfoWindow(infoWindow, mapPoint);
                        });
                    }

                    self.markers.push({
                        point: [points[i][0], points[i][1]],
                        marker: marker
                    });

                    self.map.addOverlay(marker);
                }
            },
            applyOptions(val) {
                let self = this;
                let options = val || self.options || [];
                //构建信息窗口加点
                let obj = {
                    a:function (mapPoint,marker,task) {
                        if (self.enableAnimation) {
                            //跳动的动画
                            marker.setAnimation(BMAP_ANIMATION_BOUNCE);
                        }
                        self.markers.push({
                            id: task.id,
                            point:[mapPoint.lng,mapPoint.lat],
                            marker: marker
                        });
                        // 创建信息窗口
                        let windowOption = task.window;
                        if (windowOption && windowOption.header && windowOption.body) {
                            marker.addEventListener("click", function (e) {
                                let infoWindow = new BMap.InfoWindow(windowOption.body, {
                                    width: windowOption.width || 300,
                                    // height: windowOption.height || 80,
                                    title: windowOption.header,
                                    enableMessage: true//设置允许信息窗发送短息
                                });
                                self.map.openInfoWindow(infoWindow, mapPoint);
                            });
                        }
                        self.map.addOverlay(marker);
                    }
                };

                let clearTime = self.clearTime;

                // 将多个点加到地图里面
                for (let i = 0; i < options.length; i++) {
                    if(options[i].point[0] == 0 && options[i].point[1] == 0 && options[i].point[2]) {//解析地址

                        let val = options[i].point[2];


                        let localSearchOptions = {
                            onSearchComplete: function(results) {
                                if (clearTime < self.clearTime) {
                                    //地图已经被清空，查询结果不再打点
                                    return;
                                }

                                // 判断状态是否正确
                                if (local.getStatus() == BMAP_STATUS_SUCCESS){
                                    console.debug("地图查询结果: %s 的查询结果集为 %o", val, results);

                                    if (results.getCurrentNumPois() > 0) {
                                        let point = results.getPoi(0).point;

                                        if (point) {
                                            console.debug("地图查询结果: %s 的坐标为 %o", val, point);

                                            let mapPoint = new BMap.Point(point.lng, point.lat);
                                            let marker = new BMap.Marker(point);
                                            obj.a(mapPoint,marker,options[i]);
                                        }

                                    } else {
                                        console.warn("地图查询失败: %s 的查无结果", val);

                                        let marker = new BMap.Marker(self.defaultPoint);
                                        obj.a(self.defaultPoint, marker, options[i]);
                                    }

                                } else {
                                    console.warn("地图查询失败: %s 的查询结果为 %o", val, local.getStatus());

                                    let marker = new BMap.Marker(self.defaultPoint);
                                    obj.a(self.defaultPoint, marker, options[i]);
                                }
                            }
                        };
                        let local = new BMap.LocalSearch(self.map, localSearchOptions);
                        local.search(val);

                    } else {//不必解析
                        let mapPoint = new BMap.Point(options[i].point[0], options[i].point[1]);
                        let marker = new BMap.Marker(mapPoint);
                        obj.a(mapPoint,marker,options[i]);
                    }
                }
            },


            //聚焦某个标记点，并弹出信息窗口
            openInfoWindowByPoint(point) {
                let self = this;

                if (!point || !point.length || point.length != 2) {
                    return;
                }

                let m = self.markers.find(marker => {
                    return marker.point[0] == point[0] && marker.point[1] == point[1];
                });

                if (m && m.marker) {
                    //聚焦，置位地图中心
                    self.map.centerAndZoom(new BMap.Point(point[0], point[1]), self.defaultZoom);

                    //触发点击事件，弹出信息窗口
                    var e = document.createEvent("MouseEvents");
                    e.initEvent("click", true, true);
                    m.marker.dispatchEvent(e);
                }
            },
            //聚焦某个标记点，并弹出信息窗口
            openInfoWindowById(id,zoom) {
                let self = this;

                if (!id) {
                    return;
                }

                let m = self.markers.find(marker => {
                    return marker.id == id;
                });

                zoom = zoom ? (zoom === self.defaultZoom ? 12 : zoom) : zoom;

                if (m && m.marker && m.point) {
                    //聚焦，置位地图中心
                    self.map.centerAndZoom(new BMap.Point(m.point[0], m.point[1]), zoom || self.defaultZoom);

                    //触发点击事件，弹出信息窗口
                    var e = document.createEvent("MouseEvents");
                    e.initEvent("click", true, true);
                    m.marker.dispatchEvent(e);
                }
            },
            closeInfoWindow() {
                this.map.closeInfoWindow();
            },
            getZoom() {
                let zoom = this.map.getZoom();
                return zoom;
            }
        },
        watch: {
            'addr'(newVal, oldVal) {
                this.clearTime = new Date().getTime();
                this.map.clearOverlays();
                this.markAddr(newVal);
            },
            'points'(newVal, oldVal) {
                if (oldVal && oldVal.length) {
                    this.clearTime = new Date().getTime();
                    this.map.clearOverlays();
                }
                this.markPoints(newVal);
            },
            'options':{
                handler(newVal, oldVal) {
                    console.debug('map options changed to:%o', newVal);
                    if (oldVal && oldVal.length) {
                        this.clearTime = new Date().getTime();
                        this.map.clearOverlays();
                    }
                    this.applyOptions(newVal);
                },
                deep:true
            }
        },
        mounted() {
            let self = this;
            self.init();
            self.markAddr();
            self.markPoints();
        }
    }
</script>
<style lang="less">
    .map {
        height: 300px;
        width: 300px;
    }
</style>