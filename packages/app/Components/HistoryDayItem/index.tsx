/*
 * @Date: 2023-12-08 16:25:15
 * @LastEditors: yosan
 * @LastEditTime: 2025-02-24 17:55:24
 * @FilePath: /ezgg-app/packages/app/Components/HistoryDayItem/index.tsx
 */
import {AppImage, Button, Text, YStack, XStack, SizableText} from '@my/ui';
import {useRematchModel} from 'app/store/model';
import {useRouter} from 'solito/router';
import {useTranslation} from 'react-i18next';
import {ChevronDown} from '@tamagui/lucide-icons';
import {appScale} from 'app/utils';
import HistoryItem from '../HistoryItem';

export type HistoryDayItemProps = {item: any};
// 交易历史item
const HistoryDayItem: React.FC<any> = ({item}: HistoryDayItemProps) => {
  const {push} = useRouter();
  const {t, i18n} = useTranslation();

  return (
    <YStack>
      <XStack ai="center" pl={appScale(24)} pr={appScale(24)}>
        <SizableText fontSize={'$3'} color={'#9E9E9E'} mr={'$4'}>
          {item.day}
        </SizableText>
        <XStack h={2} flex={1} bc={'rgba(238, 238, 238, 1)'}></XStack>
      </XStack>
      {item.list.map((dayItem, index) => (
        <HistoryItem key={index} item={dayItem} isBottom={index === item.list.length - 1} />
      ))}
    </YStack>
  );
};

export default HistoryDayItem;
