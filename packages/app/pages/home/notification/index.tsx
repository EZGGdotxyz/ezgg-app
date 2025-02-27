/*
 * @Date: 2023-12-18 14:37:38
 * @LastEditors: yosan
 * @LastEditTime: 2025-02-27 18:11:58
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
} from '@my/ui';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import PermissionPage from 'app/Components/PermissionPage';
import History from '../../index/components/History';
import {appScale} from 'app/utils';
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

const {useParam} = createParam<{id: string}>();

type ItemProps = {
  item: any;
  isBorderBottom: boolean;
  onWrite: (item: any) => void;
  itemKey: any;
};
const Item: React.FC<any> = ({item, isBorderBottom, itemKey, onWrite}: ItemProps) => {
  const {t, i18n} = useTranslation();
  const {push} = useRouter();
  const scheme = 'light';

  const onPress = () => {
    onWrite(item);
  };
  return (
    <YStack
      w={appScale(343)}
      p="$3"
      borderRadius={16}
      mb="$2"
      bc={'$background'}
      style={{
        backgroundColor: '#fff',
      }}
      ai="center"
      width={'100%'}
      jc={'space-between'}
    >
      <XStack jc={'space-between'} w="100%">
        <YStack width={'100%'}>
          {/* <Button
                    unstyled       pressStyle={{
                  opacity: 0.85,
                }}
            mb={'$2'}
            w={'100%'}
            flexDirection="row"
            onPress={() => {
              push('/restaurant/' + item?.restaurant?.id);
            }}
          >
            <SizableText w="100%" color={'$blue11'} size={'$3'} numberOfLines={1}>
              {i18n.language === 'zh_HK' ? item?.restaurant?.name : item?.restaurant?.en_name}
            </SizableText>
          </Button> */}
          <XStack w={'100%'} mb={'$2'}>
            <SizableText color={'$color'} w="100%" fow="600" size={'$4'} numberOfLines={1}>
              {i18n.language === 'zh_HK' ? item?.luckyDrawRuleTitle : item?.luckyDrawRuleEn_title}
            </SizableText>
          </XStack>

          {item?.luckyDrawGiftName && (
            <XStack w="100%" jc={'space-between'}>
              <XStack width="70%" ai="center">
                <XStack flexShrink={0} h={appScale(54)} borderRadius={8} overflow="hidden">
                  <AppImage
                    web={{
                      alt: '',
                      src: item?.luckyDrawGiftPhoto || require('app/assets/images/v2/gift2.png'),
                      width: appScale(54),
                      height: appScale(54),
                    }}
                    type={item?.luckyDrawGiftPhoto ? '' : 'local'}
                    native={{
                      source: {
                        width: appScale(54),
                        height: appScale(54),
                        uri: item?.luckyDrawGiftPhoto || require('app/assets/images/v2/gift2.png'),
                      },
                    }}
                  />
                </XStack>
                <YStack w="100%" flex={1} pl="$2">
                  <Button
                    mb={'$2'}
                    unstyled
                    flexDirection="row"
                    space={0}
                    pressStyle={{opacity: 0.85}}
                    onPress={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      push('/card/' + item?.brandId);
                    }}
                  >
                    <SizableText color={'$color'} fow="600" size={'$2'} numberOfLines={1}>
                      {i18n.language === 'zh_HK' ? item?.restaurant?.name : item?.restaurant?.en_name}
                    </SizableText>
                    <ChevronRight color={'$color'} />
                  </Button>
                  <XStack width="100%" ai={'center'}>
                    <XStack flexShrink={0} pr="$2">
                      <AppImage
                        width={appScale(16)}
                        height={appScale(16)}
                        src={require('app/assets/images/v2/dark/currency.png')}
                        type="local"
                      />
                    </XStack>
                    <SizableText
                      color={PrimaryColor}
                      fow="600"
                      size={'$3'}
                      flex={1}
                      numberOfLines={2}
                      style={{overflowWrap: 'break-word'}}
                    >
                      {`${i18n.language === 'zh_HK' ? item?.luckyDrawGiftName : item?.luckyDrawGiftEN_name}`}
                      {`x ${item?.luckyDrawRuleQuantity}`}
                    </SizableText>
                  </XStack>
                </YStack>
              </XStack>
              <XStack w="30%" ai={'center'} jc={'flex-end'}>
                <Button
                  unstyled
                  pressStyle={{
                    opacity: 0.85,
                  }}
                  ai="center"
                  jc={'center'}
                  style={{
                    height: 40,
                    width: '100%',
                    borderRadius: 10,
                  }}
                  bc={item?.isSettlement ? '#afafaf' : '$color'}
                  color={'$color1'}
                  disabled={item?.isSettlement}
                  onPress={() => {
                    push({
                      pathname: '/my/prize/use/' + item?.memberGiftExchangeId,
                      query: {
                        type: 'luckyDraw',
                        restaurantId: item?.restaurant?.id,
                      },
                    });
                  }}
                  fontSize={'$3'}
                >
                  {item?.isSettlement ? t('operate.button.onWrite') : t('operate.button.write')}
                </Button>
              </XStack>
            </XStack>
          )}
          <XStack>
            <SizableText color={'#868686'} size={'$2'}>
              {dayjs(item?.createAt).format('YYYY-MM-DD HH:mm:ss')}
            </SizableText>
          </XStack>
        </YStack>
      </XStack>
    </YStack>
  );
};

