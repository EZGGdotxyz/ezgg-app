/*
 * @Author: Try
 * @Date: 2022-11-22 17:00:05
 * @LastEditTime: 2025-02-19 10:36:47
 * @LastEditors: yosan
 * @FilePath: /ezgg-app/packages/app/locales/locales/zh_HK.ts
 * @Description: 头部注释配置模板
 */
import tips from './zh_HK/tips';
import screen from './zh_HK/screen';
import operate from './zh_HK/operate';
import login from './zh_HK/pages/login';
import profile from './zh_HK/pages/profile';
import home from './zh_HK/pages/home';

const data = {
  ...tips,
  ...screen,
  ...login,
  ...profile,
  ...home,
  ...operate,
};
export default data;
