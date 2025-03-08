/*
 * @Date: 2023-12-08 16:25:15
 * @LastEditors: yosan
 * @LastEditTime: 2025-03-08 15:17:47
 * @FilePath: /ezgg-app/packages/app/pages/home/notification/components/DayItem/index.tsx
 */
import {AppImage, Button, Text, YStack, XStack, SizableText} from '@my/ui';
import {useRematchModel} from 'app/store/model';
import {useRouter} from 'solito/router';
import {useTranslation} from 'react-i18next';
import {ChevronDown} from '@tamagui/lucide-icons';
import { getRelativeDate} from 'app/utils';
import Item from '../Item';
import useResponse from 'app/hooks/useResponse';

export type DayItemProps = {item: any; onRead: (item: any) => void};
// 交易历史item
const DayItem: React.FC<any> = ({item, onRead}: DayItemProps) => {
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
        <Item key={index} item={dayItem} onRead={onRead} isBottom={index === item.list.length - 1} />
      ))}
    </YStack>
  );
};

export default DayItem;
