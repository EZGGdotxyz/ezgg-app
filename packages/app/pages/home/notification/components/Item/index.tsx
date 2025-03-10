/*
 * @Date: 2023-12-08 16:25:15
 * @LastEditors: yosan
 * @LastEditTime: 2025-03-08 15:17:43
 * @FilePath: /ezgg-app/packages/app/pages/home/notification/components/Item/index.tsx
 */
import {AppImage, Button, Text, YStack, XStack, SizableText} from '@my/ui';
import {useRematchModel} from 'app/store/model';
import {useRouter} from 'solito/router';
import {useTranslation} from 'react-i18next';
import {ChevronDown, ChevronRight} from '@tamagui/lucide-icons';
import { formatNumber, formatTokenAmount, getCurrency} from 'app/utils';
import {getChainInfo} from 'app/utils/chain';
import dayjs from 'dayjs';
import {PrimaryColor} from 'app/config';
import {debounce} from 'lodash';
import {useCallback} from 'react';
import useResponse from 'app/hooks/useResponse';

type ItemProps = {
  item: any;
  isBorderBottom: boolean;
  itemKey: any;
  onRead: (item: any, action?: any) => void;
};

/** 通知类型枚举 */
export enum NotificationTopic {
  /** 普通常规通知 */
  GENERAL = 'GENERAL',

  /** 交易流程状态变更通知 (需配合 transactionUpdateAction 使用) */
  TRANS_UPDATE = 'TRANS_UPDATE',

  /** 欺诈/可疑活动实时警报 */
  ALARM = 'ALARM',

  /** 付款请求类通知 */
  PAY_REQUEST = 'PAY_REQUEST',

  /** 客户支持消息通知 */
  CUSTOMER_SUPPORT = 'CUSTOMER_SUPPORT',

  /** 账户余额不足提醒 */
  BALANCE_ALARM = 'BALANCE_ALARM',

  /** 账户安全风险提醒 */
  SECURE_ALARM = 'SECURE_ALARM',

  /** 周期账单/摘要总结推送 */
  SUMMARY = 'SUMMARY',

  /** 应用版本更新通知 */
  APP_UPDATE = 'APP_UPDATE',

  /** 销售促销信息推送 */
  SALES_PROMOTION = 'SALES_PROMOTION',

  /** 用户调研邀请 */
  SURVEY = 'SURVEY',

  /** 交易请求通知 */
  TRANS_REQUEST = 'TRANS_REQUEST',

  /** 交易发送通知 */
  TRANS_SEND = 'TRANS_SEND',
}

/** 交易状态更新动作 (需与 NotificationTopic.TRANS_UPDATE 组合使用) */
export enum TransactionUpdateAction {
  /** 支付/转账请求已被对方接受 */
  REQUEST_ACCEPTED = 'REQUEST_ACCEPTED',

  /** 支付/转账请求已被对方拒绝 */
  REQUEST_DECLINED = 'REQUEST_DECLINED',

  /** PayLink 付款链接已被点击并确认 */
  PAY_LINK_ACCEPTED = 'PAY_LINK_ACCEPTED',
}

