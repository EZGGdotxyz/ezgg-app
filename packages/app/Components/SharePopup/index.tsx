/*
 * @Date: 2025-03-05 10:00:00
 * @LastEditors: yosan
 * @LastEditTime: 2025-03-08 15:21:12
 * @FilePath: /ezgg-app/packages/app/Components/SharePopup/index.tsx
 */
import {AppImage, Button, ScrollView, SizableText, XStack, YStack} from '@my/ui';
import AppModal from 'app/Components/AppModal';
import {useTranslation} from 'react-i18next';
import {
  TwitterShareButton,
  TelegramShareButton,
  FacebookShareButton,
  WhatsappShareButton,
  TwitterIcon,
  TelegramIcon,
  FacebookIcon,
  WhatsappIcon,
} from 'react-share';
import React, {useEffect, useState} from 'react';
import useResponse from 'app/hooks/useResponse';

interface SharePopupProps {
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
  shareTitle?: string;
  shareUrl: string;
}

const SharePopup: React.FC<SharePopupProps> = ({modalVisible, setModalVisible, shareTitle, shareUrl}) => {
  const {t} = useTranslation();
  const {appScale} = useResponse();

  const shareItems = [
    {
      title: t('home.share.facebook'),
      button: () => (
        <FacebookShareButton url={shareUrl} title={shareTitle}>
          <FacebookIcon size={appScale(48)} round />
        </FacebookShareButton>
      ),
    },
    {
      title: t('home.share.twitter'),
      button: () => (
        <TwitterShareButton url={shareUrl} title={shareTitle}>
          <TwitterIcon size={appScale(48)} round />
        </TwitterShareButton>
      ),
    },
    {
      title: t('home.share.whatsapp'),
      button: () => (
        <WhatsappShareButton url={shareUrl} title={shareTitle}>
          <WhatsappIcon size={appScale(48)} round />
        </WhatsappShareButton>
      ),
    },
    {
      title: t('home.share.telegram'),
      button: () => (
        <TelegramShareButton url={shareUrl} title={shareTitle}>
          <TelegramIcon size={appScale(48)} round />
        </TelegramShareButton>
      ),
    },
    // {
    //   title: t('home.share.tiktok'),
    //   button: () => (
    //     <TouchableOpacity onPress={() => handleCopyLink('TikTok')}>
    //       <Image source={tiktokIcon} style={{width: 32, height: 32}} />
    //     </TouchableOpacity>
    //   ),
    // },
    // {
    //   title: t('home.share.instagram'),
    //   button: () => (
    //     <TouchableOpacity onPress={() => handleCopyLink('Instagram')}>
    //       <Image source={instagramIcon} style={{width: 32, height: 32}} />
    //     </TouchableOpacity>
    //   ),
    // },
  ];

  return (
    <AppModal zIndex={12} setModalVisible={setModalVisible} modalVisible={modalVisible}>
      <YStack w="100%" pos={'absolute'} ai={'center'} jc={'center'} b={0} l={0} bc="$background">
        <YStack space="$4" pl="$4" pr="$4" pt={'$6'} pb={'$10'} w="100%">
          <XStack jc="center" mb={'$4'}>
            <SizableText h={appScale(30)} lh={appScale(30)} fontSize={'$6'} color={'#212121'} fontWeight={'700'}>
              {t('home.share.title')}
            </SizableText>
          </XStack>
          <ScrollView flex={1} horizontal showsHorizontalScrollIndicator={false}>
            <XStack flexWrap="wrap" gap="$4" justifyContent="center">
              {shareItems.map((item, index) => {
                const Button = item.button;
                return (
                  <YStack paddingHorizontal={'$3'} key={index} alignItems="center" space="$2">
                    <Button />
                    <YStack>
                      <SizableText
                        h={appScale(30)}
                        lh={appScale(30)}
                        fontSize={'$4'}
                        color={'#212121'}
                        fontWeight={'500'}
                      >
                        {item.title}
                      </SizableText>
                    </YStack>
                  </YStack>
                );
              })}
            </XStack>
          </ScrollView>
        </YStack>
      </YStack>
    </AppModal>
  );
};

export default SharePopup;
