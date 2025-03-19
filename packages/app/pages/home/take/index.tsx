/*
 * @Date: 2023-12-18 14:37:38
 * @LastEditors: yosan
 * @LastEditTime: 2025-03-19 14:56:10
 * @FilePath: /ezgg-app/packages/app/pages/home/take/index.tsx
 */
import {
  AppHeader,
  AppHeaderProps,
  HeaderBackButton,
  Paragraph,
  XStack,
  YStack,
  SizableText,
  AppImage,
  TextArea,
  Button,
  useToastController,
  ScrollView,
} from '@my/ui';
import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import PermissionPage from 'app/Components/PermissionPage';
import AppButton from 'app/Components/AppButton';
import {convertAmountToTokenDecimals, formatNumber, formatTokenAmount, getUserSubName, isIphoneX} from 'app/utils';
import AppHeader2 from 'app/Components/AppHeader2';
import {useRouter} from 'solito/router';
import {createParam} from 'solito';
import {AppName, PrimaryColor} from 'app/config';
import {
  getTransactionHistoryFindTransactionHistoryCodeTransactionCode,
  postTransactionHistoryCreateTransactionHistory,
  postTransactionHistoryUpdateNetworkFee,
  postTransactionHistoryUpdateTransactionHash,
} from 'app/servers/api/transactionHistory';
import useRequest from 'app/hooks/useRequest';
import {useDispatch} from 'react-redux';
import {Dispatch} from 'app/store';
import {useRematchModel} from 'app/store/model';
import AppLoading from 'app/Components/AppLoading';
import {getChainInfo} from 'app/utils/chain';
import {TokenIcon} from '@web3icons/react';
import {useTransaction} from 'app/hooks/useTransaction';
import useResponse from 'app/hooks/useResponse';
import PayPopup from 'app/Components/PayPopup';
import {getBalanceFindBalance} from 'app/servers/api/balance';
import {handleTransactionError} from 'app/utils/error';
import TokenIconWrapper from 'app/Components/TokenIconWrapper';

const {useParams} = createParam<any>();

