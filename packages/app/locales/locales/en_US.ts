/*
 * @Author: Try
 * @Date: 2022-11-22 17:00:05
 * @LastEditTime: 2025-02-24 15:49:44
 * @LastEditors: yosan
 * @FilePath: /ezgg-app/packages/app/locales/locales/en_US.ts
 * @Description: 头部注释配置模板
 */
import tips from './en_US/tips';
import screen from './en_US/screen';
import operate from './en_US/operate';
import login from './en_US/pages/login';
import profile from './en_US/pages/profile';
import home from './en_US/pages/home';

const data = {
  ...tips,
  ...screen,
  ...login,
  ...profile,
  ...home,
  ...operate,
};
export default data;
