/*
 * @Date: 2023-12-18 14:37:38
 * @LastEditors: yosan
 * @LastEditTime: 2025-02-24 18:52:24
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
import {ExternalLinkData, PrimaryColor} from 'app/config';
import PermissionPage from 'app/Components/PermissionPage';
import useUser from 'app/hooks/useUser';
import {useDispatch} from 'react-redux';
import {Dispatch} from 'app/store';
import useRequest from 'app/hooks/useRequest';
import Header from './components/Header';
import {appScale} from 'app/utils';
import CountryPopup from './components/CountryPopup';
// import {notificationGetUnreadCount} from 'app/servers/api/2001Xiaoxitongzhi';

// 我的
const MyScreen = () => {
  const {push, replace, back, parseNextPath} = useRouter();
  const {t, i18n} = useTranslation();
  const {userLogout} = useUser();
  const dispatch = useDispatch<Dispatch>();
  const {makeRequest} = useRequest();
  const [{unread, demoniator}] = useRematchModel('app');
  const [{isLogin}] = useRematchModel('user');
  const [areaCodeList, setAreaCodeList] = useState<any[]>([
    {
      id: '1',
      emoji: '🇺🇸',
      chineseName: '美国',
      englishName: 'USA',
      code: 'USD',
    },
    {
      id: '2',
      emoji: '🇨🇳',
      chineseName: '中国',
      englishName: 'China',
      code: 'CNY',
    },
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [phoneAreaCode, setPhoneAreaCode] = useState<any>({
    id: '1',
    emoji: '🇺🇸',
    chineseName: '美国',
    englishName: 'USA',
    code: 'USD',
  });
  const [isLoading, setIsLoading] = React.useState(false);

  const InfoItems = [
    {
      title: t('profile.home.security'),
      icon: 'security2',
      url: '/profile/security',
      id: 'security',
    },
  ];
  const GeneralItems = [
    ...(isLogin ? InfoItems : []),
    {
      title: t('profile.home.language'),
      icon: 'document',
      url: '/language',
      id: 'language',
    },
    {
      title: t('profile.home.demoniator'),
      icon: 'show',
      url: '/profile/demoniator',
      id: 'demoniator',
    },
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

  const onLogout = async () => {
    setIsLoading(true);
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
            const locale = i18n?.language === 'zh_HK' ? 'en_US' : 'zh_HK';
            setLanguage(locale);
            i18n?.changeLanguage(locale);
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

  const selectCountry = (item) => {
    setPhoneAreaCode(item);
    setModalVisible(false);
    dispatch.app.updateState({
      demoniator: item.code,
    });
  };

  return (
    <PermissionPage isHomePage={true}>
      <Header isLogin={isLogin} />
      <ScrollView w={'100%'} bc="$background" pl={appScale(24)} pr={appScale(24)} pb={appScale(24)} pt={appScale(12)}>
        {isLogin && (
          <XStack w={'100%'} ai="center" jc={'space-between'} pb={appScale(24)}>
            <SizableText fontSize={'$5'} color={'#212121'} h={appScale(28)} lh={appScale(28)}>
              {t('profile.home.general')}
            </SizableText>
            <YStack w={appScale(28)} height={appScale(28)}>
              <AppImage
                width={appScale(28)}
                height={appScale(28)}
                src={require(`app/assets/images/qr.png`)}
                type="local"
              />
            </YStack>
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
        <XStack w={'100%'} pl="$4" pr="$4" mt="$6" pb="$10">
          {!isLogin && (
            <Button
              borderRadius={25}
              h={50}
              w={'100%'}
              jc={'center'}
              ai={'center'}
              bc={'$color'}
              onPress={() => {
                push('/login');
              }}
            >
              <Paragraph col={'$color1'} fontSize={'$3'}>
                {t('operate.button.login')}
              </Paragraph>
            </Button>
          )}
        </XStack>
      </ScrollView>
      <CountryPopup
        areaCodeList={areaCodeList}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        selectCountry={selectCountry}
        phoneAreaCode={phoneAreaCode}
      />
    </PermissionPage>
  );
};

export default MyScreen;
