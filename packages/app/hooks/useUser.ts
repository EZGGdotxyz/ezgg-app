/*
 * @Date: 2023-12-08 10:37:32
 * @LastEditors: yosan
 * @LastEditTime: 2025-02-26 22:07:51
 * @FilePath: /ezgg-app/packages/app/hooks/useUser.ts
 */
import {useToastController} from '@my/ui';
import {Dispatch} from 'app/store';
import {setUserIdToken, setUserInfo, setUserToken} from 'app/utils/auth';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import {Dimensions, Platform} from 'react-native';
import {useRematchModel} from 'app/store/model';
import useRequest from './useRequest';

import {createParam} from 'solito';
import {useRouter} from 'solito/router';
import {getUserFindUser} from 'app/servers/api/member';
import {usePrivy} from '@privy-io/react-auth';
const {useParams} = createParam<any>();

export default function useUser() {
  const {i18n} = useTranslation();
  const dispatch = useDispatch<Dispatch>();
  const {makeRequest} = useRequest();
  const [user] = useRematchModel('user');
  const {params} = useParams();
  const {replace} = useRouter();
  const {authenticated, ready, getAccessToken, logout} = usePrivy();

  const onLink = () => {
    if (params?.type === 'sign' && params?.code) {
      replace({
        pathname: '/restaurant/sign/' + params?.code,
      });
    } else {
      replace({
        pathname: Platform.OS === 'ios' ? '/' : '/',
      });
    }
  };

  // 注册登录
  const _memberAuthSignUp = async (params: any) => {
    // const data = await makeRequest(restaurantUserAuthRouterSignInByCaptcha({...params}));
    // if (data?.token) {
    //   initLogin(data?.token);
    //   initUserInfo();
    // }
    // return data;
  };

  // 账号登录
  const _accountLogin = async (params: any) => {
    // const data = await makeRequest(restaurantUserAuthRouterSignInByPassword({...params}));
    // if (data?.token) {
    //   initLogin(data?.token);
    //   initUserInfo();
    // }
    // return data;
  };

  // 初始化登录
  const initLogin = async (token: string, idToken: string) => {
    if (token && idToken) {
      dispatch.user.updateState({isLogin: true});
      setUserToken(token);
      setUserIdToken(idToken);
    }
  };

  // 获取用户信息
  const initUserInfo = async () => {
    const res = await makeRequest(getUserFindUser());
    if (res) {
      setUserInfo(res?.data);
      dispatch.user.updateState({
        userInfo: res?.data,
      });
    }
  };

  // 登出
  const userLogout = async () => {
    try {
      await logout();
      // await restaurantUserAuthRouterLogout();
      dispatch.user.locallyLogout();
    } catch (e) {
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
