/*
 * @Author: Yosan
 * @Date: 2022-11-22 12:44:13
 * @LastEditors: yosan
 * @LastEditTime: 2025-03-03 16:44:43
 * @Description:
 */

export interface UserStoreModel {
  // 是否登录
  isLogin: boolean;
  // 用户信息
  userInfo: any;
  // // 是否新用户
  // isNewUser: boolean;
  // 代币列表
  tokenList: any[];
  // 总余额
  availableBalance: number;
  // 支付链接数据
  payLinkData: any;
}
