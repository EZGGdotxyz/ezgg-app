/*
 * @Date: 2023-12-18 14:37:38
 * @LastEditors: yosan
 * @LastEditTime: 2025-03-04 10:54:14
 * @FilePath: /ezgg-app/packages/app/pages/home/history/detail/index.tsx
 */
import {AppHeader, AppHeaderProps, AppImage, HeaderBackButton, Paragraph, SizableText, XStack, YStack} from '@my/ui';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import PermissionPage from 'app/Components/PermissionPage';
import Header from './components/Header';
import {appScale, truncateAddress, formatTokenAmount} from 'app/utils';
import CopyButton from 'app/Components/CopyButton';
import {PrimaryColor} from 'app/config';
import {createParam} from 'solito';
import {getTransactionHistoryFindTransactionHistoryId} from 'app/servers/api/transactionHistory';
import {useRematchModel} from 'app/store/model';
import useRequest from 'app/hooks/useRequest';
import {
  createTransactionInfoItem,
  createBaseTransactionInfoList,
  createAmountDisplay,
  createNetworkFeeDisplay,
  createUserNicknameDisplay,
  createStatusDisplay,
} from 'app/utils/transactionInfo';
import AppLoading from 'app/Components/AppLoading';

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
  const [isLoading, setIsLoading] = useState(false);
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

  // 判断增加还是减少
  const judgeAmountType = (orderData: any) => {
    if (orderData?.transactionType === 'WITHDRAW') {
      return '-';
    }

    if (orderData?.transactionType === 'DEPOSIT') {
      return '+';
    }

    if (orderData?.transactionType === 'SEND') {
      return '-';
    }
    if (orderData?.transactionType === 'REQUEST') {
      return orderData?.receiverMember?.id === userInfo?.customMetadata?.id ? '+' : '-';
    }
  };

  const _getTransactionHistoryFindTransactionHistoryId = async () => {
    setIsLoading(true);
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
          _type =
            _orderData?.receiverMember?.id === userInfo?.customMetadata?.id ? 'outgoingRequest' : 'incomingRequest';
          break;
        default:
          break;
      }

      const infoDataDefault = {
        send: {
          icon: '',
          infoList: [
            createTransactionInfoItem(t('home.order.youSent'), createAmountDisplay(_orderData)),
            createTransactionInfoItem(t('home.order.networkFee'), createNetworkFeeDisplay(_orderData)),
            ...createBaseTransactionInfoList(_orderData, t),
          ],
        },
        income: {
          icon: '',
          infoList: [
            createTransactionInfoItem(t('home.order.youReceived'), createAmountDisplay(_orderData)),
            createTransactionInfoItem(t('home.order.networkFee'), createNetworkFeeDisplay(_orderData)),
            ...createBaseTransactionInfoList(_orderData, t),
            createTransactionInfoItem(t('home.order.from'), createUserNicknameDisplay(_orderData?.receiverMember), {
              isCopyable: !!_orderData?.receiverMember?.nickname,
            }),
          ],
        },
        outgoingRequest: {
          icon: '',
          infoList: [
            createTransactionInfoItem(t('home.order.youRequested'), createAmountDisplay(_orderData)),
            createTransactionInfoItem(t('home.order.networkFee'), createNetworkFeeDisplay(_orderData)),
            createTransactionInfoItem(t('home.order.status'), createStatusDisplay(_orderData?.transactionStatus), {
              isStatus: true,
            }),
            ...createBaseTransactionInfoList(_orderData, t),
          ],
        },
        incomingRequest: {
          icon: '',
          infoList: [
            createTransactionInfoItem(t('home.order.amountRequested'), createAmountDisplay(_orderData)),
            createTransactionInfoItem(t('home.order.networkFee'), createNetworkFeeDisplay(_orderData)),
            createTransactionInfoItem(t('home.order.status'), createStatusDisplay(_orderData?.transactionStatus), {
              isStatus: true,
            }),
            ...createBaseTransactionInfoList(_orderData, t, true, true),
          ],
        },
        withdraw: {
          icon: 'withdraw',
          infoList: [
            createTransactionInfoItem(t('home.order.youWithdraw'), createAmountDisplay(_orderData)),
            ...createBaseTransactionInfoList(_orderData, t, false),
          ],
        },
        topUp: {
          icon: 'topUp',
          infoList: [
            createTransactionInfoItem(t('home.order.youTopUp'), createAmountDisplay(_orderData)),
            ...createBaseTransactionInfoList(_orderData, t, false),
          ],
        },
      };
      setOrderData({
        ..._orderData,
        // transactionType: _type,
      });
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
    setIsLoading(false);
  };

  useEffect(() => {
    if (params?.id) {
      _getTransactionHistoryFindTransactionHistoryId();
    }
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
              {orderData?.amount
                ? `${judgeAmountType(orderData)} ${formatTokenAmount(orderData?.amount, orderData?.tokenDecimals)} ${
                    orderData?.tokenSymbol
                  }`
                : ''}
            </SizableText>
          </XStack>
          {infoData?.userName !== '' && (
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
      {isLoading && <AppLoading />}
    </PermissionPage>
  );
};
export default HistoryDetailScreen;
