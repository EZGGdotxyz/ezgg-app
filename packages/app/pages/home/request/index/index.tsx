/*
 * @Date: 2023-12-18 14:37:38
 * @LastEditors: yosan
 * @LastEditTime: 2025-02-27 18:16:32
 * @FilePath: /ezgg-app/packages/app/pages/home/request/index/index.tsx
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
import ContactItem from '../../send/index/components/ContactItem';
import {useRouter} from 'solito/router';
import {createParam} from 'solito';
import {getUserPageMember} from 'app/servers/api/member';
import {FlatList} from 'react-native';
import ListEmpty from 'app/Components/ListEmpty';
import useRequest from 'app/hooks/useRequest';
const {useParams} = createParam<any>();

// 发送
const SendToScreen = ({isRefresh}: any) => {
  const {t} = useTranslation();
  const {params} = useParams();
  const {push} = useRouter();
  const {makeRequest} = useRequest();

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
    };
    if (search) {
      params.search = search;
    }
    const res = await makeRequest(getUserPageMember(params));
    if (res?.data?.record && res?.data?.record.length > 0) {
      const _record = res.data.record.map((item: any) => {
        const _item = item;
        return _item;
      });

      if (_page === 1) {
        setData(_record);
      } else {
        setData([...data, ..._record]);
      }
      setPage(_page);
      setLoading(false);
      setTotal(res?.data?.totalCount);
    } else {
      setData([]);
      setTotal(0);
      setLoading(false);
    }
  };

  const fetchMoreData = async () => {
    if (!loadingMore && data.length < total) {
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

  const onSubmit = (userId = 'anyone') => {
    push(
      `/home/request/amount?userId=${userId}&token=${params?.token || ''}&chain=${params?.chain || ''}&amount=${
        params?.amount || ''
      }`,
    );
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
      if (data.length === total) {
        return (
          <XStack w="100%" jc={'center'}>
            <SizableText col={'$color11'} fontSize={'$3'}>
              {t('tips.list.loading.title')}
            </SizableText>
          </XStack>
        );
      } else {
        if (data.length > 0) {
          return (
            <XStack w="100%" jc={'center'}>
              <SizableText col={'$color11'} fontSize={'$3'}>
                {t('tips.list.loading.title2')}
              </SizableText>
            </XStack>
          );
        }
      }
    } else {
      return <XStack w="100%" jc={'center'}></XStack>;
    }
  };

  return (
    <PermissionPage>
      <AppHeader2 title={t('screen.home.requestFrom')} isQr={true} type={'request'} fallbackUrl="/" />
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
              fontSize={'$5'}
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
          if (canLoadMore) {
            fetchMoreData();
            setCanLoadMore(false);
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
        pt={12}
        pb={appScale(isIphoneX() ? 46 : 12)}
        w="100%"
        ai={'center'}
        jc={'center'}
        borderTopWidth={1}
        borderColor={'#F2F2F2'}
      >
        <AppButton
          onPress={() => {
            onSubmit();
          }}
        >
          {t('home.send.paylink')}
        </AppButton>
      </XStack>
    </PermissionPage>
  );
};
export default SendToScreen;
