/*
 * @Date: 2023-12-18 14:37:38
 * @LastEditors: yosan
 * @LastEditTime: 2025-03-16 22:15:00
 * @FilePath: /ezgg-app/packages/app/pages/home/pay/replace/index.tsx
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
  ScrollView,
} from '@my/ui';
import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import PermissionPage from 'app/Components/PermissionPage';
import Keyboard from 'app/Components/Keyboard';
import AppButton from 'app/Components/AppButton';
import {StyleSheet} from 'react-native';
import {convertAmountToTokenDecimals, formatNumber, getUserSubName, isIphoneX} from 'app/utils';
import AppHeader2 from 'app/Components/AppHeader2';
import {useRouter} from 'solito/router';
import Currency from 'app/Components/Currency';
import PageLoading from 'app/Components/PageLoading';
import {ChevronDown, ChevronRight} from '@tamagui/lucide-icons';
import {createParam} from 'solito';
import {ExternalLinkData, PrimaryColor} from 'app/config';
import SuccessInfo from 'app/Components/SuccessInfo';
import useRequest from 'app/hooks/useRequest';
import {useDispatch} from 'react-redux';
import {Dispatch} from 'app/store';
import {useRematchModel} from 'app/store/model';
import AppLoading from 'app/Components/AppLoading';
import TokenLinkContract from 'app/abi/TokenLink.json';
import {useTransaction} from 'app/hooks/useTransaction';
import useResponse from 'app/hooks/useResponse';
import PayPopup from 'app/Components/PayPopup';
import ReplacePay from 'app/Components/ReplacePay';
import {
  getTransactionHistoryFindTransactionHistoryId,
  postTransactionHistoryUpdateNetworkFee,
} from 'app/servers/api/transactionHistory';

const {useParams} = createParam<any>();

// 存款
const ReplaceScreen = ({type}: any) => {
  const {t} = useTranslation();
  const {makeRequest} = useRequest();
  const dispatch = useDispatch<Dispatch>();
  const [{payLinkData, userInfo}] = useRematchModel('user');
  const {appScale} = useResponse();

  const [inputValue, setInputValue] = React.useState('');
  const {params} = useParams();
  const [isLoading, setIsLoading] = React.useState(false);
  const [buttonLoading, setButtonLoading] = React.useState(false);
  const toast = useToastController();

  const [orderData, setOrderData] = React.useState<any>();

  const {back, replace, push} = useRouter();
  const {onSendSubmit, onRequestSubmit, createTransaction} = useTransaction();
  const [replaceCurrencyData, setReplaceCurrencyData] = React.useState<any>();


  const _onSendContract = async () => {
    try {
      setIsLoading(true);
      const feeData = await makeRequest(
        postTransactionHistoryUpdateNetworkFee({
          transactionCode: orderData.transactionCode,
          tokenContractAddress: replaceCurrencyData?.token?.address,
        }),
      );
      if (!feeData?.data?.id) {
        throw new Error('Failed to create pay link');
      }
      await onSendSubmit(
        {
          ...orderData,
          networkFee: feeData?.data,
        },
        (data) => {
          setIsLoading(false);
          replace(`/home/success?type=${data?.transactionType}&id=${data?.id}`);
          setTimeout(() => {
            dispatch.user.updateState({payLinkData: {}});
          });
        },
      );
    } catch (error) {
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

  return (
    <PermissionPage>
      <AppHeader2
        isClosure
        onBack={() => {
          replace('/');
          dispatch.user.updateState({payLinkData: {}});
        }}
        title={t('home.paylink.approveTransaction')}
        fallbackUrl="/"
      />
      <ScrollView
        flex={1}
        w={'100%'}
        bc="#fff"
        contentContainerStyle={{
          minHeight: '100%',
        }}
      >
        <ReplacePay
          replaceCurrencyData={replaceCurrencyData}
          setReplaceCurrencyData={setReplaceCurrencyData}
          setIsLoading={setIsLoading}
          orderData={orderData}
        />
      </ScrollView>

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
            // back();
            replace('/');
            dispatch.user.updateState({payLinkData: {}});
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
            _onSendContract();
          }}
        >
          {type === 'send' ? t('home.paylink.sendCrypto') : t('home.request.requestCrypto')}
        </AppButton>
      </XStack>

      {isLoading && <AppLoading />}
    </PermissionPage>
  );
};
export default ReplaceScreen;
