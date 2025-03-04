/*
 * @Date: 2023-12-08 16:25:15
 * @LastEditors: yosan
 * @LastEditTime: 2025-03-04 17:22:18
 * @FilePath: /ezgg-app/packages/app/pages/home/history/detail/components/Footer/index.tsx
 */
import {AppImage, Button, Text, XStack, SizableText, useToastController} from '@my/ui';
import {Airplay, AlignJustify} from '@tamagui/lucide-icons';
import {useRematchModel} from 'app/store/model';
import {Platform} from 'react-native';
import {Link} from 'solito/link';
import {useRouter} from 'solito/router';
import {useState} from 'react';
import {appScale, isIphoneX} from 'app/utils';
import {useTranslation} from 'react-i18next';
import {AppName, PrimaryColor} from 'app/config';
import AppButton from 'app/Components/AppButton';
import TokenLinkContract from 'app/abi/TokenLink.json';
import {useSmartWallets} from '@privy-io/react-auth/smart-wallets';
import useRequest from 'app/hooks/useRequest';
import {encodeFunctionData, erc721Abi, erc20Abi, createPublicClient, http, getAddress} from 'viem';
import TokenTransferContract from 'app/abi/TokenTransfer.json';
import {postTransactionHistoryUpdateTransactionHash} from 'app/servers/api/transactionHistory';

export type FooterProps = {
  orderData: any;
  setIsLoading: (isLoading: boolean) => void;
};
//  头部
const Footer: React.FC<any> = ({orderData, setIsLoading}: FooterProps) => {
  const {back, push} = useRouter();
  const [{unread}] = useRematchModel('app');
  const [statusBarHeight, setStatusBarHeight] = useState(46);
  const {t, i18n} = useTranslation();
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

      console.log('🚀 ~ onAcceptRequest ~ amount:', amount);


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

  return (
    <XStack
      flexShrink={0}
      pl={appScale(24)}
      pr={appScale(24)}
      pt={12}
      pb={appScale(isIphoneX() ? 46 : 12)}
      w="100%"
      ai={'center'}
      jc={'center'}
      space="$3"
      borderTopWidth={1}
      borderColor={'#F2F2F2'}
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
          // if (isSuccess) {
          //   replace(`/home/history/${orderData?.id}`);
          //   window.history.replaceState(null, '', window.location.href); // 可选：直接覆盖当前历史
          // } else {
          //   back();
          // }
        }}
        // disabled={isLoading}
        pressStyle={{
          opacity: 0.85,
        }}
        unstyled
      >
        {t('home.order.decline')}
      </Button>
      <AppButton
        style={{
          width: '50%',
        }}
        onPress={() => {
          onAcceptRequest();
          // if (isSuccess) {
          //   onCopy(`${ExternalLinkData.webPageHome}/home/take/${orderData?.transactionCode}`);
          // } else {
          //   type === 'send' ? onSendSubmit() : onRequestSubmit();
          // }
        }}
      >
        {t('home.order.acceptRequest')}
      </AppButton>
    </XStack>
  );
};

export default Footer;
