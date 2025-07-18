/*
 * @Date: 2023-12-08 16:25:15
 * @LastEditors: yosan
 * @LastEditTime: 2025-03-24 14:02:40
 * @FilePath: /ezgg-app/packages/app/Components/Currency/index.tsx
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
import {getTrustWalletAssetUrl} from 'app/utils/chain';
import TokenIconWrapper from '../TokenIconWrapper';

export type CurrencyProps = {
  currencyData: any;
  setCurrencyData: (currency: any) => void;
  setIsLoading: (isLoading: boolean) => void;
  isRequest?: boolean;
  chainId?: number;
  isReplace?: boolean;
};

// 交易历史item
const Currency = React.forwardRef<HTMLDivElement, CurrencyProps>(
  (
    {currencyData, setCurrencyData, setIsLoading, isRequest = false, chainId, isReplace = false}: CurrencyProps,
    ref,
  ) => {
    const {push} = useRouter();
    const {appScale} = useResponse();
    const {getAllBalances, convertToChainGroups, loading} = useBlockchain();
    const [{blockchainList}] = useRematchModel('app');
    const {t} = useTranslation();
    const [modalVisible, setModalVisible] = useState(false);
    const [list, setList] = useState<any>([]);

    const selectCurrency = (item) => {
      setCurrencyData(item);
      setModalVisible(false);
    };

    useEffect(() => {
      if (blockchainList?.length > 0) {
        fetchBalances();
      }
    }, [blockchainList, isReplace]);

    const fetchBalances = async () => {
      try {
        setIsLoading(true);

        const tokenList = await getAllBalances(false, chainId);
        const tokenList2: any = [];

        tokenList.forEach((item) => {
          if (item.token.feeSupport) {
            tokenList2.push(item);
          }
        });
        const sortedData = convertToChainGroups(isReplace ? tokenList2 : tokenList);

        if (sortedData.length > 0 && sortedData[0].tokenList.length > 0) {
          setList(sortedData);
          setCurrencyData(sortedData[0].tokenList[0]);
        } else {
          setList([]);
        }
      } finally {
        setIsLoading(false);
      }
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
            onPress={() => setModalVisible(true)}
          >
            <XStack h={appScale(50)}>
              <XStack flexShrink={0} pos={'relative'} w={appScale(72)}>
                <XStack w={appScale(48)} h={appScale(48)} overflow={'hidden'} br={appScale(24)}>
                  <TokenIconWrapper
                    tokenAddress={currencyData?.token?.address}
                    chainId={currencyData?.token?.chainId}
                    tokenSymbol={currencyData?.token?.tokenSymbol}
                    size={48}
                  />
                </XStack>
                {/* <AppImage
                  src={getTrustWalletAssetUrl(
                    '0x60a3e35cc302bfa44cb288bc5a4f316fdb1adb42',
                    currencyData?.token?.chainId,
                  )}
                  w={appScale(48)}
                  h={appScale(48)}
                /> */}
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
          isRequest={isRequest}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          currencyList={list}
          currencyData={currencyData}
          selectCurrency={selectCurrency}
        />
      </>
    );
  },
);

Currency.displayName = 'Currency';

export default Currency;
