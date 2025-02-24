// @ts-ignore
/* eslint-disable */
import request from 'app/utils/request';

/** 获取全局配置 GET /golbal-config/find-global-config */
export async function globalConfigRouterFindGlobalConfig(options?: { [key: string]: any }) {
  return request<{
    id: number;
    createBy: number;
    updateBy: number;
    createAt: string;
    updateAt: string;
    deleteAt: number;
    pointsName: string;
    bonusPointsRangeStart: number;
    bonusPointsRangeEnd: number;
    appSignInBonus: number;
    pushFeeSms: number;
    pushFeeApp: number;
    luckyDrawCost: number;
    signInterval: number;
    smsExample: string;
    nftBackgourndUrl: string;
    inviteBonus: number;
    resturantSignInCommission: number;
  }>('/golbal-config/find-global-config', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取全局配置 GET /golbal-config/find-global-config */
export async function globalConfigRouterFindGlobalConfig2(options?: { [key: string]: any }) {
  return request<{
    id: number;
    createBy: number;
    updateBy: number;
    createAt: string;
    updateAt: string;
    deleteAt: number;
    pointsName: string;
    bonusPointsRangeStart: number;
    bonusPointsRangeEnd: number;
    appSignInBonus: number;
    pushFeeSms: number;
    pushFeeApp: number;
    luckyDrawCost: number;
    signInterval: number;
    smsExample: string;
    nftBackgourndUrl: string;
    inviteBonus: number;
    resturantSignInCommission: number;
  }>('/golbal-config/find-global-config', {
    method: 'GET',
    ...(options || {}),
  });
}
