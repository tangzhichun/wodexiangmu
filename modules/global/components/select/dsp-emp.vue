<template>
    <!--===============查导购，设计师，纵队长，培育专员，集客人====================-->
    <div>
        <!---->
        <el-select
                :filter-method='remoteMethod'
                filterable
                clearable
                @change="change"
                v-model="employee"
                :size="size"
                :placeholder="placeholder"
                :loading="loading"
                :disabled="disabled"
        >
            <el-option-group
                    :loading="loading"
                    v-if="group "
                    v-for="dataArr in options" :label="dataArr.groupName" :key="dataArr.label">
                <el-option
                        v-for="item in dataArr.data"
                        v-if=" !teamId || (teamId && (teamId ===  item.teamId || (item.team && item.team.type !== 'TROOP_TEAM') ) ) "
                        :key="item.id + '_' + item.positionId"
                        :label="item.name"
                        :value="item.id + '_' + item.positionId">
                    <span class="option-value">{{ item.name }}</span>
                    <span class="option-tip" v-if="valueTip == 'mobile'">{{item.mobile}}</span>
                    <span class="option-tip" v-if="valueTip == 'organization'">{{item.organization && item.organization.name}}</span>
                    <span class="option-tip" v-if="valueTip == 'team'">{{item.team && item.team.name}}</span>
                    <span class="option-tip" v-if="valueTip == 'position'">{{item.position && item.position.name}}</span>
                    <span class="option-tip" v-if="valueTip == 'connectorTeam' && item.connectorTeams && item.connectorTeams.length>0">
                        {{item.connectorTeams | capitalize}}
                    </span>
                    <span class="option-tip" v-if="valueTip == 'teamType'">{{item.team && item.team.type && $translate(TeamTypes,item.team.type) }}</span>
                </el-option>
            </el-option-group>

            <el-option
                    v-if="!group && (!teamId || ( teamId && (teamId ===  item.teamId || (item.team && item.team.type !=='TROOP_TEAM' )) ) )"
                    v-for="item in options"
                    :key="item.id + '_' + item.positionId + '_' + item.orgId"
                    :label="item.name"
                    :value="item.id + '_' + item.positionId">
                <span class="option-value">{{ item.name }}</span>
                <span class="option-tip" v-if="valueTip == 'mobile'">{{item.mobile}}</span>
                <span class="option-tip" v-if="valueTip == 'organization'">{{item.organization && item.organization.name}}</span>
                <span class="option-tip" v-if="valueTip == 'team'">{{item.team && item.team.name}}</span>
                <span class="option-tip" v-if="valueTip == 'connectorTeam'">{{item.connectorTeam && item.connectorTeam.name}}</span>
                <span class="option-tip" v-if="valueTip == 'teamType'">{{item.team && item.team.type && $translate(TeamTypes,item.team.type) }}</span>
            </el-option>
        </el-select>
    </div>
</template>

