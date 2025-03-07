/*
 * @Date: 2023-12-08 16:25:15
 * @LastEditors: yosan
 * @LastEditTime: 2025-03-07 12:34:38
 * @FilePath: /ezgg-app/packages/app/pages/home/index/components/History/index.tsx
 */
import {AppImage, Button, Text, YStack, XStack, SizableText} from '@my/ui';
import {useRematchModel} from 'app/store/model';
import {useRouter} from 'solito/router';
import {useTranslation} from 'react-i18next';
import {ChevronRight} from '@tamagui/lucide-icons';
import {appScale} from 'app/utils';
import HistoryDayItem from 'app/Components/HistoryDayItem';
import {useMemo} from 'react';
import AppButton from 'app/Components/AppButton';

export type HistoryProps = {
  history: any[];
};

const History: React.FC<HistoryProps> = ({history}) => {
  const [{isLogin}] = useRematchModel('user');
  const {push} = useRouter();
  const {t} = useTranslation();

  const renderEmptyState = () => (
    <YStack flex={1} ai="center" jc="center" pt={appScale(48)}>
      <AppImage
        width={appScale(160)}
        height={appScale(156)}
        src={require('app/assets/images/empty2.png')}
        type="local"
      />
      <SizableText mt={appScale(32)} col={'#212121'} fontSize={'$6'} fow={'700'}>
        {t('home.order.noTransactions')}
      </SizableText>
      <SizableText mt={appScale(16)} col={'#212121'} fontSize={'$3'} fow="400">
        {t('home.order.noTransactions2')}
      </SizableText>
    </YStack>
  );

  const renderLoginButton = () => (
    <YStack pt={appScale(48)} pl={appScale(24)} pr={appScale(24)}>
      <AppButton onPress={() => push('/login')}>
        {t('login.loginButton')}
      </AppButton>
    </YStack>
  );

  const renderHistoryList = () => (
    <>
      <XStack
        ai="center"
        jc="flex-end"
        h={appScale(36)}
        pl={appScale(24)}
        pr={appScale(24)}
        onPress={() => push('/home/history')}
      >
        <SizableText fontSize={'$4'} color={'$color11'} mr={'$2'}>
          {t('home.viewAll')}
        </SizableText>
        <ChevronRight size="$2" color={'$color11'} />
      </XStack>
      {history.map((item, index) => (
        <HistoryDayItem key={index} item={item} />
      ))}
    </>
  );

  return (
    <YStack pt={appScale(8)} flex={1}>
      {history.length > 0 ? (
        renderHistoryList()
      ) : isLogin ? (
        renderEmptyState()
      ) : (
        renderLoginButton()
      )}
    </YStack>
  );
};

export default History;
