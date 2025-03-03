/*
 * @Date: 2023-12-18 14:37:38
 * @LastEditors: yosan
 * @LastEditTime: 2025-03-03 21:11:35
 * @FilePath: /ezgg-app/packages/app/pages/home/history/detail/index.tsx
 */
import {AppHeader, AppHeaderProps, AppImage, HeaderBackButton, Paragraph, SizableText, XStack, YStack} from '@my/ui';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import PermissionPage from 'app/Components/PermissionPage';
import Header from './components/Header';
import {appScale, formatDateTime, formatNumber, truncateAddress, formatTokenAmount} from 'app/utils';
import CopyButton from 'app/Components/CopyButton';
import {PrimaryColor} from 'app/config';
import {createParam} from 'solito';
import {getTransactionHistoryFindTransactionHistoryId} from 'app/servers/api/transactionHistory';
import {useRematchModel} from 'app/store/model';
import useRequest from 'app/hooks/useRequest';
import {getChainInfo} from 'app/utils/chain';

const {useParams} = createParam<any>();

// 订单详情
const HistoryDetailScreen = () => {
  const {t} = useTranslation();
  const [infoData, setInfoData] = useState<any>({
    icon: '',
    title: '',
    infoList: [],
    userName: '',
  });

  const {params} = useParams();
  const [{userInfo}] = useRematchModel('user');
  const {makeRequest} = useRequest();
  const [orderData, setOrderData] = useState<any>({});
  const statusList = {
    PENDING: {
      title: t('home.order.status.unpaid'),
      backgroundColor: '#F75555',
    },
    ACCEPTED: {
      title: t('home.order.status.paid'),
      backgroundColor: '#FEB54F',
    },
    DECLINED: {
      title: t('home.order.status.declined'),
      backgroundColor: '#F75555',
    },
  };

  const infoDataDefault = {
    send: {
      icon: '',
      infoList: [
        {
          label: t('home.order.youSent'),
          value: `${formatNumber(orderData?.networkFee)} ${orderData?.tokenSymbol}(${
            getChainInfo(orderData?.chainId)?.name
          })`,
          isStatus: false,
          isCopyable: false,
          isTruncated: false,
        },
        {
          label: t('home.order.networkFee'),
          value: `${formatNumber(orderData?.networkFee)} ${orderData?.tokenSymbol}(${
            getChainInfo(orderData?.chainId)?.name
          })`,
          isStatus: false,
          isCopyable: false,
          isTruncated: false,
        },
        {
          label: t('home.order.date'),
          value: `${formatDateTime(orderData?.transactionTime)}`,
          isStatus: false,
          isCopyable: false,
          isTruncated: false,
        },
        {
          label: t('home.order.to'),
          value: `@${orderData?.receiverMember?.nickname}`,
          isCopyable: true,
          isStatus: false,
          isTruncated: false,
        },
        {
          label: t('home.order.transactionHash'),
          value: `${orderData?.transactionHash || ''}`,
          isCopyable: orderData?.transactionHash ? true : false,
          isStatus: false,
          isTruncated: true,
        },
      ],
    },
    income: {
      icon: '',
      infoList: [
        {
          label: t('home.order.youReceived'),
          value: `${formatNumber(orderData?.networkFee)} ${orderData?.tokenSymbol}(${
            getChainInfo(orderData?.chainId)?.name
          })`,
          isStatus: false,
          isCopyable: false,
          isTruncated: false,
        },
        {
          label: t('home.order.networkFee'),
          value: `${formatNumber(orderData?.networkFee)} ${orderData?.tokenSymbol}(${
            getChainInfo(orderData?.chainId)?.name
          })`,
          isStatus: false,
          isCopyable: false,
          isTruncated: false,
        },
        {
          label: t('home.order.date'),
          value: `${formatDateTime(orderData?.transactionTime)}`,
          isStatus: false,
          isCopyable: false,
          isTruncated: false,
        },
        {
          label: t('home.order.from'),
          value: `@${orderData?.receiverMember?.nickname}`,
          isCopyable: true,
          isStatus: false,
          isTruncated: false,
        },
        {
          label: t('home.order.transactionHash'),
          value: `${orderData?.transactionHash || ''}`,
          isCopyable: orderData?.transactionHash ? true : false,
          isStatus: false,
          isTruncated: true,
        },
      ],
    },
    outgoingRequest: {
      icon: '',
      infoList: [
        {
          label: t('home.order.youRequested'),
          value: `${formatNumber(orderData?.amount)} ${orderData?.tokenSymbol}(${
            getChainInfo(orderData?.chainId)?.name
          })`,
          isStatus: false,
          isCopyable: false,
          isTruncated: false,
        },
        {
          label: t('home.order.networkFee'),
          value: `${formatNumber(orderData?.networkFee)} ${orderData?.tokenSymbol}(${
            getChainInfo(orderData?.chainId)?.name
          })`,
          isStatus: false,
          isCopyable: false,
          isTruncated: false,
        },
        {
          label: t('home.order.status'),
          value: orderData?.transactionStatus,
          isStatus: true,
          isCopyable: false,
          isTruncated: false,
        },
        {
          label: t('home.order.date'),
          value: `${formatDateTime(orderData?.transactionTime)}`,
          isStatus: false,
          isCopyable: false,
          isTruncated: false,
        },
        {
          label: t('home.order.to'),
          value: `@${orderData?.receiverMember?.nickname}`,
          isCopyable: true,
          isStatus: false,
          isTruncated: false,
        },
        {
          label: t('home.order.transactionHash'),
          value: `${orderData?.transactionHash}`,
          isCopyable: orderData?.transactionHash ? true : false,
          isStatus: false,
          isTruncated: true,
        },
      ],
    },
    incomingRequest: {
      icon: '',
      infoList: [
        {
          label: t('home.order.amountRequested'),
          value: `${formatNumber(orderData?.amount)} ${orderData?.tokenSymbol}(${
            getChainInfo(orderData?.chainId)?.name
          })`,
          isStatus: false,
          isCopyable: false,
          isTruncated: false,
        },
        {
          label: t('home.order.networkFee'),
          value: `${formatNumber(orderData?.networkFee)} ${orderData?.tokenSymbol}(${
            getChainInfo(orderData?.chainId)?.name
          })`,
          isStatus: false,
          isCopyable: false,
          isTruncated: false,
        },
        {
          label: t('home.order.status'),
          value: orderData?.transactionStatus,
          isStatus: true,
          isCopyable: false,
          isTruncated: false,
        },
        {
          label: t('home.order.date'),
          value: `${formatDateTime(orderData?.transactionTime)}`,
          isStatus: false,
          isCopyable: false,
          isTruncated: false,
        },
        {
          label: t('home.order.to'),
          value: `@${orderData?.senderMember?.nickname}`,
          isCopyable: true,
          isStatus: false,
          isTruncated: false,
        },
        {
          label: t('home.order.transactionHash'),
          value: `${orderData?.transactionHash}`,
          isCopyable: orderData?.transactionHash ? true : false,
          isStatus: false,
          isTruncated: true,
        },
      ],
    },
    withdraw: {
      icon: 'withdraw',
      infoList: [
        {
          label: t('home.order.youWithdraw'),
          value: `${formatNumber(orderData?.amount)} ${orderData?.tokenSymbol}(${
            getChainInfo(orderData?.chainId)?.name
          })`,
          isStatus: false,
          isCopyable: false,
          isTruncated: false,
        },
        {
          label: t('home.order.date'),
          value: `${formatDateTime(orderData?.transactionTime)}`,
          isStatus: false,
          isCopyable: false,
          isTruncated: false,
        },
        {
          label: t('home.order.transactionHash'),
          value: `${orderData?.transactionHash}`,
          isCopyable: orderData?.transactionHash ? true : false,
          isStatus: false,
          isTruncated: true,
        },
      ],
    },
    topUp: {
      icon: 'topUp',
      infoList: [
        {
          label: t('home.order.youTopUp'),
          value: `${formatNumber(orderData?.amount)} ${orderData?.tokenSymbol}(${
            getChainInfo(orderData?.chainId)?.name
          })`,
          isStatus: false,
          isCopyable: false,
          isTruncated: false,
        },
        {
          label: t('home.order.date'),
          value: `${formatDateTime(orderData?.transactionTime)}`,
          isStatus: false,
          isCopyable: false,
          isTruncated: false,
        },
        {
          label: t('home.order.transactionHash'),
          value: `${orderData?.transactionHash}`,
          isCopyable: orderData?.transactionHash ? true : false,
          isStatus: false,
          isTruncated: true,
        },
      ],
    },
  };

  const _getTransactionHistoryFindTransactionHistoryId = async () => {
    const res = await makeRequest(getTransactionHistoryFindTransactionHistoryId({id: params?.id}));
    if (res?.code === '0') {
      const _orderData = res?.data;
      let _type: string = _orderData?.transactionCategory || '';
      switch (_type) {
        case 'SEND':
          _type = 'send';
          break;
        case 'WITHDRAW':
          _type = 'withdraw';
          break;
        case 'DEPOSIT':
          _type = 'topUp';
          break;
        case 'REQUEST':
          if (_orderData?.receiverMember?.id === userInfo?.customMetadata?.id) {
            _type = 'outgoingRequest';
          } else {
            _type = 'incomingRequest';
          }
          break;
        default:
          break;
      }
      setOrderData(_orderData);
      setInfoData({
        infoList: infoDataDefault[_type].infoList,
        title: t(`screen.home.${_type}`),
        icon: infoDataDefault[_type].icon,
        userName:
          _orderData?.transactionType === 'SEND' || _orderData?.transactionType === 'REQUEST'
            ? `@${_type === 'send' ? _orderData?.receiverMember?.nickname : _orderData?.senderMember?.nickname || ''}`
            : '',
      });
    }
  };

  useEffect(() => {
    if (params?.id) {
      _getTransactionHistoryFindTransactionHistoryId();
    }

    // params?.type &&
    //   setInfoData({
    //     infoList: infoDataDefault[params?.type].infoList,
    //     userName: `@${orderData?.userName || ''}`,
    //     title: t(`screen.home.${params?.type}`),
    //     icon: infoDataDefault[params?.type].icon,
    //   });
  }, [params]);

  return (
    <PermissionPage>
      <Header title={infoData?.title} />
      <YStack pb={appScale(24)}>
        <YStack ai={'center'} jc={'center'} p={appScale(20)} bc={PrimaryColor}>
          {infoData?.icon !== '' && (
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
              {`${formatTokenAmount(orderData?.amount, orderData?.tokenDecimals)} ${orderData?.tokenSymbol}`}
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
            infoData?.infoList.length > 0 &&
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
                {item?.isStatus && item?.value && (
                  <XStack
                    ai={'center'}
                    // bc={statusList[item.value]?.backgroundColor}
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
                      {statusList[item.value]?.title}
                    </SizableText>
                  </XStack>
                )}
                {!item?.isStatus && (
                  <XStack ai={'center'} jc={'center'}>
                    <SizableText
                      h={appScale(26)}
                      lh={appScale(26)}
                      fontSize={'$5'}
                      color={'#424242'}
                      fontWeight={'600'}
                    >
                      {item?.isTruncated ? (item?.value ? truncateAddress(item?.value) : '-') : item?.value}
                    </SizableText>
                    {item?.isCopyable && (
                      <XStack ai={'center'} jc={'center'} ml={appScale(6)}>
                        <CopyButton unstyled text={item?.value}>
                          <AppImage
                            width={appScale(18)}
                            height={appScale(18)}
                            src={require('app/assets/images/copy.png')}
                            type="local"
                          />
                        </CopyButton>
                      </XStack>
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
