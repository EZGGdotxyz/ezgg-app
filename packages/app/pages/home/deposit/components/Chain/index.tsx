/*
 * @Date: 2023-12-08 16:25:15
 * @LastEditors: yosan
 * @LastEditTime: 2025-03-18 21:26:28
 * @FilePath: /ezgg-app/packages/app/pages/home/deposit/components/Chain/index.tsx
 */
import {AppImage, Button, Text, YStack, XStack, SizableText} from '@my/ui';
import {useRematchModel} from 'app/store/model';
import {useRouter} from 'solito/router';
import {useTranslation} from 'react-i18next';
import {ChevronDown, ChevronRight} from '@tamagui/lucide-icons';
import {useEffect, useMemo, useRef, useState} from 'react';
import ChainPopup from '../ChainPopup';
import {TokenIcon} from '@web3icons/react';
import React from 'react';
import useResponse from 'app/hooks/useResponse';
import useBlockchain from 'app/hooks/useBlockchain';
import ChainListPopup from 'app/pages/home/index/components/ChainListPopup';
import {getChainInfo} from 'app/utils/chain';

export type ChainProps = {
  selectedType: any;
  setSelectedType: (values: any) => void;
  isConnected: boolean;
};

// 鏈路
const Chain = React.forwardRef<HTMLDivElement, ChainProps>(
  ({selectedType, setSelectedType, isConnected = true}: ChainProps, ref) => {
    const {push} = useRouter();
    const {appScale} = useResponse();
    const [{blockchainList}] = useRematchModel('app');
    const {t} = useTranslation();
    const chainListPopupRef = useRef(null);
    const [sheetOpen, setSheetOpen] = useState(false);

    const [tokenTypes, setTokenTypes] = useState([]);

    useEffect(() => {
      if (blockchainList.length > 0) {
        const _tokenTypes: any = [
          ...blockchainList.map((item) => {
            const chainInfo = getChainInfo(item?.chainId);
            return {
              chainId: item?.chainId,
              name: chainInfo?.name,
              chainIcon: chainInfo?.icon,
              platform: item?.platform,
            };
          }),
          // {chainId: '728126428', name: 'Tron', chainIcon: 'Tron', platform: 'TRON'},
        ];
        setTokenTypes(_tokenTypes);
        setSelectedType(_tokenTypes[0]);
      }
    }, [blockchainList]);

    return (
      <>
        <YStack w="100%" mb={appScale(12)}>
          <XStack mb={appScale(8)} w="100%">
            <SizableText h={appScale(30)} lh={appScale(30)} fontSize={'$3'} color={'#212121'} fontWeight={'500'}>
              {t('home.send.chain')}
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
            style={{
              opacity: !isConnected ? 0.6 : 1,
              pointerEvents: !isConnected ? 'none' : 'auto',
            }}
            onPress={() => {
              if (isConnected) {
                setSheetOpen(true);
              }
            }}
          >
            <XStack ai="center" space="$3">
              <XStack
                width={appScale(32)}
                height={appScale(32)}
                borderRadius={'$1'}
                overflow={'hidden'}
                bc={'#FAFAFA'}
                ai={'center'}
                jc={'center'}
              >
                {selectedType?.chainIcon && (
                  <AppImage
                    width={appScale(32)}
                    height={appScale(32)}
                    borderRadius={appScale(16)}
                    src={require(`app/assets/images/chain/${selectedType.chainIcon}.png`)}
                    type="local"
                  />
                )}
              </XStack>
              <XStack h={appScale(32)}>
                <SizableText
                  fontSize={'$5'}
                  h={appScale(32)}
                  lh={appScale(32)}
                  color={'#212121'}
                  fontWeight={'600'}
                  pos="relative"
                >
                  {selectedType?.name}
                </SizableText>
              </XStack>
            </XStack>
            <ChevronRight size="$2" color={'#212121'} />
          </Button>
        </YStack>

        <ChainListPopup
          ref={chainListPopupRef}
          tokenTypes={tokenTypes}
          setSheetOpen={setSheetOpen}
          sheetOpen={sheetOpen}
          setSelectedType={setSelectedType}
          selectedType={selectedType}
        />
      </>
    );
  },
);

export default Chain;
