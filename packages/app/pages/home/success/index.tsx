/*
 * @Date: 2023-12-18 14:37:38
 * @LastEditors: yosan
 * @LastEditTime: 2025-02-26 20:49:43
 * @FilePath: /ezgg-app/packages/app/pages/home/success/index.tsx
 */
import {
  AppHeader,
  AppHeaderProps,
  AppImage,
  Button,
  HeaderBackButton,
  Paragraph,
  ScrollView,
  SizableText,
  Text,
  Windowing,
  XStack,
  YStack,
} from '@my/ui';
import {useRematchModel} from 'app/store/model';
import {setLanguage} from 'app/utils/auth';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useRouter} from 'solito/router';
export const ESTIMATED_ITEM_SIZE = 90;
import {ComponentProps} from 'react';
import {ActivityIndicator, Platform} from 'react-native';
import {Link} from 'solito/link';
import PermissionPage from 'app/Components/PermissionPage';
import useUser from 'app/hooks/useUser';
import {useDispatch} from 'react-redux';
import {Dispatch} from 'app/store';
import useRequest from 'app/hooks/useRequest';
import Header from './components/Header';
import SuccessInfo from 'app/components/SuccessInfo';
import {appScale} from 'app/utils';
import {createParam} from 'solito';
// import {notificationGetUnreadCount} from 'app/servers/api/2001Xiaoxitongzhi';
const {useParams} = createParam<any>();

// 成功页面
const SuccessScreen = () => {
  const {push, replace, back, parseNextPath} = useRouter();
  const {params} = useParams();

  console.log('🚀 ~ SuccessScreen ~ params:', params);

  const demoOrderData = {
    amount: 100,
    fee: 1,
    token: 'USDC',
    chain: 'BSC',
    createdAt: '2024-10-21 14:35:30',
    toAddress: '123',
    txHash: '2024102114353001',
  };

  return (
    <PermissionPage>
      <Header />
      <SuccessInfo type={params?.type} orderData={demoOrderData} />
    </PermissionPage>
  );
};

export default SuccessScreen;
