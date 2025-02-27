/*
 * @Date: 2023-12-18 14:37:38
 * @LastEditors: yosan
 * @LastEditTime: 2025-02-27 21:53:11
 * @FilePath: /ezgg-app/packages/app/pages/profile/privacyPolicy/index.tsx
 */
import {AppHeader, AppHeaderProps, HeaderBackButton, Paragraph, YStack, SizableText, XStack, ScrollView} from '@my/ui';
import React from 'react';
import {useTranslation} from 'react-i18next';
import PermissionPage from 'app/Components/PermissionPage';
import AppHeader2 from 'app/Components/AppHeader2';
import {appScale} from 'app/utils';

// 隱私政策
const PrivacyPolicyScreen = () => {
  const {t} = useTranslation();
  return (
    <PermissionPage isHomePage={true}>
      <AppHeader2 title={t('screen.profile.privacyPolicy.title')} fallbackUrl="/profile" />
      <ScrollView flex={1}>
        <YStack f={1} px={appScale(24)} py={appScale(20)} space={appScale(24)}>
          {/* Introduction */}
          <YStack>
            <SizableText fontSize="$4" color="$color" mb={appScale(16)}>
              At ezgg, we respect and protect the privacy of our users. This Privacy Policy outlines the types of
              personal information we collect, how we use it, and how we protect your information.
            </SizableText>
          </YStack>

          {/* Information We Collect */}
          <YStack>
            <SizableText fontSize="$6" fontWeight="700" color="$color" mb={appScale(16)}>
              Information We Collect
            </SizableText>
            <SizableText fontSize="$4" color="$color" mb={appScale(12)}>
              When you use our app, we may collect the following types of personal information:
            </SizableText>
            <YStack space={appScale(12)} pl={appScale(8)}>
              <XStack space={appScale(8)} ai="flex-start">
                <SizableText fontSize="$4" color="$color">
                  ·
                </SizableText>
                <SizableText fontSize="$4" color="$color">
                  <SizableText fontSize="$4" fontWeight="600" color="$color">
                    Device Information:
                  </SizableText>{' '}
                  We may collect information about the type of device you use, its operating system, and other technical
                  details to help us improve our app.
                </SizableText>
              </XStack>
              <XStack space={appScale(8)} ai="flex-start">
                <SizableText fontSize="$4" color="$color">
                  ·
                </SizableText>
                <SizableText fontSize="$4" color="$color">
                  <SizableText fontSize="$4" fontWeight="600" color="$color">
                    Usage Information:
                  </SizableText>{' '}
                  We may collect information about how you use our app, such as which features you use and how often you
                  use them.
                </SizableText>
              </XStack>
              <XStack space={appScale(8)} ai="flex-start">
                <SizableText fontSize="$4" color="$color">
                  ·
                </SizableText>
                <SizableText fontSize="$4" color="$color">
                  <SizableText fontSize="$4" fontWeight="600" color="$color">
                    Personal Information:
                  </SizableText>{' '}
                  We may collect personal information, such as your name, email address, or phone number, if you choose
                  to provide it to us.
                </SizableText>
              </XStack>
            </YStack>
          </YStack>

          {/* How We Use Your Information */}
          <YStack>
            <SizableText fontSize="$6" fontWeight="700" color="$color" mb={appScale(16)}>
              How We Use Your Information
            </SizableText>
            <SizableText fontSize="$4" color="$color" mb={appScale(12)}>
              We use your information for the following purposes:
            </SizableText>
            <YStack space={appScale(12)} pl={appScale(8)}>
              <XStack space={appScale(8)} ai="flex-start">
                <SizableText fontSize="$4" color="$color">
                  ·
                </SizableText>
                <SizableText fontSize="$4" color="$color">
                  <SizableText fontSize="$4" fontWeight="600" color="$color">
                    To provide and improve our app:
                  </SizableText>{' '}
                  We use your information to provide and improve our app, including to personalize your experience and
                  to analyze how our app is used.
                </SizableText>
              </XStack>
              <XStack space={appScale(8)} ai="flex-start">
                <SizableText fontSize="$4" color="$color">
                  ·
                </SizableText>
                <SizableText fontSize="$4" color="$color">
                  <SizableText fontSize="$4" fontWeight="600" color="$color">
                    To communicate with you:
                  </SizableText>{' '}
                  We may use your information to communicate with you about our app, including to provide you with
                  updates and news about our app.
                </SizableText>
              </XStack>
              <XStack space={appScale(8)} ai="flex-start">
                <SizableText fontSize="$4" color="$color">
                  ·
                </SizableText>
                <SizableText fontSize="$4" color="$color">
                  <SizableText fontSize="$4" fontWeight="600" color="$color">
                    To protect our rights and the rights of others:
                  </SizableText>{' '}
                  We may use your information to protect our rights and the rights of others, such as to investigate and
                  prevent fraud or other illegal activity.
                </SizableText>
              </XStack>
            </YStack>
          </YStack>
        </YStack>
      </ScrollView>
    </PermissionPage>
  );
};
export default PrivacyPolicyScreen;
