/*
 * @Date: 2023-12-08 16:25:15
 * @LastEditors: yosan
 * @LastEditTime: 2025-03-06 16:36:51
 * @FilePath: /ezgg-app/packages/app/Components/ConnectorsPopup/index.tsx
 */
import {AppImage, Button, ScrollView, Sheet, SizableText, Text, useToastController, XStack, YStack} from '@my/ui';
import {Airplay, AlignJustify, GalleryVerticalEnd, Check} from '@tamagui/lucide-icons';
import {WalletIcon} from '@web3icons/react';
import AppModal from 'app/Components/AppModal';
import {PrimaryColor} from 'app/config';
import {appScale} from 'app/utils';
import {useEffect, useRef, useState, forwardRef} from 'react';
import {useTranslation} from 'react-i18next';
import {Link} from 'solito/link';
import {Connector, useConnect, useChainId, useAccount, useDisconnect} from 'wagmi';

const Item: React.FC<any> = ({connector, onSubmit, activeConnector}) => {
  const [ready, setReady] = useState(false);
  const {t} = useTranslation();

  useEffect(() => {
    (async () => {
      try {
        const provider = await connector.getProvider();
        setReady(!!provider);
      } catch (error) {
        console.error(`❌ ~ ${connector.name} provider error:`, error);
      }
    })();
  }, [connector]);

  if (!ready) return null;

  return (
    <Button
      unstyled
      pressStyle={{
        opacity: 0.85,
      }}
      flexDirection="row"
      w="100%"
      h={appScale(72)}
      pl={appScale(24)}
      pr={appScale(24)}
      ai="center"
      jc="space-between"
      onPress={async () => {
        onSubmit(connector);
      }}
    >
      <XStack ai="center" space="$3">
        <WalletIcon name="MetaMask" variant="background" size="64" />
        <YStack>
          <SizableText color={'#212121'} size={'$4'} fow={'600'}>
            {connector?.name}
          </SizableText>
          {activeConnector?.uid === connector?.uid && (
            <SizableText color={PrimaryColor} size={'$3'}>
              {t('home.wallet.connected')}
            </SizableText>
          )}
        </YStack>
      </XStack>
      {activeConnector?.uid === connector?.uid && (
        <XStack ai="center" space="$2">
          <Check size={32} color={PrimaryColor} />
        </XStack>
      )}
    </Button>
  );
};

export type CurrencyPopupProps = {
  modalVisible: any;
  setModalVisible: (values) => void;
  chainId: number;
  setIsSubmit: (values) => void;
};

const ConnectorsPopup = forwardRef<any, any>(
  ({modalVisible, setModalVisible, chainId, setIsSubmit}: CurrencyPopupProps, ref) => {
    const {t} = useTranslation();
    const toast = useToastController();
    const scrollViewRef = useRef<any>(null);
    const {connectors, connect} = useConnect();
    const {address, isConnected, connector: activeConnector} = useAccount();

    console.log('🚀 ~ address:', address);

    const {disconnect} = useDisconnect();
    const [isConnected2, setIsConnected2] = useState(false);

    // 监听连接状态变化
    useEffect(() => {
      if (isConnected && isConnected2) {
        // 延迟执行onSubmit，确保状态已更新
        setTimeout(() => {
          setIsSubmit(true);
          setModalVisible(false);
        });
      }
    }, [isConnected, isConnected2]);

    const onSubmit = async (connector: Connector) => {
      if (activeConnector?.uid === connector?.uid) {
        setIsSubmit(true);
        setModalVisible(false);
      } else {
        if (isConnected) {
          await disconnect();
          // 2. 直接调用 Phantom 的断开 API
          if (window?.phantom?.ethereum?.disconnect) {
            window?.phantom.ethereum.disconnect();
          }

          // 3. 清除 localStorage 残留
          localStorage.removeItem('wagmi.wallet');
          localStorage.removeItem('wagmi.connected');
          localStorage.removeItem('wagmi.store');
          setTimeout(async () => {
            await connector?.connect({
              chainId: chainId,
            });
            setIsConnected2(true);
          });
        } else {
          await connector?.connect({
            chainId: chainId,
          });
          setIsConnected2(true);
        }
      }
    };

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
                  return <Item activeConnector={activeConnector} key={index} connector={item} onSubmit={onSubmit} />;
                })}
            </YStack>
          </Sheet.ScrollView>
        </Sheet.Frame>
      </Sheet>
    );
  },
);

export default ConnectorsPopup;
