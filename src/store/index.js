import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

// 导入到main.js才能生效
export default new Vuex.Store({
    // 声明变量
    state:{
        // 加载的菜单项
        routes:[]
    },
    // 修改变量
    mutations:{
        initRoutes(state,data){
            state.routes=data
        }
    },
    // 用来修改 mutations,再在mutations中修改state中的变量
    actions:{

    }
})