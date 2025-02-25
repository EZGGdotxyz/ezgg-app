/*
 * @Date: 2023-12-18 14:37:38
 * @LastEditors: yosan
 * @LastEditTime: 2025-02-25 15:56:26
 * @FilePath: /ezgg-app/packages/app/pages/home/history/detail/index.tsx
 */
import {AppHeader, AppHeaderProps, AppImage, HeaderBackButton, Paragraph, SizableText, XStack, YStack} from '@my/ui';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import PermissionPage from 'app/Components/PermissionPage';
import Header from './components/Header';
import {appScale, formatDateTime, formatNumber, truncateAddress, truncateText} from 'app/utils';
import CopyButton from 'app/Components/CopyButton';
import {PrimaryColor} from 'app/config';

// 订单详情
const HistoryDetailScreen = () => {
  const {t} = useTranslation();
  const [infoData, setInfoData] = useState<any>({});

  const type = 'incomingRequest';

  const statusList = {
    unpaid: {
      title: t('home.order.status.unpaid'),
      backgroundColor: '##F75555',
    },
    paid: {
      title: t('home.order.status.paid'),
      backgroundColor: '#FEB54F',
    },
    declined: {
      title: t('home.order.status.declined'),
      backgroundColor: '#F75555',
    },
  };

  const orderData = {
    amount: 100,
    fee: 1,
    token: 'USDC',
    chain: 'BSC',
    createdAt: '2024-10-21 14:35:30',
    toAddress: '123',
    txHash: '2024102114353001',
    status: 'paid',
    userName: 'yosan',
  };

  const infoDataDefault = {
    sent: {
      icon: '',
      infoList: [
        {
          label: t('home.order.youSent'),
          value: `${formatNumber(orderData?.amount)} ${orderData?.token}(${orderData?.chain})`,
        },
        {
          label: t('home.order.networkFee'),
          value: `${formatNumber(orderData?.fee)} ${orderData?.token}(${orderData?.chain})`,
        },
        {
          label: t('home.order.date'),
          value: `${formatDateTime(orderData?.createdAt)}`,
        },
        {
          label: t('home.order.to'),
          value: `@${orderData?.toAddress}`,
          isCopyable: true,
        },
        {
          label: t('home.order.transactionHash'),
          value: `${orderData?.txHash}`,
          isCopyable: true,
          isTruncated: true,
        },
      ],
    },
    income: {
      icon: '',
      infoList: [
        {
          label: t('home.order.youReceived'),
          value: `${formatNumber(orderData?.amount)} ${orderData?.token}(${orderData?.chain})`,
        },
        {
          label: t('home.order.networkFee'),
          value: `${formatNumber(orderData?.fee)} ${orderData?.token}(${orderData?.chain})`,
        },
        {
          label: t('home.order.date'),
          value: `${formatDateTime(orderData?.createdAt)}`,
        },
        {
          label: t('home.order.from'),
          value: `@${orderData?.toAddress}`,
          isCopyable: true,
        },
        {
          label: t('home.order.transactionHash'),
          value: `${orderData?.txHash}`,
          isCopyable: true,
          isTruncated: true,
        },
      ],
    },
    outgoingRequest: {
      icon: '',
      infoList: [
        {
          label: t('home.order.youRequested'),
          value: `${formatNumber(orderData?.amount)} ${orderData?.token}(${orderData?.chain})`,
        },
        {
          label: t('home.order.networkFee'),
          value: `${formatNumber(orderData?.fee)} ${orderData?.token}(${orderData?.chain})`,
        },
        {
          label: t('home.order.status'),
          value: orderData?.status,
          isStatus: true,
        },
        {
          label: t('home.order.date'),
          value: `${formatDateTime(orderData?.createdAt)}`,
        },
        {
          label: t('home.order.to'),
          value: `@${orderData?.toAddress}`,
          isCopyable: true,
        },
        {
          label: t('home.order.transactionHash'),
          value: `${orderData?.txHash}`,
          isCopyable: true,
          isTruncated: true,
        },
      ],
    },
    incomingRequest: {
      icon: '',
      infoList: [
        {
          label: t('home.order.amountRequested'),
          value: `${formatNumber(orderData?.amount)} ${orderData?.token}(${orderData?.chain})`,
        },
        {
          label: t('home.order.networkFee'),
          value: `${formatNumber(orderData?.fee)} ${orderData?.token}(${orderData?.chain})`,
        },
        {
          label: t('home.order.status'),
          value: orderData?.status,
          isStatus: true,
        },
        {
          label: t('home.order.date'),
          value: `${formatDateTime(orderData?.createdAt)}`,
        },
        {
          label: t('home.order.to'),
          value: `@${orderData?.toAddress}`,
          isCopyable: true,
        },
        {
          label: t('home.order.transactionHash'),
          value: `${orderData?.txHash}`,
          isCopyable: true,
          isTruncated: true,
        },
      ],
    },
    withdraw: {
      icon: 'withdraw',
      infoList: [
        {
          label: t('home.order.youWithdraw'),
          value: `${formatNumber(orderData?.amount)} ${orderData?.token}(${orderData?.chain})`,
        },
        {
          label: t('home.order.date'),
          value: `${formatDateTime(orderData?.createdAt)}`,
        },
        {
          label: t('home.order.transactionHash'),
          value: `${orderData?.txHash}`,
          isCopyable: true,
          isTruncated: true,
        },
      ],
    },
    topUp: {
      icon: 'topUp',
      infoList: [
        {
          label: t('home.order.youTopUp'),
          value: `${formatNumber(orderData?.amount)} ${orderData?.token}(${orderData?.chain})`,
        },
        {
          label: t('home.order.date'),
          value: `${formatDateTime(orderData?.createdAt)}`,
        },
        {
          label: t('home.order.transactionHash'),
          value: `${orderData?.txHash}`,
          isCopyable: true,
          isTruncated: true,
        },
      ],
    },
  };

  useEffect(() => {
    type &&
      setInfoData({
        infoList: infoDataDefault[type].infoList,
        userName: `@${orderData?.userName || ''}`,
        title: t(`screen.home.${type}`),
        icon: infoDataDefault[type].icon,
      });
  }, [type]);

  return (
    <PermissionPage>
      <Header title={infoData?.title} />
      <YStack pb={appScale(24)}>
        <YStack ai={'center'} jc={'center'} p={appScale(20)} bc={PrimaryColor}>
          {infoData?.icon && (
            <XStack w={'100%'} mb={appScale(12)} ai={'center'} jc={'center'}>
              <AppImage
                width={appScale(100)}
                height={appScale(100)}
                src={require(`app/assets/images/${infoData?.icon}.png`)}
                type="local"
              />
            </XStack>
          )}
          <XStack w={'100%'} ai={'center'} jc={'center'}>
            <SizableText
              h={appScale(54)}
              lh={appScale(54)}
              style={{fontSize: '40px'}}
              color={'#212121'}
              fontWeight={'700'}
            >
              {`${formatNumber(orderData?.amount)} ${orderData?.token}`}
            </SizableText>
          </XStack>
          {infoData?.userName && (
            <XStack mt={appScale(6)} w={'100%'} ai={'center'} jc={'center'}>
              <SizableText h={appScale(30)} lh={appScale(30)} fontSize={'$5'} color={'#212121'} fontWeight={'500'}>
                {infoData?.userName}
              </SizableText>
            </XStack>
          )}
        </YStack>

        <YStack mt={appScale(20)} p={appScale(24)}>
          {infoData?.infoList &&
            infoData?.infoList.map((item, index) => (
              <XStack
                key={item.label}
                pb={appScale(16)}
                w="100%"
                ai="center"
                jc="space-between"
                bbw={1}
                bbc={index === infoData?.infoList.length - 1 ? '#EEEEEE' : '$background'}
              >
                <SizableText h={appScale(26)} lh={appScale(26)} fontSize={'$5'} color={'#616161'} fontWeight={'500'}>
                  {item.label}
                </SizableText>
                {item?.isStatus ? (
                  <XStack
                    ai={'center'}
                    bc={statusList[item.value]?.backgroundColor}
                    borderRadius={appScale(8)}
                    p={appScale(12)}
                  >
                    <SizableText
                      h={appScale(20)}
                      lh={appScale(20)}
                      fontSize={'$1'}
                      color={'#212121'}
                      fontWeight={'700'}
                    >
                      {statusList[item.value].title}
                    </SizableText>
                  </XStack>
                ) : (
                  <XStack ai={'center'} space="$2">
                    <SizableText
                      h={appScale(26)}
                      lh={appScale(26)}
                      fontSize={'$5'}
                      color={'#424242'}
                      fontWeight={'600'}
                    >
                      {item?.isTruncated ? truncateAddress(item.value) : item.value}
                    </SizableText>
                    {item.isCopyable && (
                      <CopyButton unstyled text={item?.value}>
                        <AppImage
                          width={appScale(18)}
                          height={appScale(18)}
                          src={require('app/assets/images/copy.png')}
                          type="local"
                        />
                      </CopyButton>
                    )}
                  </XStack>
                )}
              </XStack>
            ))}
        </YStack>
      </YStack>
    </PermissionPage>
  );
};
export default HistoryDetailScreen;
