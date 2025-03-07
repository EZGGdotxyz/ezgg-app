/*
 * @Date: 2023-12-07 15:49:22
 * @LastEditors: yosan
 * @LastEditTime: 2025-03-07 13:03:49
 * @FilePath: /ezgg-app/apps/expo/app/user/prize/use/[id].tsx
 */
import UseScreen from 'app/pages/user/prize/use';
import {Stack, router, useFocusEffect, useRouter} from 'expo-router';
import {useCallback, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Button} from '@my/ui';
import {ChevronLeft} from '@tamagui/lucide-icons';
import { appScale } from 'app/utils';
export default function Page() {
  const {t} = useTranslation();
  const {back, push, replace} = useRouter();

  return (
    <>
      <Stack.Screen
        options={{
          title: t('screen.user.prize.use.title'),
          headerShadowVisible: false,
          headerShown: true,
          headerLeft: () => {
            return (
              <Button
                unstyled
                pressStyle={{
                  opacity: 0.85,
                }}
                onPress={() => {
                  if (router.canGoBack()) {
                    // 如果可以返回上一页，返回上一页
                    back();
                  } else {
                    // 否则，导航到首页
                    replace('/');
                  }
                }}
              >
                <ChevronLeft size={appScale(36)} color={'#428cfc'} />
              </Button>
            );
          },
        }}
      />
      <UseScreen />
    </>
  );
}
