/*
 * @Date: 2023-12-18 14:37:38
 * @LastEditors: yosan
 * @LastEditTime: 2025-03-04 23:09:52
 * @FilePath: /ezgg-app/packages/app/pages/home/pay/payLink/index.tsx
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
import {appScale, convertAmountToTokenDecimals, formatNumber, getUserSubName, isIphoneX} from 'app/utils';
import AppHeader2 from 'app/Components/AppHeader2';
import {useRouter} from 'solito/router';
import Currency from 'app/Components/Currency';
import PageLoading from 'app/Components/PageLoading';
import {ChevronDown, ChevronRight} from '@tamagui/lucide-icons';
import {createParam} from 'solito';
import {ExternalLinkData, PrimaryColor} from 'app/config';
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
  postTransactionPayLinkUpdateTransactionHash,
} from 'app/servers/api/transactionPayLink';
import AppLoading from 'app/Components/AppLoading';
import TokenLinkContract from 'app/abi/TokenLink.json';
import {useTransaction} from 'app/hooks/useTransaction';

const {useParams} = createParam<any>();

// 存款
const PayLinkScreen = ({type}: any) => {
  const {t} = useTranslation();
  const {makeRequest} = useRequest();
  const dispatch = useDispatch<Dispatch>();
  const [{payLinkData, userInfo}] = useRematchModel('user');

  const [inputValue, setInputValue] = React.useState('');
  const {params} = useParams();
  const [isLoading, setIsLoading] = React.useState(false);
  const [buttonLoading, setButtonLoading] = React.useState(false);
  const toast = useToastController();
  const {getClientForChain} = useSmartWallets();

  const [isSuccess, setIsSuccess] = React.useState(false);
  const [orderData, setOrderData] = React.useState<any>();

  const {back, replace, push} = useRouter();
  const {onSendSubmit, onRequestSubmit} = useTransaction();

  const createTransactionParams = (type: 'SEND' | 'REQUEST') => {
    const _amount = Number(
      convertAmountToTokenDecimals(payLinkData?.amount, payLinkData?.currencyData?.token?.tokenDecimals),
    );

    const params: any = {
      platform: payLinkData?.currencyData?.token?.platform,
      chainId: Number(payLinkData?.currencyData?.token?.chainId),
      tokenContractAddress: payLinkData?.currencyData?.token?.address,
      amount: _amount,
      message: inputValue,
      transactionCategory: type,
      transactionType: payLinkData?.transactionType,
    };
    if (payLinkData?.userId !== 'anyone') {
      if (type === 'SEND') {
        params.receiverMemberId = Number(payLinkData?.userId);
      } else {
        params.senderMemberId = Number(payLinkData?.userId);
      }
    }
    console.log('🚀 ~ createTransactionParams ~ payLinkData:', payLinkData);

    console.log('🚀 ~ createTransactionParams ~ params:', params);

    return params;
  };

  const handleSubmit = async (type: 'SEND' | 'REQUEST') => {
    try {
      setIsLoading(true);
      const params = createTransactionParams(type);
      if (type === 'SEND') {
        await onSendSubmit(params, (data) => {
          setIsLoading(false);
          setOrderData(data);
          setIsSuccess(true);
          dispatch.user.updateState({payLinkData: {}});
        });
      } else {
        await onRequestSubmit(params, (data) => {
          setOrderData(data);
          setIsSuccess(true);
          dispatch.user.updateState({payLinkData: {}});
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

  return (
    <PermissionPage>
      <AppHeader2
        isClosure
        onBack={() => {
          dispatch.user.updateState({payLinkData: {}});
          window.history.pushState(null, '', '/');
          replace('/');
        }}
        title={t('screen.home.paylink')}
        fallbackUrl="/"
      />
      {isSuccess ? (
        <YStack flex={1} jc="space-between">
          <SuccessInfo type={type === 'send' ? 'sent' : 'request'} orderData={orderData} />

          <YStack pb={appScale(16)} pl={appScale(24)} pr={appScale(24)}>
            <SizableText h={appScale(30)} lh={appScale(30)} fontSize={'$5'} color={'##616161'} fontWeight={'600'}>
              {t('home.send.tips1')}
            </SizableText>
            <SizableText h={appScale(30)} lh={appScale(30)} fontSize={'$5'} color={'##616161'} fontWeight={'600'}>
              {t('home.send.tips2')}
            </SizableText>
          </YStack>
        </YStack>
      ) : (
        <YStack flex={1} pl={appScale(24)} pr={appScale(24)}>
          <YStack w="100%" mb={appScale(24)}>
            <XStack mb={appScale(8)} w="100%">
              <SizableText h={appScale(30)} lh={appScale(30)} fontSize={'$5'} color={'#212121'} fontWeight={'600'}>
                {t('home.paylink.recipient')}
              </SizableText>
            </XStack>

            <Button
              w="100%"
              p={appScale(16)}
              bc={'#FAFAFA'}
              br={appScale(8)}
              unstyled
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              pressStyle={{
                opacity: 0.7,
                bc: '#FAFAFA',
              }}
              onPress={() => {
                console.log('🚀 ~ PayLinkScreen ~ type:', type);
                push(`/home/${type}?userId=${payLinkData?.userId}`);
              }}
            >
              {payLinkData?.userId === 'anyone' ? (
                <SizableText fontSize={'$6'} color={PrimaryColor} fontWeight={'700'}>
                  {t('home.paylink.anyoneLink')}
                </SizableText>
              ) : (
                <XStack>
                  <YStack pos={'relative'} w={appScale(84)} flexShrink={0}>
                    {!payLinkData?.user?.avatar ? (
                      <AppImage
                        width={appScale(60)}
                        height={appScale(60)}
                        src={require(`app/assets/images/avatar.png`)}
                        type="local"
                      />
                    ) : (
                      <AppImage width={appScale(60)} height={appScale(60)} src={payLinkData?.user?.avatar} />
                    )}
                  </YStack>
                  <YStack gap={appScale(2)}>
                    <SizableText fontSize={'$6'} color={'#26273C'} fontWeight={'500'}>
                      @{payLinkData?.user?.nickname}
                    </SizableText>
                    <SizableText fontSize={'$4'} color={'#9395A4'} fontWeight={'500'}>
                      {getUserSubName(payLinkData?.user)}
                    </SizableText>
                  </YStack>
                </XStack>
              )}

              <ChevronRight size="$3" color={'#212121'} />
            </Button>
          </YStack>
          <YStack w="100%" mb={appScale(24)}>
            <XStack mb={appScale(8)} w="100%">
              <SizableText h={appScale(30)} lh={appScale(30)} fontSize={'$5'} color={'#212121'} fontWeight={'600'}>
                {type === 'send' ? t('home.send.amountToSend') : t('home.request.amountToRequest')}
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
                {`${payLinkData?.amount} ${payLinkData?.currencyData?.token?.tokenSymbol} (${payLinkData?.currencyData?.chainName})`}
              </SizableText>
            </XStack>
          </YStack>

          <YStack w="100%" mb={appScale(24)}>
            <XStack mb={appScale(8)} w="100%">
              <SizableText h={appScale(30)} lh={appScale(30)} fontSize={'$5'} color={'#212121'} fontWeight={'600'}>
                {t('home.paylink.addMessage')}
              </SizableText>
            </XStack>
            <TextArea
              w="100%"
              p={appScale(16)}
              bc={'#FAFAFA'}
              br={appScale(8)}
              rows={6}
              fontSize={'$5'}
              lh={appScale(30)}
              value={inputValue}
              onChangeText={setInputValue}
              borderColor={'#FAFAFA'}
              placeholder={t('home.paylink.addMessage.tips')}
            />
          </YStack>
        </YStack>
      )}

      <XStack
        flexShrink={0}
        pl={appScale(24)}
        pr={appScale(24)}
        pt={12}
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
            if (isSuccess) {
              window.history.pushState(null, '', '/');
              replace(`/home/history/${orderData?.id}`);
              dispatch.user.updateState({payLinkData: {}});
              window.history.replaceState(null, '', window.location.href);
            } else {
              back();
            }
          }}
          pressStyle={{
            opacity: 0.85,
          }}
          unstyled
        >
          {isSuccess ? t('home.send.viewLink') : t('operate.button.cancel')}
        </Button>
        <AppButton
          style={{
            width: '50%',
          }}
          onPress={() => {
            if (isSuccess) {
              onCopy(`${ExternalLinkData.webPageHome}/home/take/${orderData?.transactionCode}`);
            } else {
              handleSubmit(type === 'send' ? 'SEND' : 'REQUEST');
            }
          }}
        >
          {isSuccess
            ? t('home.send.copyLink')
            : type === 'send'
            ? t('home.paylink.sendCrypto')
            : t('home.request.requestCrypto')}
        </AppButton>
      </XStack>

      {isLoading && <AppLoading />}
    </PermissionPage>
  );
};
export default PayLinkScreen;
