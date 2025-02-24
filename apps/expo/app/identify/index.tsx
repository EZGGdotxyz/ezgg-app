/*
 * @Date: 2023-12-07 15:49:22
 * @LastEditors: snapxlabs
 * @LastEditTime: 2024-08-05 15:41:52
 * @FilePath: /snapx-nfc-app-merchants/apps/expo/app/identify/index.tsx
 */
import IdentifyScreen from 'app/pages/identify';
import {Stack, router, useFocusEffect, useRouter} from 'expo-router';
import {useCallback, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Button} from '@my/ui';
import {ChevronLeft} from '@tamagui/lucide-icons';
export default function Page() {
  const {t} = useTranslation();
  const {back, push, replace} = useRouter();

  const [isRefresh, setIsRefresh] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setIsRefresh(true);
      return () => {
        setIsRefresh(false);
        // 在这里执行清理操作，例如取消获取数据
      };
    }, []),
  );

  return (
    <>
      <Stack.Screen
        options={{
          title: t('screen.identify.title'),
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
                <ChevronLeft size={36} color={'#428cfc'} />
              </Button>
            );
          },
        }}
      />
      <IdentifyScreen isRefresh={isRefresh} />
    </>
  );
}
