/*
 * @Date: 2023-12-07 15:49:22
 * @LastEditors: snapxlabs
 * @LastEditTime: 2024-07-22 17:11:09
 * @FilePath: /snapx-nfc-app/apps/expo/app/my/update_phone.tsx
 */
import UpdatePhoneScreen from 'app/pages/my/update_phone';
import {Stack, useRouter, router} from 'expo-router';
import {useTranslation} from 'react-i18next';
import {ChevronLeft} from '@tamagui/lucide-icons';
import {Button} from '@my/ui';
export default function Page() {
  const {t} = useTranslation();
  const {back, push, replace} = useRouter();

  return (
    <>
      <Stack.Screen
        options={{
          title: t('screen.update_phone.title'),
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
                    replace('/my/personal_info');
                  }
                }}
              >
                <ChevronLeft size={appScale(36)} color={'#428cfc'} />
              </Button>
            );
          },
        }}
      />
      <UpdatePhoneScreen />
    </>
  );
}
