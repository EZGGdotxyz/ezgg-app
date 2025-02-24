/*
 * @Date: 2023-12-08 16:25:15
 * @LastEditors: snapxlabs
 * @LastEditTime: 2024-07-22 17:18:49
 * @FilePath: /snapx-nfc-app/packages/app/pages/auth/login/components/RecommendList/index.tsx
 */
import {ScrollView, SizableText, Text, XStack, YStack} from '@my/ui';
import {Airplay, AlignJustify} from '@tamagui/lucide-icons';
import RestaurantItem from 'app/Components/RestaurantItem';
import useRequest from 'app/hooks/useRequest';
import useResponse from 'app/hooks/useResponse';
import {brandRouterPageRecommendedBrand} from 'app/servers/api/6005Huiyuanpinpaixinxi';
import {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useColorScheme} from 'react-native';
import {Link} from 'solito/link';

export type RecommendListProps = {};
// 首页 餐厅详情
const RecommendList: React.FC<any> = (props: RecommendListProps) => {
  const {t, i18n} = useTranslation();
  const [restaurantList, setRestaurantList] = useState<any>([]);
  const {makeRequest} = useRequest();
  const {responseHandling} = useResponse();
  const scheme = 'light'

  const _getRecommendedBrand = async () => {
    // 推荐品牌
    const res = await makeRequest(
      brandRouterPageRecommendedBrand({
        page: 1,
        pageSize: 10,
      }),
    );

    if (res?.record) {
      const _restaurantList = res?.record.map((item) => {
        let restaurant = item?.restaurants.find((item) => item.isMainStore);
        if (!restaurant) {
          restaurant = item?.restaurants[0];
        }
        return {
          ...item,
          restaurant,
          membership: {
            accessTimes: '0',
            firstTimeAccess: '',
            memberLevel: {
              name: '',
              en_name: '',
            },
          },
        };
      });
      setRestaurantList(_restaurantList);
    }
  };

  useEffect(() => {
    _getRecommendedBrand();
  }, []);

  const size = responseHandling(290, 407);

  return (
    <YStack pb="$6" width={'100%'} jc={'center'} ai={'center'} minHeight={size.height + 32}>
      <ScrollView
        horizontal
        contentContainerStyle={{
          height: '100%',
          flexGrow: 1,
          backgroundColor: scheme === 'dark' ? '#151515' : '#f8f8f8',
        }}
        w="100%"
      >
        <XStack
          flex={1}
          p={'$4'}
          minHeight={size.height}
          alignItems="center"
          jc={restaurantList.length <= 1 ? 'center' : 'flex-start'}
        >
          {restaurantList.length > 0 &&
            restaurantList?.map((item: any, index) => (
              <XStack key={item?.id+ 'id' + index} pr={restaurantList.length <= 1 ? 0 : index >= 0 ? '$4' : 0}>
                <RestaurantItem
                  // type="list"
                  membership={item?.membership}
                  restaurantInfo={item?.restaurant}
                  key={item?.id}
                  brandId={item?.id}
                />
              </XStack>
            ))}
        </XStack>
      </ScrollView>
    </YStack>
  );
};

export default RecommendList;
