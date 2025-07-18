/*
 * @Date: 2023-12-08 16:25:15
 * @LastEditors: yosan
 * @LastEditTime: 2025-03-12 14:34:45
 * @FilePath: /ezgg-app/packages/app/Components/AppHeader2/index.tsx
 */
import {AppImage, Button, Text, XStack, SizableText} from '@my/ui';
import {Airplay, AlignJustify} from '@tamagui/lucide-icons';
import {useRematchModel} from 'app/store/model';
import {Platform} from 'react-native';
import {Link} from 'solito/link';
import {useRouter} from 'solito/router';
import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {AppName, PrimaryColor} from 'app/config';
import useResponse from 'app/hooks/useResponse';

export type AppHeader2Props = {
  title: string;
  onBack?: () => void;
  fallbackUrl?: string;
  isQr?: boolean;
  type?: string;
  isClosure?: boolean;
  isDark?: boolean;
  isSearch?: boolean;
  isSettings?: boolean;
  isLogo?: boolean;
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
  isSearch = false,
  isSettings = false,
  isLogo = false,
}: AppHeader2Props) => {
  const {back, push, replace} = useRouter();
  const [statusBarHeight, setStatusBarHeight] = useState(46);
  const {t, i18n} = useTranslation();
  const {appScale} = useResponse();

  const onBackPress = () => {
    if (onBack) {
      return onBack();
    }
    if (isClosure) {
      return push('/');
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
        h={appScale(72)}
        ai={'center'}
        jc={'space-between'}
      >
        <XStack h={'100%'} w={appScale(48)} ai={'center'}>
          <Button unstyled onPress={onBackPress} h={'100%'} ai={'center'} jc={'center'}>
            {!isLogo && (
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
            )}
            {isLogo && isClosure && (
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
            )}
          </Button>
        </XStack>
        <XStack ai={'center'} h={'100%'}>
          {isLogo && (
            <XStack mr={appScale(24)}>
              <AppImage
                width={appScale(285 / 7)}
                height={appScale(322 / 7)}
                src={require('app/assets/images/logo.png')}
                type="local"
              />
            </XStack>
          )}
          <SizableText col={'$color'} fontSize={'$7'} fow={'700'}>
            {title}
          </SizableText>
        </XStack>
        <XStack h={'100%'} w={appScale(48)} jc={'flex-end'} ai={'center'}>
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
          {isSearch && (
            <Button
              unstyled
              h={'100%'}
              ai={'center'}
              jc={'center'}
              onPress={() => {
                //  onSearch();
              }}
            >
              <AppImage
                width={appScale(28)}
                height={appScale(28)}
                src={require('app/assets/images/search.png')}
                type="local"
              />
            </Button>
          )}
          {isSettings && (
            <Button
              unstyled
              h={'100%'}
              ai={'center'}
              jc={'center'}
              onPress={() => {
                replace('/profile/notification');
              }}
            >
              <AppImage
                width={appScale(28)}
                height={appScale(28)}
                src={require('app/assets/images/setting.png')}
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
