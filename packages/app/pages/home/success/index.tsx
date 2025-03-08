/*
 * @Date: 2023-12-18 14:37:38
 * @LastEditors: yosan
 * @LastEditTime: 2025-03-08 14:25:14
 * @FilePath: /ezgg-app/packages/app/pages/home/success/index.tsx
 */
import {
  AppHeader,
  AppHeaderProps,
  AppImage,
  Button,
  HeaderBackButton,
  Paragraph,
  ScrollView,
  SizableText,
  Text,
  useToastController,
  Windowing,
  XStack,
  YStack,
} from '@my/ui';
import {useRematchModel} from 'app/store/model';
import {setLanguage} from 'app/utils/auth';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useRouter} from 'solito/router';
export const ESTIMATED_ITEM_SIZE = 90;
import {ComponentProps} from 'react';
import {ActivityIndicator, Platform} from 'react-native';
import {Link} from 'solito/link';
import PermissionPage from 'app/Components/PermissionPage';
import useUser from 'app/hooks/useUser';
import {useDispatch} from 'react-redux';
import {Dispatch} from 'app/store';
import useRequest from 'app/hooks/useRequest';
import Header from './components/Header';
import SuccessInfo from 'app/components/SuccessInfo';
import {appScale, isIphoneX} from 'app/utils';
import {createParam} from 'solito';
import {getTransactionHistoryFindTransactionHistoryId} from 'app/servers/api/transactionHistory';
import AppLoading from 'app/Components/AppLoading';
import SharePopup from 'app/Components/SharePopup';
import {ExternalLinkData, PrimaryColor} from 'app/config';
import AppButton from 'app/Components/AppButton';
// import {notificationGetUnreadCount} from 'app/servers/api/2001Xiaoxitongzhi';
const {useParams} = createParam<any>();

// 成功页面
const SuccessScreen = () => {
  const {push, replace, back, parseNextPath} = useRouter();
  const {params} = useParams();
  const [{userInfo}] = useRematchModel('user');
  const {makeRequest} = useRequest();
  const [isLoading, setIsLoading] = useState(false);
  const [orderData, setOrderData] = useState<any>({});
  const [shareVisible, setShareVisible] = useState(false);
  const {t, i18n} = useTranslation();
  const toast = useToastController();

  const _getTransactionHistoryFindTransactionHistoryId = async () => {
    setIsLoading(true);
    const res = await makeRequest(getTransactionHistoryFindTransactionHistoryId({id: params?.id}));
    if (res?.code === '0') {
      const _orderData = res?.data;

      setOrderData({
        ..._orderData,
      });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (params?.id) {
      _getTransactionHistoryFindTransactionHistoryId();
    }
  }, [params]);

  let shareUrl = `${ExternalLinkData.webPageHome}/home/history/${orderData?.id}`;

  if (orderData?.transactionCategory === 'REQUEST_LINK' || orderData?.transactionCategory === 'PAY_LINK') {
    shareUrl = `${ExternalLinkData.webPageHome}/${orderData?.transactionCategory === 'SEND' ? 'claim' : 'requesting'}/${
      orderData?.transactionCode
    }`;
  }

  const onCopy = async (text: string) => {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        // 优先使用现代 Clipboard API
        await navigator.clipboard.writeText(text);
      } else if (typeof window !== 'undefined') {
        // 降级方案：使用 textarea
        const textarea = document.createElement('textarea');
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        textarea.value = text;

        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();

        try {
          document.execCommand('copy');
        } catch (err) {
          console.error('Failed to copy text:', err);
          throw new Error('Copy failed');
        } finally {
          document.body.removeChild(textarea);
        }
      } else {
        throw new Error('Copy not supported');
      }

      toast.show(t('tips.explore.copy'), {
        duration: 3000,
      });
    } catch (error) {
      console.error('Copy error:', error);
      toast.show(t('tips.error.copyFailed'), {
        duration: 3000,
      });
    }
  };

  return (
    <PermissionPage>
      <Header />
      <YStack flex={1} jc={'space-between'}>
        <SuccessInfo type={params?.type} orderData={orderData} />

        {orderData?.transactionType === 'PAY_LINK' ||
          (orderData?.transactionType === 'REQUEST_LINK' && (
            <YStack pb={appScale(16)} pt={appScale(16)} pl={appScale(24)} pr={appScale(24)}>
              <SizableText h={appScale(30)} lh={appScale(30)} fontSize={'$4'} color={'#616161'} fontWeight={'500'}>
                {t('home.send.tips1')}
              </SizableText>
              <SizableText h={appScale(30)} lh={appScale(30)} fontSize={'$4'} color={'#616161'} fontWeight={'500'}>
                {t('home.send.tips2')}
              </SizableText>
            </YStack>
          ))}
      </YStack>
      {isLoading && <AppLoading />}
      <SharePopup
        modalVisible={shareVisible}
        setModalVisible={setShareVisible}
        shareTitle={t(`home.history.${orderData?.transactionCategory}.${orderData?.transactionType}.title`, {
          name: orderData?.receiverMember?.nickname,
        })}
        shareUrl={shareUrl}
      />
      {orderData?.transactionCategory === 'SEND' ||
        (orderData?.transactionCategory === 'REQUEST' && (
          <XStack
            flexShrink={0}
            pl={appScale(24)}
            pr={appScale(24)}
            pt={appScale(12)}
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
                if (orderData?.transactionType === 'PAY_LINK' || orderData?.transactionType === 'REQUEST_LINK') {
                  window.open(
                    `${ExternalLinkData.webPageHome}/${
                      orderData?.transactionCategory === 'SEND' ? 'claim' : 'requesting'
                    }/${orderData?.transactionCode}`,
                    '_blank',
                  );
                } else {
                  setShareVisible(true);
                }
              }}
              // disabled={isLoading}
              pressStyle={{
                opacity: 0.85,
              }}
              unstyled
            >
              {orderData?.transactionType === 'PAY_LINK' || orderData?.transactionType === 'REQUEST_LINK'
                ? t('home.send.viewLink')
                : t('home.order.done')}
            </Button>
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
                if (orderData?.transactionType === 'PAY_LINK' || orderData?.transactionType === 'REQUEST_LINK') {
                  onCopy(
                    `${ExternalLinkData.webPageHome}/${
                      orderData?.transactionCategory === 'SEND' ? 'claim' : 'requesting'
                    }/${orderData?.transactionCode}`,
                  );
                } else {
                  replace('/');
                }
              }}
              // disabled={isLoading}
              pressStyle={{
                opacity: 0.85,
              }}
              unstyled
            >
              {orderData?.transactionType === 'PAY_LINK' || orderData?.transactionType === 'REQUEST_LINK'
                ? t('home.send.copyLink')
                : t('home.order.done')}
            </Button>
          </XStack>
        ))}
    </PermissionPage>
  );
};

export default SuccessScreen;
