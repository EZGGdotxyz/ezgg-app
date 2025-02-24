// @ts-ignore
/* eslint-disable */
import request from 'app/utils/request';

/** 分页查询会员签到记录 GET /nfc-sign-in/page-sign-in */
export async function nfcSignInRouterPageSignIn(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.nfcSignInRouterPageSignInParams,
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
      giftList?: {
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
      }[];
    }[];
  }>('/nfc-sign-in/page-sign-in', {
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

/** 分页查询会员签到记录 GET /nfc-sign-in/page-sign-in */
export async function nfcSignInRouterPageSignIn2(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.nfcSignInRouterPageSignInParams,
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
      giftList?: {
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
      }[];
    }[];
  }>('/nfc-sign-in/page-sign-in', {
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

/** 扫描创建会员签到记录 POST /nfc-sign-in/qr-code/sign-in */
export async function nfcSignInRouterSignIn(
  body: {
    /** NFC code */
    code: string;
    /** 经度 */
    lng?: string;
    /** 纬度 */
    lat?: string;
    /** 会员ID */
    memberId: number;
    /** 签到时间 */
    signInTime?: string;
    /** 消费金额 */
    spendingAmount?: number;
    qrCodeKey?: string;
  },
  options?: { [key: string]: any },
) {
  return request<{
    signInRecord: {
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
    nextLevel?: {
      id?: number;
      createBy?: number;
      updateBy?: number;
      createAt?: string;
      updateAt?: string;
      deleteAt?: number;
      name?: string;
      en_name?: string;
      levelCode?: string;
      bonusMultiple?: number;
      keepLevelDays?: number;
      keepLevelTimes?: number;
      toLevelDays?: number;
      toLevelTimes?: number;
      nextLevelCode?: string;
      backLevelCode?: string;
    };
    giftList: {
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
      exchangeCost?: any;
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
    }[];
    luckyDraw?: {
      id?: number;
      createBy?: number;
      updateBy?: number;
      createAt?: string;
      updateAt?: string;
      deleteAt?: number;
      brandId?: number;
      restaurantId?: number;
      name?: string;
      en_name?: string;
      startDate?: string;
      endDate?: string;
      description?: string;
      en_description?: string;
      isEnabled?: boolean;
    };
    signTimesToNextLevel?: number;
  }>('/nfc-sign-in/qr-code/sign-in', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 扫描创建会员签到记录 POST /nfc-sign-in/qr-code/sign-in */
export async function nfcSignInRouterSignIn2(
  body: {
    /** NFC code */
    code: string;
    /** 经度 */
    lng?: string;
    /** 纬度 */
    lat?: string;
    /** 会员ID */
    memberId: number;
    /** 签到时间 */
    signInTime?: string;
    /** 消费金额 */
    spendingAmount?: number;
    qrCodeKey?: string;
  },
  options?: { [key: string]: any },
) {
  return request<{
    signInRecord: {
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
    nextLevel?: {
      id?: number;
      createBy?: number;
      updateBy?: number;
      createAt?: string;
      updateAt?: string;
      deleteAt?: number;
      name?: string;
      en_name?: string;
      levelCode?: string;
      bonusMultiple?: number;
      keepLevelDays?: number;
      keepLevelTimes?: number;
      toLevelDays?: number;
      toLevelTimes?: number;
      nextLevelCode?: string;
      backLevelCode?: string;
    };
    giftList: {
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
      exchangeCost?: any;
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
    }[];
    luckyDraw?: {
      id?: number;
      createBy?: number;
      updateBy?: number;
      createAt?: string;
      updateAt?: string;
      deleteAt?: number;
      brandId?: number;
      restaurantId?: number;
      name?: string;
      en_name?: string;
      startDate?: string;
      endDate?: string;
      description?: string;
      en_description?: string;
      isEnabled?: boolean;
    };
    signTimesToNextLevel?: number;
  }>('/nfc-sign-in/qr-code/sign-in', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
