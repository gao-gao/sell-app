<template>
    <!--
        1. 数据分发，selectType选择评论种类，onlyContent选择看有内容的评论，desc评论类型
        2. 选中时的样式，并在HTML中添加判断进行渲染
        3. 添加点击事件，并将改变的结果传递给父组件
        4. 添加正负评论的数量的计算属性
        5. 和food组件中的评价列表联动起来
     -->
    <div class="ratingselect">
        <div class="rating-type">
            <span @click="select(2,$event)" class="block positive" :class="{'active':selectType===2}">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
            <span @click="select(0,$event)" class="block positive" :class="{'active':selectType===0}">{{desc.positive}}<span class="count">{{positives.length}}</span></span>
            <span @click="select(1,$event)" class="block negative" :class="{'active':selectType===1}">{{desc.nagative}}<span class="count">{{negatives.length}}</span></span>
        </div>
        <div @click="toggleContent($event)" class="switch" :class="{'on':onlyContent}">
            <span class="icon-check_circle"></span>
            <span class="text">只看有内容的评价</span>
        </div>
    </div>
</template>

<script type='text/ecmascript-6'>
// 正面评价
const POSITIVE = 0
// 负面评价
const NEGATIVE = 1
// 所有评价
const ALL = 2
    export default {
        props: {
            ratings: {
                type: Array,
                default () {
                    return []
                }

            },
            selectType: {
                type: Number,
                default: ALL
            },
            onlyContent: {
                type: Boolean,
                default: false
            },
            desc: {
                type: Object,
                default () {
                    return {
                        all: '全部',
                        positive: '满意',
                        nagative: '不满意'
                    }
                }
            }
        },
        methods: {
            select (type, event) {
                if (!event._constructed) {
                    return
                }
                this.selectType = type
                // 向父组件告诉父组件当前变化，方便父组件监听
                this.$emit('select-rating', type)
            },
            toggleContent (event) {
                if (!event._constructed) {
                    return
                }
                this.onlyContent = !this.onlyContent
                this.$emit('toggle-content', this.onlyContent)
            }
        },
        computed: {
            positives () {
                return this.ratings.filter((rating) => {
                    return rating.rateType === POSITIVE
                })
            },
            negatives () {
                return this.ratings.filter((rating) => {
                    return rating.rateType === NEGATIVE
                })
            }
        }
    }
</script>

<style lang='stylus' rel='stylesheet/stylus'>
@import '../../common/stylus/mixin.styl'
    .ratingselect
        .rating-type
            font-size 0
            padding 18px 0
            margin 0 18px
            border-1px(rgba(7,17,27,0.1))
            .block
                display inline-block
                padding 8px 12px
                margin-right 8px
                border-radius 1px
                color rgb(77,85,93)
                font-size 12px
                &.active
                    color #ffffff
                .count
                    margin-left 2px
                    font-size 8px
                &.positive
                    background-color rgba(0,160,220,0.2)
                    &.active
                        background-color rgb(0,160,220)
                &.negative
                    background-color rgba(77,85,93,0.2)
                    &.active
                        background rgb(77,85,93)
        .switch
            padding 12px 18px
            line-height 24px
            font-size 12px
            border-bottom 1px solid rgb(147,153,159)
            color rgb(147,153,159)
            font-size 0
            &.on
                 .icon-check_circle
                    color #00c850
            .icon-check_circle
                display inline-block
                vertical-align top
                margin-right 4px
                font-size 24px
            .text
                display inline-block
                vertical-align top
                font-size 12px
</style>