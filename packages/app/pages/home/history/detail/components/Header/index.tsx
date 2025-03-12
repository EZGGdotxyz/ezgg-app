/*
 * @Date: 2023-12-08 16:25:15
 * @LastEditors: yosan
 * @LastEditTime: 2025-03-12 14:31:02
 * @FilePath: /ezgg-app/packages/app/pages/home/history/detail/components/Header/index.tsx
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
export type HeaderProps = {
  title: string;
  onBack?: () => void;
  fallbackUrl?: string;
  setShareVisible?: (value: boolean) => void;
};
//  头部
const Header: React.FC<any> = ({title, onBack, fallbackUrl = '/', setShareVisible}: HeaderProps) => {
  const {back, push} = useRouter();
  const [{unread}] = useRematchModel('app');
  const [statusBarHeight, setStatusBarHeight] = useState(46);
  const {t, i18n} = useTranslation();
  const {appScale} = useResponse();

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
    <XStack width={'100%'} pt={0} ai={'center'} backgroundColor={PrimaryColor} flexShrink={0}>
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
        <Button unstyled onPress={onBackPress} h={'100%'} ai={'center'} jc={'center'}>
          <AppImage
            width={appScale(28)}
            height={appScale(28)}
            src={require('app/assets/images/left.png')}
            type="local"
          />
        </Button>
        <XStack ai={'center'} h={'100%'}>
          <SizableText col={'$color'} fontSize={'$7'} fow={'700'}>
            {title}
          </SizableText>
        </XStack>
        <XStack ai={'center'} width={appScale(28)} h={'100%'}></XStack>
        {/* <Button
          unstyled
          flexDirection="row"
          ai={'center'}
          h={'100%'}
          pos={'relative'}
          onPress={() => {
            setShareVisible && setShareVisible(true);
            // push('/my');
          }}
        >
          <AppImage
            width={appScale(28)}
            height={appScale(28)}
            src={require('app/assets/images/more.png')}
            type="local"
          />
        </Button> */}
      </XStack>
    </XStack>
  );
};

export default Header;
