// src/composables/useApi.ts

import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8081/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器，用于附加 token
instance.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export const useApi = () => {
  return {
    get: (url: string, params?: any) => instance.get(url, { params }),
    post: (url: string, data?: any) => instance.post(url, data),
    put: (url: string, data?: any) => instance.put(url, data),
    delete: (url: string, params?: any) => instance.delete(url, { params }),
  };
};
