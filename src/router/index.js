import Vue from 'vue'
import VueRouter from 'vue-router'
import goods from 'components/goods/goods.vue'
import seller from 'components/seller/seller.vue'
import ratings from 'components/ratings/ratings.vue'

// eslint-disable-next-line
Vue.use(VueRouter)

const routes = [
    { path: '/goods', component: goods },
    { path: '/seller', component: seller },
    { path: '/ratings', component: ratings }
]


export default new VueRouter({
    routes // （缩写）相当于 routes: routes
})