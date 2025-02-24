// @ts-ignore
/* eslint-disable */
import request from 'app/utils/request';

/** 获取餐厅预充值余额 GET /resturant/wallet/pre-recharge/get-balance */
export async function resturantWalletPreRechargeRouterGetBalance(options?: { [key: string]: any }) {
  return request<{ balance: number }>('/resturant/wallet/pre-recharge/get-balance', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取餐厅预充值余额 GET /resturant/wallet/pre-recharge/get-balance */
export async function resturantWalletPreRechargeRouterGetBalance2(options?: {
  [key: string]: any;
}) {
  return request<{ balance: number }>('/resturant/wallet/pre-recharge/get-balance', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取当前餐厅预充值交易记录 GET /resturant/wallet/pre-recharge/page-transation */
export async function resturantWalletPreRechargeRouterPageTransation(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.resturantWalletPreRechargeRouterPageTransationParams,
  options?: { [key: string]: any },
) {
  return request<{
    page: number;
    pageSize: number;
    pageCount: number;
    totalCount: number;
    record: {
      walletType?: 'MEMBER_POINTS' | 'RESTAUARNT_PRE_RECHARGE';
      ownerType?: 'MEMBER' | 'RESTAUARNT' | 'PLATFORM';
      balanceType?: 'CONSUMABLE';
      transationDirection?: 'DEBIT' | 'CREDIT';
      id?: number;
      createBy?: number;
      updateBy?: number;
      createAt?: string;
      updateAt?: string;
      deleteAt?: number;
      walletAccountId?: number;
      ownerId?: number;
      rounding?: number;
      walletBalanceId?: number;
      subject?: string;
      amount?: number;
      balanceBefore?: number;
      balanceAfter?: number;
      remark?: string;
      remarkEn?: string;
      remarkI18n?: boolean;
      voucherType?: string;
      voucher?: string;
    }[];
  }>('/resturant/wallet/pre-recharge/page-transation', {
    method: 'GET',
    params: {
      // page has a default value: 1
      page: '1',
      // pageSize has a default value: 30
      pageSize: '30',
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取当前餐厅预充值交易记录 GET /resturant/wallet/pre-recharge/page-transation */
export async function resturantWalletPreRechargeRouterPageTransation2(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.resturantWalletPreRechargeRouterPageTransationParams,
  options?: { [key: string]: any },
) {
  return request<{
    page: number;
    pageSize: number;
    pageCount: number;
    totalCount: number;
    record: {
      walletType?: 'MEMBER_POINTS' | 'RESTAUARNT_PRE_RECHARGE';
      ownerType?: 'MEMBER' | 'RESTAUARNT' | 'PLATFORM';
      balanceType?: 'CONSUMABLE';
      transationDirection?: 'DEBIT' | 'CREDIT';
      id?: number;
      createBy?: number;
      updateBy?: number;
      createAt?: string;
      updateAt?: string;
      deleteAt?: number;
      walletAccountId?: number;
      ownerId?: number;
      rounding?: number;
      walletBalanceId?: number;
      subject?: string;
      amount?: number;
      balanceBefore?: number;
      balanceAfter?: number;
      remark?: string;
      remarkEn?: string;
      remarkI18n?: boolean;
      voucherType?: string;
      voucher?: string;
    }[];
  }>('/resturant/wallet/pre-recharge/page-transation', {
    method: 'GET',
    params: {
      // page has a default value: 1
      page: '1',
      // pageSize has a default value: 30
      pageSize: '30',
      ...params,
    },
    ...(options || {}),
  });
}
