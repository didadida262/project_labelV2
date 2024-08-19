import axios from 'axios';
import { getToken } from '../utils/token';
// 创建axios实例
const instance = axios.create({
  baseURL: 'http://localhost:3001', // 基础URL
  timeout: 1000, // 请求超时时间
  // 其他配置...
});
 
// 请求拦截器
instance.interceptors.request.use(
  config => {
    // 可以在这里添加例如token等请求头
    const token = getToken() 
    if (token) {
      config.headers['Authorization'] = token;
    }
    return config;
  },
  error => {
    // 请求错误处理
    return Promise.reject(error);
  }
);
 
// 响应拦截器
instance.interceptors.response.use(
  response => {
    // 对响应数据做处理，例如只返回data部分
    return response.data;
  },
  error => {
    // 响应错误处理
    return Promise.reject(error);
  }
);
 
// 导出封装后的axios实例
export default instance;