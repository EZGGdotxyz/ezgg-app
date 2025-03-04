/*
 * @Date: 2023-12-18 14:37:38
 * @LastEditors: yosan
 * @LastEditTime: 2025-03-04 10:44:13
 * @FilePath: /ezgg-app/packages/app/pages/home/withdraw/index.tsx
 */
import {
  AppHeader,
  AppHeaderProps,
  HeaderBackButton,
  Paragraph,
  XStack,
  YStack,
  SizableText,
  AppImage,
  useToastController,
} from '@my/ui';
import React from 'react';
import {useTranslation} from 'react-i18next';
import PermissionPage from 'app/Components/PermissionPage';
import Keyboard from 'app/Components/Keyboard';
import AppButton from 'app/Components/AppButton';
import {StyleSheet} from 'react-native';
import {appScale, convertAmountToTokenDecimals} from 'app/utils';
import AppHeader2 from 'app/Components/AppHeader2';
import {useRouter} from 'solito/router';
import Currency from 'app/Components/Currency';
import PageLoading from 'app/Components/PageLoading';
import AppLoading from 'app/Components/AppLoading';
import {useWallets} from '@privy-io/react-auth';
import TokenTransferContract from 'app/abi/TokenTransfer.json';
import {encodeFunctionData, erc721Abi, erc20Abi, createPublicClient, http, getAddress} from 'viem';
import {useSmartWallets} from '@privy-io/react-auth/smart-wallets';
import {useRematchModel} from 'app/store/model';
import {postTransactionHistoryCreateTransactionHistory, postTransactionHistoryUpdateTransactionHash} from 'app/servers/api/transactionHistory';
import {postTransactionPayLinkUpdateTransactionHash} from 'app/servers/api/transactionPayLink';
import useRequest from 'app/hooks/useRequest';

