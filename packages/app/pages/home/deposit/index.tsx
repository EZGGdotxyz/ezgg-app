/*
 * @Date: 2023-12-18 14:37:38
 * @LastEditors: yosan
 * @LastEditTime: 2025-03-18 17:19:59
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
import {convertAmountToTokenDecimals, formatTokenAmount, truncateAddress} from 'app/utils';
import AppHeader2 from 'app/Components/AppHeader2';
import {useRouter} from 'solito/router';
import AppLoading from 'app/Components/AppLoading';
import DepositButton from './components/DepositButton';
import {useFundWallet} from '@privy-io/react-auth';
import {useRematchModel} from 'app/store/model';
import CopyButton from 'app/Components/CopyButton';
import {erc20Abi, type Hex, parseEther, parseUnits} from 'viem';
import {useAccount, useWaitForTransactionReceipt, useWriteContract, useReadContract} from 'wagmi';
import useRequest from 'app/hooks/useRequest';
import {postTransactionHistoryUpdateTransactionHash} from 'app/servers/api/transactionHistory';
import {useTransaction} from 'app/hooks/useTransaction';
import AppButton from 'app/Components/AppButton';
import {useContractRead} from 'wagmi';
import useResponse from 'app/hooks/useResponse';
import Connectors from 'app/Components/Connectors';
import Currency from './components/Currency';
import Chain from './components/Chain';

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

  const handlePagePress = () => {
    setShowKeyboard(false);
  };

  const handleInputPress = (e: any) => {
    e.stopPropagation();
    setShowKeyboard(true);
  };
  const {address, chain, isConnected} = useAccount();

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

  // 执行存款操作
  const onDepositSubmit = async () => {
    try {
      setIsLoading(true);

      console.log('开始执行存款操作');
      // 创建交易记录
      const _amount = Number(convertAmountToTokenDecimals(inputValue, currencyData?.token?.tokenDecimals));

      console.log('存款参数:', {
        platform: currencyData?.token?.platform,
        chainId: Number(currencyData?.token?.chainId),
        tokenAddress: currencyData?.token?.address,
        tokenSymbol: currencyData?.token?.symbol,
        amount: _amount,
        recipient: userInfo?.smartWallet?.address,
        decimals: currencyData?.token?.tokenDecimals,
      });

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
              chainId: Number(currencyData?.token?.chainId),
            });
          } catch (error: any) {
            // 这里的 try-catch 不会捕获 writeContract 的异步错误
            // 异步错误会被上面的 onError 回调捕获
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

      // 检查当前链ID是否匹配
      const targetChainId = Number(currencyData?.token?.chainId);
      if (chain?.id !== targetChainId) {
        console.log('需要切换链:', {current: chain?.id, target: targetChainId});
        try {
          await window.ethereum?.request({
            method: 'wallet_switchEthereumChain',
            params: [{chainId: `0x${targetChainId.toString(16)}`}],
          });
        } catch (switchError: any) {
          console.error('切换链失败:', switchError);
          if (switchError?.code === 4902) {
            toast.show(t('tips.error.deposit.chainNotSupported'));
          } else {
            toast.show(t('tips.error.deposit.chainSwitchFailed'));
          }
          setIsLoading(false);
          return;
        }
      }

      console.log('钱包已连接，准备检查余额:', {
        address,
        token: currencyData?.token?.address,
        amount: inputValue,
      });
      // onDepositSubmit();

      // 刷新余额
      const result = await refetchBalance();
      console.log('余额刷新结果:', result);

      // 正确处理余额为0的情况，result.data可能是BigInt(0)，布尔判断会认为是假值
      if (result.data !== undefined) {
        // 手动检查余额
        const _tokenBalance = formatTokenAmount(result.data.toString(), currencyData?.token?.tokenDecimals);
        const inputAmount = Number(inputValue);
        const currentBalance = Number(_tokenBalance);

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
          <Connectors setIsLoading={setIsLoading} currencyData={currencyData} />

          <Chain isConnected={isConnected} selectedType={selectedType} setSelectedType={setSelectedType} />
          <Currency isConnected={isConnected} currencyData={currencyData} setCurrencyData={setCurrencyData} />

          <YStack w="100%" mb={appScale(24)}>
            <XStack mb={appScale(8)} w="100%">
              <SizableText h={appScale(30)} lh={appScale(30)} fontSize={'$3'} color={'#212121'} fontWeight={'500'}>
                {t('home.deposit.amountToDeposit')}
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
            {balance && (
              <SizableText
                h={appScale(24)}
                lh={appScale(24)}
                fontSize={'$4'}
                color={'#212121'}
                fontWeight={'500'}
              >{`${t('home.deposit.balance')}: ${balance} ${currencyData?.token?.tokenSymbol} (${
                currencyData?.chainName
              })`}</SizableText>
            )}
          </XStack>

          <XStack mb={appScale(34)} w="100%" ai={'center'} jc={'center'}>
            <AppButton onPress={handleDepositClick}>{t('home.deposit')}</AppButton>
          </XStack>
          {!showKeyboard && (
            <YStack pb={appScale(134)}>
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
            </YStack>
          )}
        </YStack>
        {showKeyboard && <Keyboard onChange={setInputValue} value={inputValue} />}
      </ScrollView>
      {isLoading && <AppLoading />}
    </PermissionPage>
  );
};
export default DepositScreen;
