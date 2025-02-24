/*
 * @Date: 2023-12-08 16:25:15
 * @LastEditors: yosan
 * @LastEditTime: 2025-02-24 17:05:17
 * @FilePath: /ezgg-app/packages/app/pages/home/index/components/History/index.tsx
 */
import {AppImage, Button, Text, YStack, XStack, SizableText} from '@my/ui';
import {useRematchModel} from 'app/store/model';
import {useRouter} from 'solito/router';
import {useTranslation} from 'react-i18next';
import {ChevronRight} from '@tamagui/lucide-icons';
import {appScale} from 'app/utils';
import HistoryItem from 'app/Components/HistoryItem';
import HistoryDayItem from 'app/Components/HistoryDayItem';

export type HistoryProps = {};
// 首页 History
const History: React.FC<any> = (props: HistoryProps) => {
  const [{unread}] = useRematchModel('app');
  const {push} = useRouter();
  const {t, i18n} = useTranslation();

  const list = [
    {
      name: 'From Request (@Elvan123)',
      link: 'Thank you for your good work! 🍻',
      amount: '100',
    },
    {
      name: 'USDC',
      link: 'Polygon',
      amount: '100',
    },
  ];
  const list2 = [
    {
      day: 'Today',
      list: [
        {
          name: 'From Request (@Elvan123)',
          link: 'Thank you for your good work! 🍻',
          amount: '100',
        },
        {
          name: 'USDC',
          link: 'Polygon',
          amount: '100',
        },
      ],
    },
    {
      day: 'Yesterday',
      list: [
        {
          name: 'From Request (@Elvan123)',
          link: 'Thank you for your good work! 🍻',
          amount: '100',
        },
        {
          name: 'USDC',
          link: 'Polygon',
          amount: '100',
        },
      ],
    },
  ];

  return (
    <YStack pt={appScale(8)}>
      <XStack ai="center" jc="flex-end" h={appScale(36)} pl={appScale(24)} pr={appScale(24)} onPress={() => {
        push('/home/history');
      }}>
        <SizableText fontSize={'$5'} color={'$color11'} mr={'$2'}>
          {t('home.viewAll')}
        </SizableText>
        <ChevronRight size="$3" color={'$color11'} />
      </XStack>
      {list2.map((item, index) => (
        <HistoryDayItem key={index} item={item} />
      ))}
    </YStack>
  );
};

export default History;
