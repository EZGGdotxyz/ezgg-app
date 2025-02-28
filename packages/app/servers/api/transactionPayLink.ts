// @ts-ignore
/* eslint-disable */
import request from 'app/utils/request';

/** 创建PayLink POST /member/transaction/pay-link/create-pay-link */
export async function postTransactionPayLinkCreatePayLink(
  body: {
    /** 交易编号 */
    transactionCode: string;
  },
  options?: { [key: string]: any },
) {
  return request<{
    code: string;
    msg: string;
    data?: {
      transactionCode?: string;
      platform?: 'ETH' | 'SOLANA';
      chainId?: number;
      tokenContractAddress?: string;
      senderWalletAddress?: string;
      bizContractAddress?: string;
      otp?: string;
    };
  }>('/member/transaction/pay-link/create-pay-link', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 创建PayLink POST /member/transaction/pay-link/create-pay-link */
export async function postTransactionPayLinkCreatePayLink2(
  body: {
    /** 交易编号 */
    transactionCode: string;
  },
  options?: { [key: string]: any },
) {
  return request<{
    code: string;
    msg: string;
    data?: {
      transactionCode?: string;
      platform?: 'ETH' | 'SOLANA';
      chainId?: number;
      tokenContractAddress?: string;
      senderWalletAddress?: string;
      bizContractAddress?: string;
      otp?: string;
    };
  }>('/member/transaction/pay-link/create-pay-link', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取PayLink POST /member/transaction/pay-link/find-pay-link */
export async function postTransactionPayLinkFindPayLink(
  body: {
    /** 交易编号 */
    transactionCode: string;
  },
  options?: { [key: string]: any },
) {
  return request<{
    code: string;
    msg: string;
    data?: {
      transactionCode?: string;
      platform?: 'ETH' | 'SOLANA';
      chainId?: number;
      tokenContractAddress?: string;
      senderWalletAddress?: string;
      bizContractAddress?: string;
      otp?: string;
    };
  }>('/member/transaction/pay-link/find-pay-link', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取PayLink POST /member/transaction/pay-link/find-pay-link */
export async function postTransactionPayLinkFindPayLink2(
  body: {
    /** 交易编号 */
    transactionCode: string;
  },
  options?: { [key: string]: any },
) {
  return request<{
    code: string;
    msg: string;
    data?: {
      transactionCode?: string;
      platform?: 'ETH' | 'SOLANA';
      chainId?: number;
      tokenContractAddress?: string;
      senderWalletAddress?: string;
      bizContractAddress?: string;
      otp?: string;
    };
  }>('/member/transaction/pay-link/find-pay-link', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新PayLink的交易哈希 POST /member/transaction/pay-link/update-transaction-hash */
export async function postTransactionPayLinkUpdateTransactionHash(
  body: {
    /** 交易编号 */
    transactionCode: string;
    /** 交易哈希 */
    transactionHash: string;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: string; msg: string }>(
    '/member/transaction/pay-link/update-transaction-hash',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}

/** 更新PayLink的交易哈希 POST /member/transaction/pay-link/update-transaction-hash */
export async function postTransactionPayLinkUpdateTransactionHash2(
  body: {
    /** 交易编号 */
    transactionCode: string;
    /** 交易哈希 */
    transactionHash: string;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: string; msg: string }>(
    '/member/transaction/pay-link/update-transaction-hash',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}
