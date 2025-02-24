// @ts-ignore
/* eslint-disable */
import request from 'app/utils/request';

/** 获取餐厅介绍图片信息 GET /restaurant/image-caption/list */
export async function restaurantImageCaptionRouterListRestaurantImageCaption(options?: {
  [key: string]: any;
}) {
  return request<
    {
      id?: number;
      createBy?: number;
      updateBy?: number;
      createAt?: string;
      updateAt?: string;
      deleteAt?: number;
      restaurantId?: number;
      imageUrl?: string;
      sort?: number;
    }[]
  >('/restaurant/image-caption/list', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取餐厅介绍图片信息 GET /restaurant/image-caption/list */
export async function restaurantImageCaptionRouterListRestaurantImageCaption2(options?: {
  [key: string]: any;
}) {
  return request<
    {
      id?: number;
      createBy?: number;
      updateBy?: number;
      createAt?: string;
      updateAt?: string;
      deleteAt?: number;
      restaurantId?: number;
      imageUrl?: string;
      sort?: number;
    }[]
  >('/restaurant/image-caption/list', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 更新餐厅介绍图片信息 POST /restaurant/image-caption/save */
export async function restaurantImageCaptionRouterUpdateRestaurantImageCaption(
  body: {
    /** 餐厅介绍图片集合 */
    images: { imageUrl?: string; sort?: number }[];
  },
  options?: { [key: string]: any },
) {
  return request<boolean>('/restaurant/image-caption/save', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新餐厅介绍图片信息 POST /restaurant/image-caption/save */
export async function restaurantImageCaptionRouterUpdateRestaurantImageCaption2(
  body: {
    /** 餐厅介绍图片集合 */
    images: { imageUrl?: string; sort?: number }[];
  },
  options?: { [key: string]: any },
) {
  return request<boolean>('/restaurant/image-caption/save', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
