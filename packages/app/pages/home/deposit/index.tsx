/*
 * @Date: 2023-12-18 14:37:38
 * @LastEditors: yosan
 * @LastEditTime: 2025-03-04 11:33:10
 * @FilePath: /ezgg-app/packages/app/pages/home/deposit/index.tsx
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
} from '@my/ui';
import React from 'react';
import {useTranslation} from 'react-i18next';
import PermissionPage from 'app/Components/PermissionPage';
import Keyboard from 'app/Components/Keyboard';
import {appScale} from 'app/utils';
import AppHeader2 from 'app/Components/AppHeader2';
import {useRouter} from 'solito/router';
import Currency from 'app/Components/Currency';
import ConnectorsPopup from 'app/Components/ConnectorsPopup';
import AppLoading from 'app/Components/AppLoading';
import DepositButton from './components/DepositButton';

const depositToken = '0x52435264BFDB';

// 存款
const DepositScreen = () => {
  const {t} = useTranslation();
  const [inputValue, setInputValue] = React.useState('');
  const [showKeyboard, setShowKeyboard] = React.useState(false);
  const [currencyData, setCurrencyData] = React.useState<any>();

  const [isLoading, setIsLoading] = React.useState(false);
  const {back, push} = useRouter();
  const toast = useToastController();

  const [isShow, setIsShow] = React.useState(false);

  const handlePagePress = () => {
    setShowKeyboard(false);
  };

  const handleInputPress = (e: any) => {
    e.stopPropagation();
    setShowKeyboard(true);
  };

  return (
    <PermissionPage>
      <AppHeader2 title={t('screen.home.deposit')} fallbackUrl="/" />
      {/* <TokenBalance tokenAddress="0x833589fcd6edb6e08f4c7c32d4f71b54bda02913" userAddress={address} /> */}
      <YStack pl={appScale(24)} pr={appScale(24)} onPress={handlePagePress}>
        <Currency setIsLoading={setIsLoading} currencyData={currencyData} setCurrencyData={setCurrencyData} />
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
          )}: ${currencyData?.tokenAmount} ${currencyData?.token?.tokenSymbol} (${
            currencyData?.token?.chainName
          })`}</SizableText>
        </XStack>

        <XStack mb={appScale(34)} w="100%" ai={'center'} jc={'center'}>
          <DepositButton
            setIsLoading={setIsLoading}
            setIsShow={setIsShow}
            isLogin={true}
            inputValue={inputValue}
            currencyData={currencyData}
          />
        </XStack>
        {!showKeyboard && (
          <>
            <XStack ai="center" pl={appScale(24)} pr={appScale(24)} mb={appScale(34)}>
              <XStack h={2} flex={1} bc={'rgba(238, 238, 238, 1)'}></XStack>
              <SizableText fontSize={'$3'} color={'#9E9E9E'} ml={'$4'} mr={'$4'}>
                {t('home.deposit.or')}
              </SizableText>
              <XStack h={2} flex={1} bc={'rgba(238, 238, 238, 1)'}></XStack>
            </XStack>
            <XStack ai="center" jc={'center'} w="100%" mb={appScale(48)}>
              <SizableText ta={'center'} fontSize={'$5'} color={'#212121'} fow="600">
                {t('home.deposit.sendTips', {
                  value: depositToken,
                  token: currencyData?.tokenSymbol,
                  chain: currencyData?.chainName,
                })}
              </SizableText>
            </XStack>
            <XStack ai="center" jc={'center'} w="100%" mb={appScale(24)}>
              <SizableText ta={'center'} fontSize={'$9'} color={'#212121'} fow="700" mr={'$4'}>
                {depositToken}
              </SizableText>
              <AppImage
                width={appScale(30)}
                height={appScale(30)}
                src={require(`app/assets/images/copy.png`)}
                type="local"
              />
            </XStack>
          </>
        )}
      </YStack>
      <ConnectorsPopup modalVisible={isShow} setModalVisible={setIsShow} />
      {showKeyboard && <Keyboard onChange={setInputValue} value={inputValue} />}
      {isLoading && <AppLoading />}
    </PermissionPage>
  );
};
export default DepositScreen;
