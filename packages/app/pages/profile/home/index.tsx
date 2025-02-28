/*
 * @Date: 2023-12-18 14:37:38
 * @LastEditors: yosan
 * @LastEditTime: 2025-02-28 11:15:53
 * @FilePath: /ezgg-app/packages/app/pages/profile/home/index.tsx
 */
import {
  AppHeader,
  AppHeaderProps,
  AppImage,
  Button,
  HeaderBackButton,
  Paragraph,
  ScrollView,
  SizableText,
  Text,
  Windowing,
  XStack,
  YStack,
} from '@my/ui';
import {ChevronRight} from '@tamagui/lucide-icons';
import {useRematchModel} from 'app/store/model';
import {setLanguage} from 'app/utils/auth';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useRouter} from 'solito/router';
export const ESTIMATED_ITEM_SIZE = 90;
import {ComponentProps} from 'react';
import {ActivityIndicator, Platform} from 'react-native';
import {Link} from 'solito/link';
import PermissionPage from 'app/Components/PermissionPage';
import useUser from 'app/hooks/useUser';
import {useDispatch} from 'react-redux';
import {Dispatch} from 'app/store';
import useRequest from 'app/hooks/useRequest';
import Header from './components/Header';
import {appScale} from 'app/utils';
import ChainPopup from './components/ChainPopup';
import MyQrCodePopup from './components/MyQrCodePopup';
import {usePrivy} from '@privy-io/react-auth';
import AppButton from 'app/Components/AppButton';
import AppLoading from 'app/Components/AppLoading';
// import {notificationGetUnreadCount} from 'app/servers/api/2001Xiaoxitongzhi';

