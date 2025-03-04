/*
 * @Author: Yosan
 * @Date: 2022-11-12 12:19:36
 * @LastEditors: yosan
 * @LastEditTime: 2025-03-04 22:58:48
 * @Description:
 */
import {createModel} from '@rematch/core';
import {UserStoreModel} from 'app/types/user';
import {RootModel} from './index';
import {removeUserIdToken, removeUserInfo, removeUserToken} from 'app/utils/auth';

// 从 localStorage 获取 payLinkData
const getStoredPayLinkData = () => {
  if (typeof window !== 'undefined') {
    const storedData = localStorage.getItem('payLinkData');
    return storedData ? JSON.parse(storedData) : {};
  }
  return {};
};

export const user = createModel<RootModel>()({
  state: {
    // 是否登录
    isLogin: false,
    // 用户信息
    userInfo: {},
    // // 是否新用户
    // isNewUser: false,
    // 总余额
    availableBalance: 0,
    // 代币列表
    tokenList: [],
    // 支付链接数据
    payLinkData: getStoredPayLinkData(),
  } as UserStoreModel,
  reducers: {
    updateState(state, payload) {
      // 如果更新包含 payLinkData，则保存到 localStorage
      if (payload.payLinkData !== undefined && typeof window !== 'undefined') {
        if (Object.keys(payload.payLinkData).length === 0) {
          localStorage.removeItem('payLinkData');
          console.log('🚀 ~ updateState ~ removeItem:');
        } else {
          localStorage.setItem('payLinkData', JSON.stringify(payload.payLinkData));
        }
      }
      return {
        ...state,
        ...payload,
      };
    },
  },
  effects: (dispatch) => ({
    async locallyLogout() {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('payLinkData');
      }
      dispatch.user.updateState({
        isLogin: false,
        userInfo: {},
        availableBalance: 0,
        tokenList: [],
        payLinkData: {},
      });
      dispatch.app.updateState({
        globalConfig: {},
        unread: 0,
        currency: 'usd',
      });
      removeUserInfo();
      removeUserToken();
      removeUserIdToken();
    },
  }),
});
