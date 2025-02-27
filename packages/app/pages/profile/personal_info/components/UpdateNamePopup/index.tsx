/*
 * @Date: 2023-12-08 16:25:15
 * @LastEditors: snapxlabs
 * @LastEditTime: 2024-07-08 18:05:17
 * @FilePath: /snapx-nfc-app/packages/app/pages/my/personal_info/components/UpdateNamePopup/index.tsx
 */
import {AppImage, Button, Input, SizableText, Text, XStack, YStack, useToastController} from '@my/ui';
import {Airplay, AlignJustify} from '@tamagui/lucide-icons';
import AppModal from 'app/Components/AppModal';
import {PrimaryColor} from 'app/config';
import {useTranslation} from 'react-i18next';
import {Link} from 'solito/link';
import {memberGiftExchangeRouterMemberCommitGiftExchange} from 'app/servers/api/6004Cantinghuiyuanliwuduihuanjijilu';
import useRequest from 'app/hooks/useRequest';
import {useEffect, useState} from 'react';
import {useRematchModel} from 'app/store/model';
import { memberProfileUpdateMemberProfile } from 'app/servers/api/1002Huiyuangerenxinxi';
import useUser from 'app/hooks/useUser';
import {Keyboard, TouchableWithoutFeedback} from 'react-native';
import Feedback from 'app/Components/Feedback';

export type UpdateNamePopupProps = {
  modalVisible: any;
  setModalVisible: (values) => void;
  userInfo: any;
};
// 首页 餐厅详情
const UpdateNamePopup: React.FC<any> = ({modalVisible, setModalVisible, userInfo}: UpdateNamePopupProps) => {
  const {t, i18n} = useTranslation();
  const [user] = useRematchModel('user');
  const {initUserInfo} = useUser();
  const [name, setName] = useState<string>('');
  const toast = useToastController();

  const {makeRequest} = useRequest();

  const onPress = async () => {
    if (!name) {
      toast.show(t('my.personal_info.name.placeholder'), {
        type: 'error',
      });
      return;
    }
    const res = await makeRequest(
      memberProfileUpdateMemberProfile({
        nickname: name,
      }),
    );
    if (res) {
      toast.show(t('tips.operation.success'));
      initUserInfo(user?.userInfo?.id);
      setModalVisible(false);
    }
  };

  useEffect(() => {
    if (userInfo?.nickname) {
      setName(userInfo?.nickname);
    }
  }, [userInfo]);

  return (
    <AppModal setModalVisible={setModalVisible} modalVisible={modalVisible}>
      <YStack w="100%" pos={'absolute'} jc={'center'} ai={'center'} p="$4" t={'10%'} l={0}>
        <Feedback>
          <YStack w="100%" p="$4" ai={'center'} jc={'center'} borderRadius={50} bc='$background'>
            <XStack mb="$6" jc={'center'}>
              <SizableText col={'$color'} fontSize={'$4'}>
                {t('my.personal_info.popup.title')}
              </SizableText>
            </XStack>

            <XStack mb="$6" w="100%" alignItems="center">
              <Input
                value={name}
                onChangeText={(text) => {
                  setName(text);
                }}
                f={1}
                size={'$4'}
                placeholder={t('my.personal_info.name.placeholder')}
              />
            </XStack>

            <Button
              style={{
                backgroundColor: PrimaryColor,
                height: 50,
                borderRadius: 25,
                paddingLeft: 20,
                paddingRight: 20,
                width: '100%',
              }}
              color="$color1"
              mb="$3"
              ai="center"
              jc="center"
              onPress={onPress}
            >
              <SizableText col={'$color1'} fontSize={'$3'}>
                {t('operate.button.confirm')}
              </SizableText>
            </Button>
          </YStack>
        </Feedback>
      </YStack>
    </AppModal>
  );
};

export default UpdateNamePopup;
