一.菜单项加载完毕后放入到哪里:
   1:sessionStorage
   2:localStorage
   3.使用vuex状态管理工具(安全性较高)  状态管理模式
        数据变化的时候对应的视图也会更新
   
   安装vuex命令:
       npm install vuex
       
       
二.什么时候调用数据(将数据放入到vuex中保存,vuex.store)
    menus.js中的initMenu()方法什么时候调用
        在用户登录成功后调用
        数据保存在内存中
        问题:
            当用户按了F5键或者点击浏览器的刷新这时候就不会执行initMenu方法,从而不能加载菜单项
            
            
            
   所以使用vue中的导航守卫
        全局导航守卫
        在main.js中