/*
 * @Date: 2023-12-08 10:10:20
 * @LastEditors: snapxlabs
 * @LastEditTime: 2024-07-31 21:13:51
 * @FilePath: /snapx-nfc-app-merchants/packages/app/utils/request.ts
 */
// index.ts
import axios from 'axios';
import {getLanguage, getUserToken} from './auth';
import {APP_URL, DefaultLanguage} from 'app/config';

// 配置新建一个 axios 实例
const service = axios.create({
  baseURL: APP_URL + '/api/api/restaurant',
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 添加请求拦截器
service.interceptors.request.use(
  async (config) => {
    const token = await getUserToken();
    const locale = (await getLanguage()) || DefaultLanguage;
    if (token) {
      config.headers!.Authorization = 'Bearer ' + token;
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
