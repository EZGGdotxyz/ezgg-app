/*
 * @Date: 2023-12-08 16:25:15
 * @LastEditors: yosan
 * @LastEditTime: 2025-02-19 10:34:42
 * @FilePath: /ezgg-app/packages/app/pages/home/index/components/HomeHeader/index.web.tsx
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
import { AppName, PrimaryColor } from 'app/config';

export type HomeHeaderProps = {isLogin: boolean};
// 首页 头部
const HomeHeader: React.FC<any> = ({isLogin}: HomeHeaderProps) => {
  const [{unread}] = useRematchModel('app');
  const {push} = useRouter();
  const [statusBarHeight, setStatusBarHeight] = useState(46);
  const {t, i18n} = useTranslation();

  return (
    <XStack width={'100%'} pt={0} ai={'center'} backgroundColor={PrimaryColor} flexShrink={0}>
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
        <XStack h={'100%'} ai={'center'}>
          <AppImage
            width={appScale(48)}
            height={appScale(32)}
            src={require('app/assets/images/logo_interior.png')}
            type="local"
          />
        </XStack>
        <XStack ai={'center'} h={'100%'}>
          <SizableText col={'$color'} fontSize={'$8'} fow={'700'}>
            {AppName}
          </SizableText>
        </XStack>
        <Button
          unstyled
          flexDirection="row"
          ai={'center'}
          h={'100%'}
          pos={'relative'}
          onPress={() => {
            push('/my');
          }}
        >
          {unread > 0 && (
            <XStack pos="absolute" p="$4" t={0} r={0} h={'100%'}>
              <XStack mt={10} mr={4} w={8} h={8} borderRadius={4} bc={'red'}></XStack>
            </XStack>
          )}
          {/* <AlignJustify color={'$color'} /> */}
          <AppImage
            width={appScale(28)}
            height={appScale(28)}
            src={require('app/assets/images/notification.png')}
            type="local"
          />
        </Button>
      </XStack>
    </XStack>
  );
};

export default HomeHeader;
