/*
 * @Date: 2023-12-08 10:37:32
 * @LastEditors: yosan
 * @LastEditTime: 2025-03-10 16:34:17
 * @FilePath: /ezgg-app/packages/app/hooks/useInit.ts
 */
import {Dispatch} from 'app/store';
import {
  getDeviceToken,
  getLanguage,
  getUserIdToken,
  getUserInfo,
  getUserToken,
  setInviteCode,
  setLanguage,
} from 'app/utils/auth';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import {useEffect, useState} from 'react';
import useUser from './useUser';
import {DefaultLanguage} from 'app/config';
import {useRematchModel} from 'app/store/model';
import {Dimensions, Platform, ScaledSize} from 'react-native';
import useBlockchain from './useBlockchain';

export default function useInit() {
  const {i18n} = useTranslation();
  const dispatch = useDispatch<Dispatch>();
  const {initLogin, initUserInfo} = useUser();
  const {getInfrastructureList} = useBlockchain();
  const [screenDimensions, setScreenDimensions] = useState(Dimensions.get('window'));

  // 监听屏幕尺寸变化
  useEffect(() => {
    const dimensionsHandler = ({window}: {window: ScaledSize}) => {
      setScreenDimensions(window);
      dispatch.app.updateState({
        appWidth: window.width,
        appHeight: window.height,
      });
    };

    // 添加监听器
    const subscription = Dimensions.addEventListener('change', dimensionsHandler);

    // 确保初始状态也设置好
    dispatch.app.updateState({
      appWidth: screenDimensions.width,
      appHeight: screenDimensions.height,
    });

    // 清除监听器
    return () => {
      subscription.remove();
    };
  }, [dispatch]);

  // 初始化函数
  const initApp = async () => {
    const token: any = await getUserToken();
    const idToken: any = await getUserIdToken();
    const userInfo: any = await getUserInfo();
    // 设置 token
    if (token && idToken) {
      initLogin(token, idToken);
      // 获取用户信息
      if (userInfo?.customMetadata?.id) {
        initUserInfo();
      }
      // 获取区块链列表
      getInfrastructureList();
    }

    // 设置语言
    const locale = (await getLanguage()) || DefaultLanguage;
    if (locale) {
      i18n?.changeLanguage(locale);
    }
  };

  // 在组件挂载时初始化
  useEffect(() => {
    initApp();
  }, []);

  return {
    _init: initApp,
    getInfrastructureList,
    initApp,
    };
}
