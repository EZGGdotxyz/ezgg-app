// @ts-ignore
/* eslint-disable */
import request from 'app/utils/request';

/** 根据Id删除餐厅用户 POST /restaurant/user/delete/${param0} */
export async function restaurantUserRouterDeleteRestaurantUserById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.restaurantUserRouterDeleteRestaurantUserByIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<boolean>(`/restaurant/user/delete/${param0}`, {
    method: 'POST',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 根据Id删除餐厅用户 POST /restaurant/user/delete/${param0} */
export async function restaurantUserRouterDeleteRestaurantUserById2(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.restaurantUserRouterDeleteRestaurantUserByIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<boolean>(`/restaurant/user/delete/${param0}`, {
    method: 'POST',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取登陆用户餐厅品牌完整信息 GET /restaurant/user/get-by-login */
export async function restaurantUserRouterGetUser(options?: { [key: string]: any }) {
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
    password: string;
    nickname: string;
    gender: string;
    avatar: string;
    roles: string;
    isBrandMain: boolean;
    isEnabled: boolean;
    disabledReason: string;
    restaurant?: {
      purchasingLevel?: 'LOW' | 'MEDIUM' | 'HIGH';
      id?: number;
      createBy?: number;
      updateBy?: number;
      createAt?: string;
      updateAt?: string;
      deleteAt?: number;
      name?: string;
      en_name?: string;
      brandId?: number;
      indexCode?: string;
      code?: string;
      address?: string;
      en_address?: string;
      regionCode?: string;
      contacts?: string;
      contactsWay?: string;
      cover?: string;
      lng?: string;
      lat?: string;
      description?: string;
      en_description?: string;
      isMainStore?: boolean;
      minimumCharge?: number;
      cuisineTypeId?: number;
      openingTime?: string;
      closingTime?: string;
      isInStorePromotion?: boolean;
      promotionDescription?: string;
      memberSetting?: string;
      brand: {
        levelType?: 'BASIC' | 'PREMIUM' | 'EXPIRED';
        id?: number;
        createBy?: number;
        updateBy?: number;
        createAt?: string;
        updateAt?: string;
        deleteAt?: number;
        name?: string;
        en_name?: string;
        contacts?: string;
        contactsWay?: string;
        logo?: string;
        description?: string;
        en_description?: string;
        expiredDate?: string;
        sort?: number;
        minimumSpendingAmount?: string;
        minimumSpendingBonus?: string;
        brandCode?: string;
      };
      region: {
        id?: number;
        createBy?: number;
        updateBy?: number;
        createAt?: string;
        updateAt?: string;
        deleteAt?: number;
        code?: string;
        name?: string;
        en_name?: string;
      };
    };
  }>('/restaurant/user/get-by-login', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取登陆用户餐厅品牌完整信息 GET /restaurant/user/get-by-login */
export async function restaurantUserRouterGetUser2(options?: { [key: string]: any }) {
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
    password: string;
    nickname: string;
    gender: string;
    avatar: string;
    roles: string;
    isBrandMain: boolean;
    isEnabled: boolean;
    disabledReason: string;
    restaurant?: {
      purchasingLevel?: 'LOW' | 'MEDIUM' | 'HIGH';
      id?: number;
      createBy?: number;
      updateBy?: number;
      createAt?: string;
      updateAt?: string;
      deleteAt?: number;
      name?: string;
      en_name?: string;
      brandId?: number;
      indexCode?: string;
      code?: string;
      address?: string;
      en_address?: string;
      regionCode?: string;
      contacts?: string;
      contactsWay?: string;
      cover?: string;
      lng?: string;
      lat?: string;
      description?: string;
      en_description?: string;
      isMainStore?: boolean;
      minimumCharge?: number;
      cuisineTypeId?: number;
      openingTime?: string;
      closingTime?: string;
      isInStorePromotion?: boolean;
      promotionDescription?: string;
      memberSetting?: string;
      brand: {
        levelType?: 'BASIC' | 'PREMIUM' | 'EXPIRED';
        id?: number;
        createBy?: number;
        updateBy?: number;
        createAt?: string;
        updateAt?: string;
        deleteAt?: number;
        name?: string;
        en_name?: string;
        contacts?: string;
        contactsWay?: string;
        logo?: string;
        description?: string;
        en_description?: string;
        expiredDate?: string;
        sort?: number;
        minimumSpendingAmount?: string;
        minimumSpendingBonus?: string;
        brandCode?: string;
      };
      region: {
        id?: number;
        createBy?: number;
        updateBy?: number;
        createAt?: string;
        updateAt?: string;
        deleteAt?: number;
        code?: string;
        name?: string;
        en_name?: string;
      };
    };
  }>('/restaurant/user/get-by-login', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 当前登陆餐厅用户发送修改密码验证码 POST /restaurant/user/send-modify-password-code */
export async function restaurantUserRouterSendModifyPasswordCode(options?: { [key: string]: any }) {
  return request<{
    app: 'ADMIN' | 'CUSTOMER' | 'RESTAURANT';
    scene: 'SIGN_UP' | 'SIGN_IN' | 'MODIFY_PASSWORD' | 'FORGOT_PASSWORD' | 'BIND_PHONE';
    channel: 'EMAIL' | 'SMS';
    receiver: string;
    expireAt: string;
  }>('/restaurant/user/send-modify-password-code', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 当前登陆餐厅用户发送修改密码验证码 POST /restaurant/user/send-modify-password-code */
export async function restaurantUserRouterSendModifyPasswordCode2(options?: {
  [key: string]: any;
}) {
  return request<{
    app: 'ADMIN' | 'CUSTOMER' | 'RESTAURANT';
    scene: 'SIGN_UP' | 'SIGN_IN' | 'MODIFY_PASSWORD' | 'FORGOT_PASSWORD' | 'BIND_PHONE';
    channel: 'EMAIL' | 'SMS';
    receiver: string;
    expireAt: string;
  }>('/restaurant/user/send-modify-password-code', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 更新当前登陆用户基本信息 POST /restaurant/user/update */
export async function restaurantUserRouterUpdateUserById(
  body: {
    /** 姓名 */
    userName: string;
    /** 昵称 */
    nickname?: string;
    /** 性别:MALE、FEMALE 或 UNKNOWN */
    gender?: string;
    /** 头像URL地址 */
    avatar?: string;
  },
  options?: { [key: string]: any },
) {
  return request<boolean>('/restaurant/user/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新当前登陆用户基本信息 POST /restaurant/user/update */
export async function restaurantUserRouterUpdateUserById2(
  body: {
    /** 姓名 */
    userName: string;
    /** 昵称 */
    nickname?: string;
    /** 性别:MALE、FEMALE 或 UNKNOWN */
    gender?: string;
    /** 头像URL地址 */
    avatar?: string;
  },
  options?: { [key: string]: any },
) {
  return request<boolean>('/restaurant/user/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 当前登陆餐厅用户修改登录密码 POST /restaurant/user/update-user-password */
export async function restaurantUserRouterUpdateRestaurantUserPassword(
  body: {
    /** 验证码 */
    captcha: string;
    password: { input?: string; confirm?: string };
  },
  options?: { [key: string]: any },
) {
  return request<string>('/restaurant/user/update-user-password', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 当前登陆餐厅用户修改登录密码 POST /restaurant/user/update-user-password */
export async function restaurantUserRouterUpdateRestaurantUserPassword2(
  body: {
    /** 验证码 */
    captcha: string;
    password: { input?: string; confirm?: string };
  },
  options?: { [key: string]: any },
) {
  return request<string>('/restaurant/user/update-user-password', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
