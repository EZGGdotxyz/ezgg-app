/*
 * @Date: 2023-12-18 14:37:38
 * @LastEditors: yosan
 * @LastEditTime: 2025-03-06 16:52:24
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
} from '@my/ui';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import PermissionPage from 'app/Components/PermissionPage';
import Keyboard from 'app/Components/Keyboard';
import AppButton from 'app/Components/AppButton';
import {StyleSheet} from 'react-native';
import {appScale, convertAmountToTokenDecimals, isIphoneX} from 'app/utils';
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
import {
  postTransactionHistoryCreateTransactionHistory,
  postTransactionHistoryUpdateTransactionHash,
} from 'app/servers/api/transactionHistory';
import {postTransactionPayLinkUpdateTransactionHash} from 'app/servers/api/transactionPayLink';
import useRequest from 'app/hooks/useRequest';
import {useTransaction} from 'app/hooks/useTransaction';
import {PrimaryColor} from 'app/config';
import {validateAddress} from 'app/utils/chain';
import ConnectorsPopup from 'app/Components/ConnectorsPopup';
import {useAccount} from 'wagmi';

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

  const [withdrawAddress, setWithdrawAddress] = React.useState('');
  const [isShow, setIsShow] = React.useState(false);

  const {onWithdraw} = useTransaction();
  const {address} = useAccount();

  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
    if (address && isSubmit) {
      submit(address);
    }
  }, [address, currencyData?.token?.decimals, inputValue, isSubmit]);

  const submit = async (_address) => {
    if (!inputValue || inputValue === '0') {
      toast.show(t('home.send.amountToSend.tips'));
      return;
    }

    if (Number(inputValue) > Number(currencyData?.tokenAmount)) {
      toast.show(t('home.withdraw.tips'));
      return;
    }

    if (!_address) {
      toast.show(t('home.withdraw.address.tips'));
      return;
    }

    // 验证地址格式
    if (!validateAddress(_address, Number(currencyData?.token?.chainId))) {
      toast.show(t('tips.error.withdraw.address.invalid'));
      return;
    }
    setIsSubmit(false);
    setIsLoading(true);
    try {
      await onWithdraw(
        {
          platform: currencyData?.token?.platform,
          chainId: Number(currencyData?.token?.chainId),
          tokenContractAddress: currencyData?.token?.address,
          amount: Number(inputValue),
          message: inputValue,
          transactionCategory: 'WITHDRAW',
          transactionType: 'WITHDRAW',
          senderMemberId: userInfo?.customMetadata?.id,
          receiverAddress: _address,
        },
        (data) => {
          setIsLoading(false);
          push('/home/success?type=withdraw&id=' + data?.id);
        },
      );
    } catch (error) {
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
      <AppHeader2 title={t('screen.home.withdraw')} fallbackUrl="/" />
      <YStack pl={appScale(24)} pr={appScale(24)} onPress={handlePagePress} flex={1}>
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

        <XStack ai="center" pl={appScale(24)} pr={appScale(24)} mb={appScale(34)}>
          <XStack h={2} flex={1} bc={'rgba(238, 238, 238, 1)'}></XStack>
          <SizableText fontSize={'$3'} color={'#9E9E9E'} ml={'$4'} mr={'$4'}>
            {t('home.deposit.or')}
          </SizableText>
          <XStack h={2} flex={1} bc={'rgba(238, 238, 238, 1)'}></XStack>
        </XStack>
        <YStack w="100%" mb={appScale(24)}>
          <XStack mb={appScale(8)} w="100%">
            <SizableText h={appScale(30)} lh={appScale(30)} fontSize={'$5'} color={'#212121'} fontWeight={'600'}>
              {t('home.withdraw.address')}
            </SizableText>
          </XStack>
          <Input
            w="100%"
            p={appScale(16)}
            bc={'#FAFAFA'}
            br={appScale(8)}
            fontSize={'$5'}
            h={appScale(50)}
            lh={appScale(50)}
            value={withdrawAddress}
            onChangeText={setWithdrawAddress}
            borderColor={'#FAFAFA'}
            placeholder={t('home.withdraw.address.tips')}
          />
        </YStack>
        <XStack mb={appScale(24)} w="100%" ai={'center'} jc={'center'}>
          <SizableText h={appScale(24)} lh={appScale(24)} fontSize={'$4'} color={'#212121'} fontWeight={'500'}>{`${t(
            'home.balance',
          )}: ${currencyData?.tokenAmount} ${currencyData?.token?.tokenSymbol} (${
            currencyData?.chainName
          })`}</SizableText>
        </XStack>

        {/* <XStack mb={appScale(34)} w="100%" ai={'center'} jc={'center'}>
          <AppButton isLoading={buttonLoading} onPress={submit}>
            {t('home.withdraw')}
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
            submit(withdrawAddress);
            // setDeclineRequestVisible(true);
          }}
          // disabled={isLoading}
          pressStyle={{
            opacity: 0.85,
          }}
          unstyled
        >
          {t('home.withdraw')}
        </Button>
        <AppButton
          style={{
            width: '50%',
          }}
          isLoading={buttonLoading}
          onPress={() => {
            if (!inputValue || inputValue === '0') {
              toast.show(t('home.send.amountToSend.tips'));
              return;
            }

            if (Number(inputValue) > Number(currencyData?.tokenAmount)) {
              toast.show(t('home.withdraw.tips'));
              return;
            }
            setIsShow(true);
          }}
        >
          {t('home.withdraw.button2')}
        </AppButton>
      </XStack>
      <ConnectorsPopup
        setIsSubmit={setIsSubmit}
        chainId={currencyData?.token?.chainId}
        modalVisible={isShow}
        setModalVisible={setIsShow}
      />
      {showKeyboard && <Keyboard onChange={setInputValue} value={inputValue} />}
      {isLoading && <AppLoading />}
    </PermissionPage>
  );
};
export default WithdrawScreen;