const Item: React.FC<ItemProps> = ({item, onRead}: ItemProps) => {
  const {t, i18n} = useTranslation();
  const {push} = useRouter();
  const [{userInfo}] = useRematchModel('user');
  const {appScale} = useResponse();

  // 使用 useCallback 和 debounce 创建防抖函数
  const handleCancel = useCallback(
    debounce((e: any) => {
      e.stopPropagation();
      e.preventDefault();
      onRead(item, 'cancel');
    }, 300),
    [item, onRead],
  );

  const handleReceive = useCallback(
    debounce((e: any) => {
      e.stopPropagation();
      e.preventDefault();
      onRead(item, 'receive');
    }, 300),
    [item, onRead],
  );

  const dealType = (transaction: any) => {
    if (!transaction || !userInfo) {
      return {
        title: '',
        context: '',
      };
    }

    // 判断当前用户是否为接收方（用于判断收入/支出）
    const isReceiver = transaction.receiverMember?.id === userInfo.customMetadata?.id;
    const isRequest = transaction.transactionCategory === 'REQUEST';
    const amount = `${formatTokenAmount(transaction.amount, transaction.tokenDecimals)} ${transaction.tokenSymbol} (${
      getChainInfo(transaction.chainId)?.name
    })`;

    if (isRequest) {
      if (isReceiver) {
        // 当前用户收到付款请求
        return {
          title: t(`home.notification.list.send.${transaction.transactionType}.title`, {
            name: transaction.senderMember?.nickname,
            amount,
          }),
          context: transaction.message,
        };
      } else {
        // 当前用户发起付款请求
        return {
          title: t(`home.notification.list.request.${transaction.transactionType}.title`, {
            name: transaction.receiverMember?.nickname,
            amount,
          }),
          context: transaction.message,
        };
      }
    } else {
      if (isReceiver) {
        // 当前用户收到转账
        return {
          title: t(`home.notification.list.send.${transaction.transactionType}.title`, {
            name: transaction.senderMember?.nickname,
            amount,
          }),
          context: transaction.message,
        };
      } else {
        // 当前用户发送转账
        return {
          title: t(`home.notification.list.request.${transaction.transactionType}.title`, {
            name: transaction.receiverMember?.nickname,
            amount,
          }),
          context: transaction.message,
        };
      }
    }
  };

  const subjectType = () => {
    switch (item?.subject) {
      case NotificationTopic.GENERAL:
        return {
          title: item?.title,
          context: item?.content,
        };

      case NotificationTopic.TRANS_REQUEST:
      case NotificationTopic.TRANS_SEND:
        return dealType(item?.transaction);

      case NotificationTopic.TRANS_UPDATE:
        const amount = item?.transaction
          ? `${formatTokenAmount(item.transaction.amount, item.transaction.tokenDecimals)} ${
              item.transaction.tokenSymbol
            } (${getChainInfo(item.transaction.chainId)?.name})`
          : '';

        switch (item?.action) {
          case TransactionUpdateAction.REQUEST_ACCEPTED:
            return {
              title: t('home.notification.list.update.requestAcceptedDesc', {
                name: item?.transaction?.receiverMember?.nickname,
                amount,
              }),
              context: item?.transaction?.message,
            };
          case TransactionUpdateAction.REQUEST_DECLINED:
            return {
              title: t('home.notification.list.update.requestDeclinedDesc', {
                name: item?.transaction?.receiverMember?.nickname,
                amount,
              }),
              context: item?.transaction?.message,
            };
          case TransactionUpdateAction.PAY_LINK_ACCEPTED:
            return {
              title: t('home.notification.list.update.payLinkAcceptedDesc', {
                name: item?.transaction?.receiverMember?.nickname,
                amount,
              }),
              context: item?.transaction?.message,
            };
          default:
            return {
              title: item?.title,
              context: item?.content,
            };
        }
      case NotificationTopic.ALARM:
        return {
          title: t('home.notification.alarm.title'),
          context: item?.content,
        };
      case NotificationTopic.PAY_REQUEST:
        return {
          title: t('home.notification.payRequest.title'),
          context: item?.content,
        };
      case NotificationTopic.CUSTOMER_SUPPORT:
        return {
          title: t('home.notification.customerSupport.title'),
          context: item?.content,
        };
      case NotificationTopic.BALANCE_ALARM:
        return {
          title: t('home.notification.balanceAlarm.title'),
          context: t('home.notification.balanceAlarm.desc', {amount: item?.amount}),
        };
      case NotificationTopic.SECURE_ALARM:
        return {
          title: t('home.notification.secureAlarm.title'),
          context: item?.content,
        };
      case NotificationTopic.SUMMARY:
        return {
          title: t('home.notification.summary.title'),
          context: item?.content,
        };
      case NotificationTopic.APP_UPDATE:
        return {
          title: t('home.notification.appUpdate.title'),
          context: t('home.notification.appUpdate.desc', {version: item?.version}),
        };
      case NotificationTopic.SALES_PROMOTION:
        return {
          title: t('home.notification.salesPromotion.title'),
          context: item?.content,
        };
      case NotificationTopic.SURVEY:
        return {
          title: t('home.notification.survey.title'),
          context: item?.content,
        };
      default:
        return {
          title: item?.title,
          context: item?.content,
        };
    }
  };

  return (
    <Button
      p={appScale(24)}
      bc={'$background'}
      style={{
        backgroundColor: '#fff',
      }}
      ai="center"
      width={'100%'}
      jc={'space-between'}
      onPress={() => {
        if (item?.subject === 'TRANS_REQUEST' && item?.transaction?.transactionStatus === 'PENDING') {
          return;
        }
        if (item?.status === 0) {
          onRead(item);
        }
      }}
      unstyled
      pressStyle={{
        opacity: 0.8,
      }}
    >
      <XStack jc={'space-between'} w="100%">
        <YStack flex={1}>
          <XStack w={'100%'} ai={'center'} jc={'space-between'} mb={'$2'}>
            <SizableText fontSize={'$4'} color={'#212121'} fontWeight={'600'} w="100%" pr={'$1'}>
              {subjectType()?.title}
            </SizableText>
          </XStack>

          <SizableText color={'#616161'} size={'$3'} fow={'400'}>
            {subjectType()?.context}
          </SizableText>
          <XStack w="100%" jc={'space-between'} mb={'$2'}>
            <SizableText color={'#9395A4'} size={'$1'} fow={'500'}>
              {dayjs(item?.createAt).format('HH:mm A')}
            </SizableText>
          </XStack>
        </YStack>
        <XStack flexShrink={0} jc={'flex-end'} ai={'center'}>
          {item?.status === 0 && (
            <XStack space="$3" ai={'center'}>
              {item?.subject === 'TRANS_REQUEST' && item?.transaction?.transactionStatus === 'PENDING' ? (
                <XStack space="$3" ai={'center'}>
                  <Button unstyled onPress={handleCancel}>
                    <AppImage
                      width={appScale(32)}
                      height={appScale(32)}
                      src={require('app/assets/images/error.png')}
                      type="local"
                    />
                  </Button>
                  <Button unstyled onPress={handleReceive}>
                    <AppImage
                      width={appScale(32)}
                      height={appScale(32)}
                      src={require('app/assets/images/success.png')}
                      type="local"
                    />
                  </Button>
                </XStack>
              ) : (
                <>
                  <XStack
                    width={appScale(8)}
                    borderRadius={appScale(4)}
                    height={appScale(8)}
                    bc={PrimaryColor}
                  ></XStack>
                </>
              )}
            </XStack>
          )}
          <ChevronRight color={'#757575'} size={appScale(32)} />
        </XStack>
      </XStack>
    </Button>
  );
};

export default Item;
