declare namespace API {
  type clockInRouterDeleteClockInByIdParams = {
    /** 打卡活动Id */
    id: number;
  };

  type clockInRouterGetClockInByIdParams = {
    /** 打卡活动Id */
    id: number;
  };

  type clockInRouterListClockInParams = {
    name?: string;
    enName?: string;
  };

  type clockInRouterPageClockInParams = {
    page?: number;
    pageSize?: number;
    name?: string;
    enName?: string;
  };

  type clockInRouterUpdateClockInByIdParams = {
    /** 打卡活动Id */
    id: number;
  };

  type cuisineTypeRouterFindCuisineTypeParams = {
    id: number;
  };

  type error = {
    message: string;
    code: string;
    issues?: { message?: string }[];
  };

  type giftRouterDeleteGiftByIdParams = {
    /** 礼物Id */
    id: number;
  };

  type giftRouterGetGiftByIdParams = {
    /** 礼物Id */
    id: number;
  };

  type giftRouterListGiftParams = {
    type?: 'LUCKY_DRAW' | 'SIGN_IN';
    isExchange?: boolean;
    name?: string;
    enName?: string;
  };

  type giftRouterPageGiftParams = {
    page?: number;
    pageSize?: number;
    type?: 'LUCKY_DRAW' | 'SIGN_IN';
    isExchange?: boolean;
    name?: string;
    enName?: string;
  };

  type giftRouterUpdateGiftByIdParams = {
    /** 礼物Id */
    id: number;
  };

  type inviteCodeRouterDeleteInviteCodeParams = {
    /** 邀请码id */
    id: number;
  };

  type inviteCodeRouterFindInviteCodeParams = {
    /** 邀请码id */
    id: number;
  };

  type inviteCodeRouterPageInviteCodeParams = {
    page?: number;
    pageSize?: number;
    enabled?: boolean;
  };

  type inviteCodeRouterUpdateInviteCodeParams = {
    /** 邀请码id */
    id: number;
  };

  type luckyDrawRouterDeleteLuckyDrawByIdParams = {
    /** 抽奖活动Id */
    id: number;
  };

  type luckyDrawRouterGetLuckyDrawByIdParams = {
    /** 抽奖活动Id */
    id: number;
  };

  type luckyDrawRouterListLuckyDrawParams = {
    name?: string;
    enName?: string;
  };

  type luckyDrawRouterPageLuckyDrawParams = {
    page?: number;
    pageSize?: number;
    name?: string;
    enName?: string;
  };

  type luckyDrawRouterUpdateLuckyDrawByIdParams = {
    /** 抽奖活动Id */
    id: number;
  };

  type memberGiftExchangeRouterGetMemberGiftExchangeByIdParams = {
    /** 会员礼物记录Id */
    id: number;
  };

  type memberGiftExchangeRouterPageMemberGiftExchangeParams = {
    page?: number;
    pageSize?: number;
    giftName?: string;
    giftEnName?: string;
    memberPhone?: string;
    memberAccount?: string;
  };

  type memberLuckyDrawRouterPageMemberLuchyDrawParams = {
    page?: number;
    pageSize?: number;
    luckyDrawId?: number;
    luckyDrawName?: string;
    luckyDrawEnName?: string;
    memberPhone?: string;
    memberAccount?: string;
  };

  type nfcSignInRouterPageSignInParams = {
    page?: number;
    pageSize?: number;
    /** 品牌id */
    brandId?: number;
    /** 餐厅id */
    restaurantId?: number;
    /** 会员id */
    memberId?: number;
    hasGift?: string;
  };

  type notitficationRouterDeleteNotificationParams = {
    /** 推送id */
    id: number;
  };

  type notitficationRouterFindNotificationParams = {
    /** 推送id */
    id: number;
  };

  type notitficationRouterPageNotificationParams = {
    page?: number;
    pageSize?: number;
    /** 推送title */
    title?: string;
    /** 接收方类枚举：CUSTOMER：顾客；POTENTIAL 潜在顾客 */
    receiverType?: 'CUSTOMER' | 'POTENTIAL';
  };

  type notitficationRouterSendNotificationParams = {
    /** 推送id */
    id: number;
  };

