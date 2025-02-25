/*
 * @Date: 2023-12-08 16:25:15
 * @LastEditors: yosan
 * @LastEditTime: 2025-02-25 10:12:26
 * @FilePath: /ezgg-app/packages/app/Components/Currency/index.tsx
 */
import {AppImage, Button, Text, YStack, XStack, SizableText} from '@my/ui';
import {useRematchModel} from 'app/store/model';
import {useRouter} from 'solito/router';
import {useTranslation} from 'react-i18next';
import {ChevronDown, ChevronRight} from '@tamagui/lucide-icons';
import {appScale} from 'app/utils';
import {useEffect, useState} from 'react';
import CurrencyPopup from '../CurrencyPopup';

export type CurrencyProps = {token: string; chain: string; updateCurrency: (currency: any) => void};
// 交易历史item
const Currency: React.FC<any> = ({token, chain, updateCurrency}: CurrencyProps) => {
  const {push} = useRouter();
  const {t, i18n} = useTranslation();
  const [{demoniator}] = useRematchModel('app');
  const [modalVisible, setModalVisible] = useState(false);
  const [currencyData, setCurrencyData] = useState<any>({
    id: 1,
    chain: 'BSC',
    token: 'USDT',
  });
  const currencyList = [
    {
      chain: 'BSC',
      tokenList: [
        {
          id: 1,
          chain: 'BSC',
          token: 'USDT',
        },
        {
          id: 2,
          chain: 'BSC',
          token: 'USDC',
        },
      ],
    },
    {
      chain: 'Polygon',
      tokenList: [
        {
          id: 3,
          chain: 'Polygon',
          token: 'USDT',
        },
        {
          id: 4,
          chain: 'Polygon',
          token: 'USDC',
        },
      ],
    },
    {
      chain: 'Base',
      tokenList: [
        {
          id: 5,
          chain: 'Base',
          token: 'USDT',
        },
        {
          id: 6,
          chain: 'Base',
          token: 'USDC',
        },
      ],
    },
  ];

  const seleCtcurrency = (item) => {
    setCurrencyData(item);
    setModalVisible(false);
    updateCurrency(item);
    // dispatch.app.updateState({
    //   demoniator: item.code,
    // });
  };

  useEffect(() => {
    if (chain && token) {
      currencyList.forEach((item) => {
        item.tokenList.forEach((i) => {
          if (i.token === token && i.chain === chain) {
            setCurrencyData(i);
          }
        });
      });
    }
  }, [chain, token]);

  return (
    <>
      <YStack w="100%" mb={appScale(24)} onPress={() => setModalVisible(true)}>
        <XStack mb={appScale(8)} w="100%">
          <SizableText h={appScale(30)} lh={appScale(30)} fontSize={'$5'} color={'#212121'} fontWeight={'600'}>
            {t('home.send.currency')}
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
          <XStack>
            <YStack pos={'relative'} w={appScale(72)} flexShrink={0}>
              <AppImage
                width={appScale(48)}
                height={appScale(48)}
                src={require(`app/assets/images/token/${currencyData.token}.png`)}
                type="local"
              />
              <XStack pos={'absolute'} bottom={appScale(4)} right={appScale(18)}>
                <AppImage
                  width={appScale(24)}
                  height={appScale(24)}
                  src={require(`app/assets/images/chain/${currencyData.chain}.png`)}
                  type="local"
                />
              </XStack>
            </YStack>
            <SizableText
              fontSize={'$8'}
              h={appScale(50)}
              lh={appScale(50)}
              color={'#212121'}
              fontWeight={'600'}
              pos="relative"
            >
              {`${currencyData.token} (${currencyData.chain})`}
            </SizableText>
          </XStack>
          <ChevronRight size="$3" color={'#212121'} />
        </Button>
      </YStack>

      <CurrencyPopup
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        currencyList={currencyList}
        currencyData={currencyData}
        seleCtcurrency={seleCtcurrency}
      />
    </>
  );
};

export default Currency;
