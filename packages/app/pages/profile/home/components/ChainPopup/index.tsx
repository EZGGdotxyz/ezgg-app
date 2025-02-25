/*
 * @Date: 2023-12-08 16:25:15
 * @LastEditors: yosan
 * @LastEditTime: 2025-02-25 09:33:09
 * @FilePath: /ezgg-app/packages/app/pages/profile/home/components/ChainPopup/index.tsx
 */
import {AppImage, Button, ScrollView, SizableText, Text, XStack, YStack} from '@my/ui';
import {Airplay, AlignJustify} from '@tamagui/lucide-icons';
import AppModal from 'app/Components/AppModal';
import {PrimaryColor} from 'app/config';
import {useEffect, useRef} from 'react';
import {useTranslation} from 'react-i18next';
import {Link} from 'solito/link';

export type ChainPopupProps = {
  modalVisible: any;
  setModalVisible: (values) => void;
  chainList: any;
  selectChain: any;
  chainData: any;
};
// 法币选择弹窗
const ChainPopup: React.FC<any> = ({
  modalVisible,
  setModalVisible,
  chainList,
  selectChain,
  chainData,
}: ChainPopupProps) => {
  const {t, i18n} = useTranslation();
  const scrollViewRef = useRef(null);

  useEffect(() => {
    if (modalVisible && scrollViewRef?.current && chainData?.id && chainList && chainList.length > 0) {
      const index = chainList.findIndex((item) => item?.id === chainData?.id);
      if (index !== -1) {
        setTimeout(() => {
          scrollViewRef?.current.scrollTo({x: 0, y: index * 56, animated: true});
        });
      }
    }
  }, [chainData, chainList, scrollViewRef, modalVisible]);

  return (
    <AppModal zIndex={12} setModalVisible={setModalVisible} modalVisible={modalVisible}>
      <YStack h={400} w="100%" pos={'absolute'} ai={'center'} jc={'center'} b={0} l={0} bc="$background">
        <ScrollView ref={scrollViewRef} w="100%" bc="$background">
          <YStack pt="$3" pb="$3">
            {chainList &&
              chainList.length > 0 &&
              chainList?.map((item: any, index: number) => {
                return (
                  <Button
                    unstyled
                    pressStyle={{
                      opacity: 0.85,
                    }}
                    bbw={1}
                    bbc={index !== chainList.length - 1 ? '#E1E1E1' : '$background'}
                    bc={chainData?.id === item?.id ? PrimaryColor : '#fff'}
                    key={item?.id + 'id' + index}
                    jc={'space-between'}
                    flexDirection="row"
                    w="100%"
                    h={56}
                    pl="$4"
                    pr="$4"
                    ai="center"
                    onPress={() => {
                      selectChain(item);
                    }}
                  >
                    <SizableText color={'#212121'} size={'$6'} fow={'700'}>
                      {item?.emoji} &nbsp;&nbsp;&nbsp;{' '}
                      {`${i18n.language === 'zh_HK' ? item?.chineseName : item?.englishName}`}
                    </SizableText>
                    <SizableText color={'#212121'} size={'$4'} fow={'600'}>
                      {item?.code}
                    </SizableText>
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

export default ChainPopup;
