// src/axios.js
import axios from 'axios';

// 创建 Axios 实例
const instance = axios.create({
  baseURL: 'http://localhost:8081/api'
});

// 请求拦截器
instance.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// 响应拦截器
instance.interceptors.response.use(response => {
  return response;
}, error => {
  if (error.response.status === 401) {
    // Token 过期或未授权，执行相应操作
    alert('Unauthorized, please log in again');
  }
  return Promise.reject(error);
});

export default instance;
