<template>
    <!--
        1. 在goods组件里面注册food组件，并通过点击调用show()
        2. 点击之后页面从右到左移动动画
        3. 页面布局：图片的加载,宽高相等的盒子
        4. 可以考虑将新旧price做成组件
        5. 引入better-scroll
        6. 购物车按钮 -->
    <transition name="move">
        <div v-show="showFlag" class="food" ref="food">
            <div class="food-content">
                <div class="image-header">
                    <img :src="food.image">
                    <div class="back" @click="hide">
                        <i class="icon-arrow_lift"></i>
                    </div>
                </div>
                <div class="content">
                    <h1 class="title">{{food.name}}</h1>
                    <div class="detail">
                        <span class="sell-count">月售{{food.sellcount}}份</span>
                        <span class="rating">好评率{{food.rating}}%</span>
                    </div>
                    <div class="price">
                        <span class="now">￥{{food.price}}</span>
                        <span class="old" v-show='food.oldPrice'>￥{{food.oldPrice}}</span>
                    </div>
                    <div class="cartcontrol-wrapper">
                        <cartcontrol :food="food"></cartcontrol>
                    </div>
                    <div class="buy" v-show="!food.count||food.count===0">
                        加入购物车
                    </div>
                </div>
            </div>

        </div>
    </transition>
</template>

<script type='text/ecmascript-6'>
    import BScroll from 'better-scroll'
    import cartcontrol from 'components/cartcontrol/cartcontrol'

    export default {
        props: {
            food: {
                type: Object
            }
        },
        data () {
            return {
                showFlag: false
            }
        },
        methods: {
            // 命名规范：组件私有的一般在前面添加下划线，可以被父组件调用的一般不加
            show () {
                this.showFlag = true
                this.$nextTick(() => {
                    if (!this.scroll) {
                        this.scroll = new BScroll(this.$refs.food, {
                            click: true
                        })
                    } else {
                        this.scroll.refresh()
                    }
                })
            },
            hide () {
                this.showFlag = false
            }
        },
        components: {
            cartcontrol
        }
    }
</script>

<style lang='stylus' rel='stylesheet/stylus'>
    .food
        position fixed
        top 0
        left 0
        bottom 48px
        z-index 30
        width 100%
        background #ffffff
        // 最终状态
        transform translate3d(0,0,0)
        // 动画过程
        &.move-enter-active,&.move-leave-active
            transition all 0.2s linear
        // 动画开始状态
        &.move-enter,&.move-leave-active
            transform translate3d(100%,0,0)
        .image-header
            position relative
            width 100%
            height 0
            padding-top 100%
            img
                position absolute
                top 0
                left 0
                width 100%
                height 100%
            .back
                position absolute
                top 10px
                left 0
                .icon-arrow_lift
                    display block
                    padding 10px
                    font-size 20px
                    color #ffffff
        .content
            padding 18px
            .title
                line-height 14px
                margin-bottom 8px
                font-size 14px
                font-weight 700
                color rgb(7,17,27)
            .detail
                margin-bottom 18px
                line-height 10px
                height 10px
                font-size 0
                .sell-count,.rating
                    font-size 10px
                    color rgb(147,153,159)
                .sell-count
                    margin-right 12px
            .price
                font-weight 700
                line-height 24px
                .now
                    margin-right 8px
                    font-size 14px
                    color rgb(240,20,20)
                .old
                    text-decoration line-through
                    font-size 10px
                    color rgb(147,153,159)
            .cartcontrol-wrapper
                position absolute
                right 12px
                bottom 12px
            .buy
                position absolute
                right 18px
                bottom 18px
                z-index 10
                height 24px
                line-height 24px
                padding 0 12px
                box-sizing border-box
                font-size 10px
                border-radius 12px
                color #ffffff
                background-color rgb(0,160,220)
</style>