/*
 * @Date: 2023-12-08 16:25:15
 * @LastEditors: yosan
 * @LastEditTime: 2025-03-06 15:47:32
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
import {useTransaction} from 'app/hooks/useTransaction';

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
  const {onDeposit} = useTransaction();
  const {disconnect} = useDisconnect();

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

  const onDepositSubmit = async () => {
    if (!inputValue || inputValue === '0') {
      toast.show(t('home.send.amountToSend.tips'));
      return;
    }

    return setIsShow(true);

    try {
      if (!isConnected) {
        setIsShow(true);
        return;
      }

      setIsLoading(true);
      setButtonLoading(true);
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
          const amount = BigInt(data.amount);
          // 调用 USDT 转账，指定链 ID
          await writeContract({
            address: currencyData?.token?.address,
            abi: erc20Abi,
            functionName: 'transfer',
            args: [recipient, amount],
            chainId: Number(currencyData?.token?.chainId), // 这里设置你想要使用的链 ID
          });
          // const tokenContractAddress = data.tokenContractAddress;
          // const bizContractAddress = transaction.bizContractAddress;

          // setIsLoading(false);
          // push('/home/success?type=deposit&id=' + data?.id);
        },
      );
    } catch (error) {
      setIsLoading(false);
      console.error('Transaction error:', error);
      toast.show(t('home.send.transactionError'));
    } finally {
      setButtonLoading(false);
    }
  };

  return (
    <AppButton isLoading={buttonLoading} onPress={onDepositSubmit}>
      {t('home.deposit')}
    </AppButton>
  );
};

export default DepositButton;
