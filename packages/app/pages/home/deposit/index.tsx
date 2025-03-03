/*
 * @Date: 2023-12-18 14:37:38
 * @LastEditors: yosan
 * @LastEditTime: 2025-03-03 21:11:21
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
import AppButton from 'app/Components/AppButton';
import {StyleSheet} from 'react-native';
import {appScale} from 'app/utils';
import AppHeader2 from 'app/Components/AppHeader2';
import {useRouter} from 'solito/router';
import Currency from 'app/Components/Currency';
import PageLoading from 'app/Components/PageLoading';
import ConnectorsPopup from 'app/Components/ConnectorsPopup';
import {
  useAccount,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
  useChainId,
  useSendTransaction,
  useWaitForTransactionReceipt,
  useReadContract,
} from 'wagmi';
import {useWallets} from '@privy-io/react-auth';
import {type Hex, parseEther} from 'viem';
import AppLoading from 'app/Components/AppLoading';

// TokenBalance 组件
const TokenBalance = ({tokenAddress, userAddress}) => {
  const {
    data: balance,
    isLoading,
    error,
  } = useReadContract({
    address: '0x833589fcd6edb6e08f4c7c32d4f71b54bda02913',
    abi: [
      {
        type: 'function',
        name: 'balanceOf',
        stateMutability: 'view',
        inputs: [{name: 'account', type: 'address'}],
        outputs: [{type: 'uint256'}],
      },
      {
        type: 'function',
        name: 'totalSupply',
        stateMutability: 'view',
        inputs: [],
        outputs: [{name: 'supply', type: 'uint256'}],
      },
    ],
    functionName: 'balanceOf',
    args: [userAddress],
  });

  if (isLoading) return '...';
  if (error) return <div>0</div>;

  return <div>余额: {balance !== undefined ? balance.toString() : '0'}</div>;
};

const depositToken = '0x52435264BFDB';

// 存款
const DepositScreen = () => {
  const {t} = useTranslation();
  const [inputValue, setInputValue] = React.useState('');
  const [showKeyboard, setShowKeyboard] = React.useState(false);
  const [currencyData, setCurrencyData] = React.useState<any>();

  const [isLoading, setIsLoading] = React.useState(false);
  const [buttonLoading, setButtonLoading] = React.useState(false);
  const {back, push} = useRouter();
  const toast = useToastController();

  const [isShow, setIsShow] = React.useState(false);

  const {address, isConnected} = useAccount();

  console.log('🚀 ~ DepositScreen ~ isConnected:', isConnected);

  console.log('🚀 ~ DepositScreen ~ address:', address);

  const {disconnect} = useDisconnect();

  const chainId = useChainId();

  const {wallets} = useWallets();

  const {data: hash, error: sendTransactionError, isPending, sendTransaction} = useSendTransaction();

  console.log('🚀 ~ DepositScreen ~ isPending:', isPending);

  console.log('🚀 ~ DepositScreen ~ error:', sendTransactionError);

  console.log('🚀 ~ DepositScreen ~ hash:', hash);

  async function submit2() {
    const to = '0xDCBE0c047D539c6a077161c59239Bff20540fa92';
    const value = '1';
    sendTransaction({to, value: parseEther(value)});
  }

  const {isLoading: isConfirming, isSuccess: isConfirmed} = useWaitForTransactionReceipt({
    hash,
  });

  // const testTr = async () => {
  //   const wallet = wallets[1];
  //   const provider = await wallet.getEthereumProvider();
  //   const transactionRequest = {
  //     to: '0xDCBE0c047D539c6a077161c59239Bff20540fa92',
  //     value: 100000,
  //   };
  //   const transactionHash = await provider.request({
  //     method: 'eth_sendTransaction',
  //     params: [transactionRequest],
  //   });

  //   console.log('🚀 ~ testTr ~ transactionHash:', transactionHash);
  // };

  const submit = () => {
    // submit2();
    // testTr();
    // if (!isConnected) {
    //   setIsShow(true);
    // } else {
    //   setIsShow(false);
    // }

    console.log('🚀 ~ submit ~ Number(currencyData?.tokenAmount):', Number(currencyData?.tokenAmount));

    console.log('🚀 ~ submit ~ Number(inputValue):', Number(inputValue));

    if (!inputValue || inputValue === '0') {
      toast.show(t('home.send.amountToSend.tips'));
      return;
    }
    if (Number(inputValue) > Number(currencyData?.tokenAmount)) {
      toast.show(t('home.send.amountToSend.tips2'));
      return;
    }

    // setButtonLoading(true);
    // setTimeout(() => {
    //   setButtonLoading(false);
    //   push('/home/success?type=deposit');
    // }, 2000);
    console.log('🚀 ~ DepositScreen ~ inputValue:', inputValue);
  };

  const handlePagePress = () => {
    setShowKeyboard(false);
  };

  const handleInputPress = (e: any) => {
    e.stopPropagation();
    setShowKeyboard(true);
  };

  const updateCurrency = (data) => {
    // setIsLoading(true);
    // setTimeout(() => {
    //   setCurrencyData(data);
    //   setIsLoading(false);
    // }, 1000);
    setCurrencyData(data);
  };

  return (
    <PermissionPage>
      <AppHeader2 title={t('screen.home.deposit')} fallbackUrl="/" />
      <TokenBalance tokenAddress="0x833589fcd6edb6e08f4c7c32d4f71b54bda02913" userAddress={address} />
      <YStack pl={appScale(24)} pr={appScale(24)} onPress={handlePagePress}>
        <Currency currencyData={currencyData} setCurrencyData={setCurrencyData} />
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
          )}: ${currencyData?.tokenAmount} ${currencyData?.tokenSymbol} (${currencyData?.chainName})`}</SizableText>
        </XStack>

        <XStack mb={appScale(34)} w="100%" ai={'center'} jc={'center'}>
          <AppButton isLoading={buttonLoading} onPress={submit}>
            {t('home.deposit')}
          </AppButton>
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
