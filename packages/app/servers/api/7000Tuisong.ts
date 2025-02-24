// @ts-ignore
/* eslint-disable */
import request from 'app/utils/request';

/** 创建推送 POST /notification/create-notification */
export async function notitficationRouterCreateNotification(
  body: {
    /** 标题 */
    title: string;
    /** 正文 */
    context: string;
    /** 备注 */
    remark: string;
    /** 站内信 */
    inSiteMessage?: boolean;
    /** APP推送 */
    appPush?: boolean;
    /** SMS推送 */
    smsPush?: boolean;
    /** 接受推送的客户id */
    memberIds?: number[];
    /** 接收方类枚举：CUSTOMER：顾客；POTENTIAL 潜在顾客 */
    receiverType?: 'CUSTOMER' | 'POTENTIAL';
  },
  options?: { [key: string]: any },
) {
  return request<{
    operatorType: 'ADMIN' | 'RESTAUARNT' | 'CUSTOMER';
    status: 'DRAFT' | 'PROCESS' | 'READY' | 'DONE' | 'FAIL';
    receiverType: 'CUSTOMER' | 'POTENTIAL';
    id: number;
    createBy: number;
    updateBy: number;
    createAt: string;
    updateAt: string;
    deleteAt: number;
    operatorId: number;
    brandId: number;
    restaurantId: number;
    title: string;
    context: string;
    remark: string;
    inSiteMessage: boolean;
    appPush: boolean;
    smsPush: boolean;
    receiverCount: number;
  }>('/notification/create-notification', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 创建推送 POST /notification/create-notification */
export async function notitficationRouterCreateNotification2(
  body: {
    /** 标题 */
    title: string;
    /** 正文 */
    context: string;
    /** 备注 */
    remark: string;
    /** 站内信 */
    inSiteMessage?: boolean;
    /** APP推送 */
    appPush?: boolean;
    /** SMS推送 */
    smsPush?: boolean;
    /** 接受推送的客户id */
    memberIds?: number[];
    /** 接收方类枚举：CUSTOMER：顾客；POTENTIAL 潜在顾客 */
    receiverType?: 'CUSTOMER' | 'POTENTIAL';
  },
  options?: { [key: string]: any },
) {
  return request<{
    operatorType: 'ADMIN' | 'RESTAUARNT' | 'CUSTOMER';
    status: 'DRAFT' | 'PROCESS' | 'READY' | 'DONE' | 'FAIL';
    receiverType: 'CUSTOMER' | 'POTENTIAL';
    id: number;
    createBy: number;
    updateBy: number;
    createAt: string;
    updateAt: string;
    deleteAt: number;
    operatorId: number;
    brandId: number;
    restaurantId: number;
    title: string;
    context: string;
    remark: string;
    inSiteMessage: boolean;
    appPush: boolean;
    smsPush: boolean;
    receiverCount: number;
  }>('/notification/create-notification', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除推送 POST /notification/delete-notification/${param0} */
export async function notitficationRouterDeleteNotification(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.notitficationRouterDeleteNotificationParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<{
    operatorType: 'ADMIN' | 'RESTAUARNT' | 'CUSTOMER';
    status: 'DRAFT' | 'PROCESS' | 'READY' | 'DONE' | 'FAIL';
    receiverType: 'CUSTOMER' | 'POTENTIAL';
    id: number;
    createBy: number;
    updateBy: number;
    createAt: string;
    updateAt: string;
    deleteAt: number;
    operatorId: number;
    brandId: number;
    restaurantId: number;
    title: string;
    context: string;
    remark: string;
    inSiteMessage: boolean;
    appPush: boolean;
    smsPush: boolean;
    receiverCount: number;
  }>(`/notification/delete-notification/${param0}`, {
    method: 'POST',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 删除推送 POST /notification/delete-notification/${param0} */
export async function notitficationRouterDeleteNotification2(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.notitficationRouterDeleteNotificationParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<{
    operatorType: 'ADMIN' | 'RESTAUARNT' | 'CUSTOMER';
    status: 'DRAFT' | 'PROCESS' | 'READY' | 'DONE' | 'FAIL';
    receiverType: 'CUSTOMER' | 'POTENTIAL';
    id: number;
    createBy: number;
    updateBy: number;
    createAt: string;
    updateAt: string;
    deleteAt: number;
    operatorId: number;
    brandId: number;
    restaurantId: number;
    title: string;
    context: string;
    remark: string;
    inSiteMessage: boolean;
    appPush: boolean;
    smsPush: boolean;
    receiverCount: number;
  }>(`/notification/delete-notification/${param0}`, {
    method: 'POST',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取推送详情 GET /notification/find-notification/${param0} */
export async function notitficationRouterFindNotification(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.notitficationRouterFindNotificationParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<{
    title: string;
    context: string;
    remark: string;
    inSiteMessage: boolean;
    appPush: boolean;
    smsPush: boolean;
    memberIds?: number[];
    receiverType: 'CUSTOMER' | 'POTENTIAL';
    operatorType: 'ADMIN' | 'RESTAUARNT' | 'CUSTOMER';
    status: 'DRAFT' | 'PROCESS' | 'READY' | 'DONE' | 'FAIL';
    id: number;
    createBy: number;
    updateBy: number;
    createAt: string;
    updateAt: string;
    deleteAt: number;
    operatorId: number;
    brandId: number;
    restaurantId: number;
    receiverCount: number;
    memberList: {
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
    }[];
    notificationBill?: {
      id?: number;
      createBy?: number;
      updateBy?: number;
      createAt?: string;
      updateAt?: string;
      deleteAt?: number;
      notificationId?: number;
      brandId?: number;
      restaurantId?: number;
      totalPrice?: number;
      notificationBillItems?: {
        type?: 'IN_SITE_MESSAGE' | 'APP_PUSH' | 'SMS_PUSH';
        id?: number;
        createBy?: number;
        updateBy?: number;
        createAt?: string;
        updateAt?: string;
        deleteAt?: number;
        notificationId?: number;
        brandId?: number;
        restaurantId?: number;
        unitPrice?: number;
        quantity?: number;
        totalPrice?: number;
        notificationBillId?: number;
      }[];
    };
  }>(`/notification/find-notification/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取推送详情 GET /notification/find-notification/${param0} */
export async function notitficationRouterFindNotification2(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.notitficationRouterFindNotificationParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<{
    title: string;
    context: string;
    remark: string;
    inSiteMessage: boolean;
    appPush: boolean;
    smsPush: boolean;
    memberIds?: number[];
    receiverType: 'CUSTOMER' | 'POTENTIAL';
    operatorType: 'ADMIN' | 'RESTAUARNT' | 'CUSTOMER';
    status: 'DRAFT' | 'PROCESS' | 'READY' | 'DONE' | 'FAIL';
    id: number;
    createBy: number;
    updateBy: number;
    createAt: string;
    updateAt: string;
    deleteAt: number;
    operatorId: number;
    brandId: number;
    restaurantId: number;
    receiverCount: number;
    memberList: {
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
    }[];
    notificationBill?: {
      id?: number;
      createBy?: number;
      updateBy?: number;
      createAt?: string;
      updateAt?: string;
      deleteAt?: number;
      notificationId?: number;
      brandId?: number;
      restaurantId?: number;
      totalPrice?: number;
      notificationBillItems?: {
        type?: 'IN_SITE_MESSAGE' | 'APP_PUSH' | 'SMS_PUSH';
        id?: number;
        createBy?: number;
        updateBy?: number;
        createAt?: string;
        updateAt?: string;
        deleteAt?: number;
        notificationId?: number;
        brandId?: number;
        restaurantId?: number;
        unitPrice?: number;
        quantity?: number;
        totalPrice?: number;
        notificationBillId?: number;
      }[];
    };
  }>(`/notification/find-notification/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 分页查询推送列表 GET /notification/page-notification */
export async function notitficationRouterPageNotification(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.notitficationRouterPageNotificationParams,
  options?: { [key: string]: any },
) {
  return request<{
    page: number;
    pageSize: number;
    pageCount: number;
    totalCount: number;
    record: {
      operatorType?: 'ADMIN' | 'RESTAUARNT' | 'CUSTOMER';
      status?: 'DRAFT' | 'PROCESS' | 'READY' | 'DONE' | 'FAIL';
      receiverType?: 'CUSTOMER' | 'POTENTIAL';
      id?: number;
      createBy?: number;
      updateBy?: number;
      createAt?: string;
      updateAt?: string;
      deleteAt?: number;
      operatorId?: number;
      brandId?: number;
      restaurantId?: number;
      title?: string;
      context?: string;
      remark?: string;
      inSiteMessage?: boolean;
      appPush?: boolean;
      smsPush?: boolean;
      receiverCount?: number;
    }[];
  }>('/notification/page-notification', {
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

/** 分页查询推送列表 GET /notification/page-notification */
export async function notitficationRouterPageNotification2(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.notitficationRouterPageNotificationParams,
  options?: { [key: string]: any },
) {
  return request<{
    page: number;
    pageSize: number;
    pageCount: number;
    totalCount: number;
    record: {
      operatorType?: 'ADMIN' | 'RESTAUARNT' | 'CUSTOMER';
      status?: 'DRAFT' | 'PROCESS' | 'READY' | 'DONE' | 'FAIL';
      receiverType?: 'CUSTOMER' | 'POTENTIAL';
      id?: number;
      createBy?: number;
      updateBy?: number;
      createAt?: string;
      updateAt?: string;
      deleteAt?: number;
      operatorId?: number;
      brandId?: number;
      restaurantId?: number;
      title?: string;
      context?: string;
      remark?: string;
      inSiteMessage?: boolean;
      appPush?: boolean;
      smsPush?: boolean;
      receiverCount?: number;
    }[];
  }>('/notification/page-notification', {
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

/** 发送推送 POST /notification/send-notification/${param0} */
export async function notitficationRouterSendNotification(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.notitficationRouterSendNotificationParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<string>(`/notification/send-notification/${param0}`, {
    method: 'POST',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 发送推送 POST /notification/send-notification/${param0} */
export async function notitficationRouterSendNotification2(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.notitficationRouterSendNotificationParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<string>(`/notification/send-notification/${param0}`, {
    method: 'POST',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 更新推送 POST /notification/update-notification/${param0} */
export async function notitficationRouterUpdateNotification(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.notitficationRouterUpdateNotificationParams,
  body: {
    /** 标题 */
    title: string;
    /** 正文 */
    context: string;
    /** 备注 */
    remark: string;
    /** 站内信 */
    inSiteMessage?: boolean;
    /** APP推送 */
    appPush?: boolean;
    /** SMS推送 */
    smsPush?: boolean;
    /** 接受推送的客户id */
    memberIds?: number[];
  },
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<{
    operatorType: 'ADMIN' | 'RESTAUARNT' | 'CUSTOMER';
    status: 'DRAFT' | 'PROCESS' | 'READY' | 'DONE' | 'FAIL';
    receiverType: 'CUSTOMER' | 'POTENTIAL';
    id: number;
    createBy: number;
    updateBy: number;
    createAt: string;
    updateAt: string;
    deleteAt: number;
    operatorId: number;
    brandId: number;
    restaurantId: number;
    title: string;
    context: string;
    remark: string;
    inSiteMessage: boolean;
    appPush: boolean;
    smsPush: boolean;
    receiverCount: number;
  }>(`/notification/update-notification/${param0}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 更新推送 POST /notification/update-notification/${param0} */
export async function notitficationRouterUpdateNotification2(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.notitficationRouterUpdateNotificationParams,
  body: {
    /** 标题 */
    title: string;
    /** 正文 */
    context: string;
    /** 备注 */
    remark: string;
    /** 站内信 */
    inSiteMessage?: boolean;
    /** APP推送 */
    appPush?: boolean;
    /** SMS推送 */
    smsPush?: boolean;
    /** 接受推送的客户id */
    memberIds?: number[];
  },
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<{
    operatorType: 'ADMIN' | 'RESTAUARNT' | 'CUSTOMER';
    status: 'DRAFT' | 'PROCESS' | 'READY' | 'DONE' | 'FAIL';
    receiverType: 'CUSTOMER' | 'POTENTIAL';
    id: number;
    createBy: number;
    updateBy: number;
    createAt: string;
    updateAt: string;
    deleteAt: number;
    operatorId: number;
    brandId: number;
    restaurantId: number;
    title: string;
    context: string;
    remark: string;
    inSiteMessage: boolean;
    appPush: boolean;
    smsPush: boolean;
    receiverCount: number;
  }>(`/notification/update-notification/${param0}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}