<script>
    import axios from '@/scripts/module/axios';

    /**
     *  参数type取值：
     *  GUIDE                           导购
     *  GUIDE_TEAM_LEADER               销售纵队长
     *  DESIGNER                        设计师
     *  DESIGNER_TEAM_LEADER            设计纵队长
     *  SHOP_MANAGER                    店经理
     *  FOSTER_COMMISSIONER             培育专员
     *
     *  参数tip取值：
     *  organization                    机构名称
     *  team                            纵队名称
     *  mobile                          手机号
     *  position                        职位名称
     *  connectorTeam                   对接小组
     *  teamType                        对接组类型（销售纵队，设计纵队，结对分布）
     */


    export default {
        props: {
            disabled: Boolean, /*是否禁用*/
            placeholder: String,
            size: String,
            type: String,           /* 类型 */
            value: Object,          /* 初始值 */
            tip: String,            /* 提示语 */

            isDimission:String,              /*是否包含离职员工 */
            org: String,                    /* 所在机构ID，如果有值则按照所在机构ID过滤员工，反之取全部员工 */
            orgRequired: Boolean,           /* 所在机构ID为空时，没有可选项 */
            isTeamEmp: String,              /* 是否在纵队中     组件中用is-team-emp*/
            sogal:String,                       /*设计师专用    true索菲亚结业*/
            schmidt:String,                     /*设计师专用    true司  米结业*/
            milana:String,                      /*设计师专用    true米兰纳结业*/

            dspbrands:String,                      /*设计师专用    参数为： sogal=true&schmidt=true*/
            isConnectorEmp:String,           /* 是否关联对接组查询     组件中用is-connector-emp*/
            isConnector:Boolean,           /* 是否结队查询  true false null*/
            isTroop:String,                  /* 是否属于结队  true false null*/

            teamId:String,                   /*指派设计师时  传入teamId  要 非结队的人 + （结队队人 teamId === teamId） */

            //    2019年3月22日过滤人员 （用于指派）
            filer:String,       // 可填写值 : 社群SQ || 电商DS || 渠道QD || 商超SC || 自然客流ZRKL
        },
        data() {
            return {
                loading:false,
                meta: {
                    FOSTER_COMMISSIONER: '培育专员',
                    GUIDE: '导购',
                    DESIGNER: '设计师',
                    SHOP_MANAGER: '店经理',
                    GUIDE_TEAM_LEADER: '销售纵队长',
                    DESIGNER_TEAM_LEADER: '设计纵队长',
                },
                TeamTypes:[
                    {value: 'SALE_TEAM',  label: '销售纵队'},
                    {value: 'DESIGN_TEAM',label: '设计纵队'},
                    {value: 'TROOP_TEAM', label: '结队分部'},
                    {value: 'BASE_TEAM', label: '大本营'},
                    {value: 'COLUMN_TEAM', label: '纵队'},
                ],
                allData:[],  //所有数据
                options: [], //用于显示的数据
                group: false,

                employee: this.value && this.value.name || '',
                valueTip: this.tip || 'organization',

            }
        },
        methods: {
            methodsFiler(data){
                let self = this;
                return data.map( el => {
                    let arr = [];
                    el.data.map(emp => {
                        if(!emp.team.sources && !emp.connectorTeams ){
                            arr.push(emp)
                        }else if(!emp.team.sources && emp.connectorTeams && emp.connectorTeams.length < 0 ){
                            arr.push(emp)
                        }else if(emp.team.sources && emp.team.sources.length < 1 && !emp.connectorTeams ){
                            arr.push(emp)
                        }else if( emp.connectorTeams && emp.team.sources.length < 1 && emp.connectorTeams.length < 1) {
                            arr.push(emp)
                        }else if ((emp.team.sources.indexOf(self.filer) > -1) ){
                            arr.push(emp)
                        }else if( (!emp.team.sources || emp.team.sources.length < 1 ) && emp.connectorTeams.find(e => {return e.channelSource === self.filer; }) ){
                            arr.push(emp)
                        }
                    });
                    el.data = arr;
                    return el;
                }) ;
            },
            remoteQuery() {
                let self = this;
                if (self.type) {
                    //按标签查询
                    self.group = self.type.split(',').length > 1;
                    let params = '';
                    params += 'label=' + self.type + '&';
                    params += self.org && self.org != '' ? ('orgId=' + self.org + '&') : '';
                    params += self.isTeamEmp ? ('isTeamEmp=' + self.isTeamEmp + '&') : '';
                    params += self.sogal ? ('sogal=' + self.sogal + '&') : '';
                    params += self.schmidt ? ('schmidt=' + self.schmidt + '&') : '';
                    params += self.milana ? ('milana=' + self.milana + '&') : '';
                    params += self.isConnectorEmp ? ('isConnectorEmp=' + self.isConnectorEmp + '&') : '';
                    //是否是新版结队
                    params += self.isConnector ? ('isConnector=false&') : '';
                    //是否包含离职
                    params += self.isDimission ? ('isDimission=' + self.isDimission + '&') : '';
                    //是否结队
                    params += self.isTroop ? ('isTroop=' + self.isTroop + '&') : '';
                    params += self.dspbrands ||  '';
                    let url = '/api/dealer/employee/list/org/position/label?' + params;
                    axios.get(url).then(function (response) {
                        if(response.data && response.success){
                            response.data.forEach(function (ele) {
                                ele.groupName = self.meta[ele.label];
                            });
                            if (self.group) {
                                self.allData = JSON.parse(JSON.stringify( response.data));
                                if(self.filer){
                                    self.allData = self.methodsFiler(self.allData);
                                }
                                self.options = self.allData.map( item =>{
                                    item.data = item.data && item.data.slice(0,50);
                                    return item
                                });
                            } else {
                                self.allData = JSON.parse(JSON.stringify( response.data[0].data));
                                self.options = response.data[0].data.slice(0,50);
                            }
                        }
                    }).catch(error => {
                        self.options = [];
                        console.error(error);
                    });
                } else {
                    self.group = false;
                    let params = self.org && self.org != '' ? ('orgId=' + self.org) : '';
                    params += self.sogal ? ('sogal=' + self.sogal + '&') : '';
                    params += self.schmidt ? ('schmidt=' + self.schmidt + '&') : '';
                    params += self.milana ? ('milana=' + self.milana + '&') : '';
                    //
                    params += self.dspbrands ||  '';

                    let url = '/api/dealer/employee/list/condition?' + params;
                    axios.get(url).then(function (response) {
                        self.allData = JSON.parse(JSON.stringify( response.data));
                        self.options = response.data.slice(0,50);
                    }).catch(error => {
                        self.options = [];
                        console.error(error);
                    });
                }

            },
            change() {
                //值改变传给父元素
                let self = this;

                if (self.employee) {
                    let arr = self.employee.split('_');
                    let items = [];
                    if (self.group) {
                        self.options.forEach(g => {
                            items = items.concat(g.data);
                        });
                    } else {
                        items = items.concat(self.options);
                    }
                    let emp = null;
                    if(this.isDimission){
                        emp = items.find(ele => ele.id == arr[0] );
                    }else {
                        emp = items.find(ele => ele.id == arr[0] && ele.positionId == arr[1]);
                    }
                    self.$emit('update:value', emp);
                } else {
                    self.$emit('update:value', null);
                }
            },
            remoteMethod(query) {
                // let allda = JSON.parse(JSON.stringify(this.allData));
                this.loading = true;
                if(!query.replace(/\s/g,"")){
                    if(this.group){//标签大于1
                        setTimeout(() => {
                            this.loading = false;
                            let allda = JSON.parse(JSON.stringify(this.allData));
                            this.options = allda.map(ele =>{
                                ele.data =  ele.data.slice(0,50);
                                return ele;
                            });
                        }, 200);
                    }else {
                        setTimeout(() => {
                            this.loading = false;
                            let allda = JSON.parse(JSON.stringify(this.allData));
                            this.options = allda.slice(0,50);
                        }, 200);
                    }
                    return ;
                }
                if(this.group){//标签大于1
                    setTimeout(() => {
                        let allda = JSON.parse(JSON.stringify(this.allData));
                        this.loading = false;
                        this.options = allda.map(ele =>{
                            ele.data =  ele.data.filter(item => {
                                return item.name.toLowerCase().indexOf(query.replace(/\s/g,"").toLowerCase()) > -1;
                            }).slice(0,50);
                            return ele;
                        });
                    }, 200);
                }else {
                    setTimeout(() => {
                        this.loading = false;
                        let allda = JSON.parse(JSON.stringify(this.allData));
                        this.options = allda.filter(item => {
                            return (item.name && item.name.toLowerCase().indexOf(query.replace(/\s/g,"").toLowerCase()) > -1) || (item.mobile && (item.mobile.indexOf(query.replace(/\s/g,"")) == 0));
                        }).slice(0,50);
                    }, 200);
                }
            },
        },
        watch: {
            'value'(val, oldVal) {
                if(!this.value){
                    this.employee = null;
                    this.remoteMethod('');
                }
            },
            'org'(val, oldVal) {
                let self = this;
                if (self.orgRequired) {
                    self.allData = [];
                    self.employee = null;
                    self.$emit('update:value', null);
                }
                if (val) {
                    self.remoteQuery();
                }
            },
            'options'(val, oldVal) {
                let self = this;
                if (self.value && !self.value.positionId && !self.value.name) {
                    self.value = val.find(i => i.id === self.value.id);
                    if (self.value) {
                        self.employee = self.value.id + '_' + self.value.positionId;
                    }
                }
            },
        },
        filters: {
            capitalize: function (value) {
                return value.map( el =>{
                    return el.name;
                }).join(',');
            }
        },
        created: function () {
            let self = this;
            if (self.orgRequired) {
                if (self.org) {
                    self.remoteQuery();
                }
            } else {
                self.remoteQuery();
            }
        }
    }
</script>
<style type="text/css">
    .option-value {
        float: left;
    }

    .option-tip {
        float: right; color: #8492a6; font-size: 13px
    }
</style>
