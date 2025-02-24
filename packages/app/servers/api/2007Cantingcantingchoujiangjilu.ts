// @ts-ignore
/* eslint-disable */
import request from 'app/utils/request';

/** 获取会员抽奖记录分页 GET /member-lucky-draw/page */
export async function memberLuckyDrawRouterPageMemberLuchyDraw(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.memberLuckyDrawRouterPageMemberLuchyDrawParams,
  options?: { [key: string]: any },
) {
  return request<{
    page: number;
    pageSize: number;
    pageCount: number;
    totalCount: number;
    record: {
      luckyGiftCategory?: 'DISCOUNT' | 'DESSERT' | 'FOOD' | 'BEVERAGE';
      id?: number;
      createBy?: number;
      updateBy?: number;
      createAt?: string;
      updateAt?: string;
      deleteAt?: number;
      brandId?: number;
      restaurantId?: number;
      memberId?: number;
      luckyDrawId?: number;
      luckyDrawName?: string;
      luckyDrawEn_name?: string;
      luckyDrawStartDate?: string;
      luckyDrawEndDate?: string;
      luckyDrawDescription?: string;
      luckyDrawEn_description?: string;
      luckyDrawRuleId?: number;
      luckyDrawRuleLevel?: number;
      luckyDrawRuleTitle?: string;
      luckyDrawRuleEn_title?: string;
      luckyDrawRuleTotalQuantity?: number;
      luckyDrawRuleQuantity?: number;
      luckyDrawRuleResidueQuantity?: number;
      luckyDrawRuleProbability?: string;
      luckyDrawGiftId?: number;
      luckyDrawGiftName?: string;
      luckyDrawGiftEN_name?: string;
      luckyDrawGiftPrice?: string;
      luckyDrawGiftPhoto?: string;
      luckyDrawGiftDescription?: string;
      luckyDrawGiftEn_description?: string;
      isSettlement?: boolean;
      settlementTime?: string;
      member: {
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
      };
    }[];
  }>('/member-lucky-draw/page', {
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

/** 获取会员抽奖记录分页 GET /member-lucky-draw/page */
export async function memberLuckyDrawRouterPageMemberLuchyDraw2(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.memberLuckyDrawRouterPageMemberLuchyDrawParams,
  options?: { [key: string]: any },
) {
  return request<{
    page: number;
    pageSize: number;
    pageCount: number;
    totalCount: number;
    record: {
      luckyGiftCategory?: 'DISCOUNT' | 'DESSERT' | 'FOOD' | 'BEVERAGE';
      id?: number;
      createBy?: number;
      updateBy?: number;
      createAt?: string;
      updateAt?: string;
      deleteAt?: number;
      brandId?: number;
      restaurantId?: number;
      memberId?: number;
      luckyDrawId?: number;
      luckyDrawName?: string;
      luckyDrawEn_name?: string;
      luckyDrawStartDate?: string;
      luckyDrawEndDate?: string;
      luckyDrawDescription?: string;
      luckyDrawEn_description?: string;
      luckyDrawRuleId?: number;
      luckyDrawRuleLevel?: number;
      luckyDrawRuleTitle?: string;
      luckyDrawRuleEn_title?: string;
      luckyDrawRuleTotalQuantity?: number;
      luckyDrawRuleQuantity?: number;
      luckyDrawRuleResidueQuantity?: number;
      luckyDrawRuleProbability?: string;
      luckyDrawGiftId?: number;
      luckyDrawGiftName?: string;
      luckyDrawGiftEN_name?: string;
      luckyDrawGiftPrice?: string;
      luckyDrawGiftPhoto?: string;
      luckyDrawGiftDescription?: string;
      luckyDrawGiftEn_description?: string;
      isSettlement?: boolean;
      settlementTime?: string;
      member: {
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
      };
    }[];
  }>('/member-lucky-draw/page', {
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
