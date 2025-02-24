/*
 * @Date: 2023-12-08 16:25:15
 * @LastEditors: snapxlabs
 * @LastEditTime: 2024-08-04 18:04:50
 * @FilePath: /snapx-nfc-app-merchants/packages/app/pages/auth/login/components/RestaurantPopup/index.tsx
 */
import {AppImage, Button, ScrollView, SizableText, Text, XStack, YStack} from '@my/ui';
import {Airplay, AlignJustify, ChevronRight} from '@tamagui/lucide-icons';
import AppModal from 'app/Components/AppModal';
import {PrimaryColor} from 'app/config';
import {appScale} from 'app/utils';
import {useEffect, useRef} from 'react';
import {useTranslation} from 'react-i18next';
import {Link} from 'solito/link';

export type RestaurantPopupProps = {
  modalVisible: any;
  setModalVisible: (values) => void;
  restaurantUserList: any;
  selectCountry: any;
  restaurantInfo: any;
};

// 地区选择弹窗
const RestaurantPopup: React.FC<any> = ({
  modalVisible,
  setModalVisible,
  restaurantUserList,
  selectCountry,
  restaurantInfo,
}: RestaurantPopupProps) => {
  const {t, i18n} = useTranslation();
  const scrollViewRef = useRef(null);

  return (
    <AppModal zIndex={12} setModalVisible={setModalVisible} modalVisible={modalVisible}>
      <YStack h={400} w="100%" pos={'absolute'} ai={'center'} jc={'center'} b={0} l={0} bc="$background">
        <ScrollView ref={scrollViewRef} w="100%">
          <YStack pt="$3" pb="$3">
            {restaurantUserList &&
              restaurantUserList.length > 0 &&
              restaurantUserList?.map((item: any, index: number) => {
                return (
                  <Button
                    unstyled
                    pressStyle={{
                      opacity: 0.85,
                    }}
                    bbw={1}
                    bbc={index !== restaurantUserList.length - 1 ? '#E1E1E1' : '$background'}
                    bc={restaurantInfo?.id === item?.id ? PrimaryColor : '$background'}
                    key={item?.id + 'id' + index}
                    jc={'space-between'}
                    flexDirection="row"
                    w="100%"
                    h={56}
                    pl="$4"
                    pr="$4"
                    ai="center"
                    onPress={() => {
                      selectCountry(item);
                    }}
                  >
                    <XStack>
                      <XStack width={appScale(24)} height={appScale(24)} borderRadius={appScale(12)} overflow="hidden">
                        <AppImage
                          width={appScale(24)}
                          height={appScale(24)}
                          type={item?.cover ? '' : 'local'}
                          src={item?.cover || require('app/assets/images/v2/token3.png')}
                        />
                      </XStack>
                      <SizableText ml="$2" color={'$color'} size={'$4'} fow={'600'}>
                        {`${i18n.language === 'zh_HK' ? item?.name : item?.en_name}`}
                      </SizableText>
                    </XStack>
                    <ChevronRight color={'$color'} />
                  </Button>
                  // </YStack>
                );
              })}
          </YStack>
        </ScrollView>
      </YStack>
    </AppModal>
  );
};

export default RestaurantPopup;
