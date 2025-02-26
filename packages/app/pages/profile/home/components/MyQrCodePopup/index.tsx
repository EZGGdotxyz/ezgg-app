/*
 * @Date: 2023-12-08 16:25:15
 * @LastEditors: yosan
 * @LastEditTime: 2025-02-26 14:40:44
 * @FilePath: /ezgg-app/packages/app/pages/profile/home/components/MyQrCodePopup/index.tsx
 */
import {AppImage, Button, Paragraph, ScrollView, SizableText, Text, XStack, YStack} from '@my/ui';
import {Airplay, AlignJustify} from '@tamagui/lucide-icons';
import AppModal from 'app/Components/AppModal';
import QrCode from 'app/Components/QrCode';
import {PrimaryColor} from 'app/config';
import {appScale} from 'app/utils';
import {useEffect, useRef} from 'react';
import {useTranslation} from 'react-i18next';
import {Link} from 'solito/link';

export type MyQrCodePopupProps = {
  modalVisible: any;
  setModalVisible: (values) => void;
};

const MyQrCodePopup: React.FC<any> = ({modalVisible, setModalVisible}: MyQrCodePopupProps) => {
  const {t, i18n} = useTranslation();
  return (
    <AppModal zIndex={12} setModalVisible={setModalVisible} modalVisible={modalVisible}>
      <YStack
        // h={140}
        w="100%"
        // borderRadiusTopLeft={20}
        borderTopRightRadius={16}
        borderTopLeftRadius={16}
        pos={'absolute'}
        ai={'center'}
        jc={'center'}
        b={0}
        l={0}
        bc="#fff"
      >
        <YStack pt={appScale(24)} pr={appScale(24)} pl={appScale(24)} pb={appScale(36)}>
          <SizableText ta={'center'} fontSize={'$7'} color={'#212121'} fow={'700'}>
            {t('home.qr.title2')}
          </SizableText>
          <SizableText ta={'center'} mb={appScale(24)} fontSize={'$3'} color={'#212121'} fow={'500'}>
            {t('home.qr.sub2')}
          </SizableText>
          <XStack w="100%" mb={appScale(24)} h={1} bc={'#eeeeee'}></XStack>
          <XStack w="100%" ai={'center'} jc={'center'} p={appScale(24)} borderColor={'#eeeeee'} borderWidth={1}>
            <QrCode size={appScale(334)} url={'https://www.bitenet.io'} />
          </XStack>
        </YStack>
      </YStack>
    </AppModal>
  );
};

export default MyQrCodePopup;
