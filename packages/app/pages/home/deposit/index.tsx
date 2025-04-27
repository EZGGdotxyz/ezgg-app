/*
 * @Date: 2023-12-18 14:37:38
 * @LastEditors: yosan
 * @LastEditTime: 2025-04-27 10:14:09
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
import React, {useEffect, useState, useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import PermissionPage from 'app/Components/PermissionPage';
import Keyboard from 'app/Components/Keyboard';
import {
  convertAmountToTokenDecimals,
  formatCurrencyAmount,
  formatNumber,
  formatTokenAmount,
  getCurrency,
  truncateAddress,
} from 'app/utils';
import AppHeader2 from 'app/Components/AppHeader2';
import {useRouter} from 'solito/router';
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
  useReadContract,
  useSwitchChain,
  useChainId,
} from 'wagmi';
import useRequest from 'app/hooks/useRequest';
import {postTransactionHistoryUpdateTransactionHash} from 'app/servers/api/transactionHistory';
import {useTransaction} from 'app/hooks/useTransaction';
import AppButton from 'app/Components/AppButton';
import {useContractRead} from 'wagmi';
import useResponse from 'app/hooks/useResponse';
import Connectors from 'app/Components/Connectors';
import Currency from './components/Currency';
import Chain from './components/Chain';
import Transfer from './components/Transfer';

// 类型声明
declare global {
  interface Window {
    ethereum?: {
      request: (args: {method: string; params?: any[]}) => Promise<any>;
    };
  }
}

// 存款
const DepositScreen = () => {
  const {t} = useTranslation();
  const [{userInfo}] = useRematchModel('user');
  const {makeRequest} = useRequest();
  const {onDeposit} = useTransaction();
  const {appScale} = useResponse();
  const {back, push} = useRouter();
  const toast = useToastController();

  const [selectedType, setSelectedType] = useState({
    chainId: '',
    chainName: '',
    chainIcon: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [currencyData, setCurrencyData] = useState<any>();

  console.log('🚀 ~ DepositScreen ~ currencyData:', currencyData);


  const [switchOn, setSwitchOn] = useState(false);

  const handlePagePress = () => {
    setShowKeyboard(false);
  };

  const handleInputPress = (e: any) => {
    e.stopPropagation();
    setShowKeyboard(true);
  };
  const chainId = useChainId(); // 直接获取当前连接的链 ID

  console.log('🚀 ~ DepositScreen ~ chainId:', chainId);

  const {address, isConnected} = useAccount();

  const {switchChain} = useSwitchChain();

  const {data: balance, refetch: refetchBalance} = useReadContract({
    address: currencyData?.token?.address as `0x${string}`,
    abi: erc20Abi,
    functionName: 'balanceOf',
    args: [address as `0x${string}`],
    query: {
      enabled: !!address && !!currencyData?.token?.address,
    },
    chainId: Number(currencyData?.token?.chainId),
  });

  // Add chain switching effect
  useEffect(() => {
    const handleChainSwitch = async () => {
      if (!currencyData?.token?.chainId || !chainId) return;

      const targetChainId = Number(currencyData.token.chainId);
      if (chainId !== targetChainId) {
        try {
          console.log(`Switching chain from ${chainId} to ${targetChainId}`);
          await switchChain({chainId: targetChainId});
          // Wait for chain switch to complete
          await new Promise(resolve => setTimeout(resolve, 1000));
        } catch (error) {
          console.error('Failed to switch chain:', error);
          toast.show(t('tips.error.deposit.switchChainFailed'));
        }
      }
    };

    handleChainSwitch();
  }, [currencyData?.token?.chainId, chainId, switchChain, toast, t]);

  // 执行存款操作
  const onDepositSubmit = async () => {
    try {
      setIsLoading(true);

      // Ensure we're on the correct chain before proceeding
      const targetChainId = Number(currencyData?.token?.chainId);
      if (chainId !== targetChainId) {
        try {
          console.log(`Switching chain from ${chainId} to ${targetChainId} before deposit`);
          await switchChain({chainId: targetChainId});
          // Wait for chain switch to complete
          await new Promise(resolve => setTimeout(resolve, 1000));
        } catch (error) {
          console.error('Failed to switch chain before deposit:', error);
          toast.show(t('tips.error.deposit.switchChainFailed'));
          setIsLoading(false);
          return;
        }
      }

      console.log('开始执行存款操作');
      // 创建交易记录
      const _amount = Number(convertAmountToTokenDecimals(inputValue, currencyData?.token?.tokenDecimals));

      console.log('存款参数:', {
        platform: currencyData?.token?.platform,
        chainId: targetChainId,
        tokenAddress: currencyData?.token?.address,
        tokenSymbol: currencyData?.token?.symbol,
        amount: _amount,
        recipient: userInfo?.smartWallet?.address,
        decimals: currencyData?.token?.tokenDecimals,
      });

      await onDeposit(
        {
          platform: currencyData?.token?.platform,
          chainId: targetChainId,
          tokenContractAddress: currencyData?.token?.address,
          amount: _amount,
          message: inputValue,
          transactionCategory: 'DEPOSIT',
          transactionType: 'DEPOSIT',
          receiverMemberId: userInfo?.customMetadata?.id,
          senderWalletAddress: address,
        },
        async (data) => {
          setTransaction(data);
          console.log('交易记录已创建:', data?.id);

          try {
            console.log('🚀 ~ currencyData:', currencyData);
            console.log('准备调用转账合约');

            // 调用 USDT 转账，指定链 ID
            writeContract({
              address: currencyData?.token?.address as `0x${string}`,
              abi: erc20Abi,
              functionName: 'transfer',
              args: [userInfo?.smartWallet?.address as `0x${string}`, BigInt(_amount)],
              chainId: targetChainId,
            });
          } catch (error: any) {
            setIsLoading(false);
            console.error('合约调用出现同步错误:', error);
            toast.show(t('tips.error.deposit.failed'));
          }
        },
      );
    } catch (error) {
      setIsLoading(false);
      console.error('存款流程错误:', error);
      toast.show(t('tips.error.deposit.failed'));
    }
  };

  // 处理钱包连接成功后的逻辑
  const handleWalletConnected = useCallback(async () => {
    try {
      console.log('开始处理钱包连接后的逻辑');
      setIsLoading(true);

      if (!address || !currencyData?.token?.address) {
        console.error('钱包地址或代币地址不存在');
        throw new Error('wallet_not_ready');
      }

      console.log('钱包已连接，准备检查余额:', {
        address,
        token: currencyData?.token?.address,
        amount: inputValue,
      });

      // 刷新余额
      const result = await refetchBalance();
      console.log('余额刷新结果:', result);

      // 正确处理余额为0的情况，result.data可能是BigInt(0)，布尔判断会认为是假值
      if (result.data !== undefined) {
        // 手动检查余额
        const _tokenBalance = formatTokenAmount(result.data.toString(), currencyData?.token?.tokenDecimals);
        const inputAmount = Number(inputValue);
        console.log('🚀 ~ handleWalletConnected ~ inputAmount:', inputAmount);
        const currentBalance = Number(_tokenBalance);
        console.log('🚀 ~ handleWalletConnected ~ currentBalance:', currentBalance);

        console.log('余额检查结果:', {
          inputAmount,
          currentBalance,
          token: currencyData?.token?.symbol,
          balanceRaw: result.data.toString(),
        });

        // 检查输入是否为有效数字
        if (isNaN(inputAmount) || inputAmount <= 0) {
          toast.show(t('tips.error.deposit.amountRequired'));
          setIsLoading(false);
          return;
        }

        // 检查余额是否足够
        if (inputAmount > currentBalance) {
          console.log('余额不足');
          toast.show(
            t('tips.error.deposit.insufficientFunds', {
              token: currencyData?.token?.symbol,
              chain: currencyData?.chainName,
            }),
            {
              duration: 3000,
            },
          );
          setIsLoading(false);
          return;
        }

        // 余额充足，直接执行存款操作
        console.log('余额充足，执行存款');
        onDepositSubmit();
      } else {
        throw new Error('fetch_balance_failed');
      }
    } catch (error) {
      console.error('钱包连接后处理失败:', error);
      if (error?.message?.includes('fetch_balance_failed')) {
        toast.show(t('tips.error.deposit.insufficientFunds'), {
          duration: 3000,
        });
      } else {
        toast.show(t('tips.error.deposit.connectionFailed'), {
          duration: 3000,
        });
      }
      setIsLoading(false);
    }
  }, [address, currencyData, inputValue, refetchBalance, onDepositSubmit, t]);

  // USDT 转账合约调用
  const {
    writeContract,
    data: hash,
    status: writeStatus,
    error: writeError,
  } = useWriteContract({
    mutation: {
      onError: (error) => {
        console.error('合约写入错误:', error);
        setIsLoading(false);
        // 分析错误类型并提供相应的用户反馈
        if (
          error?.message?.includes('user rejected') ||
          error?.code === 4001 ||
          error?.message?.includes('User rejected the request.')
        ) {
          toast.show(t('tips.error.deposit.userRejected'));
        } else {
          toast.show(t('tips.error.deposit.failed'));
        }
      },
      onSuccess: (data) => {
        console.log('合约写入成功，交易哈希:', data);
      },
    },
  });

  // 监听交易状态
  const {
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

  // 处理用户点击存款按钮
  const handleDepositClick = () => {
    if (!inputValue || Number(inputValue) <= 0) {
      toast.show(t('tips.error.deposit.amountRequired'));
      return;
    }
    handleWalletConnected();
  };

  // 监听写入合约状态变化
  useEffect(() => {
    if (writeStatus === 'error' && writeError) {
      console.error('合约写入状态错误:', writeError);
      setIsLoading(false);
    }

    if (writeStatus === 'pending') {
      console.log('合约写入等待中...');
    }

    if (writeStatus === 'success' && hash) {
      console.log('合约写入已提交，哈希:', hash);
    }
  }, [writeStatus, writeError, hash]);

  return (
    <PermissionPage>
      <AppHeader2 title={t('screen.home.deposit')} fallbackUrl="/" />
      <XStack w={'100%'} bc="$background" flexShrink={0} pt={appScale(12)} pb={appScale(12)} ai="center" jc="center">
        <XStack
          position="relative"
          width={appScale(326)}
          height={appScale(56)}
          br={appScale(28)}
          bc={'#EBEFF1'}
          onPress={() => setSwitchOn(!switchOn)}
        >
          <XStack
            animation="quick"
            position="absolute"
            top={appScale(4)}
            width={appScale(158)}
            height={appScale(48)}
            br={appScale(24)}
            bc="#FFFFFF"
            x={switchOn ? appScale(164) : appScale(4)}
          />
          <XStack top={0} position="absolute" w={'100%'} h={'100%'}>
            <SizableText
              w={'50%'}
              ta={'center'}
              col={!switchOn ? '$color' : '$color11'}
              fontSize={'$4'}
              fow={'500'}
              height={appScale(56)}
              lh={appScale(56)}
            >
              {t('home.deposit.connectWallet')}
            </SizableText>
            <SizableText
              w={'50%'}
              height={appScale(56)}
              lh={appScale(56)}
              ta={'center'}
              col={switchOn ? '$color' : '$color11'}
              fow={'500'}
              fontSize={'$4'}
            >
              {t('home.deposit.transfer')}
            </SizableText>
          </XStack>
        </XStack>
      </XStack>
      <ScrollView
        flex={1}
        w={'100%'}
        bc="#fff"
        contentContainerStyle={{
          minHeight: '100%',
        }}
      >
        {!switchOn && (
          <>
            <YStack pl={appScale(24)} pr={appScale(24)} onPress={handlePagePress}>
              <Connectors setIsLoading={setIsLoading} currencyData={currencyData} />

              <Chain isConnected={isConnected} selectedType={selectedType} setSelectedType={setSelectedType} />
              <Currency
                address={address}
                selectedType={selectedType}
                isConnected={isConnected && selectedType?.chainId !== ''}
                currencyData={currencyData}
                setCurrencyData={setCurrencyData}
              />
              <XStack mb={appScale(24)} minHeight={appScale(24)} w="100%" ai={'center'} jc={'center'}>
                <SizableText lh={appScale(24)} ta="center" fontSize={'$4'} color={'#212121'} fontWeight={'500'}>
                  {currencyData?.token?.tokenSymbol
                    ? `${t('home.deposit.balance', {
                        token: currencyData?.token?.tokenSymbol,
                      })}`
                    : ''}
                  {currencyData?.token?.tokenSymbol
                    ? `: ${
                        balance ? formatTokenAmount(balance.toString(), currencyData?.token?.tokenDecimals) : '0.00'
                      } ${currencyData?.token?.tokenSymbol} (${
                        getCurrency(currencyData?.currency)?.symbol
                      } ${formatCurrencyAmount(
                        currencyData?.token?.tokenSymbol,
                        formatTokenAmount(balance ? balance?.toString() : 0, currencyData?.token?.tokenDecimals),
                        currencyData?.currencyAmount,
                        getCurrency(currencyData?.currency)?.label,
                      )})`
                    : ''}
                </SizableText>
              </XStack>
              <YStack w="100%" mb={appScale(24)}>
                <XStack mb={appScale(8)} w="100%">
                  <SizableText h={appScale(30)} lh={appScale(30)} fontSize={'$3'} color={'#212121'} fontWeight={'500'}>
                    {t('home.deposit.amountToDeposit')}
                  </SizableText>
                </XStack>
                <XStack
                  w="100%"
                  paddingVertical={appScale(16)}
                  paddingHorizontal={appScale(16)}
                  bc={'#FAFAFA'}
                  br={appScale(8)}
                  onPress={handleInputPress}
                >
                  <SizableText
                    fontSize={'$8'}
                    h={appScale(32)}
                    lh={appScale(32)}
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

              <XStack mb={appScale(34)} w="100%" ai={'center'} jc={'center'}>
                <AppButton onPress={handleDepositClick}>{t('home.deposit')}</AppButton>
              </XStack>
            </YStack>
            {showKeyboard && <Keyboard onChange={setInputValue} value={inputValue} />}
          </>
        )}
        {switchOn && (
          <Transfer currencyData={currencyData} selectedType={selectedType} setSelectedType={setSelectedType} />
        )}
      </ScrollView>
      {isLoading && <AppLoading />}
    </PermissionPage>
  );
};
export default DepositScreen;
