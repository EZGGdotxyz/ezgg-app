/*
 * @Date: 2023-12-18 14:37:38
 * @LastEditors: yosan
 * @LastEditTime: 2025-02-24 16:40:58
 * @FilePath: /ezgg-app/packages/app/pages/home/withdraw/index.tsx
 */
import {AppHeader, AppHeaderProps, HeaderBackButton, Paragraph, YStack} from '@my/ui';
import React from 'react';
import {useTranslation} from 'react-i18next';
import PermissionPage from 'app/Components/PermissionPage';

// 提取
const WithdrawScreen = () => {
  const {t} = useTranslation();
  const HeaderLeft: AppHeaderProps['headerRight'] = () => <HeaderBackButton fallbackUrl="/my"></HeaderBackButton>;
  return (
    <PermissionPage>
      <AppHeader title={t('screen.home.withdraw')} headerLeft={HeaderLeft} />
      <YStack>
        <Paragraph> Withdraw 提取</Paragraph>
      </YStack>
    </PermissionPage>
  );
};
export default WithdrawScreen;
