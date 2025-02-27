/*
 * @Date: 2023-12-08 16:25:15
 * @LastEditors: yosan
 * @LastEditTime: 2025-02-27 15:55:06
 * @FilePath: /ezgg-app/packages/app/pages/home/index/components/TokenList/index.tsx
 */
import {AppImage, Button, Text, YStack, XStack, SizableText} from '@my/ui';
import {useRematchModel} from 'app/store/model';
import {useRouter} from 'solito/router';
import {useTranslation} from 'react-i18next';
import {ChevronDown} from '@tamagui/lucide-icons';
import {appScale} from 'app/utils';
import {useState} from 'react';
import AppButton from 'app/Components/AppButton';

export type TokenListProps = {};
// 首页 tokenLsit
const TokenList: React.FC<any> = (props: TokenListProps) => {
  const [{demoniator}] = useRematchModel('app');
  const [{isLogin}] = useRematchModel('user');

  const {push} = useRouter();
  const {t, i18n} = useTranslation();
  const [list, setList] = useState<any>([]);

  // const list = [
  //   {
  //     token: 'USDT',
  //     chain: 'BSC',
  //     amount: '100',
  //   },
  //   {
  //     token: 'USDC',
  //     chain: 'Polygon',
  //     amount: '100',
  //   },
  //   {
  //     token: 'USDC',
  //     chain: 'Base',
  //     amount: '100',
  //   },
  // ];

  return (
    <YStack pl={appScale(24)} pr={appScale(24)} pt={appScale(8)}>
      {list.length > 0 ? (
        <>
          <XStack ai="center" h={appScale(36)}>
            <SizableText fontSize={'$5'} color={'$color11'} mr={'$2'}>
              {t('home.viewAll')}
            </SizableText>
            <ChevronDown size="$3" color={'$color11'} />
          </XStack>
          {list.map((item, index) => (
            <XStack key={index} p={appScale(16)} w={'100%'} mb={appScale(8)}>
              <YStack pos={'relative'} w={appScale(72)} flexShrink={0}>
                <AppImage
                  width={appScale(48)}
                  height={appScale(48)}
                  src={require(`app/assets/images/token/${item.token}.png`)}
                  type="local"
                />
                <XStack pos={'absolute'} bottom={appScale(4)} right={appScale(18)}>
                  <AppImage
                    width={appScale(24)}
                    height={appScale(24)}
                    src={require(`app/assets/images/chain/${item.chain}.png`)}
                    type="local"
                  />
                </XStack>
              </YStack>
              <XStack flex={1} ai={'center'} jc={'space-between'}>
                <YStack gap={appScale(2)}>
                  <SizableText fontSize={'$6'} color={'#26273C'} fontWeight={'500'}>
                    {item.token}
                  </SizableText>
                  <SizableText fontSize={'$4'} color={'#9395A4'} fontWeight={'500'}>
                    {item.chain}
                  </SizableText>
                </YStack>
                <YStack gap={appScale(2)}>
                  <SizableText ta={'right'} fontSize={'$6'} color={'#26273C'} fontWeight={'500'}>
                    {item.amount}
                  </SizableText>
                  <SizableText ta={'right'} fontSize={'$4'} color={'#9395A4'} fontWeight={'500'}>
                    {item.amount} {demoniator}
                  </SizableText>
                </YStack>
              </XStack>
            </XStack>
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
        <YStack pt={appScale(48)}>
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

export default TokenList;
