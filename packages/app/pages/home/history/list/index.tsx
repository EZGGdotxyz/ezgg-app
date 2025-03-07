/*
 * @Date: 2023-12-18 14:37:38
 * @LastEditors: yosan
 * @LastEditTime: 2025-03-06 20:43:41
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
} from '@my/ui';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import PermissionPage from 'app/Components/PermissionPage';
import History from '../../index/components/History';
import {appScale, dealtHistoryList, restoreHistoryList} from 'app/utils';
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
import { useRematchModel } from 'app/store/model';

const {useParam} = createParam<{id: string}>();

// 關於
const HistoryScreen = (props: any) => {
  const {isRefresh} = props;
  const {t} = useTranslation();
  const scheme = 'light';
  const [{currency}] = useRematchModel('app');

  const {makeRequest} = useRequest();
  const [data, setData] = useState<any>([]);
  const [dataTotal, setDataTotal] = useState<any>(0);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [canLoadMore, setCanLoadMore] = useState(false);

  const [id] = useParam('id');

  const fetchData = async (_page = 1) => {
    setLoading(true);
    const params: any = {
      page: _page,
      pageSize: 10,
      currency: currency,
    };
    // if (id && id !== 'all') {
    //   params.brandId = Number(id);
    // }
    const res = await makeRequest(
      getTransactionHistoryPageTransactionHistory({
        page: _page,
        pageSize: 10,
      }),
    );
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

  useEffect(() => {
    if (isRefresh) {
      fetchData();
    }
  }, [isRefresh]);

  const onSearch = (text) => {
    // setSearchText(text);
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
      return (
        <XStack w="100%" jc={'center'} py={appScale(24)}>
          <SizableText col={'$color11'} fontSize={'$3'}>
            {t('tips.list.loading.title2')}
          </SizableText>
        </XStack>
      );
    }
  };

  return (
    <PermissionPage>
      <AppHeader2 title={t('screen.home.history')} fallbackUrl="/" />
      <SearchHeader
        placeholder={t('home.search')}
        searchText={searchText}
        setSearchText={setSearchText}
        onSearch={onSearch}
      />
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
          if (canLoadMore && !loadingMore) {
            fetchMoreData();
          }
        }}
        onMomentumScrollBegin={() => {
          setCanLoadMore(true);
        }}
        onEndReachedThreshold={50}
        onRefresh={() => {
          fetchData();
        }}
        ListFooterComponent={_renderFooter}
        ListEmptyComponent={<ListEmpty loading={loading} />}
        renderItem={({item, index}) => {
          return <HistoryDayItem key={item.day} item={item} />;
        }}
      />
    </PermissionPage>
  );
};
export default HistoryScreen;
