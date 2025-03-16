/*
 * @Date: 2025-03-04 21:47:07
 * @LastEditors: yosan
 * @LastEditTime: 2025-03-16 23:22:10
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
  postTransactionHistoryUpdateNetworkFee,
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
  isPayLink?: boolean;
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
        params.isPayLink
          ? postTransactionPayLinkUpdateTransactionHash({
              transactionCode: params.transactionCode,
              transactionHash: params.transactionHash,
            })
          : postTransactionHistoryUpdateTransactionHash({
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

      return await baseClient.sendTransaction(
        {
          calls: params.calls,
        },
        {
          uiOptions: {
            showWalletUIs: false,
          },
        },
        // {
        //   uiOptions: {
        //     showWalletUIs: false,
        //     header: 'header',
        //     successHeader: 'successHeader!',
        //     successDescription: 'successDescription',
        //     title: 'title',
        //     description: 'description',
        //     buttonText: 'buttonText',
        //     transactionInfo: {
        //       title: 'title',
        //       action: 'action',
        //       contractInfo: {
        //         name: 'name',
        //         url: 'address',
        //         imgUrl: '',
        //       },
        //     },
        //   },
        // },
      );
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

      const feeTokenContractAddress = getAddress(transaction?.networkFee?.tokenContractAddress);
      const feeAmount = BigInt(transaction?.networkFee?.totalTokenCost);
      const tokenContractAddress = getAddress(payLink.data.tokenContractAddress!);
      const bizContractAddress = getAddress(payLink.data.bizContractAddress!);
      const amount = BigInt(transaction.amount);

      let approve: any = {};

      if (!transaction?.tokenFeeSupport) {
        approve = {
          to: feeTokenContractAddress,
          data: encodeFunctionData({
            abi: erc20Abi,
            functionName: 'approve',
            args: [getAddress(bizContractAddress), feeAmount],
          }),
        };
      }
      const transactionHash = await sendTransaction({
        chainId: Number(transaction.chainId),
        calls: [
          {
            // 调用USDC代币的approve方法，授信给PayLink业务合约（转账金额和手续费是同一种代币时，要把金额相加并且只调用一次approve）
            to: tokenContractAddress,
            data: encodeFunctionData({
              abi: erc20Abi,
              functionName: 'approve',
              args: [getAddress(bizContractAddress), transaction?.tokenFeeSupport ? amount + feeAmount : amount],
            }),
          },
          ...(approve.to ? [approve] : []),
          {
            // 先调用转账业务合约的payFee方法，支付手续费
            to: bizContractAddress,
            data: encodeFunctionData({
              abi: TokenLinkContract.abi,
              functionName: 'payFee',
              args: [transaction.transactionCode, feeTokenContractAddress, feeAmount],
            }),
          },
          {
            to: bizContractAddress,
            data: encodeFunctionData({
              abi: TokenLinkContract.abi,
              functionName: 'deposit',
              args: [transaction.transactionCode, tokenContractAddress, amount, payLink.data.otp],
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
      if (error?.message.includes('The user rejected the request')) {
        toast.show(t('tips.error.userRejected'), {
          duration: 3000,
        });
      } else if (error?.message.includes('insufficient allowance')) {
        toast.show(t('tips.error.insufficientAllowance'), {
          duration: 3000,
        });
      } else if (error?.message.includes('insufficient balance')) {
        toast.show(t('tips.error.insufficientBalance'), {
          duration: 3000,
        });
      } else {
        toast.show(t('tips.error.networkError'), {
          duration: 3000,
        });
      }
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
      const bizContractAddress = getAddress(payLink.data.bizContractAddress!);
      const baseClient = await getClientForChain({
        id: orderData.chainId,
      });

      if (!baseClient) {
        throw new Error('Failed to get client for chain');
      }

      const transactionHash = await baseClient.sendTransaction(
        {
          to: bizContractAddress,
          data: encodeFunctionData({
            abi: TokenLinkContract.abi,
            functionName: 'withdraw',
            args: [orderData?.transactionCode,getAddress(payLink.data.senderWalletAddress!), payLink.data.otp],
          }),
        },
        {
          uiOptions: {
            showWalletUIs: false,
          },
        },
      );

      await handleTransactionSuccess(
        {
          id: orderData.id,
          transactionCode: orderData.transactionCode,
          transactionHash,
          isPayLink: true,
        },
        onSuccess,
      );
    } catch (error) {
      console.error('Send pay link submit error:', error);

      if (error?.message.includes('The user rejected the request')) {
        toast.show(t('tips.error.userRejected'), {
          duration: 3000,
        });
      } else if (error?.message.includes('insufficient allowance')) {
        toast.show(t('tips.error.insufficientAllowance'), {
          duration: 3000,
        });
      } else if (error?.message.includes('insufficient balance')) {
        toast.show(t('tips.error.insufficientBalance'), {
          duration: 3000,
        });
      } else {
        toast.show(t('tips.error.networkError'), {
          duration: 3000,
        });
      }
      throw error;
    }
  };

  // 发送合约交易
  const onSendContract = async (transaction: any, onSuccess?: (data: any) => void) => {
    try {
      const feeTokenContractAddress = getAddress(transaction?.networkFee?.tokenContractAddress);
      const feeAmount = BigInt(transaction?.networkFee?.totalTokenCost);

      const tokenContractAddress = transaction.tokenContractAddress!;
      const bizContractAddress = transaction.bizContractAddress;
      const amount = BigInt(transaction.amount);

      let approve: any = {};
      if (!transaction?.tokenFeeSupport) {
        approve = {
          to: feeTokenContractAddress,
          data: encodeFunctionData({
            abi: erc20Abi,
            functionName: 'approve',
            args: [getAddress(bizContractAddress), feeAmount],
          }),
        };
      }
      console.log('🚀 ~ handleSendPayLink ~ approve:', approve);

      const transactionHash = await sendTransaction({
        chainId: transaction.chainId,
        calls: [
          {
            // 调用USDC代币的approve方法，授信给转账业务合约（转账金额和手续费是同一种代币时，要把金额相加并且只调用一次approve）
            to: tokenContractAddress,
            data: encodeFunctionData({
              abi: erc20Abi,
              functionName: 'approve',
              args: [getAddress(bizContractAddress), transaction?.tokenFeeSupport ? amount + feeAmount : amount],
            }),
          },
          ...(approve.to ? [approve] : []),
          {
            // 先调用转账业务合约的payFee方法，支付手续费
            to: bizContractAddress,
            data: encodeFunctionData({
              abi: TokenTransferContract.abi,
              functionName: 'payFee',
              args: [transaction.transactionCode, feeTokenContractAddress, feeAmount],
            }),
          },
          {
            to: getAddress(bizContractAddress!),
            data: encodeFunctionData({
              abi: TokenTransferContract.abi,
              functionName: 'transfer',
              args: [transaction.transactionCode, transaction.receiverWalletAddress!, tokenContractAddress, amount],
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

  // 发送交易
  const onSendSubmit = async (transaction: any, onSuccess?: (data: any) => void) => {
    try {
      if (transaction.transactionType === 'PAY_LINK') {
        await handleSendPayLink(transaction, onSuccess);
        return;
      }
      await onSendContract(transaction, onSuccess);
    } catch (error) {
      console.error('Send submit error:', error);
      if (error?.message.includes('The user rejected the request')) {
        toast.show(t('tips.error.userRejected'), {
          duration: 3000,
        });
      } else if (error?.message.includes('insufficient allowance')) {
        toast.show(t('tips.error.insufficientAllowance'), {
          duration: 3000,
        });
      } else if (error?.message.includes('insufficient balance')) {
        toast.show(t('tips.error.insufficientBalance'), {
          duration: 3000,
        });
      } else {
        toast.show(t('tips.error.networkError'), {
          duration: 3000,
        });
      }
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
  const onWithdraw = async (transaction: any, onSuccess?: (data: any) => void) => {
    try {
      const tokenContractAddress = transaction.tokenContractAddress!;
      const baseClient = await getClientForChain({
        id: transaction.chainId,
      });

      if (!baseClient) {
        throw new Error('Failed to get client for chain');
      }

      const transactionHash = await baseClient.sendTransaction(
        {
          to: getAddress(tokenContractAddress!),
          data: encodeFunctionData({
            abi: erc20Abi,
            functionName: 'transfer',
            args: [transaction.receiverAddress as `0x${string}`, BigInt(transaction.amount)],
          }),
        },
        {
          uiOptions: {
            showWalletUIs: false,
          },
        },
      );

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
      if (error?.message.includes('The user rejected the request')) {
        toast.show(t('tips.error.userRejected'), {
          duration: 3000,
        });
      } else if (error?.message.includes('insufficient allowance')) {
        toast.show(t('tips.error.insufficientAllowance'), {
          duration: 3000,
        });
      } else if (error?.message.includes('insufficient balance')) {
        toast.show(t('tips.error.insufficientBalance'), {
          duration: 3000,
        });
      } else {
        toast.show(t('tips.error.transactionFailed'), {
          duration: 3000,
        });
      }
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
    onSendContract,
  };
};
