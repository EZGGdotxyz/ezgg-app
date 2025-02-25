/*
 * @Date: 2023-12-18 14:37:38
 * @LastEditors: yosan
 * @LastEditTime: 2025-02-25 18:20:51
 * @FilePath: /ezgg-app/packages/app/pages/home/request/payLink/index.tsx
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
  TextArea,
  Button,
  useToastController,
} from '@my/ui';
import React from 'react';
import {useTranslation} from 'react-i18next';
import PermissionPage from 'app/Components/PermissionPage';
import Keyboard from 'app/Components/Keyboard';
import AppButton from 'app/Components/AppButton';
import {StyleSheet} from 'react-native';
import {appScale, isIphoneX} from 'app/utils';
import AppHeader2 from 'app/Components/AppHeader2';
import {useRouter} from 'solito/router';
import Currency from 'app/Components/Currency';
import PageLoading from 'app/Components/PageLoading';
import {ChevronDown, ChevronRight} from '@tamagui/lucide-icons';
import {createParam} from 'solito';
import {PrimaryColor} from 'app/config';
import SuccessInfo from 'app/Components/SuccessInfo';
const {useParams} = createParam<any>();

// 存款
const PayLinkScreen = () => {
  const {t} = useTranslation();
  const [inputValue, setInputValue] = React.useState('');
  const {params} = useParams();
  const [isLoading, setIsLoading] = React.useState(false);
  const [buttonLoading, setButtonLoading] = React.useState(false);
  const toast = useToastController();

  const [isSuccess, setIsSuccess] = React.useState(false);

  const {back, push} = useRouter();

  const onSubmit = () => {
    setButtonLoading(true);
    setTimeout(() => {
      setButtonLoading(false);
      setIsSuccess(true);
    }, 2000);
    console.log('🚀 ~ DepositScreen ~ inputValue:', inputValue);
  };

  const demoOrderData = {
    amount: 100,
    fee: 1,
    token: 'USDC',
    chain: 'BSC',
    createdAt: '2024-10-21 14:35:30',
    toAddress: '123',
    txHash: '2024102114353001',
  };

  const onCopy = async (text: string) => {
    // await Clipboard.setStringAsync(text);
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    toast.show(t('tips.explore.copy'), {
      duration: 3000,
      // message: 'Just showing how toast works...',
    });
  };

  return (
    <PermissionPage>
      <AppHeader2 isClosure title={t('screen.home.paylink')} fallbackUrl="/" />
      {isSuccess ? (
        <YStack flex={1} jc={'space-between'}>
          <SuccessInfo type={'request'} orderData={demoOrderData} />

          <YStack pb={appScale(16)} pl={appScale(24)} pr={appScale(24)}>
            <SizableText h={appScale(30)} lh={appScale(30)} fontSize={'$5'} color={'##616161'} fontWeight={'600'}>
              {t('home.send.tips1')}
            </SizableText>
            <SizableText h={appScale(30)} lh={appScale(30)} fontSize={'$5'} color={'##616161'} fontWeight={'600'}>
              {t('home.send.tips2')}
            </SizableText>
          </YStack>
        </YStack>
      ) : (
        <YStack flex={1} pl={appScale(24)} pr={appScale(24)}>
          <YStack w="100%" mb={appScale(24)}>
            <XStack mb={appScale(8)} w="100%">
              <SizableText h={appScale(30)} lh={appScale(30)} fontSize={'$5'} color={'#212121'} fontWeight={'600'}>
                {t('home.paylink.recipient')}
              </SizableText>
            </XStack>

            <Button
              w="100%"
              p={appScale(16)}
              bc={'#FAFAFA'}
              br={appScale(8)}
              unstyled
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              pressStyle={{
                opacity: 0.7,
                bc: '#FAFAFA',
              }}
              onPress={() => {
                push(
                  `/home/request?userId=${params?.userId}&token=${params?.token}&chain=${params?.chain}&amount=${params?.amount}`,
                );
              }}
            >
              {params?.userId === 'anyone' ? (
                <SizableText fontSize={'$6'} color={PrimaryColor} fontWeight={'700'}>
                  {t('home.paylink.anyoneLink')}
                </SizableText>
              ) : (
                <XStack>
                  <YStack pos={'relative'} w={appScale(84)} flexShrink={0}>
                    <AppImage
                      width={appScale(60)}
                      height={appScale(60)}
                      src={require(`app/assets/images/avatar.png`)}
                      type="local"
                    />
                  </YStack>
                  <YStack gap={appScale(2)}>
                    <SizableText fontSize={'$6'} color={'#26273C'} fontWeight={'500'}>
                      @Antonie11
                    </SizableText>
                    <SizableText fontSize={'$4'} color={'#9395A4'} fontWeight={'500'}>
                      alexia.hershey@gmail.com
                    </SizableText>
                  </YStack>
                </XStack>
              )}

              <ChevronRight size="$3" color={'#212121'} />
            </Button>
          </YStack>
          <YStack w="100%" mb={appScale(24)}>
            <XStack mb={appScale(8)} w="100%">
              <SizableText h={appScale(30)} lh={appScale(30)} fontSize={'$5'} color={'#212121'} fontWeight={'600'}>
                {t('home.request.amountToRequest')}
              </SizableText>
            </XStack>
            <XStack w="100%" p={appScale(16)} bc={'#FAFAFA'} br={appScale(8)}>
              <SizableText
                fontSize={'$8'}
                h={appScale(50)}
                lh={appScale(50)}
                color={'#212121'}
                fontWeight={'600'}
                pos="relative"
              >
                {`500.00 USDC (Polygon)`}
              </SizableText>
            </XStack>
          </YStack>

          <YStack w="100%" mb={appScale(24)}>
            <XStack mb={appScale(8)} w="100%">
              <SizableText h={appScale(30)} lh={appScale(30)} fontSize={'$5'} color={'#212121'} fontWeight={'600'}>
                {t('home.paylink.addMessage')}
              </SizableText>
            </XStack>
            <TextArea
              w="100%"
              p={appScale(16)}
              bc={'#FAFAFA'}
              br={appScale(8)}
              rows={6}
              fontSize={'$5'}
              lh={appScale(30)}
              value={inputValue}
              onChangeText={setInputValue}
              borderColor={'#FAFAFA'}
              placeholder={t('home.paylink.addMessage.tips')}
            />
          </YStack>
        </YStack>
      )}

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
            if (isSuccess) {
              console.log('🚀 ~ PayLinkScreen ~ isSuccess:');
            } else {
              back();
            }
          }}
          // disabled={isLoading}
          pressStyle={{
            opacity: 0.85,
          }}
          unstyled
        >
          {isSuccess ? t('home.send.viewLink') : t('operate.button.back')}
        </Button>
        <AppButton
          style={{
            width: '50%',
          }}
          onPress={() => {
            if (isSuccess) {
              onCopy('123');
            } else {
              onSubmit();
            }
          }}
        >
          {isSuccess ? t('home.send.copyLink') : t('home.request.requestCrypto')}
        </AppButton>
      </XStack>

      {isLoading && <PageLoading />}
    </PermissionPage>
  );
};
export default PayLinkScreen;
