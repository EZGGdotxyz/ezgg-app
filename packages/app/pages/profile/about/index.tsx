/*
 * @Date: 2023-12-18 14:37:38
 * @LastEditors: yosan
 * @LastEditTime: 2025-03-08 15:24:47
 * @FilePath: /ezgg-app/packages/app/pages/profile/about/index.tsx
 */
import {
  AppHeader,
  AppHeaderProps,
  HeaderBackButton,
  Paragraph,
  YStack,
  XStack,
  SizableText,
  AppImage,
  Button,
} from '@my/ui';
import React from 'react';
import {useTranslation} from 'react-i18next';
import PermissionPage from 'app/Components/PermissionPage';
import AppHeader2 from 'app/Components/AppHeader2';
import {useRouter} from 'solito/router';
import {PrimaryColor} from 'app/config';
import {ChevronRight} from '@tamagui/lucide-icons';
import useResponse from 'app/hooks/useResponse';
// 關於
const AboutScreen = () => {
  const {t} = useTranslation();
  const {push} = useRouter();
  const {appScale} = useResponse();

  const menuItems = [
    {
      id: 'job_vacancy',
      title: t('profile.about.1'),
      url: '/profile/job_vacancy',
    },
    {
      id: 'developer',
      title: t('profile.about.2'),
      url: '/profile/developer',
    },
    {
      id: 'partner',
      title: t('profile.about.3'),
      url: '/profile/partner',
    },
    {
      id: 'accessibility',
      title: t('profile.about.4'),
      url: '/profile/accessibility',
    },
    {
      id: 'terms',
      title: t('profile.about.5'),
      url: '/profile/terms',
    },
    {
      id: 'feedback',
      title: t('profile.about.6'),
      url: '/profile/feedback',
    },
    {
      id: 'rate',
      title: t('profile.about.7'),
      url: '/profile/rate',
    },
    {
      id: 'website',
      title: t('profile.about.8'),
      url: '/profile/website',
    },
    {
      id: 'social',
      title: t('profile.about.9'),
      url: '/profile/social',
    },
  ];

  return (
    <PermissionPage isHomePage={true}>
      <AppHeader2 title={t('screen.profile.aboutEzgg.title')} fallbackUrl="/profile" />
      <YStack f={1} backgroundColor="$background" px={appScale(24)} py={appScale(24)} space={appScale(24)}>
        <YStack ai="center" space={appScale(8)}>
        <AppImage
            width={appScale(285 / 3)}
            height={appScale(322 / 3)}
            src={require('app/assets/images/logo.png')}
            type="local"
          />
          <SizableText fontSize="$7" fontWeight="700" color="#212121">
            ezgg v5.7.9
          </SizableText>
        </YStack>

        <YStack space={appScale(4)}>
          {menuItems.map((item) => (
            <Button
              unstyled
              key={item.id}
              height={appScale(56)}
              ai="center"
              flexDirection="row"
              jc="space-between"
              // px={appScale(16)}
              py={appScale(14)}
              backgroundColor="#fff"
              borderRadius={appScale(8)}
              pressStyle={{opacity: 0.8}}
              // onPress={() => push(item.url)}
            >
              <SizableText fontSize="$6" fontWeight="600" color="#212121">
                {item.title}
              </SizableText>
              <ChevronRight color={'#212121'} size={appScale(24)} />
            </Button>
          ))}
        </YStack>
      </YStack>
    </PermissionPage>
  );
};
export default AboutScreen;
