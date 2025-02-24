// @ts-ignore
/* eslint-disable */
import request from 'app/utils/request';

/** 根据Id获取会员详情 GET /restaurant-member/get/${param0} */
export async function restaurantMemberRouterGetMemberById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.restaurantMemberRouterGetMemberByIdParams,
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
    account: string;
    phoneAreaCode: string;
    phone: string;
    nickname: string;
    avatar: string;
    gender: string;
    identity: string;
    lastAccessTime: string;
    memberFlag: number;
    freeze: boolean;
    freezeReason: string;
    timezone: number;
    virtualUser: boolean;
    appSignIn: boolean;
    freepass: boolean;
  }>(`/restaurant-member/get/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 根据Id获取会员详情 GET /restaurant-member/get/${param0} */
export async function restaurantMemberRouterGetMemberById2(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.restaurantMemberRouterGetMemberByIdParams,
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
    account: string;
    phoneAreaCode: string;
    phone: string;
    nickname: string;
    avatar: string;
    gender: string;
    identity: string;
    lastAccessTime: string;
    memberFlag: number;
    freeze: boolean;
    freezeReason: string;
    timezone: number;
    virtualUser: boolean;
    appSignIn: boolean;
    freepass: boolean;
  }>(`/restaurant-member/get/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取当前登录餐厅潜在会员 GET /restaurant-member/latemt-member/page */
export async function restaurantMemberRouterPageRestaurantLatentMember(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.restaurantMemberRouterPageRestaurantLatentMemberParams,
  options?: { [key: string]: any },
) {
  return request<{
    page: number;
    pageSize: number;
    pageCount: number;
    totalCount: number;
    record: {
      member: {
        id?: number;
        createBy?: number;
        updateBy?: number;
        createAt?: string;
        updateAt?: string;
        deleteAt?: number;
        account?: string;
        phoneAreaCode?: string;
        phone?: string;
        nickname?: string;
        avatar?: string;
        gender?: string;
        identity?: string;
        freeze?: boolean;
        freezeReason?: string;
        timezone?: number;
        appSignIn?: boolean;
        freepass?: boolean;
      };
      latentRestaurant: {
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
      };
      latentSignIn: {
        id?: number;
        createBy?: number;
        updateBy?: number;
        createAt?: string;
        updateAt?: string;
        deleteAt?: number;
        restaurantNfcCode?: string;
        brandId?: number;
        restaurantId?: number;
        regionCode?: string;
        clockInId?: number;
        memberId?: number;
        bonus?: number;
        signInTime?: string;
        currentLevelCode?: string;
        bonusMultiple?: number;
        originBouns?: number;
        spendingAmount?: any;
      };
      cuisineType?: { cuisineTypeName?: string; cuisineTypeNameEn?: string; count?: number }[];
      region?: { regionName?: string; regionNameEn?: string; count?: number }[];
    }[];
  }>('/restaurant-member/latemt-member/page', {
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

/** 获取当前登录餐厅潜在会员 GET /restaurant-member/latemt-member/page */
export async function restaurantMemberRouterPageRestaurantLatentMember2(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.restaurantMemberRouterPageRestaurantLatentMemberParams,
  options?: { [key: string]: any },
) {
  return request<{
    page: number;
    pageSize: number;
    pageCount: number;
    totalCount: number;
    record: {
      member: {
        id?: number;
        createBy?: number;
        updateBy?: number;
        createAt?: string;
        updateAt?: string;
        deleteAt?: number;
        account?: string;
        phoneAreaCode?: string;
        phone?: string;
        nickname?: string;
        avatar?: string;
        gender?: string;
        identity?: string;
        freeze?: boolean;
        freezeReason?: string;
        timezone?: number;
        appSignIn?: boolean;
        freepass?: boolean;
      };
      latentRestaurant: {
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
      };
      latentSignIn: {
        id?: number;
        createBy?: number;
        updateBy?: number;
        createAt?: string;
        updateAt?: string;
        deleteAt?: number;
        restaurantNfcCode?: string;
        brandId?: number;
        restaurantId?: number;
        regionCode?: string;
        clockInId?: number;
        memberId?: number;
        bonus?: number;
        signInTime?: string;
        currentLevelCode?: string;
        bonusMultiple?: number;
        originBouns?: number;
        spendingAmount?: any;
      };
      cuisineType?: { cuisineTypeName?: string; cuisineTypeNameEn?: string; count?: number }[];
      region?: { regionName?: string; regionNameEn?: string; count?: number }[];
    }[];
  }>('/restaurant-member/latemt-member/page', {
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

/** 获取顾客标签列表 GET /restaurant-member/list-member-tag */
export async function restaurantMemberRouterListMemberTag(options?: { [key: string]: any }) {
  return request<string[]>('/restaurant-member/list-member-tag', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取顾客标签列表 GET /restaurant-member/list-member-tag */
export async function restaurantMemberRouterListMemberTag2(options?: { [key: string]: any }) {
  return request<string[]>('/restaurant-member/list-member-tag', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 分页查询顾客列表 GET /restaurant-member/page-member */
export async function restaurantMemberRouterPageMember(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.restaurantMemberRouterPageMemberParams,
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
      account?: string;
      phoneAreaCode?: string;
      phone?: string;
      nickname?: string;
      avatar?: string;
      gender?: string;
      identity?: string;
      freeze?: boolean;
      freezeReason?: string;
      timezone?: number;
      restaurantId?: number;
      accessTimes?: number;
      accessDate?: string;
      tags?: string;
      staffName?: string;
      name?: string;
      en_name?: string;
      brandId?: number;
      giftCount?: number;
      staffNameEn?: string;
    }[];
  }>('/restaurant-member/page-member', {
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

/** 分页查询顾客列表 GET /restaurant-member/page-member */
export async function restaurantMemberRouterPageMember2(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.restaurantMemberRouterPageMemberParams,
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
      account?: string;
      phoneAreaCode?: string;
      phone?: string;
      nickname?: string;
      avatar?: string;
      gender?: string;
      identity?: string;
      freeze?: boolean;
      freezeReason?: string;
      timezone?: number;
      restaurantId?: number;
      accessTimes?: number;
      accessDate?: string;
      tags?: string;
      staffName?: string;
      name?: string;
      en_name?: string;
      brandId?: number;
      giftCount?: number;
      staffNameEn?: string;
    }[];
  }>('/restaurant-member/page-member', {
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

/** 获取指定会员礼物兑换记录分页列表 GET /restaurant-member/page-member-gift-exchange */
export async function restaurantMemberRouterPageMemberGiftExchange(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.restaurantMemberRouterPageMemberGiftExchangeParams,
  options?: { [key: string]: any },
) {
  return request<{
    page: number;
    pageSize: number;
    pageCount: number;
    totalCount: number;
    record: {
      type?: 'LUCKY_DRAW' | 'SIGN_IN';
      exchangeGiftCategory?: 'DISCOUNT' | 'DESSERT' | 'FOOD' | 'BEVERAGE';
      exchangeType?: 'LUCKY_DRAW' | 'RESTAUARNT_INVITE' | 'SIGN_IN_BOUNS' | 'GENERAL';
      id?: number;
      createBy?: number;
      updateBy?: number;
      createAt?: string;
      updateAt?: string;
      deleteAt?: number;
      brandId?: number;
      restaurantId?: number;
      memberId?: number;
      exchangeCost?: string;
      exchangeGiftId?: number;
      exchangeGiftName?: string;
      exchangeGiftEn_name?: string;
      exchangeGiftPrice?: string;
      exchangeGiftPhoto?: string;
      exchangeGiftDescription?: string;
      exchangeGiftEn_description?: string;
      signInRecordId?: number;
      luckyDrawRecordId?: number;
      quantity?: number;
      isSettlement?: boolean;
      settlementTime?: string;
      member: {
        id?: number;
        createBy?: number;
        updateBy?: number;
        createAt?: string;
        updateAt?: string;
        deleteAt?: number;
        account?: string;
        phoneAreaCode?: string;
        phone?: string;
        nickname?: string;
        avatar?: string;
        gender?: string;
        identity?: string;
        lastAccessTime?: string;
        memberFlag?: number;
        freeze?: boolean;
        freezeReason?: string;
        timezone?: number;
        virtualUser?: boolean;
        appSignIn?: boolean;
        freepass?: boolean;
      };
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
      restaurant: {
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
      };
    }[];
  }>('/restaurant-member/page-member-gift-exchange', {
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

/** 获取指定会员礼物兑换记录分页列表 GET /restaurant-member/page-member-gift-exchange */
export async function restaurantMemberRouterPageMemberGiftExchange2(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.restaurantMemberRouterPageMemberGiftExchangeParams,
  options?: { [key: string]: any },
) {
  return request<{
    page: number;
    pageSize: number;
    pageCount: number;
    totalCount: number;
    record: {
      type?: 'LUCKY_DRAW' | 'SIGN_IN';
      exchangeGiftCategory?: 'DISCOUNT' | 'DESSERT' | 'FOOD' | 'BEVERAGE';
      exchangeType?: 'LUCKY_DRAW' | 'RESTAUARNT_INVITE' | 'SIGN_IN_BOUNS' | 'GENERAL';
      id?: number;
      createBy?: number;
      updateBy?: number;
      createAt?: string;
      updateAt?: string;
      deleteAt?: number;
      brandId?: number;
      restaurantId?: number;
      memberId?: number;
      exchangeCost?: string;
      exchangeGiftId?: number;
      exchangeGiftName?: string;
      exchangeGiftEn_name?: string;
      exchangeGiftPrice?: string;
      exchangeGiftPhoto?: string;
      exchangeGiftDescription?: string;
      exchangeGiftEn_description?: string;
      signInRecordId?: number;
      luckyDrawRecordId?: number;
      quantity?: number;
      isSettlement?: boolean;
      settlementTime?: string;
      member: {
        id?: number;
        createBy?: number;
        updateBy?: number;
        createAt?: string;
        updateAt?: string;
        deleteAt?: number;
        account?: string;
        phoneAreaCode?: string;
        phone?: string;
        nickname?: string;
        avatar?: string;
        gender?: string;
        identity?: string;
        lastAccessTime?: string;
        memberFlag?: number;
        freeze?: boolean;
        freezeReason?: string;
        timezone?: number;
        virtualUser?: boolean;
        appSignIn?: boolean;
        freepass?: boolean;
      };
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
      restaurant: {
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
      };
    }[];
  }>('/restaurant-member/page-member-gift-exchange', {
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

/** 更新顾客标签 POST /restaurant-member/update-member-tag/${param0} */
export async function restaurantMemberRouterUpdateMemberTag(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.restaurantMemberRouterUpdateMemberTagParams,
  body: {
    /** 顾客标签 */
    tags: string[];
  },
  options?: { [key: string]: any },
) {
  const { memberId: param0, ...queryParams } = params;
  return request<string[]>(`/restaurant-member/update-member-tag/${param0}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 更新顾客标签 POST /restaurant-member/update-member-tag/${param0} */
export async function restaurantMemberRouterUpdateMemberTag2(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.restaurantMemberRouterUpdateMemberTagParams,
  body: {
    /** 顾客标签 */
    tags: string[];
  },
  options?: { [key: string]: any },
) {
  const { memberId: param0, ...queryParams } = params;
  return request<string[]>(`/restaurant-member/update-member-tag/${param0}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}
