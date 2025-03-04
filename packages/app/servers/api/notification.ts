// @ts-ignore
/* eslint-disable */
import request from 'app/utils/request';

/** 分页查询通知列表 GET /member/notification/page-notification */
export async function getNotificationPageNotification(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getNotificationPageNotificationParams,
  options?: { [key: string]: any },
) {
  return request<{
    code: string;
    msg: string;
    data?: {
      page?: number;
      pageSize?: number;
      pageCount?: number;
      totalCount?: number;
      record?: {
        toMemberRole?: 'NONE' | 'SENDER' | 'RECEIVER';
        id?: number;
        createBy?: number;
        updateBy?: number;
        createAt?: string;
        updateAt?: string;
        deleteAt?: number;
        source?: string;
        subject?: string;
        action?: string;
        title?: string;
        context?: string;
        toMemberId?: number;
        status?: number;
        notifyAt?: string;
        readAt?: string;
        transactionHistoryId?: number;
        transaction: {
          transactionCategory?: 'SEND' | 'REQUEST' | 'DEPOSIT' | 'WITHDRAW';
          transactionType?: 'SEND' | 'REQUEST' | 'DEPOSIT' | 'WITHDRAW' | 'PAY_LINK' | 'QR_CODE';
          business?: 'LINK' | 'VAULT' | 'TRANSFER';
          transactionStatus?: 'PENDING' | 'ACCEPTED' | 'DECLINED';
          platform?: 'ETH' | 'SOLANA';
          network?: 'MAIN' | 'TEST' | 'DEV';
          id?: number;
          createBy?: number;
          updateBy?: number;
          createAt?: string;
          updateAt?: string;
          memberId?: number;
          transactionCode?: string;
          bizContractAddress?: string;
          senderMemberId?: number;
          senderDid?: string;
          senderWalletAddress?: string;
          receiverMemberId?: number;
          receiverDid?: string;
          receiverWalletAddress?: string;
          transactionTime?: string;
          transactionConfirmAt?: string;
          transactionHash?: string;
          chainId?: number;
          tokenSymbol?: string;
          tokenDecimals?: number;
          tokenContractAddress?: string;
          tokenPrice?: string;
          amount?: number;
          networkFee?: number;
          message?: string;
          senderMember: {
            id?: number;
            createBy?: number;
            updateBy?: number;
            createAt?: string;
            updateAt?: string;
            did?: string;
            createdAt?: string;
            nickname?: string;
            avatar?: string;
            memberLinkedAccount?: {
              id?: number;
              createBy?: number;
              updateBy?: number;
              createAt?: string;
              updateAt?: string;
              memberId?: number;
              did?: string;
              type?: string;
              detail?: string;
              search?: string;
            }[];
          };
          receiverMember: {
            id?: number;
            createBy?: number;
            updateBy?: number;
            createAt?: string;
            updateAt?: string;
            did?: string;
            createdAt?: string;
            nickname?: string;
            avatar?: string;
            memberLinkedAccount?: {
              id?: number;
              createBy?: number;
              updateBy?: number;
              createAt?: string;
              updateAt?: string;
              memberId?: number;
              did?: string;
              type?: string;
              detail?: string;
              search?: string;
            }[];
          };
        };
      }[];
    };
  }>('/member/notification/page-notification', {
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

/** 分页查询通知列表 GET /member/notification/page-notification */
export async function getNotificationPageNotification2(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getNotificationPageNotificationParams,
  options?: { [key: string]: any },
) {
  return request<{
    code: string;
    msg: string;
    data?: {
      page?: number;
      pageSize?: number;
      pageCount?: number;
      totalCount?: number;
      record?: {
        toMemberRole?: 'NONE' | 'SENDER' | 'RECEIVER';
        id?: number;
        createBy?: number;
        updateBy?: number;
        createAt?: string;
        updateAt?: string;
        deleteAt?: number;
        source?: string;
        subject?: string;
        action?: string;
        title?: string;
        context?: string;
        toMemberId?: number;
        status?: number;
        notifyAt?: string;
        readAt?: string;
        transactionHistoryId?: number;
        transaction: {
          transactionCategory?: 'SEND' | 'REQUEST' | 'DEPOSIT' | 'WITHDRAW';
          transactionType?: 'SEND' | 'REQUEST' | 'DEPOSIT' | 'WITHDRAW' | 'PAY_LINK' | 'QR_CODE';
          business?: 'LINK' | 'VAULT' | 'TRANSFER';
          transactionStatus?: 'PENDING' | 'ACCEPTED' | 'DECLINED';
          platform?: 'ETH' | 'SOLANA';
          network?: 'MAIN' | 'TEST' | 'DEV';
          id?: number;
          createBy?: number;
          updateBy?: number;
          createAt?: string;
          updateAt?: string;
          memberId?: number;
          transactionCode?: string;
          bizContractAddress?: string;
          senderMemberId?: number;
          senderDid?: string;
          senderWalletAddress?: string;
          receiverMemberId?: number;
          receiverDid?: string;
          receiverWalletAddress?: string;
          transactionTime?: string;
          transactionConfirmAt?: string;
          transactionHash?: string;
          chainId?: number;
          tokenSymbol?: string;
          tokenDecimals?: number;
          tokenContractAddress?: string;
          tokenPrice?: string;
          amount?: number;
          networkFee?: number;
          message?: string;
          senderMember: {
            id?: number;
            createBy?: number;
            updateBy?: number;
            createAt?: string;
            updateAt?: string;
            did?: string;
            createdAt?: string;
            nickname?: string;
            avatar?: string;
            memberLinkedAccount?: {
              id?: number;
              createBy?: number;
              updateBy?: number;
              createAt?: string;
              updateAt?: string;
              memberId?: number;
              did?: string;
              type?: string;
              detail?: string;
              search?: string;
            }[];
          };
          receiverMember: {
            id?: number;
            createBy?: number;
            updateBy?: number;
            createAt?: string;
            updateAt?: string;
            did?: string;
            createdAt?: string;
            nickname?: string;
            avatar?: string;
            memberLinkedAccount?: {
              id?: number;
              createBy?: number;
              updateBy?: number;
              createAt?: string;
              updateAt?: string;
              memberId?: number;
              did?: string;
              type?: string;
              detail?: string;
              search?: string;
            }[];
          };
        };
      }[];
    };
  }>('/member/notification/page-notification', {
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

/** 更新所有通知为已读 POST /member/notification/update-notification-all-status */
export async function postNotificationUpdateNotificationAllStatus(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.postNotificationUpdateNotificationAllStatusParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<{ code: string; msg: string }>(
    '/member/notification/update-notification-all-status',
    {
      method: 'POST',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/** 更新所有通知为已读 POST /member/notification/update-notification-all-status */
export async function postNotificationUpdateNotificationAllStatus2(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.postNotificationUpdateNotificationAllStatusParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<{ code: string; msg: string }>(
    '/member/notification/update-notification-all-status',
    {
      method: 'POST',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/** 更新通知为已读 POST /member/notification/update-notification-status/${param0} */
export async function postNotificationUpdateNotificationStatusId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.postNotificationUpdateNotificationStatusIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<{ code: string; msg: string }>(
    `/member/notification/update-notification-status/${param0}`,
    {
      method: 'POST',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/** 更新通知为已读 POST /member/notification/update-notification-status/${param0} */
export async function postNotificationUpdateNotificationStatusId2(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.postNotificationUpdateNotificationStatusIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<{ code: string; msg: string }>(
    `/member/notification/update-notification-status/${param0}`,
    {
      method: 'POST',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}
