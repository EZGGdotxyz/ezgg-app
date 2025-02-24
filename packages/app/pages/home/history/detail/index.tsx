/*
 * @Date: 2023-12-18 14:37:38
 * @LastEditors: yosan
 * @LastEditTime: 2025-02-24 16:51:47
 * @FilePath: /ezgg-app/packages/app/pages/home/history/detail/index.tsx
 */
import {AppHeader, AppHeaderProps, HeaderBackButton, Paragraph, YStack} from '@my/ui';
import React from 'react';
import {useTranslation} from 'react-i18next';
import PermissionPage from 'app/Components/PermissionPage';

// 订单详情
const HistoryDetailScreen = () => {
  const {t} = useTranslation();
  const HeaderLeft: AppHeaderProps['headerRight'] = () => <HeaderBackButton fallbackUrl="/my"></HeaderBackButton>;
  return (
    <PermissionPage>
      <AppHeader title={t('screen.home.detail.title')} headerLeft={HeaderLeft} />
      <YStack>
        <Paragraph> Detail 订单详情</Paragraph>
      </YStack>
    </PermissionPage>
  );
};
export default HistoryDetailScreen;
