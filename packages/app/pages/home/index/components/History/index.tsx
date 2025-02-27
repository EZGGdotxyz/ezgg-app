/*
 * @Date: 2023-12-08 16:25:15
 * @LastEditors: yosan
 * @LastEditTime: 2025-02-27 15:17:23
 * @FilePath: /ezgg-app/packages/app/pages/home/index/components/History/index.tsx
 */
import {AppImage, Button, Text, YStack, XStack, SizableText} from '@my/ui';
import {useRematchModel} from 'app/store/model';
import {useRouter} from 'solito/router';
import {useTranslation} from 'react-i18next';
import {ChevronRight} from '@tamagui/lucide-icons';
import {appScale, getRelativeDate} from 'app/utils';
import HistoryItem from 'app/Components/HistoryItem';
import HistoryDayItem from 'app/Components/HistoryDayItem';
import {useState} from 'react';
import AppButton from 'app/Components/AppButton';

export type HistoryProps = {};
// 首页 History
const History: React.FC<any> = (props: HistoryProps) => {
  const [{isLogin}] = useRematchModel('user');
  const {push} = useRouter();
  const {t, i18n} = useTranslation();

  // const list2 = [
  //   {
  //     day: getRelativeDate(new Date()),
  //     list: [
  //       {
  //         id: 1,
  //         name: 'From Request (@Elvan123)',
  //         link: 'Thank you for your good work! 🍻',
  //         amount: '100',
  //       },
  //       {
  //         id: 1,
  //         name: 'USDC',
  //         link: 'Polygon',
  //         amount: '100',
  //       },
  //     ],
  //   },
  //   {
  //     day: getRelativeDate('2025-02-22'),
  //     list: [
  //       {
  //         id: 1,
  //         name: 'From Request (@Elvan123)',
  //         link: 'Thank you for your good work! 🍻',
  //         amount: '100',
  //       },
  //       {
  //         id: 3,
  //         name: 'USDC',
  //         link: 'Polygon',
  //         amount: '100',
  //       },
  //     ],
  //   },
  // ];
  const [list, setList] = useState([]);

  return (
    <YStack pt={appScale(8)} flex={1}>
      {list.length > 0 ? (
        <>
          <XStack
            ai="center"
            jc="flex-end"
            h={appScale(36)}
            pl={appScale(24)}
            pr={appScale(24)}
            onPress={() => {
              push('/home/history');
            }}
          >
            <SizableText fontSize={'$5'} color={'$color11'} mr={'$2'}>
              {t('home.viewAll')}
            </SizableText>
            <ChevronRight size="$3" color={'$color11'} />
          </XStack>
          {list.map((item, index) => (
            <HistoryDayItem key={index} item={item} />
          ))}
        </>
      ) : isLogin ? (
        <YStack flex={1} ai="center" jc="center" pt={appScale(48)}>
          <AppImage
            width={appScale(160)}
            height={appScale(156)}
            src={require('app/assets/images/empty2.png')}
            type="local"
          />
          <SizableText mt={appScale(32)} col={'#212121'} fontSize={'$7'} fow={'700'}>
            {t('home.order.noTransactions')}
          </SizableText>
          <SizableText mt={appScale(16)} col={'#212121'} fontSize={'$3'} fow="400">
            {t('home.order.noTransactions2')}
          </SizableText>
        </YStack>
      ) : (
        <YStack pt={appScale(48)} pl={appScale(24)} pr={appScale(24)}>
          <AppButton
            onPress={() => {
              push('/login');
            }}
          >
            {t('login.loginButton')}
          </AppButton>
        </YStack>
      )}
    </YStack>
  );
};

export default History;
