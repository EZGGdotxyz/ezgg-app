/*
 * @Date: 2023-12-18 14:37:38
 * @LastEditors: yosan
 * @LastEditTime: 2025-02-24 16:31:41
 * @FilePath: /ezgg-app/packages/app/pages/profile/security/index.tsx
 */
import {AppHeader, AppHeaderProps, HeaderBackButton, Paragraph, YStack} from '@my/ui';
import React from 'react';
import {useTranslation} from 'react-i18next';
import PermissionPage from 'app/Components/PermissionPage';

// 安全
const SecurityScreen = () => {
  const {t} = useTranslation();
  const HeaderLeft: AppHeaderProps['headerRight'] = () => <HeaderBackButton fallbackUrl="/my"></HeaderBackButton>;
  return (
    <PermissionPage>
      <AppHeader title={t('screen.profile.security.title')} headerLeft={HeaderLeft} />
      <YStack>
        <Paragraph> Security 安全</Paragraph>
      </YStack>
    </PermissionPage>
  );
};
export default SecurityScreen;