// 提取
const WithdrawScreen = () => {
  const {t} = useTranslation();
  const [inputValue, setInputValue] = React.useState('');
  const [showKeyboard, setShowKeyboard] = React.useState(false);
  const [{userInfo}] = useRematchModel('user');
  const {makeRequest} = useRequest();

  const [isLoading, setIsLoading] = React.useState(false);
  const [buttonLoading, setButtonLoading] = React.useState(false);
  const {back, push} = useRouter();
  const toast = useToastController();
  const [currencyData, setCurrencyData] = React.useState<any>();
  const {getClientForChain} = useSmartWallets();

  const {wallets} = useWallets();

  const submit = async () => {
    if (!inputValue || inputValue === '0') {
      toast.show(t('home.send.amountToSend.tips'));
      return;
    }

    if (Number(inputValue) > Number(currencyData?.tokenAmount)) {
      toast.show(t('home.withdraw.tips'));
      return;
    }

    const wallet = wallets?.[0];

    console.log('🚀 ~ submit ~ wallet:', wallet);

    onTransfer(Number(currencyData?.token?.chainId), inputValue, '0xDCBE0c047D539c6a077161c59239Bff20540fa92');
    // const {wallets} = useWallets();

    // const wallet = wallets?.[0];

    // const provider = await wallet.getEthereumProvider();

    // console.log('🚀 ~ submit ~ provider:', provider);

    // if (!provider) {
    //   toast.show(t('home.withdraw.tips'));
    //   return;
    // }

    // const transactionRequest = {
    //   to: '0xTheContractAddress',
    //   data: data,
    //   value: 100000, // Only necessary for payable methods
    // };
    // const transactionHash = await provider.request({
    //   method: 'eth_sendTransaction',
    //   params: [transactionRequest],
    // });

    // console.log('🚀 ~ submit ~ transactionHash:', transactionHash);

    // setButtonLoading(true);
    // setTimeout(() => {
    //   setButtonLoading(false);
    //   push('/home/success?type=withdraw');
    // }, 2000);
    console.log('🚀 ~ WithdrawScreen ~ inputValue:', inputValue);
  };

  const onTransfer = async (chainId: number, amount: string, receiverAddress: string) => {
    try {
      const _amount = Number(
        convertAmountToTokenDecimals(amount, 6), // USDT 通常使用 6 位小数
      );

      const params: any = {
        platform: currencyData?.token?.platform,
        chainId: Number(currencyData?.token?.chainId),
        tokenContractAddress: currencyData?.token?.address,
        amount: _amount,
        message: inputValue,
        transactionCategory: 'WITHDRAW',
        transactionType: 'WITHDRAW',
        senderMemberId: userInfo?.customMetadata?.id,
      };

      setIsLoading(true);
      const transaction = await makeRequest(postTransactionHistoryCreateTransactionHistory(params));

      if (transaction?.data?.id) {
        const tokenContractAddress = transaction?.data?.tokenContractAddress!;
        const baseClient = await getClientForChain({
          id: Number(chainId),
        });
        if (!baseClient) {
          setIsLoading(false);
          toast.show(t('tips.error.networkError'), {
            duration: 3000,
          });
          return;
        }

        // 创建交易请求
        const transactionRequest = {
          calls: [
            {
              // 调用 USDT 代币的 approve 方法，授权给业务合约
              to: tokenContractAddress as `0x${string}`,
              data: encodeFunctionData({
                abi: erc20Abi,
                functionName: 'approve',
                args: [receiverAddress as `0x${string}`, BigInt(_amount)],
              }),
            },
            {
              // 调用 USDT 代币的 transfer 方法，将代币转给接收方
              to: tokenContractAddress as `0x${string}`,
              data: encodeFunctionData({
                abi: erc20Abi,
                functionName: 'transfer',
                args: [receiverAddress as `0x${string}`, BigInt(_amount)],
              }),
            },
          ],
        };

        const uiOptions = {
          title: t('home.withdraw.confirmTitle'),
          description: t('home.withdraw.confirmDescription', {
            amount: amount,
            token: currencyData?.token?.tokenSymbol,
            receiver: receiverAddress,
          }),
          buttonText: t('home.withdraw.confirmButton'),
        };

        const transactionHash = await baseClient.sendTransaction(transactionRequest, {uiOptions});
        if (transaction?.data?.transactionCode && transactionHash) {
          // 更新交易记录的交易哈希字段
          const res: any = await makeRequest(
            postTransactionHistoryUpdateTransactionHash({
              id: transaction?.data?.id,
              transactionCode: transaction?.data?.transactionCode,
              transactionHash,
            }),
          );
          if (res?.data) {
            setIsLoading(false);
            push('/home/success?type=withdraw&id=' + transaction?.data?.id);
          } else {
            setIsLoading(false);
            // setOrderData(transaction?.data);
            // setIsSuccess(true);
            // toast.show(t('tips.error.networkError'), {
            //   duration: 3000,
            //   // message: 'Just showing how toast works...',
            // });
          }
        }
      }
    } catch (error) {
      console.error('Transaction error:', error);
      setIsLoading(false);
      toast.show(t('tips.error.transactionFailed'), {
        duration: 3000,
      });
    }
  };

  const handlePagePress = () => {
    setShowKeyboard(false);
  };

  const handleInputPress = (e: any) => {
    e.stopPropagation();
    setShowKeyboard(true);
  };

  return (
    <PermissionPage>
      <AppHeader2 title={t('screen.home.withdraw')} fallbackUrl="/" />
      <YStack pl={appScale(24)} pr={appScale(24)} onPress={handlePagePress}>
        <Currency setIsLoading={setIsLoading} currencyData={currencyData} setCurrencyData={setCurrencyData} />
        <YStack w="100%" mb={appScale(24)}>
          <XStack mb={appScale(8)} w="100%">
            <SizableText h={appScale(30)} lh={appScale(30)} fontSize={'$5'} color={'#212121'} fontWeight={'600'}>
              {t('home.send.amountToSend')}
            </SizableText>
          </XStack>
          <XStack w="100%" p={appScale(16)} bc={'#FAFAFA'} br={appScale(8)} onPress={handleInputPress}>
            <SizableText
              fontSize={'$10'}
              h={appScale(50)}
              lh={appScale(50)}
              color={'#212121'}
              fontWeight={'600'}
              pos="relative"
            >
              {inputValue || '0'}
              {showKeyboard && (
                <XStack
                  pos="absolute"
                  right={-4}
                  top={0}
                  bottom={0}
                  w={2}
                  animation="quick"
                  bc="#212121"
                  style={{
                    animationName: 'cursorBlink',
                    animationDuration: '1s',
                    animationIterationCount: 'infinite',
                    animationTimingFunction: 'steps(2, start)',
                  }}
                />
              )}
            </SizableText>
          </XStack>
        </YStack>
        <XStack mb={appScale(24)} w="100%" ai={'center'} jc={'center'}>
          <SizableText h={appScale(24)} lh={appScale(24)} fontSize={'$4'} color={'#212121'} fontWeight={'500'}>{`${t(
            'home.balance',
          )}: ${currencyData?.tokenAmount} ${currencyData?.token?.tokenSymbol} (${
            currencyData?.token?.chainName
          })`}</SizableText>
        </XStack>

        <XStack mb={appScale(34)} w="100%" ai={'center'} jc={'center'}>
          <AppButton isLoading={buttonLoading} onPress={submit}>
            {t('home.withdraw')}
          </AppButton>
        </XStack>
      </YStack>
      {showKeyboard && <Keyboard onChange={setInputValue} value={inputValue} />}
      {isLoading && <AppLoading />}
    </PermissionPage>
  );
};
export default WithdrawScreen;
