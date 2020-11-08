import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'


Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    hidden:true
  },{
    path: '/home',
    name: 'Home',
    component: Home,
    hidden:true
  }
    // 添加children指定这些页面是在home页面中的router中展示,从后台请求过来的数据
    // 在main.js中router.beforeEach方法去初始化menu,并将menu add到routes中
];

const router = new VueRouter({
  routes
});

export default router
