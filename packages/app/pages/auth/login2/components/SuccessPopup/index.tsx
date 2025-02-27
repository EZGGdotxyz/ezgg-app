/*
 * @Date: 2023-12-08 16:25:15
 * @LastEditors: yosan
 * @LastEditTime: 2025-02-27 17:51:09
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
import {appScale} from 'app/utils';
import {useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {ActivityIndicator} from 'react-native';
import {Link} from 'solito/link';
import {Check, ChevronDown, ChevronRight, ChevronUp, LockKeyhole, User} from '@tamagui/lucide-icons';
import AppButton from 'app/Components/AppButton';

export type SuccessPopupProps = {
  handleSuccess: (values: any) => void;
  accountForm: any;
  setAccountForm: (values) => void;
  isSetInfo: boolean;
  modalVisible: any;
  setModalVisible: (values) => void;
};

const SuccessPopup: React.FC<any> = ({
  handleSuccess,
  accountForm,
  setAccountForm,
  isSetInfo,
  modalVisible,
  setModalVisible,
}: SuccessPopupProps) => {
  const {t, i18n} = useTranslation();
  //加载状态
  const [loading, setLoading] = useState(false);
  const toast = useToastController();

  const accountContinue = () => {
    if (accountForm?.nickname && accountForm?.nickname.length < 4) {
      toast.show(t('login.profile.nikeName.error'));
      return;
    }
    console.log('🚀 ~ accountContinue ~ accountForm:', accountForm);
    handleSuccess(accountForm);
  };

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
        {isSetInfo && (
          <YStack ai={'center'} pt={appScale(40)} pr={appScale(32)} pl={appScale(32)} pb={appScale(32)}>
            <YStack w="100%" mb={appScale(24)}>
              <SizableText ta={'center'} mb={appScale(24)} col={'#212121'} fontSize={'$7'} fow={'700'}>
                {t('login.profile.title')}
              </SizableText>
              <SizableText ta={'center'} col={'#212121'} fontSize={'$4'}>
                {t('login.profile.sub')}
              </SizableText>
            </YStack>
            <YStack mb={appScale(24)} pos={'relative'}>
              <Button
                w={104}
                h={104}
                borderRadius={52}
                overflow={'hidden'}
                borderWidth={2}
                borderColor={'#eee'}
                flexShrink={0}
                unstyled
                onPress={() => {
                  const input = document.createElement('input');
                  input.type = 'file';
                  input.accept = 'image/*';
                  input.onchange = (e: any) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (e: any) => {
                        setAccountForm({
                          ...accountForm,
                          avatar: '',
                          // avatar: e.target.result,
                        });
                      };
                      reader.readAsDataURL(file);
                    }
                  };
                  input.click();
                }}
              >
                {!accountForm?.avatar ? (
                  <AppImage width={100} height={100} src={require(`app/assets/images/avatar.png`)} type="local" />
                ) : (
                  <AppImage width={100} height={100} src={accountForm.avatar} />
                )}
              </Button>
              <XStack
                bc={PrimaryColor}
                borderRadius={4}
                w={appScale(28)}
                h={appScale(28)}
                pos={'absolute'}
                bottom={0}
                right={0}
                ai={'center'}
                jc={'center'}
                pressStyle={{opacity: 0.8}}
              >
                <Edit3 size={'$1'} color={'#212121'} />
              </XStack>
            </YStack>

            <YStack w={'100%'}>
              <SizableText ta="left" mb={appScale(12)} col={'#212121'} fontSize={'$5'} fow={'700'}>
                {t('login.profile.nikeName')}
              </SizableText>
              <XStack
                w="100%"
                p={appScale(16)}
                bc={'#FAFAFA'}
                br={appScale(8)}
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
                mb={appScale(24)}
              >
                <Input
                  w={'100%'}
                  unstyled
                  fontSize={'$8'}
                  h={appScale(50)}
                  lh={appScale(50)}
                  color={'#212121'}
                  fontWeight={'600'}
                  pos="relative"
                  // style={{borderWidth: 0, paddingLeft: 16, paddingRight: 16, height: 50, flex: 1, width: '100%'}}
                  value={accountForm.nickname}
                  onChangeText={(text) => {
                    setAccountForm({
                      ...accountForm,
                      nickname: text,
                    });
                  }}
                  placeholder={t('login.profile.nikeName.placeholder')}
                />
              </XStack>
            </YStack>

            <YStack w={appScale(343)}>
              <AppButton isLoading={loading} onPress={accountContinue}>
                {t('operate.button.login')}
              </AppButton>
              <Button
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                unstyled
                mt={appScale(24)}
                chromeless
                onPress={() => {
                  handleSuccess({
                    nickname: '',
                    avatar: '',
                  });
                  // push('/');
                  // setModalVisible(false);
                }}
              >
                <SizableText col={'#212121'} fontSize={'$3'}>
                  {t('login.profile.dont')}
                </SizableText>
              </Button>
            </YStack>
          </YStack>
        )}

        {!isSetInfo && (
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
            <SizableText
              ta={'center'}
              h={appScale(26)}
              lh={appScale(26)}
              mb={appScale(32)}
              fontSize={'$4'}
              color={'#212121'}
              fow={'400'}
            >
              {t('login.loginTips3')}
            </SizableText>
            <XStack>
              <ActivityIndicator size={'large'} color={PrimaryColor} />
            </XStack>
          </YStack>
        )}
      </YStack>
    </AppModal>
  );
};

export default SuccessPopup;
