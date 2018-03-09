import Vue from 'vue'
import VueRouter from 'vue-router'
import goods from '../components/goods/goods.vue'

Vue.use(Router)

const routes = [
    { path: '/goods', component: food }
]

const router = new VueRouter({
    routes // （缩写）相当于 routes: routes
})