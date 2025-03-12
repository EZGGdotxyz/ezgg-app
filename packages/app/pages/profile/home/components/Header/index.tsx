/*
 * @Date: 2023-12-08 16:25:15
 * @LastEditors: yosan
 * @LastEditTime: 2025-03-12 14:35:30
 * @FilePath: /ezgg-app/packages/app/pages/profile/home/components/Header/index.tsx
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
export type HeaderProps = {isLogin: boolean};
// 首页 头部
const Header: React.FC<any> = ({isLogin}: HeaderProps) => {
  const [{unread}] = useRematchModel('app');
  const {push} = useRouter();
  const [statusBarHeight, setStatusBarHeight] = useState(46);
  const {t, i18n} = useTranslation();
  const {appScale} = useResponse();

  return (
    <XStack width={'100%'} pt={0} ai={'center'} backgroundColor={'$background'} flexShrink={0}>
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
        <XStack h={'100%'} ai={'center'} w={appScale(56)}>
          <AppImage
            width={appScale(48)}
            height={appScale(32)}
            src={require('app/assets/images/logo_interior.png')}
            type="local"
          />
        </XStack>
        <XStack ai={'center'} h={'100%'}>
          <SizableText col={'$color'} fontSize={'$7'} fow={'700'}>
            {t('screen.profile.title')}
          </SizableText>
        </XStack>
        <XStack h={'100%'} w={appScale(56)} ai={'center'}></XStack>
      </XStack>
    </XStack>
  );
};

export default Header;
