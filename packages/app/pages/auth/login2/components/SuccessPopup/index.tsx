/*
 * @Date: 2023-12-08 16:25:15
 * @LastEditors: yosan
 * @LastEditTime: 2025-02-26 21:07:20
 * @FilePath: /ezgg-app/packages/app/pages/auth/login2/components/SuccessPopup/index.tsx
 */
import {AppImage, Button, Paragraph, ScrollView, SizableText, Text, XStack, YStack} from '@my/ui';
import {Airplay, AlignJustify} from '@tamagui/lucide-icons';
import AppLoading from 'app/Components/AppLoading';
import AppModal from 'app/Components/AppModal';
import QrCode from 'app/Components/QrCode';
import {PrimaryColor} from 'app/config';
import {appScale} from 'app/utils';
import {useEffect, useRef} from 'react';
import {useTranslation} from 'react-i18next';
import { ActivityIndicator } from 'react-native';
import {Link} from 'solito/link';

export type SuccessPopupProps = {
  modalVisible: any;
  setModalVisible: (values) => void;
};

const SuccessPopup: React.FC<any> = ({modalVisible, setModalVisible}: SuccessPopupProps) => {
  const {t, i18n} = useTranslation();
  return (
    <AppModal zIndex={12} setModalVisible={setModalVisible} modalVisible={modalVisible}>
      <YStack
        // h={140}
        w={'90%'}
        borderRadius={24}
        pos={'absolute'}
        ai={'center'}
        jc={'center'}
        t={'20%'}
        l={'5%'}
        bc="#fff"
      >
        <YStack ai={'center'} pt={appScale(40)} pr={appScale(32)} pl={appScale(32)} pb={appScale(32)}>
          <AppImage
            src={require('app/assets/images/logoBg.png')}
            type="local"
            width={appScale(186)}
            height={appScale(180)}
          />
          <SizableText ta={'center'} mb={appScale(32)} fontSize={'$7'} color={'#212121'} fow={'700'}>
            {t('login.loginTips1')}
          </SizableText>
          <SizableText ta={'center'} h={appScale(26)} lh={appScale(26)} fontSize={'$4'} color={'#212121'} fow={'400'}>
            {t('login.loginTips2')}
          </SizableText>
          <SizableText ta={'center'} h={appScale(26)} lh={appScale(26)} mb={appScale(32)} fontSize={'$4'} color={'#212121'} fow={'400'}>
            {t('login.loginTips3')}
          </SizableText>
          <XStack >
            <ActivityIndicator size={'large'} color={PrimaryColor} />
          </XStack>
        </YStack>
      </YStack>
    </AppModal>
  );
};

export default SuccessPopup;
