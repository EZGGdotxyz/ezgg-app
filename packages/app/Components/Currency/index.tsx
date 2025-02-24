/*
 * @Date: 2023-12-08 16:25:15
 * @LastEditors: yosan
 * @LastEditTime: 2025-02-24 19:45:24
 * @FilePath: /ezgg-app/packages/app/Components/Currency/index.tsx
 */
import {AppImage, Button, Text, YStack, XStack, SizableText} from '@my/ui';
import {useRematchModel} from 'app/store/model';
import {useRouter} from 'solito/router';
import {useTranslation} from 'react-i18next';
import {ChevronDown} from '@tamagui/lucide-icons';
import {appScale} from 'app/utils';

export type CurrencyProps = {token: string; chain: string};
// 交易历史item
const Currency: React.FC<any> = ({token, chain}: CurrencyProps) => {
  const {push} = useRouter();
  const {t, i18n} = useTranslation();
  const [{demoniator}] = useRematchModel('app');

  return (
    <YStack w="100%" mb={appScale(24)}>
      <XStack mb={appScale(8)} w="100%">
        <SizableText h={appScale(30)} lh={appScale(30)} fontSize={'$5'} color={'#212121'} fontWeight={'600'}>
          {t('home.send.currency')}
        </SizableText>
      </XStack>
      <XStack w="100%" p={appScale(16)} bc={'#FAFAFA'} br={appScale(8)}>
        <YStack pos={'relative'} w={appScale(72)} flexShrink={0}>
          <AppImage
            width={appScale(48)}
            height={appScale(48)}
            src={require(`app/assets/images/token/${token}.png`)}
            type="local"
          />
          <XStack pos={'absolute'} bottom={appScale(4)} right={appScale(18)}>
            <AppImage
              width={appScale(24)}
              height={appScale(24)}
              src={require(`app/assets/images/chain/${chain}.png`)}
              type="local"
            />
          </XStack>
        </YStack>
        <SizableText
          fontSize={'$9'}
          h={appScale(50)}
          lh={appScale(50)}
          color={'#212121'}
          fontWeight={'600'}
          pos="relative"
        >
          {`${token} (${chain})`}
        </SizableText>
      </XStack>
    </YStack>
  );
};

export default Currency;
