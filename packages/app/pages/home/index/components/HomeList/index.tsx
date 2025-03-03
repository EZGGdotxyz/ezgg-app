/*
 * @Date: 2023-12-08 16:25:15
 * @LastEditors: yosan
 * @LastEditTime: 2025-03-03 14:23:26
 * @FilePath: /ezgg-app/packages/app/pages/home/index/components/HomeList/index.tsx
 */
import {AppImage, Button, Text, YStack, XStack, SizableText, Sheet, ScrollView} from '@my/ui';
import {useRematchModel} from 'app/store/model';
import {useRouter} from 'solito/router';
import {useTranslation} from 'react-i18next';
import {ChevronDown, Check} from '@tamagui/lucide-icons';
import {appScale, dealtHistoryList, formatNumber} from 'app/utils';
import {useEffect, useState} from 'react';
import AppButton from 'app/Components/AppButton';
import ChainListPopup from 'app/pages/home/index/components/ChainListPopup';
import useRequest from 'app/hooks/useRequest';
import {getBalanceListBalance} from 'app/servers/api/balance';
import {TokenIcon} from '@web3icons/react';
import {getChainInfo} from 'app/utils/chain';
import TokenList from '../TokenList';
import History from '../History';
import {getTransactionHistoryPageTransactionHistory} from 'app/servers/api/transactionHistory';

export type HomeListProps = {
  switchOn: boolean;
  setIsLoading: (isLoading: boolean) => void;
};
// 首页
const HomeList: React.FC<any> = ({switchOn, setIsLoading}: HomeListProps) => {
  const [{currency, blockchainList}] = useRematchModel('app');
  const [{isLogin}] = useRematchModel('user');
  const {makeRequest} = useRequest();

  const {push} = useRouter();
  const {t, i18n} = useTranslation();
  const [sheetOpen, setSheetOpen] = useState(false);

  const [list, setList] = useState<any>([]);
  const [history, setHistory] = useState<any>([]);

  const [selectedType, setSelectedType] = useState<any>({
    chainId: 'all',
    platform: 'ETH',
  });

  const tokenTypes = [
    {chainId: 'all', name: t('home.viewAll'), icon: ''},
    ...blockchainList.map((item) => {
      const chainInfo = getChainInfo(item?.chainId);
      return {
        chainId: item?.chainId,
        name: chainInfo?.name,
        chainIcon: chainInfo?.icon,
        platform: item?.platform,
      };
    }),
  ];

  useEffect(() => {
    isLogin && _getTransactionHistoryPageTransactionHistory();
  }, [isLogin]);

  const _getBalanceListBalance = async (platform, chainId, currency) => {
    const res = await makeRequest(getBalanceListBalance({platform, chainId, currency}));
    if (res?.data) {
      return res.data;
    }
    return null;
  };
  const _getTransactionHistoryPageTransactionHistory = async () => {
    const res = await makeRequest(
      getTransactionHistoryPageTransactionHistory({
        page: 1,
        pageSize: 10,
      }),
    );
    if (res?.data?.record && res?.data?.record.length > 0) {
      setHistory(dealtHistoryList(res.data.record));
    } else {
      setHistory([]);
    }
    return null;
  };

  const fetchAllBalances = async () => {
    if (!blockchainList || blockchainList.length === 0) return;

    try {
      setIsLoading(true);
      // 创建一个包含所有请求的数组
      let promises: any = [];
      if (selectedType?.chainId === 'all') {
        promises = blockchainList.map((chain) => _getBalanceListBalance(chain?.platform, chain.chainId, currency));
      } else {
        promises = [_getBalanceListBalance(selectedType?.platform, selectedType?.chainId, currency)];
      }

      let summaryBalance = 0;
      // 并行执行所有请求
      const results = await Promise.all(promises);

      // 过滤掉空结果并格式化数据
      const balanceData = results
        .filter((result) => result !== null)
        .flatMap((result, index) => {
          if (result.summary?.balance) {
            summaryBalance += Number(result.summary?.balance);
          }

          if (result.tokens?.length > 0) {
            return result.tokens.map((item) => {
              const chainInfo = getChainInfo(item?.token?.chainId);
              return {
                tokenAddress: item?.token?.address,
                tokenName: item?.token?.tokenName,
                tokenSymbol: item?.token?.tokenSymbol,
                tokenDecimals: item?.token?.tokenDecimals,
                // tokenImage:item?.token?.image,
                priceAutoUpdate: item?.token?.priceAutoUpdate,
                chainId: item?.token?.chainId,
                tokenAmount: item?.tokenAmount,
                currencyAmount: item?.currencyAmount,
                chainName: chainInfo?.name,
                chainIcon: chainInfo?.icon,
              };
            });
          }
          return [];
        });

      // 如果有数据，更新列表
      if (balanceData.length > 0) {
        setList(balanceData);
      } else {
        setList([]);
      }
    } catch (error) {
      console.error('获取余额列表失败:', error);
      // 保留演示数据作为后备
      setList([]);
    } finally {
      setIsLoading(false);
    }
  };

  const onOpenChange = (type) => {
    setSelectedType(type);
    setSheetOpen(false);
  };
  useEffect(() => {
    if (isLogin && blockchainList && blockchainList.length > 0) {
      fetchAllBalances();
    }
  }, [blockchainList, selectedType, isLogin]);

  return (
    <YStack f={1}>
      <ScrollView f={1} bc="$background">
        <YStack pb={appScale(104)}>
          {!switchOn && (
            <TokenList selectedType={selectedType} setSheetOpen={setSheetOpen} list={list} tokenTypes={tokenTypes} />
          )}
          {switchOn && <History history={history} />}
        </YStack>
      </ScrollView>
      <ChainListPopup
        tokenTypes={tokenTypes}
        setSheetOpen={setSheetOpen}
        sheetOpen={sheetOpen}
        onOpenChange={onOpenChange}
        setSelectedType={setSelectedType}
        selectedType={selectedType}
      />
    </YStack>
  );
};

export default HomeList;
