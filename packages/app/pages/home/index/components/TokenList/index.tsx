/*
 * @Date: 2023-12-08 16:25:15
 * @LastEditors: yosan
 * @LastEditTime: 2025-02-25 09:37:31
 * @FilePath: /ezgg-app/packages/app/pages/home/index/components/TokenList/index.tsx
 */
import {AppImage, Button, Text, YStack, XStack, SizableText} from '@my/ui';
import {useRematchModel} from 'app/store/model';
import {useRouter} from 'solito/router';
import {useTranslation} from 'react-i18next';
import {ChevronDown} from '@tamagui/lucide-icons';
import {appScale} from 'app/utils';

export type TokenListProps = {};
// 首页 tokenLsit
const TokenList: React.FC<any> = (props: TokenListProps) => {
  const [{demoniator}] = useRematchModel('app');

  const {push} = useRouter();
  const {t, i18n} = useTranslation();

  const list = [
    {
      token: 'USDT',
      chain: 'BSC',
      amount: '100',
    },
    {
      token: 'USDC',
      chain: 'Polygon',
      amount: '100',
    },
    {
      token: 'USDC',
      chain: 'Base',
      amount: '100',
    },
  ];

  return (
    <YStack pl={appScale(24)} pr={appScale(24)} pt={appScale(8)}>
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
    </YStack>
  );
};

export default TokenList;
