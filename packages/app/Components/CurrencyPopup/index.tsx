/*
 * @Date: 2023-12-08 16:25:15
 * @LastEditors: yosan
 * @LastEditTime: 2025-03-18 21:29:17
 * @FilePath: /ezgg-app/packages/app/Components/CurrencyPopup/index.tsx
 */
import {AppImage, Button, ScrollView, Sheet, SizableText, Text, XStack, YStack} from '@my/ui';
import {Airplay, AlignJustify} from '@tamagui/lucide-icons';
import {TokenIcon} from '@web3icons/react';
import AppModal from 'app/Components/AppModal';
import {PrimaryColor} from 'app/config';
import useResponse from 'app/hooks/useResponse';
import {formatNumber, formatTokenAmount} from 'app/utils';
import {useEffect, useRef, forwardRef} from 'react';
import {useTranslation} from 'react-i18next';
import {Link} from 'solito/link';

export type CurrencyPopupProps = {
  modalVisible: any;
  setModalVisible: (values) => void;
  currencyList: any;
  selectCurrency: any;
  currencyData: any;
  isRequest: boolean;
};
// 币种选择弹窗
const CurrencyPopup = forwardRef<any, any>(
  (
    {modalVisible, setModalVisible, currencyList, selectCurrency, currencyData, isRequest = false}: CurrencyPopupProps,
    ref,
  ) => {
    const {t, i18n} = useTranslation();
    const scrollViewRef = useRef<any>(null);
    const {appScale} = useResponse();

    useEffect(() => {
      if (
        modalVisible &&
        scrollViewRef?.current &&
        currencyData?.token?.address &&
        currencyList &&
        currencyList.length > 0
      ) {
        let scrollY = 0;

        // 计算链类型对应的基础滚动位置
        // switch (currencyData.chain) {
        //   case 'BSC':
        //     scrollY = 48;
        //     break;
        //   case 'Polygon':
        //     scrollY = 48 * 2;
        //     break;
        //   case 'Base':
        //     scrollY = 48 * 3;
        //     break;
        //   default:
        //     break;
        // }

        // 计算目标币种在列表中的位置
        let tokenIndex = -1;
        for (let chainIndex = 0; chainIndex < currencyList.length; chainIndex++) {
          const chainGroup = currencyList[chainIndex];
          for (let itemIndex = 0; itemIndex < chainGroup.tokenList.length; itemIndex++) {
            const token = chainGroup.tokenList[itemIndex];
            if (token?.token?.address === currencyData?.token?.address) {
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
                      <XStack ai="center" pl={appScale(24)} pr={appScale(24)} h={appScale(48)}>
                        <SizableText fontSize={'$4'} color={'#212121'} mr={'$4'}>
                          {item?.chainName}
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
                          bc={currencyData?.token?.address === dayItem?.token?.address ? PrimaryColor : '#fff'}
                          key={dayItem?.token?.address + 'id' + index}
                          flexDirection="column"
                          w="100%"
                          pb={appScale(16)}
                          pt={appScale(16)}
                          ai="flex-end"
                          jc="flex-end"
                          onPress={() => {
                            selectCurrency(dayItem);
                          }}
                        >
                          <XStack flex={1} h={appScale(48)} w="100%" ai={'center'} jc={'space-between'}>
                            <XStack flex={1} h={appScale(48)} pr={appScale(24)} pl={appScale(24)} ai={'center'}>
                              <XStack w={appScale(48)} h={appScale(48)} overflow={'hidden'} br={appScale(24)}>
                                {dayItem?.token?.tokenSymbol && (
                                  <TokenIcon
                                    symbol={dayItem?.token?.tokenSymbol}
                                    variant="background"
                                    size={appScale(48)}
                                  />
                                )}
                              </XStack>
                              {/* <AppImage
                            width={appScale(48)}
                            height={appScale(48)}
                            src={require(`app/assets/images/token/${dayItem.token}.png`)}
                            type="local"
                          /> */}
                              <SizableText ml={appScale(16)} color={'#212121'} size={'$4'} fow={'600'}>
                                {dayItem?.token?.tokenSymbol}
                              </SizableText>
                            </XStack>
                            {!isRequest && (
                              <XStack flexShrink={0} ai={'center'} jc={'center'} pl={appScale(24)} pr={appScale(24)}>
                                <SizableText color={'#212121'} size={'$3'} fow={'500'}>
                                  {dayItem?.tokenAmount}
                                </SizableText>
                              </XStack>
                            )}
                          </XStack>

                          {index !== item.tokenList.length - 1 && (
                            <XStack
                              h={2}
                              width={'80%'}
                              bc={
                                currencyData?.token?.address === dayItem?.token?.address
                                  ? PrimaryColor
                                  : 'rgba(238, 238, 238, 1)'
                              }
                            ></XStack>
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
  },
);

export default CurrencyPopup;
