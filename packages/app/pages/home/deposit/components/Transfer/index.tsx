/*
 * @Date: 2023-12-08 16:25:15
 * @LastEditors: yosan
 * @LastEditTime: 2025-03-19 14:54:17
 * @FilePath: /ezgg-app/packages/app/pages/home/deposit/components/Transfer/index.tsx
 */
import {AppImage, Button, Text, YStack, XStack, SizableText} from '@my/ui';
import {useRematchModel} from 'app/store/model';
import {useRouter} from 'solito/router';
import {useTranslation} from 'react-i18next';
import {ChevronDown, ChevronRight} from '@tamagui/lucide-icons';
import {useEffect, useMemo, useRef, useState} from 'react';
import React from 'react';
import useResponse from 'app/hooks/useResponse';
import QrCode from 'app/Components/QrCode';
import CopyButton from 'app/Components/CopyButton';
import AppButton from 'app/Components/AppButton';
import {ExternalLinkData} from 'app/config';
import {truncateAddress} from 'app/utils';
import {getChainInfo} from 'app/utils/chain';
import Chain from '../Chain';

export type TransferProps = {
  currencyData: any;
  selectedType: any;
  setSelectedType: (selectedType: any) => void;
};

// 鏈路
const Transfer = React.forwardRef<HTMLDivElement, TransferProps>(({currencyData, selectedType, setSelectedType}: TransferProps, ref) => {
  const {push} = useRouter();
  const qrRef = useRef<HTMLDivElement>(null); // 指定元素类型
  const {appScale} = useResponse();
  const [{userInfo}] = useRematchModel('user');
  const {t} = useTranslation();

  // 转换为 PNG 并下载
  const downloadQR = async () => {
    if (!qrRef.current) return;
    const svgElement = qrRef.current.querySelector('svg');
    console.log('🚀 ~ downloadQR ~  qrRef.current.:', qrRef.current);
    console.log('🚀 ~ downloadQR ~ svgElement:', svgElement);
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
    <YStack pl={appScale(24)} pr={appScale(24)}>
      <Chain isConnected={true} selectedType={selectedType} setSelectedType={setSelectedType} />

      <YStack pb={appScale(24)} pt={appScale(12)}>
        <XStack ai="center" jc={'center'} w="100%" mb={appScale(24)}>
          <SizableText ta={'center'} fontSize={'$4'} color={'#212121'} fow="600">
            {t('home.deposit.sendTips', {
              token: currencyData?.token?.tokenSymbol,
              chain: getChainInfo(currencyData?.token?.chainId)?.name,
            })}
          </SizableText>
        </XStack>
        <XStack ai="center" jc={'center'} w="100%" mb={appScale(24)}>
          <SizableText ta={'center'} fontSize={'$7'} color={'#212121'} fow="700" mr={'$4'}>
            {truncateAddress(userInfo?.smartWallet?.address)}
          </SizableText>
          <XStack ai={'center'} jc={'center'} ml={appScale(6)}>
            <CopyButton unstyled text={userInfo?.smartWallet?.address}>
              <AppImage
                width={appScale(30)}
                height={appScale(30)}
                src={require('app/assets/images/copy.png')}
                type="local"
              />
            </CopyButton>
          </XStack>
        </XStack>
        <XStack
          ref={qrRef}
          w="100%"
          ai={'center'}
          jc={'center'}
          p={appScale(24)}
          borderColor={'#eeeeee'}
          borderWidth={1}
          br={appScale(8)}
          overflow={'hidden'}
          mb={appScale(24)}
        >
          <QrCode size={appScale(334)} url={userInfo?.smartWallet?.address} />
        </XStack>
        <XStack mb={appScale(34)} w="100%" ai={'center'} jc={'center'}>
          <AppButton onPress={downloadQR}>{t('home.qr.save')}</AppButton>
        </XStack>
      </YStack>
    </YStack>
  );
});

export default Transfer;
