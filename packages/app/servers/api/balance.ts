// @ts-ignore
/* eslint-disable */
import request from 'app/utils/request';

/** 获取当前用户指定代币余额 GET /member/balance/find-balance */
export async function getBalanceFindBalance(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getBalanceFindBalanceParams,
  options?: { [key: string]: any },
) {
  return request<{
    code: string;
    msg: string;
    data?: {
      currency?: string;
      currencyAmount?: string;
      token: {
        platform?: 'ETH' | 'SOLANA';
        network?: 'MAIN' | 'TEST' | 'DEV';
        erc?: 'ERC20';
        id?: number;
        createBy?: number;
        updateBy?: number;
        createAt?: string;
        updateAt?: string;
        address?: string;
        chainId?: number;
        tokenName?: string;
        tokenSymbol?: string;
        tokenDecimals?: number;
        logo?: string;
        show?: boolean;
        sort?: number;
        priceCurrency?: string;
        priceValue?: string;
        priceUpdateAt?: string;
        priceAutoUpdate?: boolean;
      };
      tokenAmount?: string;
    };
  }>('/member/balance/find-balance', {
    method: 'GET',
    params: {
      // currency has a default value: USD
      currency: 'USD',
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取当前用户指定代币余额 GET /member/balance/find-balance */
export async function getBalanceFindBalance2(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getBalanceFindBalanceParams,
  options?: { [key: string]: any },
) {
  return request<{
    code: string;
    msg: string;
    data?: {
      currency?: string;
      currencyAmount?: string;
      token: {
        platform?: 'ETH' | 'SOLANA';
        network?: 'MAIN' | 'TEST' | 'DEV';
        erc?: 'ERC20';
        id?: number;
        createBy?: number;
        updateBy?: number;
        createAt?: string;
        updateAt?: string;
        address?: string;
        chainId?: number;
        tokenName?: string;
        tokenSymbol?: string;
        tokenDecimals?: number;
        logo?: string;
        show?: boolean;
        sort?: number;
        priceCurrency?: string;
        priceValue?: string;
        priceUpdateAt?: string;
        priceAutoUpdate?: boolean;
      };
      tokenAmount?: string;
    };
  }>('/member/balance/find-balance', {
    method: 'GET',
    params: {
      // currency has a default value: USD
      currency: 'USD',
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取当前用户余额列表 GET /member/balance/list-balance */
export async function getBalanceListBalance(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getBalanceListBalanceParams,
  options?: { [key: string]: any },
) {
  return request<{
    code: string;
    msg: string;
    data?: {
      summary: { currency?: string; balance?: string };
      tokens?: {
        currency?: string;
        currencyAmount?: string;
        token: {
          platform?: 'ETH' | 'SOLANA';
          network?: 'MAIN' | 'TEST' | 'DEV';
          erc?: 'ERC20';
          id?: number;
          createBy?: number;
          updateBy?: number;
          createAt?: string;
          updateAt?: string;
          address?: string;
          chainId?: number;
          tokenName?: string;
          tokenSymbol?: string;
          tokenDecimals?: number;
          logo?: string;
          show?: boolean;
          sort?: number;
          priceCurrency?: string;
          priceValue?: string;
          priceUpdateAt?: string;
          priceAutoUpdate?: boolean;
        };
        tokenAmount?: string;
      }[];
    };
  }>('/member/balance/list-balance', {
    method: 'GET',
    params: {
      // currency has a default value: USD
      currency: 'USD',
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取当前用户余额列表 GET /member/balance/list-balance */
export async function getBalanceListBalance2(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getBalanceListBalanceParams,
  options?: { [key: string]: any },
) {
  return request<{
    code: string;
    msg: string;
    data?: {
      summary: { currency?: string; balance?: string };
      tokens?: {
        currency?: string;
        currencyAmount?: string;
        token: {
          platform?: 'ETH' | 'SOLANA';
          network?: 'MAIN' | 'TEST' | 'DEV';
          erc?: 'ERC20';
          id?: number;
          createBy?: number;
          updateBy?: number;
          createAt?: string;
          updateAt?: string;
          address?: string;
          chainId?: number;
          tokenName?: string;
          tokenSymbol?: string;
          tokenDecimals?: number;
          logo?: string;
          show?: boolean;
          sort?: number;
          priceCurrency?: string;
          priceValue?: string;
          priceUpdateAt?: string;
          priceAutoUpdate?: boolean;
        };
        tokenAmount?: string;
      }[];
    };
  }>('/member/balance/list-balance', {
    method: 'GET',
    params: {
      // currency has a default value: USD
      currency: 'USD',
      ...params,
    },
    ...(options || {}),
  });
}
