/*
 * @Date: 2023-12-18 14:37:38
 * @LastEditors: yosan
 * @LastEditTime: 2025-02-24 16:30:16
 * @FilePath: /ezgg-app/packages/app/pages/profile/privacyPolicy/index.tsx
 */
import {AppHeader, AppHeaderProps, HeaderBackButton, Paragraph, YStack} from '@my/ui';
import React from 'react';
import {useTranslation} from 'react-i18next';
import PermissionPage from 'app/Components/PermissionPage';

// 隱私政策
const PrivacyPolicyScreen = () => {
  const {t} = useTranslation();
  const HeaderLeft: AppHeaderProps['headerRight'] = () => <HeaderBackButton fallbackUrl="/my"></HeaderBackButton>;
  return (
    <PermissionPage>
      <AppHeader title={t('screen.profile.privacyPolicy.title')} headerLeft={HeaderLeft} />
      <YStack>
        <Paragraph> PrivacyPolicy 隱私政策</Paragraph>
      </YStack>
    </PermissionPage>
  );
};
export default PrivacyPolicyScreen;
