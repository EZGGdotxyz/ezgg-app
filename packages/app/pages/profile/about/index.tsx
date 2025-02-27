/*
 * @Date: 2023-12-18 14:37:38
 * @LastEditors: yosan
 * @LastEditTime: 2025-02-27 21:38:21
 * @FilePath: /ezgg-app/packages/app/pages/profile/about/index.tsx
 */
import {AppHeader, AppHeaderProps, HeaderBackButton, Paragraph, YStack, XStack, SizableText, AppImage} from '@my/ui';
import React from 'react';
import {useTranslation} from 'react-i18next';
import PermissionPage from 'app/Components/PermissionPage';
import AppHeader2 from 'app/Components/AppHeader2';
import {appScale} from 'app/utils';
import {useRouter} from 'solito/router';
import {PrimaryColor} from 'app/config';
import { ChevronRight } from '@tamagui/lucide-icons';

// 關於
const AboutScreen = () => {
  const {t} = useTranslation();
  const {push} = useRouter();

  const menuItems = [
    {
      id: 'job_vacancy',
      title: t('screen.profile.aboutEzgg.jobVacancy'),
      url: '/profile/job_vacancy',
    },
    {
      id: 'developer',
      title: t('screen.profile.aboutEzgg.developer'),
      url: '/profile/developer',
    },
    {
      id: 'partner',
      title: t('screen.profile.aboutEzgg.partner'),
      url: '/profile/partner',
    },
    {
      id: 'accessibility',
      title: t('screen.profile.aboutEzgg.accessibility'),
      url: '/profile/accessibility',
    },
    {
      id: 'terms',
      title: t('screen.profile.aboutEzgg.termsOfUse'),
      url: '/profile/terms',
    },
    {
      id: 'feedback',
      title: t('screen.profile.aboutEzgg.feedback'),
      url: '/profile/feedback',
    },
    {
      id: 'rate',
      title: t('screen.profile.aboutEzgg.rateUs'),
      url: '/profile/rate',
    },
    {
      id: 'website',
      title: t('screen.profile.aboutEzgg.visitWebsite'),
      url: '/profile/website',
    },
    {
      id: 'social',
      title: t('screen.profile.aboutEzgg.followSocial'),
      url: '/profile/social',
    },
  ];

  return (
    <PermissionPage isHomePage={true}>
      <AppHeader2 title={t('screen.profile.aboutEzgg.title')} fallbackUrl="/profile" />
      <YStack f={1} backgroundColor="$background" px={appScale(24)} py={appScale(24)} space={appScale(24)}>
        <YStack ai="center" space={appScale(8)}>
          <AppImage
            width={appScale(60)}
            height={appScale(60)}
            src={require('app/assets/images/logo.png')}
            type="local"
          />
          <SizableText fontSize="$6" fontWeight="700" color="$color">
            ezgg v5.7.9
          </SizableText>
        </YStack>

        <YStack space={appScale(4)}>
          {menuItems.map((item) => (
            <XStack
              key={item.id}
              height={appScale(56)}
              ai="center"
              jc="space-between"
              px={appScale(16)}
              py={appScale(12)}
              backgroundColor="$background"
              borderRadius={appScale(8)}
              pressStyle={{opacity: 0.8}}
              onPress={() => push(item.url)}
            >
              <SizableText fontSize="$4" fontWeight="500" color="$color">
                {item.title}
              </SizableText>
                <ChevronRight color={'#212121'} size={24} />

            </XStack>
          ))}
        </YStack>
      </YStack>
    </PermissionPage>
  );
};
export default AboutScreen;
