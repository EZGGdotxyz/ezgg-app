/*
 * @Date: 2023-12-18 14:37:38
 * @LastEditors: yosan
 * @LastEditTime: 2025-02-24 16:30:58
 * @FilePath: /ezgg-app/packages/app/pages/profile/about/index.tsx
 */
import {AppHeader, AppHeaderProps, HeaderBackButton, Paragraph, YStack} from '@my/ui';
import React from 'react';
import {useTranslation} from 'react-i18next';
import PermissionPage from 'app/Components/PermissionPage';

// 關於
const AboutScreen = () => {
  const {t} = useTranslation();
  const HeaderLeft: AppHeaderProps['headerRight'] = () => <HeaderBackButton fallbackUrl="/my"></HeaderBackButton>;
  return (
    <PermissionPage>
      <AppHeader title={t('screen.profile.aboutEzgg.title')} headerLeft={HeaderLeft} />
      <YStack>
        <Paragraph> About 關於</Paragraph>
      </YStack>
    </PermissionPage>
  );
};
export default AboutScreen;
