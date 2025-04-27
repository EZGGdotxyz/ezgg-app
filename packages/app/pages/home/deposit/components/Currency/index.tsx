/*
 * @Date: 2023-12-08 16:25:15
 * @LastEditors: yosan
 * @LastEditTime: 2025-04-27 10:03:40
 * @FilePath: /ezgg-app/packages/app/pages/home/deposit/components/Currency/index.tsx
 */
import {AppImage, Button, Text, YStack, XStack, SizableText} from '@my/ui';
import {useRematchModel} from 'app/store/model';
import {useRouter} from 'solito/router';
import {useTranslation} from 'react-i18next';
import {ChevronDown, ChevronRight} from '@tamagui/lucide-icons';
import {useEffect, useState} from 'react';
import CurrencyPopup from '../CurrencyPopup';
import {TokenIcon} from '@web3icons/react';
import React from 'react';
import useResponse from 'app/hooks/useResponse';
import useBlockchain from 'app/hooks/useBlockchain';
import {useAccount, useBalance, useToken} from 'wagmi';
import {getBalanceListBalance} from 'app/servers/api/balance';
import useRequest from 'app/hooks/useRequest';
import {ActivityIndicator} from 'react-native';
import {PrimaryColor} from 'app/config';
import TokenIconWrapper from 'app/Components/TokenIconWrapper';

export type CurrencyProps = {
  currencyData: any;
  setCurrencyData: (currency: any) => void;
  isConnected: boolean;
  selectedType: any;
  address: string;
};

// 交易历史item
const Currency = React.forwardRef<HTMLDivElement, CurrencyProps>(
  ({currencyData, setCurrencyData, isConnected, selectedType, address}: CurrencyProps, ref) => {
    const {push} = useRouter();
    const {makeRequest} = useRequest();

    const {appScale} = useResponse();
    const {t} = useTranslation();
    const [modalVisible, setModalVisible] = useState(false);
    const [currencyList, setCurrencyList] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [{currency}] = useRematchModel('app');

    const _getBalanceListBalance = async () => {
      setIsLoading(true);
      const res = await makeRequest(
        getBalanceListBalance({
          platform: selectedType?.platform,
          chainId: selectedType?.chainId,
          currency: currency,
          smartWalletAddress: address,
        }),
      );
      if (res?.data?.tokens) {
        const _tokens: any = [];
        res?.data?.tokens.forEach((item: any) => {
          if (item?.token?.tokenSymbol && item?.tokenAmount !== '0') {
            _tokens.push(item);
          }
        });
        setCurrencyList(_tokens);
        setCurrencyData(_tokens[0]);
      } else {
        setCurrencyList([]);
      }
      setIsLoading(false);
    };

    useEffect(() => {
      if (address && selectedType?.chainId) {
        _getBalanceListBalance();
      }
    }, [selectedType, address]);

    const selectCurrency = (item: any) => {
      setCurrencyData(item);
      setModalVisible(false);
    };

    return (
      <>
        <YStack w="100%" mb={appScale(12)} onPress={() => setModalVisible(true)}>
          <XStack mb={appScale(8)} w="100%">
            <SizableText h={appScale(30)} lh={appScale(30)} fontSize={'$3'} color={'#212121'} fontWeight={'500'}>
              {t('home.send.currency')}
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
            style={{
              opacity: !isConnected ? 0.6 : 1,
              pointerEvents: !isConnected ? 'none' : 'auto',
            }}
            onPress={() => {
              if (isConnected) {
                setModalVisible(true);
              }
            }}
          >
            {isLoading ? (
              <XStack ai="center" h={appScale(32)} w={'100%'} jc="center">
                <ActivityIndicator size="large" color={PrimaryColor} />
              </XStack>
            ) : (
              <>
                <XStack ai="center" space="$3">
                  <TokenIconWrapper
                    tokenAddress={currencyData?.token?.address}
                    chainId={currencyData?.token?.chainId}
                    tokenSymbol={currencyData?.token?.tokenSymbol}
                    size={32}
                  />

                  {currencyData?.token?.tokenSymbol && (
                    <SizableText
                      fontSize={'$5'}
                      h={appScale(32)}
                      lh={appScale(32)}
                      color={'#212121'}
                      fontWeight={'600'}
                      pos="relative"
                    >
                      {`${currencyData?.token?.tokenSymbol}`}
                    </SizableText>
                  )}
                </XStack>
                <ChevronRight size="$2" color={'#212121'} />
              </>
            )}
          </Button>
        </YStack>

        <CurrencyPopup
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          currencyList={currencyList}
          currencyData={currencyData}
          selectCurrency={selectCurrency}
        />
      </>
    );
  },
);

Currency.displayName = 'Currency';

export default Currency;
