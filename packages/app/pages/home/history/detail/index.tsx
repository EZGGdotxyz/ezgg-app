/*
 * @Date: 2023-12-18 14:37:38
 * @LastEditors: yosan
 * @LastEditTime: 2025-03-12 13:02:51
 * @FilePath: /ezgg-app/packages/app/pages/home/history/detail/index.tsx
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
  useToastController,
  XStack,
  YStack,
} from '@my/ui';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import PermissionPage from 'app/Components/PermissionPage';
import Header from './components/Header';
import {truncateAddress, formatTokenAmount, isIphoneX} from 'app/utils';
import CopyButton from 'app/Components/CopyButton';
import {ExternalLinkData, PrimaryColor} from 'app/config';
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
import {getExplorerUrl} from 'app/utils/chain';
import AppButton from 'app/Components/AppButton';
import Footer from './components/Footer';
import SharePopup from 'app/Components/SharePopup';
import DeclineRequestPopup from './components/DeclineRequestPopup';
import AcceptRequestPopup from './components/AcceptRequestPopup';
import {useRouter} from 'solito/router';
const {useParams} = createParam<any>();
import useResponse from 'app/hooks/useResponse';

// 订单详情
const HistoryDetailScreen = () => {
  const {t} = useTranslation();
  const [infoData, setInfoData] = useState<any>({
    icon: '',
    title: '',
    infoList: [],
    userName: '',
  });
  const {appScale} = useResponse();

  const {params} = useParams();
  const {back, replace, push} = useRouter();
  const [{userInfo, isLogin}] = useRematchModel('user');
  const {makeRequest} = useRequest();
  const [orderData, setOrderData] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);
  const [shareVisible, setShareVisible] = useState(false);
  const [declineRequestVisible, setDeclineRequestVisible] = useState(false);
  const [acceptRequestVisible, setAcceptRequestVisible] = useState(false);
  const toast = useToastController();
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

    return orderData?.receiverMember?.id === userInfo?.customMetadata?.id ? '+' : '-';
  };

  const _getTransactionHistoryFindTransactionHistoryId = async () => {
    setIsLoading(true);
    const res = await makeRequest(getTransactionHistoryFindTransactionHistoryId({id: params?.id}));
    if (res?.code === '0') {
      const _orderData = res?.data;
      let _type: string = _orderData?.transactionType || '';
      const isReceiver = _orderData?.receiverMember?.id === userInfo?.customMetadata?.id;
      const isRequest = _orderData?.transactionCategory === 'REQUEST';

      let _title = '';
      let sideName: any = '';
      if (isRequest) {
        if (isReceiver) {
          // 当前用户收到付款请求（将要支出）
          _title = t(`home.history.request.${_orderData?.transactionType}.title`, {
            name: _orderData?.senderMember?.nickname,
          });
          sideName = _orderData?.senderMember?.nickname;
        } else {
          // 当前用户发起付款请求（将要收入）
          _title = t(`home.history.send.${_orderData?.transactionType}.title`, {
            name: _orderData?.receiverMember?.nickname,
          });
          sideName = _orderData?.receiverMember?.nickname;
        }
      } else {
        if (isReceiver) {
          // 当前用户是接收方（收入）
          _title = t(`home.history.request.${_orderData?.transactionType}.title`, {
            name: _orderData?.senderMember?.nickname,
          });
          sideName = _orderData?.senderMember?.nickname;
        } else {
          // 当前用户是发送方（支出）
          _title = t(`home.history.send.${_orderData?.transactionType}.title`, {
            name: _orderData?.receiverMember?.nickname,
          });
          sideName = _orderData?.receiverMember?.nickname;
        }
      }
      console.log('🚀 ~ const_getTransactionHistoryFindTransactionHistoryId= ~ sideName:', sideName);

      let infoDataDefault: any = {
        title: _title,
        icon: '',
        infoList: [],
        type: '',
      };
      switch (_type) {
        case 'SEND':
        case 'QR_CODE':
        case 'PAY_LINK':
          infoDataDefault.type = 'send';
          infoDataDefault.infoList = [
            createTransactionInfoItem(t('home.order.youSent'), createAmountDisplay(_orderData)),
            createTransactionInfoItem(t('home.order.networkFee'), createNetworkFeeDisplay(_orderData)),
            ...createBaseTransactionInfoList(_orderData, t, true, isReceiver, sideName),
          ];

          break;
        case 'WITHDRAW':
          infoDataDefault.title = '';
          infoDataDefault.type = 'withdraw';
          infoDataDefault.infoList = [
            createTransactionInfoItem(t('home.order.youWithdraw'), createAmountDisplay(_orderData)),
            ...createBaseTransactionInfoList(_orderData, t, false),
            createTransactionInfoItem(t('home.order.withdrawAddress'), _orderData?.receiverWalletAddress || '', {
              isCopyable: !!_orderData?.receiverWalletAddress,
              isTruncated: true,
            }),
          ];
          break;
        case 'DEPOSIT':
          infoDataDefault.title = '';
          infoDataDefault.type = 'topUp';
          infoDataDefault.infoList = [
            createTransactionInfoItem(t('home.order.youTopUp'), createAmountDisplay(_orderData)),
            ...createBaseTransactionInfoList(_orderData, t, false),
            createTransactionInfoItem(t('home.order.depositAddress'), _orderData?.senderWalletAddress || '', {
              isCopyable: !!_orderData?.senderWalletAddress,
              isTruncated: true,
            }),
          ];
          break;

        case 'REQUEST':
        case 'REQUEST_QR_CODE':
        case 'REQUEST_LINK':
          infoDataDefault.type = isReceiver ? 'outgoingRequest' : 'incomingRequest';
          infoDataDefault.infoList = [
            createTransactionInfoItem(
              isReceiver ? t('home.order.youRequested') : t('home.order.amountRequested'),
              createAmountDisplay(_orderData),
            ),
            createTransactionInfoItem(t('home.order.networkFee'), createNetworkFeeDisplay(_orderData)),
            createTransactionInfoItem(t('home.order.status'), createStatusDisplay(_orderData?.transactionStatus), {
              isStatus: true,
            }),
            ...createBaseTransactionInfoList(_orderData, t, true, isReceiver, sideName),
          ];
          break;
        default:
          break;
      }

      setOrderData({
        ..._orderData,
        // transactionType: _type,
      });
      setInfoData({
        infoList: infoDataDefault.infoList,
        title: t(`screen.home.${infoDataDefault.type}`),
        icon: infoDataDefault.icon,
        title2: infoDataDefault.title,
      });
    }
    setIsLoading(false);
  };

  const onCopy = async (text: string) => {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        // 优先使用现代 Clipboard API
        await navigator.clipboard.writeText(text);
      } else if (typeof window !== 'undefined') {
        // 降级方案：使用 textarea
        const textarea = document.createElement('textarea');
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        textarea.value = text;

        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();

        try {
          document.execCommand('copy');
        } catch (err) {
          console.error('Failed to copy text:', err);
          throw new Error('Copy failed');
        } finally {
          document.body.removeChild(textarea);
        }
      } else {
        throw new Error('Copy not supported');
      }

      toast.show(t('tips.explore.copy'), {
        duration: 3000,
      });
    } catch (error) {
      console.error('Copy error:', error);
      toast.show(t('tips.error.copyFailed'), {
        duration: 3000,
      });
    }
  };
  useEffect(() => {
    if (params?.id && userInfo?.customMetadata?.id) {
      _getTransactionHistoryFindTransactionHistoryId();
    }
  }, [params, userInfo]);

  return (
    <PermissionPage isHomePage={true}>
      <Header
        back={() => {
          if (params?.isHistory) {
            replace('/');
          } else {
            back();
          }
        }}
        title={infoData?.title}
        setShareVisible={setShareVisible}
      />
      <ScrollView
        flex={1}
        w={'100%'}
        bc="#fff"
        contentContainerStyle={{
          minHeight: '100%',
        }}
      >
        <YStack flex={1} jc="space-between">
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
                <SizableText lh={appScale(54)} color={'#212121'} fontWeight={'700'} fontSize={'$8'}>
                  {orderData?.amount
                    ? `${judgeAmountType(orderData)} ${formatTokenAmount(
                        orderData?.amount,
                        orderData?.tokenDecimals,
                      )} ${orderData?.tokenSymbol}`
                    : ''}
                </SizableText>
              </XStack>
              {infoData?.title2 !== '' && (
                <XStack mt={appScale(6)} w={'100%'} ai={'center'} jc={'center'}>
                  <SizableText h={appScale(30)} lh={appScale(30)} fontSize={'$4'} color={'#212121'} fontWeight={'500'}>
                    {infoData?.title2}
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
                    <SizableText
                      h={appScale(26)}
                      lh={appScale(26)}
                      fontSize={'$4'}
                      color={'#616161'}
                      fontWeight={'500'}
                    >
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
                          fontSize={'$4'}
                          color={'#424242'}
                          fontWeight={'600'}
                        >
                          {item?.isTruncated ? (item?.value ? truncateAddress(item?.value) : '-') : item?.value}
                        </SizableText>
                        {item?.isCopyable && (
                          <XStack ai={'center'} jc={'center'} ml={appScale(6)}>
                            <CopyButton
                              unstyled
                              text={item?.isHx ? getExplorerUrl(orderData?.chainId, item?.value) : item?.value}
                            >
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
            {!isLogin && (
              <XStack w={'100%'} mt="$6" pb="$10" pl={appScale(24)} pr={appScale(24)}>
                <AppButton
                  onPress={() => {
                    push(`/login?redirect=/home/history/${params?.id}`);
                  }}
                >
                  {t('login.loginButton')}
                </AppButton>
              </XStack>
            )}
          </YStack>
        </YStack>
      </ScrollView>

      {(orderData?.transactionType === 'REQUEST' || orderData?.transactionType === 'REQUEST_QR_CODE') &&
        orderData?.transactionStatus === 'PENDING' &&
        orderData?.senderMember?.id === userInfo?.customMetadata?.id && (
          <Footer
            setDeclineRequestVisible={setDeclineRequestVisible}
            setAcceptRequestVisible={setAcceptRequestVisible}
          />
        )}

      {(orderData?.transactionType === 'PAY_LINK' || orderData?.transactionType === 'REQUEST_LINK') && (
        <XStack
          flexShrink={0}
          pl={appScale(24)}
          pr={appScale(24)}
          pt={appScale(12)}
          pb={appScale(isIphoneX() ? 46 : 12)}
          w="100%"
          ai={'center'}
          jc={'center'}
          space="$3"
          borderTopWidth={1}
          borderColor={'#F2F2F2'}
        >
          <Button
            h={appScale(58)}
            w={'50%'}
            br={appScale(28)}
            ai={'center'}
            jc={'center'}
            bc={'#fff'}
            borderWidth={2}
            borderColor={PrimaryColor}
            onPress={() => {
              window.open(
                `${ExternalLinkData.webPageHome}/${
                  orderData?.transactionCategory === 'SEND' ? 'claim' : 'requesting'
                }/${orderData?.transactionCode}`,
                '_blank',
              );
            }}
            // disabled={isLoading}
            pressStyle={{
              opacity: 0.85,
            }}
            unstyled
          >
            {t('home.send.viewLink')}
          </Button>
          <AppButton
            style={{
              width: '50%',
            }}
            onPress={() => {
              onCopy(
                `${ExternalLinkData.webPageHome}/${
                  orderData?.transactionCategory === 'SEND' ? 'claim' : 'requesting'
                }/${orderData?.transactionCode}`,
              );
            }}
          >
            {t('home.send.copyLink')}
          </AppButton>
        </XStack>
      )}

      {/* <SharePopup
        modalVisible={shareVisible}
        setModalVisible={setShareVisible}
        shareTitle={infoData?.title}
        shareUrl={`${ExternalLinkData.webPageHome}/transaction/${orderData?.id}`}
      /> */}

      <DeclineRequestPopup
        setIsLoading={setIsLoading}
        modalVisible={declineRequestVisible}
        setModalVisible={setDeclineRequestVisible}
        orderData={orderData}
        onSuccess={() => {
          _getTransactionHistoryFindTransactionHistoryId();
          setDeclineRequestVisible(false);
        }}
      />
      <AcceptRequestPopup
        setIsLoading={setIsLoading}
        modalVisible={acceptRequestVisible}
        setModalVisible={setAcceptRequestVisible}
        orderData={orderData}
        onSuccess={() => {
          _getTransactionHistoryFindTransactionHistoryId();
          setAcceptRequestVisible(false);
        }}
      />
      {isLoading && <AppLoading />}
    </PermissionPage>
  );
};
export default HistoryDetailScreen;
