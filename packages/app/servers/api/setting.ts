// @ts-ignore
/* eslint-disable */
import request from 'app/utils/request';

/** 更新通知配置 GET /member/setting/find-setting */
export async function getSettingFindSetting(options?: { [key: string]: any }) {
  return request<{
    code: string;
    msg: string;
    data?: {
      memberId?: number;
      notifyTransUpdate?: boolean;
      notifyAbnormalAlarm?: boolean;
      notifyPayRequest?: boolean;
      notifyCardActivity?: boolean;
      notifyCustomerSupport?: boolean;
      notifyBalanceAlarm?: boolean;
      notifySecureAlarm?: boolean;
      notifySummary?: boolean;
      sysAppUpdate?: boolean;
      sysSalesPromotion?: boolean;
      sysSurvey?: boolean;
    };
  }>('/member/setting/find-setting', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 更新通知配置 GET /member/setting/find-setting */
export async function getSettingFindSetting2(options?: { [key: string]: any }) {
  return request<{
    code: string;
    msg: string;
    data?: {
      memberId?: number;
      notifyTransUpdate?: boolean;
      notifyAbnormalAlarm?: boolean;
      notifyPayRequest?: boolean;
      notifyCardActivity?: boolean;
      notifyCustomerSupport?: boolean;
      notifyBalanceAlarm?: boolean;
      notifySecureAlarm?: boolean;
      notifySummary?: boolean;
      sysAppUpdate?: boolean;
      sysSalesPromotion?: boolean;
      sysSurvey?: boolean;
    };
  }>('/member/setting/find-setting', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 更新通知配置 POST /member/setting/update-setting */
export async function postSettingUpdateSetting(
  body: {
    /** 会员id */
    memberId: number;
    /** 交易状态更新 */
    notifyTransUpdate: boolean;
    /** 欺诈或可疑活动报警 */
    notifyAbnormalAlarm: boolean;
    /** 付款请求通知 */
    notifyPayRequest: boolean;
    /** Card Activity Notification */
    notifyCardActivity: boolean;
    /** 客户支持通知 */
    notifyCustomerSupport: boolean;
    /** 账户余额警报 */
    notifyBalanceAlarm: boolean;
    /** 安全警报 */
    notifySecureAlarm: boolean;
    /** 每日或每周摘要 */
    notifySummary: boolean;
    /** 应用程序更新与增强 */
    sysAppUpdate: boolean;
    /** 促销优惠与更新 */
    sysSalesPromotion: boolean;
    /** 参与调研 */
    sysSurvey: boolean;
  },
  options?: { [key: string]: any },
) {
  return request<{
    code: string;
    msg: string;
    data?: {
      memberId?: number;
      notifyTransUpdate?: boolean;
      notifyAbnormalAlarm?: boolean;
      notifyPayRequest?: boolean;
      notifyCardActivity?: boolean;
      notifyCustomerSupport?: boolean;
      notifyBalanceAlarm?: boolean;
      notifySecureAlarm?: boolean;
      notifySummary?: boolean;
      sysAppUpdate?: boolean;
      sysSalesPromotion?: boolean;
      sysSurvey?: boolean;
    };
  }>('/member/setting/update-setting', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新通知配置 POST /member/setting/update-setting */
export async function postSettingUpdateSetting2(
  body: {
    /** 会员id */
    memberId: number;
    /** 交易状态更新 */
    notifyTransUpdate: boolean;
    /** 欺诈或可疑活动报警 */
    notifyAbnormalAlarm: boolean;
    /** 付款请求通知 */
    notifyPayRequest: boolean;
    /** Card Activity Notification */
    notifyCardActivity: boolean;
    /** 客户支持通知 */
    notifyCustomerSupport: boolean;
    /** 账户余额警报 */
    notifyBalanceAlarm: boolean;
    /** 安全警报 */
    notifySecureAlarm: boolean;
    /** 每日或每周摘要 */
    notifySummary: boolean;
    /** 应用程序更新与增强 */
    sysAppUpdate: boolean;
    /** 促销优惠与更新 */
    sysSalesPromotion: boolean;
    /** 参与调研 */
    sysSurvey: boolean;
  },
  options?: { [key: string]: any },
) {
  return request<{
    code: string;
    msg: string;
    data?: {
      memberId?: number;
      notifyTransUpdate?: boolean;
      notifyAbnormalAlarm?: boolean;
      notifyPayRequest?: boolean;
      notifyCardActivity?: boolean;
      notifyCustomerSupport?: boolean;
      notifyBalanceAlarm?: boolean;
      notifySecureAlarm?: boolean;
      notifySummary?: boolean;
      sysAppUpdate?: boolean;
      sysSalesPromotion?: boolean;
      sysSurvey?: boolean;
    };
  }>('/member/setting/update-setting', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
