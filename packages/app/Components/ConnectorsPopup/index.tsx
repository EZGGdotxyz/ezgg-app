/*
 * @Date: 2023-12-08 16:25:15
 * @LastEditors: yosan
 * @LastEditTime: 2025-02-28 15:53:26
 * @FilePath: /ezgg-app/packages/app/Components/ConnectorsPopup/index.tsx
 */
import {AppImage, Button, ScrollView, Sheet, SizableText, Text, XStack, YStack} from '@my/ui';
import {Airplay, AlignJustify, GalleryVerticalEnd} from '@tamagui/lucide-icons';
import AppModal from 'app/Components/AppModal';
import {PrimaryColor} from 'app/config';
import {appScale} from 'app/utils';
import {useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Link} from 'solito/link';
import {Connector, useConnect, useChainId} from 'wagmi';

const Item: React.FC<any> = ({connector, connect}) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      const provider = await connector.getProvider();
      setReady(!!provider);
    })();
  }, [connector]);
  if (!ready) return null;
  return (
    <Button
      unstyled
      pressStyle={{
        opacity: 0.85,
      }}
      // bc={selectedType === item?.uid ? PrimaryColor : '#fff'}
      key={connector.uid}
      // jc={'space-between'}
      flexDirection="row"
      w="100%"
      h={appScale(72)}
      pl={appScale(24)}
      pr={appScale(24)}
      ai="center"
      onPress={() => {
        connect();
        // setSelectedType(item.value);
        // setSheetOpen(false);
      }}
    >
      {connector?.icon ? (
        <AppImage width={appScale(28)} height={appScale(28)} src={connector.icon} type="local" />
      ) : (
        <GalleryVerticalEnd size="$1" color={'#212121'} />
      )}

      <SizableText color={'#212121'} size={'$4'} fow={'600'}>
        {connector?.name}
      </SizableText>
      {/* <ChevronRight size="$2" color={'#212121'} /> */}
    </Button>
  );
};

export type CurrencyPopupProps = {
  modalVisible: any;
  setModalVisible: (values) => void;
};
// 币种选择弹窗
const ConnectorsPopup: React.FC<any> = ({modalVisible, setModalVisible}: CurrencyPopupProps) => {
  const {t, i18n} = useTranslation();
  const scrollViewRef = useRef<any>(null);
  const {connectors, connect} = useConnect();
  // const [ready, setReady] = useState(false)

  // useEffect(() => {
  //   if (modalVisible && scrollViewRef?.current && currencyData?.id && connectors && connectors.length > 0) {
  //     let scrollY = 0;

  //     // 计算链类型对应的基础滚动位置
  //     switch (currencyData.chain) {
  //       case 'BSC':
  //         scrollY = 48;
  //         break;
  //       case 'Polygon':
  //         scrollY = 48 * 2;
  //         break;
  //       case 'Base':
  //         scrollY = 48 * 3;
  //         break;
  //       default:
  //         break;
  //     }

  //     // 计算目标币种在列表中的位置
  //     let tokenIndex = -1;
  //     for (let chainIndex = 0; chainIndex < connectors.length; chainIndex++) {
  //       const chainGroup = connectors[chainIndex];
  //       for (let itemIndex = 0; itemIndex < chainGroup.tokenList.length; itemIndex++) {
  //         const token = chainGroup.tokenList[itemIndex];
  //         if (token?.id === currencyData?.id) {
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
  // }, [currencyData, connectors, scrollViewRef, modalVisible]);

  // useEffect(() => {
  //   (async () => {
  //     const provider = await connector.getProvider();
  //     setReady(!!provider);
  //   })();
  // }, [connector]);

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
            {connectors &&
              connectors.length > 0 &&
              connectors?.map((item: any, index: number) => {
                return <Item key={index} connector={item} connect={connect} />;
              })}
          </YStack>
        </Sheet.ScrollView>
      </Sheet.Frame>
    </Sheet>
  );
};

export default ConnectorsPopup;
