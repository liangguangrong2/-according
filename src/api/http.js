import axios from "axios";


// 创建axios实例化
const service = axios.create({
    // baseURL:"http://192.168.54.3:3000",
    baseURL: "http://127.0.0.1:3000",
    timeout: 300000, //请求超时时间
    headers: {
        "Content-Type": "application/json;charset=UTF-8" //表单数据传递转化
    }
})

// request 拦截器 发送数据到后台
service.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        console.log(error);
        Promise.reject(error);
    }
)


// response 拦截器 获取后台数据拦截
service.interceptors.response.use(
    response => {
        return response.data;
    },
    error => {
        console.log(error);
        return Promise.reject(error);
    }
)



export default service;