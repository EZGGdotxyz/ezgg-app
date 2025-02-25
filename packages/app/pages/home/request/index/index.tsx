/*
 * @Date: 2023-12-18 14:37:38
 * @LastEditors: yosan
 * @LastEditTime: 2025-02-25 18:21:06
 * @FilePath: /ezgg-app/packages/app/pages/home/request/index/index.tsx
 */
import {
  AppHeader,
  AppHeaderProps,
  HeaderBackButton,
  Paragraph,
  XStack,
  YStack,
  SizableText,
  AppImage,
  ScrollView,
} from '@my/ui';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import PermissionPage from 'app/Components/PermissionPage';
import AppButton from 'app/Components/AppButton';
import {appScale, isIphoneX} from 'app/utils';
import AppHeader2 from 'app/Components/AppHeader2';
import SearchHeader from 'app/Components/SearchHeader';
import {PrimaryColor} from 'app/config';
import ContactList from '../../send/index/components/ContactList';
import {useRouter} from 'solito/router';
import {createParam} from 'solito';
const {useParams} = createParam<any>();

// 发送
const SendToScreen = () => {
  const {t} = useTranslation();
  const {params} = useParams();
  const [isLoading, setIsLoading] = React.useState(false);
  const {push} = useRouter();

  const [searchName, setSearchName] = useState('');

  const onSubmit = (userId = 'anyone') => {
    console.log('🚀 ~ onSearch ~ data:', userId);
    push(
      `/home/request/amount?userId=${userId}&token=${params?.token || ''}&chain=${params?.chain || ''}&amount=${
        params?.amount || ''
      }`,
    );
  };

  const onSearch = (text) => {
    console.log('🚀 ~ onSearch ~ text:', text);
  };

  return (
    <PermissionPage>
      <AppHeader2 title={t('screen.home.requestFrom')} isQr={true} type={'send'} fallbackUrl="/" />
      <SearchHeader searchName={searchName} setSearchName={setSearchName} onSearch={onSearch} />
      <YStack flexShrink={0} w={'100%'} pl={appScale(24)} pr={appScale(24)} pb={appScale(24)}>
        <XStack w={'100%'} pb={appScale(12)}>
          <YStack w={'50%'}>
            <SizableText
              h={appScale(30)}
              w={'100%'}
              lh={appScale(30)}
              ta={'center'}
              fontSize={'$5'}
              color={'#212121'}
              fow="600"
            >
              {t('home.send.recent')}
            </SizableText>
          </YStack>
        </XStack>
        <XStack pos={'relative'} w={'100%'} h={2} bc={'#EEEEEE'}>
          <XStack pos="absolute" w="50%" t={-1} h={4} bc={PrimaryColor} borderRadius={2}></XStack>
        </XStack>
      </YStack>
      <YStack flex={1}>
        <ScrollView bc="$background">
          <ContactList onSubmit={onSubmit} />
        </ScrollView>
      </YStack>
      <XStack
        flexShrink={0}
        pl={appScale(24)}
        pr={appScale(24)}
        pt={12}
        pb={appScale(isIphoneX() ? 46 : 12)}
        w="100%"
        ai={'center'}
        jc={'center'}
        borderTopWidth={1}
        borderColor={'#F2F2F2'}
      >
        <AppButton
          onPress={() => {
            onSubmit();
          }}
        >
          {t('home.send.paylink')}
        </AppButton>
      </XStack>
    </PermissionPage>
  );
};
export default SendToScreen;