  type notitficationRouterUpdateNotificationParams = {
    /** 推送id */
    id: number;
  };

  type phoneAreaCodeRouterFindPhoneAreaCodeParams = {
    /** 地区代码 */
    countryCode: string;
  };

  type phoneAreaCodeRouterPagePhoneAreaCodeParams = {
    page?: number;
    pageSize?: number;
    /** 检索词 */
    search?: string;
    /** 国家地区代码集合，多个用逗号分割 */
    countryCodes?: string;
  };

  type restaurantMemberRouterGetMemberByIdParams = {
    /** 会员Id */
    id: number;
  };

  type restaurantMemberRouterPageMemberGiftExchangeParams = {
    page?: number;
    pageSize?: number;
    /** 会员Id */
    memberId: number;
    restaurantId?: number;
    giftName?: string;
    giftEnName?: string;
  };

  type restaurantMemberRouterPageMemberParams = {
    page?: number;
    pageSize?: number;
    brandId?: number;
    restaurantId?: number;
    /** 昵称 */
    nickname?: string;
    /** 顾客标签，多个标签用逗号分割 */
    tags?: string;
  };

  type restaurantMemberRouterPageRestaurantLatentMemberParams = {
    page?: number;
    pageSize?: number;
    brandId?: number;
  };

  type restaurantMemberRouterUpdateMemberTagParams = {
    /** 顾客id */
    memberId: number;
  };

  type restaurantNFCRouterDeleteRestaurantNFCByIdParams = {
    /** 餐厅NFTId */
    id: number;
  };

  type restaurantNFCRouterGetRestaurantNFCByIdParams = {
    /** 餐厅NFTId */
    id: number;
  };

  type restaurantNFCRouterUpdateRestaurantNFCByIdParams = {
    /** 餐厅NFTId */
    id: number;
  };

  type restaurantRegionRouterListRestaurantRegionParams = {
    name?: string;
    enName?: string;
  };

  type restaurantRegionRouterPageRestaurantParams = {
    page?: number;
    pageSize?: number;
    name?: string;
    enName?: string;
  };

  type restaurantRouterGetRestaurantByIdParams = {
    /** 餐厅Id */
    id: number;
  };

  type restaurantRouterListRestaurantParams = {
    name?: string;
    enName?: string;
  };

  type restaurantRouterPageRestaurantParams = {
    page?: number;
    pageSize?: number;
    name?: string;
    enName?: string;
  };

  type restaurantUserManageRouterDeleteRestaurantUserByIdParams = {
    /** 用户Id */
    id: number;
  };

  type restaurantUserManageRouterGetRestaurantUserByIdParams = {
    /** 用户Id */
    id: number;
  };

  type restaurantUserManageRouterListRestaurantUsersParams = {
    userName?: string;
    phone?: string;
    account?: string;
    isEnabled?: boolean;
  };

  type restaurantUserManageRouterPageRestaurantUsersParams = {
    page?: number;
    pageSize?: number;
    userName?: string;
    phone?: string;
    account?: string;
    isEnabled?: boolean;
  };

  type restaurantUserManageRouterUpdateRestaurantUserByIdParams = {
    /** 用户Id */
    id: number;
  };

  type restaurantUserRouterDeleteRestaurantUserByIdParams = {
    /** 用户Id */
    id: number;
  };

  type resturantWalletPointsRouterPageTransationParams = {
    page?: number;
    pageSize?: number;
  };

  type resturantWalletPreRechargeRouterPageTransationParams = {
    page?: number;
    pageSize?: number;
  };

  type statisticsRouterGetDailySignInLineChartInputsParams = {
    page?: number;
    pageSize?: number;
    /** 查询日期区间 - 开始时间 */
    startDate?: string;
    /** 查询日期区间 - 结束时间 */
    endDate?: string;
    /** 品牌ID */
    brandId?: number;
  };

  type statisticsRouterGetSignInLineChartParams = {
    page?: number;
    pageSize?: number;
    /** 查询日期区间 - 开始时间 */
    startDate?: string;
    /** 查询日期区间 - 结束时间 */
    endDate?: string;
  };
}
