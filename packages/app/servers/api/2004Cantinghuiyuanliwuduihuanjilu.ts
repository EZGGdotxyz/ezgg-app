// @ts-ignore
/* eslint-disable */
import request from 'app/utils/request';

/** 餐厅根据会员Id提交礼物兑换 POST /member-gift-exchange/commit */
export async function memberGiftExchangeRouterMemberCommitGiftExchange(
  body: {
    /** 礼物Id */
    giftId: number;
    /** 会员IdId */
    memberId: number;
    /** 是否立即核销,true 是 false 否,不填默认不核销 */
    isSettlement?: string;
    qrCodeKey?: string;
  },
  options?: { [key: string]: any },
) {
  return request<{
    type: 'LUCKY_DRAW' | 'SIGN_IN';
    exchangeGiftCategory: 'DISCOUNT' | 'DESSERT' | 'FOOD' | 'BEVERAGE';
    exchangeType: 'LUCKY_DRAW' | 'RESTAUARNT_INVITE' | 'SIGN_IN_BOUNS' | 'GENERAL';
    id: number;
    createBy: number;
    updateBy: number;
    createAt: string;
    updateAt: string;
    deleteAt: number;
    brandId: number;
    restaurantId: number;
    memberId: number;
    exchangeCost: string;
    exchangeGiftId: number;
    exchangeGiftName: string;
    exchangeGiftEn_name: string;
    exchangeGiftPrice: string;
    exchangeGiftPhoto: string;
    exchangeGiftDescription: string;
    exchangeGiftEn_description: string;
    signInRecordId: number;
    luckyDrawRecordId: number;
    quantity: number;
    isSettlement: boolean;
    settlementTime: string;
    member?: {
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
    brand?: {
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
    };
  }>('/member-gift-exchange/commit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 餐厅根据会员Id提交礼物兑换 POST /member-gift-exchange/commit */
export async function memberGiftExchangeRouterMemberCommitGiftExchange2(
  body: {
    /** 礼物Id */
    giftId: number;
    /** 会员IdId */
    memberId: number;
    /** 是否立即核销,true 是 false 否,不填默认不核销 */
    isSettlement?: string;
    qrCodeKey?: string;
  },
  options?: { [key: string]: any },
) {
  return request<{
    type: 'LUCKY_DRAW' | 'SIGN_IN';
    exchangeGiftCategory: 'DISCOUNT' | 'DESSERT' | 'FOOD' | 'BEVERAGE';
    exchangeType: 'LUCKY_DRAW' | 'RESTAUARNT_INVITE' | 'SIGN_IN_BOUNS' | 'GENERAL';
    id: number;
    createBy: number;
    updateBy: number;
    createAt: string;
    updateAt: string;
    deleteAt: number;
    brandId: number;
    restaurantId: number;
    memberId: number;
    exchangeCost: string;
    exchangeGiftId: number;
    exchangeGiftName: string;
    exchangeGiftEn_name: string;
    exchangeGiftPrice: string;
    exchangeGiftPhoto: string;
    exchangeGiftDescription: string;
    exchangeGiftEn_description: string;
    signInRecordId: number;
    luckyDrawRecordId: number;
    quantity: number;
    isSettlement: boolean;
    settlementTime: string;
    member?: {
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
    brand?: {
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
    };
  }>('/member-gift-exchange/commit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据Id获取会员礼物兑换记录详情 GET /member-gift-exchange/get/${param0} */
export async function memberGiftExchangeRouterGetMemberGiftExchangeById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.memberGiftExchangeRouterGetMemberGiftExchangeByIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<{
    type: 'LUCKY_DRAW' | 'SIGN_IN';
    exchangeGiftCategory: 'DISCOUNT' | 'DESSERT' | 'FOOD' | 'BEVERAGE';
    exchangeType: 'LUCKY_DRAW' | 'RESTAUARNT_INVITE' | 'SIGN_IN_BOUNS' | 'GENERAL';
    id: number;
    createBy: number;
    updateBy: number;
    createAt: string;
    updateAt: string;
    deleteAt: number;
    brandId: number;
    restaurantId: number;
    memberId: number;
    exchangeCost: string;
    exchangeGiftId: number;
    exchangeGiftName: string;
    exchangeGiftEn_name: string;
    exchangeGiftPrice: string;
    exchangeGiftPhoto: string;
    exchangeGiftDescription: string;
    exchangeGiftEn_description: string;
    signInRecordId: number;
    luckyDrawRecordId: number;
    quantity: number;
    isSettlement: boolean;
    settlementTime: string;
    member?: {
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
    brand?: {
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
    };
  }>(`/member-gift-exchange/get/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 根据Id获取会员礼物兑换记录详情 GET /member-gift-exchange/get/${param0} */
export async function memberGiftExchangeRouterGetMemberGiftExchangeById2(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.memberGiftExchangeRouterGetMemberGiftExchangeByIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<{
    type: 'LUCKY_DRAW' | 'SIGN_IN';
    exchangeGiftCategory: 'DISCOUNT' | 'DESSERT' | 'FOOD' | 'BEVERAGE';
    exchangeType: 'LUCKY_DRAW' | 'RESTAUARNT_INVITE' | 'SIGN_IN_BOUNS' | 'GENERAL';
    id: number;
    createBy: number;
    updateBy: number;
    createAt: string;
    updateAt: string;
    deleteAt: number;
    brandId: number;
    restaurantId: number;
    memberId: number;
    exchangeCost: string;
    exchangeGiftId: number;
    exchangeGiftName: string;
    exchangeGiftEn_name: string;
    exchangeGiftPrice: string;
    exchangeGiftPhoto: string;
    exchangeGiftDescription: string;
    exchangeGiftEn_description: string;
    signInRecordId: number;
    luckyDrawRecordId: number;
    quantity: number;
    isSettlement: boolean;
    settlementTime: string;
    member?: {
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
    brand?: {
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
    };
  }>(`/member-gift-exchange/get/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 餐厅更新会员礼物记录核销状态 POST /member-gift-exchange/gift-settlement-status */
export async function memberGiftExchangeRouterUpdateGiftSettlementStatus(
  body: {
    /** 会员礼物记录Id */
    recordId: number;
    qrCodeKey?: string;
  },
  options?: { [key: string]: any },
) {
  return request<boolean>('/member-gift-exchange/gift-settlement-status', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 餐厅更新会员礼物记录核销状态 POST /member-gift-exchange/gift-settlement-status */
export async function memberGiftExchangeRouterUpdateGiftSettlementStatus2(
  body: {
    /** 会员礼物记录Id */
    recordId: number;
    qrCodeKey?: string;
  },
  options?: { [key: string]: any },
) {
  return request<boolean>('/member-gift-exchange/gift-settlement-status', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取当前登陆餐厅品牌会员礼物兑换记录分页列表 GET /member-gift-exchange/page */
export async function memberGiftExchangeRouterPageMemberGiftExchange(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.memberGiftExchangeRouterPageMemberGiftExchangeParams,
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
  }>('/member-gift-exchange/page', {
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

/** 获取当前登陆餐厅品牌会员礼物兑换记录分页列表 GET /member-gift-exchange/page */
export async function memberGiftExchangeRouterPageMemberGiftExchange2(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.memberGiftExchangeRouterPageMemberGiftExchangeParams,
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
  }>('/member-gift-exchange/page', {
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