// 存款
const TakeScreen = (any) => {
  const {t} = useTranslation();
  const {makeRequest} = useRequest();
  const dispatch = useDispatch<Dispatch>();
  const [{userInfo, isLogin}] = useRematchModel('user');
  const {appScale} = useResponse();

  const {params} = useParams();
  const [isLoading, setIsLoading] = React.useState(false);
  const toast = useToastController();

  const [orderData, setOrderData] = React.useState<any>();
  const [modalVisible, setModalVisible] = React.useState(false);
  const {back, push, replace} = useRouter();

  const {onSendPayLinkSubmit, onSendContract, deployAA2} = useTransaction();

  const handleSubmit = async (type: 'SEND' | 'REQUEST') => {
    try {
      setIsLoading(true);
      if (type === 'SEND') {
        await onSendPayLinkSubmit(orderData, (data) => {
          toast.show(t('tips.success.transactionSuccess'), {
            duration: 3000,
          });
          setTimeout(() => {
            replace('/home/success?type=PAY_LINK&id=' + orderData?.id);
          }, 500);
        });
      } else {
        await deployAA2(Number(orderData?.chainId));
        const feeData = await makeRequest(
          postTransactionHistoryUpdateNetworkFee({
            transactionCode: orderData.transactionCode,
            tokenContractAddress: orderData.tokenContractAddress!,
          }),
        );
        if (!feeData?.data?.id) {
          throw new Error('Failed to create pay link');
        }

        const res: any = await makeRequest(
          getBalanceFindBalance({
            platform: orderData?.platform,
            chainId: orderData?.chainId,
            address: orderData?.tokenContractAddress,
            currency: String(orderData?.currency || 'usd').toLowerCase(),
          }),
        );

        console.log('🚀 ~ onSendPayLinkSubmit ~ res:', res);

        if (res?.data?.tokenAmount) {
          // 考虑代币精度，将小数转换为整数
          const tokenAmountStr = String(res?.data?.tokenAmount);
          const [integerPart = '0', decimalPart = ''] = tokenAmountStr.split('.');
          const decimals = orderData?.tokenDecimals || 18;

          // 补齐精度位数
          const paddedDecimal = decimalPart.padEnd(decimals, '0');
          const fullIntegerAmount = integerPart + paddedDecimal;

          // 转换为 BigInt
          const tokenAmount = BigInt(fullIntegerAmount);

          console.log('🚀 ~ onAcceptRequest ~ tokenAmount:', tokenAmount);

          // 确保数值有效并进行安全的计算
          const amount = BigInt(orderData?.amount || 0);
          const networkFeeCost = BigInt(orderData?.networkFee?.totalTokenCost || 0);
          const totalRequired = amount + networkFeeCost;

          console.log('检查余额:', {
            amount: amount.toString(),
            networkFeeCost: networkFeeCost.toString(),
            totalRequired: totalRequired.toString(),
            tokenAmount: tokenAmount.toString(),
          });

          if (tokenAmount < totalRequired) {
            throw new Error('insufficient balance');
          }
        }

        await onSendContract(
          {
            ...orderData,
            networkFee: feeData?.data,
          },
          (data) => {
            toast.show(t('tips.success.transactionSuccess'), {
              duration: 3000,
            });
            setTimeout(() => {
              replace('/home/success?type=REQUEST_LINK&id=' + data?.id);
            }, 500);
            // dispatch.user.updateState({payLinkData: {}});
          },
        );
      }
    } catch (error) {
      handleTransactionError(error, toast, t);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = () => {
    orderData?.transactionCategory === 'SEND' ? handleSubmit('SEND') : handleSubmit('REQUEST');
  };

  const _getTransactionHistoryFindTransactionHistoryCodeTransactionCode = async () => {
    setIsLoading(true);
    const res = await makeRequest(
      getTransactionHistoryFindTransactionHistoryCodeTransactionCode({transactionCode: params?.code}),
    );
    if (res?.code === '0') {
      const _orderData = res?.data;
      if (_orderData?.transactionStatus === 'ACCEPTED') {
        toast.show(
          _orderData?.transactionCategory === 'SEND'
            ? t('tips.error.transactionSuccess')
            : t('tips.error.transactionSuccess2'),
          {
            duration: 3000,
          },
        );
        return setTimeout(() => {
          replace('/');
        }, 500);
      } else if (_orderData?.transactionStatus === 'DECLINED') {
        toast.show(t('tips.error.transactionDeclined'), {
          duration: 3000,
        });
        return setTimeout(() => {
          replace('/');
        }, 500);
      }
      setOrderData({
        ..._orderData,
      });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (params?.code) {
      _getTransactionHistoryFindTransactionHistoryCodeTransactionCode();
    }
  }, [params]);

  const isMyPayLink = () => {
    if (!isLogin) {
      return false;
    }
    if (orderData?.transactionCategory === 'SEND') {
      return orderData?.senderMember?.id === userInfo?.customMetadata?.id;
    } else {
      return orderData?.receiverMember?.id === userInfo?.customMetadata?.id;
    }
  };

  return (
    <PermissionPage isHomePage={true}>
      <AppHeader2
        isLogo
        isClosure={isMyPayLink()}
        onBack={() => {
          replace('/');
        }}
        title={AppName}
        fallbackUrl="/"
      />
      <ScrollView
        flex={1}
        w={'100%'}
        bc="#fff"
        contentContainerStyle={{
          minHeight: '100%',
        }}
      >
        <YStack flex={1} pt={appScale(80)} pl={appScale(24)} pr={appScale(24)}>
          <YStack w="100%" mb={appScale(24)}>
            <XStack mb={appScale(8)} w="100%" alignItems="center" justifyContent="center">
              <SizableText h={appScale(40)} lh={appScale(40)} fontSize={'$6'} color={'#212121'} fontWeight={'700'}>
                {orderData?.transactionCategory === 'SEND'
                  ? t('home.take.tips', {amount: formatTokenAmount(orderData?.amount, orderData?.tokenDecimals)})
                  : t('home.take.tips2', {
                      amount: formatTokenAmount(orderData?.amount, orderData?.tokenDecimals),
                      name: orderData?.receiverMember?.nickname || '',
                    })}
              </SizableText>
            </XStack>

            <XStack
              w="100%"
              p={appScale(16)}
              bc={'#FAFAFA'}
              br={appScale(8)}
              justifyContent="space-between"
              alignItems="center"
            >
              <XStack h={appScale(50)}>
                <XStack flexShrink={0} pos={'relative'} w={appScale(72)}>
                  {orderData?.tokenSymbol && (
                    <TokenIconWrapper
                      tokenAddress={orderData?.tokenContractAddress}
                      chainId={orderData?.chainId}
                      tokenSymbol={orderData?.tokenSymbol}
                      size={48}
                    />
                  )}
                </XStack>

                {/* <YStack pos={'relative'} w={appScale(72)} flexShrink={0}>
              <AppImage
                width={appScale(48)}
                height={appScale(48)}
                src={require(`app/assets/images/token/${currencyData.token}.png`)}
                type="local"
              />
              <XStack pos={'absolute'} bottom={appScale(4)} right={appScale(18)}>
                <AppImage
                  width={appScale(24)}
                  height={appScale(24)}
                  src={require(`app/assets/images/chain/${currencyData.chain}.png`)}
                  type="local"
                />
              </XStack>
            </YStack> */}
                {orderData?.tokenSymbol && (
                  <SizableText
                    fontSize={'$8'}
                    h={appScale(50)}
                    lh={appScale(50)}
                    color={'#212121'}
                    fontWeight={'600'}
                    pos="relative"
                  >
                    {`${orderData?.tokenSymbol} (${getChainInfo(orderData?.chainId)?.name})`}
                  </SizableText>
                )}
              </XStack>
              {/* <ChevronRight size="$3" color={'#212121'} /> */}
            </XStack>
          </YStack>

          <YStack w="100%" mb={appScale(24)}>
            <XStack mb={appScale(8)} w="100%">
              <SizableText h={appScale(30)} lh={appScale(30)} fontSize={'$4'} color={'#212121'} fontWeight={'600'}>
                {t('home.take.balance')}
              </SizableText>
            </XStack>
            <XStack w="100%" p={appScale(16)} bc={'#FAFAFA'} br={appScale(8)}>
              <SizableText
                fontSize={'$8'}
                h={appScale(50)}
                lh={appScale(50)}
                color={'#212121'}
                fontWeight={'600'}
                pos="relative"
              >
                {orderData?.amount
                  ? `${formatTokenAmount(orderData?.amount, orderData?.tokenDecimals)} ${orderData?.tokenSymbol} (${
                      getChainInfo(orderData?.chainId)?.name
                    })`
                  : ''}
              </SizableText>
            </XStack>
          </YStack>

          <XStack w="100%" mb={appScale(24)}>
            <SizableText h={appScale(30)} lh={appScale(30)} fontSize={'$4'} color={'#212121'} fontWeight={'400'}>
              {orderData?.currencyAmount ? `≈ $${orderData?.currencyAmount} ${orderData?.currency}` : ''}
            </SizableText>
          </XStack>

          <XStack w="100%" mb={appScale(24)}>
            <AppButton
              // disabled={isLoading}
              disabled={isMyPayLink()}
              onPress={() => {
                if (!isLogin) {
                  push(
                    `/login?redirect=/${orderData?.transactionCategory === 'SEND' ? 'claim' : 'requesting'}&code=${
                      params?.code
                    }`,
                  );
                } else {
                  if (orderData?.transactionCategory === 'SEND') {
                    handleSubmit('SEND');
                  } else {
                    if (!orderData?.tokenFeeSupport) {
                      return replace('/home/replace?id=' + orderData?.id);
                    } else {
                      setModalVisible(true);
                    }
                  }
                }
              }}
            >
              {isMyPayLink()
                ? orderData?.transactionCategory === 'SEND'
                  ? t('home.take.myPayLink')
                  : t('home.take.myPayLink2')
                : orderData?.transactionCategory === 'SEND'
                ? t('home.take.claim')
                : t('home.send')}
            </AppButton>
          </XStack>
          {!isMyPayLink() && (
            <XStack w="100%" mb={appScale(24)}>
              <Button
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                unstyled
                mt={appScale(24)}
                chromeless
                onPress={() => {
                  replace('/');
                }}
              >
                <SizableText col={'#212121'} fontSize={'$3'}>
                  {t('login.profile.dont')}
                </SizableText>
              </Button>
            </XStack>
          )}

          {orderData?.message && (
            <YStack w="100%" mb={appScale(24)}>
              <XStack mb={appScale(8)} w="100%">
                <SizableText h={appScale(30)} lh={appScale(30)} fontSize={'$4'} color={'#212121'} fontWeight={'600'}>
                  {t('home.take.message')}
                </SizableText>
              </XStack>
              <XStack
                w="100%"
                p={appScale(16)}
                h={appScale(180)}
                bc={'#FAFAFA'}
                br={appScale(8)}
                borderColor={'#FAFAFA'}
              >
                <SizableText lh={appScale(30)} fontSize={'$4'} color={'#212121'} fontWeight={'400'}>
                  {orderData?.message || ''}
                </SizableText>
              </XStack>
            </YStack>
          )}
        </YStack>
      </ScrollView>
      {isLoading && <AppLoading />}
      <PayPopup
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        orderData={orderData}
        onSubmit={onSubmit}
      />
    </PermissionPage>
  );
};
export default TakeScreen;
