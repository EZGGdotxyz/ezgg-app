/*
 * @Date: 2023-12-18 14:37:38
 * @LastEditors: yosan
 * @LastEditTime: 2025-03-08 00:16:28
 * @FilePath: /ezgg-app/packages/app/pages/auth/login2/index.tsx
 */
import {YStack, SizableText, AppImage, Button, ScrollView} from '@my/ui';
import React, {useState, useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import PermissionPage from 'app/Components/PermissionPage';
import AppHeader2 from 'app/Components/AppHeader2';
import {appScale} from 'app/utils';
import {useRouter} from 'solito/router';
import {useLogin, usePrivy, useUser as usePrivyUser} from '@privy-io/react-auth';
import SuccessPopup from './components/SuccessPopup';
import {AppName, PrimaryColor} from 'app/config';
import useUser from 'app/hooks/useUser';
import {postUserUpdateMember} from 'app/servers/api/member';
import {View} from 'react-native';
import useInit from 'app/hooks/useInit';
import {createParam} from 'solito';
const {useParams} = createParam<any>();

const LoginScreen = () => {
  const {t} = useTranslation();
  const {ready} = usePrivy();
  const {push} = useRouter();
  const {params} = useParams();

  const {_getInfrastructureListBlockchain} = useInit();
  const {initLogin, initUserInfo, onLink} = useUser();
  const [modalVisible, setModalVisible] = useState(false);
  const [isSetInfo, setIsSetInfo] = useState(false);
  const [accountForm, setAccountForm] = useState({
    nickname: '',
    avatar: '',
  });
  const {refreshUser} = usePrivyUser();

  const {login} = useLogin({
    onComplete: async (user) => {
      setModalVisible(true);
      await handleLogin(user);
    },
  });

  const handleLogin = useCallback(
    async (user: any) => {
      try {
        const token = localStorage.getItem('privy:token');
        const idToken = localStorage.getItem('privy:id_token');

        if (!token || !idToken) {
          console.error('登录失败: 无法获取令牌');
          return;
        }

        initLogin(JSON.parse(token), JSON.parse(idToken));
        const _userInfo = await initUserInfo();
        if (_userInfo?.customMetadata?.nickname) {
          handleSuccess({
            nickname: _userInfo?.customMetadata?.nickname || '',
            avatar: _userInfo?.customMetadata?.avatar || '',
          });
        } else {
          setAccountForm({
            nickname: _userInfo?.nickname || '',
            avatar: _userInfo?.avatar || '',
          });
          setIsSetInfo(true);
        }
      } catch (error) {
        console.error('登录处理失败:', error);
        setModalVisible(false);
      }
    },
    [initLogin, initUserInfo],
  );

  const handleSuccess = useCallback(
    async (_userInfo: any) => {
      try {
        setIsSetInfo(false);
        try {
          await postUserUpdateMember({
            nickname: _userInfo.nickname || '',
            avatar: _userInfo.avatar || '',
          });
          await refreshUser();
          setTimeout(async () => {
            setModalVisible(false);
            _getInfrastructureListBlockchain();
            onLink();
          });
        } catch (error) {
          console.error('更新用户信息失败:', error);
          setTimeout(async () => {
            setModalVisible(false);
          });
        }
      } catch (error) {
        console.error('处理成功回调失败:', error);
        setTimeout(async () => {
          setModalVisible(false);
        });
      }
    },
    [onLink],
  );

  return (
    <PermissionPage isLoginPage>
      <AppHeader2 title={''} fallbackUrl="/" />
      <ScrollView
        flex={1}
        w={'100%'}
        bc="#fff"
        contentContainerStyle={{
          minHeight: '100%',
        }}
      >
        <YStack f={1} pt={appScale(100)} ai="center" bc="$background">
          <YStack pb={appScale(32 + 24)}>
            <SizableText color="$color" ta="center" fontSize={appScale(24)} fontWeight="700" mb={appScale(32 + 24)}>
              {AppName}
            </SizableText>
            <AppImage
              width={appScale(285 / 2)}
              height={appScale(322 / 2)}
              src={require('app/assets/images/logo.png')}
              type="local"
            />
          </YStack>
          <YStack w="100%" pl={appScale(24)} pr={appScale(24)}>
            <Button
              backgroundColor={PrimaryColor}
              h={appScale(58)}
              w={'100%'}
              br={appScale(28)}
              ai={'center'}
              jc={'center'}
              pressStyle={{
                opacity: 0.85,
              }}
              unstyled
              onPress={() => login()}
              disabled={!ready}
            >
              <SizableText color="#212121" fontSize={appScale(16)} fontWeight="700">
                {t('login.loginButton')}
              </SizableText>
            </Button>
          </YStack>
          <View
            style={{
              display: 'block',
              padding: appScale(24),
            }}
          >
            <SizableText style={{display: 'inline'}} color="#212121" fontSize={appScale(14)} fontWeight="500">
              {t('login.loginAgreement1')}
            </SizableText>
            <Button
              unstyled
              style={{display: 'inline'}}
              pressStyle={{opacity: 0.7}}
              onPress={() => {
                push('/profile/privacyPolicy');
              }}
            >
              <SizableText ml={appScale(4)} mr={appScale(4)} color="#212121" fontSize={appScale(14)} fontWeight="700">
                {t('login.loginAgreement2')}
              </SizableText>
            </Button>
            <SizableText style={{display: 'inline'}} color="#212121" fontSize={appScale(14)} fontWeight="500">
              {t('login.loginAgreement3')}
            </SizableText>
          </View>
        </YStack>
      </ScrollView>
      <SuccessPopup
        redirect={params?.redirect||''}
        handleSuccess={handleSuccess}
        accountForm={accountForm}
        setAccountForm={setAccountForm}
        isSetInfo={isSetInfo}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </PermissionPage>
  );
};

export default LoginScreen;
