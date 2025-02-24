/*
 * @Date: 2023-12-08 16:25:15
 * @LastEditors: yosan
 * @LastEditTime: 2025-02-24 19:03:08
 * @FilePath: /ezgg-app/packages/app/Components/AppHeader2/index.tsx
 */
import {AppImage, Button, Text, XStack, SizableText} from '@my/ui';
import {Airplay, AlignJustify} from '@tamagui/lucide-icons';
import {useRematchModel} from 'app/store/model';
import {Platform} from 'react-native';
import {Link} from 'solito/link';
import {useRouter} from 'solito/router';
import {useState} from 'react';
import {appScale} from 'app/utils';
import {useTranslation} from 'react-i18next';
import {AppName, PrimaryColor} from 'app/config';

export type AppHeader2Props = {title: string; onBack?: () => void; fallbackUrl?: string};
// 首页 头部
const AppHeader2: React.FC<any> = ({title, onBack, fallbackUrl = '/home'}: AppHeader2Props) => {
  const {back, push} = useRouter();
  const [statusBarHeight, setStatusBarHeight] = useState(46);
  const {t, i18n} = useTranslation();

  const onBackPress = () => {
    if (onBack) {
      return onBack();
    }
    const canGoBack =
      // @ts-expect-error navigation type definition is nowhere to be found yet
      window.navigation?.canGoBack ?? window.history.length > 2;
    if (canGoBack) {
      back();
    } else {
      push(fallbackUrl);
    }
  };

  return (
    <XStack width={'100%'} pt={0} ai={'center'} backgroundColor={'$background'} flexShrink={0}>
      <XStack
        flex={1}
        pl={appScale(24)}
        pr={appScale(24)}
        pt={appScale(12)}
        pb={appScale(12)}
        h={72}
        ai={'center'}
        jc={'space-between'}
      >
        <Button unstyled onPress={onBackPress} h={'100%'} ai={'center'}>
          <AppImage
            width={appScale(28)}
            height={appScale(28)}
            src={require('app/assets/images/left.png')}
            type="local"
          />
        </Button>
        <XStack ai={'center'} h={'100%'}>
          <SizableText col={'$color'} fontSize={'$8'} fow={'700'}>
            {title}
          </SizableText>
        </XStack>
        <XStack h={'100%'} w={appScale(48)} ai={'center'}></XStack>
      </XStack>
    </XStack>
  );
};

export default AppHeader2;
