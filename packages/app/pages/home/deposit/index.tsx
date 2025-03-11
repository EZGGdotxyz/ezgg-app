/*
 * @Date: 2023-12-18 14:37:38
 * @LastEditors: yosan
 * @LastEditTime: 2025-03-11 15:29:41
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
  ScrollView,
} from '@my/ui';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import PermissionPage from 'app/Components/PermissionPage';
import Keyboard from 'app/Components/Keyboard';
import {convertAmountToTokenDecimals, formatTokenAmount, truncateAddress} from 'app/utils';
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
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi';
import useRequest from 'app/hooks/useRequest';
import {postTransactionHistoryUpdateTransactionHash} from 'app/servers/api/transactionHistory';
import {useTransaction} from 'app/hooks/useTransaction';
import AppButton from 'app/Components/AppButton';
import {useContractRead} from 'wagmi';
import useResponse from 'app/hooks/useResponse';

// 存款
const DepositScreen = () => {
  const {t} = useTranslation();
  const [inputValue, setInputValue] = React.useState('');
  const [showKeyboard, setShowKeyboard] = React.useState(false);
  const [currencyData, setCurrencyData] = React.useState<any>();
  const [{userInfo}] = useRematchModel('user');
  const {makeRequest} = useRequest();
  const {onDeposit} = useTransaction();
  const {appScale} = useResponse();

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

  const {data: balanceData, refetch: refetchBalance} = useContractRead({
    address: currencyData?.token?.address as `0x${string}`,
    abi: erc20Abi,
    functionName: 'balanceOf',
    args: [address as `0x${string}`],
    enabled: !!address && !!currencyData?.token?.address,
    watch: true,
  });

  const [isSubmit, setIsSubmit] = useState(false);

  // 当连接钱包或切换币种时，刷新余额
  useEffect(() => {
    if (address && currencyData?.token?.address) {
      refetchBalance();
    }
  }, [address, currencyData?.token?.address, refetchBalance]);

  // 当提交状态变化时，检查余额并执行存款
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
  }, [balanceData, currencyData?.token?.tokenDecimals, inputValue, isSubmit]);

  // USDT 转账合约调用
  const {writeContract, data: hash} = useWriteContract();

  // 监听交易状态
  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    error,
    isError,
  } = useWaitForTransactionReceipt({
    hash,
  });

  // 处理交易错误
  useEffect(() => {
    if (isError && error) {
      setIsLoading(false);
      console.error('Transaction error:', error);
      toast.show(t('tips.error.deposit.failed'));
    }
  }, [isError, error, toast, t]);

  const [transaction, setTransaction] = useState<any>(null);

  // 处理交易成功
  useEffect(() => {
    if (isConfirmed && transaction) {
      handleSubmit();
    }
  }, [isConfirmed, transaction]);

  // 更新交易哈希
  const handleSubmit = async () => {
    try {
      await postTransactionHistoryUpdateTransactionHash({
        id: transaction?.id,
        transactionHash: hash || '',
      });
      setIsLoading(false);
      push('/home/success?type=DEPOSIT&id=' + transaction?.id);
    } catch (error) {
      console.error('Failed to update transaction hash:', error);
      setIsLoading(false);
      toast.show(t('tips.error.deposit.updateFailed'));
    }
  };

  // 执行存款操作
  const onDepositSubmit = async () => {
    try {
      setIsLoading(true);
      setIsSubmit(false);

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
            setIsLoading(false);
            // 用户取消交易
            if (error?.name === 'UserRejectedRequestError' || error?.code === 4001) {
              toast.show(t('tips.error.deposit.userRejected'));
            } else {
              console.error('Transaction error:', error);
              toast.show(t('tips.error.deposit.failed'));
            }
          }
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
      <ScrollView
        flex={1}
        w={'100%'}
        bc="#fff"
        contentContainerStyle={{
          minHeight: '100%',
        }}
      >
        <YStack pl={appScale(24)} pr={appScale(24)} onPress={handlePagePress}>
          <Currency
            setIsLoading={setIsLoading}
            currencyData={currencyData}
            setCurrencyData={setCurrencyData}
            isRequest={true}
          />
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
          {/* <XStack mb={appScale(24)} mih={appScale(24)} w="100%" ai={'center'} jc={'center'}>
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
          </XStack> */}

          <XStack mb={appScale(34)} w="100%" ai={'center'} jc={'center'}>
            <AppButton
              onPress={() => {
                if (!inputValue || inputValue === '0') {
                  toast.show(t('home.send.amountToSend.tips'));
                  return;
                }
                setIsLoading(true);
                return setIsShow(true);
              }}
            >
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
                <SizableText ta={'center'} fontSize={'$4'} color={'#212121'} fow="600">
                  {t('home.deposit.sendTips', {
                    token: currencyData?.token?.tokenSymbol,
                    chain: currencyData?.chainName,
                  })}
                </SizableText>
              </XStack>
              <XStack ai="center" jc={'center'} w="100%" mb={appScale(24)}>
                <SizableText ta={'center'} fontSize={'$7'} color={'#212121'} fow="700" mr={'$4'}>
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
        {showKeyboard && <Keyboard onChange={setInputValue} value={inputValue} />}
      </ScrollView>
      <ConnectorsPopup
        setIsLoading={setIsLoading}
        setIsSubmit={setIsSubmit}
        chainId={currencyData?.token?.chainId}
        modalVisible={isShow}
        setModalVisible={setIsShow}
      />
      {isLoading && <AppLoading />}
    </PermissionPage>
  );
};
export default DepositScreen;
