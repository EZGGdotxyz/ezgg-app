// @ts-ignore
/* eslint-disable */
import request from 'app/utils/request';

/** 创建打卡活动及规则 POST /clock-in/create */
export async function clockInRouterCreateClockIn(
  body: {
    /** 打卡活动名称 */
    name: string;
    /** 打卡活动英文名称 */
    en_name: string;
    /** 开始时间，不填立刻开始 */
    startDate?: string;
    /** 结束时间，不填不会结束 */
    endDate?: string;
    /** 单次周期天数长度 */
    cycleDaysLength: number;
    /** 是否循环周期 */
    isLoop: boolean;
    /** 打卡活动描述 */
    description?: string;
    /** 打卡活动英文描述 */
    en_description?: string;
    /** 是否可用 */
    isEnabled: boolean;
    /** 打卡规则信息 */
    rules: {
      cycleDayNumber?: number;
      title?: string;
      en_title?: string;
      giftId?: number;
      quantity?: number;
    }[];
  },
  options?: { [key: string]: any },
) {
  return request<boolean>('/clock-in/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 创建打卡活动及规则 POST /clock-in/create */
export async function clockInRouterCreateClockIn2(
  body: {
    /** 打卡活动名称 */
    name: string;
    /** 打卡活动英文名称 */
    en_name: string;
    /** 开始时间，不填立刻开始 */
    startDate?: string;
    /** 结束时间，不填不会结束 */
    endDate?: string;
    /** 单次周期天数长度 */
    cycleDaysLength: number;
    /** 是否循环周期 */
    isLoop: boolean;
    /** 打卡活动描述 */
    description?: string;
    /** 打卡活动英文描述 */
    en_description?: string;
    /** 是否可用 */
    isEnabled: boolean;
    /** 打卡规则信息 */
    rules: {
      cycleDayNumber?: number;
      title?: string;
      en_title?: string;
      giftId?: number;
      quantity?: number;
    }[];
  },
  options?: { [key: string]: any },
) {
  return request<boolean>('/clock-in/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据Id删除餐厅打卡活动及其规则 POST /clock-in/delete/${param0} */
export async function clockInRouterDeleteClockInById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.clockInRouterDeleteClockInByIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<boolean>(`/clock-in/delete/${param0}`, {
    method: 'POST',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 根据Id删除餐厅打卡活动及其规则 POST /clock-in/delete/${param0} */
export async function clockInRouterDeleteClockInById2(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.clockInRouterDeleteClockInByIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<boolean>(`/clock-in/delete/${param0}`, {
    method: 'POST',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 根据Id获取餐厅打卡活动详情及其规则 GET /clock-in/get/${param0} */
export async function clockInRouterGetClockInById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.clockInRouterGetClockInByIdParams,
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
    name: string;
    en_name: string;
    startDate: string;
    endDate: string;
    cycleDaysLength: number;
    isLoop: boolean;
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
      clockInId?: number;
      cycleDayNumber?: number;
      title?: string;
      en_title?: string;
      giftId?: number;
      quantity?: number;
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
  }>(`/clock-in/get/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 根据Id获取餐厅打卡活动详情及其规则 GET /clock-in/get/${param0} */
export async function clockInRouterGetClockInById2(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.clockInRouterGetClockInByIdParams,
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
    name: string;
    en_name: string;
    startDate: string;
    endDate: string;
    cycleDaysLength: number;
    isLoop: boolean;
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
      clockInId?: number;
      cycleDayNumber?: number;
      title?: string;
      en_title?: string;
      giftId?: number;
      quantity?: number;
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
  }>(`/clock-in/get/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取当前登陆餐厅品牌打卡活动列表 GET /clock-in/list */
export async function clockInRouterListClockIn(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.clockInRouterListClockInParams,
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
      name?: string;
      en_name?: string;
      startDate?: string;
      endDate?: string;
      cycleDaysLength?: number;
      isLoop?: boolean;
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
        clockInId?: number;
        cycleDayNumber?: number;
        title?: string;
        en_title?: string;
        giftId?: number;
        quantity?: number;
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
  >('/clock-in/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取当前登陆餐厅品牌打卡活动列表 GET /clock-in/list */
export async function clockInRouterListClockIn2(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.clockInRouterListClockInParams,
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
      name?: string;
      en_name?: string;
      startDate?: string;
      endDate?: string;
      cycleDaysLength?: number;
      isLoop?: boolean;
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
        clockInId?: number;
        cycleDayNumber?: number;
        title?: string;
        en_title?: string;
        giftId?: number;
        quantity?: number;
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
  >('/clock-in/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取当前登陆餐厅品牌打卡活动分页列表 GET /clock-in/page */
export async function clockInRouterPageClockIn(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.clockInRouterPageClockInParams,
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
      name?: string;
      en_name?: string;
      startDate?: string;
      endDate?: string;
      cycleDaysLength?: number;
      isLoop?: boolean;
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
        clockInId?: number;
        cycleDayNumber?: number;
        title?: string;
        en_title?: string;
        giftId?: number;
        quantity?: number;
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
  }>('/clock-in/page', {
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

/** 获取当前登陆餐厅品牌打卡活动分页列表 GET /clock-in/page */
export async function clockInRouterPageClockIn2(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.clockInRouterPageClockInParams,
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
      name?: string;
      en_name?: string;
      startDate?: string;
      endDate?: string;
      cycleDaysLength?: number;
      isLoop?: boolean;
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
        clockInId?: number;
        cycleDayNumber?: number;
        title?: string;
        en_title?: string;
        giftId?: number;
        quantity?: number;
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
  }>('/clock-in/page', {
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

/** 更新抽奖活动状态 POST /clock-in/status */
export async function clockInRouterUpdateClockInStatus(
  body: {
    /** 打卡活动ID */
    id: number;
    /** 是否启用 */
    isEnabled: boolean;
  },
  options?: { [key: string]: any },
) {
  return request<boolean>('/clock-in/status', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新抽奖活动状态 POST /clock-in/status */
export async function clockInRouterUpdateClockInStatus2(
  body: {
    /** 打卡活动ID */
    id: number;
    /** 是否启用 */
    isEnabled: boolean;
  },
  options?: { [key: string]: any },
) {
  return request<boolean>('/clock-in/status', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据Id更新餐厅打卡活动及其规则 POST /clock-in/update/${param0} */
export async function clockInRouterUpdateClockInById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.clockInRouterUpdateClockInByIdParams,
  body: {
    updateData: {
      name?: string;
      en_name?: string;
      startDate?: string;
      endDate?: string;
      cycleDaysLength?: number;
      isLoop?: boolean;
      description?: string;
      en_description?: string;
      isEnabled?: boolean;
      rules?: {
        cycleDayNumber?: number;
        title?: string;
        en_title?: string;
        giftId?: number;
        quantity?: number;
      }[];
    };
  },
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<boolean>(`/clock-in/update/${param0}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 根据Id更新餐厅打卡活动及其规则 POST /clock-in/update/${param0} */
export async function clockInRouterUpdateClockInById2(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.clockInRouterUpdateClockInByIdParams,
  body: {
    updateData: {
      name?: string;
      en_name?: string;
      startDate?: string;
      endDate?: string;
      cycleDaysLength?: number;
      isLoop?: boolean;
      description?: string;
      en_description?: string;
      isEnabled?: boolean;
      rules?: {
        cycleDayNumber?: number;
        title?: string;
        en_title?: string;
        giftId?: number;
        quantity?: number;
      }[];
    };
  },
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<boolean>(`/clock-in/update/${param0}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}
