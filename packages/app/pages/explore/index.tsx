/*
 * @Date: 2023-12-18 14:37:38
 * @LastEditors: yosan
 * @LastEditTime: 2025-02-24 16:57:34
 * @FilePath: /ezgg-app/packages/app/pages/explore/index.tsx
 */
import {AppHeader, AppHeaderProps, HeaderBackButton, Paragraph, YStack} from '@my/ui';
import React from 'react';
import {useTranslation} from 'react-i18next';
import PermissionPage from 'app/Components/PermissionPage';

// 掃描
const ExploreScreen = () => {
  const {t} = useTranslation();
  const HeaderLeft: AppHeaderProps['headerRight'] = () => <HeaderBackButton fallbackUrl="/my"></HeaderBackButton>;
  return (
    <PermissionPage>
      <AppHeader title={t('screen.explore.title')} headerLeft={HeaderLeft} />
      <YStack>
        <Paragraph> Explore 掃描 QR 碼</Paragraph>
      </YStack>
    </PermissionPage>
  );
};
export default ExploreScreen;
