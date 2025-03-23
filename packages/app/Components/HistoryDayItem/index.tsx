/*
 * @Date: 2023-12-08 16:25:15
 * @LastEditors: yosan
 * @LastEditTime: 2025-03-13 16:50:59
 * @FilePath: /ezgg-app/packages/app/Components/HistoryDayItem/index.tsx
 */
import {AppImage, Button, Text, YStack, XStack, SizableText} from '@my/ui';
import {useRematchModel} from 'app/store/model';
import {useRouter} from 'solito/router';
import {useTranslation} from 'react-i18next';
import {ChevronDown} from '@tamagui/lucide-icons';
import {getRelativeDate} from 'app/utils';
import HistoryItem from '../HistoryItem';
import useResponse from 'app/hooks/useResponse';

export type HistoryDayItemProps = {item: any; onClick?: (item: any, action?: any) => void};
// 交易历史item
const HistoryDayItem: React.FC<HistoryDayItemProps> = ({item, onClick}) => {
  const {push} = useRouter();
  const {t, i18n} = useTranslation();
  const {appScale} = useResponse();

  return (
    <YStack>
      <XStack ai="center" pl={appScale(24)} pr={appScale(24)}>
        <SizableText fontSize={'$3'} color={'#9E9E9E'} mr={'$4'}>
          {getRelativeDate(item.day)}
        </SizableText>
        <XStack h={2} flex={1} bc={'rgba(238, 238, 238, 1)'}></XStack>
      </XStack>
      {item.list.map((dayItem, index) => (
        <HistoryItem  onClick={onClick} key={dayItem?.id} item={dayItem} isBottom={index === item.list.length - 1} />
      ))}
    </YStack>
  );
};

export default HistoryDayItem;
