/*
 * @Date: 2023-12-18 14:37:38
 * @LastEditors: yosan
 * @LastEditTime: 2025-04-27 14:09:56
 * @FilePath: /ezgg-app/packages/app/pages/auth/login2/index.tsx
 */
import {YStack, SizableText, AppImage, Button, ScrollView, useToastController} from '@my/ui';
import React, {useState, useCallback, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import PermissionPage from 'app/Components/PermissionPage';
import AppHeader2 from 'app/Components/AppHeader2';
import {useRouter} from 'solito/router';
import {useLogin, usePrivy, useUser as usePrivyUser, useWallets} from '@privy-io/react-auth';
import SuccessPopup from './components/SuccessPopup';
import {AppName, NETWORK, PrimaryColor} from 'app/config';
import useUser from 'app/hooks/useUser';
import {postUserUpdateMember, postUserUpdateMemberSmartWallet} from 'app/servers/api/member';
import {View} from 'react-native';
import useInit from 'app/hooks/useInit';
import {createParam} from 'solito';
import useResponse from 'app/hooks/useResponse';
import {useTransaction} from 'app/hooks/useTransaction';
const {useParams} = createParam<any>();

const LoginScreen = () => {
  const {t} = useTranslation();
  const {ready} = usePrivy();
  const {push} = useRouter();
  const {params} = useParams();
  const {appScale} = useResponse();
  const {initLogin, initUserInfo, onLink} = useUser();
  const [modalVisible, setModalVisible] = useState(false);
  const [isSetInfo, setIsSetInfo] = useState(false);
  const [isLoginSuccess, setIsLoginSuccess] = useState(false);
  const {refreshUser} = usePrivyUser();
  const {syncSmartWalletAddress} = useTransaction();

  const {wallets} = useWallets();

  useEffect(() => {
    // 同步当前用户基于BICONOMY的智能钱包地址
    const embeddedWallet = wallets.find((wallet) => wallet.walletClientType === 'privy');
    if (embeddedWallet && isLoginSuccess) {
      // syncSmartWalletAddress('ETH', embeddedWallet, handleLogin);
      handleLogin();
    }
  }, [wallets, isLoginSuccess]);

  const {login} = useLogin({
    onComplete: async (user) => {
      setModalVisible(true);
      setIsLoginSuccess(true);
      // await handleLogin(user);
    },
  });

  const handleLogin = useCallback(async () => {
    try {
      const token = localStorage.getItem('privy:token');
      const idToken = localStorage.getItem('privy:id_token');

      if (!token || !idToken) {
        console.error('登录失败: 无法获取令牌');
        return;
      }

      initLogin(JSON.parse(token), JSON.parse(idToken));
      const _userInfo = await initUserInfo();
      await postUserUpdateMember({
        nickname: _userInfo?.customMetadata?.nickname || '',
        avatar: _userInfo?.customMetadata?.avatar || '',
      });
      await refreshUser();
      await initUserInfo();
      const embeddedWallet = wallets.find((wallet) => wallet.walletClientType === 'privy');
      if (embeddedWallet) {
        syncSmartWalletAddress('ETH', embeddedWallet, () => {
          setTimeout(async () => {
            setModalVisible(false);
            onLink();
          }, 1000);
        });
      }
    } catch (error) {
      console.error('登录处理失败:', error);
      setModalVisible(false);
    }
  }, [initLogin, initUserInfo]);

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
            // getInfrastructureList();
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
            <SizableText color="$color" ta="center" fontSize="$8" fontWeight="700" mb={appScale(32 + 24)}>
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
              <SizableText color="#212121" fontSize={'$5'} fontWeight="700">
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
            <SizableText style={{display: 'inline'}} color="#212121" fontSize="$2" fontWeight="500">
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
              <SizableText ml={appScale(4)} mr={appScale(4)} fontSize="$3" color="#1677ff" fontWeight="700">
                《{t('login.loginAgreement2')}》
              </SizableText>
            </Button>
            <SizableText style={{display: 'inline'}} color="#212121" fontSize="$2" fontWeight="500">
              {t('login.loginAgreement3')}
            </SizableText>
          </View>
        </YStack>
      </ScrollView>
      <SuccessPopup redirect={params?.redirect || ''} modalVisible={modalVisible} setModalVisible={setModalVisible} />
    </PermissionPage>
  );
};

export default LoginScreen;
