/*
 * @Date: 2024-01-10 16:57:40
 * @LastEditors: snapxlabs
 * @LastEditTime: 2024-08-05 15:43:29
 * @FilePath: /snapx-nfc-app-merchants/apps/expo/app/_layout.tsx
 */
import {DarkTheme, DefaultTheme, ThemeProvider} from '@react-navigation/native';
import {Provider} from 'app/provider';
import {useFonts} from 'expo-font';
import {Stack} from 'expo-router';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import {useEffect, useRef, useState} from 'react';
import {router} from 'expo-router';
import {setDeviceToken} from 'app/utils/auth/index';
import {Platform, StatusBar, useColorScheme} from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

function useNotificationObserver() {
  // 设置推送权限
  const registerForPushNotificationsAsync = async () => {
    if (Device.isDevice) {
      const {status: existingStatus} = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const {status} = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      // if (finalStatus !== 'granted') {
      //   alert('Failed to get push token for push notification!');
      //   return;
      // }

      if (Platform.OS === 'ios') {
        const res = await Notifications.getDevicePushTokenAsync();
        if (res) {
          console.log('🚀 ~ 设备 token ~ res:', res.data);
          setDeviceToken(res.data);
          // _registerDevice(res.data);
        }
      }
    }
  };

  useEffect(() => {
    registerForPushNotificationsAsync();
    let isMounted = true;
    const redirect = (notification: Notifications.Notification) => {
      const url = notification.request.content.data?.url;
      if (url) {
        router.push(url);
      } else {
        router.push('/my/message');
      }
    };

    // 从后台进入前台
    Notifications.getLastNotificationResponseAsync().then((response) => {
      if (!isMounted || !response?.notification) {
        return;
      }
      redirect(response?.notification);
    });

    // 从前台进入后台
    const subscription = Notifications.addNotificationResponseReceivedListener((response) => {
      redirect(response.notification);
    });

    return () => {
      isMounted = false;
      subscription.remove();
    };
  }, []);
}

export default function HomeLayout() {
  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  });
  const scheme = 'light'

  // const scheme = 'light'
  useNotificationObserver();

  if (!loaded) {
    return null;
  }
  return (
    <Provider>
      <StatusBar barStyle="dark-content" />
      <ThemeProvider value={scheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack screenOptions={{headerShown: false}} />
      </ThemeProvider>
    </Provider>
  );
}
