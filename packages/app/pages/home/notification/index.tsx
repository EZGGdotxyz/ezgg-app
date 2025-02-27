/*
 * @Date: 2023-12-18 14:37:38
 * @LastEditors: yosan
 * @LastEditTime: 2025-02-27 21:21:03
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

  return (
    <YStack
      p={appScale(24)}
      bc={'$background'}
      style={{
        backgroundColor: '#fff',
      }}
      ai="center"
      width={'100%'}
      jc={'space-between'}
    >
      <XStack jc={'space-between'} w="100%">
        <YStack flex={1}>
          <XStack w={'100%'} jc={'space-between'} mb={'$2'}>
            <SizableText color={'#212121'} w="100%" fow="600" size={'$6'} pr={'$1'}>
              {item?.title}
            </SizableText>
            <XStack space="$3">
              {item?.status === 'unread' && (
                <Button unstyled>
                  <AppImage
                    width={appScale(32)}
                    height={appScale(32)}
                    src={require('app/assets/images/error.png')}
                    type="local"
                  />
                </Button>
              )}
              {item?.status === 'unread' && (
                <Button unstyled>
                  <AppImage
                    width={appScale(32)}
                    height={appScale(32)}
                    src={require('app/assets/images/success.png')}
                    type="local"
                  />
                </Button>
              )}
            </XStack>
          </XStack>

          {item?.description && (
            <SizableText color={'#424242'} size={'$3'} fow={'500'}>
              {item?.description}
            </SizableText>
          )}
          <XStack w="100%" jc={'space-between'} mb={'$2'}>
            <SizableText color={'#616161'} size={'$1'} fow={'500'}>
              {dayjs(item?.createAt).format('HH:mm A')}
            </SizableText>
          </XStack>
        </YStack>
        <XStack flexShrink={0} jc={'flex-end'} ai={'center'} w={36}>
          <ChevronRight color={'#757575'} size={24} />
        </XStack>
      </XStack>
    </YStack>
  );
};

// 關於
const NotificationScreen = (props: any) => {
  const {isRefresh} = props;
  const {t} = useTranslation();
  const scheme = 'light';

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
    const res: any = {
      record: [
        {
          id: 1,
          title: '系统更新通知',
          description: '我们的应用已更新到最新版本，新增了多项实用功能，欢迎体验！',
          createAt: '2024-02-27 09:30:00',
          status: 'unread',
        },
        {
          id: 2,
          title: '账户安全提醒',
          description: '检测到您的账户在新设备上登录，如非本人操作请及时修改密码。',
          createAt: '2024-02-27 10:15:00',
          status: 'read',
        },
        {
          id: 3,
          title: '交易成功提醒',
          description: '您的转账交易已成功完成，交易金额：$1,000.00',
          createAt: '2024-02-27 11:20:00',
          status: 'read',
        },
        {
          id: 4,
          title: '优惠活动通知',
          description: '限时优惠活动即将开始，参与即可获得额外奖励！',
          createAt: '2024-02-27 13:45:00',
          status: 'unread',
        },
        {
          id: 5,
          title: '系统维护通知',
          description: '系统将于今晚23:00-次日凌晨2:00进行例行维护，请提前做好相关安排。',
          createAt: '2024-02-27 15:00:00',
          status: 'unread',
        },
      ],
    };
    if (res?.record?.length > 0) {
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
          // padding: appScale(16),
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
