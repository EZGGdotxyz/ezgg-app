/*
 * @Date: 2023-12-08 16:25:15
 * @LastEditors: yosan
 * @LastEditTime: 2025-04-19 20:28:18
 * @FilePath: /ezgg-app/packages/app/pages/home/index/components/ChainListPopup/index.tsx
 */
import {AppImage, Button, Paragraph, ScrollView, Sheet, SizableText, Text, XStack, YStack} from '@my/ui';
import {Airplay, AlignJustify, Check, ChevronRight, GalleryVerticalEnd, List} from '@tamagui/lucide-icons';
import {PrimaryColor} from 'app/config';
import {useTranslation} from 'react-i18next';
import {forwardRef, useRef} from 'react';
import useResponse from 'app/hooks/useResponse';

export type ChainListPopupProps = {
  selectedType: any;
  setSelectedType: (values: any) => void;
  sheetOpen: any;
  setSheetOpen: (values) => void;
  tokenTypes: {chainId: string; name: string; chainIcon: string}[];
};

// 使用forwardRef正确实现组件
const ChainListPopup = forwardRef<any, ChainListPopupProps>((props, ref) => {
  const {selectedType, setSelectedType, sheetOpen, setSheetOpen, tokenTypes} = props;
  const {t, i18n} = useTranslation();
  const scrollViewRef = useRef<any>(null);
  const {appScale} = useResponse();

  return (
    <Sheet
      ref={ref}
      animation="medium"
      modal
      dismissOnSnapToBottom
      open={sheetOpen}
      onOpenChange={setSheetOpen}
      snapPoints={[36]}
    >
      <Sheet.Overlay animation="medium" enterStyle={{opacity: 0}} exitStyle={{opacity: 0}} />
      <Sheet.Handle />
      <Sheet.Frame justifyContent="center" w="100%" alignItems="center">
        <Sheet.ScrollView ref={scrollViewRef} w="100%" bc="$background">
          <YStack style={{width: '100vw'}}>
            {tokenTypes.map((type, index) => (
              <Button
                unstyled
                pressStyle={{
                  opacity: 0.85,
                }}
                bc={selectedType?.chainId === type?.chainId ? PrimaryColor : '#fff'}
                key={type.chainId}
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
                  setSelectedType(type);
                  setSheetOpen(false);
                }}
              >
                <XStack ai="center" space="$3">
                  <XStack
                    width={appScale(48)}
                    height={appScale(48)}
                    borderRadius={'$1'}
                    overflow={'hidden'}
                    bc={selectedType?.chainId === type?.chainId ? PrimaryColor : '#fff'}
                    ai={'center'}
                    jc={'center'}
                  >
                    {type?.chainIcon ? (
                      <AppImage
                        width={appScale(48)}
                        height={appScale(48)}
                        src={require(`app/assets/images/chain/${type.chainIcon}.png`)}
                        type="local"
                      />
                    ) : (
                      <List size={appScale(32)} />
                    )}
                  </XStack>
                  <YStack>
                    <SizableText color={'#212121'} size={'$4'} fow={'600'}>
                      {type?.name}
                    </SizableText>
                  </YStack>
                </XStack>
              </Button>
            ))}
          </YStack>
        </Sheet.ScrollView>
      </Sheet.Frame>
    </Sheet>
  );
});

export default ChainListPopup;
