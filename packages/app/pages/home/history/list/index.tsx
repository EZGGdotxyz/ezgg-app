/*
 * @Date: 2023-12-18 14:37:38
 * @LastEditors: yosan
 * @LastEditTime: 2025-03-13 17:59:38
 * @FilePath: /ezgg-app/packages/app/pages/home/history/list/index.tsx
 */
import {
  AppHeader,
  AppHeaderProps,
  AppImage,
  HeaderBackButton,
  Paragraph,
  SizableText,
  XStack,
  YStack,
  Button,
  ScrollView,
} from '@my/ui';
import React, {useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import PermissionPage from 'app/Components/PermissionPage';
import History from '../../index/components/History';
import {dealtHistoryList, restoreHistoryList} from 'app/utils';
import useRequest from 'app/hooks/useRequest';
import {createParam} from 'solito';
import {useRouter} from 'solito/router';
import {FlatList} from 'react-native';
import ListEmpty from 'app/Components/ListEmpty';
import dayjs from 'dayjs';
import {ChevronRight} from '@tamagui/lucide-icons';
import {PrimaryColor} from 'app/config';
import AppHeader2 from 'app/Components/AppHeader2';
import SearchHeader from 'app/Components/SearchHeader';
import {getTransactionHistoryPageTransactionHistory} from 'app/servers/api/transactionHistory';
import HistoryDayItem from 'app/Components/HistoryDayItem';
import {useRematchModel} from 'app/store/model';
import {ScrollView as RNScrollView} from 'react-native';
import useResponse from 'app/hooks/useResponse';
import DeclineRequestPopup from '../detail/components/DeclineRequestPopup';
import AcceptRequestPopup from '../detail/components/AcceptRequestPopup';
import AppLoading from 'app/Components/AppLoading';
import CancelPayLinkPopup from '../detail/components/CancelPayLinkPopup';

const {useParam} = createParam<{id: string}>();

// 關於
const HistoryScreen = (props: any) => {
  const {isRefresh} = props;
  const {t} = useTranslation();
  const [{currency}] = useRematchModel('app');
  const {appScale} = useResponse();

  const {makeRequest} = useRequest();
  const [data, setData] = useState<any>([]);
  const [dataTotal, setDataTotal] = useState<any>(0);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [canLoadMore, setCanLoadMore] = useState(false);
  const [activeTab, setActiveTab] = useState('ALL');
  const [isLoading, setIsLoading] = useState(false);
  const [declineRequestVisible, setDeclineRequestVisible] = useState(false);
  const [acceptRequestVisible, setAcceptRequestVisible] = useState(false);
  const [orderData, setOrderData] = useState<any>({});
  const [cancelPayLinkVisible, setCancelPayLinkVisible] = useState(false);
  const categoriesScrollViewRef = useRef<RNScrollView>(null);
  const tabList = [
    {
      value: 'ALL',
      label: t('home.all'),
    },
    {
      value: 'PENDING',
      label: t('home.pending'),
    },
    {
      value: 'INCOME',
      label: t('home.income'),
    },
    {
      value: 'EXPEND',
      label: t('home.expense'),
    },
    {
      value: 'DEPOSIT',
      label: t('home.topUp'),
    },
    {
      value: 'WITHDRAW',
      label: t('home.withdraw'),
    },
  ];

  useEffect(() => {
    if (isRefresh) {
      fetchData();
    }
  }, [searchText, isRefresh, activeTab, currency]);

  const fetchData = async (_page = 1) => {
    setLoading(true);
    const params: any = {
      page: _page,
      pageSize: 10,
      currency: currency,
      search: searchText,
    };
    if (activeTab && activeTab !== 'ALL') {
      if (activeTab === 'INCOME' || activeTab === 'EXPEND') {
        params.subject = activeTab;
      } else if (activeTab === 'PENDING') {
        params.transactionStatus = 'PENDING';
      } else if (activeTab === 'WITHDRAW' || activeTab === 'DEPOSIT') {
        params.transactionCategory = activeTab;
      }
    }
    const res = await makeRequest(getTransactionHistoryPageTransactionHistory(params));
    if (res?.data?.record && res?.data?.record.length > 0) {
      let _recordData = res.data.record;
      if (_page !== 1) {
        _recordData = [...restoreHistoryList(data), ...res.data.record];
      }
      setDataTotal(_recordData.length);
      const _data = await dealtHistoryList(_recordData);
      setData(_data);

      setPage(_page);
      setLoading(false);
      setTotal(res?.data?.totalCount || 0);
      setCanLoadMore(_recordData.length < (res?.data?.totalCount || 0));
    } else {
      setData([]);
      setTotal(0);
      setLoading(false);
      setCanLoadMore(false);
    }
  };

  const fetchMoreData = async () => {
    if (!loadingMore && canLoadMore) {
      setLoadingMore(true);
      await fetchData(page + 1);
      setLoadingMore(false);
    }
  };

  const onSearch = (text: string) => {
    setSearchText(text);
    console.log('🚀 ~ onSearch ~ text:', text);
  };

  /**
   * 加载时加载动画
   */
  const _renderFooter = () => {
    if (!loading) {
      if (dataTotal === total) {
        return (
          <XStack w="100%" jc={'center'} py={appScale(24)}>
            <SizableText col={'$color11'} fontSize={'$3'}>
              {t('tips.list.loading.title')}
            </SizableText>
          </XStack>
        );
      } else {
        if (data.length > 0) {
          return (
            <XStack w="100%" jc={'center'} py={appScale(24)}>
              <SizableText col={'$color11'} fontSize={'$3'}>
                {t('tips.list.loading.title2')}
              </SizableText>
            </XStack>
          );
        }
      }
    } else {
      return null;
    }
  };

  const handleTabChange = (tab, index) => {
    // 切换标签时重置分页和加载状态
    setPage(1);
    setData([]);
    setTotal(0);
    setCanLoadMore(false);
    setLoading(true);
    setActiveTab(tab);
    // 重置搜索文本
    setSearchText('');
    // 滚动到选中的分类按钮位置
    if (categoriesScrollViewRef.current) {
      categoriesScrollViewRef.current.scrollTo({
        x: index >= 2 ? (index + 1) * 40 : 0, // 调整偏移量使按钮居中
        animated: true,
      });
    }
  };

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
    <PermissionPage>
      <AppHeader2 title={t('screen.home.history')} fallbackUrl="/" />
      <SearchHeader placeholder={t('home.search')} onSearch={onSearch} />
      <YStack flexShrink={0} h={appScale(56)}>
        {/* 分类按钮 */}
        <ScrollView
          ref={categoriesScrollViewRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          paddingHorizontal={appScale(24)}
          paddingBottom={appScale(12)}
        >
          <XStack space={'$4'}>
            {tabList.map((category, index) => (
              <Button
                key={category.value}
                unstyled
                borderWidth={1}
                borderColor={activeTab === category.value ? PrimaryColor : '#E0E0E0'}
                backgroundColor={activeTab === category.value ? PrimaryColor : '#fff'}
                paddingHorizontal={appScale(20)}
                paddingVertical={appScale(8)}
                borderRadius={appScale(22)}
                pressStyle={{
                  opacity: 0.85,
                }}
                onPress={() => handleTabChange(category.value, index)}
              >
                <SizableText size="$4" height={appScale(28)} lh={appScale(28)} color={'#212121'} fow={'600'}>
                  {category.label}
                </SizableText>
              </Button>
            ))}
          </XStack>
        </ScrollView>
      </YStack>

      <FlatList
        data={data}
        refreshing={loading}
        keyExtractor={(item, index) => item?.day}
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#fff',
          flex: 1,
        }}
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: '#fff',
        }}
        onEndReached={() => {
          // 添加判断条件，确保数据已加载完成并且页面不为空
          if (canLoadMore && !loadingMore && data.length > 0 && !loading) {
            fetchMoreData();
          }
        }}
        onMomentumScrollBegin={() => {
          // 仅当有更多数据可加载时才设置为 true
          if (dataTotal < total) {
            setCanLoadMore(true);
          }
        }}
        onEndReachedThreshold={0.5}
        onRefresh={() => {
          fetchData();
        }}
        ListFooterComponent={_renderFooter}
        ListEmptyComponent={<ListEmpty loading={loading} />}
        renderItem={({item, index}) => {
          return <HistoryDayItem activeTab={activeTab} onClick={onClick} key={`day-${item.day}-${index}`} item={item} />;
        }}
      />
      <DeclineRequestPopup
        setIsLoading={setIsLoading}
        modalVisible={declineRequestVisible}
        setModalVisible={setDeclineRequestVisible}
        orderData={orderData}
        onSuccess={async () => {
          setDeclineRequestVisible(false);
          fetchData();
        }}
      />
      <AcceptRequestPopup
        setIsLoading={setIsLoading}
        modalVisible={acceptRequestVisible}
        setModalVisible={setAcceptRequestVisible}
        orderData={orderData}
        onSuccess={async () => {
          setAcceptRequestVisible(false);
          fetchData();
        }}
      />
      <CancelPayLinkPopup
        setIsLoading={setIsLoading}
        modalVisible={cancelPayLinkVisible}
        setModalVisible={setCancelPayLinkVisible}
        orderData={orderData}
        onSuccess={async () => {
          setCancelPayLinkVisible(false);
          fetchData();
        }}
      />
      {isLoading && <AppLoading />}
    </PermissionPage>
  );
};
export default HistoryScreen;
