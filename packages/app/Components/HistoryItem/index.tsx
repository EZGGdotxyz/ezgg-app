/*
 * @Date: 2023-12-08 16:25:15
 * @LastEditors: yosan
 * @LastEditTime: 2025-03-03 15:00:45
 * @FilePath: /ezgg-app/packages/app/Components/HistoryItem/index.tsx
 */
import {AppImage, Button, Text, YStack, XStack, SizableText} from '@my/ui';
import {useRematchModel} from 'app/store/model';
import {useRouter} from 'solito/router';
import {useTranslation} from 'react-i18next';
import {ChevronDown} from '@tamagui/lucide-icons';
import {appScale, formatNumber, formatTokenAmount, getCurrency} from 'app/utils';
import {getChainInfo} from 'app/utils/chain';

export type HistoryItemProps = {item: any; isBottom?: boolean};
// 交易历史item
const HistoryItem: React.FC<any> = ({item, isBottom = false}: HistoryItemProps) => {
  const {push} = useRouter();
  const {t, i18n} = useTranslation();
  const [{currency}] = useRematchModel('app');

  const dealType = () => {
    switch (item?.transactionType) {
      case 'SEND':
        return {
          title: t('home.order.send.title', {name: item?.receiverMember?.nickname}),
          sub: item?.message,
        };
      case 'Income':
        return {
          title: t('home.income'),
          sub: t('home.income'),
        };
      case 'REQUEST':
        return {
          title: t('home.order.request.title', {name: item?.senderMember?.nickname}),
          sub: item?.message,
        };
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
      case 'PAY_LINK':
        return {
          title: t('home.order.payLink.title', {
            name: item?.transactionCategory === 'REQUEST' ? item?.senderMember?.nickname : item?.receiverMember?.name,
          }),
          sub: item?.message,
          // sub: item?.transactionCategory === 'REQUEST' ? t('home.receive') : t('home.send'),
        };
      case 'QR_CODE':
        return {
          title: t('home.order.qrCode.title', {name: item?.receiverWalletAddress}),
          sub: item?.transactionCategory === 'REQUEST' ? t('home.receive') : t('home.send'),
        };
      default:
        return {
          title: '',
          sub: '',
        };
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
      pl={appScale(40)}
      pr={appScale(24)}
      unstyled
      onPress={() => push(`/home/history/${item?.id}`)}
      pressStyle={{
        opacity: 0.7,
      }}
    >
      <XStack flex={1} mb={appScale(16)} w="100%" ai={'center'} jc={'space-between'}>
        <YStack gap={appScale(2)}>
          <SizableText fontSize={'$6'} color={'#26273C'} fontWeight={'500'}>
            {dealType().title}
          </SizableText>
          <SizableText fontSize={'$4'} color={'#9395A4'} fontWeight={'500'}>
            {dealType().sub}
          </SizableText>
        </YStack>
        <YStack gap={appScale(2)}>
          <SizableText ta={'right'} fontSize={'$6'} color={'#26273C'} fontWeight={'500'}>
            {item?.transactionType === 'SEND' ? '+' : '-'} $ {formatTokenAmount(item?.amount, item?.tokenDecimals)}
            {getCurrency(currency)?.label}
          </SizableText>
          <SizableText ta={'right'} fontSize={'$4'} color={'#9395A4'} fontWeight={'500'}>
            {item?.transactionType === 'SEND' ? '+' : '-'} {formatTokenAmount(item?.amount, item?.tokenDecimals)}{' '}
            {getCurrency(currency)?.label} ({getChainInfo(item?.chainId)?.name})
          </SizableText>
        </YStack>
      </XStack>
      {!isBottom && <XStack h={2} width={'80%'} bc={'rgba(238, 238, 238, 1)'}></XStack>}
    </Button>
  );
};

export default HistoryItem;
