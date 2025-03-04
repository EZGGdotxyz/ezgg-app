/*
 * @Date: 2025-03-04 21:47:07
 * @LastEditors: yosan
 * @LastEditTime: 2025-03-04 22:35:23
 * @FilePath: /ezgg-app/packages/app/hooks/useTransaction.ts
 */
import {useTranslation} from 'react-i18next';
import {useToastController} from '@my/ui';
import {useSmartWallets} from '@privy-io/react-auth/smart-wallets';
import {encodeFunctionData, erc20Abi, getAddress} from 'viem';
import {useRematchModel} from 'app/store/model';
import useRequest from 'app/hooks/useRequest';
import {convertAmountToTokenDecimals} from 'app/utils';
import TokenLinkContract from 'app/abi/TokenLink.json';
import TokenTransferContract from 'app/abi/TokenTransfer.json';
import {
  postTransactionHistoryCreateTransactionHistory,
  postTransactionHistoryUpdateTransactionHash,
} from 'app/servers/api/transactionHistory';
import {
  postTransactionPayLinkCreatePayLink,
  postTransactionPayLinkFindPayLink,
  postTransactionPayLinkUpdateTransactionHash,
} from 'app/servers/api/transactionPayLink';

export interface TransactionParams {
  platform: 'ETH' | 'SOLANA';
  chainId: number;
  tokenContractAddress: string;
  amount: number;
  message: string;
  transactionCategory: 'SEND' | 'REQUEST' | 'WITHDRAW' | 'DEPOSIT';
  transactionType: 'SEND' | 'REQUEST' | 'DEPOSIT' | 'WITHDRAW' | 'PAY_LINK' | 'QR_CODE';
  senderMemberId?: number;
  receiverMemberId?: number;
  receiverAddress?: string;
}

export interface TransactionSuccessParams {
  id?: number;
  transactionCode?: string;
  transactionHash: string;
}

