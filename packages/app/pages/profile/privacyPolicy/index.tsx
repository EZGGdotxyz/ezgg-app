/*
 * @Date: 2023-12-18 14:37:38
 * @LastEditors: yosan
 * @LastEditTime: 2025-02-27 17:58:17
 * @FilePath: /ezgg-app/packages/app/pages/profile/privacyPolicy/index.tsx
 */
import {AppHeader, AppHeaderProps, HeaderBackButton, Paragraph, YStack} from '@my/ui';
import React from 'react';
import {useTranslation} from 'react-i18next';
import PermissionPage from 'app/Components/PermissionPage';
import AppHeader2 from 'app/Components/AppHeader2';

// 隱私政策
const PrivacyPolicyScreen = () => {
  const {t} = useTranslation();
  return (
    <PermissionPage isHomePage={true}>
      <AppHeader2 title={t('screen.profile.privacyPolicy.title')} fallbackUrl="/profile" />
      <YStack>
        <Paragraph> PrivacyPolicy 隱私政策</Paragraph>
      </YStack>
    </PermissionPage>
  );
};
export default PrivacyPolicyScreen;
