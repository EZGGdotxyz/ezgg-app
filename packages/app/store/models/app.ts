/*
 * @Author: Yosan
 * @Date: 2022-11-12 12:19:36
 * @LastEditors: yosan
 * @LastEditTime: 2025-02-24 16:18:56
 * @Description:
 */
import {createModel} from '@rematch/core';
import {AppStoreModel} from 'app/types/app';
import {RootModel} from './index';
import {getLanguage, setLanguage} from 'app/utils/auth';

export const app = createModel<RootModel>()({
  state: {
    appWidth: 0,
    appHeight: 0,
    appLanguage: 'zh_HK',
    // 全局配置
    globalConfig: {},
    // 未读消息数
    unread: 0,
    // 法币品种
    demoniator: 'USD',
  } as AppStoreModel,
  reducers: {
    updateState(state, payload) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  effects: (dispatch) => ({}),
});
