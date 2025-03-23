/*
 * @Date: 2023-12-08 16:25:15
 * @LastEditors: yosan
 * @LastEditTime: 2025-03-20 14:43:20
 * @FilePath: /ezgg-app/packages/app/pages/home/index/components/HomeList/index.tsx
 */
import {AppImage, Button, Text, YStack, XStack, SizableText, Sheet, ScrollView} from '@my/ui';
import {useRematchModel} from 'app/store/model';
import {useRouter} from 'solito/router';
import {useTranslation} from 'react-i18next';
import {ChevronDown, Check} from '@tamagui/lucide-icons';
import {dealtHistoryList} from 'app/utils';
import {useEffect, useState, useCallback, useMemo, useRef} from 'react';
import AppButton from 'app/Components/AppButton';
import ChainListPopup from 'app/pages/home/index/components/ChainListPopup';
import useRequest from 'app/hooks/useRequest';
import {getChainInfo} from 'app/utils/chain';
import TokenList from '../TokenList';
import History from '../History';
import {getTransactionHistoryPageTransactionHistory} from 'app/servers/api/transactionHistory';
import useResponse from 'app/hooks/useResponse';
import useBlockchain from 'app/hooks/useBlockchain';
import CancelPayLinkPopup from 'app/pages/home/history/detail/components/CancelPayLinkPopup';
import AcceptRequestPopup from 'app/pages/home/history/detail/components/AcceptRequestPopup';
import DeclineRequestPopup from 'app/pages/home/history/detail/components/DeclineRequestPopup';

export type HomeListProps = {
  switchOn: boolean;
  setIsLoading: (isLoading: boolean) => void;
};

const HomeList: React.FC<HomeListProps> = ({switchOn, setIsLoading}) => {
  const [{currency, blockchainList}] = useRematchModel('app');
  const [{isLogin}] = useRematchModel('user');
  const {makeRequest} = useRequest();
  const {push} = useRouter();
  const {t} = useTranslation();
  const {appScale} = useResponse();
  const {getAllBalances} = useBlockchain();

  const [sheetOpen, setSheetOpen] = useState(false);
  const [list, setList] = useState<any[]>([]);
  const [history, setHistory] = useState<any[]>([]);
  const [selectedType, setSelectedType] = useState({
    chainId: 'all',
    platform: 'ETH',
  });
  const [declineRequestVisible, setDeclineRequestVisible] = useState(false);
  const [acceptRequestVisible, setAcceptRequestVisible] = useState(false);
  const [orderData, setOrderData] = useState<any>({});
  const [cancelPayLinkVisible, setCancelPayLinkVisible] = useState(false);

  // 使用 useMemo 优化 tokenTypes 的计算
  const tokenTypes = useMemo(
    () => [
      {chainId: 'all', name: t('home.viewAll'), chainIcon: ''},
      ...blockchainList.map((item) => {
        const chainInfo = getChainInfo(item?.chainId);
        return {
          chainId: item?.chainId,
          name: chainInfo?.name,
          chainIcon: chainInfo?.icon,
          platform: item?.platform,
        };
      }),
      // {chainId: '728126428', name: 'Tron', chainIcon: 'Tron', platform: 'TRON'},
    ],
    [blockchainList, t],
  );

  // 获取交易历史
  const fetchTransactionHistory = useCallback(async () => {
    if (!isLogin) return;

    try {
      const res = await makeRequest(
        getTransactionHistoryPageTransactionHistory({
          page: 1,
          pageSize: 10,
          currency,
        }),
      );

      const records = res?.data?.record ?? [];
      setHistory(records.length > 0 ? dealtHistoryList(records) : []);
    } catch (error) {
      console.error('获取交易历史失败:', error);
      setHistory([]);
    }
  }, [makeRequest, currency, isLogin]);

  // 获取余额
  const fetchBalances = useCallback(async () => {
    if (!isLogin || !blockchainList?.length) return;

    try {
      setIsLoading(true);
      const selectedChainId = selectedType.chainId === 'all' ? undefined : Number(selectedType.chainId);
      const tokenList = await getAllBalances(false, selectedChainId);
      setList(tokenList);
    } catch (error) {
      console.error('获取余额列表失败:', error);
      setList([]);
    } finally {
      setIsLoading(false);
    }
  }, [isLogin, blockchainList, selectedType.chainId, getAllBalances, setIsLoading]);

  // 监听登录状态、区块链列表和选择的链类型变化
  useEffect(() => {
    if (isLogin && blockchainList?.length > 0) {
      fetchBalances();
    }
  }, [isLogin, blockchainList?.length, selectedType.chainId]);

  // 监听登录状态和货币变化，获取交易历史
  useEffect(() => {
    if (isLogin) {
      fetchTransactionHistory();
    }
  }, [isLogin, currency]);

  const chainListPopupRef = useRef(null);

  const onClick = (item: any, action = '') => {
    setOrderData(item);
    if (action === 'cancel') {
      setCancelPayLinkVisible(true);
    } else if (action === 'decline') {
      setDeclineRequestVisible(true);
    } else {
      setAcceptRequestVisible(true);
    }
  };
  return (
    <YStack f={1}>
      <ScrollView f={1} bc="$background">
        <YStack pb={appScale(104)}>
          {!switchOn && (
            <TokenList selectedType={selectedType} setSheetOpen={setSheetOpen} list={list} tokenTypes={tokenTypes} />
          )}
          {switchOn && <History history={history} onClick={onClick} />}
        </YStack>
      </ScrollView>
      <ChainListPopup
        ref={chainListPopupRef}
        tokenTypes={tokenTypes}
        setSheetOpen={setSheetOpen}
        sheetOpen={sheetOpen}
        setSelectedType={setSelectedType}
        selectedType={selectedType}
      />
      <DeclineRequestPopup
        setIsLoading={setIsLoading}
        modalVisible={declineRequestVisible}
        setModalVisible={setDeclineRequestVisible}
        orderData={orderData}
        onSuccess={async () => {
          setDeclineRequestVisible(false);
          fetchTransactionHistory();
        }}
      />
      <AcceptRequestPopup
        setIsLoading={setIsLoading}
        modalVisible={acceptRequestVisible}
        setModalVisible={setAcceptRequestVisible}
        orderData={orderData}
        onSuccess={async () => {
          setAcceptRequestVisible(false);
          fetchTransactionHistory();
        }}
      />
      <CancelPayLinkPopup
        setIsLoading={setIsLoading}
        modalVisible={cancelPayLinkVisible}
        setModalVisible={setCancelPayLinkVisible}
        orderData={orderData}
        onSuccess={async () => {
          setCancelPayLinkVisible(false);
          fetchTransactionHistory();
        }}
      />
    </YStack>
  );
};

export default HomeList;
