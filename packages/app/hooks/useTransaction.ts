/*
 * @Date: 2025-03-04 21:47:07
 * @LastEditors: yosan
 * @LastEditTime: 2025-04-27 10:30:55
 * @FilePath: /ezgg-app/packages/app/hooks/useTransaction.ts
 */
import {useTranslation} from 'react-i18next';
import {useToastController} from '@my/ui';
import {useSmartWallets} from '@privy-io/react-auth/smart-wallets';
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
  postTransactionPayLinkCancelPayLink,
  postTransactionPayLinkCreatePayLink,
  postTransactionPayLinkFindPayLink,
  postTransactionPayLinkUpdateTransactionHash,
} from 'app/servers/api/transactionPayLink';
import {handleTransactionError} from 'app/utils/error';
import {useWallets} from '@privy-io/react-auth';
import {
  encodeFunctionData,
  erc20Abi,
  createPublicClient,
  http,
  getAddress,
  Chain,
  Hex,
  createWalletClient,
  custom,
} from 'viem';

import {createBicoPaymasterClient, createSmartAccountClient, toNexusAccount} from '@biconomy/abstractjs';


const paymasterUrl = (chainId: number) => {
  switch (chainId) {
    case 97:
      return `https://paymaster.biconomy.io/api/v2/${chainId}/9Yzu5pN8q.f2b8eeaa-1320-44d5-ad12-9bf5c2cdc189`;
    case 534351:
      return `https://paymaster.biconomy.io/api/v2/${chainId}/XXTqovaTm.2a644550-a89b-470b-9f95-bedf7a3fb197`;
    default:
      return `https://paymaster.biconomy.io/api/v2/${chainId}/9Yzu5pN8q.f2b8eeaa-1320-44d5-ad12-9bf5c2cdc189`;
  }
};

import {
  base,
  baseSepolia,
  polygon,
  polygonAmoy,
  bsc,
  bscTestnet,
  arbitrum,
  arbitrumSepolia,
  monadTestnet,
  scroll,
  scrollSepolia,
} from 'viem/chains';

import {getInfrastructureListBlockchain} from 'app/servers/api/infrastructure';
import {NETWORK} from 'app/config';
import {postUserUpdateMemberSmartWallet} from 'app/servers/api/member';

const chains: any[] = [
  base,
  baseSepolia,
  polygon,
  polygonAmoy,
  bsc,
  bscTestnet,
  arbitrum,
  arbitrumSepolia,
  monadTestnet,
  scroll,
  scrollSepolia,
];

const bundlerUrl = (chainId: number) =>
  `https://bundler.biconomy.io/api/v3/${chainId}/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44`;

export enum BlockChainSmartWalletType {
  PRIVY = 'PRIVY',
  BICONOMY = 'BICONOMY',
}
export interface TransactionParams {
  platform: 'ETH' | 'SOLANA';
  chainId: number;
  tokenContractAddress: string;
  amount: string;
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
  const {wallets} = useWallets();

  const _getClientForChain = async (chainId: number): Promise<any> => {
    if (chainId !== 97 && chainId !== 56 && chainId !== 534352 && chainId !== 534351) {
      const baseClient = await getClientForChain({
        id: chainId,
      });
      return baseClient;
    } else {
      // 创建当前链的基于BICONOMY的智能钱包客户端
      const embeddedWallet = wallets.find((wallet) => wallet.walletClientType === 'privy');
      if (embeddedWallet) {
        const nexusClient = await getNexusClient(embeddedWallet, chainId);
        return nexusClient;
      }
      return null;
    }
  };

  const syncSmartWalletAddress = async (platform: any, embeddedWallet: any, callback: () => void) => {
    const requestBody: any = {
      smartWallet: [],
    };
    // const {data} = await listBlockChain({platform});
    // 使用 getInfrastructureListTokenContract 获取数据
    const tokenContractRes: any = await getInfrastructureListBlockchain({
      platform: 'ETH',
      network: NETWORK,
    });

    const blockChains = tokenContractRes.data?.filter(
      (x: any) => x.smartWalletType === BlockChainSmartWalletType.BICONOMY,
    );
    for (const {chainId} of blockChains) {
      const nexusClient = await getNexusClient(embeddedWallet, chainId);
      requestBody.smartWallet.push({
        platform,
        chainId,
        address: nexusClient.account.address,
      });
    }

    if (requestBody.smartWallet.length > 0) {
      await postUserUpdateMemberSmartWallet({
        smartWallet: requestBody.smartWallet,
      });
      callback();
    }
  };

  const getNexusClient = async (embeddedWallet: any, chainId: number) => {
    const chain = chains.find((x) => x.id == chainId);
    // 获取 Ethers.js 的 Signer
    const provider = await embeddedWallet.getEthereumProvider();
    const walletClient = createWalletClient({
      account: embeddedWallet.address as Hex,
      chain,
      transport: custom(provider),
    });
    // 初始化智能钱包客户端
    const nexusClient = createSmartAccountClient({
      account: await toNexusAccount({
        signer: walletClient,
        chain: chain!,
        transport: http(),
      }),
      // Bundler API地址，从Biconomy控制面板获取
      transport: http(bundlerUrl(chainId)),
      // Paymaster API地址，从Biconomy控制面板获取
      paymaster: createBicoPaymasterClient({paymasterUrl: paymasterUrl(chainId)}),
    });

    return nexusClient;
  };

