/*
 * @Date: 2023-12-18 14:37:38
 * @LastEditors: yosan
 * @LastEditTime: 2025-03-04 22:45:45
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
} from '@my/ui';
import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import PermissionPage from 'app/Components/PermissionPage';
import Keyboard from 'app/Components/Keyboard';
import AppButton from 'app/Components/AppButton';
import {StyleSheet} from 'react-native';
import {
  appScale,
  convertAmountToTokenDecimals,
  formatNumber,
  formatTokenAmount,
  getUserSubName,
  isIphoneX,
} from 'app/utils';
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

const {useParams} = createParam<any>();

// 存款
const TakeScreen = (any) => {
  const {t} = useTranslation();
  const {makeRequest} = useRequest();
  const dispatch = useDispatch<Dispatch>();
  const [{userInfo}] = useRematchModel('user');

  const [inputValue, setInputValue] = React.useState('');
  const {params} = useParams();
  const [isLoading, setIsLoading] = React.useState(false);
  const [buttonLoading, setButtonLoading] = React.useState(false);
  const toast = useToastController();
  const {getClientForChain} = useSmartWallets();

  const [isSuccess, setIsSuccess] = React.useState(false);
  const [orderData, setOrderData] = React.useState<any>();

  console.log('🚀 ~ TakeScreen ~ orderData:', orderData);

  const {back, push,replace} = useRouter();

  const {onSendPayLinkSubmit, onRequestSubmit} = useTransaction();

  const createTransactionParams = (type: 'SEND' | 'REQUEST') => {
    const _amount = Number(convertAmountToTokenDecimals(orderData?.amount, orderData?.orderData?.tokenDecimals));

    console.log('🚀 ~ createTransactionParams ~ orderData:', orderData);


    const params: any = {
      platform: orderData?.token?.platform,
      chainId: Number(orderData?.token?.chainId),
      tokenContractAddress: orderData?.token?.address,
      amount: _amount,
      message: inputValue,
      transactionCategory: type,
      transactionType: orderData?.transactionType,
    };

    if (orderData?.userId !== 'anyone') {
      if (type === 'SEND') {
        params.receiverMemberId = Number(orderData?.userId);
      } else {
        params.senderMemberId = Number(orderData?.userId);
      }
    }

    return params;
  };

  const handleSubmit = async (type: 'SEND' | 'REQUEST') => {
    try {
      setIsLoading(true);
      const params = createTransactionParams(type);

      console.log('🚀 ~ handleSubmit ~ params:', params);
      if (type === 'SEND') {
        await onSendPayLinkSubmit(orderData, (data) => {
          // setIsLoading(false);
          // setOrderData(data);
          // setIsSuccess(true);
          toast.show(t('tips.success.transactionSuccess'), {
            duration: 3000,
          });
          setTimeout(() => {
            window.history.pushState(null, '', '/');
            replace('/');
          }, 500);
        });
      } else {
        await onRequestSubmit(params, (data) => {
          setOrderData(data);
          setIsSuccess(true);
        });
      }
    } catch (error) {
      console.error(`${type} transaction error:`, error);
      toast.show(t('tips.error.networkError'), {
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const _getTransactionHistoryFindTransactionHistoryCodeTransactionCode = async () => {
    setIsLoading(true);
    const res = await makeRequest(
      getTransactionHistoryFindTransactionHistoryCodeTransactionCode({transactionCode: params?.code}),
    );
    if (res?.code === '0') {
      const _orderData = res?.data;
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

  return (
    <PermissionPage>
      <AppHeader2
        isLogo
        onBack={() => {
          push('/');
        }}
        title={AppName}
        fallbackUrl="/"
      />
      <YStack flex={1} pt={appScale(80)} pl={appScale(24)} pr={appScale(24)}>
        <YStack w="100%" mb={appScale(24)}>
          <XStack mb={appScale(8)} w="100%" alignItems="center" justifyContent="center">
            <SizableText h={appScale(40)} lh={appScale(40)} fontSize={'$6'} color={'#212121'} fontWeight={'700'}>
              {orderData?.transactionCategory === 'SEND'
                ? t('home.take.tips', {amount: formatTokenAmount(orderData?.amount, orderData?.tokenDecimals)})
                : t('home.take.tips2', {
                    amount: formatTokenAmount(orderData?.amount, orderData?.tokenDecimals),
                    name: orderData?.senderMember?.name,
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
            <SizableText h={appScale(30)} lh={appScale(30)} fontSize={'$5'} color={'#212121'} fontWeight={'600'}>
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
              {`${formatTokenAmount(orderData?.amount, orderData?.tokenDecimals)} ${orderData?.tokenSymbol} (${
                getChainInfo(orderData?.chainId)?.name
              })`}
            </SizableText>
          </XStack>
        </YStack>

        <XStack w="100%" mb={appScale(24)}>
          <SizableText lh={appScale(30)} fontSize={'$5'} color={'#212121'} fontWeight={'400'}>
            {`≈ $${orderData?.currencyAmount} ${orderData?.currency}`}
          </SizableText>
        </XStack>

        <XStack w="100%" mb={appScale(24)}>
          <AppButton
            onPress={() => {
              orderData?.transactionCategory === 'SEND' ? handleSubmit('SEND') : handleSubmit('REQUEST');
            }}
          >
            {orderData?.transactionCategory === 'SEND' ? t('home.take.claim') : t('home.send')}
          </AppButton>
        </XStack>

        <YStack w="100%" mb={appScale(24)}>
          <XStack mb={appScale(8)} w="100%">
            <SizableText h={appScale(30)} lh={appScale(30)} fontSize={'$5'} color={'#212121'} fontWeight={'600'}>
              {t('home.take.message')}
            </SizableText>
          </XStack>
          <XStack w="100%" p={appScale(16)} h={appScale(180)} bc={'#FAFAFA'} br={appScale(8)} borderColor={'#FAFAFA'}>
            <SizableText lh={appScale(30)} fontSize={'$5'} color={'#212121'} fontWeight={'400'}>
              {orderData?.message}
            </SizableText>
          </XStack>
        </YStack>
      </YStack>

      {isLoading && <AppLoading />}
    </PermissionPage>
  );
};
export default TakeScreen;
