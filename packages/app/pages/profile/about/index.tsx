/*
 * @Date: 2023-12-18 14:37:38
 * @LastEditors: yosan
 * @LastEditTime: 2025-03-10 18:41:06
 * @FilePath: /ezgg-app/packages/app/pages/profile/about/index.tsx
 */
import {AppHeader, AppHeaderProps, HeaderBackButton, Paragraph, YStack, SizableText, XStack, ScrollView} from '@my/ui';
import React from 'react';
import {useTranslation} from 'react-i18next';
import PermissionPage from 'app/Components/PermissionPage';
import AppHeader2 from 'app/Components/AppHeader2';
import useResponse from 'app/hooks/useResponse';
// 隱私政策
const AboutScreen = () => {
  const {t} = useTranslation();
  const {appScale} = useResponse();

  return (
    <PermissionPage isHomePage={true}>
      <AppHeader2 title={t('screen.profile.aboutEzgg.title')} fallbackUrl="/profile" />
      <ScrollView flex={1}>
        <YStack f={1} p={appScale(24)}>
          <SizableText fontSize="$4" color="$color" mb={appScale(12)}>
            {t('profile.about.content.1')}
          </SizableText>
          <SizableText fontSize="$4" color="$color" mb={appScale(12)}>
            {t('profile.about.content.2')}
          </SizableText>
          <YStack>
            <SizableText fontSize="$6" fontWeight="700" color="$color" mb={appScale(16)}>
              {t('profile.about.content.3')}
            </SizableText>
            <SizableText fontSize="$4" color="$color" mb={appScale(12)}>
              {t('profile.about.content.4')}
            </SizableText>
            <SizableText fontSize="$4" color="$color" mb={appScale(12)}>
              {t('profile.about.content.5')}
            </SizableText>
            <SizableText fontSize="$4" color="$color" mb={appScale(12)}>
              {t('profile.about.content.6')}
            </SizableText>
          </YStack>

          <YStack>
            <SizableText fontSize="$6" fontWeight="700" color="$color" mb={appScale(16)}>
              {t('profile.about.content.7')}
            </SizableText>
            <SizableText fontSize="$4" color="$color" mb={appScale(12)}>
              {t('profile.about.content.8')}
            </SizableText>
            <SizableText fontSize="$4" color="$color" mb={appScale(12)}>
              {t('profile.about.content.8')}
            </SizableText>
            <SizableText fontSize="$4" color="$color" mb={appScale(12)}>
              {t('profile.about.content.10')}
            </SizableText>
          </YStack>
          <YStack>
            <SizableText fontSize="$6" fontWeight="700" color="$color" mb={appScale(16)}>
              {t('profile.about.content.11')}
            </SizableText>
            <SizableText fontSize="$4" color="$color" mb={appScale(12)}>
              {t('profile.about.content.12')}
            </SizableText>
          </YStack>
          <SizableText fontSize="$4" color="$color" mb={appScale(12)}>
            {t('profile.about.content.13')}
          </SizableText>
        </YStack>
      </ScrollView>
    </PermissionPage>
  );
};
export default AboutScreen;
