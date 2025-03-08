/*
 * @Date: 2023-12-18 14:37:38
 * @LastEditors: yosan
 * @LastEditTime: 2025-03-08 15:25:30
 * @FilePath: /ezgg-app/packages/app/pages/profile/notification/index.tsx
 */
import {AppImage, Button, Label, ScrollView, Separator, SizableText, Switch, XStack, YStack} from '@my/ui';
import useRequest from 'app/hooks/useRequest';
import {useRematchModel} from 'app/store/model';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import PermissionPage from 'app/Components/PermissionPage';
import {PrimaryColor} from 'app/config';
import AppHeader2 from 'app/Components/AppHeader2';
import {getSettingFindSetting, postSettingUpdateSetting} from 'app/servers/api/setting';
import AppLoading from 'app/Components/AppLoading';
import useResponse from 'app/hooks/useResponse';
const NotificationScreen = () => {
  const {t} = useTranslation();
  const {makeRequest} = useRequest();
  const [{isLogin, userInfo}] = useRematchModel('user');
  const [loading, setLoading] = useState(false);
  const {appScale} = useResponse();

  const [notifications, setNotifications] = useState<any>({
    notifyTransUpdate: false,
    notifyAbnormalAlarm: false,
    notifyPayRequest: false,
    notifyCardActivity: false,
    notifyCustomerSupport: false,
    notifyBalanceAlarm: false,
    notifySecureAlarm: false,
    notifySummary: false,
    sysAppUpdate: false,
    sysSalesPromotion: false,
    sysSurvey: false,
  });

  const generalList = [
    {
      id: 'notifyTransUpdate',
      title: t('profile.notification.general1'),
      value: notifications.notifyTransUpdate,
    },
    {
      id: 'notifyAbnormalAlarm',
      title: t('profile.notification.general2'),
      value: notifications.notifyAbnormalAlarm,
    },
    {
      id: 'notifyPayRequest',
      title: t('profile.notification.general3'),
      value: notifications.notifyPayRequest,
    },
    {
      id: 'notifyCardActivity',
      title: t('profile.notification.general4'),
      value: notifications.notifyCardActivity,
    },
    {
      id: 'notifyCustomerSupport',
      title: t('profile.notification.general5'),
      value: notifications.notifyCustomerSupport,
    },
    {
      id: 'notifyBalanceAlarm',
      title: t('profile.notification.general6'),
      value: notifications.notifyBalanceAlarm,
    },
    {
      id: 'notifySecureAlarm',
      title: t('profile.notification.general7'),
      value: notifications.notifySecureAlarm,
    },
    {
      id: 'notifySummary',
      title: t('profile.notification.general8'),
      value: notifications.notifySummary,
    },
  ];

  useEffect(() => {
    _getSettingFindSetting();
  }, []);

  const toggleSwitch = async (key: string) => {
    const newNotifications = {
      ...notifications,
      [key]: !notifications[key as keyof typeof notifications],
    };
    setNotifications(newNotifications);
    await _postSettingUpdateSetting(newNotifications);
  };

  const appList = [
    {
      id: 'sysAppUpdate',
      title: t('profile.notification.app1'),
      value: notifications.sysAppUpdate,
    },
    {
      id: 'sysSalesPromotion',
      title: t('profile.notification.app2'),
      value: notifications.sysSalesPromotion,
    },
    {
      id: 'sysSurvey',
      title: t('profile.notification.app3'),
      value: notifications.sysSurvey,
    },
  ];

  // 获取通知配置
  const _getSettingFindSetting = async () => {
    const res = await makeRequest(getSettingFindSetting());


    if (res?.data) {
      setNotifications({
        notifyTransUpdate: res?.data?.notifyTransUpdate,
        notifyAbnormalAlarm: res?.data?.notifyAbnormalAlarm,
        notifyPayRequest: res?.data?.notifyPayRequest,
        notifyCardActivity: res?.data?.notifyCardActivity,
        notifyCustomerSupport: res?.data?.notifyCustomerSupport,
        notifyBalanceAlarm: res?.data?.notifyBalanceAlarm,
        notifySecureAlarm: res?.data?.notifySecureAlarm,
        notifySummary: res?.data?.notifySummary,
        sysAppUpdate: res?.data?.sysAppUpdate,
        sysSalesPromotion: res?.data?.sysSalesPromotion,
        sysSurvey: res?.data?.sysSurvey,
      });
    }
  };
  const _postSettingUpdateSetting = async (newNotifications = notifications) => {
    setLoading(true);
    console.log('🚀 ~ const_postSettingUpdateSetting= ~ userInfo:', userInfo);

    const res = await makeRequest(
      postSettingUpdateSetting({
        memberId: userInfo?.customMetadata?.id,
        ...newNotifications,
      }),
    );
    setLoading(false);
    return res;
  };

  return (
    <PermissionPage>
      <AppHeader2 title={t('screen.profile.notification.title')} fallbackUrl="/profile" />
      <YStack space="$4" paddingVertical={appScale(16)}>
        <XStack ai="center" pl={appScale(24)} pr={appScale(24)}>
          <SizableText fontSize={'$3'} color={'#9E9E9E'} mr={'$4'}>
            {t('profile.notification.general')}
          </SizableText>
          <XStack h={2} flex={1} bc={'rgba(238, 238, 238, 1)'}></XStack>
        </XStack>
        <YStack backgroundColor="$background">
          {generalList.map((item, index) => (
            <XStack
              justifyContent="space-between"
              alignItems="center"
              pl={appScale(24)}
              pr={appScale(24)}
              pt={appScale(14)}
              pb={appScale(14)}
              w="100%"
            >
              <YStack flex={1}>
                <SizableText fontSize={'$3'} color={'#212121'} fow={'500'}>
                  {item?.title}
                </SizableText>
              </YStack>
              <YStack flexShrink={0} pl={appScale(20)}>
                <Switch
                  native
                  size={'$3'}
                  bc={item.value ? PrimaryColor : '#E0E0E0'}
                  checked={item.value}
                  onCheckedChange={() => toggleSwitch(item.id)}
                >
                  <Switch.Thumb bc={'#fff'} animation="quick" />
                </Switch>
              </YStack>
            </XStack>
          ))}
        </YStack>

        <XStack ai="center" pl={appScale(24)} pr={appScale(24)}>
          <SizableText fontSize={'$3'} color={'#9E9E9E'} mr={'$4'}>
            {t('profile.notification.app')}
          </SizableText>
          <XStack h={2} flex={1} bc={'rgba(238, 238, 238, 1)'}></XStack>
        </XStack>
        <YStack backgroundColor="$background">
          {appList.map((item, index) => (
            <XStack
              justifyContent="space-between"
              alignItems="center"
              pl={appScale(24)}
              pr={appScale(24)}
              pt={appScale(14)}
              pb={appScale(14)}
              w="100%"
            >
              <YStack flex={1}>
                <SizableText fontSize={'$4'} color={'#212121'} fow={'600'}>
                  {item?.title}
                </SizableText>
              </YStack>
              <YStack flexShrink={0} pl={appScale(20)}>
                <Switch
                  native
                  size={'$3'}
                  bc={item.value ? PrimaryColor : '#E0E0E0'}
                  checked={item.value}
                  onCheckedChange={() => toggleSwitch(item.id)}
                >
                  <Switch.Thumb bc={'#fff'} animation="quick" />
                </Switch>
              </YStack>
            </XStack>
          ))}
        </YStack>
      </YStack>
      {/* {loading && <AppLoading />} */}
    </PermissionPage>
  );
};

export default NotificationScreen;
