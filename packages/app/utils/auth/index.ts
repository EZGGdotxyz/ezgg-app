/*
 * @Author: Yosan
 * @Date: 2022-11-12 12:53:29
 * @LastEditors: yosan
 * @LastEditTime: 2025-03-04 13:07:00
 * @Description:
 */
import {getStore, removeStore, setStore} from './local-storage';
import {
  LANGUAGE,
  USER_TOKEN,
  INVITE_CODE,
  USER_INFO,
  DEVICE_TOKEN,
  SIGN_CODE,
  HISTORY_LIST,
  IS_RECEIVE,
  USER_ID_TOKEN,
  CURRENCY,
} from './constant';

export const getIsReceive = async () => {
  return (
    getStore({
      name: IS_RECEIVE,
    }) || ''
  );
};

export const setIsReceive = async (data: string) => {
  return setStore({
    name: IS_RECEIVE,
    content: data,
  });
};

export const getHistoryListData = async () => {
  return (
    getStore({
      name: HISTORY_LIST,
    }) || ''
  );
};

export const setHistoryListData = async (data: string) => {
  return setStore({
    name: HISTORY_LIST,
    content: data,
  });
};

export const getDeviceToken = async () => {
  return (
    getStore({
      name: DEVICE_TOKEN,
    }) || ''
  );
};

export const setDeviceToken = async (data: string) => {
  return setStore({
    name: DEVICE_TOKEN,
    content: data,
  });
};

export const getSignCode = async () => {
  return (
    getStore({
      name: SIGN_CODE,
    }) || ''
  );
};

export const setSignCode = async (data: string) => {
  return setStore({
    name: SIGN_CODE,
    content: data,
  });
};

export const getLanguage = async () => {
  return (
    getStore({
      name: LANGUAGE,
    }) || 'en_US'
  );
};

export const setLanguage = async (language: string) => {
  return setStore({
    name: LANGUAGE,
    content: language,
  });
};

export const getCurrency = async () => {
  return (
    getStore({
      name: CURRENCY,
    }) || 'USD'
  );
};

export const setCurrency = async (currency: string) => {
  return setStore({
    name: CURRENCY,
    content: currency,
  });
};

// 获取用户token
export const getUserToken = async () => {
  const token = localStorage.getItem('privy:token');
  if (token) {
    return JSON.parse(token);
  } else {
    return '';
  }
  // return getStore({
  //   name: USER_TOKEN,
  // });
};

export const getUserIdToken = async () => {
  const token = localStorage.getItem('privy:id_token');
  if (token) {
    return JSON.parse(token);
  } else {
    return '';
  }
  // return getStore({
  //   name: USER_ID_TOKEN,
  // });
};

export const setUserIdToken = async (token: string) => {
  return setStore({
    name: USER_ID_TOKEN,
    content: token,
    expiresIn: 3600000, // 1小时 = 3600000毫秒
  });
};

export const removeUserIdToken = async () => {
  return localStorage.removeItem('privy:id_token');
  // return removeStore({
  //   name: USER_ID_TOKEN,
  // });
};

// 设置用户token
export const setUserToken = async (token: string) => {
  return setStore({
    name: USER_TOKEN,
    content: token,
    expiresIn: 3600000, // 1小时 = 3600000毫秒
  });
};

// 删除用户token
export const removeUserToken = async () => {
  return localStorage.removeItem('privy:token');
  // return removeStore({
  //   name: USER_TOKEN,
  // });
};

// 获取用户 注册邀请码
export const getInviteCode = async () => {
  return (
    getStore({
      name: INVITE_CODE,
    }) || ''
  );
};

// 设置用户 注册邀请码
export const setInviteCode = async (code: string) => {
  return setStore({
    name: INVITE_CODE,
    content: code,
  });
};

// 删除用户 注册邀请码
export const removeInviteCode = async () => {
  return removeStore({
    name: INVITE_CODE,
  });
};

// 获取用户 info
export const getUserInfo = async () => {
  return getStore({
    name: USER_INFO,
  });
};

// 设置用户Info
export const setUserInfo = async (info: any) => {
  // setCookie(USER_Info, Info);
  return setStore({
    name: USER_INFO,
    content: info,
  });
};

// 删除用户Info
export const removeUserInfo = async () => {
  return removeStore({
    name: USER_INFO,
  });
};
