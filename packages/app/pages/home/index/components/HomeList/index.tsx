/*
 * @Date: 2023-12-08 16:25:15
 * @LastEditors: yosan
 * @LastEditTime: 2025-03-06 21:17:46
 * @FilePath: /ezgg-app/packages/app/pages/home/index/components/HomeList/index.tsx
 */
import {AppImage, Button, Text, YStack, XStack, SizableText, Sheet, ScrollView} from '@my/ui';
import {useRematchModel} from 'app/store/model';
import {useRouter} from 'solito/router';
import {useTranslation} from 'react-i18next';
import {ChevronDown, Check} from '@tamagui/lucide-icons';
import {appScale, dealtHistoryList, formatNumber} from 'app/utils';
import {useEffect, useState, useCallback, useMemo} from 'react';
import AppButton from 'app/Components/AppButton';
import ChainListPopup from 'app/pages/home/index/components/ChainListPopup';
import useRequest from 'app/hooks/useRequest';
import {getBalanceListBalance} from 'app/servers/api/balance';
import {TokenIcon} from '@web3icons/react';
import {getChainInfo} from 'app/utils/chain';
import TokenList from '../TokenList';
import History from '../History';
import {getTransactionHistoryPageTransactionHistory} from 'app/servers/api/transactionHistory';
import {useDispatch} from 'react-redux';
import {Dispatch} from 'app/store';

export type HomeListProps = {
  switchOn: boolean;
  setIsLoading: (isLoading: boolean) => void;
};

const HomeList: React.FC<HomeListProps> = ({switchOn, setIsLoading}) => {
  const [{currency, blockchainList}] = useRematchModel('app');
  const [{isLogin}] = useRematchModel('user');
  const {makeRequest} = useRequest();
  const dispatch = useDispatch<Dispatch>();
  const {push} = useRouter();
  const {t} = useTranslation();
  
  const [sheetOpen, setSheetOpen] = useState(false);
  const [list, setList] = useState<any[]>([]);
  const [history, setHistory] = useState<any[]>([]);
  const [selectedType, setSelectedType] = useState({
    chainId: 'all',
    platform: 'ETH',
  });

  // 使用 useMemo 优化 tokenTypes 的计算
  const tokenTypes = useMemo(() => [
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
  ], [blockchainList, t]);

  // 使用 useCallback 优化函数
  const _getBalanceListBalance = useCallback(async (platform: string, chainId: string, currency: string) => {
    const res = await makeRequest(getBalanceListBalance({platform, chainId, currency}));
    return res?.data || null;
  }, [makeRequest]);

  const _getTransactionHistoryPageTransactionHistory = useCallback(async () => {
    const res = await makeRequest(
      getTransactionHistoryPageTransactionHistory({
        page: 1,
        pageSize: 10,
        currency,
      }),
    );
    if (res?.data?.record?.length > 0) {
      setHistory(dealtHistoryList(res.data.record));
    } else {
      setHistory([]);
    }
  }, [makeRequest, currency]);

  const fetchAllBalances = useCallback(async () => {
    if (!blockchainList?.length) return;

    try {
      setIsLoading(true);
      const promises = selectedType?.chainId === 'all'
        ? blockchainList.map(chain => _getBalanceListBalance(chain?.platform, chain.chainId, currency))
        : [_getBalanceListBalance(selectedType?.platform, selectedType?.chainId, currency)];

      const results = await Promise.all(promises);
      let summaryBalance = 0;

      const _tokenList = results
        .filter(Boolean)
        .flatMap((result) => {
          if (result.summary?.balance) {
            summaryBalance += Number(result.summary?.balance);
          }

          return result.tokens?.map((item) => {
            const chainInfo = getChainInfo(item?.token?.chainId);
            return {
              chainName: chainInfo?.name,
              chainIcon: chainInfo?.icon,
              ...item,
            };
          }) || [];
        });

      dispatch.user.updateState({
        availableBalance: summaryBalance,
        tokenList: _tokenList,
      });

      setList(_tokenList.length > 0 ? _tokenList : []);
    } catch (error) {
      console.error('获取余额列表失败:', error);
      setList([]);
    } finally {
      setIsLoading(false);
    }
  }, [blockchainList, selectedType, currency, dispatch.user, setIsLoading, _getBalanceListBalance]);

  // const onOpenChange = useCallback((type) => {
  //   setSelectedType(type);
  //   setSheetOpen(false);
  // }, []);

  useEffect(() => {
    if (isLogin) {
      _getTransactionHistoryPageTransactionHistory();
    }
  }, [isLogin, _getTransactionHistoryPageTransactionHistory]);

  useEffect(() => {
    if (isLogin && blockchainList?.length > 0) {
      fetchAllBalances();
    }
  }, [blockchainList, selectedType, isLogin, fetchAllBalances]);

  return (
    <YStack f={1}>
      <ScrollView f={1} bc="$background">
        <YStack pb={appScale(104)}>
          {!switchOn && (
            <TokenList 
              selectedType={selectedType} 
              setSheetOpen={setSheetOpen} 
              list={list} 
              tokenTypes={tokenTypes} 
            />
          )}
          {switchOn && <History history={history} />}
        </YStack>
      </ScrollView>
      <ChainListPopup
        tokenTypes={tokenTypes}
        setSheetOpen={setSheetOpen}
        sheetOpen={sheetOpen}
        setSelectedType={setSelectedType}
        selectedType={selectedType}
      />
    </YStack>
  );
};

export default HomeList;
