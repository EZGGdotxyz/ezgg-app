/*
 * @Date: 2023-12-08 16:25:15
 * @LastEditors: yosan
 * @LastEditTime: 2025-03-18 17:12:17
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

export type CurrencyProps = {
  currencyData: any;
  setCurrencyData: (currency: any) => void;
  isConnected: boolean;
};

// 交易历史item
const Currency = React.forwardRef<HTMLDivElement, CurrencyProps>(
  ({currencyData, setCurrencyData, isConnected}: CurrencyProps, ref) => {
    const {push} = useRouter();
    const {appScale} = useResponse();
    const {t} = useTranslation();
    const [modalVisible, setModalVisible] = useState(false);
    const [currencyList, setCurrencyList] = useState<any>([
      {
        chainName: 'Base',
        chainIcon: 'Base',
        token: {
          platform: 'ETH',
          network: 'MAIN',
          erc: 'ERC20',
          id: 6,
          createBy: 0,
          updateBy: 0,
          createAt: '2025-03-03T02:19:34.362Z',
          updateAt: '2025-03-03T02:19:34.362Z',
          address: '0x4200000000000000000000000000000000000006',
          chainId: 8453,
          tokenName: 'Wrapped Ether',
          tokenSymbol: 'WETH',
          tokenDecimals: 18,
          logo: null,
          show: true,
          sort: 0,
          priceCurrency: 'usd',
          priceValue: '2438.3262341117',
          priceUpdateAt: '2025-03-03T02:19:31.000Z',
          priceAutoUpdate: false,
          feeSupport: true,
        },
        currency: 'CNY',
        currencyAmount: '0',
        tokenAmount: '0',
        inWallet: true,
      },
      {
        chainName: 'Base',
        chainIcon: 'Base',
        token: {
          platform: 'ETH',
          network: 'MAIN',
          erc: 'ERC20',
          id: 7,
          createBy: 0,
          updateBy: 0,
          createAt: '2025-03-03T02:19:34.789Z',
          updateAt: '2025-03-03T02:19:34.789Z',
          address: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
          chainId: 8453,
          tokenName: 'USD Coin',
          tokenSymbol: 'USDC',
          tokenDecimals: 6,
          logo: null,
          show: true,
          sort: 0,
          priceCurrency: 'usd',
          priceValue: '0.9998782643',
          priceUpdateAt: '2025-03-03T02:18:41.000Z',
          priceAutoUpdate: false,
          feeSupport: true,
        },
        currency: 'CNY',
        currencyAmount: '0.04008874677417857468',
        tokenAmount: '0.005543',
        inWallet: true,
      },
    ]);

    const selectCurrency = (item: any) => {
      setCurrencyData(item);
      setModalVisible(false);
    };

    return (
      <>
        <YStack w="100%" mb={appScale(24)} onPress={() => setModalVisible(true)}>
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
            <XStack h={appScale(50)}>
              <XStack flexShrink={0} pos={'relative'} w={appScale(72)}>
                {currencyData?.token?.tokenSymbol ? (
                  <TokenIcon symbol={currencyData?.token?.tokenSymbol} variant="background" size={appScale(48)} />
                ) : (
                  <AppImage
                    width={appScale(48)}
                    height={appScale(48)}
                    src={require(`app/assets/images/df_token.png`)}
                    type="local"
                  />
                )}
              </XStack>

              {currencyData?.token?.tokenSymbol && (
                <SizableText
                  fontSize={'$7'}
                  h={appScale(50)}
                  lh={appScale(50)}
                  color={'#212121'}
                  fontWeight={'600'}
                  pos="relative"
                >
                  {`${currencyData?.token?.tokenSymbol} (${currencyData?.chainName})`}
                </SizableText>
              )}
            </XStack>
            <ChevronRight size="$2" color={'#212121'} />
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
