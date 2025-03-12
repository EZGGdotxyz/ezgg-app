/*
 * @Date: 2023-12-18 14:37:38
 * @LastEditors: yosan
 * @LastEditTime: 2025-03-12 17:50:59
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
  ScrollView,
} from '@my/ui';
import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import PermissionPage from 'app/Components/PermissionPage';
import Keyboard from 'app/Components/Keyboard';
import AppButton from 'app/Components/AppButton';
import {StyleSheet} from 'react-native';
import {convertAmountToTokenDecimals, formatNumber, getUserSubName, isIphoneX} from 'app/utils';
import AppHeader2 from 'app/Components/AppHeader2';
import {useRouter} from 'solito/router';
import Currency from 'app/Components/Currency';
import PageLoading from 'app/Components/PageLoading';
import {ChevronDown, ChevronRight} from '@tamagui/lucide-icons';
import {createParam} from 'solito';
import {ExternalLinkData, PrimaryColor} from 'app/config';
import SuccessInfo from 'app/Components/SuccessInfo';
import useRequest from 'app/hooks/useRequest';
import {useDispatch} from 'react-redux';
import {Dispatch} from 'app/store';
import {useRematchModel} from 'app/store/model';
import AppLoading from 'app/Components/AppLoading';
import TokenLinkContract from 'app/abi/TokenLink.json';
import {useTransaction} from 'app/hooks/useTransaction';
import useResponse from 'app/hooks/useResponse';
import PayPopup from 'app/Components/PayPopup';

const {useParams} = createParam<any>();

// 存款
const PayLinkScreen = ({type}: any) => {
  const {t} = useTranslation();
  const {makeRequest} = useRequest();
  const dispatch = useDispatch<Dispatch>();
  const [{payLinkData, userInfo}] = useRematchModel('user');
  const {appScale} = useResponse();

  const [inputValue, setInputValue] = React.useState('');
  const {params} = useParams();
  const [isLoading, setIsLoading] = React.useState(false);
  const [buttonLoading, setButtonLoading] = React.useState(false);
  const toast = useToastController();

  const [orderData, setOrderData] = React.useState<any>();
  const [modalVisible, setModalVisible] = React.useState(false);

  const {back, replace, push} = useRouter();
  const {onSendSubmit, onRequestSubmit, createTransaction} = useTransaction();

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
    if (payLinkData?.transactionType !== 'PAY_LINK' && payLinkData?.transactionType !== 'REQUEST_LINK') {
      if (type === 'SEND') {
        params.receiverMemberId = Number(payLinkData?.userId);
        // params.senderMemberId = Number(userInfo?.customMetadata?.id);
      } else {
        params.senderMemberId = Number(payLinkData?.userId);
        // params.receiverMemberId = Number(userInfo?.customMetadata?.id);
      }
    } else {
      if (type === 'SEND') {
        params.senderMemberId = Number(userInfo?.customMetadata?.id);
      } else {
        params.receiverMemberId = Number(userInfo?.customMetadata?.id);
      }
    }

    return params;
  };

  const handleSubmit = async (type: 'SEND' | 'REQUEST') => {
    try {
      setIsLoading(true);
      const params = createTransactionParams(type);
      if (type === 'SEND') {
        const transaction = await createTransaction(params);
        if (transaction?.transactionCode) {
          setModalVisible(true);
          setOrderData(transaction);
        } else {
          toast.show(t('tips.error.networkError'), {
            duration: 3000,
          });
        }
      } else {
        await onRequestSubmit(params, (data) => {
          setIsLoading(false);
          replace(`/home/success?type=${data?.transactionType}&id=${data?.id}`);
          setTimeout(() => {
            dispatch.user.updateState({payLinkData: {}});
          });
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

  const _onSendContract = async () => {
    try {
      setIsLoading(true);
      await onSendSubmit(orderData, (data) => {
        setIsLoading(false);
        replace(`/home/success?type=${data?.transactionType}&id=${data?.id}`);
        setTimeout(() => {
          dispatch.user.updateState({payLinkData: {}});
        });
      });
    } catch (error) {

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

  return (
    <PermissionPage>
      <AppHeader2
        onBack={() => {
          replace('/');
          dispatch.user.updateState({payLinkData: {}});
        }}
        title={t('screen.home.paylink')}
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
        <YStack flex={1} pl={appScale(24)} pr={appScale(24)}>
          <YStack w="100%" mb={appScale(24)}>
            <XStack mb={appScale(8)} w="100%">
              <SizableText h={appScale(30)} lh={appScale(30)} fontSize={'$3'} color={'#212121'} fontWeight={'500'}>
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
                replace(`/home/${type}?userId=${payLinkData?.userId}`);
              }}
            >
              {payLinkData?.userId === 'anyone' ? (
                <SizableText fontSize={'$5'} color={PrimaryColor} fontWeight={'600'}>
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
                    <SizableText fontSize={'$5'} color={'#26273C'} fontWeight={'600'}>
                      @{payLinkData?.user?.nickname}
                    </SizableText>
                    <SizableText fontSize={'$3'} color={'#9395A4'} fontWeight={'500'}>
                      {getUserSubName(payLinkData?.user)}
                    </SizableText>
                  </YStack>
                </XStack>
              )}

              <ChevronRight size="$2" color={'#212121'} />
            </Button>
          </YStack>
          <YStack w="100%" mb={appScale(24)}>
            <XStack mb={appScale(8)} w="100%">
              <SizableText h={appScale(30)} lh={appScale(30)} fontSize={'$3'} color={'#212121'} fontWeight={'500'}>
                {type === 'send' ? t('home.send.amountToSend') : t('home.request.amountToRequest')}
              </SizableText>
            </XStack>
            <XStack w="100%" p={appScale(16)} bc={'#FAFAFA'} br={appScale(8)}>
              <SizableText
                fontSize={'$7'}
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
              <SizableText h={appScale(30)} lh={appScale(30)} fontSize={'$3'} color={'#212121'} fontWeight={'500'}>
                {t('home.paylink.addMessage')}
              </SizableText>
            </XStack>
            <TextArea
              w="100%"
              unstyled
              p={appScale(16)}
              bc={'#FAFAFA'}
              br={appScale(8)}
              rows={6}
              fontSize={'$3'}
              lh={appScale(30)}
              value={inputValue}
              onChangeText={setInputValue}
              borderColor={'#FAFAFA'}
              placeholder={t('home.paylink.addMessage.tips')}
            />
          </YStack>
        </YStack>
      </ScrollView>

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
            // back();
            replace('/');
            dispatch.user.updateState({payLinkData: {}});
          }}
          pressStyle={{
            opacity: 0.85,
          }}
          unstyled
        >
          {t('operate.button.cancel')}
        </Button>
        <AppButton
          style={{
            width: '50%',
          }}
          onPress={() => {
            if (orderData?.id) {
              // _onSendContract();
              setModalVisible(true);
            } else {
              handleSubmit(type === 'send' ? 'SEND' : 'REQUEST');
            }
          }}
        >
          {type === 'send' ? t('home.paylink.sendCrypto') : t('home.request.requestCrypto')}
        </AppButton>
      </XStack>

      {isLoading && <AppLoading />}

      <PayPopup
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        orderData={orderData}
        onSubmit={_onSendContract}
      />
    </PermissionPage>
  );
};
export default PayLinkScreen;
