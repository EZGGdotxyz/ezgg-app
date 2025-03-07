/*
 * @Date: 2023-12-07 15:49:22
 * @LastEditors: yosan
 * @LastEditTime: 2025-03-07 13:03:36
 * @FilePath: /ezgg-app/apps/expo/app/my/check_in/record/index.tsx
 */
import CheckInRecordScreen from 'app/pages/my/check_in/record';
import {Stack, router, useFocusEffect, useRouter} from 'expo-router';
import {useCallback, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Button} from '@my/ui';
import {ChevronLeft} from '@tamagui/lucide-icons';
import { appScale } from 'app/utils';
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
          title: t('screen.my.check_in.record.title'),
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
      <CheckInRecordScreen isRefresh={isRefresh} />
    </>
  );
}
