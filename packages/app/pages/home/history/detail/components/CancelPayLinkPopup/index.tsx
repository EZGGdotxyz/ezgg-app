/*
 * @Date: 2025-03-05 10:00:00
 * @LastEditors: yosan
 * @LastEditTime: 2025-03-18 13:40:07
 * @FilePath: /ezgg-app/packages/app/pages/home/history/detail/components/CancelPayLinkPopup/index.tsx
 */
import {AppImage, Button, ScrollView, SizableText, useToastController, XStack, YStack} from '@my/ui';
import AppModal from 'app/Components/AppModal';
import {formatTokenAmount, isIphoneX} from 'app/utils';
import {useTranslation} from 'react-i18next';
import React, {useEffect, useState} from 'react';
import {PrimaryColor} from 'app/config';
import AppButton from 'app/Components/AppButton';
import {postTransactionHistoryDeclineTransactionHistory} from 'app/servers/api/transactionHistory';
import useRequest from 'app/hooks/useRequest';
import useResponse from 'app/hooks/useResponse';
import {postTransactionPayLinkCancelPayLink} from 'app/servers/api/transactionPayLink';

interface CancelPayLinkPopupProps {
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
  orderData: any;
  setIsLoading: (value: boolean) => void;
  onSuccess: () => void;
}

const CancelPayLinkPopup: React.FC<CancelPayLinkPopupProps> = ({
  modalVisible,
  setModalVisible,
  orderData,
  setIsLoading,
  onSuccess,
}) => {
  const {t} = useTranslation();
  const {makeRequest} = useRequest();
  const toast = useToastController();
  const {appScale} = useResponse();

  const onSubmit = async () => {
    try {
      setModalVisible(false);
      setIsLoading(true);
      const res = await makeRequest(
        postTransactionPayLinkCancelPayLink({
          transactionCode: orderData?.transactionCode,
        }),
      );

      if (res?.code === '0') {
        toast.show(
          t(
            orderData?.transactionType === 'REQUEST_LINK'
              ? 'tips.success.cancelRequestPayLink'
              : 'tips.success.cancelPayLink',
          ),
          {
            duration: 3000,
          },
        );
        onSuccess();
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
          <SizableText ta={'center'} fontSize={'$6'} color={'#212121'} fontWeight={'700'}>
            {orderData?.transactionType === 'REQUEST_LINK' ? t('home.order.cancel2') : t('home.order.cancel')}
          </SizableText>
          <XStack h={1} w="100%" mt={appScale(24)} mb={appScale(24)} bc={'#eee'} jc={'center'} ai={'center'}></XStack>
          <SizableText pb={appScale(24)} ta={'center'} fontSize={'$6'} color={'#212121'} fontWeight={'600'}>
            {orderData?.transactionType === 'REQUEST_LINK'
              ? t('home.order.cancelTips2', {
                  amount: `${formatTokenAmount(orderData?.amount, orderData?.tokenDecimals)} ${orderData?.tokenSymbol}`,
                })
              : t('home.order.cancelTips', {
                  amount: `${formatTokenAmount(orderData?.amount, orderData?.tokenDecimals)} ${orderData?.tokenSymbol}`,
                })}
          </SizableText>
          <XStack
            flexShrink={0}
            pt={appScale(12)}
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
              color={'#212121'}
              onPress={() => {
                setModalVisible(false);
              }}
              pressStyle={{
                opacity: 0.85,
              }}
              unstyled
            >
              {t('home.order.noCancel')}
            </Button>
            <AppButton
              style={{
                width: '50%',
              }}
              onPress={() => {
                onSubmit();
              }}
            >
              {t('home.order.yesCancel')}
            </AppButton>
          </XStack>
        </YStack>
      </YStack>
    </AppModal>
  );
};

export default CancelPayLinkPopup;
