// @ts-ignore
/* eslint-disable */
import request from 'app/utils/request';

/** 邀请码绑定礼物 POST /referral/invite-code/bind-gift */
export async function inviteCodeRouterBindGift(
  body: {
    /** 邀请码id */
    inviteCodeId: number;
    /** 礼物id */
    giftId?: number;
    /** 礼物数量 */
    giftAmount?: number;
  },
  options?: { [key: string]: any },
) {
  return request<string>('/referral/invite-code/bind-gift', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 邀请码绑定礼物 POST /referral/invite-code/bind-gift */
export async function inviteCodeRouterBindGift2(
  body: {
    /** 邀请码id */
    inviteCodeId: number;
    /** 礼物id */
    giftId?: number;
    /** 礼物数量 */
    giftAmount?: number;
  },
  options?: { [key: string]: any },
) {
  return request<string>('/referral/invite-code/bind-gift', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 创建邀请码 POST /referral/invite-code/create-invite-code */
export async function inviteCodeRouterCreateInviteCode(
  body: {
    /** 备注信息 */
    remark?: string;
    /** 推荐人 */
    staffName?: string;
    /** 过期时间 */
    expireAt?: string;
  },
  options?: { [key: string]: any },
) {
  return request<{
    operatorType: 'ADMIN' | 'RESTAUARNT' | 'CUSTOMER';
    id: number;
    createBy: number;
    updateBy: number;
    createAt: string;
    updateAt: string;
    deleteAt: number;
    operatorId: number;
    brandId: number;
    restaurantId: number;
    code: string;
    base64: string;
    expireAt: string;
    enabled: boolean;
    invitees: number;
    inviteBonus: number;
    remark: string;
    staffName: string;
  }>('/referral/invite-code/create-invite-code', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 创建邀请码 POST /referral/invite-code/create-invite-code */
export async function inviteCodeRouterCreateInviteCode2(
  body: {
    /** 备注信息 */
    remark?: string;
    /** 推荐人 */
    staffName?: string;
    /** 过期时间 */
    expireAt?: string;
  },
  options?: { [key: string]: any },
) {
  return request<{
    operatorType: 'ADMIN' | 'RESTAUARNT' | 'CUSTOMER';
    id: number;
    createBy: number;
    updateBy: number;
    createAt: string;
    updateAt: string;
    deleteAt: number;
    operatorId: number;
    brandId: number;
    restaurantId: number;
    code: string;
    base64: string;
    expireAt: string;
    enabled: boolean;
    invitees: number;
    inviteBonus: number;
    remark: string;
    staffName: string;
  }>('/referral/invite-code/create-invite-code', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除邀请码 POST /referral/invite-code/delete-invite-code/${param0} */
export async function inviteCodeRouterDeleteInviteCode(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.inviteCodeRouterDeleteInviteCodeParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<{
    operatorType: 'ADMIN' | 'RESTAUARNT' | 'CUSTOMER';
    id: number;
    createBy: number;
    updateBy: number;
    createAt: string;
    updateAt: string;
    deleteAt: number;
    operatorId: number;
    brandId: number;
    restaurantId: number;
    code: string;
    base64: string;
    expireAt: string;
    enabled: boolean;
    invitees: number;
    inviteBonus: number;
    remark: string;
    staffName: string;
  }>(`/referral/invite-code/delete-invite-code/${param0}`, {
    method: 'POST',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 删除邀请码 POST /referral/invite-code/delete-invite-code/${param0} */
export async function inviteCodeRouterDeleteInviteCode2(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.inviteCodeRouterDeleteInviteCodeParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<{
    operatorType: 'ADMIN' | 'RESTAUARNT' | 'CUSTOMER';
    id: number;
    createBy: number;
    updateBy: number;
    createAt: string;
    updateAt: string;
    deleteAt: number;
    operatorId: number;
    brandId: number;
    restaurantId: number;
    code: string;
    base64: string;
    expireAt: string;
    enabled: boolean;
    invitees: number;
    inviteBonus: number;
    remark: string;
    staffName: string;
  }>(`/referral/invite-code/delete-invite-code/${param0}`, {
    method: 'POST',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取邀请码详情 GET /referral/invite-code/find-invite-code/${param0} */
export async function inviteCodeRouterFindInviteCode(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.inviteCodeRouterFindInviteCodeParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<{
    operatorType: 'ADMIN' | 'RESTAUARNT' | 'CUSTOMER';
    id: number;
    createBy: number;
    updateBy: number;
    createAt: string;
    updateAt: string;
    deleteAt: number;
    operatorId: number;
    brandId: number;
    restaurantId: number;
    code: string;
    base64: string;
    expireAt: string;
    enabled: boolean;
    invitees: number;
    inviteBonus: number;
    remark: string;
    staffName: string;
    gift?: {
      type?: 'LUCKY_DRAW' | 'SIGN_IN';
      category?: 'DISCOUNT' | 'DESSERT' | 'FOOD' | 'BEVERAGE';
      id?: number;
      createBy?: number;
      updateBy?: number;
      createAt?: string;
      updateAt?: string;
      deleteAt?: number;
      brandId?: number;
      name?: string;
      en_name?: string;
      price?: string;
      photo?: string;
      description?: string;
      en_description?: string;
      isExchange?: boolean;
      exchangeCost?: any;
    };
    giftAmount?: number;
  }>(`/referral/invite-code/find-invite-code/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取邀请码详情 GET /referral/invite-code/find-invite-code/${param0} */
export async function inviteCodeRouterFindInviteCode2(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.inviteCodeRouterFindInviteCodeParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<{
    operatorType: 'ADMIN' | 'RESTAUARNT' | 'CUSTOMER';
    id: number;
    createBy: number;
    updateBy: number;
    createAt: string;
    updateAt: string;
    deleteAt: number;
    operatorId: number;
    brandId: number;
    restaurantId: number;
    code: string;
    base64: string;
    expireAt: string;
    enabled: boolean;
    invitees: number;
    inviteBonus: number;
    remark: string;
    staffName: string;
    gift?: {
      type?: 'LUCKY_DRAW' | 'SIGN_IN';
      category?: 'DISCOUNT' | 'DESSERT' | 'FOOD' | 'BEVERAGE';
      id?: number;
      createBy?: number;
      updateBy?: number;
      createAt?: string;
      updateAt?: string;
      deleteAt?: number;
      brandId?: number;
      name?: string;
      en_name?: string;
      price?: string;
      photo?: string;
      description?: string;
      en_description?: string;
      isExchange?: boolean;
      exchangeCost?: any;
    };
    giftAmount?: number;
  }>(`/referral/invite-code/find-invite-code/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取邀请码详情 GET /referral/invite-code/page-invite-code */
export async function inviteCodeRouterPageInviteCode(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.inviteCodeRouterPageInviteCodeParams,
  options?: { [key: string]: any },
) {
  return request<{
    page: number;
    pageSize: number;
    pageCount: number;
    totalCount: number;
    record: {
      operatorType?: 'ADMIN' | 'RESTAUARNT' | 'CUSTOMER';
      id?: number;
      createBy?: number;
      updateBy?: number;
      createAt?: string;
      updateAt?: string;
      deleteAt?: number;
      operatorId?: number;
      brandId?: number;
      restaurantId?: number;
      code?: string;
      base64?: string;
      expireAt?: string;
      enabled?: boolean;
      invitees?: number;
      inviteBonus?: number;
      remark?: string;
      staffName?: string;
      gift: {
        type?: 'LUCKY_DRAW' | 'SIGN_IN';
        category?: 'DISCOUNT' | 'DESSERT' | 'FOOD' | 'BEVERAGE';
        id?: number;
        createBy?: number;
        updateBy?: number;
        createAt?: string;
        updateAt?: string;
        deleteAt?: number;
        brandId?: number;
        name?: string;
        en_name?: string;
        price?: string;
        photo?: string;
        description?: string;
        en_description?: string;
        isExchange?: boolean;
        exchangeCost?: any;
      };
      giftAmount?: number;
    }[];
  }>('/referral/invite-code/page-invite-code', {
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

/** 获取邀请码详情 GET /referral/invite-code/page-invite-code */
export async function inviteCodeRouterPageInviteCode2(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.inviteCodeRouterPageInviteCodeParams,
  options?: { [key: string]: any },
) {
  return request<{
    page: number;
    pageSize: number;
    pageCount: number;
    totalCount: number;
    record: {
      operatorType?: 'ADMIN' | 'RESTAUARNT' | 'CUSTOMER';
      id?: number;
      createBy?: number;
      updateBy?: number;
      createAt?: string;
      updateAt?: string;
      deleteAt?: number;
      operatorId?: number;
      brandId?: number;
      restaurantId?: number;
      code?: string;
      base64?: string;
      expireAt?: string;
      enabled?: boolean;
      invitees?: number;
      inviteBonus?: number;
      remark?: string;
      staffName?: string;
      gift: {
        type?: 'LUCKY_DRAW' | 'SIGN_IN';
        category?: 'DISCOUNT' | 'DESSERT' | 'FOOD' | 'BEVERAGE';
        id?: number;
        createBy?: number;
        updateBy?: number;
        createAt?: string;
        updateAt?: string;
        deleteAt?: number;
        brandId?: number;
        name?: string;
        en_name?: string;
        price?: string;
        photo?: string;
        description?: string;
        en_description?: string;
        isExchange?: boolean;
        exchangeCost?: any;
      };
      giftAmount?: number;
    }[];
  }>('/referral/invite-code/page-invite-code', {
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

/** 更新邀请码 POST /referral/invite-code/update-invite-code/${param0} */
export async function inviteCodeRouterUpdateInviteCode(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.inviteCodeRouterUpdateInviteCodeParams,
  body: {
    /** 备注信息 */
    remark?: string;
    /** 推荐人 */
    staffName?: string;
    /** 过期时间 */
    expireAt?: string;
    /** 是否启用：true 是，false 否 */
    enabled: boolean;
  },
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/referral/invite-code/update-invite-code/${param0}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 更新邀请码 POST /referral/invite-code/update-invite-code/${param0} */
export async function inviteCodeRouterUpdateInviteCode2(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.inviteCodeRouterUpdateInviteCodeParams,
  body: {
    /** 备注信息 */
    remark?: string;
    /** 推荐人 */
    staffName?: string;
    /** 过期时间 */
    expireAt?: string;
    /** 是否启用：true 是，false 否 */
    enabled: boolean;
  },
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/referral/invite-code/update-invite-code/${param0}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}
