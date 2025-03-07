/*
 * @Date: 2023-12-08 16:25:15
 * @LastEditors: yosan
 * @LastEditTime: 2025-03-07 13:27:47
 * @FilePath: /ezgg-app/packages/app/Components/Currency/index.tsx
 */
import {AppImage, Button, Text, YStack, XStack, SizableText} from '@my/ui';
import {useRematchModel} from 'app/store/model';
import {useRouter} from 'solito/router';
import {useTranslation} from 'react-i18next';
import {ChevronDown, ChevronRight} from '@tamagui/lucide-icons';
import {appScale} from 'app/utils';
import {useEffect, useState} from 'react';
import CurrencyPopup from '../CurrencyPopup';
import useRequest from 'app/hooks/useRequest';
import {getBalanceListBalance} from 'app/servers/api/balance';
import {getChainInfo} from 'app/utils/chain';
import {TokenIcon} from '@web3icons/react';
import React from 'react';

export type CurrencyProps = {
  currencyData: any;
  setCurrencyData: (currency: any) => void;
  setIsLoading: (isLoading: boolean) => void;
};
// 交易历史item
const Currency = React.forwardRef<HTMLDivElement, CurrencyProps>(
  ({currencyData, setCurrencyData, setIsLoading}: CurrencyProps, ref) => {
    const {push} = useRouter();
    const {makeRequest} = useRequest();

    const [{currency, blockchainList}] = useRematchModel('app');
    const [{tokenList}] = useRematchModel('user');
    const {t, i18n} = useTranslation();
    const [modalVisible, setModalVisible] = useState(false);
    const [list, setList] = useState<any>([]);
    const selectCurrency = (item) => {
      setCurrencyData(item);
      setModalVisible(false);
    };

    const _getBalanceListBalance = async (platform, chainId, currency) => {
      const res = await makeRequest(getBalanceListBalance({platform, chainId, currency}));
      if (res?.data) {
        return res.data;
      }
      return null;
    };

    // 将tokenList转换为chainGroups
    const convertToChainGroups = (tokenList: any[]): any[] => {
      const groupedData = tokenList.reduce<any[]>((acc, token) => {
        const chainInfo = getChainInfo(token?.token?.chainId);
        if (!chainInfo) return acc;

        const tokenData: any = {
          chainName: chainInfo?.name,
          chainIcon: chainInfo?.icon,
          ...token,
        };

        const existingChainGroup = acc.find((group) => group.chainName === chainInfo.name);
        if (existingChainGroup) {
          existingChainGroup.tokenList.push(tokenData);
        } else {
          acc.push({
            chainName: chainInfo.name,
            tokenList: [tokenData],
          });
        }

        return acc;
      }, []);

      return groupedData.sort((a, b) => a.chainName.localeCompare(b.chainName));
    };

    const getTokenList = () => {
      return convertToChainGroups(tokenList);
    };

    useEffect(() => {
      if (tokenList?.length > 0) {
        const _tokenList = getTokenList();
        setList(_tokenList);
        setCurrencyData(_tokenList[0].tokenList[0]);
      } else {
        if (blockchainList?.length > 0) {
          fetchAllBalances();
        }
      }
    }, [tokenList, blockchainList, setIsLoading]);

    const fetchAllBalances = async () => {
      if (!blockchainList?.length) {
        setList([]);
        return;
      }

      try {
        setIsLoading(true);
        // 并行获取所有链的余额数据
        const results = await Promise.all(
          blockchainList.map((chain) =>
            _getBalanceListBalance(chain?.platform, chain.chainId, currency).catch((error) => {
              console.error(`获取 ${chain.platform} 余额失败:`, error);
              return null;
            }),
          ),
        );

        // 将API返回的数据转换为tokenList格式
        const formattedTokenList = results.filter(Boolean).flatMap((result) => {
          if (result.tokens?.length > 0) {
            return result.tokens.map((item) => {
              const chainInfo = getChainInfo(item?.token?.chainId);
              return {
                chainName: chainInfo?.name,
                chainIcon: chainInfo?.icon,
                ...item,
              };
            });
          }
          return [];
        });

        // 使用convertToChainGroups处理数据
        const sortedData = convertToChainGroups(formattedTokenList);

        if (sortedData.length > 0 && sortedData[0].tokenList.length > 0) {
          setList(sortedData);
          setCurrencyData(sortedData[0].tokenList[0]);
        } else {
          setList([]);
        }
      } catch (error) {
        console.error('获取余额列表失败:', error);
        setList([]);
      } finally {
        setIsLoading(false);
      }
    };

    // useEffect(() => {
    //   if (blockchainList && blockchainList.length > 0) {
    //     fetchAllBalances();
    //   }
    // }, [blockchainList]);

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
                {currencyData?.token?.tokenSymbol && (
                  <YStack height={appScale(48)} width={appScale(48)} borderRadius={appScale(24)} overflow={'hidden'}>
                    <TokenIcon symbol={currencyData?.token?.tokenSymbol} variant="background" size={appScale(48)} />
                  </YStack>
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
          currencyList={list}
          currencyData={currencyData}
          selectCurrency={selectCurrency}
        />
      </>
    );
  },
);

// 添加显示名称（可选但推荐）
Currency.displayName = 'Currency';

export default Currency;
