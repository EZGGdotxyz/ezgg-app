/*
 * @Date: 2023-12-18 14:37:38
 * @LastEditors: yosan
 * @LastEditTime: 2025-03-07 14:26:20
 * @FilePath: /ezgg-app/packages/app/pages/home/pay/contact/index.tsx
 */
import {
  AppHeader,
  AppHeaderProps,
  HeaderBackButton,
  Paragraph,
  XStack,
  YStack,
  SizableText,
  AppImage,
  ScrollView,
} from '@my/ui';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import PermissionPage from 'app/Components/PermissionPage';
import AppButton from 'app/Components/AppButton';
import {appScale, isIphoneX} from 'app/utils';
import AppHeader2 from 'app/Components/AppHeader2';
import SearchHeader from 'app/Components/SearchHeader';
import {PrimaryColor} from 'app/config';
import ContactItem from './components/ContactItem';
import {useRouter} from 'solito/router';
import {createParam} from 'solito';
import {FlatList} from 'react-native';
import ListEmpty from 'app/Components/ListEmpty';
import useRequest from 'app/hooks/useRequest';
import {getUserPageMember} from 'app/servers/api/member';
import {useDispatch} from 'react-redux';
import {Dispatch} from 'app/store';
import {useRematchModel} from 'app/store/model';
const {useParams} = createParam<any>();

// 发送
const SendToScreen = ({isRefresh, type}: any) => {
  const {t} = useTranslation();
  const {params} = useParams();
  const {replace} = useRouter();
  const {makeRequest} = useRequest();
  const dispatch = useDispatch<Dispatch>();
  const [{payLinkData}] = useRematchModel('user');

  const [searchText, setSearchText] = useState('');
  const [search, setSearch] = useState('');
  const [list, setList] = useState<any>([]);

  const [data, setData] = useState<any>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [canLoadMore, setCanLoadMore] = useState(false);

  const fetchData = async (_page = 1) => {
    setLoading(true);
    const params: any = {
      page: _page,
      pageSize: 10,
      recent: true,
    };
    if (search) {
      params.search = search;
    }
    const res = await makeRequest(getUserPageMember(params));
    if (res?.data?.record && res?.data?.record.length > 0) {
      if (_page === 1) {
        setData(res.data.record);
      } else {
        setData([...data, ...res.data.record]);
      }
      setPage(_page);
      setLoading(false);
      setTotal(res?.data?.totalCount || 0);
      setCanLoadMore(res.data.record.length < (res?.data?.totalCount || 0));
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
  }, [search, isRefresh]);

  const onSubmit = (item: any) => {
    if (params?.id && params?.id === payLinkData?.id) {
      dispatch.user.updateState({
        payLinkData: {
          ...payLinkData,
          userId: item?.id,
          user: item,
          transactionType:
            item?.id === 'anyone'
              ? type === 'send'
                ? 'PAY_LINK'
                : 'REQUEST_LINK'
              : type === 'send'
              ? 'SEND'
              : 'REQUEST',
        },
      });
      replace(`/home/${type}/amount?id=${payLinkData?.id}`);
    } else {
      const id = new Date().getTime() + Math.random();
      dispatch.user.updateState({
        payLinkData: {
          currencyData: {},
          id: id,
          userId: item?.id,
          user: item,
          transactionType:
            item?.id === 'anyone'
              ? type === 'send'
                ? 'PAY_LINK'
                : 'REQUEST_LINK'
              : type === 'send'
              ? 'SEND'
              : 'REQUEST',
        },
      });
      replace(`/home/${type}/amount?id=${id}`);
    }
  };

  const onSearch = (text) => {
    // setSearchText(text);
    setSearch(text);
    console.log('🚀 ~ onSearch ~ text:', text);
  };

  /**
   * 加载时加载动画
   */
  const _renderFooter = () => {
    if (!loading) {
      if (data.length === 0) {
        return (
          <XStack w="100%" jc={'center'} py={appScale(24)}>
            <SizableText col={'$color11'} fontSize={'$3'}>
              {t('tips.list.loading.title')}
            </SizableText>
          </XStack>
        );
      } else {
        if (data.length === 0) {
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
      <AppHeader2
        title={type === 'send' ? t('screen.home.sendTo') : t('screen.home.requestFrom')}
        onBack={() => {
          dispatch.user.updateState({payLinkData: {}});
          replace('/');
        }}
        isQr={true}
        type={type}
        fallbackUrl="/"
      />
      <SearchHeader
        searchText={searchText}
        setSearchText={setSearchText}
        onSearch={onSearch}
        placeholder={t('home.send.search')}
      />
      <YStack flexShrink={0} w={'100%'} pl={appScale(24)} pr={appScale(24)} pb={appScale(24)}>
        <XStack w={'100%'} pb={appScale(12)}>
          <YStack w={'50%'}>
            <SizableText
              h={appScale(30)}
              w={'100%'}
              lh={appScale(30)}
              ta={'center'}
              fontSize={'$4'}
              color={'#212121'}
              fow="600"
            >
              {t('home.send.recent')}
            </SizableText>
          </YStack>
        </XStack>
        <XStack pos={'relative'} w={'100%'} h={2} bc={'#EEEEEE'}>
          <XStack pos="absolute" w="50%" t={-1} h={4} bc={PrimaryColor} borderRadius={2}></XStack>
        </XStack>
      </YStack>
      {/* <YStack flex={1}>
        <ScrollView bc="$background">
          <ContactList onSubmit={onSubmit} />
        </ScrollView>
      </YStack> */}
      <FlatList
        data={data}
        refreshing={loading}
        keyExtractor={(item, index) => item?.id}
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#f8f8f8',
          flex: 1,
        }}
        contentContainerStyle={{
          flexGrow: 1,
          padding: appScale(16),
          backgroundColor: '#f8f8f8',
        }}
        onEndReached={() => {
          console.log('🚀 ~ SendToScreen ~ canLoadMore:');
          if (canLoadMore && !loadingMore) {
            fetchMoreData();
          }
        }}
        onMomentumScrollBegin={() => {
          console.log('🚀 ~ SendToScreen ~ canLoadMore2:');
          setCanLoadMore(true);
        }}
        onEndReachedThreshold={50}
        onRefresh={() => {
          fetchData();
        }}
        ListFooterComponent={_renderFooter}
        ListEmptyComponent={<ListEmpty loading={loading} />}
        renderItem={({item, index}) => (
          <XStack w="100%" jc={'center'} key={item.id + 'id' + index}>
            <ContactItem isBorderBottom={index === data.length - 1} onSubmit={onSubmit} item={item} itemKey={item.id} />
          </XStack>
        )}
      />
      <XStack
        flexShrink={0}
        pl={appScale(24)}
        pr={appScale(24)}
        pt={appScale(12)}
        pb={appScale(isIphoneX() ? 46 : 12)}
        w="100%"
        ai={'center'}
        jc={'center'}
        borderTopWidth={1}
        borderColor={'#F2F2F2'}
      >
        <AppButton
          onPress={() => {
            onSubmit({id: 'anyone'});
          }}
        >
          {t('home.send.paylink')}
        </AppButton>
      </XStack>
    </PermissionPage>
  );
};
export default SendToScreen;
