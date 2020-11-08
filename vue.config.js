// 配置请求转发代理
let proxyObj = {};

proxyObj['/']={
    // websocket配置暂时先关闭
    ws:false,
    // 拦截到的请求转发到哪个地址
    target:'http://localhost:8081',
    //
    changeOrigin: true,
    // 请求地址不重写
    pathRewrite:{
        '^/':''
    }
};


// 导出代理对象
module.exports={
    // 当前服务的信息
    devServer:{
        host:'localhost',
        port: 8080,
        proxy:proxyObj
    }
};