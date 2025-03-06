/*
 * @Date: 2023-12-18 14:37:38
 * @LastEditors: yosan
 * @LastEditTime: 2025-03-06 12:53:08
 * @FilePath: /ezgg-app/packages/app/pages/explore/amount/index.tsx
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
  useToastController,
  Button,
} from '@my/ui';
import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import PermissionPage from 'app/Components/PermissionPage';
import Keyboard from 'app/Components/Keyboard';
import AppButton from 'app/Components/AppButton';
import {StyleSheet} from 'react-native';
import {appScale, convertAmountToTokenDecimals, getUserSubName, isIphoneX} from 'app/utils';
import AppHeader2 from 'app/Components/AppHeader2';
import {useRouter} from 'solito/router';
import Currency from 'app/Components/Currency';
import PageLoading from 'app/Components/PageLoading';
import {createParam} from 'solito';
import {useDispatch} from 'react-redux';
import {Dispatch} from 'app/store';
import {useRematchModel} from 'app/store/model';
import AppLoading from 'app/Components/AppLoading';
import {PrimaryColor} from 'app/config';
import {useTransaction} from 'app/hooks/useTransaction';
import {getUserFindUserIdId} from 'app/servers/api/member';
import useRequest from 'app/hooks/useRequest';

const {useParams} = createParam<any>();

// 存款
const AmountScreen = () => {
  const {t} = useTranslation();
  const [{payLinkData}] = useRematchModel('user');
  const dispatch = useDispatch<Dispatch>();
  const [inputValue, setInputValue] = React.useState('');
  const [showKeyboard, setShowKeyboard] = React.useState(false);
  const [currencyData, setCurrencyData] = React.useState<any>();
  const [isLoading, setIsLoading] = React.useState(false);
  const [buttonLoading, setButtonLoading] = React.useState(false);
  const {back, push, replace} = useRouter();
  const {params} = useParams();
  const {onSendSubmit, onRequestSubmit} = useTransaction();
  const {makeRequest} = useRequest();

  const [userInfo, setUserInfo] = React.useState<any>();

  console.log('🚀 ~ AmountScreen ~ userInfo:', userInfo);

  const toast = useToastController();

  useEffect(() => {
    if (params?.id) {
      _getUserFindUserIdId();
      // setCurrencyData(params?.currency);
      // setInputValue(params?.id);
    }
  }, [params?.id]);

  const _getUserFindUserIdId = async () => {
    const res = await makeRequest(getUserFindUserIdId({id: params?.id}));
    console.log('res', res);
    if (res?.code === '0') {
      setUserInfo(res?.data);
    }
  };

  const submit = () => {
    if (!inputValue || inputValue === '0') {
      toast.show(params?.type === 'send' ? t('home.send.amountToSend.tips') : t('home.request.amountToRequest.tips'));
      return;
    }
    if (params?.type !== 'request' && Number(inputValue) > Number(currencyData?.tokenAmount)) {
      toast.show(t('home.send.amountToSend.tips2'));
      return;
    }
    if (Number(inputValue) === 0) {
      toast.show(t('home.request.amountToRequest.tips3'));
      return;
    }
    handleSubmit(params?.type === 'request' ? 'REQUEST' : 'SEND');
  };

  const createTransactionParams = (type: 'SEND' | 'REQUEST') => {
    const _amount = Number(convertAmountToTokenDecimals(inputValue, currencyData?.token?.tokenDecimals));

    const _params: any = {
      platform: currencyData?.token?.platform,
      chainId: Number(currencyData?.token?.chainId),
      tokenContractAddress: currencyData?.token?.address,
      amount: _amount,
      message: '',
      transactionCategory: type,
      transactionType: 'QR_CODE',
    };
    if (type === 'SEND') {
      _params.receiverMemberId = Number(params?.id);
    } else {
      _params.senderMemberId = Number(params?.id);
    }

    return _params;
  };

  const handleSubmit = async (type: 'SEND' | 'REQUEST') => {
    try {
      setIsLoading(true);
      const _params = createTransactionParams(type);
      if (type === 'SEND') {
        await onSendSubmit(_params, (data) => {
          setIsLoading(false);
          push('/home/success?type=qrCode&id=' + data?.id);
        });
      } else {
        await onRequestSubmit(_params, (data) => {
          setIsLoading(false);
          push('/home/success?type=requestQrCode&id=' + data?.id);
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

  const handlePagePress = () => {
    setShowKeyboard(false);
  };

  const handleInputPress = (e: any) => {
    e.stopPropagation();
    setShowKeyboard(true);
  };

  return (
    <PermissionPage>
      <AppHeader2
        isClosure
        onBack={() => {
          replace('/');
          dispatch.user.updateState({payLinkData: {}});
          window.history.pushState(null, '', '/');
        }}
        title={params?.type === 'request' ? t('screen.home.requestFrom') : t('screen.home.send')}
        fallbackUrl="/"
      />
      <YStack pl={appScale(24)} pr={appScale(24)} flex={1} w="100%" onPress={handlePagePress}>
        <YStack w="100%" mb={appScale(24)}>
          <XStack mb={appScale(8)} w="100%">
            <SizableText h={appScale(30)} lh={appScale(30)} fontSize={'$5'} color={'#212121'} fontWeight={'600'}>
              {t('home.paylink.recipient')}
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
            <XStack>
              <YStack pos={'relative'} w={appScale(84)} flexShrink={0}>
                {!userInfo?.avatar ? (
                  <AppImage
                    width={appScale(60)}
                    height={appScale(60)}
                    src={require(`app/assets/images/avatar.png`)}
                    type="local"
                  />
                ) : (
                  <AppImage width={appScale(60)} height={appScale(60)} src={userInfo?.avatar} />
                )}
              </YStack>
              <YStack gap={appScale(2)}>
                <SizableText fontSize={'$6'} color={'#26273C'} fontWeight={'500'}>
                  @{userInfo?.nickname}
                </SizableText>
                <SizableText fontSize={'$4'} color={'#9395A4'} fontWeight={'500'}>
                  {getUserSubName(userInfo)}
                </SizableText>
              </YStack>
            </XStack>
          </XStack>
        </YStack>

        <Currency setIsLoading={setIsLoading} currencyData={currencyData} setCurrencyData={setCurrencyData} />
        <YStack w="100%" mb={appScale(24)}>
          <XStack mb={appScale(8)} w="100%">
            <SizableText h={appScale(30)} lh={appScale(30)} fontSize={'$5'} color={'#212121'} fontWeight={'600'}>
              {params?.type === 'send' ? t('home.send.amountToSend') : t('home.request.amountToRequest')}
            </SizableText>
          </XStack>
          <XStack w="100%" p={appScale(16)} bc={'#FAFAFA'} br={appScale(8)} onPress={handleInputPress}>
            <SizableText
              fontSize={'$10'}
              h={appScale(50)}
              lh={appScale(50)}
              color={'#212121'}
              fontWeight={'600'}
              pos="relative"
            >
              {inputValue || '0'}
              {showKeyboard && (
                <XStack
                  pos="absolute"
                  right={-4}
                  top={0}
                  bottom={0}
                  w={2}
                  animation="quick"
                  bc="#212121"
                  style={{
                    animationName: 'cursorBlink',
                    animationDuration: '1s',
                    animationIterationCount: 'infinite',
                    animationTimingFunction: 'steps(2, start)',
                  }}
                />
              )}
            </SizableText>
          </XStack>
        </YStack>
        {params?.type !== 'request' && (
          <XStack mb={appScale(24)} h={appScale(24)} w="100%" ai={'center'} jc={'center'}>
            {currencyData?.tokenAmount && (
              <SizableText
                h={appScale(24)}
                lh={appScale(24)}
                fontSize={'$4'}
                color={'#212121'}
                fontWeight={'500'}
              >{`${t('home.balance')}: ${currencyData?.tokenAmount} ${currencyData?.token?.tokenSymbol} (${
                currencyData?.chainName
              })`}</SizableText>
            )}
          </XStack>
        )}

        {/* <XStack mb={appScale(34)} w="100%" ai={'center'} jc={'center'} borderTopWidth={1} borderColor={'#F2F2F2'}>
          <AppButton isLoading={buttonLoading} onPress={submit}>
            {t('home.send.continue')}
          </AppButton>
        </XStack> */}
      </YStack>

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
            handlePagePress();
            // setDeclineRequestVisible(true);
            replace('/');
            dispatch.user.updateState({payLinkData: {}});
            window.history.pushState(null, '', '/');
          }}
          // disabled={isLoading}
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
            handlePagePress();
            submit();
          }}
        >
          {params?.type === 'request' ? t('home.request.requestCrypto') : t('home.paylink.sendCrypto')}
        </AppButton>
      </XStack>
      {showKeyboard && (
        <Keyboard decimals={currencyData?.token?.tokenDecimals || 6} onChange={setInputValue} value={inputValue} />
      )}
      {isLoading && <AppLoading />}
    </PermissionPage>
  );
};
export default AmountScreen;
