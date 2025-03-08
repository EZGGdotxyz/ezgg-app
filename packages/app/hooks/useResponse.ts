import {app} from './../store/models/app';
/*
 * @Date: 2023-12-08 10:37:32
 * @LastEditors: yosan
 * @LastEditTime: 2025-03-08 15:03:01
 * @FilePath: /ezgg-app/packages/app/hooks/useResponse.ts
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
import {Dimensions, Platform, ScaledSize} from 'react-native';
import {useEffect, useState} from 'react';
import {useRematchModel} from 'app/store/model';
import useUser from './useUser';
import useRequest from './useRequest';
import {DefaultLanguage, NETWORK} from 'app/config';
import {getInfrastructureListBlockchain} from 'app/servers/api/infrastructure';
import {getBalanceListBalance} from 'app/servers/api/balance';

const UIWidth = 430;

export default function useResponse() {
  const {i18n} = useTranslation();
  const [app] = useRematchModel('app');
  const dispatch = useDispatch<Dispatch>();
  const [screenDimensions, setScreenDimensions] = useState(Dimensions.get('window'));
  const {makeRequest} = useRequest();
  const {initLogin, initUserInfo} = useUser();

  // 监听屏幕尺寸变化
  useEffect(() => {
    const dimensionsHandler = ({window}: {window: ScaledSize}) => {
      setScreenDimensions(window);
      dispatch.app.updateState({
        appWidth: window.width,
        appHeight: window.height
      });
    };

    // 添加监听器
    const subscription = Dimensions.addEventListener('change', dimensionsHandler);

    // 确保初始状态也设置好
    dispatch.app.updateState({
      appWidth: screenDimensions.width,
      appHeight: screenDimensions.height
    });

    // 清除监听器
    return () => {
      subscription.remove();
    };
  }, [dispatch]);

  // 获取区块链列表
  const getInfrastructureList = async () => {
    let _blockchainList: any = [];
    const res = await makeRequest(
      getInfrastructureListBlockchain({
        platform: 'ETH',
        network: NETWORK,
      }),
    );
    if (res?.data && res?.data?.length > 0) {
      _blockchainList = res?.data;
      getBalanceList('ETH', _blockchainList[0]?.chainId, app.currency);
    }
    const res2 = await makeRequest(
      getInfrastructureListBlockchain({
        platform: 'SOLANA',
        network: NETWORK,
      }),
    );
    if (res2?.data && res2?.data?.length > 0) {
      _blockchainList = [..._blockchainList, ...res2?.data];
    }
    dispatch.app.updateState({
      blockchainList: _blockchainList,
    });
  };

  const getBalanceList = async (platform, chainId, currency) => {
    const res = await makeRequest(getBalanceListBalance({platform, chainId, currency}));
    if (res?.data) {
      // 处理余额数据
    }
  };

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

  const appScale = (width: number) => {
    // 使用存储的屏幕宽度，而不是每次重新获取
    const screenWidth = screenDimensions.width;
    // // 基准宽度（设计稿宽度）
    // const baseWidth = 430;
    // // 计算缩放比例
    // const scale = screenWidth / baseWidth *  0.81395349;
    // return baseScale(width * scale);
    // 单位转换
    // 计算比例尺寸
    const ratioSize = width * (screenWidth / UIWidth);

    // return `${Math.round(ratioSize)}`;
    return ratioSize;
  };

  const responseHandling = (width: any, hight: any) => {
    return {
      width: appScale(width),
      height: appScale(hight),
    };
  };

  return {
    // 响应式布局相关
    responseHandling,
    appScale,
    screenWidth: screenDimensions.width,
    screenHeight: screenDimensions.height,

    // 初始化相关
    initApp,
    getInfrastructureList,
    getBalanceList
  };
}
