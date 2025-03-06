/*
 * @Date: 2023-12-08 16:25:15
 * @LastEditors: yosan
 * @LastEditTime: 2025-03-05 11:02:18
 * @FilePath: /ezgg-app/packages/app/pages/home/history/detail/components/Footer/index.tsx
 */
import {AppImage, Button, Text, XStack, SizableText, useToastController} from '@my/ui';
import {Airplay, AlignJustify} from '@tamagui/lucide-icons';
import {useRematchModel} from 'app/store/model';
import {useRouter} from 'solito/router';
import {useTranslation} from 'react-i18next';
import {AppName, PrimaryColor} from 'app/config';
import AppButton from 'app/Components/AppButton';
import {appScale, isIphoneX} from 'app/utils';

export type FooterProps = {
  orderData: any;
  setIsLoading: (isLoading: boolean) => void;
  setDeclineRequestVisible: (visible: boolean) => void;
  setAcceptRequestVisible: (visible: boolean) => void;
};
//  头部
const Footer: React.FC<any> = ({setDeclineRequestVisible, setAcceptRequestVisible}: FooterProps) => {
  const {back, push} = useRouter();
  const {t, i18n} = useTranslation();

  return (
    <XStack
      flexShrink={0}
      pl={appScale(24)}
      pr={appScale(24)}
      pt={12}
      pb={appScale(isIphoneX() ? 46 : 12)}
      w="100%"
      ai={'center'}
      jc={'center'}
      space="$3"
      borderTopWidth={1}
      borderColor={'#F2F2F2'}
    >
      <Button
        h={appScale(58)}
        w={'50%'}
        br={appScale(28)}
        ai={'center'}
        jc={'center'}
        bc={'#fff'}
        borderWidth={2}
        borderColor={PrimaryColor}
        onPress={() => {
          setDeclineRequestVisible(true);
        }}
        // disabled={isLoading}
        pressStyle={{
          opacity: 0.85,
        }}
        unstyled
      >
        {t('home.order.decline')}
      </Button>
      <AppButton
        style={{
          width: '50%',
        }}
        onPress={() => {
          setAcceptRequestVisible(true);
        }}
      >
        {t('home.order.acceptRequest')}
      </AppButton>
    </XStack>
  );
};

export default Footer;
