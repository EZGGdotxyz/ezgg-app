// @ts-ignore
/* eslint-disable */
import request from 'app/utils/request';

/** 获取餐厅地区列表 GET /restaurant/region/list */
export async function restaurantRegionRouterListRestaurantRegion(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.restaurantRegionRouterListRestaurantRegionParams,
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
      code?: string;
      name?: string;
      en_name?: string;
    }[]
  >('/restaurant/region/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取餐厅地区列表 GET /restaurant/region/list */
export async function restaurantRegionRouterListRestaurantRegion2(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.restaurantRegionRouterListRestaurantRegionParams,
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
      code?: string;
      name?: string;
      en_name?: string;
    }[]
  >('/restaurant/region/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取餐厅地区分页列表 GET /restaurant/region/page */
export async function restaurantRegionRouterPageRestaurant(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.restaurantRegionRouterPageRestaurantParams,
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
      code?: string;
      name?: string;
      en_name?: string;
    }[];
  }>('/restaurant/region/page', {
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

/** 获取餐厅地区分页列表 GET /restaurant/region/page */
export async function restaurantRegionRouterPageRestaurant2(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.restaurantRegionRouterPageRestaurantParams,
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
      code?: string;
      name?: string;
      en_name?: string;
    }[];
  }>('/restaurant/region/page', {
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
