<template>
    <div class="dsp-list-criteria" v-if="Object.keys(criteria).length <= sizeLimit">
        <div class="criteria-wrap"
             :key="key"
             v-for="key of Object.keys(criteria)"
             v-if="criteria[key] && criteria[key].prop">

            <el-tag class="criteria-tag"
                    closable
                    :disable-transitions="false"
                    @close="removeCriteria(key)">
                {{criteria[key].prop}}：{{ criteria[key].value }}
            </el-tag>
        </div>
    </div>
    <div class="dsp-list-criteria" v-else>
        <div class="criteria-group">
            <div class="criteria-group_desc">
                <div class="brief-text">{{Object.keys(criteria).map(key => {return criteria[key].prop;}).join('、') }}</div>
                <div class="brief-length">等{{Object.keys(criteria).length}}项</div>
                <i class="el-icon-arrow-down"></i>
            </div>
            <ul class="criteria-group_dropdown">
                <li class="criteria-group_item" v-for="key in Object.keys(criteria)">
                    <div class="criteria-group_item-text">
                        <span class="criteria-prop">{{criteria[key].prop}}：</span>
                        {{ criteria[key].value }}
                    </div>
                    <i class="el-icon-close" @click="removeCriteria(key)"></i>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        criteria: Object,
        size: Number
    },
    data() {
        return {
            sizeLimit: this.size || 3,
        }
    },
    methods: {
        removeCriteria(key) {
            console.debug('remove ', key);
            this.$emit('remove', key);
        },
    },
    watch: {
        'criteria': {
            handler: function (newVal, oldVal) {
                console.debug('criteria value changed :', newVal);
                this.criteria = newVal;
            },
            deep: true
        },
    },
    created() {
        console.debug(this.criteria);
    }
}
</script>