/*
 * @Author: Yosan
 * @Date: 2021-12-24 15:09:32
 * @LastEditors: yosan
 * @LastEditTime: 2023-12-30 16:40:44
 * @Descripttion:
 */
declare interface window {
  ethereum?: any;
  myEvent?: any;
}
declare interface AsyncResult<T> {
  /**
   * 返回码
   */
  code?: number;
  data?: any;
  /**
   * 返回信息
   */
  message?: string;
  /**
   * 是否成功
   */
  success?: boolean;
  /**
   * 踪迹 IP
   */
  traceId?: string;
}
declare module '*.json';
declare module '*.png';
declare module '*.jpg';
declare module '*.scss';
declare module '*.ts';
declare module '*.js';
