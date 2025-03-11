/*
 * @Date: 2023-12-18 14:37:38
 * @LastEditors: yosan
 * @LastEditTime: 2025-03-11 16:21:15
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
import Keyboard from 'app/Components/Keyboard';
import AppButton from 'app/Components/AppButton';
import {StyleSheet} from 'react-native';
import {convertAmountToTokenDecimals, formatNumber, formatTokenAmount, getUserSubName, isIphoneX} from 'app/utils';
import AppHeader2 from 'app/Components/AppHeader2';
import {useRouter} from 'solito/router';
import Currency from 'app/Components/Currency';
import PageLoading from 'app/Components/PageLoading';
import {ChevronDown, ChevronRight} from '@tamagui/lucide-icons';
import {createParam} from 'solito';
import {AppName, PrimaryColor} from 'app/config';
import SuccessInfo from 'app/Components/SuccessInfo';
import {
  getTransactionHistoryFindTransactionHistoryCodeTransactionCode,
  postTransactionHistoryCreateTransactionHistory,
  postTransactionHistoryUpdateTransactionHash,
} from 'app/servers/api/transactionHistory';
import useRequest from 'app/hooks/useRequest';
import {useDispatch} from 'react-redux';
import {Dispatch} from 'app/store';
import {useRematchModel} from 'app/store/model';
import {useSmartWallets} from '@privy-io/react-auth/smart-wallets';
import {encodeFunctionData, erc721Abi, erc20Abi, createPublicClient, http, getAddress} from 'viem';
import TokenTransferContract from 'app/abi/TokenTransfer.json';
import {
  postTransactionPayLinkCreatePayLink,
  postTransactionPayLinkFindPayLink,
  postTransactionPayLinkUpdateTransactionHash,
} from 'app/servers/api/transactionPayLink';
import AppLoading from 'app/Components/AppLoading';
import {getChainInfo} from 'app/utils/chain';
import {TokenIcon} from '@web3icons/react';
import TokenLinkContract from 'app/abi/TokenLink.json';
import {useTransaction} from 'app/hooks/useTransaction';
import useResponse from 'app/hooks/useResponse';
import PayPopup from 'app/Components/PayPopup';
import {getBalanceFindBalance} from 'app/servers/api/balance';

const {useParams} = createParam<any>();

// 存款
const TakeScreen = (any) => {
  const {t} = useTranslation();
  const {makeRequest} = useRequest();
  const dispatch = useDispatch<Dispatch>();
  const [{userInfo, isLogin}] = useRematchModel('user');
  const {appScale} = useResponse();

  const [inputValue, setInputValue] = React.useState('');
  const {params} = useParams();
  const [isLoading, setIsLoading] = React.useState(false);
  const toast = useToastController();

  const [orderData, setOrderData] = React.useState<any>();
  const [modalVisible, setModalVisible] = React.useState(false);
  const {back, push, replace} = useRouter();

  const {onSendPayLinkSubmit, onSendContract} = useTransaction();

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

          if (tokenAmount < BigInt(orderData?.amount)) {
            throw new Error('insufficient balance');
          }
        }

        await onSendContract(orderData, (data) => {
          toast.show(t('tips.success.transactionSuccess'), {
            duration: 3000,
          });
          setTimeout(() => {
            replace('/home/success?type=REQUEST_LINK&id=' + data?.id);
          }, 500);
          // dispatch.user.updateState({payLinkData: {}});
        });
      }
    } catch (error) {
      console.error(`${type} transaction error:`, error);
      if (error?.message.includes('The user rejected the request')) {
        toast.show(t('tips.error.userRejected'), {
          duration: 3000,
        });
      } else if (error?.message.includes('insufficient allowance')) {
        toast.show(t('tips.error.insufficientAllowance'), {
          duration: 3000,
        });
      } else if (error?.message.includes('insufficient balance')) {
        toast.show(t('tips.error.insufficientBalance'), {
          duration: 3000,
        });
      } else {
        toast.show(t('tips.error.networkError'), {
          duration: 3000,
        });
      }
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
        onBack={() => {
          push('/');
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
                    <YStack height={appScale(48)} width={appScale(48)} borderRadius={appScale(24)} overflow={'hidden'}>
                      <TokenIcon symbol={orderData?.tokenSymbol} variant="background" size={appScale(48)} />
                    </YStack>
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
                    setModalVisible(true);
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
