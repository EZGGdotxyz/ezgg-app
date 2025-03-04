/*
 * @Date: 2023-12-08 16:25:15
 * @LastEditors: yosan
 * @LastEditTime: 2025-03-04 21:28:23
 * @FilePath: /ezgg-app/packages/app/pages/home/deposit/components/DepositButton/index.tsx
 */
import {AppImage, Button, Text, XStack, SizableText, useToastController} from '@my/ui';
import {useRematchModel} from 'app/store/model';
import {useRouter} from 'solito/router';
import {useEffect, useState} from 'react';
import {appScale, convertAmountToTokenDecimals} from 'app/utils';
import {useTranslation} from 'react-i18next';
import {AppName, PrimaryColor} from 'app/config';
import {
  useAccount,
  useChainId,
  useDisconnect,
  useSendTransaction,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi';
import {useWallets} from '@privy-io/react-auth';
import AppButton from 'app/Components/AppButton';
import {erc20Abi, type Hex, parseEther, parseUnits} from 'viem';
import {useReadContract} from 'wagmi';
import useRequest from 'app/hooks/useRequest';
import {
  postTransactionHistoryCreateTransactionHistory,
  postTransactionHistoryUpdateTransactionHash,
} from 'app/servers/api/transactionHistory';

// USDT 合约 ABI
const USDT_ABI = [
  {
    name: 'transfer',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [
      {name: 'recipient', type: 'address'},
      {name: 'amount', type: 'uint256'},
    ],
    outputs: [{name: '', type: 'bool'}],
  },
  {
    name: 'balanceOf',
    type: 'function',
    stateMutability: 'view',
    inputs: [{name: 'account', type: 'address'}],
    outputs: [{name: '', type: 'uint256'}],
  },
] as const;

// USDT 合约地址
const USDT_ADDRESS = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913' as const;

// 链 ID 配置
const CHAIN_IDS = {
  BASE: 8453,
  BASE_GOERLI: 84531,
  OPTIMISM: 10,
  OPTIMISM_GOERLI: 420,
  ARBITRUM: 42161,
  ARBITRUM_GOERLI: 421613,
  POLYGON: 137,
  POLYGON_MUMBAI: 80001,
  BSC: 56,
  BSC_TESTNET: 97,
  ETHEREUM: 1,
  GOERLI: 5,
  SEPOLIA: 11155111,
} as const;

// TokenBalance 组件
const TokenBalance = ({tokenAddress, userAddress}) => {
  const {
    data: balance,
    isLoading,
    error,
  } = useReadContract({
    address: USDT_ADDRESS,
    abi: USDT_ABI,
    functionName: 'balanceOf',
    args: [userAddress],
  });

  if (isLoading) return '...';
  if (error) return <div>0</div>;

  return <div>余额: {balance?.toString() || '0'}</div>;
};

 // 接收地址
const recipient = '0x902765D3796F1BF0C18fB864eeedb4f17779f877' as const;

export type DepositButtonProps = {
  setIsLoading: (isLoading: boolean) => void;
  isLogin: boolean;
  inputValue: string;
  currencyData: any;
  setIsShow: (isShow: boolean) => void;
};

// 首页 头部
const DepositButton: React.FC<any> = ({setIsLoading, inputValue, currencyData, setIsShow}: DepositButtonProps) => {
  const [{unread}] = useRematchModel('app');
  const {push} = useRouter();
  const [statusBarHeight, setStatusBarHeight] = useState(46);
  const {t, i18n} = useTranslation();
  const toast = useToastController();
  const {address, isConnected} = useAccount();
  const chainId = useChainId();
  const [buttonLoading, setButtonLoading] = useState(false);
  const [{userInfo}] = useRematchModel('user');
  const {makeRequest} = useRequest();

  // USDT 转账合约调用
  const {writeContract, data: hash} = useWriteContract();

  // 监听交易状态
  const {isLoading: isConfirming, isSuccess: isConfirmed} = useWaitForTransactionReceipt({
    hash,
  });
  const [transaction, setTransaction] = useState<any>(null);

  useEffect(() => {
    if (isConfirmed) {
      handleSubmit();
      // push('/home/success?type=deposit');
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

  const submit = async () => {
    if (!inputValue || inputValue === '0') {
      toast.show(t('home.send.amountToSend.tips'));
      return;
    }
    if (Number(inputValue) > Number(currencyData?.tokenAmount)) {
      toast.show(t('home.send.amountToSend.tips2'));
      return;
    }

    try {
      if (!isConnected) {
        setIsShow(true);
        return;
      }

      // 将输入金额转换为 USDT 的最小单位（6位小数）

      const params: any = {
        platform: currencyData?.token?.platform,
        chainId: Number(currencyData?.token?.chainId),
        tokenContractAddress: currencyData?.token?.address,
        amount: Number(inputValue),
        message: inputValue,
        transactionCategory: 'DEPOSIT',
        transactionType: 'DEPOSIT',
        receiverMemberId: userInfo?.customMetadata?.id,
      };

      setIsLoading(true);
      setButtonLoading(true);
      const transaction: any = await makeRequest(postTransactionHistoryCreateTransactionHistory(params));

      if (transaction?.data?.id) {
        const amount = BigInt(transaction?.data?.amount);
        setTransaction(transaction?.data);
        // 调用 USDT 转账，指定链 ID
        await writeContract({
          address: currencyData?.token?.address,
          abi: erc20Abi,
          functionName: 'transfer',
          args: [recipient, BigInt(amount)],
          chainId: Number(currencyData?.token?.chainId), // 这里设置你想要使用的链 ID
        });
      }
    } catch (error) {
      setIsLoading(false);
      console.error('Transaction error:', error);
      toast.show(t('home.send.transactionError'));
    } finally {
      setButtonLoading(false);
    }
  };

  return (
    <AppButton isLoading={buttonLoading} onPress={submit}>
      {t('home.deposit')}
    </AppButton>
  );
};

export default DepositButton;
