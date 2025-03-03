/*
 * @Date: 2023-12-08 10:37:32
 * @LastEditors: yosan
 * @LastEditTime: 2025-03-03 10:46:33
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
import {Dimensions, Platform} from 'react-native';
import {useEffect} from 'react';
import useUser from './useUser';
import useRequest from './useRequest';
import {createParam} from 'solito';
import {DefaultLanguage, NETWORK} from 'app/config';
import {getInfrastructureListBlockchain} from 'app/servers/api/infrastructure';
import {getBalanceListBalance} from 'app/servers/api/balance';
import { useRematchModel } from 'app/store/model';

export default function useInit() {
  const {i18n} = useTranslation();
  const dispatch = useDispatch<Dispatch>();
  const {makeRequest} = useRequest();
  const {initLogin, initUserInfo} = useUser();
  const [{currency}] = useRematchModel('app');

  // 获取区块链列表
  const _getInfrastructureListBlockchain = async () => {
    let _blockchainList: any = [];
    const res = await makeRequest(
      getInfrastructureListBlockchain({
        platform: 'ETH',
        network: NETWORK,
      }),
    );
    if (res?.data && res?.data?.length > 0) {
      _blockchainList = res?.data;
      _getBalanceListBalance('ETH', _blockchainList[0]?.chainId, currency);
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

  const _getBalanceListBalance = async (platform, chainId, currency) => {
    const res = await makeRequest(getBalanceListBalance({platform, chainId, currency}));
    console.log('🚀 ~ const_getBalanceListBalance= ~ res:', res);
    if (res?.data) {
    }
  };

  const _init = async () => {
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
      _getInfrastructureListBlockchain();
    }

    // 设置语言
    const locale = (await getLanguage()) || DefaultLanguage;
    if (locale) {
      i18n?.changeLanguage(locale);
    }

    // 设置屏幕宽高
    dispatch.app.updateState({
      appWidth: Dimensions.get('window').width,
      appHeight: Dimensions.get('window').height,
    });
  };

  useEffect(() => {
    _init();
  }, []);

  return {_init};
}