// 我的
const MyScreen = () => {
  const {push, replace, back, parseNextPath} = useRouter();
  const {t, i18n} = useTranslation();
  const {userLogout} = useUser();
  const {ready, authenticated, logout} = usePrivy();
  const {initUserInfo} = useUser();

  const dispatch = useDispatch<Dispatch>();
  const {makeRequest} = useRequest();
  const [{unread, demoniator}] = useRematchModel('app');
  const [{isLogin, userInfo}] = useRematchModel('user');

  const [chainList, setChainList] = useState<any[]>([
    {
      id: '1',
      emoji: '🇺🇸',
      chineseName: '美元',
      englishName: 'US dollar',
      code: 'USD',
    },
    {
      id: '2',
      emoji: '🇨🇳',
      chineseName: '人民幣',
      englishName: 'Chinese yuan',
      code: 'CNY',
    },
    {
      id: '3',
      emoji: '🇭🇰',
      chineseName: '港幣',
      englishName: 'Hong Kong dollar',
      code: 'HKD',
    },
    {
      id: '4',
      emoji: '🇸🇬',
      chineseName: '新加坡幣',
      englishName: 'Singapore dollar',
      code: 'SGD',
    },
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [chainData, setChainData] = useState<any>({
    id: '1',
    emoji: '🇺🇸',
    chineseName: '美元',
    englishName: 'US dollar',
    code: 'USD',
  });
  const [isLoading, setIsLoading] = React.useState(false);

  const InfoItems = [
    // {
    //   title: t('profile.home.security'),
    //   icon: 'security2',
    //   url: '/profile/security',
    //   id: 'security',
    // },
    {
      title: t('profile.home.demoniator'),
      icon: 'show',
      url: '/profile/demoniator',
      id: 'demoniator',
    },
  ];
  const GeneralItems = [
    // ...(isLogin ? InfoItems : []),
    {
      title: t('profile.home.language'),
      icon: 'document',
      url: '/language',
      id: 'language',
    },

    ...(isLogin ? InfoItems : []),
  ];

  const LogoutItems = [
    {
      title: t('profile.home.logout'),
      icon: 'logout',
      id: 'logout',
    },
  ];

  const AboutItems = [
    {
      title: t('profile.home.helpCenter'),
      icon: 'paper',
      url: '/profile/helpCenter',
      id: 'helpCenter',
    },
    {
      title: t('profile.home.privacyPolicy'),
      icon: 'lock',
      url: '/profile/privacyPolicy',
      id: 'privacyPolicy',
    },
    {
      title: t('profile.home.aboutEzgg'),
      icon: 'infoSquare',
      url: '/profile/about',
      id: 'aboutEzgg',
    },
    ...(isLogin ? LogoutItems : []),
  ];

  useEffect(() => {
    if (isLogin) {
      initUserInfo();
    }
  }, [isLogin]);

  const onLogout = async () => {
    setIsLoading(true);
    logout();
    await userLogout();
    setIsLoading(false);
    push('/');
  };

  const Row = (item: any) => {
    return (
      <Button
        unstyled
        pressStyle={{
          opacity: 0.85,
        }}
        w={'100%'}
        flexDirection="row"
        paddingVertical="$3"
        // paddingHorizontal="$2"
        space="$2"
        key={item.id}
        jc={'space-between'}
        onPress={async () => {
          if (item.id === 'language') {
            setIsLoading(true);
            setTimeout(() => {
              const locale = i18n?.language === 'zh_HK' ? 'en_US' : 'zh_HK';
              setLanguage(locale);
              i18n?.changeLanguage(locale);
              setIsLoading(false);
            }, 1000);
          } else if (item.id === 'logout') {
            onLogout();
          } else if (item.type === '_blank') {
            if (Platform.OS !== 'web') {
              const openBrowserAsync = require('expo-web-browser').openBrowserAsync;
              openBrowserAsync(item.url);
            } else {
              window.open(item.url, '_blank');
            }
          } else if (item.id === 'demoniator') {
            setModalVisible(true);
          } else {
            push(item.url);
          }
        }}
      >
        <YStack w={appScale(48)} flexShrink={0}>
          <AppImage
            width={appScale(24)}
            height={appScale(24)}
            src={require(`app/assets/images/${item.icon}.png`)}
            type="local"
          />
        </YStack>
        <XStack flex={1}>
          <SizableText fow={'700'} color={item.id === 'logout' ? '#F75555' : '#212121'} fontSize="$4">
            {item.title}
          </SizableText>
          {/* {unread > 0 && item.id === 'message' && (
            <XStack pos="absolute" t={1} r={-1} h={'100%'} w={8}>
              <XStack w={8} h={8} borderRadius={4} bc={'red'}></XStack>
            </XStack>
          )} */}
        </XStack>
        <XStack jc={'center'} ai={'center'} pos={'relative'}>
          {item.id === 'language' && (
            <SizableText fow={'600'} color={'#212121'} fontSize="$2">
              {t('profile.home.language.zh_hk')}
            </SizableText>
          )}
          {item.id === 'demoniator' && (
            <SizableText fow={'600'} color={'#212121'} fontSize="$2">
              {demoniator}
            </SizableText>
          )}
          {item.id !== 'logout' && <ChevronRight color={'#212121'} />}
        </XStack>
      </Button>
    );
  };

  const selectChain = (item) => {
    setChainData(item);
    setModalVisible(false);
    dispatch.app.updateState({
      demoniator: item.code,
    });
  };

  return (
    <PermissionPage isHomePage={true}>
      <Header isLogin={isLogin} />
      <ScrollView flex={1} w={'100%'} bc="#fff">
        <YStack pl={appScale(24)} pr={appScale(24)} pb={appScale(24)} pt={appScale(12)}>
          {isLogin && (
            <XStack w={'100%'} ai="center" jc={'space-between'} pb={appScale(24)}>
              <SizableText fontSize={'$5'} color={'#212121'} h={appScale(28)} lh={appScale(28)}>
                @{userInfo?.customMetadata?.nickname}
              </SizableText>
              <Button
                unstyled
                onPress={() => setModalVisible2(true)}
                pressStyle={{
                  opacity: 0.85,
                }}
                w={appScale(28)}
                height={appScale(28)}
              >
                <AppImage
                  width={appScale(28)}
                  height={appScale(28)}
                  src={require(`app/assets/images/qr.png`)}
                  type="local"
                />
              </Button>
            </XStack>
          )}
          <YStack w={'100%'} ai="center" br={'$3'} bc={'$background'} p={'$3'}>
            <XStack w={'100%'} ai="center">
              <SizableText fontSize={'$3'} color={'#9E9E9E'} mr={'$4'}>
                {t('profile.home.general')}
              </SizableText>
              <XStack h={2} flex={1} bc={'rgba(238, 238, 238, 1)'}></XStack>
            </XStack>
            {GeneralItems.map((item) => {
              return Row(item);
            })}
          </YStack>
          <YStack w={'100%'} ai="center" br={'$3'} bc={'$background'} p={'$3'}>
            <XStack w={'100%'} ai="center">
              <SizableText fontSize={'$3'} color={'#9E9E9E'} mr={'$4'}>
                {t('profile.home.about')}
              </SizableText>
              <XStack h={2} flex={1} bc={'rgba(238, 238, 238, 1)'}></XStack>
            </XStack>
            {AboutItems.map((item) => {
              return Row(item);
            })}
          </YStack>
          <XStack w={'100%'} mt="$6" pb="$10">
            {!isLogin && (
              <AppButton
                onPress={() => {
                  push('/login');
                }}
              >
                {t('login.loginButton')}
              </AppButton>
            )}
          </XStack>
        </YStack>
      </ScrollView>
      <ChainPopup
        chainList={chainList}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        selectChain={selectChain}
        chainData={chainData}
      />
      <MyQrCodePopup
        userId={userInfo?.customMetadata?.id}
        modalVisible={modalVisible2}
        setModalVisible={setModalVisible2}
      />
      {isLoading && <AppLoading />}
    </PermissionPage>
  );
};

export default MyScreen;
