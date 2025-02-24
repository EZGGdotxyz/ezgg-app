/*
 * @Date: 2023-12-07 15:49:22
 * @LastEditors: snapxlabs
 * @LastEditTime: 2024-07-23 09:43:01
 * @FilePath: /snapx-nfc-app-merchants/apps/expo/app/my/index.tsx
 */
import MyScreen from 'app/pages/profile/home/index';
import {Stack} from 'expo-router';
import {useTranslation} from 'react-i18next';

export default function Page() {
  const {t} = useTranslation();

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: t('screen.my.title'),
          headerShadowVisible: false,
        }}
      />
      <MyScreen />
    </>
  );
}