  // 处理交易成功后的操作
  const handleTransactionSuccess = async (params: TransactionSuccessParams, onSuccess?: (data: any) => void) => {
    try {
      if (!params.transactionHash) return;

      const res = await makeRequest(
        params.isPayLink
          ? postTransactionPayLinkUpdateTransactionHash({
              transactionCode: params.transactionCode!,
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
      handleTransactionError(error, toast, t);
    }
  };

  // 创建交易
  const createTransaction = async (params: TransactionParams) => {
    try {
      // 使用原生方法处理科学计数法
      const amount = Number(params.amount).toLocaleString('fullwide', {useGrouping: false});
      const transaction = await makeRequest(
        postTransactionHistoryCreateTransactionHistory({
          ...params,
          amount: String(amount),
        }),
      );
      if (!transaction?.data?.id) {
        throw new Error('Transaction creation failed');
      }
      return transaction.data;
    } catch (error) {
      handleTransactionError(error, toast, t);
      throw error;
    }
  };

  const deployAA2 = async (chainId: any) => {
    try {
      const baseClient: any = await _getClientForChain(chainId);

      if (!baseClient) {
        throw new Error('Failed to get client for chain');
      }
      const isAADeployed = await baseClient?.account?.isDeployed();
      console.log('AA20 Account Deployment:', isAADeployed);
      if (!isAADeployed) {
        const txHash = await baseClient?.sendTransaction({
          to: '0x0000000000000000000000000000000000000000', // 发送给 0 地址
          value: 0n, // 0 ETH
          gas: 21000n, // 21000
        });
      }
    } catch (error) {
      handleTransactionError(error, toast, t);
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
      const baseClient: any =await  _getClientForChain(params.chainId);

      if (!baseClient) {
        throw new Error('Failed to get client for chain');
      }

      // await deployAA(baseClient);

      return await baseClient.sendTransaction(
        {
          calls: params.calls,
          // maxPriorityFeePerGas: 5000000n, // 设置为 5,000,000 wei
          // maxFeePerGas: 100000000n, // 设置一个合理的 maxFeePerGas
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
      handleTransactionError(error, toast, t);
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
      const feeAmount = BigInt(Number(transaction?.networkFee?.totalTokenCost));
      const tokenContractAddress = getAddress(payLink.data.tokenContractAddress!);
      const bizContractAddress = getAddress(payLink.data.bizContractAddress!);
      const amount = BigInt(Number(transaction.amount));

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
      handleTransactionError(error, toast, t);
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
      const baseClient: any =await _getClientForChain(orderData?.chainId);

      if (!baseClient) {
        throw new Error('Failed to get client for chain');
      }
      // await deployAA(baseClient);

      const transactionHash = await baseClient.sendTransaction(
        {
          to: bizContractAddress,
          data: encodeFunctionData({
            abi: TokenLinkContract.abi,
            functionName: 'withdraw',
            args: [orderData?.transactionCode, getAddress(payLink.data.senderWalletAddress!), payLink.data.otp],
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
      handleTransactionError(error, toast, t);
    }
  };

  // 发送合约交易
  const onSendContract = async (transaction: any, onSuccess?: (data: any) => void, isWithdraw = false) => {
    try {
      const feeTokenContractAddress = getAddress(transaction?.networkFee?.tokenContractAddress);
      const feeAmount = BigInt(Number(transaction?.networkFee?.totalTokenCost));

      const tokenContractAddress = transaction.tokenContractAddress!;
      const bizContractAddress = transaction.bizContractAddress;
      const amount = BigInt(Number(transaction.amount));

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
              args: [
                transaction.transactionCode,
                isWithdraw ? transaction.receiverAddress : transaction.receiverWalletAddress!,
                tokenContractAddress,
                amount,
              ],
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
      handleTransactionError(error, toast, t);
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
      handleTransactionError(error, toast, t);
    }
  };

  // 请求交易
  const onRequestSubmit = async (params: TransactionParams, onSuccess?: (data: any) => void) => {
    try {
      const transaction = await createTransaction(params);
      onSuccess?.(transaction);
    } catch (error) {
      handleTransactionError(error, toast, t);
    }
  };

  // 提现
  const onWithdraw = async (transaction: any, onSuccess?: (data: any) => void) => {
    try {
      const tokenContractAddress = transaction.tokenContractAddress!;
      const baseClient: any =await _getClientForChain(transaction?.chainId);

      if (!baseClient) {
        throw new Error('Failed to get client for chain');
      }

      const transactionHash = await baseClient.sendTransaction(
        {
          to: getAddress(tokenContractAddress!),
          data: encodeFunctionData({
            abi: erc20Abi,
            functionName: 'transfer',
            args: [transaction.receiverAddress as `0x${string}`, BigInt(Number(transaction.amount))],
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
      handleTransactionError(error, toast, t);
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
      handleTransactionError(error, toast, t);
    }
  };

  // 取消支付链接
  const onCancelPayLink = async (orderData: any, onSuccess?: (data: any) => void) => {
    try {
      const res = await makeRequest(
        postTransactionPayLinkCancelPayLink({
          transactionCode: orderData?.transactionCode,
        }),
      );
      if (res?.code !== '0') {
        toast.show(t('tips.error.networkError'), {
          duration: 3000,
        });
        return;
      }

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

      const baseClient: any =await _getClientForChain(orderData?.chainId);

      if (!baseClient) {
        throw new Error('Failed to get client for chain');
      }
      // await deployAA(baseClient);
      const bizContractAddress = getAddress(payLink.data.bizContractAddress!);

      const transactionHash = await baseClient.sendTransaction(
        {
          to: bizContractAddress,
          data: encodeFunctionData({
            abi: TokenLinkContract.abi,
            functionName: 'cancel',
            args: [orderData?.transactionCode, payLink.data.otp],
          }),
        },
        {
          uiOptions: {
            showWalletUIs: false,
          },
        },
      );
      onSuccess?.(transactionHash);
    } catch (error) {
      handleTransactionError(error, toast, t);
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
    deployAA2,
    onCancelPayLink,
    _getClientForChain,
    syncSmartWalletAddress,
  };
};
