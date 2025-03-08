/*
 * @Date: 2023-12-18 14:37:38
 * @LastEditors: yosan
 * @LastEditTime: 2025-03-07 16:05:03
 * @FilePath: /ezgg-app/packages/app/pages/explore/index/index.tsx
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
  useToastController,
  ScrollView,
} from '@my/ui';
import React, {useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import PermissionPage from 'app/Components/PermissionPage';
import AppHeader2 from 'app/Components/AppHeader2';
import {Html5Qrcode} from 'html5-qrcode';
import {appScale} from 'app/utils';
import AppButton from 'app/Components/AppButton';
import {useRouter} from 'solito/router';
import AppLoading from 'app/Components/AppLoading';
import {ExternalLinkData} from 'app/config';
import {decryptId} from 'app/utils/crypto';
import {createParam} from 'solito';
const {useParams} = createParam<any>();

// 掃描
const ExploreScreen = () => {
  const {t} = useTranslation();
  const [scanning, setScanning] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {replace, back} = useRouter();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToastController();
  const {params} = useParams();
  const html5QrcodeRef = useRef<Html5Qrcode | null>(null);
  const [isProcessingQR, setIsProcessingQR] = useState(false);

  useEffect(() => {
    initScanner();
    return () => {
      // 只在组件卸载时关闭摄像头
      stopScanning();
    };
  }, []);

  const initScanner = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({video: true});
      if (stream) {
        stream.getTracks().forEach((track) => {
          track.stop();
          stream.removeTrack(track);
        });
      }
      setHasPermission(true);
      startScanning();
    } catch (error) {
      setHasPermission(false);
      toast.show(t('tips.error.cameraPermissionDenied'));
    }
  };

  const startScanning = async () => {
    try {
      // 确保之前的扫描已经完全停止
      await stopScanning();

      html5QrcodeRef.current = new Html5Qrcode('qr-reader');

      const qrCodeSuccessCallback = async (decodedText: string) => {
        // 防止重复处理
        if (isProcessingQR) return;
        setIsProcessingQR(true);

        // 识别成功后暂停扫描但不关闭摄像头
        if (html5QrcodeRef.current) {
          try {
            await html5QrcodeRef.current.pause();
          } catch (error) {
            console.warn('暂停扫描失败:', error);
          }
        }

        setIsLoading(true);
        await onPush(decodedText);
        setIsLoading(false);

        // 处理完成后恢复扫描
        if (html5QrcodeRef.current) {
          try {
            await html5QrcodeRef.current.resume();
          } catch (error) {
            console.warn('恢复扫描失败:', error);
          }
        }

        setIsProcessingQR(false);
      };

      const config = {
        fps: 10,
        qrbox: {width: 250, height: 250},
        aspectRatio: 1,
      };

      await html5QrcodeRef.current.start({facingMode: 'environment'}, config, qrCodeSuccessCallback, undefined);
      setScanning(true);
    } catch (error) {
      setIsLoading(false);
      console.error('启动扫描失败:', error);
    }
  };

  const stopScanning = async () => {
    if (html5QrcodeRef.current) {
      try {
        // 先设置状态为非扫描
        setScanning(false);

        // 尝试停止扫描
        if (html5QrcodeRef.current) {
          try {
            await html5QrcodeRef.current.stop();
          } catch (stopError) {
            console.warn('停止扫描时出错，可能已经停止:', stopError);
            // 继续执行，尝试清理
          }
        }

        // 添加短暂延迟确保停止完成
        await new Promise(resolve => setTimeout(resolve, 300));

        // 尝试清理
        if (html5QrcodeRef.current) {
          try {
            await html5QrcodeRef.current.clear();
          } catch (clearError) {
            console.warn('清理扫描器时出错:', clearError);
            // 如果清理失败，尝试重新创建实例
            html5QrcodeRef.current = null;
            return;
          }
        }

        html5QrcodeRef.current = null;
      } catch (error) {
        console.error('停止扫描失败:', error);
        // 确保引用被清理
        html5QrcodeRef.current = null;
      }
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // 防止重复处理
    if (isProcessingQR) return;
    setIsProcessingQR(true);

    try {
      setIsLoading(true);

      // 暂停相机扫描但不停止
      if (html5QrcodeRef.current && scanning) {
        try {
          await html5QrcodeRef.current.pause();
        } catch (error) {
          console.warn('暂停扫描失败:', error);
        }
      }

      // 创建新的扫描器实例用于文件扫描
      const fileScanner = new Html5Qrcode('qr-reader-file');

      // 扫描文件
      const result = await fileScanner.scanFile(file, true);
      console.log('图片扫描结果:', result);

      // 清理文件扫描器
      try {
        await fileScanner.clear();
      } catch (error) {
        console.warn('清理文件扫描器失败:', error);
      }

      // 处理扫描结果
      await onPush(result);

      // 恢复相机扫描
      if (html5QrcodeRef.current && scanning) {
        try {
          await html5QrcodeRef.current.resume();
        } catch (error) {
          console.warn('恢复扫描失败:', error);
          // 如果恢复失败，尝试重新启动
          await startScanning();
        }
      }

      setIsLoading(false);
    } catch (error) {
      console.error('图片扫描失败:', error);
      toast.show(t('home.qr.invalid'));

      // 恢复相机扫描
      if (html5QrcodeRef.current && scanning) {
        try {
          await html5QrcodeRef.current.resume();
        } catch (error) {
          console.warn('恢复扫描失败:', error);
          // 如果恢复失败，尝试重新启动
          await startScanning();
        }
      }

      setIsLoading(false);
    }

    // 清理文件输入
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    setIsProcessingQR(false);
  };

  const onPush = async (code: string) => {
    if (code) {
      let userId = '';
      if (code.indexOf(ExternalLinkData.webPageHome + '/explore/') !== -1) {
        userId = code.replace(ExternalLinkData.webPageHome + '/explore/', '');
      }
      if (userId) {
        const _decryptId = decryptId(userId);
        if (_decryptId) {
          console.log('解密后的用户ID:', _decryptId);
          const _type = params?.type || 'send';
          replace('/explore/' + _decryptId + '?type=' + _type);
        } else {
          console.warn('用户ID解密失败');
          toast.show(t('home.qr.invalid'));
        }
      } else {
        console.warn('二维码格式不正确');
        toast.show(t('home.qr.invalid'));
      }
    }
  };

  return (
    <PermissionPage>
      <AppHeader2
        isClosure
        onBack={() => {
          stopScanning();
          back();
        }}
        title={''}
        isDark
        fallbackUrl="/"
      />
      <ScrollView
        flex={1}
        w={'100%'}
        bc="#fff"
        contentContainerStyle={{
          minHeight: '100%',
        }}
      >
        <YStack w="100%" flex={1} bc={'#1F222A'} ai="center">
          <YStack w="100%" pb={appScale(58)} pt={appScale(12)}>
            <SizableText
              mb={appScale(16)}
              h={appScale(50)}
              lh={appScale(50)}
              ta={'center'}
              fontSize={'$8'}
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
            overflow="hidden"
            position="relative"
          >
            {/* 相机扫描容器 */}
            <div
              id="qr-reader"
              style={{
                width: appScale(376),
                height: appScale(376),
                marginTop: appScale(3),
                marginRight: appScale(3),
                transform: 'scaleX(-1)', // 添加水平镜像效果
              }}
            />
            {/* 文件扫描容器 - 完全隐藏 */}
            <div
              id="qr-reader-file"
              style={{
                position: 'absolute',
                width: '1px',
                height: '1px',
                opacity: 0,
                pointerEvents: 'none',
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
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              ref={fileInputRef}
              style={{display: 'none'}}
            />
          </YStack>

          {hasPermission === false ? (
            <YStack
              w="100%"
              pt={appScale(40)}
              pb={appScale(24)}
              pl={appScale(24)}
              pr={appScale(24)}
              ai="center"
              jc="center"
              space="$4"
            >
              <SizableText ta={'center'} fontSize={'$6'} fontWeight={'600'} color="#fff">
                {t('home.explore.noPermission')}
              </SizableText>
              <SizableText ta={'center'} fontSize={'$4'} fontWeight={'400'} color="#fff">
                {t('home.explore.noPermission2')}
              </SizableText>
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
      </ScrollView>
      {isLoading && <AppLoading />}
    </PermissionPage>
  );
};

export default ExploreScreen;
