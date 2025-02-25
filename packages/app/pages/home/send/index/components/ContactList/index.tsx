/*
 * @Date: 2023-12-08 16:25:15
 * @LastEditors: yosan
 * @LastEditTime: 2025-02-25 17:17:35
 * @FilePath: /ezgg-app/packages/app/pages/home/send/index/components/ContactList/index.tsx
 */
import {AppImage, Button, Text, YStack, XStack, SizableText} from '@my/ui';
import {useRematchModel} from 'app/store/model';
import {useRouter} from 'solito/router';
import {useTranslation} from 'react-i18next';
import {appScale} from 'app/utils';

export type ContactListProps = {
  onSubmit: (userId: any) => void;
};
// 联系人列表
const ContactList: React.FC<any> = (props: ContactListProps) => {
  const [{demoniator}] = useRematchModel('app');

  const {push} = useRouter();
  const {t, i18n} = useTranslation();

  const list = [
    {
      id: 1,
      avatar: '',
      name: 'Elvan123',
      subName: 'elvan123@elvan.com',
    },
    {
      id: 2,
      avatar: '',
      name: 'Elvan123',
      subName: 'elvan123@elvan.com',
    },
    {
      id: 3,
      avatar: '',
      name: 'Elvan123',
      subName: 'elvan123@elvan.com',
    },
    {
      id: 4,
      avatar: '',
      name: 'Elvan123',
      subName: 'elvan123@elvan.com',
    },
    {
      id: 5,
      avatar: '',
      name: 'Elvan123',
      subName: 'elvan123@elvan.com',
    },
    {
      id: 6,
      avatar: '',
      name: 'Elvan123',
      subName: 'elvan123@elvan.com',
    },
    {
      id: 7,
      avatar: '',
      name: 'Elvan123',
      subName: 'elvan123@elvan.com',
    },
    {
      id: 8,
      avatar: '',
      name: 'Elvan123',
      subName: 'elvan123@elvan.com',
    },
    {
      id: 9,
      avatar: '',
      name: 'Elvan123',
      subName: 'elvan123@elvan.com',
    },
  ];

  return (
    <YStack pl={appScale(24)} pr={appScale(24)}>
      {list.map((item, index) => (
        <Button
          unstyled
          flexDirection="row"
          jc={'center'}
          ai={'center'}
          pressStyle={{
            opacity: 0.7,
          }}
          key={index}
          p={appScale(16)}
          w={'100%'}
          mb={appScale(8)}
          bc={'#fff'}
          onPress={() => props.onSubmit(item?.id)}
        >
          <YStack pos={'relative'} w={appScale(72)} flexShrink={0}>
            {!item?.avatar ? (
              <AppImage
                width={appScale(60)}
                height={appScale(60)}
                src={require(`app/assets/images/avatar.png`)}
                type="local"
              />
            ) : (
              <AppImage width={appScale(60)} height={appScale(60)} src={item.avatar} />
            )}
          </YStack>
          <XStack flex={1} ai={'center'} jc={'space-between'}>
            <YStack gap={appScale(2)}>
              <SizableText fontSize={'$6'} color={'#26273C'} fontWeight={'500'}>
                {item.name}
              </SizableText>
              <SizableText fontSize={'$4'} color={'#9395A4'} fontWeight={'500'}>
                {item.subName}
              </SizableText>
            </YStack>
          </XStack>
        </Button>
      ))}
    </YStack>
  );
};

export default ContactList;
