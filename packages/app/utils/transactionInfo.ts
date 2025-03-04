/*
 * @Date: 2025-03-03 23:26:42
 * @LastEditors: yosan
 * @LastEditTime: 2025-03-04 10:52:27
 * @FilePath: /ezgg-app/packages/app/utils/transactionInfo.ts
 */
import {formatDateTime, formatTokenAmount} from './index';
import {getChainInfo} from './chain';

// 创建通用的交易信息项
export const createTransactionInfoItem = (
  label: string,
  value: string,
  options: {
    isStatus?: boolean;
    isCopyable?: boolean;
    isTruncated?: boolean;
  } = {},
) => ({
  label,
  value,
  isStatus: false,
  isCopyable: false,
  isTruncated: false,
  ...options,
});

// 创建基础交易信息列表
export const createBaseTransactionInfoList = (orderData: any, t: any, isTo = true, isSender = false) => {
  const infoList = [createTransactionInfoItem(t('home.order.date'), formatDateTime(orderData?.transactionTime))];
  if (isTo) {
    infoList.push(
      createTransactionInfoItem(
        t('home.order.to'),
        createUserNicknameDisplay(isSender ? orderData?.senderMember : orderData?.receiverMember),
        {
          isCopyable: isSender ? !!orderData?.senderMember?.nickname : !!orderData?.receiverMember?.nickname,
        },
      ),
    );
  }
  infoList.push(
    createTransactionInfoItem(t('home.order.transactionHash'), orderData?.transactionHash || '', {
      isCopyable: !!orderData?.transactionHash,
      isTruncated: true,
    }),
  );
  return infoList;
};

// 创建金额显示信息
export const createAmountDisplay = (orderData: any) => {
  const chainName = getChainInfo(orderData?.chainId)?.name || '';
  return `${formatTokenAmount(orderData?.amount, orderData?.tokenDecimals)} ${orderData?.tokenSymbol} (${chainName})`;
};

// 创建网络费用显示信息
export const createNetworkFeeDisplay = (orderData: any) => {
  const chainName = getChainInfo(orderData?.chainId)?.name || '';
  return `${formatTokenAmount(orderData?.networkFee, orderData?.tokenDecimals)} ${
    orderData?.tokenSymbol
  } (${chainName})`;
};

// 创建用户昵称显示信息
export const createUserNicknameDisplay = (member: any) => {
  return member?.nickname ? `@${member?.nickname}` : '-';
};

// 创建交易状态显示信息
export const createStatusDisplay = (status: string | undefined) => {
  return status || '-';
};
