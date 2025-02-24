/*
 * @Date: 2023-12-18 14:37:38
 * @LastEditors: yosan
 * @LastEditTime: 2025-02-24 16:29:28
 * @FilePath: /ezgg-app/packages/app/pages/profile/scan/index.tsx
 */
import {AppHeader, AppHeaderProps, HeaderBackButton, Paragraph, YStack} from '@my/ui';
import React from 'react';
import {useTranslation} from 'react-i18next';
import PermissionPage from 'app/Components/PermissionPage';

// 通知
const scanScreen = () => {
  const {t} = useTranslation();
  const HeaderLeft: AppHeaderProps['headerRight'] = () => <HeaderBackButton fallbackUrl="/my"></HeaderBackButton>;
  return (
    <PermissionPage>
      <AppHeader title={t('screen.profile.scan.title')} headerLeft={HeaderLeft} />
      <YStack>
        <Paragraph> scan 拍照</Paragraph>
      </YStack>
    </PermissionPage>
  );
};
export default scanScreen;
