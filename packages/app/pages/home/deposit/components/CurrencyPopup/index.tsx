/*
 * @Date: 2023-12-08 16:25:15
 * @LastEditors: yosan
 * @LastEditTime: 2025-03-18 17:25:23
 * @FilePath: /ezgg-app/packages/app/pages/home/deposit/components/CurrencyPopup/index.tsx
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
  ({modalVisible, setModalVisible, currencyList, selectCurrency, currencyData}: CurrencyPopupProps, ref) => {
    const {t, i18n} = useTranslation();
    const scrollViewRef = useRef<any>(null);
    const {appScale} = useResponse();

    // useEffect(() => {
    //   if (
    //     modalVisible &&
    //     scrollViewRef?.current &&
    //     currencyData?.token?.address &&
    //     currencyList &&
    //     currencyList.length > 0
    //   ) {
    //     let scrollY = 0;

    //     // 计算链类型对应的基础滚动位置
    //     // switch (currencyData.chain) {
    //     //   case 'BSC':
    //     //     scrollY = 48;
    //     //     break;
    //     //   case 'Polygon':
    //     //     scrollY = 48 * 2;
    //     //     break;
    //     //   case 'Base':
    //     //     scrollY = 48 * 3;
    //     //     break;
    //     //   default:
    //     //     break;
    //     // }

    //     // 计算目标币种在列表中的位置
    //     let tokenIndex = -1;
    //     for (let chainIndex = 0; chainIndex < currencyList.length; chainIndex++) {
    //       const chainGroup = currencyList[chainIndex];
    //       for (let itemIndex = 0; itemIndex < chainGroup.tokenList.length; itemIndex++) {
    //         const token = chainGroup.tokenList[itemIndex];
    //         if (token?.token?.address === currencyData?.token?.address) {
    //           tokenIndex = itemIndex;
    //           break;
    //         }
    //       }
    //       if (tokenIndex !== -1) break;
    //     }

    //     // 如果找到目标币种，计算最终滚动位置并执行滚动
    //     if (tokenIndex !== -1) {
    //       const finalScrollY = scrollY + tokenIndex * 56;
    //       setTimeout(() => {
    //         scrollViewRef?.current && scrollViewRef?.current.scrollTo({x: 0, y: finalScrollY, animated: true});
    //       });
    //     }
    //   }
    // }, [currencyData, currencyList, scrollViewRef, modalVisible]);

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
                    <Button
                      unstyled
                      pressStyle={{
                        opacity: 0.85,
                      }}
                      bc={currencyData?.token?.address === item?.token?.address ? PrimaryColor : '#fff'}
                      key={item?.token?.address + 'id' + index}
                      flexDirection="row"
                      w="100%"
                      ai="center"
                      jc="space-between"
                      borderBottomWidth={1}
                      borderBottomColor={'#E0E0E0'}
                      pt={appScale(12)}
                      pb={appScale(12)}
                      pl={appScale(24)}
                      pr={appScale(24)}
                      onPress={() => {
                        selectCurrency(item);
                      }}
                    >
                      <XStack ai="center" space="$3">
                        <XStack
                          width={appScale(48)}
                          height={appScale(48)}
                          borderRadius={'$1'}
                          overflow={'hidden'}
                          bc={'#fff'}
                          ai={'center'}
                          jc={'center'}
                        >
                          <YStack
                            height={appScale(48)}
                            width={appScale(48)}
                            borderRadius={appScale(24)}
                            overflow={'hidden'}
                          >
                            {item?.token?.tokenSymbol ? (
                              <TokenIcon symbol={item?.token?.tokenSymbol} variant="background" size={appScale(48)} />
                            ) : (
                              <AppImage
                                width={appScale(48)}
                                height={appScale(48)}
                                src={require(`app/assets/images/df_token.png`)}
                                type="local"
                              />
                            )}
                          </YStack>
                        </XStack>
                        <YStack>
                          <SizableText color={'#212121'} size={'$4'} fow={'600'}>
                            {item?.token?.tokenSymbol}
                          </SizableText>
                        </YStack>
                      </XStack>
                      <XStack flexShrink={0} ai={'center'} jc={'center'}>
                        <SizableText color={'#212121'} size={'$3'} fow={'500'}>
                          {item?.tokenAmount}
                        </SizableText>
                      </XStack>
                    </Button>
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
