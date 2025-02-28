/*
 * @Date: 2023-12-08 16:25:15
 * @LastEditors: yosan
 * @LastEditTime: 2025-02-28 14:17:33
 * @FilePath: /ezgg-app/packages/app/pages/home/send/index/components/ChainListPopup/index.tsx
 */
import {AppImage, Button, Paragraph, ScrollView, Sheet, SizableText, Text, XStack, YStack} from '@my/ui';
import {Airplay, AlignJustify, Check, ChevronRight, GalleryVerticalEnd} from '@tamagui/lucide-icons';
import {PrimaryColor} from 'app/config';
import {appScale} from 'app/utils';
import {useTranslation} from 'react-i18next';

export type ChainListPopupProps = {
  selectedType: any;
  setSelectedType: (values: string) => void;
  sheetOpen: any;
  setSheetOpen: (values) => void;
  tokenTypes: {value: string; label: string; icon: string}[];
};

const ChainListPopup: React.FC<any> = ({
  selectedType,
  setSelectedType,
  sheetOpen,
  setSheetOpen,
  tokenTypes,
}: ChainListPopupProps) => {
  console.log('🚀 ~ selectedType:', selectedType);

  const {t, i18n} = useTranslation();
  return (
    <Sheet
      animation="medium"
      modal
      dismissOnSnapToBottom
      open={sheetOpen}
      onOpenChange={setSheetOpen}
      snapPoints={[30]}
    >
      <Sheet.Overlay animation="medium" enterStyle={{opacity: 0}} exitStyle={{opacity: 0}} />
      <Sheet.Handle />
      <Sheet.Frame justifyContent="center" w="100%" alignItems="center">
        <Sheet.ScrollView>
          <YStack style={{width: '100vw'}}>
            {tokenTypes.map((type) => (
              <Button
                unstyled
                pressStyle={{
                  opacity: 0.85,
                }}
                bc={selectedType === type?.value ? PrimaryColor : '#fff'}
                key={type.value}
                // jc={'space-between'}
                flexDirection="row"
                w="100%"
                h={appScale(72)}
                pl={appScale(24)}
                pr={appScale(24)}
                ai="center"
                onPress={() => {
                  setSelectedType(type.value);
                  setSheetOpen(false);
                }}
              >
                {type?.icon ? (
                  <AppImage
                    width={appScale(28)}
                    height={appScale(28)}
                    src={require(`app/assets/images/chain/${type.icon}.png`)}
                    type="local"
                  />
                ) : (
                  <GalleryVerticalEnd size="$1" color={'#212121'} />
                )}

                <SizableText color={'#212121'} size={'$4'} fow={'600'}>
                  {type.label}
                </SizableText>
                {/* <ChevronRight size="$2" color={'#212121'} /> */}
              </Button>
              // <Button
              //   key={type.value}
              //   unstyled
              //   onPress={() => {
              //     setSelectedType(type.value);
              //     setSheetOpen(false);
              //   }}
              //   flexDirection="row"
              //   alignItems="center"
              //   justifyContent="space-between"
              //   paddingVertical={appScale(8)}
              // >
              //   <SizableText fontSize={'$5'} color={'#26273C'} fontWeight={'500'}>
              //     {type.label}
              //   </SizableText>
              //   {selectedType === type.value && <Check size={16} color="#26273C" />}
              // </Button>
            ))}
          </YStack>
        </Sheet.ScrollView>
      </Sheet.Frame>
    </Sheet>
  );
};

export default ChainListPopup;
