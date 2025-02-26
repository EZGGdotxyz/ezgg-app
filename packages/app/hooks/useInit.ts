/*
 * @Date: 2023-12-08 10:37:32
 * @LastEditors: yosan
 * @LastEditTime: 2025-02-26 22:10:13
 * @FilePath: /ezgg-app/packages/app/hooks/useInit.ts
 */
import {Dispatch} from 'app/store';
import {getDeviceToken, getLanguage, getUserIdToken, getUserInfo, getUserToken, setInviteCode, setLanguage} from 'app/utils/auth';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import {Dimensions, Platform} from 'react-native';
import {useEffect} from 'react';
import useUser from './useUser';
import useRequest from './useRequest';
import {createParam} from 'solito';
import {DefaultLanguage} from 'app/config';

export default function useInit() {
  const {i18n} = useTranslation();
  const dispatch = useDispatch<Dispatch>();
  const {makeRequest} = useRequest();
  const {initLogin, initUserInfo} = useUser();

  const _init = async () => {
    const token: any = await getUserToken();
    const idToken: any = await getUserIdToken();
    const userInfo: any = await getUserInfo();
    // 设置 token
    if (token && idToken) {
      initLogin(token, idToken);
    }
    // 获取用户信息
    if (userInfo?.id) {
      initUserInfo();
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
