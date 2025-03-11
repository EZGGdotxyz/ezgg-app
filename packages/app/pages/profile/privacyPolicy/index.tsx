/*
 * @Date: 2023-12-18 14:37:38
 * @LastEditors: yosan
 * @LastEditTime: 2025-03-11 16:55:47
 * @FilePath: /ezgg-app/packages/app/pages/profile/privacyPolicy/index.tsx
 */
import {AppHeader, AppHeaderProps, HeaderBackButton, Paragraph, YStack, SizableText, XStack, ScrollView} from '@my/ui';
import React from 'react';
import {useTranslation} from 'react-i18next';
import PermissionPage from 'app/Components/PermissionPage';
import AppHeader2 from 'app/Components/AppHeader2';
import useResponse from 'app/hooks/useResponse';
// 隱私政策
const PrivacyPolicyScreen = () => {
  const {t} = useTranslation();
  const {appScale} = useResponse();

  return (
    <PermissionPage isHomePage={true}>
      <AppHeader2 title={t('screen.profile.privacyPolicy.title')} fallbackUrl="/profile" />
      <ScrollView flex={1}>
        <YStack f={1} p={appScale(24)}>
          <SizableText fontSize="$4" color="$color" mb={appScale(12)}>
            {t('profile.about.content.1')}
          </SizableText>
          <SizableText fontSize="$4" color="$color" mb={appScale(12)}>
            {t('profile.about.content.2')}
          </SizableText>
          {/* 条款1 */}
          <YStack mb={appScale(12)}>
            <SizableText fontSize="$6" fontWeight="700" color="$color" mb={appScale(16)}>
              {t('profile.privacyPolicy.1.title')}
            </SizableText>
            <SizableText fontSize="$4" color="$color" mb={appScale(12)}>
              {t('profile.privacyPolicy.1.content.1')}
            </SizableText>

            <YStack gap="$2">
              <XStack gap="$2">
                <YStack h={appScale(28)} ai="center" jc="center">
                  <XStack w={appScale(8)} h={appScale(8)} bg={'#424242'} borderRadius={appScale(4)}></XStack>
                </YStack>
                <SizableText lh={appScale(28)} col={'#424242'} fontSize={'$4'} fow="500">
                  {t('profile.privacyPolicy.1.content.list.1')}
                </SizableText>
              </XStack>
              <XStack gap="$2">
                <YStack h={appScale(28)} ai="center" jc="center">
                  <XStack w={appScale(8)} h={appScale(8)} bg={'#424242'} borderRadius={appScale(4)}></XStack>
                </YStack>
                <SizableText lh={appScale(28)} col={'#424242'} fontSize={'$4'} fow="500">
                  {t('profile.privacyPolicy.1.content.list.2')}
                </SizableText>
              </XStack>
              <XStack gap="$2">
                <YStack h={appScale(28)} ai="center" jc="center">
                  <XStack w={appScale(8)} h={appScale(8)} bg={'#424242'} borderRadius={appScale(4)}></XStack>
                </YStack>
                <SizableText lh={appScale(28)} col={'#424242'} fontSize={'$4'} fow="500">
                  {t('profile.privacyPolicy.1.content.list.3')}
                </SizableText>
              </XStack>
              <XStack gap="$2">
                <YStack h={appScale(28)} ai="center" jc="center">
                  <XStack w={appScale(8)} h={appScale(8)} bg={'#424242'} borderRadius={appScale(4)}></XStack>
                </YStack>
                <SizableText lh={appScale(28)} col={'#424242'} fontSize={'$4'} fow="500">
                  {t('profile.privacyPolicy.1.content.list.4')}
                </SizableText>
              </XStack>
            </YStack>
          </YStack>
          {/* 条款2 */}
          <YStack mb={appScale(12)}>
            <SizableText fontSize="$6" fontWeight="700" color="$color" mb={appScale(16)}>
              {t('profile.privacyPolicy.2.title')}
            </SizableText>
            <SizableText fontSize="$4" color="$color" mb={appScale(12)}>
              {t('profile.privacyPolicy.2.content.1')}
            </SizableText>

            <YStack gap="$2">
              <XStack gap="$2">
                <YStack h={appScale(28)} ai="center" jc="center">
                  <XStack w={appScale(8)} h={appScale(8)} bg={'#424242'} borderRadius={appScale(4)}></XStack>
                </YStack>
                <SizableText lh={appScale(28)} col={'#424242'} fontSize={'$4'} fow="500">
                  {t('profile.privacyPolicy.2.content.list.1')}
                </SizableText>
              </XStack>
              <XStack gap="$2">
                <YStack h={appScale(28)} ai="center" jc="center">
                  <XStack w={appScale(8)} h={appScale(8)} bg={'#424242'} borderRadius={appScale(4)}></XStack>
                </YStack>
                <SizableText lh={appScale(28)} col={'#424242'} fontSize={'$4'} fow="500">
                  {t('profile.privacyPolicy.2.content.list.2')}
                </SizableText>
              </XStack>
              <XStack gap="$2">
                <YStack h={appScale(28)} ai="center" jc="center">
                  <XStack w={appScale(8)} h={appScale(8)} bg={'#424242'} borderRadius={appScale(4)}></XStack>
                </YStack>
                <SizableText lh={appScale(28)} col={'#424242'} fontSize={'$4'} fow="500">
                  {t('profile.privacyPolicy.2.content.list.3')}
                </SizableText>
              </XStack>
              <XStack gap="$2">
                <YStack h={appScale(28)} ai="center" jc="center">
                  <XStack w={appScale(8)} h={appScale(8)} bg={'#424242'} borderRadius={appScale(4)}></XStack>
                </YStack>
                <SizableText lh={appScale(28)} col={'#424242'} fontSize={'$4'} fow="500">
                  {t('profile.privacyPolicy.2.content.list.4')}
                </SizableText>
              </XStack>
              <XStack gap="$2">
                <YStack h={appScale(28)} ai="center" jc="center">
                  <XStack w={appScale(8)} h={appScale(8)} bg={'#424242'} borderRadius={appScale(4)}></XStack>
                </YStack>
                <SizableText lh={appScale(28)} col={'#424242'} fontSize={'$4'} fow="500">
                  {t('profile.privacyPolicy.2.content.list.5')}
                </SizableText>
              </XStack>
              <XStack gap="$2">
                <YStack h={appScale(28)} ai="center" jc="center">
                  <XStack w={appScale(8)} h={appScale(8)} bg={'#424242'} borderRadius={appScale(4)}></XStack>
                </YStack>
                <SizableText lh={appScale(28)} col={'#424242'} fontSize={'$4'} fow="500">
                  {t('profile.privacyPolicy.2.content.list.6')}
                </SizableText>
              </XStack>
            </YStack>
          </YStack>
          {/* 条款3 */}
          <YStack mb={appScale(12)}>
            <SizableText fontSize="$6" fontWeight="700" color="$color" mb={appScale(16)}>
              {t('profile.privacyPolicy.3.title')}
            </SizableText>
            <SizableText fontSize="$4" color="$color" mb={appScale(12)}>
              {t('profile.privacyPolicy.3.content.1')}
            </SizableText>

            <YStack gap="$2">
              <XStack gap="$2">
                <YStack h={appScale(28)} ai="center" jc="center">
                  <XStack w={appScale(8)} h={appScale(8)} bg={'#424242'} borderRadius={appScale(4)}></XStack>
                </YStack>
                <SizableText lh={appScale(28)} col={'#424242'} fontSize={'$4'} fow="500">
                  {t('profile.privacyPolicy.3.content.list.1')}
                </SizableText>
              </XStack>
              <XStack gap="$2">
                <YStack h={appScale(28)} ai="center" jc="center">
                  <XStack w={appScale(8)} h={appScale(8)} bg={'#424242'} borderRadius={appScale(4)}></XStack>
                </YStack>
                <SizableText lh={appScale(28)} col={'#424242'} fontSize={'$4'} fow="500">
                  {t('profile.privacyPolicy.3.content.list.2')}
                </SizableText>
              </XStack>
              <XStack gap="$2">
                <YStack h={appScale(28)} ai="center" jc="center">
                  <XStack w={appScale(8)} h={appScale(8)} bg={'#424242'} borderRadius={appScale(4)}></XStack>
                </YStack>
                <SizableText lh={appScale(28)} col={'#424242'} fontSize={'$4'} fow="500">
                  {t('profile.privacyPolicy.3.content.list.3')}
                </SizableText>
              </XStack>
            </YStack>
            <SizableText fontSize="$4" color="$color" mb={appScale(12)}>
              {t('profile.privacyPolicy.3.content.2')}
            </SizableText>
          </YStack>
          {/* 条款4 */}
          <YStack mb={appScale(12)}>
            <SizableText fontSize="$6" fontWeight="700" color="$color" mb={appScale(16)}>
              {t('profile.privacyPolicy.4.title')}
            </SizableText>
            <SizableText fontSize="$4" color="$color" mb={appScale(12)}>
              {t('profile.privacyPolicy.4.content.1')}
            </SizableText>

            <YStack gap="$2">
              <XStack gap="$2">
                <YStack h={appScale(28)} ai="center" jc="center">
                  <XStack w={appScale(8)} h={appScale(8)} bg={'#424242'} borderRadius={appScale(4)}></XStack>
                </YStack>
                <SizableText lh={appScale(28)} col={'#424242'} fontSize={'$4'} fow="500">
                  {t('profile.privacyPolicy.4.content.list.1')}
                </SizableText>
              </XStack>
              <XStack gap="$2">
                <YStack h={appScale(28)} ai="center" jc="center">
                  <XStack w={appScale(8)} h={appScale(8)} bg={'#424242'} borderRadius={appScale(4)}></XStack>
                </YStack>
                <SizableText lh={appScale(28)} col={'#424242'} fontSize={'$4'} fow="500">
                  {t('profile.privacyPolicy.4.content.list.2')}
                </SizableText>
              </XStack>
              <XStack gap="$2">
                <YStack h={appScale(28)} ai="center" jc="center">
                  <XStack w={appScale(8)} h={appScale(8)} bg={'#424242'} borderRadius={appScale(4)}></XStack>
                </YStack>
                <SizableText lh={appScale(28)} col={'#424242'} fontSize={'$4'} fow="500">
                  {t('profile.privacyPolicy.4.content.list.3')}
                </SizableText>
              </XStack>
            </YStack>
          </YStack>
          {/* 条款5 */}
          <YStack mb={appScale(12)}>
            <SizableText fontSize="$6" fontWeight="700" color="$color" mb={appScale(16)}>
              {t('profile.privacyPolicy.5.title')}
            </SizableText>
            <SizableText fontSize="$4" color="$color" mb={appScale(12)}>
              {t('profile.privacyPolicy.5.content.1')}
            </SizableText>
          </YStack>
          {/* 条款6 */}
          <YStack mb={appScale(12)}>
            <SizableText fontSize="$6" fontWeight="700" color="$color" mb={appScale(16)}>
              {t('profile.privacyPolicy.6.title')}
            </SizableText>
            <SizableText fontSize="$4" color="$color" mb={appScale(12)}>
              {t('profile.privacyPolicy.6.content.1')}
            </SizableText>
          </YStack>

          {/* 条款7 */}
          <YStack mb={appScale(12)}>
            <SizableText fontSize="$6" fontWeight="700" color="$color" mb={appScale(16)}>
              {t('profile.privacyPolicy.7.title')}
            </SizableText>
            <SizableText fontSize="$4" color="$color" mb={appScale(12)}>
              {t('profile.privacyPolicy.7.content.1')}
            </SizableText>
            <SizableText fontSize="$4" color="$color" mb={appScale(12)}>
              {t('profile.privacyPolicy.7.content.2')}
            </SizableText>
            <SizableText fontSize="$4" color="$color" mb={appScale(12)}>
              {t('profile.privacyPolicy.7.content.3')}
            </SizableText>
          </YStack>
        </YStack>
      </ScrollView>
    </PermissionPage>
  );
};
export default PrivacyPolicyScreen;
