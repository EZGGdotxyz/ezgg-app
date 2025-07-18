// @ts-ignore
/* eslint-disable */
import request from 'app/utils/request';

/** 同步智能钱包地址 GET /member/user/find-smart-wallet-address */
export async function getUserFindSmartWalletAddress(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserFindSmartWalletAddressParams,
  options?: { [key: string]: any },
) {
  return request<{ code: string; msg: string; data?: string }>(
    '/member/user/find-smart-wallet-address',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 同步智能钱包地址 GET /member/user/find-smart-wallet-address */
export async function getUserFindSmartWalletAddress2(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserFindSmartWalletAddressParams,
  options?: { [key: string]: any },
) {
  return request<{ code: string; msg: string; data?: string }>(
    '/member/user/find-smart-wallet-address',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 获取当前登录用户信息 GET /member/user/find-user */
export async function getUserFindUser(options?: { [key: string]: any }) {
  return request<{ code: string; msg: string; data?: any }>('/member/user/find-user', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取当前登录用户信息 GET /member/user/find-user */
export async function getUserFindUser2(options?: { [key: string]: any }) {
  return request<{ code: string; msg: string; data?: any }>('/member/user/find-user', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取用户信息 GET /member/user/find-user/id/${param0} */
export async function getUserFindUserIdId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserFindUserIdIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<{
    code: string;
    msg: string;
    data?: {
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
  }>(`/member/user/find-user/id/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取用户信息 GET /member/user/find-user/id/${param0} */
export async function getUserFindUserIdId2(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserFindUserIdIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<{
    code: string;
    msg: string;
    data?: {
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
  }>(`/member/user/find-user/id/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 分页查询会员列表 GET /member/user/page-member */
export async function getUserPageMember(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserPageMemberParams,
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
      }[];
    };
  }>('/member/user/page-member', {
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

/** 分页查询会员列表 GET /member/user/page-member */
export async function getUserPageMember2(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserPageMemberParams,
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
      }[];
    };
  }>('/member/user/page-member', {
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

/** 同步绑定账号信息 POST /member/user/sync-linked-accounts */
export async function postUserSyncLinkedAccounts(options?: { [key: string]: any }) {
  return request<{ code: string; msg: string }>('/member/user/sync-linked-accounts', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 同步绑定账号信息 POST /member/user/sync-linked-accounts */
export async function postUserSyncLinkedAccounts2(options?: { [key: string]: any }) {
  return request<{ code: string; msg: string }>('/member/user/sync-linked-accounts', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 更新会员信息 POST /member/user/update-member */
export async function postUserUpdateMember(
  body: {
    /** 昵称 */
    nickname?: string;
    /** 头像地址 */
    avatar?: string;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: string; msg: string }>('/member/user/update-member', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新会员信息 POST /member/user/update-member */
export async function postUserUpdateMember2(
  body: {
    /** 昵称 */
    nickname?: string;
    /** 头像地址 */
    avatar?: string;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: string; msg: string }>('/member/user/update-member', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 同步智能钱包地址 POST /member/user/update-member-smart-wallet */
export async function postUserUpdateMemberSmartWallet(
  body: {
    smartWallet: { platform?: 'ETH' | 'SOLANA'; chainId?: number; address?: string }[];
  },
  options?: { [key: string]: any },
) {
  return request<{ code: string; msg: string }>('/member/user/update-member-smart-wallet', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 同步智能钱包地址 POST /member/user/update-member-smart-wallet */
export async function postUserUpdateMemberSmartWallet2(
  body: {
    smartWallet: { platform?: 'ETH' | 'SOLANA'; chainId?: number; address?: string }[];
  },
  options?: { [key: string]: any },
) {
  return request<{ code: string; msg: string }>('/member/user/update-member-smart-wallet', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
