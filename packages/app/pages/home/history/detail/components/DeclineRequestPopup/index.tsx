/*
 * @Date: 2025-03-05 10:00:00
 * @LastEditors: yosan
 * @LastEditTime: 2025-03-05 11:17:48
 * @FilePath: /ezgg-app/packages/app/pages/home/history/detail/components/DeclineRequestPopup/index.tsx
 */
import {AppImage, Button, ScrollView, SizableText, useToastController, XStack, YStack} from '@my/ui';
import AppModal from 'app/Components/AppModal';
import {appScale, formatTokenAmount, isIphoneX} from 'app/utils';
import {useTranslation} from 'react-i18next';
import React, {useEffect, useState} from 'react';
import {PrimaryColor} from 'app/config';
import AppButton from 'app/Components/AppButton';
import {postTransactionHistoryDeclineTransactionHistory} from 'app/servers/api/transactionHistory';
import useRequest from 'app/hooks/useRequest';

interface DeclineRequestPopupProps {
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
  orderData: any;
  setIsLoading: (value: boolean) => void;
}

const DeclineRequestPopup: React.FC<DeclineRequestPopupProps> = ({
  modalVisible,
  setModalVisible,
  orderData,
  setIsLoading,
}) => {
  const {t} = useTranslation();
  const {makeRequest} = useRequest();
  const toast = useToastController();

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      setModalVisible(false);
      const res = await makeRequest(
        postTransactionHistoryDeclineTransactionHistory({
          id: orderData?.id,
        }),
      );

      if (res?.code !== '0') {
        toast.show(t('tips.success.declineRequest'), {
          duration: 3000,
        });
      }
    } catch (error) {
      toast.show(t('tips.error.networkError'), {
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AppModal zIndex={12} setModalVisible={setModalVisible} modalVisible={modalVisible}>
      <YStack
        w="100%"
        pos={'absolute'}
        ai={'center'}
        jc={'center'}
        b={0}
        l={0}
        bc="$background"
        pt={appScale(8)}
        borderTopRightRadius={appScale(16)}
        borderTopLeftRadius={appScale(16)}
      >
        <YStack pt={appScale(24)} pl={appScale(24)} pr={appScale(24)} w="100%">
          <SizableText ta={'center'} fontSize={'$7'} color={'#212121'} fontWeight={'700'}>
            {t('home.order.declineRequest')}
          </SizableText>
          <XStack h={1} w="100%" mt={appScale(24)} mb={appScale(24)} bc={'#eee'} jc={'center'} ai={'center'}></XStack>
          <SizableText pb={appScale(24)} ta={'center'} fontSize={'$6'} color={'#212121'} fontWeight={'600'}>
            {t('home.order.declineTips', {
              amount: `${formatTokenAmount(orderData?.amount, orderData?.tokenDecimals)} ${orderData?.tokenSymbol}`,
              name: `@${orderData?.senderMember?.name || ''}`,
            })}
          </SizableText>
          <XStack
            flexShrink={0}
            pt={12}
            pb={appScale(isIphoneX() ? 46 : 12)}
            w="100%"
            ai={'center'}
            jc={'center'}
            space="$3"
            borderTopWidth={1}
            borderColor={'#fff'}
          >
            <Button
              h={appScale(58)}
              w={'50%'}
              br={appScale(28)}
              ai={'center'}
              jc={'center'}
              bc={'#fff'}
              borderWidth={2}
              borderColor={PrimaryColor}
              onPress={() => {
                setModalVisible(false);
              }}
              pressStyle={{
                opacity: 0.85,
              }}
              unstyled
            >
              {t('home.order.noDecline')}
            </Button>
            <AppButton
              style={{
                width: '50%',
              }}
              onPress={() => {
                onSubmit();
              }}
            >
              {t('home.order.yesDecline')}
            </AppButton>
          </XStack>
        </YStack>
      </YStack>
    </AppModal>
  );
};

export default DeclineRequestPopup;