// 關於
const NotificationScreen = (props: any) => {
  const {isRefresh} = props;
  const {t} = useTranslation();
  const scheme = 'light';

  const HeaderLeft: AppHeaderProps['headerRight'] = () => <HeaderBackButton fallbackUrl="/my"></HeaderBackButton>;
  const {makeRequest} = useRequest();
  const [data, setData] = useState<any>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [searchText, setSearchText] = useState('');

  const [writeData, setWriteData] = useState<any>({});

  const [modalVisible, setModalVisible] = useState(false);
  const [canLoadMore, setCanLoadMore] = useState(false);

  const [id] = useParam('id');

  const fetchData = async (_page = 1) => {
    setLoading(true);
    const params: any = {
      page: _page,
      pageSize: 10,
    };
    if (id && id !== 'all') {
      params.brandId = Number(id);
    }
    // const res = await makeRequest(memberLuckyDrawRouterPageMemberLuchyDraw(params));
    const res: any = [];
    if (res?.record && res?.record.length > 0) {
      if (_page === 1) {
        setData(res.record);
      } else {
        setData([...data, ...res.record]);
      }
      setPage(_page);
      setLoading(false);
      setTotal(res.totalCount);
    } else {
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

  const onWrite = (item: any) => {
    setWriteData({
      restaurantId: item?.restaurant?.id,
      recordType: 'luckyDraw',
      recordId: item?.memberGiftExchangeId,
      name: item?.luckyDrawGiftName,
      en_name: item?.luckyDrawGiftEN_name,
      description: item?.luckyDrawGiftDescription,
      en_description: item?.luckyDrawGiftEn_description,
      photo: item?.luckyDrawGiftPhoto,
      quantity: item?.luckyDrawRuleQuantity,
    });
    setModalVisible(true);
  };

  return (
    <PermissionPage>
      <AppHeader2 isSettings title={t('screen.home.notification.title')} fallbackUrl="/" />
      <FlatList
        data={data}
        refreshing={loading}
        keyExtractor={(item, index) => item?.id}
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#fff',
          flex: 1,
        }}
        contentContainerStyle={{
          flexGrow: 1,
          padding: appScale(16),
          backgroundColor: '#fff',
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
            <Item isBorderBottom={index === data.length - 1} onWrite={onWrite} item={item} itemKey={item.id} />
          </XStack>
        )}
      />
    </PermissionPage>
  );
};
export default NotificationScreen;
