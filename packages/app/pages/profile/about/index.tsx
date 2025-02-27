/*
 * @Date: 2023-12-18 14:37:38
 * @LastEditors: yosan
 * @LastEditTime: 2025-02-27 15:27:30
 * @FilePath: /ezgg-app/packages/app/pages/profile/about/index.tsx
 */
import {AppHeader, AppHeaderProps, HeaderBackButton, Paragraph, YStack} from '@my/ui';
import React from 'react';
import {useTranslation} from 'react-i18next';
import PermissionPage from 'app/Components/PermissionPage';
import AppHeader2 from 'app/Components/AppHeader2';

// 關於
const AboutScreen = () => {
  const {t} = useTranslation();
  return (
    <PermissionPage isHomePage={true}>
      <AppHeader2 title={t('screen.profile.aboutEzgg.title')} fallbackUrl="/profile" />
      <YStack>
        <Paragraph> About 關於</Paragraph>
      </YStack>
    </PermissionPage>
  );
};
export default AboutScreen;
