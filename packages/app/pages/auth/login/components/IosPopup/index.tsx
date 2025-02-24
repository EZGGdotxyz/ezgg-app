/*
 * @Date: 2023-12-08 16:25:15
 * @LastEditors: yosan
 * @LastEditTime: 2025-02-18 11:15:54
 * @FilePath: /ezgg-app/packages/app/pages/auth/login/components/IosPopup/index.tsx
 */
import {AppImage, Button, Paragraph, ScrollView, SizableText, Text, XStack, YStack} from '@my/ui';
import {Airplay, AlignJustify} from '@tamagui/lucide-icons';
import AppModal from 'app/Components/AppModal';
import {PrimaryColor} from 'app/config';
import {appScale} from 'app/utils';
import {useEffect, useRef} from 'react';
import {useTranslation} from 'react-i18next';
import {Link} from 'solito/link';

export type AwardsPopupProps = {
  modalVisible: any;
  setModalVisible: (values) => void;
};

// ios 弹窗
const IosPopup: React.FC<any> = ({modalVisible, setModalVisible}: AwardsPopupProps) => {
  const {t, i18n} = useTranslation();

  return (
    <AppModal zIndex={12} setModalVisible={setModalVisible} modalVisible={modalVisible}>
      <YStack
        h={appScale(287)}
        w="100%"
        pos={'absolute'}
        ai={'center'}
        jc={'center'}
        b={0}
        l={0}
        bc="$background"
      >
        <XStack ai={'center'} mb="$3" mt={appScale(-80)}>
          <AppImage
            width={appScale(146)}
            height={appScale(108)}
            src={require('app/assets/images/v2/invite.png')}
            type="local"
          />
        </XStack>
        <XStack ai={'center'} mb="$3" mt="$3">
          <AppImage
            width={appScale(24)}
            height={appScale(24)}
            src={require('app/assets/images/v2/token.png')}
            type="local"
          />
          <SizableText ml="$2" col={'$color'} fow="500" fontSize={'$6'}>
            {t('login.home.ios.tips', {
              number: 50,
            })}
          </SizableText>
        </XStack>
        <XStack ai={'center'} mb="$2" mt="$2">
          <Button
            style={{
              width: appScale(320),
              height: 40,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            bc={'$color'}
            color="$color1"
            onPress={() => {
              window.location.href = 'https://itunes.apple.com/cn/app/6477260172';
            }}
          >
            <Paragraph col={'$color1'} fontSize={'$5'}>
              {t('card.new.btn')}
            </Paragraph>
          </Button>
        </XStack>
        <XStack ai={'center'} mb="$2">
          <Button
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            color="$color1"
            chromeless
            onPress={() => {
              // push('/login');
              setModalVisible(false);
            }}
          >
            <Paragraph col={'$color11'} fontSize={'$3'}>
              {t('card.new.sub')}
            </Paragraph>
          </Button>
        </XStack>
      </YStack>
    </AppModal>
  );
};

export default IosPopup;
