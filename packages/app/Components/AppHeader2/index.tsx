/*
 * @Date: 2023-12-08 16:25:15
 * @LastEditors: yosan
 * @LastEditTime: 2025-02-25 18:28:15
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

export type AppHeader2Props = {
  title: string;
  onBack?: () => void;
  fallbackUrl?: string;
  isQr?: boolean;
  type?: string;
  isClosure?: boolean;
  isDark?: boolean;
};
// 首页 头部
const AppHeader2: React.FC<any> = ({
  title,
  onBack,
  fallbackUrl = '/',
  isQr = false,
  type = '',
  isClosure = false,
  isDark = false,
}: AppHeader2Props) => {
  const {back, push, replace} = useRouter();
  const [statusBarHeight, setStatusBarHeight] = useState(46);
  const {t, i18n} = useTranslation();

  const onBackPress = () => {
    if (isClosure) {
      return push('/');
    }
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
    <XStack width={'100%'} pt={0} ai={'center'} backgroundColor={isDark ? '#1F222A' : '$background'} flexShrink={0}>
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
        <Button unstyled onPress={onBackPress} h={'100%'} ai={'center'} jc={'center'}>
          <AppImage
            width={appScale(28)}
            height={appScale(28)}
            src={
              isClosure
                ? require(isDark ? 'app/assets/images/dark/closure.png' : 'app/assets/images/closure.png')
                : require('app/assets/images/left.png')
            }
            type="local"
          />
        </Button>
        <XStack ai={'center'} h={'100%'}>
          <SizableText col={'$color'} fontSize={'$8'} fow={'700'}>
            {title}
          </SizableText>
        </XStack>
        <XStack h={'100%'} w={appScale(48)} ai={'center'}>
          {isQr && (
            <Button
              unstyled
              h={'100%'}
              ai={'center'}
              jc={'center'}
              onPress={() => {
                replace('/explore?type=' + type);
              }}
            >
              <AppImage
                width={appScale(48)}
                height={appScale(48)}
                src={require('app/assets/images/qr2.png')}
                type="local"
              />
            </Button>
          )}
        </XStack>
      </XStack>
    </XStack>
  );
};

export default AppHeader2;
