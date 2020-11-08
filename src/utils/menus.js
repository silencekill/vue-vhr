import {getRequest} from "./api";

// 初始化菜单
export const initMenu=(router,store)=>{
    // 判断store中是否有数据
    if(store.state.routes.length>0){
        // 有直接返回
        return;
    }

    getRequest("/sys/menuList").then(data=>{
        if(data){
            // 将数据进行处理 主要是对component的处理
            let fmtRoutes=formatRoutes(data.data);
            // 将处理后的数据追加到router中
            router.addRoutes(fmtRoutes);
            // 给store中的 routes赋值
            store.commit('initRoutes',fmtRoutes);
        }
    })
};

// 格式化请求后的数据
export const formatRoutes=(routes)=>{
    let fmRoutes = [];
    routes.forEach(router=>{
        let {
            path,
            component,
            name,
            meta,
            iconCls,
            children
        }=router;
        // 如果children存在并且是一个数组 递归处理数据
        if(children && children instanceof Array){
            children = formatRoutes(children);
        }
        // 定义格式化后的router对象
        let fmRouter={
            path:path,
            name:name,
            iconCls:iconCls,
            meta:meta,
            children:children,
            // 动态导入 .vue文件
            component(resolve){
                if(component.startsWith("Home")){
                    require(['../views/'+component+'.vue'], resolve)
                }else if(component.startsWith("Emp")){
                    require(['../views/emp/'+component+'.vue'], resolve)
                }else if(component.startsWith("Per")){
                    require(['../views/per/'+component+'.vue'], resolve)
                }else if(component.startsWith("Sal")){
                    require(['../views/sal/'+component+'.vue'], resolve)
                }else if(component.startsWith("Sta")){
                    require(['../views/sta/'+component+'.vue'], resolve)
                }else if(component.startsWith("Sys")){
                    require(['../views/sys/'+component+'.vue'], resolve)
                }

            }
        };
        // 将信息push到数组中
        fmRoutes.push(fmRouter);
    })

    return fmRoutes;
};