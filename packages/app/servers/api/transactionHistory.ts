// @ts-ignore
/* eslint-disable */
import request from 'app/utils/request';

/** 创建交易历史记录 POST /member/transaction/history/create-transaction-history */
export async function postTransactionHistoryCreateTransactionHistory(
  body: {
    /** 区块链平台: ETH 以太坊；SOLANA Solana; */
    platform: 'ETH' | 'SOLANA';
    /** 区块链id */
    chainId: number;
    /** 代币地址 */
    tokenContractAddress: string;
    /** 交易分类 */
    transactionCategory: 'SEND' | 'REQUEST' | 'DEPOSIT' | 'WITHDRAW';
    /** 交易类型 */
    transactionType:
      | 'SEND'
      | 'REQUEST'
      | 'DEPOSIT'
      | 'WITHDRAW'
      | 'PAY_LINK'
      | 'QR_CODE'
      | 'REQUEST_LINK'
      | 'REQUEST_QR_CODE';
    /** 付款人 - 会员id */
    senderMemberId?: number;
    /** 收款人 - 会员id */
    receiverMemberId?: number;
    /** 交易金额（代币数量） */
    amount: string;
    /** 附带留言 */
    message?: string;
    /** 付款人钱包地址 */
    senderWalletAddress?: string;
    /** 收款人钱包地址 */
    receiverWalletAddress?: string;
  },
  options?: { [key: string]: any },
) {
  return request<{
    code: string;
    msg: string;
    data?: {
      transactionCategory?: 'SEND' | 'REQUEST' | 'DEPOSIT' | 'WITHDRAW';
      transactionType?:
        | 'SEND'
        | 'REQUEST'
        | 'DEPOSIT'
        | 'WITHDRAW'
        | 'PAY_LINK'
        | 'QR_CODE'
        | 'REQUEST_LINK'
        | 'REQUEST_QR_CODE';
      business?: 'LINK' | 'VAULT' | 'TRANSFER';
      transactionStatus?: 'PENDING' | 'ACCEPTED' | 'DECLINED';
      platform?: 'ETH' | 'SOLANA';
      network?: 'MAIN' | 'TEST' | 'DEV';
      id?: number;
      createBy?: number;
      updateBy?: number;
      createAt?: string;
      updateAt?: string;
      memberId?: number;
      transactionCode?: string;
      bizContractAddress?: string;
      senderMemberId?: number;
      senderDid?: string;
      senderWalletAddress?: string;
      receiverMemberId?: number;
      receiverDid?: string;
      receiverWalletAddress?: string;
      transactionTime?: string;
      transactionConfirmAt?: string;
      transactionHash?: string;
      chainId?: number;
      tokenSymbol?: string;
      tokenDecimals?: number;
      tokenContractAddress?: string;
      tokenPrice?: string;
      tokenFeeSupport?: boolean;
      amount?: string;
      message?: string;
      currency?: string;
      currencyAmount?: string;
      senderMember: {
        id?: number;
        createBy?: number;
        updateBy?: number;
        createAt?: string;
        updateAt?: string;
        did?: string;
        createdAt?: string;
        nickname?: string;
        avatar?: string;
        memberLinkedAccount?: { type?: string; search?: string }[];
      };
      receiverMember: {
        id?: number;
        createBy?: number;
        updateBy?: number;
        createAt?: string;
        updateAt?: string;
        did?: string;
        createdAt?: string;
        nickname?: string;
        avatar?: string;
        memberLinkedAccount?: { type?: string; search?: string }[];
      };
      networkFee: {
        platform?: 'ETH' | 'SOLANA';
        id?: number;
        createBy?: number;
        updateBy?: number;
        createAt?: string;
        updateAt?: string;
        transactionHistoryId?: number;
        transactionCode?: string;
        chainId?: number;
        ethToUsd?: string;
        tokenSymbol?: string;
        tokenDecimals?: number;
        tokenContractAddress?: string;
        tokenPrice?: string;
        preVerificationGas?: string;
        verificationGasLimit?: string;
        callGasLimit?: string;
        gas?: string;
        gasPrice?: string;
        totalWeiCost?: string;
        totalEthCost?: string;
        totalUsdCost?: string;
        platformFee?: string;
        totalTokenCost?: string;
      };
    };
  }>('/member/transaction/history/create-transaction-history', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 创建交易历史记录 POST /member/transaction/history/create-transaction-history */
export async function postTransactionHistoryCreateTransactionHistory2(
  body: {
    /** 区块链平台: ETH 以太坊；SOLANA Solana; */
    platform: 'ETH' | 'SOLANA';
    /** 区块链id */
    chainId: number;
    /** 代币地址 */
    tokenContractAddress: string;
    /** 交易分类 */
    transactionCategory: 'SEND' | 'REQUEST' | 'DEPOSIT' | 'WITHDRAW';
    /** 交易类型 */
    transactionType:
      | 'SEND'
      | 'REQUEST'
      | 'DEPOSIT'
      | 'WITHDRAW'
      | 'PAY_LINK'
      | 'QR_CODE'
      | 'REQUEST_LINK'
      | 'REQUEST_QR_CODE';
    /** 付款人 - 会员id */
    senderMemberId?: number;
    /** 收款人 - 会员id */
    receiverMemberId?: number;
    /** 交易金额（代币数量） */
    amount: string;
    /** 附带留言 */
    message?: string;
    /** 付款人钱包地址 */
    senderWalletAddress?: string;
    /** 收款人钱包地址 */
    receiverWalletAddress?: string;
  },
  options?: { [key: string]: any },
) {
  return request<{
    code: string;
    msg: string;
    data?: {
      transactionCategory?: 'SEND' | 'REQUEST' | 'DEPOSIT' | 'WITHDRAW';
      transactionType?:
        | 'SEND'
        | 'REQUEST'
        | 'DEPOSIT'
        | 'WITHDRAW'
        | 'PAY_LINK'
        | 'QR_CODE'
        | 'REQUEST_LINK'
        | 'REQUEST_QR_CODE';
      business?: 'LINK' | 'VAULT' | 'TRANSFER';
      transactionStatus?: 'PENDING' | 'ACCEPTED' | 'DECLINED';
      platform?: 'ETH' | 'SOLANA';
      network?: 'MAIN' | 'TEST' | 'DEV';
      id?: number;
      createBy?: number;
      updateBy?: number;
      createAt?: string;
      updateAt?: string;
      memberId?: number;
      transactionCode?: string;
      bizContractAddress?: string;
      senderMemberId?: number;
      senderDid?: string;
      senderWalletAddress?: string;
      receiverMemberId?: number;
      receiverDid?: string;
      receiverWalletAddress?: string;
      transactionTime?: string;
      transactionConfirmAt?: string;
      transactionHash?: string;
      chainId?: number;
      tokenSymbol?: string;
      tokenDecimals?: number;
      tokenContractAddress?: string;
      tokenPrice?: string;
      tokenFeeSupport?: boolean;
      amount?: string;
      message?: string;
      currency?: string;
      currencyAmount?: string;
      senderMember: {
        id?: number;
        createBy?: number;
        updateBy?: number;
        createAt?: string;
        updateAt?: string;
        did?: string;
        createdAt?: string;
        nickname?: string;
        avatar?: string;
        memberLinkedAccount?: { type?: string; search?: string }[];
      };
      receiverMember: {
        id?: number;
        createBy?: number;
        updateBy?: number;
        createAt?: string;
        updateAt?: string;
        did?: string;
        createdAt?: string;
        nickname?: string;
        avatar?: string;
        memberLinkedAccount?: { type?: string; search?: string }[];
      };
      networkFee: {
        platform?: 'ETH' | 'SOLANA';
        id?: number;
        createBy?: number;
        updateBy?: number;
        createAt?: string;
        updateAt?: string;
        transactionHistoryId?: number;
        transactionCode?: string;
        chainId?: number;
        ethToUsd?: string;
        tokenSymbol?: string;
        tokenDecimals?: number;
        tokenContractAddress?: string;
        tokenPrice?: string;
        preVerificationGas?: string;
        verificationGasLimit?: string;
        callGasLimit?: string;
        gas?: string;
        gasPrice?: string;
        totalWeiCost?: string;
        totalEthCost?: string;
        totalUsdCost?: string;
        platformFee?: string;
        totalTokenCost?: string;
      };
    };
  }>('/member/transaction/history/create-transaction-history', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 拒绝支付REQUEST交易 POST /member/transaction/history/decline-transaction-history */
export async function postTransactionHistoryDeclineTransactionHistory(
  body: {
    /** 交易历史id */
    id: number;
  },
  options?: { [key: string]: any },
) {
  return request<{
    code: string;
    msg: string;
    data?: {
      transactionCategory?: 'SEND' | 'REQUEST' | 'DEPOSIT' | 'WITHDRAW';
      transactionType?:
        | 'SEND'
        | 'REQUEST'
        | 'DEPOSIT'
        | 'WITHDRAW'
        | 'PAY_LINK'
        | 'QR_CODE'
        | 'REQUEST_LINK'
        | 'REQUEST_QR_CODE';
      business?: 'LINK' | 'VAULT' | 'TRANSFER';
      transactionStatus?: 'PENDING' | 'ACCEPTED' | 'DECLINED';
      platform?: 'ETH' | 'SOLANA';
      network?: 'MAIN' | 'TEST' | 'DEV';
      id?: number;
      createBy?: number;
      updateBy?: number;
      createAt?: string;
      updateAt?: string;
      memberId?: number;
      transactionCode?: string;
      bizContractAddress?: string;
      senderMemberId?: number;
      senderDid?: string;
      senderWalletAddress?: string;
      receiverMemberId?: number;
      receiverDid?: string;
      receiverWalletAddress?: string;
      transactionTime?: string;
      transactionConfirmAt?: string;
      transactionHash?: string;
      chainId?: number;
      tokenSymbol?: string;
      tokenDecimals?: number;
      tokenContractAddress?: string;
      tokenPrice?: string;
      tokenFeeSupport?: boolean;
      amount?: string;
      message?: string;
      currency?: string;
      currencyAmount?: string;
      senderMember: {
        id?: number;
        createBy?: number;
        updateBy?: number;
        createAt?: string;
        updateAt?: string;
        did?: string;
        createdAt?: string;
        nickname?: string;
        avatar?: string;
        memberLinkedAccount?: { type?: string; search?: string }[];
      };
      receiverMember: {
        id?: number;
        createBy?: number;
        updateBy?: number;
        createAt?: string;
        updateAt?: string;
        did?: string;
        createdAt?: string;
        nickname?: string;
        avatar?: string;
        memberLinkedAccount?: { type?: string; search?: string }[];
      };
      networkFee: {
        platform?: 'ETH' | 'SOLANA';
        id?: number;
        createBy?: number;
        updateBy?: number;
        createAt?: string;
        updateAt?: string;
        transactionHistoryId?: number;
        transactionCode?: string;
        chainId?: number;
        ethToUsd?: string;
        tokenSymbol?: string;
        tokenDecimals?: number;
        tokenContractAddress?: string;
        tokenPrice?: string;
        preVerificationGas?: string;
        verificationGasLimit?: string;
        callGasLimit?: string;
        gas?: string;
        gasPrice?: string;
        totalWeiCost?: string;
        totalEthCost?: string;
        totalUsdCost?: string;
        platformFee?: string;
        totalTokenCost?: string;
      };
    };
  }>('/member/transaction/history/decline-transaction-history', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 拒绝支付REQUEST交易 POST /member/transaction/history/decline-transaction-history */
export async function postTransactionHistoryDeclineTransactionHistory2(
  body: {
    /** 交易历史id */
    id: number;
  },
  options?: { [key: string]: any },
) {
  return request<{
    code: string;
    msg: string;
    data?: {
      transactionCategory?: 'SEND' | 'REQUEST' | 'DEPOSIT' | 'WITHDRAW';
      transactionType?:
        | 'SEND'
        | 'REQUEST'
        | 'DEPOSIT'
        | 'WITHDRAW'
        | 'PAY_LINK'
        | 'QR_CODE'
        | 'REQUEST_LINK'
        | 'REQUEST_QR_CODE';
      business?: 'LINK' | 'VAULT' | 'TRANSFER';
      transactionStatus?: 'PENDING' | 'ACCEPTED' | 'DECLINED';
      platform?: 'ETH' | 'SOLANA';
      network?: 'MAIN' | 'TEST' | 'DEV';
      id?: number;
      createBy?: number;
      updateBy?: number;
      createAt?: string;
      updateAt?: string;
      memberId?: number;
      transactionCode?: string;
      bizContractAddress?: string;
      senderMemberId?: number;
      senderDid?: string;
      senderWalletAddress?: string;
      receiverMemberId?: number;
      receiverDid?: string;
      receiverWalletAddress?: string;
      transactionTime?: string;
      transactionConfirmAt?: string;
      transactionHash?: string;
      chainId?: number;
      tokenSymbol?: string;
      tokenDecimals?: number;
      tokenContractAddress?: string;
      tokenPrice?: string;
      tokenFeeSupport?: boolean;
      amount?: string;
      message?: string;
      currency?: string;
      currencyAmount?: string;
      senderMember: {
        id?: number;
        createBy?: number;
        updateBy?: number;
        createAt?: string;
        updateAt?: string;
        did?: string;
        createdAt?: string;
        nickname?: string;
        avatar?: string;
        memberLinkedAccount?: { type?: string; search?: string }[];
      };
      receiverMember: {
        id?: number;
        createBy?: number;
        updateBy?: number;
        createAt?: string;
        updateAt?: string;
        did?: string;
        createdAt?: string;
        nickname?: string;
        avatar?: string;
        memberLinkedAccount?: { type?: string; search?: string }[];
      };
      networkFee: {
        platform?: 'ETH' | 'SOLANA';
        id?: number;
        createBy?: number;
        updateBy?: number;
        createAt?: string;
        updateAt?: string;
        transactionHistoryId?: number;
        transactionCode?: string;
        chainId?: number;
        ethToUsd?: string;
        tokenSymbol?: string;
        tokenDecimals?: number;
        tokenContractAddress?: string;
        tokenPrice?: string;
        preVerificationGas?: string;
        verificationGasLimit?: string;
        callGasLimit?: string;
        gas?: string;
        gasPrice?: string;
        totalWeiCost?: string;
        totalEthCost?: string;
        totalUsdCost?: string;
        platformFee?: string;
        totalTokenCost?: string;
      };
    };
  }>('/member/transaction/history/decline-transaction-history', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 通过id获取交易历史记录详情 GET /member/transaction/history/find-transaction-history/${param0} */
export async function getTransactionHistoryFindTransactionHistoryId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getTransactionHistoryFindTransactionHistoryIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<{
    code: string;
    msg: string;
    data?: {
      transactionCategory?: 'SEND' | 'REQUEST' | 'DEPOSIT' | 'WITHDRAW';
      transactionType?:
        | 'SEND'
        | 'REQUEST'
        | 'DEPOSIT'
        | 'WITHDRAW'
        | 'PAY_LINK'
        | 'QR_CODE'
        | 'REQUEST_LINK'
        | 'REQUEST_QR_CODE';
      business?: 'LINK' | 'VAULT' | 'TRANSFER';
      transactionStatus?: 'PENDING' | 'ACCEPTED' | 'DECLINED';
      platform?: 'ETH' | 'SOLANA';
      network?: 'MAIN' | 'TEST' | 'DEV';
      id?: number;
      createBy?: number;
      updateBy?: number;
      createAt?: string;
      updateAt?: string;
      memberId?: number;
      transactionCode?: string;
      bizContractAddress?: string;
      senderMemberId?: number;
      senderDid?: string;
      senderWalletAddress?: string;
      receiverMemberId?: number;
      receiverDid?: string;
      receiverWalletAddress?: string;
      transactionTime?: string;
      transactionConfirmAt?: string;
      transactionHash?: string;
      chainId?: number;
      tokenSymbol?: string;
      tokenDecimals?: number;
      tokenContractAddress?: string;
      tokenPrice?: string;
      tokenFeeSupport?: boolean;
      amount?: string;
      message?: string;
      currency?: string;
      currencyAmount?: string;
      senderMember: {
        id?: number;
        createBy?: number;
        updateBy?: number;
        createAt?: string;
        updateAt?: string;
        did?: string;
        createdAt?: string;
        nickname?: string;
        avatar?: string;
        memberLinkedAccount?: { type?: string; search?: string }[];
      };
      receiverMember: {
        id?: number;
        createBy?: number;
        updateBy?: number;
        createAt?: string;
        updateAt?: string;
        did?: string;
        createdAt?: string;
        nickname?: string;
        avatar?: string;
        memberLinkedAccount?: { type?: string; search?: string }[];
      };
      networkFee: {
        platform?: 'ETH' | 'SOLANA';
        id?: number;
        createBy?: number;
        updateBy?: number;
        createAt?: string;
        updateAt?: string;
        transactionHistoryId?: number;
        transactionCode?: string;
        chainId?: number;
        ethToUsd?: string;
        tokenSymbol?: string;
        tokenDecimals?: number;
        tokenContractAddress?: string;
        tokenPrice?: string;
        preVerificationGas?: string;
        verificationGasLimit?: string;
        callGasLimit?: string;
        gas?: string;
        gasPrice?: string;
        totalWeiCost?: string;
        totalEthCost?: string;
        totalUsdCost?: string;
        platformFee?: string;
        totalTokenCost?: string;
      };
    };
  }>(`/member/transaction/history/find-transaction-history/${param0}`, {
    method: 'GET',
    params: {
      // currency has a default value: USD
      currency: 'USD',
      ...queryParams,
    },
    ...(options || {}),
  });
}

/** 通过id获取交易历史记录详情 GET /member/transaction/history/find-transaction-history/${param0} */
export async function getTransactionHistoryFindTransactionHistoryId2(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getTransactionHistoryFindTransactionHistoryIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<{
    code: string;
    msg: string;
    data?: {
      transactionCategory?: 'SEND' | 'REQUEST' | 'DEPOSIT' | 'WITHDRAW';
      transactionType?:
        | 'SEND'
        | 'REQUEST'
        | 'DEPOSIT'
        | 'WITHDRAW'
        | 'PAY_LINK'
        | 'QR_CODE'
        | 'REQUEST_LINK'
        | 'REQUEST_QR_CODE';
      business?: 'LINK' | 'VAULT' | 'TRANSFER';
      transactionStatus?: 'PENDING' | 'ACCEPTED' | 'DECLINED';
      platform?: 'ETH' | 'SOLANA';
      network?: 'MAIN' | 'TEST' | 'DEV';
      id?: number;
      createBy?: number;
      updateBy?: number;
      createAt?: string;
      updateAt?: string;
      memberId?: number;
      transactionCode?: string;
      bizContractAddress?: string;
      senderMemberId?: number;
      senderDid?: string;
      senderWalletAddress?: string;
      receiverMemberId?: number;
      receiverDid?: string;
      receiverWalletAddress?: string;
      transactionTime?: string;
      transactionConfirmAt?: string;
      transactionHash?: string;
      chainId?: number;
      tokenSymbol?: string;
      tokenDecimals?: number;
      tokenContractAddress?: string;
      tokenPrice?: string;
      tokenFeeSupport?: boolean;
      amount?: string;
      message?: string;
      currency?: string;
      currencyAmount?: string;
      senderMember: {
        id?: number;
        createBy?: number;
        updateBy?: number;
        createAt?: string;
        updateAt?: string;
        did?: string;
        createdAt?: string;
        nickname?: string;
        avatar?: string;
        memberLinkedAccount?: { type?: string; search?: string }[];
      };
      receiverMember: {
        id?: number;
        createBy?: number;
        updateBy?: number;
        createAt?: string;
        updateAt?: string;
        did?: string;
        createdAt?: string;
        nickname?: string;
        avatar?: string;
        memberLinkedAccount?: { type?: string; search?: string }[];
      };
      networkFee: {
        platform?: 'ETH' | 'SOLANA';
        id?: number;
        createBy?: number;
        updateBy?: number;
        createAt?: string;
        updateAt?: string;
        transactionHistoryId?: number;
        transactionCode?: string;
        chainId?: number;
        ethToUsd?: string;
        tokenSymbol?: string;
        tokenDecimals?: number;
        tokenContractAddress?: string;
        tokenPrice?: string;
        preVerificationGas?: string;
        verificationGasLimit?: string;
        callGasLimit?: string;
        gas?: string;
        gasPrice?: string;
        totalWeiCost?: string;
        totalEthCost?: string;
        totalUsdCost?: string;
        platformFee?: string;
        totalTokenCost?: string;
      };
    };
  }>(`/member/transaction/history/find-transaction-history/${param0}`, {
    method: 'GET',
    params: {
      // currency has a default value: USD
      currency: 'USD',
      ...queryParams,
    },
    ...(options || {}),
  });
}

/** 通过transactionCode获取交易历史记录详情 GET /member/transaction/history/find-transaction-history/code/${param0} */
export async function getTransactionHistoryFindTransactionHistoryCodeTransactionCode(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getTransactionHistoryFindTransactionHistoryCodeTransactionCodeParams,
  options?: { [key: string]: any },
) {
  const { transactionCode: param0, ...queryParams } = params;
  return request<{
    code: string;
    msg: string;
    data?: {
      transactionCategory?: 'SEND' | 'REQUEST' | 'DEPOSIT' | 'WITHDRAW';
      transactionType?:
        | 'SEND'
        | 'REQUEST'
        | 'DEPOSIT'
        | 'WITHDRAW'
        | 'PAY_LINK'
        | 'QR_CODE'
        | 'REQUEST_LINK'
        | 'REQUEST_QR_CODE';
      business?: 'LINK' | 'VAULT' | 'TRANSFER';
      transactionStatus?: 'PENDING' | 'ACCEPTED' | 'DECLINED';
      platform?: 'ETH' | 'SOLANA';
      network?: 'MAIN' | 'TEST' | 'DEV';
      id?: number;
      createBy?: number;
      updateBy?: number;
      createAt?: string;
      updateAt?: string;
      memberId?: number;
      transactionCode?: string;
      bizContractAddress?: string;
      senderMemberId?: number;
      senderDid?: string;
      senderWalletAddress?: string;
      receiverMemberId?: number;
      receiverDid?: string;
      receiverWalletAddress?: string;
      transactionTime?: string;
      transactionConfirmAt?: string;
      transactionHash?: string;
      chainId?: number;
      tokenSymbol?: string;
      tokenDecimals?: number;
      tokenContractAddress?: string;
      tokenPrice?: string;
      tokenFeeSupport?: boolean;
      amount?: string;
      message?: string;
      currency?: string;
      currencyAmount?: string;
      senderMember: {
        id?: number;
        createBy?: number;
        updateBy?: number;
        createAt?: string;
        updateAt?: string;
        did?: string;
        createdAt?: string;
        nickname?: string;
        avatar?: string;
        memberLinkedAccount?: { type?: string; search?: string }[];
      };
      receiverMember: {
        id?: number;
        createBy?: number;
        updateBy?: number;
        createAt?: string;
        updateAt?: string;
        did?: string;
        createdAt?: string;
        nickname?: string;
        avatar?: string;
        memberLinkedAccount?: { type?: string; search?: string }[];
      };
      networkFee: {
        platform?: 'ETH' | 'SOLANA';
        id?: number;
        createBy?: number;
        updateBy?: number;
        createAt?: string;
        updateAt?: string;
        transactionHistoryId?: number;
        transactionCode?: string;
        chainId?: number;
        ethToUsd?: string;
        tokenSymbol?: string;
        tokenDecimals?: number;
        tokenContractAddress?: string;
        tokenPrice?: string;
        preVerificationGas?: string;
        verificationGasLimit?: string;
        callGasLimit?: string;
        gas?: string;
        gasPrice?: string;
        totalWeiCost?: string;
        totalEthCost?: string;
        totalUsdCost?: string;
        platformFee?: string;
        totalTokenCost?: string;
      };
    };
  }>(`/member/transaction/history/find-transaction-history/code/${param0}`, {
    method: 'GET',
    params: {
      // currency has a default value: USD
      currency: 'USD',
      ...queryParams,
    },
    ...(options || {}),
  });
}

/** 通过transactionCode获取交易历史记录详情 GET /member/transaction/history/find-transaction-history/code/${param0} */
export async function getTransactionHistoryFindTransactionHistoryCodeTransactionCode2(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getTransactionHistoryFindTransactionHistoryCodeTransactionCodeParams,
  options?: { [key: string]: any },
) {
  const { transactionCode: param0, ...queryParams } = params;
  return request<{
    code: string;
    msg: string;
    data?: {
      transactionCategory?: 'SEND' | 'REQUEST' | 'DEPOSIT' | 'WITHDRAW';
      transactionType?:
        | 'SEND'
        | 'REQUEST'
        | 'DEPOSIT'
        | 'WITHDRAW'
        | 'PAY_LINK'
        | 'QR_CODE'
        | 'REQUEST_LINK'
        | 'REQUEST_QR_CODE';
      business?: 'LINK' | 'VAULT' | 'TRANSFER';
      transactionStatus?: 'PENDING' | 'ACCEPTED' | 'DECLINED';
      platform?: 'ETH' | 'SOLANA';
      network?: 'MAIN' | 'TEST' | 'DEV';
      id?: number;
      createBy?: number;
      updateBy?: number;
      createAt?: string;
      updateAt?: string;
      memberId?: number;
      transactionCode?: string;
      bizContractAddress?: string;
      senderMemberId?: number;
      senderDid?: string;
      senderWalletAddress?: string;
      receiverMemberId?: number;
      receiverDid?: string;
      receiverWalletAddress?: string;
      transactionTime?: string;
      transactionConfirmAt?: string;
      transactionHash?: string;
      chainId?: number;
      tokenSymbol?: string;
      tokenDecimals?: number;
      tokenContractAddress?: string;
      tokenPrice?: string;
      tokenFeeSupport?: boolean;
      amount?: string;
      message?: string;
      currency?: string;
      currencyAmount?: string;
      senderMember: {
        id?: number;
        createBy?: number;
        updateBy?: number;
        createAt?: string;
        updateAt?: string;
        did?: string;
        createdAt?: string;
        nickname?: string;
        avatar?: string;
        memberLinkedAccount?: { type?: string; search?: string }[];
      };
      receiverMember: {
        id?: number;
        createBy?: number;
        updateBy?: number;
        createAt?: string;
        updateAt?: string;
        did?: string;
        createdAt?: string;
        nickname?: string;
        avatar?: string;
        memberLinkedAccount?: { type?: string; search?: string }[];
      };
      networkFee: {
        platform?: 'ETH' | 'SOLANA';
        id?: number;
        createBy?: number;
        updateBy?: number;
        createAt?: string;
        updateAt?: string;
        transactionHistoryId?: number;
        transactionCode?: string;
        chainId?: number;
        ethToUsd?: string;
        tokenSymbol?: string;
        tokenDecimals?: number;
        tokenContractAddress?: string;
        tokenPrice?: string;
        preVerificationGas?: string;
        verificationGasLimit?: string;
        callGasLimit?: string;
        gas?: string;
        gasPrice?: string;
        totalWeiCost?: string;
        totalEthCost?: string;
        totalUsdCost?: string;
        platformFee?: string;
        totalTokenCost?: string;
      };
    };
  }>(`/member/transaction/history/find-transaction-history/code/${param0}`, {
    method: 'GET',
    params: {
      // currency has a default value: USD
      currency: 'USD',
      ...queryParams,
    },
    ...(options || {}),
  });
}

/** 分页查询交易历史记录列表 GET /member/transaction/history/page-transaction-history */
export async function getTransactionHistoryPageTransactionHistory(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getTransactionHistoryPageTransactionHistoryParams,
  options?: { [key: string]: any },
) {
  return request<{
    code: string;
    msg: string;
    data?: {
      page?: number;
      pageSize?: number;
      pageCount?: number;
      totalCount?: number;
      record?: {
        transactionCategory?: 'SEND' | 'REQUEST' | 'DEPOSIT' | 'WITHDRAW';
        transactionType?:
          | 'SEND'
          | 'REQUEST'
          | 'DEPOSIT'
          | 'WITHDRAW'
          | 'PAY_LINK'
          | 'QR_CODE'
          | 'REQUEST_LINK'
          | 'REQUEST_QR_CODE';
        business?: 'LINK' | 'VAULT' | 'TRANSFER';
        transactionStatus?: 'PENDING' | 'ACCEPTED' | 'DECLINED';
        platform?: 'ETH' | 'SOLANA';
        network?: 'MAIN' | 'TEST' | 'DEV';
        id?: number;
        createBy?: number;
        updateBy?: number;
        createAt?: string;
        updateAt?: string;
        memberId?: number;
        transactionCode?: string;
        bizContractAddress?: string;
        senderMemberId?: number;
        senderDid?: string;
        senderWalletAddress?: string;
        receiverMemberId?: number;
        receiverDid?: string;
        receiverWalletAddress?: string;
        transactionTime?: string;
        transactionConfirmAt?: string;
        transactionHash?: string;
        chainId?: number;
        tokenSymbol?: string;
        tokenDecimals?: number;
        tokenContractAddress?: string;
        tokenPrice?: string;
        tokenFeeSupport?: boolean;
        amount?: string;
        message?: string;
        currency?: string;
        currencyAmount?: string;
        senderMember: {
          id?: number;
          createBy?: number;
          updateBy?: number;
          createAt?: string;
          updateAt?: string;
          did?: string;
          createdAt?: string;
          nickname?: string;
          avatar?: string;
          memberLinkedAccount?: { type?: string; search?: string }[];
        };
        receiverMember: {
          id?: number;
          createBy?: number;
          updateBy?: number;
          createAt?: string;
          updateAt?: string;
          did?: string;
          createdAt?: string;
          nickname?: string;
          avatar?: string;
          memberLinkedAccount?: { type?: string; search?: string }[];
        };
        networkFee: {
          platform?: 'ETH' | 'SOLANA';
          id?: number;
          createBy?: number;
          updateBy?: number;
          createAt?: string;
          updateAt?: string;
          transactionHistoryId?: number;
          transactionCode?: string;
          chainId?: number;
          ethToUsd?: string;
          tokenSymbol?: string;
          tokenDecimals?: number;
          tokenContractAddress?: string;
          tokenPrice?: string;
          preVerificationGas?: string;
          verificationGasLimit?: string;
          callGasLimit?: string;
          gas?: string;
          gasPrice?: string;
          totalWeiCost?: string;
          totalEthCost?: string;
          totalUsdCost?: string;
          platformFee?: string;
          totalTokenCost?: string;
        };
      }[];
    };
  }>('/member/transaction/history/page-transaction-history', {
    method: 'GET',
    params: {
      // page has a default value: 1
      page: '1',
      // pageSize has a default value: 30
      pageSize: '30',
      // currency has a default value: USD
      currency: 'USD',

      ...params,
    },
    ...(options || {}),
  });
}

/** 分页查询交易历史记录列表 GET /member/transaction/history/page-transaction-history */
export async function getTransactionHistoryPageTransactionHistory2(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getTransactionHistoryPageTransactionHistoryParams,
  options?: { [key: string]: any },
) {
  return request<{
    code: string;
    msg: string;
    data?: {
      page?: number;
      pageSize?: number;
      pageCount?: number;
      totalCount?: number;
      record?: {
        transactionCategory?: 'SEND' | 'REQUEST' | 'DEPOSIT' | 'WITHDRAW';
        transactionType?:
          | 'SEND'
          | 'REQUEST'
          | 'DEPOSIT'
          | 'WITHDRAW'
          | 'PAY_LINK'
          | 'QR_CODE'
          | 'REQUEST_LINK'
          | 'REQUEST_QR_CODE';
        business?: 'LINK' | 'VAULT' | 'TRANSFER';
        transactionStatus?: 'PENDING' | 'ACCEPTED' | 'DECLINED';
        platform?: 'ETH' | 'SOLANA';
        network?: 'MAIN' | 'TEST' | 'DEV';
        id?: number;
        createBy?: number;
        updateBy?: number;
        createAt?: string;
        updateAt?: string;
        memberId?: number;
        transactionCode?: string;
        bizContractAddress?: string;
        senderMemberId?: number;
        senderDid?: string;
        senderWalletAddress?: string;
        receiverMemberId?: number;
        receiverDid?: string;
        receiverWalletAddress?: string;
        transactionTime?: string;
        transactionConfirmAt?: string;
        transactionHash?: string;
        chainId?: number;
        tokenSymbol?: string;
        tokenDecimals?: number;
        tokenContractAddress?: string;
        tokenPrice?: string;
        tokenFeeSupport?: boolean;
        amount?: string;
        message?: string;
        currency?: string;
        currencyAmount?: string;
        senderMember: {
          id?: number;
          createBy?: number;
          updateBy?: number;
          createAt?: string;
          updateAt?: string;
          did?: string;
          createdAt?: string;
          nickname?: string;
          avatar?: string;
          memberLinkedAccount?: { type?: string; search?: string }[];
        };
        receiverMember: {
          id?: number;
          createBy?: number;
          updateBy?: number;
          createAt?: string;
          updateAt?: string;
          did?: string;
          createdAt?: string;
          nickname?: string;
          avatar?: string;
          memberLinkedAccount?: { type?: string; search?: string }[];
        };
        networkFee: {
          platform?: 'ETH' | 'SOLANA';
          id?: number;
          createBy?: number;
          updateBy?: number;
          createAt?: string;
          updateAt?: string;
          transactionHistoryId?: number;
          transactionCode?: string;
          chainId?: number;
          ethToUsd?: string;
          tokenSymbol?: string;
          tokenDecimals?: number;
          tokenContractAddress?: string;
          tokenPrice?: string;
          preVerificationGas?: string;
          verificationGasLimit?: string;
          callGasLimit?: string;
          gas?: string;
          gasPrice?: string;
          totalWeiCost?: string;
          totalEthCost?: string;
          totalUsdCost?: string;
          platformFee?: string;
          totalTokenCost?: string;
        };
      }[];
    };
  }>('/member/transaction/history/page-transaction-history', {
    method: 'GET',
    params: {
      // page has a default value: 1
      page: '1',
      // pageSize has a default value: 30
      pageSize: '30',
      // currency has a default value: USD
      currency: 'USD',

      ...params,
    },
    ...(options || {}),
  });
}

/** 更新交易手续费 POST /member/transaction/history/update-network-fee */
export async function postTransactionHistoryUpdateNetworkFee(
  body: {
    /** 交易码 */
    transactionCode: string;
    /** 代币地址 */
    tokenContractAddress: string;
  },
  options?: { [key: string]: any },
) {
  return request<{
    code: string;
    msg: string;
    data?: {
      platform?: 'ETH' | 'SOLANA';
      id?: number;
      createBy?: number;
      updateBy?: number;
      createAt?: string;
      updateAt?: string;
      transactionHistoryId?: number;
      transactionCode?: string;
      chainId?: number;
      ethToUsd?: string;
      tokenSymbol?: string;
      tokenDecimals?: number;
      tokenContractAddress?: string;
      tokenPrice?: string;
      preVerificationGas?: string;
      verificationGasLimit?: string;
      callGasLimit?: string;
      gas?: string;
      gasPrice?: string;
      totalWeiCost?: string;
      totalEthCost?: string;
      totalUsdCost?: string;
      platformFee?: string;
      totalTokenCost?: string;
    };
  }>('/member/transaction/history/update-network-fee', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新交易手续费 POST /member/transaction/history/update-network-fee */
export async function postTransactionHistoryUpdateNetworkFee2(
  body: {
    /** 交易码 */
    transactionCode: string;
    /** 代币地址 */
    tokenContractAddress: string;
  },
  options?: { [key: string]: any },
) {
  return request<{
    code: string;
    msg: string;
    data?: {
      platform?: 'ETH' | 'SOLANA';
      id?: number;
      createBy?: number;
      updateBy?: number;
      createAt?: string;
      updateAt?: string;
      transactionHistoryId?: number;
      transactionCode?: string;
      chainId?: number;
      ethToUsd?: string;
      tokenSymbol?: string;
      tokenDecimals?: number;
      tokenContractAddress?: string;
      tokenPrice?: string;
      preVerificationGas?: string;
      verificationGasLimit?: string;
      callGasLimit?: string;
      gas?: string;
      gasPrice?: string;
      totalWeiCost?: string;
      totalEthCost?: string;
      totalUsdCost?: string;
      platformFee?: string;
      totalTokenCost?: string;
    };
  }>('/member/transaction/history/update-network-fee', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新交易历史记录的交易哈希 POST /member/transaction/history/update-transaction-hash */
export async function postTransactionHistoryUpdateTransactionHash(
  body: {
    /** 交易历史id */
    id: number;
    /** 交易哈希 */
    transactionHash: string;
  },
  options?: { [key: string]: any },
) {
  return request<{
    code: string;
    msg: string;
    data?: {
      transactionCategory?: 'SEND' | 'REQUEST' | 'DEPOSIT' | 'WITHDRAW';
      transactionType?:
        | 'SEND'
        | 'REQUEST'
        | 'DEPOSIT'
        | 'WITHDRAW'
        | 'PAY_LINK'
        | 'QR_CODE'
        | 'REQUEST_LINK'
        | 'REQUEST_QR_CODE';
      business?: 'LINK' | 'VAULT' | 'TRANSFER';
      transactionStatus?: 'PENDING' | 'ACCEPTED' | 'DECLINED';
      platform?: 'ETH' | 'SOLANA';
      network?: 'MAIN' | 'TEST' | 'DEV';
      id?: number;
      createBy?: number;
      updateBy?: number;
      createAt?: string;
      updateAt?: string;
      memberId?: number;
      transactionCode?: string;
      bizContractAddress?: string;
      senderMemberId?: number;
      senderDid?: string;
      senderWalletAddress?: string;
      receiverMemberId?: number;
      receiverDid?: string;
      receiverWalletAddress?: string;
      transactionTime?: string;
      transactionConfirmAt?: string;
      transactionHash?: string;
      chainId?: number;
      tokenSymbol?: string;
      tokenDecimals?: number;
      tokenContractAddress?: string;
      tokenPrice?: string;
      tokenFeeSupport?: boolean;
      amount?: string;
      message?: string;
      currency?: string;
      currencyAmount?: string;
      senderMember: {
        id?: number;
        createBy?: number;
        updateBy?: number;
        createAt?: string;
        updateAt?: string;
        did?: string;
        createdAt?: string;
        nickname?: string;
        avatar?: string;
        memberLinkedAccount?: { type?: string; search?: string }[];
      };
      receiverMember: {
        id?: number;
        createBy?: number;
        updateBy?: number;
        createAt?: string;
        updateAt?: string;
        did?: string;
        createdAt?: string;
        nickname?: string;
        avatar?: string;
        memberLinkedAccount?: { type?: string; search?: string }[];
      };
      networkFee: {
        platform?: 'ETH' | 'SOLANA';
        id?: number;
        createBy?: number;
        updateBy?: number;
        createAt?: string;
        updateAt?: string;
        transactionHistoryId?: number;
        transactionCode?: string;
        chainId?: number;
        ethToUsd?: string;
        tokenSymbol?: string;
        tokenDecimals?: number;
        tokenContractAddress?: string;
        tokenPrice?: string;
        preVerificationGas?: string;
        verificationGasLimit?: string;
        callGasLimit?: string;
        gas?: string;
        gasPrice?: string;
        totalWeiCost?: string;
        totalEthCost?: string;
        totalUsdCost?: string;
        platformFee?: string;
        totalTokenCost?: string;
      };
    };
  }>('/member/transaction/history/update-transaction-hash', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新交易历史记录的交易哈希 POST /member/transaction/history/update-transaction-hash */
export async function postTransactionHistoryUpdateTransactionHash2(
  body: {
    /** 交易历史id */
    id: number;
    /** 交易哈希 */
    transactionHash: string;
  },
  options?: { [key: string]: any },
) {
  return request<{
    code: string;
    msg: string;
    data?: {
      transactionCategory?: 'SEND' | 'REQUEST' | 'DEPOSIT' | 'WITHDRAW';
      transactionType?:
        | 'SEND'
        | 'REQUEST'
        | 'DEPOSIT'
        | 'WITHDRAW'
        | 'PAY_LINK'
        | 'QR_CODE'
        | 'REQUEST_LINK'
        | 'REQUEST_QR_CODE';
      business?: 'LINK' | 'VAULT' | 'TRANSFER';
      transactionStatus?: 'PENDING' | 'ACCEPTED' | 'DECLINED';
      platform?: 'ETH' | 'SOLANA';
      network?: 'MAIN' | 'TEST' | 'DEV';
      id?: number;
      createBy?: number;
      updateBy?: number;
      createAt?: string;
      updateAt?: string;
      memberId?: number;
      transactionCode?: string;
      bizContractAddress?: string;
      senderMemberId?: number;
      senderDid?: string;
      senderWalletAddress?: string;
      receiverMemberId?: number;
      receiverDid?: string;
      receiverWalletAddress?: string;
      transactionTime?: string;
      transactionConfirmAt?: string;
      transactionHash?: string;
      chainId?: number;
      tokenSymbol?: string;
      tokenDecimals?: number;
      tokenContractAddress?: string;
      tokenPrice?: string;
      tokenFeeSupport?: boolean;
      amount?: string;
      message?: string;
      currency?: string;
      currencyAmount?: string;
      senderMember: {
        id?: number;
        createBy?: number;
        updateBy?: number;
        createAt?: string;
        updateAt?: string;
        did?: string;
        createdAt?: string;
        nickname?: string;
        avatar?: string;
        memberLinkedAccount?: { type?: string; search?: string }[];
      };
      receiverMember: {
        id?: number;
        createBy?: number;
        updateBy?: number;
        createAt?: string;
        updateAt?: string;
        did?: string;
        createdAt?: string;
        nickname?: string;
        avatar?: string;
        memberLinkedAccount?: { type?: string; search?: string }[];
      };
      networkFee: {
        platform?: 'ETH' | 'SOLANA';
        id?: number;
        createBy?: number;
        updateBy?: number;
        createAt?: string;
        updateAt?: string;
        transactionHistoryId?: number;
        transactionCode?: string;
        chainId?: number;
        ethToUsd?: string;
        tokenSymbol?: string;
        tokenDecimals?: number;
        tokenContractAddress?: string;
        tokenPrice?: string;
        preVerificationGas?: string;
        verificationGasLimit?: string;
        callGasLimit?: string;
        gas?: string;
        gasPrice?: string;
        totalWeiCost?: string;
        totalEthCost?: string;
        totalUsdCost?: string;
        platformFee?: string;
        totalTokenCost?: string;
      };
    };
  }>('/member/transaction/history/update-transaction-hash', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
