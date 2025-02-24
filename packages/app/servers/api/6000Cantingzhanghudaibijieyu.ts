// @ts-ignore
/* eslint-disable */
import request from 'app/utils/request';

/** 获取餐厅代币余额 GET /resturant/wallet/points/get-balance */
export async function resturantWalletPointsRouterGetBalance(options?: { [key: string]: any }) {
  return request<{ balance: number }>('/resturant/wallet/points/get-balance', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取餐厅代币余额 GET /resturant/wallet/points/get-balance */
export async function resturantWalletPointsRouterGetBalance2(options?: { [key: string]: any }) {
  return request<{ balance: number }>('/resturant/wallet/points/get-balance', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取当前餐厅代币交易记录 GET /resturant/wallet/points/page-transation */
export async function resturantWalletPointsRouterPageTransation(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.resturantWalletPointsRouterPageTransationParams,
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
  }>('/resturant/wallet/points/page-transation', {
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

/** 获取当前餐厅代币交易记录 GET /resturant/wallet/points/page-transation */
export async function resturantWalletPointsRouterPageTransation2(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.resturantWalletPointsRouterPageTransationParams,
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
  }>('/resturant/wallet/points/page-transation', {
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
