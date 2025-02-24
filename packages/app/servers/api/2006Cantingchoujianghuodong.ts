// @ts-ignore
/* eslint-disable */
import request from 'app/utils/request';

/** 创建抽奖活动及规则 POST /lucky-draw/create */
export async function luckyDrawRouterCreateLuckyDraw(
  body: {
    /** 抽奖活动名称 */
    name: string;
    /** 抽奖活动英文名称 */
    en_name: string;
    /** 开始时间，不填立刻开始 */
    startDate?: string;
    /** 结束时间，不填不会结束 */
    endDate?: string;
    /** 抽奖活动描述 */
    description?: string;
    /** 抽奖活动英文描述 */
    en_description?: string;
    /** 是否可用 */
    isEnabled: boolean;
    rules: {
      level?: number;
      title?: string;
      en_title?: string;
      giftId?: number;
      totalQuantity?: number;
      quantity?: number;
      probability?: number;
    }[];
  },
  options?: { [key: string]: any },
) {
  return request<boolean>('/lucky-draw/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 创建抽奖活动及规则 POST /lucky-draw/create */
export async function luckyDrawRouterCreateLuckyDraw2(
  body: {
    /** 抽奖活动名称 */
    name: string;
    /** 抽奖活动英文名称 */
    en_name: string;
    /** 开始时间，不填立刻开始 */
    startDate?: string;
    /** 结束时间，不填不会结束 */
    endDate?: string;
    /** 抽奖活动描述 */
    description?: string;
    /** 抽奖活动英文描述 */
    en_description?: string;
    /** 是否可用 */
    isEnabled: boolean;
    rules: {
      level?: number;
      title?: string;
      en_title?: string;
      giftId?: number;
      totalQuantity?: number;
      quantity?: number;
      probability?: number;
    }[];
  },
  options?: { [key: string]: any },
) {
  return request<boolean>('/lucky-draw/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据Id删除餐厅抽奖活动及其规则 POST /lucky-draw/delete/${param0} */
export async function luckyDrawRouterDeleteLuckyDrawById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.luckyDrawRouterDeleteLuckyDrawByIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<boolean>(`/lucky-draw/delete/${param0}`, {
    method: 'POST',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 根据Id删除餐厅抽奖活动及其规则 POST /lucky-draw/delete/${param0} */
export async function luckyDrawRouterDeleteLuckyDrawById2(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.luckyDrawRouterDeleteLuckyDrawByIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<boolean>(`/lucky-draw/delete/${param0}`, {
    method: 'POST',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 根据Id获取餐厅抽奖活动详情及其规则 GET /lucky-draw/get/${param0} */
export async function luckyDrawRouterGetLuckyDrawById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.luckyDrawRouterGetLuckyDrawByIdParams,
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
    name: string;
    en_name: string;
    startDate: string;
    endDate: string;
    description: string;
    en_description: string;
    isEnabled: boolean;
    rules?: {
      id?: number;
      createBy?: number;
      updateBy?: number;
      createAt?: string;
      updateAt?: string;
      deleteAt?: number;
      luckyDrawId?: number;
      level?: number;
      title?: string;
      en_title?: string;
      giftId?: number;
      totalQuantity?: number;
      quantity?: number;
      residueQuantity?: number;
      probability?: string;
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
    }[];
  }>(`/lucky-draw/get/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 根据Id获取餐厅抽奖活动详情及其规则 GET /lucky-draw/get/${param0} */
export async function luckyDrawRouterGetLuckyDrawById2(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.luckyDrawRouterGetLuckyDrawByIdParams,
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
    name: string;
    en_name: string;
    startDate: string;
    endDate: string;
    description: string;
    en_description: string;
    isEnabled: boolean;
    rules?: {
      id?: number;
      createBy?: number;
      updateBy?: number;
      createAt?: string;
      updateAt?: string;
      deleteAt?: number;
      luckyDrawId?: number;
      level?: number;
      title?: string;
      en_title?: string;
      giftId?: number;
      totalQuantity?: number;
      quantity?: number;
      residueQuantity?: number;
      probability?: string;
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
    }[];
  }>(`/lucky-draw/get/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取当前登陆餐厅品牌抽奖活动列表 GET /lucky-draw/list */
export async function luckyDrawRouterListLuckyDraw(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.luckyDrawRouterListLuckyDrawParams,
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
      name?: string;
      en_name?: string;
      startDate?: string;
      endDate?: string;
      description?: string;
      en_description?: string;
      isEnabled?: boolean;
      rules?: {
        id?: number;
        createBy?: number;
        updateBy?: number;
        createAt?: string;
        updateAt?: string;
        deleteAt?: number;
        luckyDrawId?: number;
        level?: number;
        title?: string;
        en_title?: string;
        giftId?: number;
        totalQuantity?: number;
        quantity?: number;
        residueQuantity?: number;
        probability?: string;
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
      }[];
    }[]
  >('/lucky-draw/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取当前登陆餐厅品牌抽奖活动列表 GET /lucky-draw/list */
export async function luckyDrawRouterListLuckyDraw2(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.luckyDrawRouterListLuckyDrawParams,
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
      name?: string;
      en_name?: string;
      startDate?: string;
      endDate?: string;
      description?: string;
      en_description?: string;
      isEnabled?: boolean;
      rules?: {
        id?: number;
        createBy?: number;
        updateBy?: number;
        createAt?: string;
        updateAt?: string;
        deleteAt?: number;
        luckyDrawId?: number;
        level?: number;
        title?: string;
        en_title?: string;
        giftId?: number;
        totalQuantity?: number;
        quantity?: number;
        residueQuantity?: number;
        probability?: string;
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
      }[];
    }[]
  >('/lucky-draw/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取当前登陆餐厅品牌抽奖活动分页列表 GET /lucky-draw/page */
export async function luckyDrawRouterPageLuckyDraw(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.luckyDrawRouterPageLuckyDrawParams,
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
      name?: string;
      en_name?: string;
      startDate?: string;
      endDate?: string;
      description?: string;
      en_description?: string;
      isEnabled?: boolean;
      rules?: {
        id?: number;
        createBy?: number;
        updateBy?: number;
        createAt?: string;
        updateAt?: string;
        deleteAt?: number;
        luckyDrawId?: number;
        level?: number;
        title?: string;
        en_title?: string;
        giftId?: number;
        totalQuantity?: number;
        quantity?: number;
        residueQuantity?: number;
        probability?: string;
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
      }[];
    }[];
  }>('/lucky-draw/page', {
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

/** 获取当前登陆餐厅品牌抽奖活动分页列表 GET /lucky-draw/page */
export async function luckyDrawRouterPageLuckyDraw2(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.luckyDrawRouterPageLuckyDrawParams,
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
      name?: string;
      en_name?: string;
      startDate?: string;
      endDate?: string;
      description?: string;
      en_description?: string;
      isEnabled?: boolean;
      rules?: {
        id?: number;
        createBy?: number;
        updateBy?: number;
        createAt?: string;
        updateAt?: string;
        deleteAt?: number;
        luckyDrawId?: number;
        level?: number;
        title?: string;
        en_title?: string;
        giftId?: number;
        totalQuantity?: number;
        quantity?: number;
        residueQuantity?: number;
        probability?: string;
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
      }[];
    }[];
  }>('/lucky-draw/page', {
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

/** 更新抽奖活动状态 POST /lucky-draw/status */
export async function luckyDrawRouterUpdateLuckyDrawStatus(
  body: {
    /** 抽奖活动ID */
    id: number;
    /** 是否启用 */
    isEnabled: boolean;
  },
  options?: { [key: string]: any },
) {
  return request<boolean>('/lucky-draw/status', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新抽奖活动状态 POST /lucky-draw/status */
export async function luckyDrawRouterUpdateLuckyDrawStatus2(
  body: {
    /** 抽奖活动ID */
    id: number;
    /** 是否启用 */
    isEnabled: boolean;
  },
  options?: { [key: string]: any },
) {
  return request<boolean>('/lucky-draw/status', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据Id更新餐厅抽奖活动,抽奖规则会清空重建 POST /lucky-draw/update/${param0} */
export async function luckyDrawRouterUpdateLuckyDrawById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.luckyDrawRouterUpdateLuckyDrawByIdParams,
  body: {
    updateData: {
      name?: string;
      en_name?: string;
      startDate?: string;
      endDate?: string;
      description?: string;
      en_description?: string;
      isEnabled?: boolean;
      rules?: {
        level?: number;
        title?: string;
        en_title?: string;
        giftId?: number;
        totalQuantity?: number;
        quantity?: number;
        probability?: number;
      }[];
    };
  },
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<boolean>(`/lucky-draw/update/${param0}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 根据Id更新餐厅抽奖活动,抽奖规则会清空重建 POST /lucky-draw/update/${param0} */
export async function luckyDrawRouterUpdateLuckyDrawById2(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.luckyDrawRouterUpdateLuckyDrawByIdParams,
  body: {
    updateData: {
      name?: string;
      en_name?: string;
      startDate?: string;
      endDate?: string;
      description?: string;
      en_description?: string;
      isEnabled?: boolean;
      rules?: {
        level?: number;
        title?: string;
        en_title?: string;
        giftId?: number;
        totalQuantity?: number;
        quantity?: number;
        probability?: number;
      }[];
    };
  },
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<boolean>(`/lucky-draw/update/${param0}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}
