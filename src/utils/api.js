import axios from 'axios'
import { Message } from 'element-ui';
import da from "element-ui/src/locale/lang/da";

// 定义响应拦截器
axios.interceptors.response.use(success=>{
    // http响应码是200进入到success
    if(success.status && success.status===200 && success.data.code!==200){
        // 此时是业务上的错误
        Message.error({message:success.data.message});
        return;
    }
    if(success.data.message){
        Message.success({message:success.data.message})
    }
    return success.data;
},error => {
    // http响应码不是200全部进入到error
    if (error.response.status===504 || error.response.status===404){
        Message.error({message:'未找到服务器'})
    }else if(error.response.status===403){
        Message.error({message:'权限不足,请联系管理员'})
    }else if(error.response.status===401) {
        Message.error({message: '未登录'})
    }else {
        if(error.response.message){
            Message.error({message:error.response.message})
        }else{
            Message.error({message:"未知错误"})
        }
    }
});

// 请求拦截器

// 路径前缀直接修改base
let base = '';

// post key value 形式 登录传参(key-value) springSecurity默认支持key-value形式传参
export const postKeyValueRequest=(url,params)=>{
    return axios({
        method:'post',
        url:`${base}${url}`,
        data:params,
        transformRequest:[function (data) {
            console.log(data)
            let ret = '';
            // i相当于key,data[i]相当于value
            for(let i in data){
                // i相当于key,data[i]相当于value 这里拼接成 key=value形式而不是json形式
                ret+=encodeURIComponent(i)+"="+encodeURIComponent(data[i])+"&"
            }
            return ret;
        }],
        headers:{
            // todo 键一定是 Content-Type 注意大小写
            "Content-Type":'application/x-www-form-urlencoded'
        }
    })
};

export const postRequest=(url,params)=>{
    return axios({
        method:"post",
        url:`${base}${url}`,
        data:params,
    })
};

export const getRequest=(url,params)=>{
    return axios({
        method:"get",
        url:`${base}${url}`,
        data:params,
    })
};

export const putRequest=(url,params)=>{
    return axios({
        method:"put",
        url:`${base}${url}`,
        data:params,
    })
};

export const deleteRequest=(url,params)=>{
    return axios({
        method:"delete",
        url:`${base}${url}`,
        data:params,
    })
};