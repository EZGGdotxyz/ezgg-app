// @ts-ignore
/* eslint-disable */
import request from 'app/utils/request';

/** 获取登陆用户餐厅品牌信息 GET /restaurant/info/get-by-login */
export async function restaurantRouterGetRestaurant(options?: { [key: string]: any }) {
  return request<{
    purchasingLevel: 'LOW' | 'MEDIUM' | 'HIGH';
    id: number;
    createBy: number;
    updateBy: number;
    createAt: string;
    updateAt: string;
    deleteAt: number;
    name: string;
    en_name: string;
    brandId: number;
    indexCode: string;
    code: string;
    address: string;
    en_address: string;
    regionCode: string;
    contacts: string;
    contactsWay: string;
    cover: string;
    lng: string;
    lat: string;
    description: string;
    en_description: string;
    isMainStore: boolean;
    minimumCharge: number;
    cuisineTypeId: number;
    openingTime: string;
    closingTime: string;
    isInStorePromotion: boolean;
    promotionDescription: string;
    memberSetting: string;
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
    region?: {
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
    cuisineType?: {
      id?: number;
      createBy?: number;
      updateBy?: number;
      createAt?: string;
      updateAt?: string;
      deleteAt?: number;
      cuisineTypeName?: string;
      cuisineTypeNameEn?: string;
    };
  }>('/restaurant/info/get-by-login', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取登陆用户餐厅品牌信息 GET /restaurant/info/get-by-login */
export async function restaurantRouterGetRestaurant2(options?: { [key: string]: any }) {
  return request<{
    purchasingLevel: 'LOW' | 'MEDIUM' | 'HIGH';
    id: number;
    createBy: number;
    updateBy: number;
    createAt: string;
    updateAt: string;
    deleteAt: number;
    name: string;
    en_name: string;
    brandId: number;
    indexCode: string;
    code: string;
    address: string;
    en_address: string;
    regionCode: string;
    contacts: string;
    contactsWay: string;
    cover: string;
    lng: string;
    lat: string;
    description: string;
    en_description: string;
    isMainStore: boolean;
    minimumCharge: number;
    cuisineTypeId: number;
    openingTime: string;
    closingTime: string;
    isInStorePromotion: boolean;
    promotionDescription: string;
    memberSetting: string;
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
    region?: {
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
    cuisineType?: {
      id?: number;
      createBy?: number;
      updateBy?: number;
      createAt?: string;
      updateAt?: string;
      deleteAt?: number;
      cuisineTypeName?: string;
      cuisineTypeNameEn?: string;
    };
  }>('/restaurant/info/get-by-login', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 根据Id获取餐厅品牌信息 GET /restaurant/info/get/${param0} */
export async function restaurantRouterGetRestaurantById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.restaurantRouterGetRestaurantByIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<{
    purchasingLevel: 'LOW' | 'MEDIUM' | 'HIGH';
    id: number;
    createBy: number;
    updateBy: number;
    createAt: string;
    updateAt: string;
    deleteAt: number;
    name: string;
    en_name: string;
    brandId: number;
    indexCode: string;
    code: string;
    address: string;
    en_address: string;
    regionCode: string;
    contacts: string;
    contactsWay: string;
    cover: string;
    lng: string;
    lat: string;
    description: string;
    en_description: string;
    isMainStore: boolean;
    minimumCharge: number;
    cuisineTypeId: number;
    openingTime: string;
    closingTime: string;
    isInStorePromotion: boolean;
    promotionDescription: string;
    memberSetting: string;
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
    region?: {
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
    cuisineType?: {
      id?: number;
      createBy?: number;
      updateBy?: number;
      createAt?: string;
      updateAt?: string;
      deleteAt?: number;
      cuisineTypeName?: string;
      cuisineTypeNameEn?: string;
    };
  }>(`/restaurant/info/get/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 根据Id获取餐厅品牌信息 GET /restaurant/info/get/${param0} */
export async function restaurantRouterGetRestaurantById2(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.restaurantRouterGetRestaurantByIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<{
    purchasingLevel: 'LOW' | 'MEDIUM' | 'HIGH';
    id: number;
    createBy: number;
    updateBy: number;
    createAt: string;
    updateAt: string;
    deleteAt: number;
    name: string;
    en_name: string;
    brandId: number;
    indexCode: string;
    code: string;
    address: string;
    en_address: string;
    regionCode: string;
    contacts: string;
    contactsWay: string;
    cover: string;
    lng: string;
    lat: string;
    description: string;
    en_description: string;
    isMainStore: boolean;
    minimumCharge: number;
    cuisineTypeId: number;
    openingTime: string;
    closingTime: string;
    isInStorePromotion: boolean;
    promotionDescription: string;
    memberSetting: string;
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
    region?: {
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
    cuisineType?: {
      id?: number;
      createBy?: number;
      updateBy?: number;
      createAt?: string;
      updateAt?: string;
      deleteAt?: number;
      cuisineTypeName?: string;
      cuisineTypeNameEn?: string;
    };
  }>(`/restaurant/info/get/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取当前登陆餐厅品牌餐厅列表 GET /restaurant/info/list */
export async function restaurantRouterListRestaurant(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.restaurantRouterListRestaurantParams,
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
      cuisineType: {
        id?: number;
        createBy?: number;
        updateBy?: number;
        createAt?: string;
        updateAt?: string;
        deleteAt?: number;
        cuisineTypeName?: string;
        cuisineTypeNameEn?: string;
      };
    }[]
  >('/restaurant/info/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取当前登陆餐厅品牌餐厅列表 GET /restaurant/info/list */
export async function restaurantRouterListRestaurant2(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.restaurantRouterListRestaurantParams,
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
      cuisineType: {
        id?: number;
        createBy?: number;
        updateBy?: number;
        createAt?: string;
        updateAt?: string;
        deleteAt?: number;
        cuisineTypeName?: string;
        cuisineTypeNameEn?: string;
      };
    }[]
  >('/restaurant/info/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取当前登陆餐厅品牌餐厅分页列表 GET /restaurant/info/page */
export async function restaurantRouterPageRestaurant(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.restaurantRouterPageRestaurantParams,
  options?: { [key: string]: any },
) {
  return request<{
    page: number;
    pageSize: number;
    pageCount: number;
    totalCount: number;
    record: {
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
      cuisineType: {
        id?: number;
        createBy?: number;
        updateBy?: number;
        createAt?: string;
        updateAt?: string;
        deleteAt?: number;
        cuisineTypeName?: string;
        cuisineTypeNameEn?: string;
      };
    }[];
  }>('/restaurant/info/page', {
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

/** 获取当前登陆餐厅品牌餐厅分页列表 GET /restaurant/info/page */
export async function restaurantRouterPageRestaurant2(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.restaurantRouterPageRestaurantParams,
  options?: { [key: string]: any },
) {
  return request<{
    page: number;
    pageSize: number;
    pageCount: number;
    totalCount: number;
    record: {
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
      cuisineType: {
        id?: number;
        createBy?: number;
        updateBy?: number;
        createAt?: string;
        updateAt?: string;
        deleteAt?: number;
        cuisineTypeName?: string;
        cuisineTypeNameEn?: string;
      };
    }[];
  }>('/restaurant/info/page', {
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

/** 更新当前登陆餐厅品牌餐厅信息 POST /restaurant/info/update */
export async function restaurantRouterUpdateRestaurantById(
  body: {
    /** 餐厅名称 */
    name: string;
    /** 餐厅英文名称 */
    en_name: string;
    /** 餐厅地址 */
    address: string;
    /** 餐厅地址 */
    en_address: string;
    /** 餐厅所在区 */
    regionCode: string;
    /** 联系人 */
    contacts: string;
    /** 联系方式 */
    contactsWay: string;
    /** 餐厅封面 */
    cover: string;
    /** 经度 */
    lng: string;
    /** 纬度 */
    lat: string;
    /** 餐厅描述 */
    description?: string;
    /** 餐厅英文描述 */
    en_description?: string;
    /** 餐厅最低消费 */
    minimumCharge?: number;
    /** 菜系id */
    cuisineTypeId?: number;
    /** 营业时间 */
    openingTime?: string;
    /** 歇业时间 */
    closingTime?: string;
    /** 消费等级，LOW 低 MEDIUM 中 HIGH 高 */
    purchasingLevel?: 'LOW' | 'MEDIUM' | 'HIGH';
    /** 是否到店优惠 */
    isInStorePromotion?: boolean;
    /** 到店优惠描述 */
    promotionDescription?: string;
    /** 会员卡配置 */
    memberSetting?: string;
  },
  options?: { [key: string]: any },
) {
  return request<boolean>('/restaurant/info/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新当前登陆餐厅品牌餐厅信息 POST /restaurant/info/update */
export async function restaurantRouterUpdateRestaurantById2(
  body: {
    /** 餐厅名称 */
    name: string;
    /** 餐厅英文名称 */
    en_name: string;
    /** 餐厅地址 */
    address: string;
    /** 餐厅地址 */
    en_address: string;
    /** 餐厅所在区 */
    regionCode: string;
    /** 联系人 */
    contacts: string;
    /** 联系方式 */
    contactsWay: string;
    /** 餐厅封面 */
    cover: string;
    /** 经度 */
    lng: string;
    /** 纬度 */
    lat: string;
    /** 餐厅描述 */
    description?: string;
    /** 餐厅英文描述 */
    en_description?: string;
    /** 餐厅最低消费 */
    minimumCharge?: number;
    /** 菜系id */
    cuisineTypeId?: number;
    /** 营业时间 */
    openingTime?: string;
    /** 歇业时间 */
    closingTime?: string;
    /** 消费等级，LOW 低 MEDIUM 中 HIGH 高 */
    purchasingLevel?: 'LOW' | 'MEDIUM' | 'HIGH';
    /** 是否到店优惠 */
    isInStorePromotion?: boolean;
    /** 到店优惠描述 */
    promotionDescription?: string;
    /** 会员卡配置 */
    memberSetting?: string;
  },
  options?: { [key: string]: any },
) {
  return request<boolean>('/restaurant/info/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
