/*
 * @Date: 2023-12-18 14:37:38
 * @LastEditors: yosan
 * @LastEditTime: 2025-02-24 19:45:08
 * @FilePath: /ezgg-app/packages/app/pages/home/deposit/index.tsx
 */
import {AppHeader, AppHeaderProps, HeaderBackButton, Paragraph, XStack, YStack, SizableText} from '@my/ui';
import React from 'react';
import {useTranslation} from 'react-i18next';
import PermissionPage from 'app/Components/PermissionPage';
import Keyboard from 'app/Components/Keyboard';
import AppButton from 'app/Components/AppButton';
import {StyleSheet} from 'react-native';
import {appScale} from 'app/utils';
import AppHeader2 from 'app/Components/AppHeader2';
import {useRouter} from 'solito/router';
import Currency from 'app/Components/Currency';

// 存款
const DepositScreen = () => {
  const {t} = useTranslation();
  const [inputValue, setInputValue] = React.useState('');
  const [showKeyboard, setShowKeyboard] = React.useState(false);

  const [balance, setBalance] = React.useState(0);
  const [token, setToken] = React.useState('USDC');
  const [chain, setChain] = React.useState('Polygon');
  const [isLoading, setIsLoading] = React.useState(false);
  const {back, push} = useRouter();

  const submit = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    console.log('🚀 ~ DepositScreen ~ inputValue:', inputValue);
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
      <AppHeader2 title={t('screen.home.deposit')} fallbackUrl="/home" />
      <YStack pl={appScale(24)} pr={appScale(24)} onPress={handlePagePress}>
        <Currency token={token} chain={chain} />
        <YStack w="100%" mb={appScale(24)}>
          <XStack mb={appScale(8)} w="100%">
            <SizableText h={appScale(30)} lh={appScale(30)} fontSize={'$5'} color={'#212121'} fontWeight={'600'}>
              {t('home.send.amountToSend')}
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
        <XStack mb={appScale(24)} w="100%" ai={'center'} jc={'center'}>
          <SizableText h={appScale(24)} lh={appScale(24)} fontSize={'$4'} color={'#212121'} fontWeight={'500'}>{`${t(
            'home.balance',
          )}: ${balance} ${token} (${chain})`}</SizableText>
        </XStack>

        <XStack mb={appScale(34)} w="100%" ai={'center'} jc={'center'}>
          <AppButton isLoading={isLoading} onPress={submit}>
            {t('home.deposit')}
          </AppButton>
        </XStack>
      </YStack>
      {showKeyboard && <Keyboard onChange={setInputValue} value={inputValue} />}
    </PermissionPage>
  );
};
export default DepositScreen;
