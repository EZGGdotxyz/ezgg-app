/*
 * @Date: 2025-03-05 10:00:00
 * @LastEditors: yosan
 * @LastEditTime: 2025-03-05 11:30:25
 * @FilePath: /ezgg-app/packages/app/pages/home/history/detail/components/AcceptRequestPopup/index.tsx
 */
import {AppImage, Button, Text, XStack, SizableText, useToastController, YStack} from '@my/ui';
import {Airplay, AlignJustify} from '@tamagui/lucide-icons';
import {useRematchModel} from 'app/store/model';
import {Platform} from 'react-native';
import {Link} from 'solito/link';
import {useRouter} from 'solito/router';
import {useState} from 'react';
import {appScale, formatTokenAmount, isIphoneX} from 'app/utils';
import {useTranslation} from 'react-i18next';
import {AppName, PrimaryColor} from 'app/config';
import AppButton from 'app/Components/AppButton';
import TokenLinkContract from 'app/abi/TokenLink.json';
import {useSmartWallets} from '@privy-io/react-auth/smart-wallets';
import useRequest from 'app/hooks/useRequest';
import {encodeFunctionData, erc721Abi, erc20Abi, createPublicClient, http, getAddress} from 'viem';
import TokenTransferContract from 'app/abi/TokenTransfer.json';
import {postTransactionHistoryUpdateTransactionHash} from 'app/servers/api/transactionHistory';
import AppModal from 'app/Components/AppModal';

interface AcceptRequestPopupProps {
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
  orderData: any;
  setIsLoading: (isLoading: boolean) => void;
}

const AcceptRequestPopup: React.FC<AcceptRequestPopupProps> = ({
  modalVisible,
  setModalVisible,
  orderData,
  setIsLoading,
}) => {
  const {t} = useTranslation();

  const {getClientForChain} = useSmartWallets();
  const {makeRequest} = useRequest();
  const toast = useToastController();

  const onAcceptRequest = async () => {
    try {
      setIsLoading(true);
      // 代币合约地址
      const tokenContractAddress = orderData?.tokenContractAddress!;
      // 转账业务合约地址
      const bizContractAddress: any = orderData?.bizContractAddress;
      // 转账金额
      const amount = BigInt(orderData.amount);
      const baseClient = await getClientForChain({
        id: Number(orderData?.chainId),
      });

      if (!baseClient) {
        throw new Error('Failed to get client for chain');
      }

      // 使用Privy的SmartWallet发起ERC4337标准的批量打包交易
      const transactionHash = await baseClient.sendTransaction({
        calls: [
          {
            // 调用USDC代币的approve方法，授信给转账业务合约
            to: tokenContractAddress,
            data: encodeFunctionData({
              abi: erc20Abi,
              functionName: 'approve',
              args: [bizContractAddress, amount],
            }),
          },
          {
            // 调用转账业务合约的transfer方法，将代币转给接收方（并收取手续费）
            to: bizContractAddress,
            data: encodeFunctionData({
              abi: TokenTransferContract.abi,
              functionName: 'transfer',
              args: [orderData?.receiverWalletAddress!, tokenContractAddress, amount],
            }),
          },
        ],
      });
      await handleTransactionSuccess(transactionHash);
    } catch (error) {
      console.error('Send transaction error:', error);
      toast.show(t('tips.error.networkError'), {
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTransactionSuccess = async (transactionHash?: string) => {
    if (orderData?.transactionCode && transactionHash) {
      const res: any = await makeRequest(
        postTransactionHistoryUpdateTransactionHash({
          id: orderData?.id,
          transactionHash,
        }),
      );
      if (res?.data) {
        setIsLoading(false);
      }
    }
  };

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
          <SizableText ta={'center'} fontSize={'$7'} color={'#212121'} fontWeight={'700'}>
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
            <SizableText ta={'center'} fontSize={'$9'} color={'#212121'} fontWeight={'600'}>
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
          <SizableText pb={appScale(16)} fontSize={'$5'} color={'#212121'} fontWeight={'600'}>
            {`@${orderData?.senderMember?.name || ''}`}
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
                onAcceptRequest();
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

export default AcceptRequestPopup;
