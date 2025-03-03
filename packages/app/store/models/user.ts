/*
 * @Author: Yosan
 * @Date: 2022-11-12 12:19:36
 * @LastEditors: yosan
 * @LastEditTime: 2025-03-03 14:18:04
 * @Description:
 */
import {createModel} from '@rematch/core';
import {UserStoreModel} from 'app/types/user';
import {RootModel} from './index';
import {removeUserIdToken, removeUserInfo, removeUserToken} from 'app/utils/auth';

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
  } as UserStoreModel,
  reducers: {
    updateState(state, payload) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  effects: (dispatch) => ({
    async locallyLogout() {
      dispatch.user.updateState({
        isLogin: false,
        userInfo: {},
        availableBalance: 0,
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
