/*
 * @Date: 2025-03-05 10:00:00
 * @LastEditors: yosan
 * @LastEditTime: 2025-03-16 23:11:06
 * @FilePath: /ezgg-app/packages/app/pages/home/history/detail/components/AcceptRequestPopup/index.tsx
 */
import {AppImage, Button, Text, XStack, SizableText, useToastController, YStack} from '@my/ui';
import {Airplay, AlignJustify} from '@tamagui/lucide-icons';
import {useRematchModel} from 'app/store/model';
import {Platform} from 'react-native';
import {Link} from 'solito/link';
import {useRouter} from 'solito/router';
import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {AppName, PrimaryColor} from 'app/config';
import AppButton from 'app/Components/AppButton';
import TokenLinkContract from 'app/abi/TokenLink.json';
import {useSmartWallets} from '@privy-io/react-auth/smart-wallets';
import useRequest from 'app/hooks/useRequest';
import {encodeFunctionData, erc721Abi, erc20Abi, createPublicClient, http, getAddress} from 'viem';
import TokenTransferContract from 'app/abi/TokenTransfer.json';
import {
  postTransactionHistoryUpdateNetworkFee,
  postTransactionHistoryUpdateTransactionHash,
} from 'app/servers/api/transactionHistory';
import AppModal from 'app/Components/AppModal';
import useResponse from 'app/hooks/useResponse';
import {formatTokenAmount, isIphoneX} from 'app/utils';
import {getBalanceFindBalance} from 'app/servers/api/balance';
import {useTransaction} from 'app/hooks/useTransaction';

interface AcceptRequestPopupProps {
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
  orderData: any;
  setIsLoading: (isLoading: boolean) => void;
  onSuccess: () => void;
}

const AcceptRequestPopup: React.FC<AcceptRequestPopupProps> = ({
  modalVisible,
  setModalVisible,
  orderData,
  setIsLoading,
  onSuccess,
}) => {
  const {t} = useTranslation();
  const {appScale} = useResponse();
  const {back, replace, push} = useRouter();

  const {getClientForChain} = useSmartWallets();
  const {makeRequest} = useRequest();
  const toast = useToastController();
  const {onSendPayLinkSubmit, onSendContract} = useTransaction();

  const onAcceptRequest = async () => {
    try {
      setModalVisible(false);
      if (!orderData?.tokenFeeSupport) {
        return replace('/home/replace?id=' + orderData?.id);
      }
      setIsLoading(true);

      const feeData = await makeRequest(
        postTransactionHistoryUpdateNetworkFee({
          transactionCode: orderData.transactionCode,
          tokenContractAddress: orderData.tokenContractAddress!,
        }),
      );
      if (!feeData?.data?.id) {
        throw new Error('Failed to create pay link');
      }

      const res: any = await makeRequest(
        getBalanceFindBalance({
          platform: orderData?.platform,
          chainId: orderData?.chainId,
          address: orderData?.tokenContractAddress,
          currency: String(orderData?.currency || 'usd').toLowerCase(),
        }),
      );

      if (res?.data?.tokenAmount) {
        // 考虑代币精度，将小数转换为整数
        const tokenAmountStr = String(res?.data?.tokenAmount);
        const [integerPart = '0', decimalPart = ''] = tokenAmountStr.split('.');
        const decimals = orderData?.tokenDecimals || 18;

        // 补齐精度位数
        const paddedDecimal = decimalPart.padEnd(decimals, '0');
        const fullIntegerAmount = integerPart + paddedDecimal;

        // 转换为 BigInt
        const tokenAmount = BigInt(fullIntegerAmount);

        console.log('🚀 ~ onAcceptRequest ~ tokenAmount:', tokenAmount);

        if (tokenAmount < BigInt(orderData?.amount)) {
          throw new Error('insufficient balance');
        }
      }

      await onSendContract(
        {
          ...orderData,
          networkFee: feeData?.data,
        },
        (data) => {
          console.log('🚀 ~ onAcceptRequest ~ data:', data);

          setIsLoading(false);
          toast.show(t('tips.success.acceptRequest'), {
            duration: 3000,
          });
          onSuccess();
          // dispatch.user.updateState({payLinkData: {}});
        },
      );

      // await handleTransactionSuccess(transactionHash);
      // onSuccess();
    } catch (error) {
      console.error('Send transaction error:', error);
      if (error?.message.includes('The user rejected the request')) {
        toast.show(t('tips.error.userRejected'), {
          duration: 3000,
        });
      } else if (error?.message.includes('insufficient allowance')) {
        toast.show(t('tips.error.insufficientAllowance'), {
          duration: 3000,
        });
      } else if (error?.message.includes('insufficient balance')) {
        toast.show(t('tips.error.insufficientBalance'), {
          duration: 3000,
        });
      } else {
        toast.show(t('tips.error.networkError'), {
          duration: 3000,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  // const handleTransactionSuccess = async (transactionHash?: string) => {
  //   if (orderData?.transactionCode && transactionHash) {
  //     const res: any = await makeRequest(
  //       postTransactionHistoryUpdateTransactionHash({
  //         id: orderData?.id,
  //         transactionHash,
  //       }),
  //     );
  //     if (res?.data) {
  //       setIsLoading(false);
  //       toast.show(t('tips.success.acceptRequest'), {
  //         duration: 3000,
  //       });
  //     }
  //   }
  // };

  const onSubmit = () => {
    setModalVisible(false);
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
            {t('home.order.acceptRequest')}
          </SizableText>
          <XStack h={1} w="100%" mt={appScale(24)} mb={appScale(24)} bc={'#eee'} jc={'center'} ai={'center'}></XStack>

          <YStack
            bc="#FAFAFA"
            borderRadius={8}
            paddingHorizontal={appScale(8)}
            paddingVertical={appScale(16)}
            gap={appScale(6)}
            mb={appScale(16)}
          >
            <SizableText ta={'center'} fontSize={'$4'} color={'#757575'} fontWeight={'500'}>
              {t('home.order.amountRequested2')}
            </SizableText>
            <SizableText ta={'center'} fontSize={'$8'} color={'#212121'} fontWeight={'600'}>
              {`${formatTokenAmount(orderData?.amount, orderData?.tokenDecimals)} ${orderData?.tokenSymbol}`}
            </SizableText>

            <SizableText ta={'center'} fontSize={'$1'} color={'#757575'} fontWeight={'500'}>
              {t('home.order.amountReceivedTips')}
            </SizableText>
          </YStack>
          <XStack></XStack>
          <XStack pb={appScale(16)} ai="center">
            <SizableText fontSize={'$3'} color={'#9E9E9E'} mr={'$4'}>
              {t('home.order.sendTo')}
            </SizableText>
            <XStack h={2} flex={1} bc={'rgba(238, 238, 238, 1)'}></XStack>
          </XStack>
          <SizableText pb={appScale(16)} fontSize={'$4'} color={'#212121'} fontWeight={'600'}>
            {`@${orderData?.senderMember?.nickname || ''}`}
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
              onPress={() => {
                setModalVisible(false);
              }}
              pressStyle={{
                opacity: 0.85,
              }}
              unstyled
            >
              {t('operate.button.cancel')}
            </Button>
            <AppButton
              style={{
                width: '50%',
              }}
              onPress={() => {
                onAcceptRequest();
              }}
            >
              {t('home.paylink.sendCrypto')}
            </AppButton>
          </XStack>
        </YStack>
      </YStack>
    </AppModal>
  );
};

export default AcceptRequestPopup;
