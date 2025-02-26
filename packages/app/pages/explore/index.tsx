/*
 * @Date: 2023-12-18 14:37:38
 * @LastEditors: yosan
 * @LastEditTime: 2025-02-26 17:52:57
 * @FilePath: /ezgg-app/packages/app/pages/explore/index.tsx
 */
import {
  AppHeader,
  AppHeaderProps,
  HeaderBackButton,
  Paragraph,
  XStack,
  YStack,
  SizableText,
  AppImage,
  Button,
} from '@my/ui';
import React, {useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import PermissionPage from 'app/Components/PermissionPage';
import AppHeader2 from 'app/Components/AppHeader2';
import jsQR from 'jsqr';
import {appScale} from 'app/utils';
import AppButton from 'app/Components/AppButton';
import {useRouter} from 'solito/router';
import AppLoading from 'app/Components/AppLoading';

// 掃描
const ExploreScreen = () => {
  const {t} = useTranslation();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scanning, setScanning] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {push} = useRouter();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    checkCameraPermission();
    return () => {
      stopScanning();
    };
  }, []);

  const checkCameraPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({video: true});
      stream.getTracks().forEach((track) => track.stop());
      setHasPermission(true);
      startScanning();
    } catch (error) {
      console.error('Camera permission denied:', error);
      setHasPermission(false);
    }
  };

  const startScanning = async () => {
    try {
      const constraints = {
        video: {
          facingMode: 'environment',
          width: {ideal: 1280},
          height: {ideal: 720},
          focusMode: 'continuous',
        },
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        videoRef.current.onloadedmetadata = () => {
          setScanning(true);
          scanQRCode();
        };
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const stopScanning = () => {
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach((track) => track.stop());
      setScanning(false);
    }
  };

  const scanQRCode = () => {
    if (!scanning) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // 计算中心区域
    const scanRegionSize = Math.min(canvas.width, canvas.height) * 0.7;
    const scanRegionX = (canvas.width - scanRegionSize) / 2;
    const scanRegionY = (canvas.height - scanRegionSize) / 2;

    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // 获取扫描区域的图像数据
    const imageData = context.getImageData(scanRegionX, scanRegionY, scanRegionSize, scanRegionSize);

    const code = jsQR(imageData.data, imageData.width, imageData.height);
    if (code) {
      onPush(code?.data);
      // TODO: 处理扫描到的二维码数据
      // 这里可以添加成功扫描的回调
    }

    requestAnimationFrame(scanQRCode);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext('2d');
        if (!context) return;

        canvas.width = img.width;
        canvas.height = img.height;
        context.drawImage(img, 0, 0);

        const imageData = context?.getImageData(0, 0, canvas.width, canvas.height);
        if (imageData?.data) {
          const code = jsQR(imageData?.data, imageData.width, imageData.height);

          if (code) {
            onPush(code?.data);
          } else {
            console.log('No QR code found in image');
          }
        }

        // 重新启动摄像头扫描
        startScanning();
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const onPush = (code) => {
    if (code) {
      console.log('Found QR code in image:', code);
      setIsLoading(true);
      setTimeout(() => {
        stopScanning();
        push('/home/send');
        setIsLoading(false);
      }, 1000);
    }
  };

  return (
    <PermissionPage>
      <AppHeader2 isClosure title={''} isDark fallbackUrl="/" />
      <YStack w="100%" flex={1} bc={'#1F222A'} ai="center">
        <YStack w="100%" pb={appScale(58)} pt={appScale(12)}>
          <SizableText
            mb={appScale(16)}
            h={appScale(50)}
            lh={appScale(50)}
            ta={'center'}
            fontSize={'$9'}
            color={'#fff'}
            fow="600"
          >
            {t('home.qr.title')}
          </SizableText>
          <SizableText ta={'center'} fontSize={'$3'} color={'#fff'} fow="400">
            {t('home.qr.sub')}
          </SizableText>
        </YStack>

        <YStack
          width={appScale(382)}
          height={appScale(382)}
          borderRadius={appScale(20)}
          // borderWidth={2}
          // borderColor="#fff"
          overflow="hidden"
          position="relative"
        >
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            style={{
              marginTop: appScale(3),
              marginRight: appScale(3),
              width: appScale(376),
              height: appScale(376),
              objectFit: 'cover',
              transform: 'scaleX(-1)',
            }}
          />
          <XStack
            position="absolute"
            width={appScale(382)}
            height={appScale(382)}
            top={0}
            left={0}
            right={0}
            bottom={0}
            ai="center"
            jc="center"
          >
            <AppImage
              src={require('app/assets/images/qr_code_bg.png')}
              type="local"
              width={appScale(382)}
              height={appScale(382)}
            />
          </XStack>
          <canvas
            ref={canvasRef}
            style={{
              display: 'none',
              width: appScale(376),
              height: appScale(376),
            }}
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            ref={fileInputRef}
            style={{display: 'none'}}
          />
        </YStack>

        {hasPermission === null ? (
          <SizableText color="#fff">{t('screen.explore.requestingPermission')}</SizableText>
        ) : hasPermission === false ? (
          <YStack ai="center" jc="center" space="$4">
            <SizableText color="#fff">{t('screen.explore.noPermission')}</SizableText>
            <AppButton onPress={checkCameraPermission}>{t('screen.explore.requestPermission')}</AppButton>
          </YStack>
        ) : (
          <></>
        )}
      </YStack>
      <XStack flexShrink={0} bc={'#1F222A'} jc={'center'} pb={appScale(32)}>
        <Button
          unstyled
          onPress={() => {
            fileInputRef.current?.click();
          }}
        >
          <AppImage
            width={appScale(56)}
            height={appScale(56)}
            src={require(`app/assets/images/img.png`)}
            type="local"
          />
        </Button>
      </XStack>
      {isLoading && (
        <AppLoading />
      )}
    </PermissionPage>
  );
};

export default ExploreScreen;
