/*
 * @Date: 2023-12-18 14:37:38
 * @LastEditors: yosan
 * @LastEditTime: 2025-03-19 14:49:38
 * @FilePath: /ezgg-app/packages/app/pages/home/notification/index.tsx
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
  useToastController,
} from '@my/ui';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import PermissionPage from 'app/Components/PermissionPage';
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
import {
  getNotificationGetUnreadCount,
  getNotificationPageNotification,
  postNotificationUpdateNotificationStatusId,
} from 'app/servers/api/notification';
import {useDispatch} from 'react-redux';
import {Dispatch} from 'app/store';
import Item from './components/Item';
import DayItem from './components/DayItem';
import DeclineRequestPopup from '../history/detail/components/DeclineRequestPopup';
import AcceptRequestPopup from '../history/detail/components/AcceptRequestPopup';
import AppLoading from 'app/Components/AppLoading';
const {useParam} = createParam<{id: string}>();
import useResponse from 'app/hooks/useResponse';

// 關於
const NotificationScreen = (props: any) => {
  const {isRefresh} = props;
  const {t} = useTranslation();
  const dispatch = useDispatch<Dispatch>();
  const {makeRequest} = useRequest();
  const [data, setData] = useState<any>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [dataTotal, setDataTotal] = useState<any>(0);
  const [declineRequestVisible, setDeclineRequestVisible] = useState(false);
  const [acceptRequestVisible, setAcceptRequestVisible] = useState(false);
  const [orderData, setOrderData] = useState<any>({});
  const [modalVisible, setModalVisible] = useState(false);
  const [canLoadMore, setCanLoadMore] = useState(false);
  const toast = useToastController();
  const [isLoading, setIsLoading] = useState(false);
  const {appScale} = useResponse();

  const [id] = useParam('id');

  const fetchData = async (_page = 1) => {
    setLoading(true);
    const params: any = {
      page: _page,
      pageSize: 10,
    };
    // if (id && id !== 'all') {
    //   params.brandId = Number(id);
    // }
    const res = await makeRequest(getNotificationPageNotification(params));
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
      _getUnread();
    }
  }, [isRefresh]);

  const onSearch = (text) => {
    // setSearchText(text);
  };

  // 获取 未读消息数
  const _getUnread = async () => {
    const res = await makeRequest(getNotificationGetUnreadCount());
    if (res?.data) {
      dispatch.app.updateState({
        unread: res?.data,
      });
    } else {
      dispatch.app.updateState({
        unread: 0,
      });
    }
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

  const _postNotificationUpdateNotificationStatusId = async (_orderData: any) => {
    // setIsLoading(true);
    const res = await makeRequest(postNotificationUpdateNotificationStatusId({id: Number(_orderData?.id)}));
    if (res?.code === '0') {
      // fetchData();
      // _getUnread();
      // toast.show(t('tips.list.read'));
      setData(
        data.map((value: any) => {
          if (dayjs(_orderData.createAt).format('YYYY-MM-DD') === value.day) {
            let list = value.list.map((item: any) => {
              if (item.id === _orderData.id) {
                return {
                  ...item,
                  status: 1,
                };
              }
              return item;
            });
            return {
              ...value,
              list: list,
            };
          } else {
            return value;
          }
        }),
      );
      toast.show(t('tips.list.read'));
    }
    // setIsLoading(false);
  };

  const onRead = (item: any, action = '') => {
    if (!item?.id) {
      return;
    }
    if (action) {
      setOrderData(item);
      if (action === 'cancel') {
        setDeclineRequestVisible(true);
      } else {
        setAcceptRequestVisible(true);
      }
      // setModalVisible(true);
    } else {
      _postNotificationUpdateNotificationStatusId(item);
    }
  };

  return (
    <PermissionPage>
      <AppHeader2 isSettings title={t('screen.home.notification.title')} fallbackUrl="/" />
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
          // padding: appScale(16),
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
        onEndReachedThreshold={0.5}
        onRefresh={() => {
          fetchData();
        }}
        ListFooterComponent={_renderFooter}
        ListEmptyComponent={<ListEmpty loading={loading} />}
        renderItem={({item, index}) => <DayItem key={item?.day} onRead={onRead} item={item} />}
      />
      <DeclineRequestPopup
        setIsLoading={setIsLoading}
        modalVisible={declineRequestVisible}
        setModalVisible={setDeclineRequestVisible}
        orderData={orderData?.transaction}
        onSuccess={async () => {
          setDeclineRequestVisible(false);
          await _postNotificationUpdateNotificationStatusId(orderData);
        }}
      />
      <AcceptRequestPopup
        setIsLoading={setIsLoading}
        modalVisible={acceptRequestVisible}
        setModalVisible={setAcceptRequestVisible}
        orderData={orderData?.transaction}
        onSuccess={async () => {
          setAcceptRequestVisible(false);
          await _postNotificationUpdateNotificationStatusId(orderData);
        }}
      />
      {isLoading && <AppLoading />}
    </PermissionPage>
  );
};
export default NotificationScreen;
