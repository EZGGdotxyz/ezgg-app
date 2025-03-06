/*
 * @Date: 2023-12-18 14:37:38
 * @LastEditors: yosan
 * @LastEditTime: 2025-03-06 16:45:21
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
  Button,
} from '@my/ui';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import PermissionPage from 'app/Components/PermissionPage';
import Keyboard from 'app/Components/Keyboard';
import {appScale, convertAmountToTokenDecimals, formatTokenAmount, truncateAddress} from 'app/utils';
import AppHeader2 from 'app/Components/AppHeader2';
import {useRouter} from 'solito/router';
import Currency from 'app/Components/Currency';
import ConnectorsPopup from 'app/Components/ConnectorsPopup';
import AppLoading from 'app/Components/AppLoading';
import DepositButton from './components/DepositButton';
import {useFundWallet} from '@privy-io/react-auth';
import {useRematchModel} from 'app/store/model';
import CopyButton from 'app/Components/CopyButton';
import {erc20Abi, type Hex, parseEther, parseUnits} from 'viem';
import {
  useAccount,
  useChainId,
  useDisconnect,
  useReadContract,
  useSendTransaction,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi';
import useRequest from 'app/hooks/useRequest';
import {postTransactionHistoryUpdateTransactionHash} from 'app/servers/api/transactionHistory';
import {useTransaction} from 'app/hooks/useTransaction';

// 存款
const DepositScreen = () => {
  const {t} = useTranslation();
  const [inputValue, setInputValue] = React.useState('');
  const [showKeyboard, setShowKeyboard] = React.useState(false);
  const [currencyData, setCurrencyData] = React.useState<any>();
  const [{userInfo}] = useRematchModel('user');
  const {makeRequest} = useRequest();
  const {onDeposit} = useTransaction();

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
  const {address} = useAccount();

  const {data: balanceData} = useReadContract({
    address: currencyData?.token?.address as `0x${string}`,
    abi: erc20Abi,
    functionName: 'balanceOf',
    args: [address as `0x${string}`],
  });

  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
    if (balanceData && isSubmit) {
      const _tokenBalance = formatTokenAmount(balanceData + '', currencyData?.token?.tokenDecimals);
      if (Number(inputValue) <= Number(_tokenBalance)) {
        onDepositSubmit();
      } else {
        setIsSubmit(false);
        toast.show(t('tips.error.deposit.insufficientFunds'));
      }
    }
  }, [balanceData, currencyData?.token?.decimals, inputValue, isSubmit]);

  // USDT 转账合约调用
  const {writeContract, data: hash, isError: isWriteContractError} = useWriteContract();

  // 监听交易状态
  const {isSuccess: isConfirmed} = useWaitForTransactionReceipt({
    hash,
  });

  const [transaction, setTransaction] = useState<any>(null);

  useEffect(() => {
    if (isWriteContractError) {
      setIsLoading(false);
      toast.show(t('tips.error.deposit.failed'));
    }
  }, [isWriteContractError]);

  useEffect(() => {
    if (isConfirmed) {
      handleSubmit();
    }
  }, [isConfirmed, transaction]);

  const handleSubmit = async () => {
    // 更新交易记录的交易哈希字段
    const res: any = await makeRequest(
      postTransactionHistoryUpdateTransactionHash({
        id: transaction?.id,
        transactionCode: transaction?.transactionCode,
        transactionHash: hash || '',
      }),
    );
    if (res?.data) {
      setIsLoading(false);
      push('/home/success?type=deposit&id=' + transaction?.id);
    } else {
      setIsLoading(false);
      // setOrderData(transaction?.data);
      // setIsSuccess(true);
      // toast.show(t('tips.error.networkError'), {
      //   duration: 3000,
      //   // message: 'Just showing how toast works...',
      // });
    }
  };

  const onDepositSubmit = async () => {
    try {
      setIsLoading(true);
      // 创建交易记录
      const _amount = Number(convertAmountToTokenDecimals(inputValue, currencyData?.token?.tokenDecimals));

      await onDeposit(
        {
          platform: currencyData?.token?.platform,
          chainId: Number(currencyData?.token?.chainId),
          tokenContractAddress: currencyData?.token?.address,
          amount: _amount,
          message: inputValue,
          transactionCategory: 'DEPOSIT',
          transactionType: 'DEPOSIT',
          receiverMemberId: userInfo?.customMetadata?.id,
        },
        async (data) => {
          setTransaction(data);
          try {
            // 调用 USDT 转账，指定链 ID
            await writeContract({
              address: currencyData?.token?.address,
              abi: erc20Abi,
              functionName: 'transfer',
              args: [userInfo?.smartWallet?.address, BigInt(_amount)],
              chainId: Number(currencyData?.token?.chainId),
            });
          } catch (error: any) {
            console.log('🚀 ~ error:', error);

            setIsLoading(false);
            // 用户取消交易
            if (error?.name === 'UserRejectedRequestError' || error?.code === 4001) {
              toast.show(t('tips.error.deposit.userRejected'));
            } else {
              console.error('Transaction error:', error);
              toast.show(t('tips.error.deposit.failed'));
            }
          }
          console.log('🚀 ~ 123123:');
        },
      );
    } catch (error) {
      setIsLoading(false);
      console.error('Deposit error:', error);
      toast.show(t('tips.error.deposit.failed'));
    }
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
            currencyData?.chainName
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
                  token: currencyData?.token?.tokenSymbol,
                  chain: currencyData?.chainName,
                })}
              </SizableText>
            </XStack>
            <XStack ai="center" jc={'center'} w="100%" mb={appScale(24)}>
              <SizableText ta={'center'} fontSize={'$9'} color={'#212121'} fow="700" mr={'$4'}>
                {truncateAddress(userInfo?.smartWallet?.address)}
              </SizableText>
              <XStack ai={'center'} jc={'center'} ml={appScale(6)}>
                <CopyButton unstyled text={userInfo?.smartWallet?.address}>
                  <AppImage
                    width={appScale(30)}
                    height={appScale(30)}
                    src={require('app/assets/images/copy.png')}
                    type="local"
                  />
                </CopyButton>
              </XStack>
            </XStack>
          </>
        )}
      </YStack>
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
export default DepositScreen;
