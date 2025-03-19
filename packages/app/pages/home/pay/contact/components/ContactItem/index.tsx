/*
 * @Date: 2023-12-08 16:25:15
 * @LastEditors: yosan
 * @LastEditTime: 2025-03-19 14:34:34
 * @FilePath: /ezgg-app/packages/app/pages/home/pay/contact/components/ContactItem/index.tsx
 */
import {AppImage, Button, Text, YStack, XStack, SizableText} from '@my/ui';
import {useRematchModel} from 'app/store/model';
import {useRouter} from 'solito/router';
import {useTranslation} from 'react-i18next';
import {getUserSubName, truncateAddress} from 'app/utils';
import {useEffect, useState} from 'react';
import useResponse from 'app/hooks/useResponse';

export type ContactListProps = {
  onSubmit: (userId: any) => void;
  item: any;
  itemKey: any;
};
// 联系人列表
const ContactItem: React.FC<any> = ({item, itemKey, onSubmit}: ContactListProps) => {
  const [{currency}] = useRematchModel('app');

  const {push} = useRouter();
  const {t, i18n} = useTranslation();
  const {appScale} = useResponse();

  return (
    <Button
      unstyled
      flexDirection="row"
      jc={'center'}
      ai={'center'}
      pressStyle={{
        opacity: 0.7,
      }}
      key={itemKey}
      p={appScale(16)}
      w={'100%'}
      mb={appScale(8)}
      bc={'#fff'}
      color={'#212121'}
      onPress={() => onSubmit(item)}
    >
      <YStack pos={'relative'} w={appScale(60)} h={appScale(60)} overflow={'hidden'} br={appScale(30)} flexShrink={0}>
        {!item?.avatar ? (
          <AppImage
            width={appScale(60)}
            height={appScale(60)}
            src={require(`app/assets/images/avatar.png`)}
            type="local"
          />
        ) : (
          <AppImage width={appScale(60)} height={appScale(60)} src={item?.avatar} />
        )}
      </YStack>
      <XStack flex={1} ai={'center'} jc={'space-between'} pl={appScale(12)}>
        <YStack gap={appScale(2)}>
          <SizableText fontSize={'$6'} color={'#26273C'} fontWeight={'500'}>
            @{item?.nickname}
          </SizableText>
          <SizableText fontSize={'$4'} color={'#9395A4'} fontWeight={'500'}>
            {getUserSubName(item)}
          </SizableText>
        </YStack>
      </XStack>
    </Button>
  );
};

export default ContactItem;
