// @ts-ignore
/* eslint-disable */
import request from 'app/utils/request';

/** 获取菜系详情 GET /restaurant/cuisine-type/find-cuisine-type/${param0} */
export async function cuisineTypeRouterFindCuisineType(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.cuisineTypeRouterFindCuisineTypeParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/restaurant/cuisine-type/find-cuisine-type/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取菜系详情 GET /restaurant/cuisine-type/find-cuisine-type/${param0} */
export async function cuisineTypeRouterFindCuisineType2(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.cuisineTypeRouterFindCuisineTypeParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/restaurant/cuisine-type/find-cuisine-type/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取菜系列表 GET /restaurant/cuisine-type/list-cuisine-type */
export async function cuisineTypeRouterListCuisineType(options?: { [key: string]: any }) {
  return request<
    {
      id?: number;
      createBy?: number;
      updateBy?: number;
      createAt?: string;
      updateAt?: string;
      deleteAt?: number;
      cuisineTypeName?: string;
      cuisineTypeNameEn?: string;
    }[]
  >('/restaurant/cuisine-type/list-cuisine-type', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取菜系列表 GET /restaurant/cuisine-type/list-cuisine-type */
export async function cuisineTypeRouterListCuisineType2(options?: { [key: string]: any }) {
  return request<
    {
      id?: number;
      createBy?: number;
      updateBy?: number;
      createAt?: string;
      updateAt?: string;
      deleteAt?: number;
      cuisineTypeName?: string;
      cuisineTypeNameEn?: string;
    }[]
  >('/restaurant/cuisine-type/list-cuisine-type', {
    method: 'GET',
    ...(options || {}),
  });
}
