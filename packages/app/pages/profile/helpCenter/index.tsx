/*
 * @Date: 2023-12-18 14:37:38
 * @LastEditors: yosan
 * @LastEditTime: 2025-02-27 15:40:01
 * @FilePath: /ezgg-app/packages/app/pages/profile/helpCenter/index.tsx
 */
import {AppHeader, AppHeaderProps, HeaderBackButton, Paragraph, YStack} from '@my/ui';
import React from 'react';
import {useTranslation} from 'react-i18next';
import PermissionPage from 'app/Components/PermissionPage';

// 幫助中心
const HelpCenterScreen = () => {
  const {t} = useTranslation();
  const HeaderLeft: AppHeaderProps['headerRight'] = () => <HeaderBackButton fallbackUrl="/my"></HeaderBackButton>;
  return (
    <PermissionPage isHomePage={true}>
      <AppHeader title={t('screen.profile.helpCenter.title')} headerLeft={HeaderLeft} />
      <YStack>
        <Paragraph> HelpCenter 幫助中心</Paragraph>
      </YStack>
    </PermissionPage>
  );
};
export default HelpCenterScreen;
