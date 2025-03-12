/*
 * @Date: 2023-12-07 15:49:22
 * @LastEditors: yosan
 * @LastEditTime: 2025-03-12 17:42:43
 * @FilePath: /ezgg-app/packages/app/pages/home/index/index.tsx
 */
import {AppImage, Button, Label, ScrollView, Separator, SizableText, XStack, YStack} from '@my/ui';
import useRequest from 'app/hooks/useRequest';
import HomeHeader from './components/HomeHeader';
import {useRematchModel} from 'app/store/model';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useRouter} from 'solito/router';
import PermissionPage from 'app/Components/PermissionPage';
import {useDispatch} from 'react-redux';
import {Dispatch} from 'app/store';
import {Platform, useColorScheme} from 'react-native';
// import {pushingRegisterDevice} from 'app/servers/api/2000Yidongtuisongguanli';
import { formatNumber, getCurrency} from 'app/utils';
import {PrimaryColor} from 'app/config';
import HomeList from './components/HomeList';
import AppLoading from 'app/Components/AppLoading';
import {getNotificationGetUnreadCount} from 'app/servers/api/notification';
import useResponse from 'app/hooks/useResponse';

interface HomeScreenProps {}
// 首页
const HomeScreen = () => {
  const { appScale } = useResponse();
  const {t, i18n} = useTranslation();
  const {makeRequest} = useRequest();
  const dispatch = useDispatch<Dispatch>();

  const [{currency}] = useRematchModel('app');
  const [{isLogin, availableBalance}] = useRematchModel('user');
  const {push} = useRouter();

  const [unread, setUnread] = useState(0);
  const [navSelected, setNavSelected] = useState('send');
  const [isLoading, setIsLoading] = useState(false);

  const [switchOn, setSwitchOn] = useState(false);
  useEffect(() => {
    if (isLogin) {
    }
  }, [isLogin]);

  const navList = [
    {
      id: 'send',
      icon: require('app/assets/images/send.png'),
      title: t('home.send'),
      url: '/home/send',
    },
    {
      id: 'request',
      icon: require('app/assets/images/request.png'),
      title: t('home.request'),
      url: '/home/request',
    },
    {
      id: 'topUp',
      icon: require('app/assets/images/topUp.png'),
      title: t('home.topUp'),
      url: '/home/deposit',
    },
    {
      id: 'withdraw',
      icon: require('app/assets/images/withdraw.png'),
      title: t('home.withdraw'),
      url: '/home/withdraw',
    },
  ];

  // 获取 未读消息数
  const _getUnread = async () => {
    const res = await makeRequest(getNotificationGetUnreadCount());
    if (res?.data) {
      dispatch.app.updateState({
        unread: res?.data,
      });
    } else {
      dispatch.app.updateState({
        unread: 0,
      });
    }
  };

  useEffect(() => {
    isLogin && _getUnread();
  }, [isLogin]);

  return (
    <PermissionPage isHomePage={true}>
      <HomeHeader isLogin={isLogin} />
      <YStack
        flexShrink={0}
        pt={appScale(8)}
        pl={appScale(24)}
        pr={appScale(24)}
        pb={appScale(24)}
        w={'100%'}
        // h={appScale(100)}
        bc={PrimaryColor}
      >
        <YStack pb={appScale(24)}>
          <XStack ai={'flex-start'} jc={'center'} w={'100%'}>
            <SizableText
              pos="relative"
              col={'#212121'}
              h={appScale(60)}
              lh={appScale(60)}
              ta={'center'}
              fontSize={'$9'}
              fow={'700'}
            >
              {formatNumber(availableBalance)}
            </SizableText>
            <SizableText col={'#212121'} ta={'center'} fontSize={'$5'} fow={'600'}>
              {getCurrency(currency)?.symbol}
            </SizableText>
          </XStack>
          <SizableText col={'$color'} h={appScale(28)} lh={appScale(28)} ta={'center'} fontSize={'$3'} fow={'500'}>
            {t('home.balance')}
          </SizableText>
        </YStack>
        <XStack w={'100%'} jc={'space-between'} flexWrap={'wrap'}>
          {navList.map((item, index) => (
            <Button
              key={index}
              flex={1}
              unstyled
              onPress={() => {
                push(item.url);
              }}
            >
              <YStack ai={'center'}>
                <AppImage width={appScale(60)} height={appScale(60)} src={item.icon} type="local" />
                <SizableText mt={appScale(12)} lh={appScale(26)} col={'$color'} fontSize={'$4'} fow={'700'}>
                  {item.title}
                </SizableText>
              </YStack>
            </Button>
          ))}
        </XStack>
      </YStack>
      <XStack w={'100%'} bc="$background" flexShrink={0} pt={appScale(24)} ai="center" jc="center">
        <XStack
          position="relative"
          width={appScale(326)}
          height={appScale(56)}
          br={appScale(28)}
          bc={'#EBEFF1'}
          onPress={() => setSwitchOn(!switchOn)}
        >
          <XStack
            animation="quick"
            position="absolute"
            top={appScale(4)}
            width={appScale(158)}
            height={appScale(48)}
            br={appScale(24)}
            bc="#FFFFFF"
            x={switchOn ? appScale(164) : appScale(4)}
          />
          <XStack top={0} position="absolute" w={'100%'} h={'100%'}>
            <SizableText
              w={'50%'}
              ta={'center'}
              col={!switchOn ? '$color' : '$color11'}
              fontSize={'$4'}
              fow={'500'}
              height={appScale(56)}
              lh={appScale(56)}
            >
              {t('home.portfolio')}
            </SizableText>
            <SizableText
              w={'50%'}
              height={appScale(56)}
              lh={appScale(56)}
              ta={'center'}
              col={switchOn ? '$color' : '$color11'}
              fow={'500'}
              fontSize={'$4'}
            >
              {t('home.history')}
            </SizableText>
          </XStack>
        </XStack>
      </XStack>
      <HomeList switchOn={switchOn} setIsLoading={setIsLoading} />
      {isLoading && <AppLoading />}
    </PermissionPage>
  );
};

export default HomeScreen;
