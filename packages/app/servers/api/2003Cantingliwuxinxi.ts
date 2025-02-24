// @ts-ignore
/* eslint-disable */
import request from 'app/utils/request';

/** 创建礼物 POST /gift/create */
export async function giftRouterCreateGift(
  body: {
    /** 礼物名称 */
    name: string;
    /** 礼物英文名称 */
    en_name: string;
    /** 礼物类型, 抽奖 LUCKY_DRAW 签到 SIGN_IN */
    type?: 'LUCKY_DRAW' | 'SIGN_IN';
    /** 礼物种类, 折扣 DISCOUNT 甜品 DESSERT 食物 FOOD 饮品 BEVERAGE */
    category?: 'DISCOUNT' | 'DESSERT' | 'FOOD' | 'BEVERAGE';
    /** 礼物图片 */
    photo?: string;
    /** 礼物价格 */
    price?: string;
    /** 礼物描述 */
    description?: string;
    /** 礼物英文描述 */
    en_description?: string;
    /** 是否开启兑换 */
    isExchange: boolean;
    /** 兑换所需积分,例如99.99 */
    exchangeCost?: number;
  },
  options?: { [key: string]: any },
) {
  return request<boolean>('/gift/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 创建礼物 POST /gift/create */
export async function giftRouterCreateGift2(
  body: {
    /** 礼物名称 */
    name: string;
    /** 礼物英文名称 */
    en_name: string;
    /** 礼物类型, 抽奖 LUCKY_DRAW 签到 SIGN_IN */
    type?: 'LUCKY_DRAW' | 'SIGN_IN';
    /** 礼物种类, 折扣 DISCOUNT 甜品 DESSERT 食物 FOOD 饮品 BEVERAGE */
    category?: 'DISCOUNT' | 'DESSERT' | 'FOOD' | 'BEVERAGE';
    /** 礼物图片 */
    photo?: string;
    /** 礼物价格 */
    price?: string;
    /** 礼物描述 */
    description?: string;
    /** 礼物英文描述 */
    en_description?: string;
    /** 是否开启兑换 */
    isExchange: boolean;
    /** 兑换所需积分,例如99.99 */
    exchangeCost?: number;
  },
  options?: { [key: string]: any },
) {
  return request<boolean>('/gift/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据Id删除礼物 POST /gift/delete/${param0} */
export async function giftRouterDeleteGiftById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.giftRouterDeleteGiftByIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<boolean>(`/gift/delete/${param0}`, {
    method: 'POST',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 根据Id删除礼物 POST /gift/delete/${param0} */
export async function giftRouterDeleteGiftById2(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.giftRouterDeleteGiftByIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<boolean>(`/gift/delete/${param0}`, {
    method: 'POST',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 根据Id获取礼物详情 GET /gift/get/${param0} */
export async function giftRouterGetGiftById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.giftRouterGetGiftByIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<{
    type: 'LUCKY_DRAW' | 'SIGN_IN';
    category: 'DISCOUNT' | 'DESSERT' | 'FOOD' | 'BEVERAGE';
    id: number;
    createBy: number;
    updateBy: number;
    createAt: string;
    updateAt: string;
    deleteAt: number;
    brandId: number;
    name: string;
    en_name: string;
    price: string;
    photo: string;
    description: string;
    en_description: string;
    isExchange: boolean;
    exchangeCost: any;
  }>(`/gift/get/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 根据Id获取礼物详情 GET /gift/get/${param0} */
export async function giftRouterGetGiftById2(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.giftRouterGetGiftByIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<{
    type: 'LUCKY_DRAW' | 'SIGN_IN';
    category: 'DISCOUNT' | 'DESSERT' | 'FOOD' | 'BEVERAGE';
    id: number;
    createBy: number;
    updateBy: number;
    createAt: string;
    updateAt: string;
    deleteAt: number;
    brandId: number;
    name: string;
    en_name: string;
    price: string;
    photo: string;
    description: string;
    en_description: string;
    isExchange: boolean;
    exchangeCost: any;
  }>(`/gift/get/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取当前登陆餐厅品牌礼物列表 GET /gift/list */
export async function giftRouterListGift(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.giftRouterListGiftParams,
  options?: { [key: string]: any },
) {
  return request<
    {
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
    }[]
  >('/gift/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取当前登陆餐厅品牌礼物列表 GET /gift/list */
export async function giftRouterListGift2(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.giftRouterListGiftParams,
  options?: { [key: string]: any },
) {
  return request<
    {
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
    }[]
  >('/gift/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取当前登陆餐厅品牌礼物分页 GET /gift/page */
export async function giftRouterPageGift(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.giftRouterPageGiftParams,
  options?: { [key: string]: any },
) {
  return request<{
    page: number;
    pageSize: number;
    pageCount: number;
    totalCount: number;
    record: {
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
    }[];
  }>('/gift/page', {
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

/** 获取当前登陆餐厅品牌礼物分页 GET /gift/page */
export async function giftRouterPageGift2(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.giftRouterPageGiftParams,
  options?: { [key: string]: any },
) {
  return request<{
    page: number;
    pageSize: number;
    pageCount: number;
    totalCount: number;
    record: {
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
    }[];
  }>('/gift/page', {
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

/** 根据Id更新礼物 POST /gift/update/${param0} */
export async function giftRouterUpdateGiftById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.giftRouterUpdateGiftByIdParams,
  body: {
    updateData: {
      name?: string;
      en_name?: string;
      type?: 'LUCKY_DRAW' | 'SIGN_IN';
      category?: 'DISCOUNT' | 'DESSERT' | 'FOOD' | 'BEVERAGE';
      photo?: string;
      price?: string;
      description?: string;
      en_description?: string;
      isExchange?: boolean;
      exchangeCost?: number;
    };
  },
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<boolean>(`/gift/update/${param0}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 根据Id更新礼物 POST /gift/update/${param0} */
export async function giftRouterUpdateGiftById2(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.giftRouterUpdateGiftByIdParams,
  body: {
    updateData: {
      name?: string;
      en_name?: string;
      type?: 'LUCKY_DRAW' | 'SIGN_IN';
      category?: 'DISCOUNT' | 'DESSERT' | 'FOOD' | 'BEVERAGE';
      photo?: string;
      price?: string;
      description?: string;
      en_description?: string;
      isExchange?: boolean;
      exchangeCost?: number;
    };
  },
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<boolean>(`/gift/update/${param0}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}
