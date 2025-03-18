/*
 * @Date: 2023-12-08 16:25:15
 * @LastEditors: yosan
 * @LastEditTime: 2025-03-18 17:25:54
 * @FilePath: /ezgg-app/packages/app/pages/profile/home/components/MyQrCodePopup/index.tsx
 */
import {AppImage, Button, Paragraph, ScrollView, SizableText, Text, XStack, YStack} from '@my/ui';
import {Airplay, AlignJustify} from '@tamagui/lucide-icons';
import AppButton from 'app/Components/AppButton';
import AppModal from 'app/Components/AppModal';
import QrCode from 'app/Components/QrCode';
import {ExternalLinkData, PrimaryColor} from 'app/config';
import { isIphoneX} from 'app/utils';
import QRCode from 'qrcode.react';
import {useEffect, useRef} from 'react';
import {useTranslation} from 'react-i18next';
import {Link} from 'solito/link';
import useResponse from 'app/hooks/useResponse';

export type MyQrCodePopupProps = {
  userId: string;
  modalVisible: any;
  setModalVisible: (values) => void;
  setShareVisible: (values) => void;
};

const MyQrCodePopup: React.FC<any> = ({userId, modalVisible, setModalVisible, setShareVisible}: MyQrCodePopupProps) => {
  const {t, i18n} = useTranslation();
  const qrRef = useRef<HTMLDivElement>(null); // 指定元素类型
  const {appScale} = useResponse();

  // 转换为 PNG 并下载
  const downloadQR = async () => {
    if (!qrRef.current) return;

    const svgElement = qrRef.current.querySelector('svg');

    if (!svgElement) return;

    // 将 SVG 转化为 Data URL
    const svgString = new XMLSerializer().serializeToString(svgElement);
    const svgBlob = new Blob([svgString], {type: 'image/svg+xml;charset=utf-8'});
    const svgUrl = URL.createObjectURL(svgBlob);

    // 通过 Canvas 转换确保透明背景支持
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);

      // 生成 PNG 下载链接
      const pngUrl = canvas.toDataURL('image/png', 1.0);
      const link = document.createElement('a');
      link.download = `QRCode_${Date.now()}.png`;
      link.href = pngUrl;
      link.click();

      URL.revokeObjectURL(svgUrl);
    };
    img.src = svgUrl;
  };

  return (
    <AppModal zIndex={12} setModalVisible={setModalVisible} modalVisible={modalVisible}>
      <YStack
        // h={140}
        w="100%"
        // borderRadiusTopLeft={20}
        borderTopRightRadius={appScale(16)}
        borderTopLeftRadius={16}
        pos={'absolute'}
        ai={'center'}
        jc={'center'}
        b={0}
        l={0}
        bc="#fff"
      >
        <YStack pt={appScale(24)} pr={appScale(24)} pl={appScale(24)} pb={appScale(24)}>
          <SizableText ta={'center'} fontSize={'$6'} color={'#212121'} fow={'700'}>
            {t('home.qr.title2')}
          </SizableText>
          <SizableText ta={'center'} mb={appScale(24)} fontSize={'$3'} color={'#212121'} fow={'500'}>
            {t('home.qr.sub2')}
          </SizableText>
          <XStack w="100%" mb={appScale(24)} h={1} bc={'#eeeeee'}></XStack>
          <XStack
            ref={qrRef}
            w="100%"
            ai={'center'}
            jc={'center'}
            p={appScale(24)}
            borderColor={'#eeeeee'}
            borderWidth={1}
          >
            {/* <QRCode
              value={`${ExternalLinkData.webPageHome}?userId=${userId}`}
              size={appScale(334)}
              level="H" // 容错率级别 Higher
              includeMargin={false}
              renderAs="svg" // 必须指定 SVG 模式
            /> */}
            <QrCode size={appScale(334)} url={`${ExternalLinkData.webPageHome}/explore/${userId}`} />
          </XStack>
        </YStack>
        <XStack
          flexShrink={0}
          pl={appScale(24)}
          pr={appScale(24)}
          pt={appScale(12)}
          pb={appScale(isIphoneX() ? 46 : 12)}
          w="100%"
          ai={'center'}
          jc={'center'}
          space="$3"
          borderTopWidth={1}
          borderColor={'#F2F2F2'}
        >
          <Button
            h={appScale(58)}
            w={'50%'}
            br={appScale(28)}
            ai={'center'}
            jc={'center'}
            bc={'#fff'}
            color={'#212121'}
            borderWidth={2}
            borderColor={PrimaryColor}
            onPress={() => {
              downloadQR();
            }}
            // disabled={isLoading}
            pressStyle={{
              opacity: 0.85,
            }}
            unstyled
          >
            {t('home.qr.save')}
          </Button>
          <AppButton
            style={{
              width: '50%',
            }}
            onPress={() => {
              setModalVisible(false);
              setShareVisible(true);
              // setAcceptRequestVisible(true);
            }}
          >
            {t('home.qr.share')}
          </AppButton>
        </XStack>
      </YStack>
    </AppModal>
  );
};

export default MyQrCodePopup;
