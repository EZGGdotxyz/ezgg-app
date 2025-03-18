/*
 * @Date: 2023-12-08 16:25:15
 * @LastEditors: yosan
 * @LastEditTime: 2025-03-18 13:59:55
 * @FilePath: /ezgg-app/packages/app/Components/HistoryItem/index.tsx
 */
import {AppImage, Button, Text, YStack, XStack, SizableText, debounce} from '@my/ui';
import {useRematchModel} from 'app/store/model';
import {useRouter} from 'solito/router';
import {useTranslation} from 'react-i18next';
import {ChevronDown} from '@tamagui/lucide-icons';
import {formatNumber, formatTokenAmount, getCurrency} from 'app/utils';
import {getChainInfo} from 'app/utils/chain';
import dayjs from 'dayjs';
import useResponse from 'app/hooks/useResponse';
import {ExternalLinkData, PrimaryColor} from 'app/config';
import {useCallback} from 'react';

export type HistoryItemProps = {
  item: any;
  isBottom?: boolean;
  activeTab?: string;
  onClick?: (item: any, action?: any) => void;
};
// 交易历史item
const HistoryItem: React.FC<HistoryItemProps> = ({item, isBottom = false, onClick, activeTab}) => {
  const {push} = useRouter();
  const {t, i18n} = useTranslation();
  const [{currency}] = useRematchModel('app');
  const [{userInfo}] = useRematchModel('user');
  const {appScale} = useResponse();

  const incomeType = () => {
    // 判断当前用户是否为接收方（用于判断收入/支出）
    const isReceiver = item?.receiverMember?.id === userInfo?.customMetadata?.id;
    const isRequest = item?.transactionCategory === 'REQUEST';

    if (isRequest) {
      if (isReceiver) {
        // 当前用户收到付款请求（将要支出）
        return {
          title: t(`home.history.request.${item?.transactionType}.title`, {
            name: item?.senderMember?.nickname,
          }),
          sub: item?.message,
        };
      } else {
        // 当前用户发起付款请求（将要收入）
        return {
          title: t(`home.history.send.${item?.transactionType}.title`, {
            name: item?.receiverMember?.nickname,
          }),
          sub: item?.message,
        };
      }
    } else {
      if (isReceiver) {
        // 当前用户是接收方（收入）
        return {
          title: t(`home.history.request.${item?.transactionType}.title`, {
            name: item?.senderMember?.nickname,
          }),
          sub: item?.message,
        };
      } else {
        // 当前用户是发送方（支出）
        return {
          title: t(`home.history.send.${item?.transactionType}.title`, {
            name: item?.receiverMember?.nickname,
          }),
          sub: item?.message,
        };
      }
    }
  };

  const dealType = () => {
    switch (item?.transactionType) {
      case 'DEPOSIT':
        return {
          title: t('home.deposit'),
          sub: t('home.deposit'),
        };
      case 'WITHDRAW':
        return {
          title: t('home.withdraw'),
          sub: t('home.withdraw'),
        };
      case 'Income':
        return {
          title: t('home.income'),
          sub: t('home.income'),
        };
      case 'EXPEND':
        return {
          title: t('home.expend'),
          sub: t('home.expend'),
        };
      default:
        return incomeType();
    }
  };

  const judgeAmountType = (orderData: any) => {
    if (orderData?.transactionType === 'WITHDRAW') {
      return '-';
    }

    if (orderData?.transactionType === 'DEPOSIT') {
      return '+';
    }
    return orderData?.receiverMember?.id === userInfo?.customMetadata?.id ? '+' : '-';
  };

  // 取消支付链接
  const handleCancel = (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    onClick && onClick(item, 'cancel');
  };

  // 拒绝支付请求
  const handleDecline = (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    onClick && onClick(item, 'decline');
  };

  // 接受支付请求
  const handleReceive = (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    onClick && onClick(item, 'receive');
  };

  const judgeMyAction = () => {
    if (item?.transactionCategory === 'REQUEST') {
      return item?.senderMember?.id === userInfo?.customMetadata?.id;
    } else {
      return false;
    }
  };

  return (
    <Button
      pt={appScale(16)}
      ai="flex-end"
      jc="flex-end"
      pb={appScale(16)}
      w={'100%'}
      mb={appScale(8)}
      pl={appScale(32)}
      pr={appScale(16)}
      unstyled
      onPress={() => push(`/home/history/${item?.id}`)}
      pressStyle={{
        opacity: 0.7,
      }}
    >
      <XStack flex={1} mb={appScale(12)} w="100%" ai={'center'} jc={'space-between'}>
        <XStack flex={1} gap={appScale(2)} jc={'space-between'} flexWrap={'wrap'}>
          <YStack gap={appScale(2)} maxWidth={'100%'} pr={appScale(12)}>
            <SizableText maxWidth={'100%'} fontSize={'$4'} color={'#212121'} fontWeight={'600'}>
              {dealType().title}
            </SizableText>
            <SizableText fontSize={'$3'} color={'#9395A4'} fontWeight={'400'}>
              {dealType().sub}
            </SizableText>
          </YStack>
          <XStack flexShrink={0} gap={appScale(8)} jc={'flex-end'} ai={'center'}>
            {activeTab === 'PENDING' && item?.transactionStatus === 'PENDING' && (
              <>
                {judgeMyAction() && (
                  <>
                    <Button
                      unstyled
                      borderWidth={1}
                      borderColor={PrimaryColor}
                      bc={PrimaryColor}
                      h={appScale(42)}
                      pl={appScale(20)}
                      pr={appScale(20)}
                      borderRadius={appScale(42)}
                      jc={'center'}
                      ai={'center'}
                      onPress={handleReceive}
                    >
                      <SizableText fontSize={'$3'} color={'#212121'} fontWeight={'600'}>
                        {t('home.order.acceptRequest')}
                      </SizableText>
                    </Button>
                    <Button
                      unstyled
                      borderWidth={1}
                      borderColor={'#E0E0E0'}
                      onPress={handleDecline}
                      bc={'#fff'}
                      h={appScale(42)}
                      pl={appScale(20)}
                      pr={appScale(20)}
                      borderRadius={appScale(42)}
                      jc={'center'}
                      ai={'center'}
                    >
                      <SizableText fontSize={'$3'} color={'#212121'} fontWeight={'600'}>
                        {t('home.order.decline')}
                      </SizableText>
                    </Button>
                  </>
                )}
                {(item?.transactionType === 'REQUEST_LINK' || item?.transactionType === 'PAY_LINK') && (
                  <>
                    <Button
                      unstyled
                      borderWidth={1}
                      borderColor={PrimaryColor}
                      bc={PrimaryColor}
                      h={appScale(42)}
                      pl={appScale(20)}
                      pr={appScale(20)}
                      borderRadius={appScale(42)}
                      jc={'center'}
                      ai={'center'}
                      onPress={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        window.open(
                          `${ExternalLinkData.webPageHome}/${
                            item?.transactionCategory === 'SEND' ? 'claim' : 'requesting'
                          }/${item?.transactionCode}`,
                          '_blank',
                        );
                      }}
                    >
                      <SizableText fontSize={'$3'} color={'#212121'} fontWeight={'600'}>
                        {t('home.send.link')}
                      </SizableText>
                    </Button>
                    <Button
                      unstyled
                      borderWidth={1}
                      borderColor={'#E0E0E0'}
                      onPress={handleCancel}
                      bc={'#fff'}
                      h={appScale(42)}
                      pl={appScale(20)}
                      pr={appScale(20)}
                      borderRadius={appScale(42)}
                      jc={'center'}
                      ai={'center'}
                    >
                      <SizableText fontSize={'$3'} color={'#212121'} fontWeight={'600'}>
                        {t('home.send.void')}
                      </SizableText>
                    </Button>
                  </>
                )}
              </>
            )}
          </XStack>
        </XStack>
        <YStack gap={appScale(2)} flexShrink={0} pl={appScale(12)}>
          <SizableText ta={'right'} fontSize={'$3'} color={'#26273C'} fontWeight={'600'}>
            {`${judgeAmountType(item)} ${formatNumber(Number(item?.currencyAmount || 0))} ${
              getCurrency(currency)?.label
            }`}
          </SizableText>
          <SizableText ta={'right'} fontSize={'$1'} color={'#9395A4'} fontWeight={'500'}>
            {`${judgeAmountType(item)} ${formatTokenAmount(item?.amount, item?.tokenDecimals)} ${item?.tokenSymbol} (${
              getChainInfo(item?.chainId)?.name
            })`}
          </SizableText>
        </YStack>
      </XStack>
      <XStack w="100%" jc={'space-between'} mb={'$2'}>
        <SizableText color={'#9395A4'} size={'$1'} fow={'500'}>
          {dayjs(item?.updateAt).format('HH:mm A')}
        </SizableText>
      </XStack>
      {!isBottom && <XStack h={2} width={'80%'} bc={'rgba(238, 238, 238, 1)'}></XStack>}
    </Button>
  );
};

export default HistoryItem;
