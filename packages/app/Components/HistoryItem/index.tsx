/*
 * @Date: 2023-12-08 16:25:15
 * @LastEditors: yosan
 * @LastEditTime: 2025-03-07 22:24:25
 * @FilePath: /ezgg-app/packages/app/Components/HistoryItem/index.tsx
 */
import {AppImage, Button, Text, YStack, XStack, SizableText} from '@my/ui';
import {useRematchModel} from 'app/store/model';
import {useRouter} from 'solito/router';
import {useTranslation} from 'react-i18next';
import {ChevronDown} from '@tamagui/lucide-icons';
import { formatNumber, formatTokenAmount, getCurrency} from 'app/utils';
import {getChainInfo} from 'app/utils/chain';
import dayjs from 'dayjs';
import useResponse from 'app/hooks/useResponse';

export type HistoryItemProps = {item: any; isBottom?: boolean};
// 交易历史item
const HistoryItem: React.FC<any> = ({item, isBottom = false}: HistoryItemProps) => {
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

  return (
    <Button
      pt={appScale(16)}
      ai="flex-end"
      jc="flex-end"
      pb={appScale(16)}
      w={'100%'}
      mb={appScale(8)}
      pl={appScale(40)}
      pr={appScale(24)}
      unstyled
      onPress={() => push(`/home/history/${item?.id}`)}
      pressStyle={{
        opacity: 0.7,
      }}
    >
      <XStack flex={1} mb={appScale(16)} w="100%" ai={'center'} jc={'space-between'}>
        <YStack gap={appScale(2)} w={'70%'}>
          <SizableText fontSize={'$4'} color={'#212121'} fontWeight={'600'}>
            {dealType().title}
          </SizableText>
          <SizableText fontSize={'$3'} color={'#9395A4'} fontWeight={'400'}>
            {dealType().sub}
          </SizableText>
        </YStack>
        <YStack gap={appScale(2)} w={'30%'}>
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
          {dayjs(item?.createAt).format('HH:mm A')}
        </SizableText>
      </XStack>
      {!isBottom && <XStack h={2} width={'80%'} bc={'rgba(238, 238, 238, 1)'}></XStack>}
    </Button>
  );
};

export default HistoryItem;
