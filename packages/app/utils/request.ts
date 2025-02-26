/*
 * @Date: 2023-12-08 10:10:20
 * @LastEditors: yosan
 * @LastEditTime: 2025-02-26 21:44:57
 * @FilePath: /ezgg-app/packages/app/utils/request.ts
 */
// index.ts
import axios from 'axios';
import {getLanguage, getUserIdToken, getUserToken} from './auth';
import {APP_URL, DefaultLanguage} from 'app/config';

// 配置新建一个 axios 实例
const service = axios.create({
  baseURL: APP_URL + '/',
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 添加请求拦截器
service.interceptors.request.use(
  async (config) => {
    // const token = localStorage.getItem('privy:token');
    // const idToken = localStorage.getItem('privy:id_token');
    const token = await getUserToken();
    const idToken = await getUserIdToken();
    const locale = (await getLanguage()) || DefaultLanguage;
    if (token) {
      config.headers!.Authorization = `Bearer ${token}`;
    }
    if (idToken) {
      config.headers['privy-id-token'] = `${idToken}`;
    }
    config.headers!['Accept-Language'] = locale === 'en_US' ? 'en' : 'zh-hk';
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  },
);

// 添加响应拦截器
service.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    let res = response.data;
    return res;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 导出 axios 实例
export default service;
