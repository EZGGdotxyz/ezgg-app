/*
 * @Date: 2023-12-08 16:25:15
 * @LastEditors: yosan
 * @LastEditTime: 2025-02-24 16:19:49
 * @FilePath: /ezgg-app/packages/app/Components/HistoryItem/index.tsx
 */
import {AppImage, Button, Text, YStack, XStack, SizableText} from '@my/ui';
import {useRematchModel} from 'app/store/model';
import {useRouter} from 'solito/router';
import {useTranslation} from 'react-i18next';
import {ChevronDown} from '@tamagui/lucide-icons';
import {appScale} from 'app/utils';

export type HistoryItemProps = {item: any; isBottom?: boolean};
// 交易历史item
const HistoryItem: React.FC<any> = ({item, isBottom = false}: HistoryItemProps) => {
  const {push} = useRouter();
  const {t, i18n} = useTranslation();
  const [{demoniator}] = useRematchModel('app');

  return (
    <YStack
      pt={appScale(16)}
      ai="flex-end"
      jc="flex-end"
      pb={appScale(16)}
      w={'100%'}
      mb={appScale(8)}
      pl={appScale(40)}
      pr={appScale(24)}
    >
      <XStack flex={1} mb={appScale(16)} w="100%" ai={'center'} jc={'space-between'}>
        <YStack gap={appScale(2)}>
          <SizableText fontSize={'$6'} color={'#26273C'} fontWeight={'500'}>
            {item.name}
          </SizableText>
          <SizableText fontSize={'$4'} color={'#9395A4'} fontWeight={'500'}>
            {item.link}
          </SizableText>
        </YStack>
        <YStack gap={appScale(2)}>
          <SizableText ta={'right'} fontSize={'$6'} color={'#26273C'} fontWeight={'500'}>
            - ${item.amount} {demoniator}
          </SizableText>
          <SizableText ta={'right'} fontSize={'$4'} color={'#9395A4'} fontWeight={'500'}>
            -{item.amount} USDT (BSC)
          </SizableText>
        </YStack>
      </XStack>
      {!isBottom && <XStack h={2} width={'80%'} bc={'rgba(238, 238, 238, 1)'}></XStack>}
    </YStack>
  );
};

export default HistoryItem;
