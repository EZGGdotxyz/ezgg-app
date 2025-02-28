/*
 * @Date: 2023-12-08 16:25:15
 * @LastEditors: yosan
 * @LastEditTime: 2025-02-28 14:32:46
 * @FilePath: /ezgg-app/packages/app/Components/CurrencyPopup/index.tsx
 */
import {AppImage, Button, ScrollView, Sheet, SizableText, Text, XStack, YStack} from '@my/ui';
import {Airplay, AlignJustify} from '@tamagui/lucide-icons';
import AppModal from 'app/Components/AppModal';
import {PrimaryColor} from 'app/config';
import {appScale} from 'app/utils';
import {useEffect, useRef} from 'react';
import {useTranslation} from 'react-i18next';
import {Link} from 'solito/link';

export type CurrencyPopupProps = {
  modalVisible: any;
  setModalVisible: (values) => void;
  currencyList: any;
  seleCtcurrency: any;
  currencyData: any;
};
// 币种选择弹窗
const CurrencyPopup: React.FC<any> = ({
  modalVisible,
  setModalVisible,
  currencyList,
  seleCtcurrency,
  currencyData,
}: CurrencyPopupProps) => {
  const {t, i18n} = useTranslation();
  const scrollViewRef = useRef<any>(null);

  useEffect(() => {
    if (modalVisible && scrollViewRef?.current && currencyData?.id && currencyList && currencyList.length > 0) {
      let scrollY = 0;

      // 计算链类型对应的基础滚动位置
      switch (currencyData.chain) {
        case 'BSC':
          scrollY = 48;
          break;
        case 'Polygon':
          scrollY = 48 * 2;
          break;
        case 'Base':
          scrollY = 48 * 3;
          break;
        default:
          break;
      }

      // 计算目标币种在列表中的位置
      let tokenIndex = -1;
      for (let chainIndex = 0; chainIndex < currencyList.length; chainIndex++) {
        const chainGroup = currencyList[chainIndex];
        for (let itemIndex = 0; itemIndex < chainGroup.tokenList.length; itemIndex++) {
          const token = chainGroup.tokenList[itemIndex];
          if (token?.id === currencyData?.id) {
            tokenIndex = itemIndex;
            break;
          }
        }
        if (tokenIndex !== -1) break;
      }

      // 如果找到目标币种，计算最终滚动位置并执行滚动
      if (tokenIndex !== -1) {
        const finalScrollY = scrollY + tokenIndex * 56;
        setTimeout(() => {
          scrollViewRef?.current && scrollViewRef?.current.scrollTo({x: 0, y: finalScrollY, animated: true});
        });
      }
    }
  }, [currencyData, currencyList, scrollViewRef, modalVisible]);

  return (
    <Sheet
      animation="medium"
      modal
      dismissOnSnapToBottom
      open={modalVisible}
      onOpenChange={setModalVisible}
      snapPoints={[50]}
    >
      <Sheet.Overlay animation="medium" enterStyle={{opacity: 0}} exitStyle={{opacity: 0}} />
      <Sheet.Handle />
      <Sheet.Frame justifyContent="center" w="100%" alignItems="center">
        <Sheet.ScrollView ref={scrollViewRef} w="100%" bc="$background">
          <YStack pt="$4" pb="$4" style={{width: '100vw'}}>
            {currencyList &&
              currencyList.length > 0 &&
              currencyList?.map((item: any, index: number) => {
                return (
                  <YStack key={item?.chain + 'id' + index}>
                    <XStack ai="center" pl={appScale(24)} pr={appScale(24)} h={48}>
                      <SizableText fontSize={'$5'} color={'#212121'} mr={'$4'}>
                        {item?.chain}
                      </SizableText>
                      <XStack h={2} flex={1} bc={'rgba(238, 238, 238, 1)'}></XStack>
                    </XStack>
                    {item?.tokenList.map((dayItem, index) => (
                      <Button
                        unstyled
                        pressStyle={{
                          opacity: 0.85,
                        }}
                        // bbw={1}
                        // bbc={index !== item.tokenList.length - 1 ? '#E1E1E1' : '$background'}
                        bc={currencyData?.id === dayItem?.id ? PrimaryColor : '#fff'}
                        key={dayItem?.id + 'id' + index}
                        flexDirection="column"
                        w="100%"
                        h={56}
                        // pb={appScale(16)}
                        // pt={appScale(16)}
                        ai="flex-end"
                        jc="flex-end"
                        onPress={() => {
                          seleCtcurrency(dayItem);
                        }}
                      >
                        <XStack
                          flex={1}
                          h={appScale(48)}
                          pr={appScale(24)}
                          pl={appScale(24)}
                          w="100%"
                          ai={'center'}
                          jc={'space-between'}
                        >
                          <AppImage
                            width={appScale(48)}
                            height={appScale(48)}
                            src={require(`app/assets/images/token/${dayItem.token}.png`)}
                            type="local"
                          />
                          <SizableText color={'#212121'} size={'$5'} fow={'600'}>
                            {dayItem?.token}
                          </SizableText>
                        </XStack>

                        {index !== item.tokenList.length - 1 && (
                          <XStack h={2} width={'80%'} bc={'rgba(238, 238, 238, 1)'}></XStack>
                        )}
                      </Button>
                    ))}
                  </YStack>
                );
              })}
          </YStack>
        </Sheet.ScrollView>
      </Sheet.Frame>
    </Sheet>
  );
};

export default CurrencyPopup;
