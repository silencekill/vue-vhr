import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 导入element
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 导入vuex配置
import store from "./store/index";

// 导入封装的请求api.js
import  {postKeyValueRequest} from "./utils/api"
import  {postRequest} from "./utils/api"
import  {getRequest} from "./utils/api"
import  {putRequest} from "./utils/api"
import  {deleteRequest} from "./utils/api"
// 做成vue的插件,在使用的时候直接this.就可以
Vue.prototype.postKeyValueRequest = postKeyValueRequest;
Vue.prototype.postRequest = postRequest;
Vue.prototype.getRequest = getRequest;
Vue.prototype.putRequest = putRequest;
Vue.prototype.deleteRequest = deleteRequest;

import {initMenu} from "./utils/menus";
import 'font-awesome/css/font-awesome.min.css'


Vue.config.productionTip = false;

// 相当于拦截器
router.beforeEach((to, from, next)=> {
    // to  从哪个页面来
    // from 去哪个页面
    if(to.path!=='/'){
        initMenu(router,store);
    }
    // next 执行命令
    next();
});

Vue.use(ElementUI);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
