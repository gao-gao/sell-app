<template>
    <div class="cartcontrol">
       <transition name="move">
           <div class="cart-decrease" v-show="food.count>0" @click="decreaseCart">
               <span class="inner icon-remove_circle_outline"></span>
           </div>
       </transition>
       <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
        <div class="cart-add icon-add_circle" @click="addCart"></div>
    </div>
</template>

<script type='text/ecmascript-6'>
    import Vue from 'vue'

    export default {
        props: {
            food: {
                type: Object
            }
        },
        methods: {
            addCart (event) {
                if (!event._constructed) {
                    return
                }
                console.log('click')
                if (!this.food.count) {
                    // 监听到变化
                    Vue.set(this.food, 'count', 1)
                    this.food.count = 1
                } else {
                    this.food.count++
                }
                this.$dispatch('cart.add', event.target)
            },
            decreaseCart (event) {
                if (!event._constructed) {
                    return
                }
                if (this.food.count) {
                    this.food.count--
                }
            }
        }
    }
</script>

<style lang='stylus' rel='stylesheet/stylus'>
    .cartcontrol
        font-size 0
        .cart-add
            display inline-block
            padding 6px
            font-size 24px
            line-height 24px
            color rgb(0,165,220)
        .cart-decrease
            display inline-block
            padding 6px
            .inner
                display inline-block
                font-size 24px
                line-height 24px
                color rgb(0,165,220)
                // 动画开始和结束时的状态
            &.move-enter,&.move-leave-to
                opacity 0
                transform translate3d(14px,0,0)
                .inner
                    transform rotate(180deg)
            &.move-enter-active,&.move-leave-active
                transition all 0.4s linear
                .inner
                    transition all 0.4s linear
            // 最终状态
            &.move-enter-to,,&.move-leave
                opacity 1
                transform translate3d(0,0,0)
                .inner
                    transform rotate(0)
        .cart-count
            display inline-block
            vertical-align top
            width 12px
            padding-top 6px
            line-height 24px
            text-align center
            font-size 10px
            color rgb(147,153,159)
</style>