/*
 * @Date: 2023-12-08 16:25:15
 * @LastEditors: yosan
 * @LastEditTime: 2025-03-20 15:26:37
 * @FilePath: /ezgg-app/packages/app/pages/auth/login2/components/SuccessPopup/index.tsx
 */
import {
  AppImage,
  Button,
  Input,
  Paragraph,
  ScrollView,
  SizableText,
  Text,
  XStack,
  YStack,
  useToastController,
} from '@my/ui';
import {Airplay, AlignJustify, Edit3} from '@tamagui/lucide-icons';
import AppLoading from 'app/Components/AppLoading';
import AppModal from 'app/Components/AppModal';
import QrCode from 'app/Components/QrCode';
import {PrimaryColor} from 'app/config';
import {useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {ActivityIndicator} from 'react-native';
import {Link} from 'solito/link';
import {Check, ChevronDown, ChevronRight, ChevronUp, LockKeyhole, User} from '@tamagui/lucide-icons';
import AppButton from 'app/Components/AppButton';
import {postFileUpload} from 'app/servers/api/fileUpload';
import useRequest from 'app/hooks/useRequest';
import useResponse from 'app/hooks/useResponse';

export type SuccessPopupProps = {
  modalVisible: any;
  setModalVisible: (values) => void;
  redirect: string;
};

const SuccessPopup: React.FC<any> = ({
  modalVisible,
  setModalVisible,
  redirect,
}: SuccessPopupProps) => {
  const {t, i18n} = useTranslation();
  //加载状态
  const [loading, setLoading] = useState(false);
  const toast = useToastController();
  const {makeRequest} = useRequest();
  const {appScale} = useResponse();

  return (
    <AppModal isExit={false} zIndex={12} setModalVisible={setModalVisible} modalVisible={modalVisible}>
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
          <SizableText ta={'center'} mb={appScale(32)} fontSize={'$6'} color={'#212121'} fow={'700'}>
            {t('login.loginTips1')}
          </SizableText>
          <SizableText ta={'center'} h={appScale(26)} lh={appScale(26)} fontSize={'$4'} color={'#212121'} fow={'400'}>
            {t('login.loginTips2')}
          </SizableText>
          <SizableText
            ta={'center'}
            h={appScale(26)}
            lh={appScale(26)}
            mb={appScale(32)}
            fontSize={'$4'}
            color={'#212121'}
            fow={'400'}
          >
            {redirect ? t('login.loginTips5') : t('login.loginTips3')}
          </SizableText>
          <XStack>
            <ActivityIndicator size={'large'} color={PrimaryColor} />
          </XStack>
        </YStack>
      </YStack>
    </AppModal>
  );
};

export default SuccessPopup;
