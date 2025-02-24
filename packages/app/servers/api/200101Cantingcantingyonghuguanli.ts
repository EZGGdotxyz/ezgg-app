// @ts-ignore
/* eslint-disable */
import request from 'app/utils/request';

/** 创建餐厅用户（默认密码123456，默认非品牌主账号） POST /restaurant/user/manage/create */
export async function restaurantUserManageRouterCreateRestaurantUser(
  body: {
    /** 用户名 */
    userName: string;
    /** 手机号区域代码 */
    phoneAreaCode: string;
    /** 手机号 */
    phone: string;
    /** 账号 */
    account: string;
    /** 昵称 */
    nickname?: string;
    /** 性别 */
    gender?: string;
    /** 头像URL地址 */
    avatar?: string;
    /** 所属角色，多个角色以，隔开 */
    roles?: string;
    /** 账户是否可用 */
    isEnabled: boolean;
    /** 账号不可用原因 */
    disabledReason?: string;
  },
  options?: { [key: string]: any },
) {
  return request<boolean>('/restaurant/user/manage/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 创建餐厅用户（默认密码123456，默认非品牌主账号） POST /restaurant/user/manage/create */
export async function restaurantUserManageRouterCreateRestaurantUser2(
  body: {
    /** 用户名 */
    userName: string;
    /** 手机号区域代码 */
    phoneAreaCode: string;
    /** 手机号 */
    phone: string;
    /** 账号 */
    account: string;
    /** 昵称 */
    nickname?: string;
    /** 性别 */
    gender?: string;
    /** 头像URL地址 */
    avatar?: string;
    /** 所属角色，多个角色以，隔开 */
    roles?: string;
    /** 账户是否可用 */
    isEnabled: boolean;
    /** 账号不可用原因 */
    disabledReason?: string;
  },
  options?: { [key: string]: any },
) {
  return request<boolean>('/restaurant/user/manage/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据Id删除餐厅用户 POST /restaurant/user/manage/delete/${param0} */
export async function restaurantUserManageRouterDeleteRestaurantUserById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.restaurantUserManageRouterDeleteRestaurantUserByIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<boolean>(`/restaurant/user/manage/delete/${param0}`, {
    method: 'POST',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 根据Id删除餐厅用户 POST /restaurant/user/manage/delete/${param0} */
export async function restaurantUserManageRouterDeleteRestaurantUserById2(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.restaurantUserManageRouterDeleteRestaurantUserByIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<boolean>(`/restaurant/user/manage/delete/${param0}`, {
    method: 'POST',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 根据Id获取餐厅用户详情 GET /restaurant/user/manage/get/${param0} */
export async function restaurantUserManageRouterGetRestaurantUserById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.restaurantUserManageRouterGetRestaurantUserByIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<{
    id: number;
    createBy: number;
    updateBy: number;
    createAt: string;
    updateAt: string;
    deleteAt: number;
    brandId: number;
    restaurantId: number;
    userName: string;
    phoneAreaCode: string;
    phone: string;
    account: string;
    nickname: string;
    gender: string;
    avatar: string;
    roles: string;
    isBrandMain: boolean;
    isEnabled: boolean;
    disabledReason: string;
  }>(`/restaurant/user/manage/get/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 根据Id获取餐厅用户详情 GET /restaurant/user/manage/get/${param0} */
export async function restaurantUserManageRouterGetRestaurantUserById2(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.restaurantUserManageRouterGetRestaurantUserByIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<{
    id: number;
    createBy: number;
    updateBy: number;
    createAt: string;
    updateAt: string;
    deleteAt: number;
    brandId: number;
    restaurantId: number;
    userName: string;
    phoneAreaCode: string;
    phone: string;
    account: string;
    nickname: string;
    gender: string;
    avatar: string;
    roles: string;
    isBrandMain: boolean;
    isEnabled: boolean;
    disabledReason: string;
  }>(`/restaurant/user/manage/get/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取当前登陆品牌下的餐厅用户列表 GET /restaurant/user/manage/list */
export async function restaurantUserManageRouterListRestaurantUsers(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.restaurantUserManageRouterListRestaurantUsersParams,
  options?: { [key: string]: any },
) {
  return request<
    {
      id?: number;
      createBy?: number;
      updateBy?: number;
      createAt?: string;
      updateAt?: string;
      deleteAt?: number;
      brandId?: number;
      restaurantId?: number;
      userName?: string;
      phoneAreaCode?: string;
      phone?: string;
      account?: string;
      nickname?: string;
      gender?: string;
      avatar?: string;
      roles?: string;
      isBrandMain?: boolean;
      isEnabled?: boolean;
      disabledReason?: string;
    }[]
  >('/restaurant/user/manage/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取当前登陆品牌下的餐厅用户列表 GET /restaurant/user/manage/list */
export async function restaurantUserManageRouterListRestaurantUsers2(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.restaurantUserManageRouterListRestaurantUsersParams,
  options?: { [key: string]: any },
) {
  return request<
    {
      id?: number;
      createBy?: number;
      updateBy?: number;
      createAt?: string;
      updateAt?: string;
      deleteAt?: number;
      brandId?: number;
      restaurantId?: number;
      userName?: string;
      phoneAreaCode?: string;
      phone?: string;
      account?: string;
      nickname?: string;
      gender?: string;
      avatar?: string;
      roles?: string;
      isBrandMain?: boolean;
      isEnabled?: boolean;
      disabledReason?: string;
    }[]
  >('/restaurant/user/manage/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取当前登陆品牌下的餐厅用户分页 GET /restaurant/user/manage/page */
export async function restaurantUserManageRouterPageRestaurantUsers(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.restaurantUserManageRouterPageRestaurantUsersParams,
  options?: { [key: string]: any },
) {
  return request<{
    page: number;
    pageSize: number;
    pageCount: number;
    totalCount: number;
    record: {
      id?: number;
      createBy?: number;
      updateBy?: number;
      createAt?: string;
      updateAt?: string;
      deleteAt?: number;
      brandId?: number;
      restaurantId?: number;
      userName?: string;
      phoneAreaCode?: string;
      phone?: string;
      account?: string;
      nickname?: string;
      gender?: string;
      avatar?: string;
      roles?: string;
      isBrandMain?: boolean;
      isEnabled?: boolean;
      disabledReason?: string;
    }[];
  }>('/restaurant/user/manage/page', {
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

/** 获取当前登陆品牌下的餐厅用户分页 GET /restaurant/user/manage/page */
export async function restaurantUserManageRouterPageRestaurantUsers2(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.restaurantUserManageRouterPageRestaurantUsersParams,
  options?: { [key: string]: any },
) {
  return request<{
    page: number;
    pageSize: number;
    pageCount: number;
    totalCount: number;
    record: {
      id?: number;
      createBy?: number;
      updateBy?: number;
      createAt?: string;
      updateAt?: string;
      deleteAt?: number;
      brandId?: number;
      restaurantId?: number;
      userName?: string;
      phoneAreaCode?: string;
      phone?: string;
      account?: string;
      nickname?: string;
      gender?: string;
      avatar?: string;
      roles?: string;
      isBrandMain?: boolean;
      isEnabled?: boolean;
      disabledReason?: string;
    }[];
  }>('/restaurant/user/manage/page', {
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

/** 根据Id更新餐厅用户 POST /restaurant/user/manage/update/${param0} */
export async function restaurantUserManageRouterUpdateRestaurantUserById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.restaurantUserManageRouterUpdateRestaurantUserByIdParams,
  body: {
    updateData: {
      userName?: string;
      phoneAreaCode?: string;
      phone?: string;
      account?: string;
      nickname?: string;
      gender?: string;
      avatar?: string;
      roles?: string;
      isEnabled?: boolean;
      disabledReason?: string;
    };
  },
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<boolean>(`/restaurant/user/manage/update/${param0}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 根据Id更新餐厅用户 POST /restaurant/user/manage/update/${param0} */
export async function restaurantUserManageRouterUpdateRestaurantUserById2(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.restaurantUserManageRouterUpdateRestaurantUserByIdParams,
  body: {
    updateData: {
      userName?: string;
      phoneAreaCode?: string;
      phone?: string;
      account?: string;
      nickname?: string;
      gender?: string;
      avatar?: string;
      roles?: string;
      isEnabled?: boolean;
      disabledReason?: string;
    };
  },
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<boolean>(`/restaurant/user/manage/update/${param0}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}
