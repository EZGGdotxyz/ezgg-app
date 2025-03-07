/*
 * @Date: 2023-12-08 16:25:15
 * @LastEditors: yosan
 * @LastEditTime: 2025-03-07 12:57:42
 * @FilePath: /ezgg-app/packages/app/Components/ConnectorsPopup/index.tsx
 */
import {Button, Sheet, SizableText, useToastController, XStack, YStack} from '@my/ui';
import {Check} from '@tamagui/lucide-icons';
import {WalletIcon} from '@web3icons/react';
import {PrimaryColor} from 'app/config';
import {appScale} from 'app/utils';
import {useEffect, useRef, useState, forwardRef, memo} from 'react';
import {useTranslation} from 'react-i18next';
import {Connector, useConnect, useAccount, useDisconnect} from 'wagmi';

// 为window.phantom添加类型声明
declare global {
  interface Window {
    phantom?: {
      ethereum?: {
        disconnect: () => void;
      };
    };
  }
}

const Item = memo(({connector, onSubmit, activeConnector}: {
  connector: Connector;
  onSubmit: (connector: Connector) => Promise<void>;
  activeConnector: Connector | undefined;
}) => {
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

  const isCurrentConnector = activeConnector?.uid === connector?.uid;

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
      onPress={() => onSubmit(connector)}
    >
      <XStack ai="center" space="$3">
        <WalletIcon name="MetaMask" variant="background" size="64" />
        <YStack>
          <SizableText color={'#212121'} size={'$4'} fow={'600'}>
            {connector?.name}
          </SizableText>
          {isCurrentConnector && (
            <SizableText color={PrimaryColor} size={'$2'}>
              {t('home.wallet.connected')}
            </SizableText>
          )}
        </YStack>
      </XStack>
      {isCurrentConnector && (
        <XStack ai="center" space="$2">
          <Check size={appScale(32)} color={PrimaryColor} />
        </XStack>
      )}
    </Button>
  );
});

export type CurrencyPopupProps = {
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
  chainId: number;
  setIsSubmit: (value: boolean) => void;
};

const ConnectorsPopup = forwardRef<any, CurrencyPopupProps>(
  ({modalVisible, setModalVisible, chainId, setIsSubmit}, ref) => {
    const {t} = useTranslation();
    const toast = useToastController();
    const scrollViewRef = useRef<any>(null);
    const {connectors} = useConnect();
    const {address, isConnected, connector: activeConnector} = useAccount();
    const {disconnect} = useDisconnect();
    const [isConnecting, setIsConnecting] = useState(false);

    // 监听连接状态变化
    useEffect(() => {
      if (isConnected && isConnecting) {
        // 延迟执行，确保状态已更新
        const timer = setTimeout(() => {
          setIsSubmit(true);
          setModalVisible(false);
          setIsConnecting(false);
        }, 500);

        return () => clearTimeout(timer);
      }
    }, [isConnected, isConnecting, setIsSubmit, setModalVisible]);

    const onSubmit = async (connector: Connector) => {
      try {
        // 如果点击的是当前连接的钱包，不做任何操作
        if (activeConnector?.uid === connector?.uid) {
          setIsSubmit(true);
          setModalVisible(false);
          return;
        }

        // 如果已连接其他钱包，先断开
        if (isConnected) {
          await disconnect();

          // 清除localStorage残留
          localStorage.removeItem('wagmi.wallet');
          localStorage.removeItem('wagmi.connected');
          localStorage.removeItem('wagmi.store');
        }

        // 连接新钱包
        setIsConnecting(true);
        await connector.connect({
          chainId: chainId,
        });
      } catch (error) {
        console.error('❌ ~ Connection error:', error);
        toast.show(t('tips.error.deposit.connectError'));
        setIsConnecting(false);
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
              {connectors && connectors.length > 0 && connectors.map((item, index) => (
                <Item
                  key={index}
                  connector={item}
                  onSubmit={onSubmit}
                  activeConnector={activeConnector}
                />
              ))}
            </YStack>
          </Sheet.ScrollView>
        </Sheet.Frame>
      </Sheet>
    );
  },
);

export default memo(ConnectorsPopup);
