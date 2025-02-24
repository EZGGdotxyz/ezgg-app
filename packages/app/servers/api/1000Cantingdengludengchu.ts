// @ts-ignore
/* eslint-disable */
import request from 'app/utils/request';

/** 根据手机号获取餐厅用户餐厅列表 POST /restaurant-user/auth/list-restaurant-by-phone */
export async function restaurantUserAuthRouterListRestaurantByUserPhone(
  body: {
    /** 电话区号 */
    phoneAreaCode: string;
    /** 电话号码 */
    phone: string;
  },
  options?: { [key: string]: any },
) {
  return request<
    {
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
    }[]
  >('/restaurant-user/auth/list-restaurant-by-phone', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据手机号获取餐厅用户餐厅列表 POST /restaurant-user/auth/list-restaurant-by-phone */
export async function restaurantUserAuthRouterListRestaurantByUserPhone2(
  body: {
    /** 电话区号 */
    phoneAreaCode: string;
    /** 电话号码 */
    phone: string;
  },
  options?: { [key: string]: any },
) {
  return request<
    {
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
    }[]
  >('/restaurant-user/auth/list-restaurant-by-phone', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 退出登录 POST /restaurant-user/auth/logout */
export async function restaurantUserAuthRouterLogout(options?: { [key: string]: any }) {
  return request<string>('/restaurant-user/auth/logout', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 退出登录 POST /restaurant-user/auth/logout */
export async function restaurantUserAuthRouterLogout2(options?: { [key: string]: any }) {
  return request<string>('/restaurant-user/auth/logout', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 餐厅用户发送忘记密码验证码 POST /restaurant-user/auth/send-forgot-password-code */
export async function restaurantUserAuthRouterSendForgotPasswordCode(
  body: {
    /** 餐厅Id */
    restaurantId: number;
    /** 电话区号 */
    phoneAreaCode: string;
    /** 电话号码 */
    phone: string;
  },
  options?: { [key: string]: any },
) {
  return request<{
    app: 'ADMIN' | 'CUSTOMER' | 'RESTAURANT';
    scene: 'SIGN_UP' | 'SIGN_IN' | 'MODIFY_PASSWORD' | 'FORGOT_PASSWORD' | 'BIND_PHONE';
    channel: 'EMAIL' | 'SMS';
    receiver: string;
    expireAt: string;
  }>('/restaurant-user/auth/send-forgot-password-code', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 餐厅用户发送忘记密码验证码 POST /restaurant-user/auth/send-forgot-password-code */
export async function restaurantUserAuthRouterSendForgotPasswordCode2(
  body: {
    /** 餐厅Id */
    restaurantId: number;
    /** 电话区号 */
    phoneAreaCode: string;
    /** 电话号码 */
    phone: string;
  },
  options?: { [key: string]: any },
) {
  return request<{
    app: 'ADMIN' | 'CUSTOMER' | 'RESTAURANT';
    scene: 'SIGN_UP' | 'SIGN_IN' | 'MODIFY_PASSWORD' | 'FORGOT_PASSWORD' | 'BIND_PHONE';
    channel: 'EMAIL' | 'SMS';
    receiver: string;
    expireAt: string;
  }>('/restaurant-user/auth/send-forgot-password-code', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 餐厅用户发送登录验证码 POST /restaurant-user/auth/send-sign-in-code */
export async function restaurantUserAuthRouterSendSignInCode(
  body: {
    /** 餐厅Id */
    restaurantId: number;
    /** 电话区号 */
    phoneAreaCode: string;
    /** 电话号码 */
    phone: string;
  },
  options?: { [key: string]: any },
) {
  return request<{
    app: 'ADMIN' | 'CUSTOMER' | 'RESTAURANT';
    scene: 'SIGN_UP' | 'SIGN_IN' | 'MODIFY_PASSWORD' | 'FORGOT_PASSWORD' | 'BIND_PHONE';
    channel: 'EMAIL' | 'SMS';
    receiver: string;
    expireAt: string;
  }>('/restaurant-user/auth/send-sign-in-code', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 餐厅用户发送登录验证码 POST /restaurant-user/auth/send-sign-in-code */
export async function restaurantUserAuthRouterSendSignInCode2(
  body: {
    /** 餐厅Id */
    restaurantId: number;
    /** 电话区号 */
    phoneAreaCode: string;
    /** 电话号码 */
    phone: string;
  },
  options?: { [key: string]: any },
) {
  return request<{
    app: 'ADMIN' | 'CUSTOMER' | 'RESTAURANT';
    scene: 'SIGN_UP' | 'SIGN_IN' | 'MODIFY_PASSWORD' | 'FORGOT_PASSWORD' | 'BIND_PHONE';
    channel: 'EMAIL' | 'SMS';
    receiver: string;
    expireAt: string;
  }>('/restaurant-user/auth/send-sign-in-code', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 餐厅用户验证码登录 POST /restaurant-user/auth/sign-in-by-captcha */
export async function restaurantUserAuthRouterSignInByCaptcha(
  body: {
    /** 餐厅Id */
    restaurantId: number;
    /** 电话区号 */
    phoneAreaCode: string;
    /** 电话号码 */
    phone: string;
    /** 验证码 */
    captcha: string;
  },
  options?: { [key: string]: any },
) {
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
    token: string;
  }>('/restaurant-user/auth/sign-in-by-captcha', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 餐厅用户验证码登录 POST /restaurant-user/auth/sign-in-by-captcha */
export async function restaurantUserAuthRouterSignInByCaptcha2(
  body: {
    /** 餐厅Id */
    restaurantId: number;
    /** 电话区号 */
    phoneAreaCode: string;
    /** 电话号码 */
    phone: string;
    /** 验证码 */
    captcha: string;
  },
  options?: { [key: string]: any },
) {
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
    token: string;
  }>('/restaurant-user/auth/sign-in-by-captcha', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 餐厅用户密码登录 POST /restaurant-user/auth/sign-in-by-password */
export async function restaurantUserAuthRouterSignInByPassword(
  body: {
    /** 用户账号 */
    account: string;
    /** 密码 */
    password: string;
  },
  options?: { [key: string]: any },
) {
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
    token: string;
  }>('/restaurant-user/auth/sign-in-by-password', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 餐厅用户密码登录 POST /restaurant-user/auth/sign-in-by-password */
export async function restaurantUserAuthRouterSignInByPassword2(
  body: {
    /** 用户账号 */
    account: string;
    /** 密码 */
    password: string;
  },
  options?: { [key: string]: any },
) {
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
    token: string;
  }>('/restaurant-user/auth/sign-in-by-password', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 餐厅用户忘记密码修改登录密码 POST /restaurant-user/auth/update-user-forgot-password */
export async function restaurantUserAuthRouterUpdateMemberForgotPassword(
  body: {
    /** 餐厅Id */
    restaurantId: number;
    /** 电话区号 */
    phoneAreaCode: string;
    /** 电话号码 */
    phone: string;
    /** 验证码 */
    captcha: string;
    password: { input?: string; confirm?: string };
  },
  options?: { [key: string]: any },
) {
  return request<string>('/restaurant-user/auth/update-user-forgot-password', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 餐厅用户忘记密码修改登录密码 POST /restaurant-user/auth/update-user-forgot-password */
export async function restaurantUserAuthRouterUpdateMemberForgotPassword2(
  body: {
    /** 餐厅Id */
    restaurantId: number;
    /** 电话区号 */
    phoneAreaCode: string;
    /** 电话号码 */
    phone: string;
    /** 验证码 */
    captcha: string;
    password: { input?: string; confirm?: string };
  },
  options?: { [key: string]: any },
) {
  return request<string>('/restaurant-user/auth/update-user-forgot-password', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
