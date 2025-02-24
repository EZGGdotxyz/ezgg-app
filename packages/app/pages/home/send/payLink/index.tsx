/*
 * @Date: 2023-12-18 14:37:38
 * @LastEditors: yosan
 * @LastEditTime: 2025-02-24 16:53:36
 * @FilePath: /ezgg-app/packages/app/pages/home/send/paylink/index.tsx
 */
import {AppHeader, AppHeaderProps, HeaderBackButton, Paragraph, YStack} from '@my/ui';
import React from 'react';
import {useTranslation} from 'react-i18next';
import PermissionPage from 'app/Components/PermissionPage';

// 链接
const PayLinkScreen = () => {
  const {t} = useTranslation();
  const HeaderLeft: AppHeaderProps['headerRight'] = () => <HeaderBackButton fallbackUrl="/my"></HeaderBackButton>;
  return (
    <PermissionPage>
      <AppHeader title={t('screen.home.paylink')} headerLeft={HeaderLeft} />
      <YStack>
        <Paragraph> Paylink 链接</Paragraph>
      </YStack>
    </PermissionPage>
  );
};
export default PayLinkScreen;
