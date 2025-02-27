/*
 * @Date: 2023-12-18 14:37:38
 * @LastEditors: yosan
 * @LastEditTime: 2025-02-27 16:45:29
 * @FilePath: /ezgg-app/packages/app/pages/auth/login2/index.tsx
 */
import {
  AppHeader,
  AppHeaderProps,
  HeaderBackButton,
  Paragraph,
  XStack,
  YStack,
  SizableText,
  AppImage,
  Button,
} from '@my/ui';
import React, {useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import PermissionPage from 'app/Components/PermissionPage';
import AppHeader2 from 'app/Components/AppHeader2';
import {appScale} from 'app/utils';
import AppButton from 'app/Components/AppButton';
import {useRouter} from 'solito/router';
import {
  SendTransactionModalUIOptions,
  UnsignedTransactionRequest,
  useConnectWallet,
  useLogin,
  usePrivy,
  useWallets,
} from '@privy-io/react-auth';
import {useSignMessage} from '@privy-io/react-auth';
import {useSendTransaction} from '@privy-io/react-auth';
import SuccessPopup from './components/SuccessPopup';
import {AppName, PrimaryColor} from 'app/config';
import useUser from 'app/hooks/useUser';
import {postUserUpdateMember} from 'app/servers/api/member';
import {View} from 'react-native';

const LoginScreen = () => {
  const {t} = useTranslation();
  const {authenticated, ready, getAccessToken} = usePrivy();
  const {push, replace, back, parseNextPath} = useRouter();

  const router = useRouter();

  const {initLogin, initUserInfo, onLink} = useUser();
  const [modalVisible, setModalVisible] = useState(false);
  const [isSetInfo, setIsSetInfo] = useState(false);
  const [accountForm, setAccountForm] = useState({
    nickname: '',
    avatar: '',
  });

  const {login} = useLogin({
    onComplete: async (user) => {
      setModalVisible(true);
      await handleLogin(user);
    },
  });
  // const {signMessage} = usePrivy();
  // const {sendTransaction} = useSendTransaction();
  // const {connectWallet} = useConnectWallet();
  // const {wallets} = useWallets();

  // useEffect(() => {
  //   if (ready && !authenticated) {
  //     // router.push("/");
  //     handleLogin();
  //   }
  // }, [ready, authenticated]);

  const handleLogin = async (user: any) => {
    const token = localStorage.getItem('privy:token');
    const idToken = localStorage.getItem('privy:id_token');
    if (token && idToken) {
      initLogin(JSON.parse(token), JSON.parse(idToken));
      const _userInfo = await initUserInfo();
      if (_userInfo?.nickname) {
        handleSuccess(_userInfo);
      } else {
        setAccountForm({
          nickname: _userInfo?.nickname || '',
          avatar: _userInfo?.avatar || '',
        });
        setIsSetInfo(true);
      }
    }
  };

  const handleSuccess = async (_userInfo: any) => {
    try {
      setIsSetInfo(false);
      setTimeout(async () => {
        await postUserUpdateMember({
          nickname: _userInfo?.customMetadata?.nickname || '',
          avatar: _userInfo?.customMetadata?.avatar || '',
        });
        setModalVisible(false);
        onLink();
      }, 1500);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <PermissionPage isLoginPage>
      <AppHeader2 title={''} fallbackUrl="/" />
      <YStack f={1} pt={'20%'} ai="center" bc="$background">
        <YStack pb={appScale(32 + 24)}>
          <SizableText color="$color" ta="center" fontSize={appScale(24)} fontWeight="700" mb={appScale(32 + 24)}>
            {AppName}
          </SizableText>
          <AppImage
            width={appScale(160)}
            height={appScale(160)}
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
        {/* <Button
          onPress={async () => {
            const message = 'Hello world';
            const uiOptions = {
              title: 'Sample title text',
              description: 'Sample description text',
              buttonText: 'Sample button text',
            };
            // Use `signature` below however you'd like
            const {signature} = await signMessage({message}, {uiOptions});

            console.log('🚀 ~ onPress={ ~ signature:', signature);
          }}
        >
          Sign
        </Button>
        <Button
          onPress={async () => {
            const unsignedTx: UnsignedTransactionRequest = {
              to: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
              chainId: 1,
              value: '0x3B9ACA00',
            };

            const uiConfig: any = {
              header: 'Sample header text',
              description: 'Sample description text',
              buttonText: 'Sample button text',
            };
            const {hash} = await sendTransaction(unsignedTx, {uiOptions: uiConfig});
          }}
        >
          Send ETH
        </Button>

        <Button
          onPress={() => {
            connectWallet();
          }}
        >
          Connect wallet
        </Button>
        <Button
          disabled={!wallets[0]}
          onPress={() => {
            wallets[0].loginOrLink();
          }}
        >
          Login with wallet
        </Button> */}
      </YStack>
      <SuccessPopup
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
