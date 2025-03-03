/*
 * @Date: 2023-12-08 16:25:15
 * @LastEditors: yosan
 * @LastEditTime: 2025-03-03 15:49:51
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

export type CurrencyProps = {
  currencyData: any;
  setCurrencyData: (currency: any) => void;
  updateCurrency: (currency: any) => void;
};
// 交易历史item
const Currency: React.FC<any> = ({currencyData, setCurrencyData}: CurrencyProps) => {
  const {push} = useRouter();
  const {makeRequest} = useRequest();

  const [{currency, blockchainList}] = useRematchModel('app');
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

  type GroupedToken = {
    id: string;
    chainName: string;
    tokenSymbol: string;
    tokenAmount: string;
    currencyAmount: string;
  };

  type ChainGroup = {
    chainName: string;
    tokenList: GroupedToken[];
  };

  const fetchAllBalances = async () => {
    if (!blockchainList?.length) {
      setList([]);
      return;
    }

    try {
      // 并行获取所有链的余额数据
      const results = await Promise.all(
        blockchainList.map((chain) =>
          _getBalanceListBalance(chain?.platform, chain.chainId, currency).catch((error) => {
            console.error(`获取 ${chain.platform} 余额失败:`, error);
            return null;
          }),
        ),
      );

      // 处理和转换数据
      const processedData = results.filter(Boolean).reduce<ChainGroup[]>((chains, result) => {
        // 如果没有代币数据，跳过处理
        if (!result?.tokens?.length) return chains;

        // 处理每个代币数据
        result.tokens.forEach((item) => {
          const chainInfo = getChainInfo(item?.token?.chainId);
          if (!chainInfo) return;

          const tokenData: GroupedToken = {
            id: `${item?.token?.chainId}-${item?.token?.address}`,
            chainName: chainInfo.name,
            tokenSymbol: item?.token?.tokenSymbol,
            tokenAmount: item?.tokenAmount || '0',
            currencyAmount: item?.currencyAmount || '0',
          };

          // 查找或创建链组
          const chainGroup = chains.find((g) => g.chainName === chainInfo.name);
          if (chainGroup) {
            chainGroup.tokenList.push(tokenData);
          } else {
            chains.push({
              chainName: chainInfo.name,
              tokenList: [tokenData],
            });
          }
        });

        return chains;
      }, []);

      // 按链名称排序
      const sortedData = processedData.sort((a, b) => a.chainName.localeCompare(b.chainName));
      setList(sortedData);
      setCurrencyData(sortedData[0].tokenList[0]);
    } catch (error) {
      console.error('获取余额列表失败:', error);
      setList([]);
    }
  };

  useEffect(() => {
    if (blockchainList && blockchainList.length > 0) {
      fetchAllBalances();
    }
  }, [blockchainList]);

  return (
    <>
      <YStack w="100%" mb={appScale(24)} onPress={() => setModalVisible(true)}>
        <XStack mb={appScale(8)} w="100%">
          <SizableText h={appScale(30)} lh={appScale(30)} fontSize={'$5'} color={'#212121'} fontWeight={'600'}>
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
              {currencyData?.tokenSymbol && (
                <YStack height={appScale(48)} width={appScale(48)} borderRadius={appScale(24)} overflow={'hidden'}>
                  <TokenIcon symbol={currencyData?.tokenSymbol} variant="background" size={appScale(48)} />
                </YStack>
              )}
              {currencyData?.chainIcon && (
                <XStack pos={'absolute'} bottom={appScale(-4)} right={appScale(12)}>
                  <AppImage
                    width={appScale(24)}
                    height={appScale(24)}
                    src={require(`app/assets/images/chain/${currencyData.chainIcon}.png`)}
                    type="local"
                  />
                </XStack>
              )}
            </XStack>

            {/* <YStack pos={'relative'} w={appScale(72)} flexShrink={0}>
              <AppImage
                width={appScale(48)}
                height={appScale(48)}
                src={require(`app/assets/images/token/${currencyData.token}.png`)}
                type="local"
              />
              <XStack pos={'absolute'} bottom={appScale(4)} right={appScale(18)}>
                <AppImage
                  width={appScale(24)}
                  height={appScale(24)}
                  src={require(`app/assets/images/chain/${currencyData.chain}.png`)}
                  type="local"
                />
              </XStack>
            </YStack> */}
            {currencyData?.tokenSymbol && (
              <SizableText
                fontSize={'$8'}
                h={appScale(50)}
                lh={appScale(50)}
                color={'#212121'}
                fontWeight={'600'}
                pos="relative"
              >
                {`${currencyData?.tokenSymbol} (${currencyData?.chainName})`}
              </SizableText>
            )}
          </XStack>
          <ChevronRight size="$3" color={'#212121'} />
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
};

export default Currency;
