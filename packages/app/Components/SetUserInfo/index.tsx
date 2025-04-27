/*
 * @Date: 2023-12-08 16:25:15
 * @LastEditors: yosan
 * @LastEditTime: 2025-04-27 14:15:44
 * @FilePath: /ezgg-app/packages/app/Components/SetUserInfo/index.tsx
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
import AppModal from 'app/Components/AppModal';
import {PrimaryColor} from 'app/config';
import {useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import AppButton from 'app/Components/AppButton';
import {postFileUpload} from 'app/servers/api/fileUpload';
import useRequest from 'app/hooks/useRequest';
import useResponse from 'app/hooks/useResponse';
import useUser from 'app/hooks/useUser';
import {usePrivy, useUser as usePrivyUser} from '@privy-io/react-auth';
import {postUserUpdateMember} from 'app/servers/api/member';
import {useRematchModel} from 'app/store/model';

export type SetUserInfoProps = {
  setIsLoading: (value: boolean) => void;
};

const SetUserInfo: React.FC<any> = ({setIsLoading}: SetUserInfoProps) => {
  const {t, i18n} = useTranslation();
  //加载状态
  const [loading, setLoading] = useState(false);
  const toast = useToastController();
  const {makeRequest} = useRequest();
  const {appScale} = useResponse();
  const {initUserInfo} = useUser();
  const {refreshUser} = usePrivyUser();
  const accountContinue = () => {
    if (!accountForm?.nickname) {
      toast.show(t('login.profile.nikeName.error'));
      return;
    }

    // 检查用户名长度是否小于4个字符
    if (accountForm?.nickname.length < 4) {
      toast.show(t('login.profile.nikeName.error'));
      return;
    }

    // 检查用户名长度是否超过15个字符
    if (accountForm?.nickname && accountForm?.nickname.length > 15) {
      toast.show(t('login.profile.nikeName.tooLong'));
      return;
    }

    // 检查用户名是否包含 Twitter 或 Admin 字样（不区分大小写）
    const lowercaseNickname = accountForm?.nickname?.toLowerCase() || '';
    if (lowercaseNickname.includes('twitter') || lowercaseNickname.includes('admin')) {
      toast.show(t('login.profile.nikeName.restrictedWord'));
      return;
    }

    // 检查用户名是否只包含字母、数字和下划线
    const alphanumericRegex = /^[a-zA-Z0-9_]+$/;
    if (accountForm?.nickname && !alphanumericRegex.test(accountForm.nickname)) {
      toast.show(t('login.profile.nikeName.invalidChar'));
      return;
    }

    handleSuccess(accountForm);
  };
  const [accountForm, setAccountForm] = useState({
    nickname: '',
    avatar: '',
  });
  const [isSetInfo, setIsSetInfo] = useState(false);

  const [{userInfo}] = useRematchModel('user');

  useEffect(() => {
    if (userInfo?.customMetadata?.id) {
      if (!userInfo?.customMetadata?.nickname || userInfo?.customMetadata?.nickname?.startsWith('Crypto-')) {
        setIsSetInfo(true);
      }
    }
  }, [userInfo]);

  const handleSuccess = async (_userInfo: any) => {
    try {
      setIsLoading(true);
      try {
        await makeRequest(
          postUserUpdateMember({
            nickname: _userInfo.nickname || '',
            avatar: _userInfo.avatar || '',
          }),
        );
        await refreshUser();
        setTimeout(async () => {
          initUserInfo();
          // getInfrastructureList();
          // onLink();
          setIsSetInfo(false);
          setIsLoading(false);
          toast.show(t('tips.userInfo.success'));
        });
      } catch (error) {
        console.error('更新用户信息失败:', error);
        toast.show(t('tips.userInfo.failed'));
        setIsLoading(false);
      }
    } catch (error) {
      console.error('处理成功回调失败:', error);
      setTimeout(async () => {
        setIsSetInfo(false);
        setIsLoading(false);
      });
    }
  };

  return (
    <XStack>
      <AppModal isExit={false} zIndex={12} setModalVisible={setIsSetInfo} modalVisible={isSetInfo}>
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
            <YStack w="100%" mb={appScale(24)}>
              <SizableText ta={'center'} mb={appScale(12)} col={'#212121'} fontSize={'$4'}>
                {t('login.profile.title')}
              </SizableText>
              <SizableText ta={'center'} col={'#212121'} fontSize={'$4'}>
                {t('login.profile.sub')}
              </SizableText>
            </YStack>
            <YStack mb={appScale(24)} pos={'relative'}>
              <Button
                w={appScale(104)}
                h={appScale(104)}
                borderRadius={appScale(52)}
                overflow={'hidden'}
                borderWidth={2}
                borderColor={'#eee'}
                flexShrink={0}
                unstyled
                onPress={() => {
                  const input = document.createElement('input');
                  input.type = 'file';
                  input.accept = 'image/*';
                  input.onchange = async (e: any) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = async (e: any) => {
                        try {
                          setLoading(true);
                          const formData = new FormData();
                          formData.append('file', file);
                          const res = await makeRequest(
                            postFileUpload({
                              data: formData,
                              headers: {
                                'Content-Type': 'multipart/form-data',
                              },
                            }),
                          );
                          if (res?.data?.url) {
                            setAccountForm({
                              ...accountForm,
                              avatar: res.data.url,
                            });
                          }
                        } catch (error) {
                          console.error('上传头像失败:', error);
                          toast.show(t('common.upload.failed'));
                        } finally {
                          setLoading(false);
                        }
                      };
                      reader.readAsDataURL(file);
                    }
                  };
                  input.click();
                }}
              >
                {!accountForm?.avatar ? (
                  <AppImage
                    width={appScale(100)}
                    height={appScale(100)}
                    src={require(`app/assets/images/avatar.png`)}
                    type="local"
                  />
                ) : (
                  <AppImage width={appScale(100)} height={appScale(100)} src={accountForm.avatar} />
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
              <SizableText ta="left" mb={appScale(12)} col={'#212121'} fontSize={'$4'} fow={'700'}>
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
                {t('operate.button.confirm')}
              </AppButton>
              {/* <Button
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
              </Button> */}
            </YStack>
          </YStack>
        </YStack>
      </AppModal>
    </XStack>
  );
};

export default SetUserInfo;
