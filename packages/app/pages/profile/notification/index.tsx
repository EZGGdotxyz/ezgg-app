/*
 * @Date: 2023-12-18 14:37:38
 * @LastEditors: yosan
 * @LastEditTime: 2025-02-27 18:00:15
 * @FilePath: /ezgg-app/packages/app/pages/profile/notification/index.tsx
 */
import {AppHeader, AppHeaderProps, HeaderBackButton, Paragraph, YStack} from '@my/ui';
import React from 'react';
import {useTranslation} from 'react-i18next';
import PermissionPage from 'app/Components/PermissionPage';
import AppHeader2 from 'app/Components/AppHeader2';

// 通知
const NotificationScreen = () => {
  const {t} = useTranslation();
  return (
    <PermissionPage>
      <AppHeader2 title={t('screen.profile.notification.title')} fallbackUrl="/profile" />
      <YStack>
        <Paragraph> Notification 通知</Paragraph>
      </YStack>
    </PermissionPage>
  );
};
export default NotificationScreen;
