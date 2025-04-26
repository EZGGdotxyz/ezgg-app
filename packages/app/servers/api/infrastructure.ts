// @ts-ignore
/* eslint-disable */
import request from 'app/utils/request';

/** 获取区块链列表 GET /member/infrastructure/list-blockchain */
export async function getInfrastructureListBlockchain(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getInfrastructureListBlockchainParams,
  options?: { [key: string]: any },
) {
  return request<{
    code: string;
    msg: string;
    data?: {
      platform?: 'ETH' | 'SOLANA';
      network?: 'MAIN' | 'TEST' | 'DEV';
      smartWalletType?: 'PRIVY' | 'BICONOMY';
      id?: number;
      createBy?: number;
      updateBy?: number;
      createAt?: string;
      updateAt?: string;
      chainId?: number;
      name?: string;
      show?: boolean;
      sort?: number;
      alchemyNetwork?: string;
      tokenSymbol?: string;
    }[];
  }>('/member/infrastructure/list-blockchain', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取区块链列表 GET /member/infrastructure/list-blockchain */
export async function getInfrastructureListBlockchain2(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getInfrastructureListBlockchainParams,
  options?: { [key: string]: any },
) {
  return request<{
    code: string;
    msg: string;
    data?: {
      platform?: 'ETH' | 'SOLANA';
      network?: 'MAIN' | 'TEST' | 'DEV';
      smartWalletType?: 'PRIVY' | 'BICONOMY';
      id?: number;
      createBy?: number;
      updateBy?: number;
      createAt?: string;
      updateAt?: string;
      chainId?: number;
      name?: string;
      show?: boolean;
      sort?: number;
      alchemyNetwork?: string;
      tokenSymbol?: string;
    }[];
  }>('/member/infrastructure/list-blockchain', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取业务合约列表 GET /member/infrastructure/list-business-contract */
export async function getInfrastructureListBusinessContract(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getInfrastructureListBusinessContractParams,
  options?: { [key: string]: any },
) {
  return request<{
    code: string;
    msg: string;
    data?: {
      platform?: 'ETH' | 'SOLANA';
      network?: 'MAIN' | 'TEST' | 'DEV';
      business?: 'LINK' | 'VAULT' | 'TRANSFER';
      id?: number;
      createBy?: number;
      updateBy?: number;
      createAt?: string;
      updateAt?: string;
      address?: string;
      chainId?: number;
      enabled?: boolean;
      ver?: number;
    }[];
  }>('/member/infrastructure/list-business-contract', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取业务合约列表 GET /member/infrastructure/list-business-contract */
export async function getInfrastructureListBusinessContract2(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getInfrastructureListBusinessContractParams,
  options?: { [key: string]: any },
) {
  return request<{
    code: string;
    msg: string;
    data?: {
      platform?: 'ETH' | 'SOLANA';
      network?: 'MAIN' | 'TEST' | 'DEV';
      business?: 'LINK' | 'VAULT' | 'TRANSFER';
      id?: number;
      createBy?: number;
      updateBy?: number;
      createAt?: string;
      updateAt?: string;
      address?: string;
      chainId?: number;
      enabled?: boolean;
      ver?: number;
    }[];
  }>('/member/infrastructure/list-business-contract', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取代币合约列表 GET /member/infrastructure/list-token-contract */
export async function getInfrastructureListTokenContract(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getInfrastructureListTokenContractParams,
  options?: { [key: string]: any },
) {
  return request<{
    code: string;
    msg: string;
    data?: {
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
      feeSupport?: boolean;
    }[];
  }>('/member/infrastructure/list-token-contract', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取代币合约列表 GET /member/infrastructure/list-token-contract */
export async function getInfrastructureListTokenContract2(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getInfrastructureListTokenContractParams,
  options?: { [key: string]: any },
) {
  return request<{
    code: string;
    msg: string;
    data?: {
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
      feeSupport?: boolean;
    }[];
  }>('/member/infrastructure/list-token-contract', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
