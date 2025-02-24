// @ts-ignore
/* eslint-disable */
import request from 'app/utils/request';

/** 创建餐厅NFT信息 POST /restaurant/nfc/create */
export async function restaurantNfcRouterCreateRestaurantNfc(
  body: {
    /** NFT图片 */
    photo: string;
    /** NFT描述 */
    description?: string;
    /** NFT英文描述 */
    en_description?: string;
    /** NFT地址 */
    address?: string;
  },
  options?: { [key: string]: any },
) {
  return request<boolean>('/restaurant/nfc/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 创建餐厅NFT信息 POST /restaurant/nfc/create */
export async function restaurantNfcRouterCreateRestaurantNfc2(
  body: {
    /** NFT图片 */
    photo: string;
    /** NFT描述 */
    description?: string;
    /** NFT英文描述 */
    en_description?: string;
    /** NFT地址 */
    address?: string;
  },
  options?: { [key: string]: any },
) {
  return request<boolean>('/restaurant/nfc/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据Id删除餐厅NFT POST /restaurant/nfc/delete/${param0} */
export async function restaurantNfcRouterDeleteRestaurantNfcById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.restaurantNFCRouterDeleteRestaurantNFCByIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<boolean>(`/restaurant/nfc/delete/${param0}`, {
    method: 'POST',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 根据Id删除餐厅NFT POST /restaurant/nfc/delete/${param0} */
export async function restaurantNfcRouterDeleteRestaurantNfcById2(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.restaurantNFCRouterDeleteRestaurantNFCByIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<boolean>(`/restaurant/nfc/delete/${param0}`, {
    method: 'POST',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取当前登陆餐厅品牌餐厅NFT GET /restaurant/nfc/get-by-login */
export async function restaurantNfcRouterGetRestaurantNfc(options?: { [key: string]: any }) {
  return request<any>('/restaurant/nfc/get-by-login', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取当前登陆餐厅品牌餐厅NFT GET /restaurant/nfc/get-by-login */
export async function restaurantNfcRouterGetRestaurantNfc2(options?: { [key: string]: any }) {
  return request<any>('/restaurant/nfc/get-by-login', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 根据Id获取餐厅NFT详情 GET /restaurant/nfc/get/${param0} */
export async function restaurantNfcRouterGetRestaurantNfcById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.restaurantNFCRouterGetRestaurantNFCByIdParams,
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
    restaurantId: number;
    photo: string;
    description: string;
    en_description: string;
    address: string;
  }>(`/restaurant/nfc/get/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 根据Id获取餐厅NFT详情 GET /restaurant/nfc/get/${param0} */
export async function restaurantNfcRouterGetRestaurantNfcById2(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.restaurantNFCRouterGetRestaurantNFCByIdParams,
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
    restaurantId: number;
    photo: string;
    description: string;
    en_description: string;
    address: string;
  }>(`/restaurant/nfc/get/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 根据Id更新餐厅NFT POST /restaurant/nfc/update/${param0} */
export async function restaurantNfcRouterUpdateRestaurantNfcById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.restaurantNFCRouterUpdateRestaurantNFCByIdParams,
  body: {
    updateData: { photo?: string; description?: string; en_description?: string; address?: string };
  },
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<boolean>(`/restaurant/nfc/update/${param0}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 根据Id更新餐厅NFT POST /restaurant/nfc/update/${param0} */
export async function restaurantNfcRouterUpdateRestaurantNfcById2(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.restaurantNFCRouterUpdateRestaurantNFCByIdParams,
  body: {
    updateData: { photo?: string; description?: string; en_description?: string; address?: string };
  },
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<boolean>(`/restaurant/nfc/update/${param0}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}
