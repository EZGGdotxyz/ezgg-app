/*
 * @Date: 2023-12-08 16:25:15
 * @LastEditors: yosan
 * @LastEditTime: 2025-03-12 12:37:57
 * @FilePath: /ezgg-app/packages/app/Components/ConnectorsPopup/index.tsx
 */
import {Button, Sheet, SizableText, useToastController, XStack, YStack, AppImage} from '@my/ui';
import {Check} from '@tamagui/lucide-icons';
import {WalletIcon} from '@web3icons/react';
import {PrimaryColor} from 'app/config';
import useResponse from 'app/hooks/useResponse';
import {useEffect, useRef, useState, forwardRef, memo, useCallback} from 'react';
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

// 错误类型映射
const ERROR_MESSAGE_MAP = {
  'User rejected': 'tips.error.userRejected',
  'Already processing eth_requestAccounts': 'tips.error.deposit.connectProcessing',
  'Connector not found': 'tips.error.deposit.walletNotFound',
} as const;

const Item = memo(
  ({
    connector,
    onSubmit,
    activeConnector,
  }: {
    connector: Connector;
    onSubmit: (connector: Connector) => Promise<void>;
    activeConnector: Connector | undefined;
  }) => {
    const [ready, setReady] = useState(false);
    const {t} = useTranslation();
    const {appScale} = useResponse();

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
        ai="center"
        jc="space-between"
        onPress={() => onSubmit(connector)}
        borderBottomWidth={1}
        borderBottomColor={'#E0E0E0'}
        pt={appScale(12)}
        pb={appScale(12)}
        pl={appScale(24)}
        pr={appScale(24)}
      >
        <XStack ai="center" space="$3">
          <XStack
            width={appScale(48)}
            height={appScale(48)}
            borderRadius={'$1'}
            overflow={'hidden'}
            bc={'#fff'}
            ai={'center'}
            jc={'center'}
          >
            {connector?.name === 'WalletConnect' ? (
              <AppImage
                width={appScale(48)}
                height={appScale(0.613 * 48)}
                src={require('app/assets/images/WalletConnect.png')}
                type="local"
              />
            ) : (
              <WalletIcon name={connector?.name} variant="background" size={appScale(48)} />
            )}
          </XStack>
          <YStack>
            <SizableText color={'#212121'} size={'$4'} fow={'600'}>
              {connector?.name}
            </SizableText>
          </YStack>
        </XStack>
        {isCurrentConnector && (
          <XStack ai="center" space="$2">
            <SizableText color={PrimaryColor} size={'$3'} fow={'500'}>
              {t('home.wallet.connected')}
            </SizableText>
            <Check size={appScale(32)} color={PrimaryColor} />
          </XStack>
        )}
      </Button>
    );
  },
);

export type ConnectorsPopupProps = {
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
  chainId: number;
  onConnectStart?: () => void;
  onConnectEnd?: () => void;
};

const ConnectorsPopup = forwardRef<any, ConnectorsPopupProps>(
  ({modalVisible, setModalVisible, chainId, onConnectStart, onConnectEnd}, ref) => {
    const {t} = useTranslation();
    const toast = useToastController();
    const {connectors, error: connectError} = useConnect();
    const {isConnected, connector: activeConnector} = useAccount();
    const {disconnect} = useDisconnect();
    const [isConnecting, setIsConnecting] = useState(false);
    const {appScale} = useResponse();

    // 处理连接错误
    const handleConnectError = useCallback(
      (error: Error) => {
        const errorKey = Object.entries(ERROR_MESSAGE_MAP).find(([key]) => error?.message?.includes(key))?.[1];
        toast.show(t(errorKey || 'tips.error.deposit.connectError'), {
          duration: 3000,
        });
        setIsConnecting(false);
        setModalVisible(false);
        onConnectEnd?.();
      },
      [t, toast, setModalVisible, onConnectEnd],
    );

    useEffect(() => {
      if (connectError) {
        handleConnectError(connectError);
      }
    }, [connectError, handleConnectError]);

    // 监听连接状态变化
    useEffect(() => {
      if (isConnected && isConnecting) {
        setIsConnecting(false);
        onConnectEnd?.();
      }
    }, [isConnected, isConnecting, onConnectEnd]);

    const onSubmit = async (connector: Connector) => {
      try {
        setModalVisible(false);

        // 如果点击的是当前连接的钱包，不做任何操作
        if (activeConnector?.uid === connector?.uid) {
          return;
        }

        onConnectStart?.();
        setIsConnecting(true);

        // 如果已连接其他钱包，先断开
        if (isConnected) {
          await disconnect();
          // 清除localStorage残留
          localStorage.removeItem('wagmi.wallet');
          localStorage.removeItem('wagmi.connected');
          localStorage.removeItem('wagmi.store');
        }

        // 连接新钱包
        await connector.connect({
          chainId: chainId,
        });
      } catch (error) {
        console.error('❌ ~ Connection error:', error);
        handleConnectError(error as Error);
      }
    };

    return (
      <Sheet
        animation="medium"
        modal
        dismissOnSnapToBottom
        open={modalVisible}
        onOpenChange={setModalVisible}
        snapPoints={[36]}
      >
        <Sheet.Overlay animation="medium" enterStyle={{opacity: 0}} exitStyle={{opacity: 0}} />
        <Sheet.Handle />
        <Sheet.Frame justifyContent="center" w="100%" alignItems="center">
          <Sheet.ScrollView w="100%" bc="$background">
            <YStack pb="$4" style={{width: '100vw'}}>
              <Button
                unstyled
                pressStyle={{
                  opacity: 0.85,
                }}
                flexDirection="row"
                w="100%"
                ai="center"
                jc="space-between"
                onPress={async () => {
                  setModalVisible(false);
                  if (isConnected) {
                    await disconnect();
                    // 清除localStorage残留
                    localStorage.removeItem('wagmi.wallet');
                    localStorage.removeItem('wagmi.connected');
                    localStorage.removeItem('wagmi.store');
                  }
                }}
                borderBottomWidth={1}
                borderBottomColor={'#E0E0E0'}
                pt={appScale(12)}
                pb={appScale(12)}
                pl={appScale(24)}
                pr={appScale(24)}
              >
                <XStack ai="center" space="$3" h={appScale(48)}>
                  <YStack>
                    <SizableText color={'#212121'} size={'$4'} fow={'600'}>
                      {t('home.wallet.connect')}
                    </SizableText>
                  </YStack>
                </XStack>
                {!isConnected && (
                  <XStack ai="center" space="$2">
                    <SizableText color={PrimaryColor} size={'$3'} fow={'500'}>
                      {t('home.wallet.connected')}
                    </SizableText>
                    <Check size={appScale(32)} color={PrimaryColor} />
                  </XStack>
                )}
              </Button>
              {connectors?.map((item, index) => (
                <Item key={index} connector={item} onSubmit={onSubmit} activeConnector={activeConnector} />
              ))}
            </YStack>
          </Sheet.ScrollView>
        </Sheet.Frame>
      </Sheet>
    );
  },
);

export default memo(ConnectorsPopup);
