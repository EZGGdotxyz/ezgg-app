/*
 * @Date: 2023-12-07 15:49:22
 * @LastEditors: yosan
 * @LastEditTime: 2025-03-07 13:03:40
 * @FilePath: /ezgg-app/apps/expo/app/my/gift/index.tsx
 */
import GiftScreen from 'app/pages/my/gift/index';
import {Stack, useRouter, router} from 'expo-router';
import {useTranslation} from 'react-i18next';
import {ChevronLeft} from '@tamagui/lucide-icons';
import {Button} from '@my/ui';
import { appScale } from 'app/utils';
export default function Page() {
  const {t} = useTranslation();
  const {back, push, replace} = useRouter();

  return (
    <>
      <Stack.Screen
        options={{
          title: t('screen.my.gift.title'),
          headerShadowVisible: false,
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
                    replace('/my');
                  }
                }}
              >
                <ChevronLeft size={appScale(36)} color={'#428cfc'} />
              </Button>
            );
          },
        }}
      />
      <GiftScreen />
    </>
  );
}
