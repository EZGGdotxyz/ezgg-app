/*
 * @Date: 2025-03-05 10:00:00
 * @LastEditors: yosan
 * @LastEditTime: 2025-03-16 21:59:02
 * @FilePath: /ezgg-app/packages/app/Components/PayPopup/index.tsx
 */
import {AppImage, Button, ScrollView, SizableText, useToastController, XStack, YStack} from '@my/ui';
import AppModal from 'app/Components/AppModal';
import {formatTokenAmount, isIphoneX, truncateAddress} from 'app/utils';
import {useTranslation} from 'react-i18next';
import React, {useEffect, useState} from 'react';
import {PrimaryColor} from 'app/config';
import AppButton from 'app/Components/AppButton';
import useRequest from 'app/hooks/useRequest';
import useResponse from 'app/hooks/useResponse';
import {useRematchModel} from 'app/store/model';
import {getChainInfo} from 'app/utils/chain';
import { createNetworkFeeDisplay } from 'app/utils/transactionInfo';

interface PayPopupProps {
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
  orderData: any;
  onSubmit: () => void;
}

const PayPopup: React.FC<PayPopupProps> = ({modalVisible, setModalVisible, orderData, onSubmit}) => {
  const {t} = useTranslation();
  const {makeRequest} = useRequest();
  const toast = useToastController();
  const {appScale} = useResponse();
  const [{userInfo, isLogin}] = useRematchModel('user');
  const [sideName, setSideName] = useState<string>('');

  useEffect(() => {
    if (orderData?.id) {
      const isReceiver = orderData?.receiverMember?.id === userInfo?.customMetadata?.id;
      const isRequest = orderData?.transactionCategory === 'REQUEST';

      let sideName: any = '';
      if (isRequest) {
        if (isReceiver) {
          sideName = orderData?.senderMember?.nickname;
        } else {
          sideName = orderData?.receiverMember?.nickname;
        }
      } else {
        if (isReceiver) {
          sideName = orderData?.senderMember?.nickname;
        } else {
          sideName = orderData?.receiverMember?.nickname;
        }
      }
      setSideName(sideName);
    }
  }, [orderData]);

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
            {t('home.paylink.approveTransaction')}
          </SizableText>
          <XStack h={1} w="100%" mt={appScale(24)} mb={appScale(24)} bc={'#eee'} jc={'center'} ai={'center'}></XStack>

          <YStack
            mt={appScale(20)}
            bc={'#FAFAFA'}
            borderRadius={appScale(8)}
            p={appScale(16)}
            bw={1}
            borderColor={'#EEEEEE'}
            mb={appScale(20)}
          >
            <XStack pb={appScale(16)} w="100%" ai="center" jc="space-between" bbw={1} bbc={'$background'}>
              <SizableText h={appScale(26)} lh={appScale(26)} fontSize={'$4'} color={'#616161'} fontWeight={'500'}>
                {t('home.paylink.amount')}
              </SizableText>
              <XStack ai={'center'} jc={'center'}>
                <SizableText h={appScale(26)} lh={appScale(26)} fontSize={'$4'} color={'#424242'} fontWeight={'600'}>
                  {`${formatTokenAmount(orderData?.amount, orderData?.tokenDecimals)} ${orderData?.tokenSymbol || ''}`}
                </SizableText>
              </XStack>
            </XStack>

            <XStack pb={appScale(16)} w="100%" ai="center" jc="space-between" bbw={1} bbc={'$background'}>
              <SizableText h={appScale(26)} lh={appScale(26)} fontSize={'$4'} color={'#616161'} fontWeight={'500'}>
                {orderData?.transactionType === 'PAY_LINK' ? t('home.order.from') : t('home.order.to')}
              </SizableText>
              <XStack ai={'center'} jc={'center'}>
                <SizableText h={appScale(26)} lh={appScale(26)} fontSize={'$4'} color={'#424242'} fontWeight={'600'}>
                  {orderData?.transactionType === 'PAY_LINK'
                    ? `${orderData?.senderMember?.nickname || ''}`
                    : orderData?.receiverAddress
                    ? truncateAddress(orderData?.receiverAddress)
                    : `${sideName || ''}`}
                </SizableText>
              </XStack>
            </XStack>

            <XStack pb={appScale(16)} w="100%" ai="center" jc="space-between" bbw={1} bbc={'$background'}>
              <SizableText h={appScale(26)} lh={appScale(26)} fontSize={'$4'} color={'#616161'} fontWeight={'500'}>
                {t('home.paylink.network')}
              </SizableText>
              <XStack ai={'center'} jc={'center'}>
                <SizableText h={appScale(26)} lh={appScale(26)} fontSize={'$4'} color={'#424242'} fontWeight={'600'}>
                  {`${getChainInfo(orderData?.chainId)?.name}` || '-'}
                </SizableText>
              </XStack>
            </XStack>

            <XStack pb={appScale(16)} w="100%" ai="center" jc="space-between" bbw={1} bbc={'#eeeeee'}>
              <SizableText h={appScale(26)} lh={appScale(26)} fontSize={'$4'} color={'#616161'} fontWeight={'500'}>
                {t('home.order.networkFee')}
              </SizableText>
              <XStack ai={'center'} jc={'center'}>
                <SizableText h={appScale(26)} lh={appScale(26)} fontSize={'$4'} color={'#424242'} fontWeight={'600'}>
                  {createNetworkFeeDisplay(orderData)}
                </SizableText>
              </XStack>
            </XStack>
          </YStack>

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
              onPress={() => {
                setModalVisible(false);
              }}
              pressStyle={{
                opacity: 0.85,
              }}
              unstyled
            >
              {t('home.paylink.reject')}
            </Button>
            <AppButton
              style={{
                width: '50%',
              }}
              onPress={() => {
                setModalVisible(false);
                onSubmit();
              }}
            >
              {t('home.paylink.approve')}
            </AppButton>
          </XStack>
        </YStack>
      </YStack>
    </AppModal>
  );
};

export default PayPopup;
