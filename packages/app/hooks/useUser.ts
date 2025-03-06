/*
 * @Date: 2023-12-08 10:37:32
 * @LastEditors: yosan
 * @LastEditTime: 2025-03-06 13:44:32
 * @FilePath: /ezgg-app/packages/app/hooks/useUser.ts
 */
import {Dispatch} from 'app/store';
import {setUserIdToken, setUserInfo, setUserToken} from 'app/utils/auth';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import {Platform} from 'react-native';
import {useRematchModel} from 'app/store/model';
import useRequest from './useRequest';

import {createParam} from 'solito';
import {useRouter} from 'solito/router';
import {getUserFindUser} from 'app/servers/api/member';
import {usePrivy} from '@privy-io/react-auth';
const {useParams} = createParam<any>();

/**
 * 用户相关操作的钩子函数
 * @returns 用户相关的方法集合
 */
export default function useUser() {
  const dispatch = useDispatch<Dispatch>();
  const {makeRequest} = useRequest();
  const {params} = useParams();
  const {replace} = useRouter();
  const {logout} = usePrivy();

  /**
   * 处理登录后的路由跳转
   */
  const onLink = (): void => {
    if ((params?.redirect === '/claim' || params?.redirect === '/requesting') && params?.code) {
      replace({
        pathname: params?.redirect + '/' + params?.code,
      });
    } else {
      replace({
        pathname: '/',
      });
    }
  };

  /**
   * 注册登录（预留方法）
   * @param params 注册参数
   */
  const _memberAuthSignUp = async (params: any): Promise<any> => {
    // 预留方法，暂未实现
    return null;
  };

  /**
   * 账号登录（预留方法）
   * @param params 登录参数
   */
  const _accountLogin = async (params: any): Promise<any> => {
    // 预留方法，暂未实现
    return null;
  };

  /**
   * 初始化登录状态
   * @param token 用户令牌
   * @param idToken 用户ID令牌
   */
  const initLogin = async (token: string, idToken: string): Promise<void> => {
    if (token && idToken) {
      dispatch.user.updateState({isLogin: true});
      // setUserToken(token);
      // setUserIdToken(idToken);
    }
  };

  /**
   * 获取并初始化用户信息
   * @returns 用户信息对象
   */
  const initUserInfo = async (): Promise<Record<string, any>> => {
    const res = await makeRequest(getUserFindUser());
    if (res?.data) {
      setUserInfo(res?.data);
      dispatch.user.updateState({
        userInfo: res?.data,
      });
      return res.data;
    }
    return {};
  };

  /**
   * 用户登出
   */
  const userLogout = async (): Promise<void> => {
    try {
      await logout();
      dispatch.user.locallyLogout();
    } catch (e) {
      // 即使登出失败，也清除本地登录状态
      dispatch.user.locallyLogout();
    }
  };

  return {
    initUserInfo,
    userLogout,
    initLogin,
    _memberAuthSignUp,
    onLink,
    _accountLogin,
  };
}
