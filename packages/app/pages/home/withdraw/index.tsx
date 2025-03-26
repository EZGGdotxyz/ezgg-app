/*
 * @Date: 2023-12-18 14:37:38
 * @LastEditors: yosan
 * @LastEditTime: 2025-03-26 10:10:37
 * @FilePath: /ezgg-app/packages/app/pages/home/withdraw/index.tsx
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
  Input,
  Button,
  ScrollView,
} from '@my/ui';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import PermissionPage from 'app/Components/PermissionPage';
import Keyboard from 'app/Components/Keyboard';
import AppButton from 'app/Components/AppButton';
import {StyleSheet} from 'react-native';
import {convertAmountToTokenDecimals, isIphoneX} from 'app/utils';
import AppHeader2 from 'app/Components/AppHeader2';
import {useRouter} from 'solito/router';
import Currency from 'app/Components/Currency';
import PageLoading from 'app/Components/PageLoading';
import AppLoading from 'app/Components/AppLoading';
import {useWallets} from '@privy-io/react-auth';
import TokenTransferContract from 'app/abi/TokenTransfer.json';
import {encodeFunctionData, erc721Abi, erc20Abi, createPublicClient, http, getAddress} from 'viem';
import {useSmartWallets} from '@privy-io/react-auth/smart-wallets';
import {useRematchModel} from 'app/store/model';
import useRequest from 'app/hooks/useRequest';
import {useTransaction} from 'app/hooks/useTransaction';
import {PrimaryColor} from 'app/config';
import {validateAddress} from 'app/utils/chain';
import ConnectorsPopup from 'app/Components/ConnectorsPopup';
import {useAccount} from 'wagmi';
import useResponse from 'app/hooks/useResponse';
import PayPopup from 'app/Components/PayPopup';
import Connectors from 'app/Components/Connectors';

// 提取
const WithdrawScreen = () => {
  const {t} = useTranslation();
  const [inputValue, setInputValue] = React.useState('');
  const [showKeyboard, setShowKeyboard] = React.useState(false);
  const [{userInfo}] = useRematchModel('user');
  const {makeRequest} = useRequest();

  const [isLoading, setIsLoading] = React.useState(false);
  const [buttonLoading, setButtonLoading] = React.useState(false);
  const {back, push} = useRouter();
  const toast = useToastController();
  const [currencyData, setCurrencyData] = React.useState<any>();

  const [orderData, setOrderData] = React.useState<any>();
  const [modalVisible, setModalVisible] = React.useState(false);

  const [withdrawAddress, setWithdrawAddress] = React.useState('');
  const [isShow, setIsShow] = React.useState(false);

  const {onWithdraw, createTransaction} = useTransaction();
  const {address} = useAccount();
  const {appScale} = useResponse();

  const submit = async (_address) => {
    // 验证金额
    if (!inputValue || Number(inputValue) <= 0) {
      toast.show(t('tips.error.withdraw.invalidAmount'));
      return;
    }

    // 验证余额
    if (Number(inputValue) > Number(currencyData?.balance)) {
      toast.show(t('tips.error.withdraw.insufficientFunds'));
      return;
    }
    // 验证地址格式
    if (!validateAddress(_address, Number(currencyData?.token?.chainId))) {
      toast.show(t('home.withdraw.address.invalid'));
      return;
    }

    setIsLoading(true);

    const params: any = {
      platform: currencyData?.token?.platform,
      chainId: Number(currencyData?.token?.chainId),
      tokenContractAddress: currencyData?.token?.address,
      message: inputValue,
      transactionCategory: 'WITHDRAW',
      transactionType: 'WITHDRAW',
      senderMemberId: userInfo?.customMetadata?.id,
      senderWalletAddress: _address,
    };
    const _amount = Number(convertAmountToTokenDecimals(inputValue.toString(), 6));
    const transaction = await createTransaction({...params, amount: _amount});

    if (transaction?.transactionCode) {
      setModalVisible(true);
      setOrderData({...transaction, receiverAddress: _address});
    } else {
      toast.show(t('tips.error.withdraw.failed'));
      setIsLoading(false);
    }

    try {
    } catch (error) {
      console.error('Withdraw error:', error);
      setIsLoading(false);
      toast.show(t('tips.error.withdraw.failed'));
    }
  };

  const _onWithdraw = async () => {
    try {
      await onWithdraw(orderData, (data) => {
        setIsLoading(false);
        push('/home/success?type=WITHDRAW&id=' + data?.id);
      });
    } catch (error) {}
  };

  const handlePagePress = () => {
    setShowKeyboard(false);
  };

  const handleInputPress = (e: any) => {
    e.stopPropagation();
    setShowKeyboard(true);
  };

  const handleSubmit = () => {
    if (!inputValue || inputValue === '0') {
      toast.show(t('home.send.amountToSend.tips'));
      return;
    }

    if (Number(inputValue) > Number(currencyData?.tokenAmount)) {
      toast.show(t('home.withdraw.tips'));
      return;
    }

    if (address) {
      submit(address);
    } else {
      if (withdrawAddress) {
        submit(withdrawAddress);
      } else {
        toast.show(t('home.withdraw.address.tips2'));
      }
    }
  };

  return (
    <PermissionPage>
      <AppHeader2 title={t('screen.home.withdraw')} fallbackUrl="/" />
      <ScrollView
        flex={1}
        w={'100%'}
        bc="#fff"
        contentContainerStyle={{
          minHeight: '100%',
        }}
      >
        <YStack>
          <YStack pl={appScale(24)} pr={appScale(24)} onPress={handlePagePress} flex={1}>
            <Currency setIsLoading={setIsLoading} currencyData={currencyData} setCurrencyData={setCurrencyData} />
            <YStack w="100%" mb={appScale(24)}>
              <XStack mb={appScale(8)} w="100%">
                <SizableText h={appScale(30)} lh={appScale(30)} fontSize={'$3'} color={'#212121'} fontWeight={'500'}>
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
            <XStack mb={appScale(24)} mih={appScale(24)} w="100%" ai={'center'} jc={'center'}>
              {currencyData?.tokenAmount && (
                <SizableText lh={appScale(24)} ta="center" fontSize={'$4'} color={'#212121'} fontWeight={'500'}>{`${t(
                  'home.balance',
                )}: ${currencyData?.tokenAmount} ${currencyData?.token?.tokenSymbol} (${
                  currencyData?.chainName
                })`}</SizableText>
              )}
            </XStack>
            {!showKeyboard && (
              <>
                <Connectors isWithdraw setIsLoading={setIsLoading} currencyData={currencyData} />
                <XStack ai="center" pl={appScale(24)} pr={appScale(24)} mb={appScale(34)}>
                  <XStack h={2} flex={1} bc={'rgba(238, 238, 238, 1)'}></XStack>
                  <SizableText fontSize={'$3'} color={'#9E9E9E'} ml={'$4'} mr={'$4'}>
                    {t('home.deposit.or')}
                  </SizableText>
                  <XStack h={2} flex={1} bc={'rgba(238, 238, 238, 1)'}></XStack>
                </XStack>
                <YStack w="100%" mb={appScale(24)}>
                  <XStack mb={appScale(8)} w="100%">
                    <SizableText
                      h={appScale(30)}
                      lh={appScale(30)}
                      fontSize={'$3'}
                      color={'#212121'}
                      fontWeight={'500'}
                    >
                      {t('home.withdraw.address')}
                    </SizableText>
                  </XStack>
                  <Input
                    w="100%"
                    p={appScale(16)}
                    bc={'#FAFAFA'}
                    br={appScale(8)}
                    fontSize={'$5'}
                    h={appScale(82)}
                    lh={appScale(50)}
                    color={'#212121'}
                    value={withdrawAddress}
                    onChangeText={setWithdrawAddress}
                    borderColor={'#FAFAFA'}
                    placeholder={t('home.withdraw.address.tips')}
                  />
                </YStack>
                <XStack mb={appScale(34)} w="100%" ai={'center'} jc={'center'}>
                  <AppButton onPress={handleSubmit}>{t('home.withdraw')}</AppButton>
                </XStack>
              </>
            )}
          </YStack>

          {showKeyboard && <Keyboard onChange={setInputValue} value={inputValue} />}
        </YStack>
      </ScrollView>

      {isLoading && <AppLoading />}
      <PayPopup
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        orderData={orderData}
        onSubmit={_onWithdraw}
      />
    </PermissionPage>
  );
};
export default WithdrawScreen;
