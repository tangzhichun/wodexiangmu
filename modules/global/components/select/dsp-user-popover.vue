<template>
  <span>
    <transition
            :name="transition"
            @after-enter="handleAfterEnter"
            @after-leave="handleAfterLeave">
      <div

              :class="[popperClass, content && 'el-popover--plain']"
              ref="popper"
              v-show="!disabled && showPopper"
              :style="{ width: width + 'px' }"
              role="tooltip"
              :id="tooltipId"
              :aria-hidden="(disabled || !showPopper) ? 'true' : 'false'"
      >
        <div class="el-popover__title" v-if="title" v-text="title"></div>
          <!--<slot>{{ content }}</slot>-->
          <ul class="collection-contain">
            <li class="collection-item" v-for="(user,index) in users"
                @mouseover="activeIndex=index"
                @click="choseUser(index)"
                :class="{active: index === activeIndex}">@{{user.name}}</li>
          </ul>
      </div>
    </transition>
    <slot name="reference"></slot>
  </span>
</template>
<script>
    import Popper from 'element-ui/src/utils/vue-popper';
    import {on, off} from 'element-ui/src/utils/dom';
    import {addClass, removeClass} from 'element-ui/src/utils/dom';
    import {generateId} from 'element-ui/src/utils/util';
    import axios from '@/scripts/module/axios';

    var popover = null;

    export default {
        name: 'ElPopover',

        mixins: [Popper],

        props: {
            trigger: {
                type: String,
                default: 'click',
                validator: value => ['click', 'focus', 'hover', 'manual'].indexOf(value) > -1
            },
            openDelay: {
                type: Number,
                default: 0
            },
            title: String,
            disabled: Boolean,
            content: String,
            reference: {},
            popperClass: String,
            width: {},
            visibleArrow: {
                default: true
            },
            arrowOffset: {
                type: Number,
                default: 0
            },
            transition: {
                type: String,
                default: 'fade-in-linear'
            },

        },
        data() {
            return {
                activeItem: {},
                activeIndex: 0,
                atPosition: null,
                users: [],
                lastTimer: null,
            }
        },

        computed: {
            tooltipId() {
                return `el-popover-${generateId()}`;
            }
        },
        watch: {
            showPopper(val) {
                val ? popover.$emit('show') : popover.$emit('hide');
            }
        },

        mounted() {
            popover = this;
            let reference = popover.referenceElm = popover.reference || popover.$refs.reference;
            const popper = popover.popper || popover.$refs.popper;

            if (!reference && popover.$slots.reference && popover.$slots.reference[0]) {
                reference = popover.referenceElm = popover.$slots.reference[0].elm;
            }
            if (popover.trigger === 'click') {
                on(reference, 'click', popover.doToggle);
                on(document, 'click', popover.handleDocumentClick);
            } else if (popover.trigger === 'hover') {
                on(reference, 'mouseenter', popover.handleMouseEnter);
                on(popper, 'mouseenter', popover.handleMouseEnter);
                on(reference, 'mouseleave', popover.handleMouseLeave);
                on(popper, 'mouseleave', popover.handleMouseLeave);
            } else if (popover.trigger === 'focus') {
                let found = false;

                if ([].slice.call(reference.children).length) {
                    const children = reference.childNodes;
                    const len = children.length;
                    for (let i = 0; i < len; i++) {
                        if (children[i].nodeName === 'INPUT' ||
                            children[i].nodeName === 'TEXTAREA') {
                            on(children[i], 'focusin', popover.doShow);
                            on(children[i], 'focusout', popover.doClose);
                            found = true;
                            break;
                        }
                    }
                }
                if (found) return;
                if (reference.nodeName === 'INPUT' ||
                    reference.nodeName === 'TEXTAREA') {
                    on(reference, 'focusin', popover.doShow);
                    on(reference, 'focusout', popover.doClose);
                } else {
                    on(reference, 'mousedown', popover.doShow);
                    on(reference, 'mouseup', popover.doClose);
                }
            } else if (popover.trigger === 'input') {
                on(reference, 'keydown', popover.handleKeydown);
                on(reference, 'input', popover.handleInput);
            }


        },

        methods: {
            choseUser(index) {
                if (index) {
                    popover.activeIndex = index;
                }
                //触发事件
                popover.users[popover.activeIndex].atPosition = popover.atPosition;
                popover.$emit('return-user', popover.users[popover.activeIndex]);

                popover.doClose(); //关闭窗口
            },
            doToggle() {
                popover.showPopper = !popover.showPopper;
            },
            doShow() {
                popover.showPopper = true;
            },
            doClose() {
                popover.showPopper = false;
                popover.atPosition = null;
                popover.activeItem = {};
            },
            handleFocus() {
                addClass(popover.referenceElm, 'focusing');
                if (popover.trigger !== 'manual') popover.showPopper = true;
            },
            handleClick() {
                removeClass(popover.referenceElm, 'focusing');
            },
            handleBlur() {
                removeClass(popover.referenceElm, 'focusing');
                if (popover.trigger !== 'manual') popover.showPopper = false;
            },
            handleMouseEnter() {
                clearTimeout(popover._timer);
                if (popover.openDelay) {
                    popover._timer = setTimeout(() => {
                        popover.showPopper = true;
                    }, popover.openDelay);
                } else {
                    popover.showPopper = true;
                }
            },
            handleKeydown(e) {
                const reference = popover.reference;
                //关闭辅助
                if (e.keyCode === 27 && popover.trigger !== 'manual') { // esc
                    popover.doClose();
                }
                let keyCode = e.keyCode || e.which || e.charCode;
                let shiftKey = e.shiftKey;
                //输入@展示辅助输入框
                if (shiftKey && keyCode === 229) {// @
                    popover.doShow();
                }

                if (popover.showPopper === true) {//输入框展示中
                    //输入上下按钮
                    if (popover.showPopper === true && keyCode === 40) {// ArrowDown
                        e.returnValue = false;
                        if (popover.activeIndex >= popover.users.length - 1) {
                            popover.activeIndex = popover.users.length - 1;
                            return;
                        }
                        popover.activeIndex += 1;
                        popover.$refs.popper.children[0].scrollTop += popover.$refs.popper.children[0].children[0].offsetHeight;
                        e.returnValue = false;
                    }
                    if (keyCode === 38) {// ArrowUp
                        e.returnValue = false;
                        if (popover.activeIndex <= 0) {
                            //负数则变为最大
                            popover.activeIndex = 0;
                            return;
                        }
                        popover.$refs.popper.children[0].scrollTop -= popover.$refs.popper.children[0].children[0].offsetHeight;
                        popover.activeIndex -= 1;

                    }
                    //输入回车
                    if (keyCode === 13) {
                        e.returnValue = false;
                        popover.choseUser()
                    }
                }
            },
            handleInput(ev) {
                //reference 输入事件、
                if (ev.data === '@') {
                    //输入@
                    popover.atPosition = ev.srcElement.value.length - 1;
                    popover.activeIndex = 0;
                    popover.doShow();
                } else if (ev.srcElement.value.length < popover.atPosition + 1) { // 删除则关闭辅助
                    popover.doClose();
                } else {
                    //展示中
                    if (popover.showPopper) {
                        //正常情况发起搜索?
                        let value = ev.srcElement.value.substring(popover.atPosition + 1);
                        if (value && value.length > 0) {
                            popover.lastTimer = value; // lastTimer为全局变量
                            setTimeout(() => {
                                if (popover.lastTimer === value)
                                //如果this.lastTimer === val（也就是你停止输入0.5s之内都没有其它的值发生变化）则做你想要做的事
                                {
                                    popover.fetchUsers(value);
                                }
                            }, 500);
                        }
                    }
                }


            },
            handleMouseLeave() {
                clearTimeout(popover._timer);
                popover._timer = setTimeout(() => {
                    popover.showPopper = false;
                }, 200);
            },
            handleDocumentClick(e) {
                let reference = popover.reference || popover.$refs.reference;
                const popper = popover.popper || popover.$refs.popper;

                if (!reference && popover.$slots.reference && popover.$slots.reference[0]) {
                    reference = popover.referenceElm = popover.$slots.reference[0].elm;
                }
                if (!popover.$el ||
                    !reference ||
                    popover.$el.contains(e.target) ||
                    reference.contains(e.target) ||
                    !popper ||
                    popper.contains(e.target)) return;
                popover.showPopper = false;
            },
            handleAfterEnter() {
                popover.$emit('after-enter');
            },
            handleAfterLeave() {
                popover.$emit('after-leave');
                popover.doDestroy();
            },
            fetchUsers(value) {
                let config = {
                    like: value
                };
                axios.get('/api/dealer/employee/list/like', {params: config}).then(response => {
                    if (response.success) {
                        let users = response.data;
                        popover.users = users;
                    } else {
                        popover.$message({
                            type: 'error',
                            message: response.message
                        });
                    }
                })
            },
        },

        destroyed() {
            const reference = popover.reference;

            off(reference, 'click', popover.doToggle);
            off(reference, 'mouseup', popover.doClose);
            off(reference, 'mousedown', popover.doShow);
            off(reference, 'focusin', popover.doShow);
            off(reference, 'focusout', popover.doClose);
            off(reference, 'mouseleave', popover.handleMouseLeave);
            off(reference, 'mouseenter', popover.handleMouseEnter);
            off(document, 'click', popover.handleDocumentClick);
        }
    };
</script>
<style type="text/css">
    .active {
        color: red;
    }

    .collection-item {
        background: white;
        height: 20px;
    }

    .collection-contain {
        flex-direction: column-reverse;
        max-height: 100px;
        overflow: auto;
        background: white;
    }

</style>