export const useTransaction = () => {
  const {t} = useTranslation();
  const toast = useToastController();
  const {getClientForChain} = useSmartWallets();
  const {makeRequest} = useRequest();

  // 处理交易成功后的操作
  const handleTransactionSuccess = async (params: TransactionSuccessParams, onSuccess?: (data: any) => void) => {
    try {
      if (!params.transactionHash) return;

      const res = await makeRequest(
        postTransactionHistoryUpdateTransactionHash({
          id: params?.id || 0,
          transactionHash: params.transactionHash,
        }),
      );

      if (res?.code === '0') {
        onSuccess?.(res?.data || {});
      } else {
        throw new Error('Update transaction hash failed');
      }
    } catch (error) {
      console.error('Handle transaction success error:', error);
      toast.show(t('tips.error.networkError'), {
        duration: 3000,
      });
      throw error;
    }
  };

  // 创建交易
  const createTransaction = async (params: TransactionParams) => {
    try {
      const transaction = await makeRequest(postTransactionHistoryCreateTransactionHistory(params));
      if (!transaction?.data?.id) {
        throw new Error('Transaction creation failed');
      }
      return transaction.data;
    } catch (error) {
      console.error('Create transaction error:', error);
      throw error;
    }
  };

  // 发送交易
  const sendTransaction = async (params: {
    chainId: number;
    calls: Array<{
      to: string;
      data: string;
    }>;
  }) => {
    try {
      const baseClient = await getClientForChain({
        id: params.chainId,
      });

      if (!baseClient) {
        throw new Error('Failed to get client for chain');
      }

      return await baseClient.sendTransaction({
        calls: params.calls,
      });
    } catch (error) {
      console.error('Send transaction error:', error);
      throw error;
    }
  };

  // 处理支付链接发送
  const handleSendPayLink = async (transaction: any, onSuccess?: (data: any) => void) => {
    try {
      const payLink = await makeRequest(
        postTransactionPayLinkCreatePayLink({
          transactionCode: transaction?.transactionCode,
        }),
      );

      if (!payLink?.data) {
        throw new Error('Failed to create pay link');
      }

      const tokenContractAddress = getAddress(payLink.data.tokenContractAddress!);
      const bizContractAddress = getAddress(payLink.data.bizContractAddress!);
      const amount = BigInt(transaction.amount);

      const transactionHash = await sendTransaction({
        chainId: Number(transaction.chainId),
        calls: [
          {
            to: tokenContractAddress,
            data: encodeFunctionData({
              abi: erc20Abi,
              functionName: 'approve',
              args: [bizContractAddress, amount],
            }),
          },
          {
            to: bizContractAddress,
            data: encodeFunctionData({
              abi: TokenLinkContract.abi,
              functionName: 'deposit',
              args: [tokenContractAddress, amount, payLink.data.otp],
            }),
          },
        ],
      });

      await handleTransactionSuccess(
        {
          id: transaction.id,
          transactionCode: transaction.transactionCode,
          transactionHash,
        },
        onSuccess,
      );
    } catch (error) {
      console.error('Send pay link error:', error);
      toast.show(t('tips.error.networkError'), {
        duration: 3000,
      });
      throw error;
    }
  };

  // 发送支付链接交易
  const onSendPayLinkSubmit = async (orderData: any, onSuccess?: (data: any) => void) => {
    try {
      // const transaction = await createTransaction(params);

      const payLink = await makeRequest(
        postTransactionPayLinkFindPayLink({
          transactionCode: orderData?.transactionCode,
        }),
      );

      if (!payLink?.data?.transactionCode) {
        toast.show(t('tips.error.networkError'), {
          duration: 3000,
        });
        return;
      }

      const tokenContractAddress = getAddress(payLink.data.tokenContractAddress!);
      const bizContractAddress = getAddress(payLink.data.bizContractAddress!);
      const amount = BigInt(orderData.amount);

      const baseClient = await getClientForChain({
        id: orderData.chainId,
      });

      if (!baseClient) {
        throw new Error('Failed to get client for chain');
      }

      const transactionHash = await baseClient.sendTransaction({
        to: bizContractAddress,
        data: encodeFunctionData({
          abi: TokenLinkContract.abi,
          functionName: 'withdraw',
          args: [getAddress(payLink.data.senderWalletAddress!), payLink.data.otp],
        }),
      });

      await handleTransactionSuccess(
        {
          id: orderData.id,
          transactionCode: orderData.transactionCode,
          transactionHash,
        },
        onSuccess,
      );
    } catch (error) {
      console.error('Send pay link submit error:', error);
      toast.show(t('tips.error.networkError'), {
        duration: 3000,
      });
      throw error;
    }
  };

  // 发送交易
  const onSendSubmit = async (params: TransactionParams, onSuccess?: (data: any) => void) => {
    try {
      const transaction = await createTransaction(params);

      console.log('🚀 ~ onSendSubmit ~ params:', params);

      if (params.transactionType === 'PAY_LINK') {
        await handleSendPayLink(transaction, onSuccess);
        return;
      }

      const tokenContractAddress = transaction.tokenContractAddress!;
      const bizContractAddress = transaction.bizContractAddress;
      const amount = BigInt(params.amount);

      console.log('🚀 ~ onSendSubmit ~ amount:', amount);

      const transactionHash = await sendTransaction({
        chainId: params.chainId,
        calls: [
          {
            to: tokenContractAddress,
            data: encodeFunctionData({
              abi: erc20Abi,
              functionName: 'approve',
              args: [getAddress(bizContractAddress!), amount],
            }),
          },
          {
            to: getAddress(bizContractAddress!),
            data: encodeFunctionData({
              abi: TokenTransferContract.abi,
              functionName: 'transfer',
              args: [transaction.receiverWalletAddress!, tokenContractAddress, amount],
            }),
          },
        ],
      });

      await handleTransactionSuccess(
        {
          id: transaction.id,
          transactionHash,
        },
        onSuccess,
      );
    } catch (error) {
      console.error('Send submit error:', error);
      toast.show(t('tips.error.networkError'), {
        duration: 3000,
      });
      throw error;
    }
  };

  // 请求交易
  const onRequestSubmit = async (params: TransactionParams, onSuccess?: (data: any) => void) => {
    try {
      const transaction = await createTransaction(params);
      onSuccess?.(transaction);
    } catch (error) {
      console.error('Request submit error:', error);
      toast.show(t('tips.error.networkError'), {
        duration: 3000,
      });
      throw error;
    }
  };

  // 提现
  const onWithdraw = async (
    params: TransactionParams & {
      receiverAddress: string;
    },
    onSuccess?: (data: any) => void,
  ) => {
    try {
      const _amount = Number(convertAmountToTokenDecimals(params.amount.toString(), 6));
      const transaction = await createTransaction({...params, amount: _amount});

      const tokenContractAddress = transaction.tokenContractAddress!;
      const baseClient = await getClientForChain({
        id: params.chainId,
      });

      if (!baseClient) {
        throw new Error('Failed to get client for chain');
      }

      const transactionHash = await baseClient.sendTransaction({
        to: getAddress(tokenContractAddress!),
        data: encodeFunctionData({
          abi: erc20Abi,
          functionName: 'transfer',
          args: [params.receiverAddress as `0x${string}`, BigInt(_amount)],
        }),
      });

      await handleTransactionSuccess(
        {
          id: transaction.id,
          transactionCode: transaction.transactionCode,
          transactionHash,
        },
        onSuccess,
      );
    } catch (error) {
      console.error('Withdraw error:', error);
      toast.show(t('tips.error.transactionFailed'), {
        duration: 3000,
      });
      throw error;
    }
  };

  // 存款
  const onDeposit = async (params: TransactionParams, onSuccess?: (data: any) => void) => {
    try {
      const transaction = await createTransaction(params);
      if (onSuccess) {
        onSuccess(transaction);
      }

      // const transactionHash = await sendTransaction({
      //   chainId: params.chainId,
      //   calls: [
      //     {
      //       to: getAddress(tokenContractAddress!),
      //       data: encodeFunctionData({
      //         abi: erc20Abi,
      //         functionName: 'approve',
      //         args: [getAddress(bizContractAddress!), amount],
      //       }),
      //     },
      //     {
      //       to: getAddress(bizContractAddress!),
      //       data: encodeFunctionData({
      //         abi: TokenTransferContract.abi,
      //         functionName: 'transfer',
      //         args: [transaction.receiverWalletAddress!, tokenContractAddress, amount],
      //       }),
      //     },
      //   ],
      // });

      // await handleTransactionSuccess(
      //   {
      //     id: transaction.id,
      //     transactionHash,
      //   },
      //   onSuccess,
      // );
    } catch (error) {
      console.error('Deposit error:', error);
      toast.show(t('tips.error.networkError'), {
        duration: 3000,
      });
      throw error;
    }
  };

  return {
    handleTransactionSuccess,
    createTransaction,
    sendTransaction,
    handleSendPayLink,
    onSendSubmit,
    onRequestSubmit,
    onWithdraw,
    onDeposit,
    onSendPayLinkSubmit,
  };
};
