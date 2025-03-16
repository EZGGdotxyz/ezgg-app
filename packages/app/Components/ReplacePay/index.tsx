/*
 * @Date: 2025-03-05 10:00:00
 * @LastEditors: yosan
 * @LastEditTime: 2025-03-16 23:24:27
 * @FilePath: /ezgg-app/packages/app/Components/ReplacePay/index.tsx
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
import Currency from '../Currency';

interface ReplacePayProps {
  orderData: any;
  setIsLoading: (value: boolean) => void;
  replaceCurrencyData: any;
  setReplaceCurrencyData: (value: any) => void;
}

const ReplacePay: React.FC<ReplacePayProps> = ({
  orderData,
  setIsLoading,
  replaceCurrencyData,
  setReplaceCurrencyData,
}) => {
  const {t} = useTranslation();
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
    <YStack flex={1}>
      <YStack pt={appScale(24)} pl={appScale(24)} pr={appScale(24)} w="100%">
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

          {/* <XStack pb={appScale(16)} w="100%" ai="center" jc="space-between" bbw={1} bbc={'#eeeeee'}>
            <SizableText h={appScale(26)} lh={appScale(26)} fontSize={'$4'} color={'#616161'} fontWeight={'500'}>
              {t('home.order.networkFee')}
            </SizableText>
            <XStack ai={'center'} jc={'center'}>
              <SizableText h={appScale(26)} lh={appScale(26)} fontSize={'$4'} color={'#424242'} fontWeight={'600'}>
                {`${formatTokenAmount(orderData?.networkFee, currencyData?.token?.tokenDecimals)} ${
                  currencyData?.token?.tokenSymbol || ''
                }`}
              </SizableText>
            </XStack>
          </XStack> */}
        </YStack>
        <SizableText mb={appScale(20)} ta={'center'} fontSize={'$4'} color={'#212121'} fontWeight={'500'}>
          {t('home.paylink.replacePay.tips', {token: orderData?.tokenSymbol})}
        </SizableText>

        <Currency
          setIsLoading={setIsLoading}
          currencyData={replaceCurrencyData}
          setCurrencyData={setReplaceCurrencyData}
        />
      </YStack>
    </YStack>
  );
};

export default ReplacePay;
