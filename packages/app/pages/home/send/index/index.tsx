/*
 * @Date: 2023-12-18 14:37:38
 * @LastEditors: yosan
 * @LastEditTime: 2025-02-24 16:42:33
 * @FilePath: /ezgg-app/packages/app/pages/home/send/index/index.tsx
 */
import {AppHeader, AppHeaderProps, HeaderBackButton, Paragraph, YStack} from '@my/ui';
import React from 'react';
import {useTranslation} from 'react-i18next';
import PermissionPage from 'app/Components/PermissionPage';

// 发送
const SendToScreen = () => {
  const {t} = useTranslation();
  const HeaderLeft: AppHeaderProps['headerRight'] = () => <HeaderBackButton fallbackUrl="/my"></HeaderBackButton>;
  return (
    <PermissionPage>
      <AppHeader title={t('screen.home.sendTo')} headerLeft={HeaderLeft} />
      <YStack>
        <Paragraph> SendTo 发送</Paragraph>
      </YStack>
    </PermissionPage>
  );
};
export default SendToScreen;
