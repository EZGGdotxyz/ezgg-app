/*
 * @Date: 2023-12-08 16:25:15
 * @LastEditors: yosan
 * @LastEditTime: 2025-03-12 13:26:27
 * @FilePath: /ezgg-app/packages/app/Components/Connectors/index.tsx
 */
import {AppImage, Button, SizableText, YStack, XStack} from '@my/ui';
import {useTranslation} from 'react-i18next';
import {ChevronRight} from '@tamagui/lucide-icons';
import {useState} from 'react';
import React from 'react';
import useResponse from 'app/hooks/useResponse';
import ConnectorsPopup from '../ConnectorsPopup';
import {useAccount} from 'wagmi';
import {truncateAddress} from 'app/utils';

export type ConnectorsProps = {
  currencyData: any;
  setIsLoading: (isLoading: boolean) => void;
  isWithdraw?: boolean;
};

const Connectors = ({currencyData, setIsLoading, isWithdraw=false}: ConnectorsProps) => {
  const {appScale} = useResponse();
  const {t} = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);
  const {address, isConnected, connector: activeConnector} = useAccount();

  const handleConnectStart = () => {
    setIsLoading(true);
  };

  const handleConnectEnd = () => {
    setIsLoading(false);
  };

  const handleModalVisibilityChange = (value: boolean) => {
    setModalVisible(value);
    if (!value) {
      setIsLoading(false);
    }
  };

  return (
    <>
      <YStack w="100%" mb={appScale(24)}>
        <XStack mb={appScale(8)} w="100%">
          <SizableText h={appScale(30)} lh={appScale(30)} fontSize={'$3'} color={'#212121'} fontWeight={'500'}>
            {t('home.connectors.title')}
          </SizableText>
        </XStack>
        <Button
          w="100%"
          p={appScale(16)}
          bc={'#FAFAFA'}
          br={appScale(8)}
          unstyled
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          pressStyle={{
            opacity: 0.7,
            bc: '#FAFAFA',
          }}
          onPress={() => setModalVisible(true)}
        >
          <XStack h={appScale(50)}>
            <SizableText
              fontSize={'$7'}
              h={appScale(50)}
              lh={appScale(50)}
              color={'#212121'}
              fontWeight={'600'}
              pos="relative"
            >
              {isConnected && activeConnector?.name ? activeConnector.name : isWithdraw ? t('home.connectors.noWallets2') : t('home.connectors.noWallets')}
            </SizableText>
          </XStack>
          <XStack>
            <SizableText fontSize={'$3'} color={'#212121'}>
              {address ? truncateAddress(address) : ''}
            </SizableText>
            <ChevronRight size="$2" color={'#212121'} />
          </XStack>
        </Button>
      </YStack>

      <ConnectorsPopup
        isWithdraw={isWithdraw}
        modalVisible={modalVisible}
        setModalVisible={handleModalVisibilityChange}
        chainId={currencyData?.chainId}
        onConnectStart={handleConnectStart}
        onConnectEnd={handleConnectEnd}
      />
    </>
  );
};

export default React.memo(Connectors);
