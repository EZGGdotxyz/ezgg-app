/*
 * @Date: 2023-12-07 15:49:22
 * @LastEditors: snapxlabs
 * @LastEditTime: 2024-08-03 16:30:22
 * @FilePath: /snapx-nfc-app-merchants/apps/expo/app/login/index.tsx
 */
import * as WebBrowser from 'expo-web-browser';
import LoginHomeScreen from 'app/pages/auth/login';
import {Stack, useRouter} from 'expo-router';
import {useTranslation} from 'react-i18next';
import {makeRedirectUri, startAsync, useAuthRequest, ResponseType} from 'expo-auth-session';

import useUser from 'app/hooks/useUser';
import {useEffect} from 'react';
import {useToastController} from '@my/ui';
import {StatusBar} from 'react-native';

export default function Page() {
  const {t} = useTranslation();

  const toast = useToastController();

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Stack.Screen
        options={{
          title: t('screen.login.title'),
          headerShown: false,
          headerShadowVisible: false,
        }}
      />
      <LoginHomeScreen />
    </>
  );
}
