/*
 * @Date: 2023-12-18 14:37:38
 * @LastEditors: yosan
 * @LastEditTime: 2025-03-07 13:39:28
 * @FilePath: /ezgg-app/packages/app/pages/home/pay/amount/index.tsx
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
  ScrollView,
} from '@my/ui';
import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import PermissionPage from 'app/Components/PermissionPage';
import Keyboard from 'app/Components/Keyboard';
import AppButton from 'app/Components/AppButton';
import {StyleSheet} from 'react-native';
import {appScale} from 'app/utils';
import AppHeader2 from 'app/Components/AppHeader2';
import {useRouter} from 'solito/router';
import Currency from 'app/Components/Currency';
import PageLoading from 'app/Components/PageLoading';
import {createParam} from 'solito';
import {useDispatch} from 'react-redux';
import {Dispatch} from 'app/store';
import {useRematchModel} from 'app/store/model';
import AppLoading from 'app/Components/AppLoading';

const {useParams} = createParam<any>();

// 存款
const AmountScreen = ({type}: any) => {
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
  const toast = useToastController();

  useEffect(() => {
    if (payLinkData?.id && payLinkData?.currencyData?.token?.tokenSymbol) {
      const {amount, currencyData: _currencyData} = payLinkData;
      setCurrencyData(_currencyData);
      setInputValue(amount);
    }
  }, [payLinkData?.id]);

  const submit = () => {
    if (!inputValue || inputValue === '0') {
      toast.show(type === 'send' ? t('home.send.amountToSend.tips') : t('home.request.amountToRequest.tips'));
      return;
    }
    if (type === 'send' && Number(inputValue) > Number(currencyData?.tokenAmount)) {
      toast.show(t('home.send.amountToSend.tips2'));
      return;
    }
    if (Number(inputValue) === 0) {
      toast.show(t('home.request.amountToRequest.tips3'));
      return;
    }

    setButtonLoading(true);
    setTimeout(() => {
      setButtonLoading(false);
      const id = new Date().getTime() + Math.random();
      replace(`/home/${type}/paylink?id=${id}`);
      dispatch.user.updateState({
        payLinkData: {
          ...payLinkData,
          id: id,
          amount: inputValue,
          currencyData: currencyData,
        },
      });
    });
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
        title={type === 'send' ? t('screen.home.amount') : t('screen.home.amountRequesting')}
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
        <YStack pl={appScale(24)} pr={appScale(24)} onPress={handlePagePress}>
          <Currency setIsLoading={setIsLoading} currencyData={currencyData} setCurrencyData={setCurrencyData} />
          <YStack w="100%" mb={appScale(24)}>
            <XStack mb={appScale(8)} w="100%">
              <SizableText h={appScale(30)} lh={appScale(30)} fontSize={'$3'} color={'#212121'} fontWeight={'500'}>
                {type === 'send' ? t('home.send.amountToSend') : t('home.request.amountToRequest')}
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
          {type === 'send' && (
            <XStack mb={appScale(24)} mih={appScale(24)} w="100%" ai={'center'} jc={'center'}>
              {currencyData?.tokenAmount && (
                <SizableText
                  h={appScale(24)}
                  lh={appScale(24)}
                  fontSize={'$3'}
                  color={'#212121'}
                  fontWeight={'500'}
                >{`${t('home.balance')}: ${currencyData?.tokenAmount} ${currencyData?.token?.tokenSymbol} (${
                  currencyData?.chainName
                })`}</SizableText>
              )}
            </XStack>
          )}

          <XStack mb={appScale(34)} w="100%" ai={'center'} jc={'center'} borderTopWidth={1} borderColor={'#F2F2F2'}>
            <AppButton isLoading={buttonLoading} onPress={submit}>
              {t('home.send.continue')}
            </AppButton>
          </XStack>
        </YStack>

        {showKeyboard && (
          <Keyboard decimals={currencyData?.token?.tokenDecimals || 6} onChange={setInputValue} value={inputValue} />
        )}
      </ScrollView>
      {isLoading && <AppLoading />}
    </PermissionPage>
  );
};
export default AmountScreen;
