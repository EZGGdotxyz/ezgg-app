/*
 * @Date: 2023-12-08 16:25:15
 * @LastEditors: yosan
 * @LastEditTime: 2025-03-07 12:34:08
 * @FilePath: /ezgg-app/packages/app/pages/home/index/components/TokenList/index.tsx
 */
import {AppImage, Button, Text, YStack, XStack, SizableText, Sheet} from '@my/ui';
import {useRematchModel} from 'app/store/model';
import {useRouter} from 'solito/router';
import {useTranslation} from 'react-i18next';
import {ChevronDown} from '@tamagui/lucide-icons';
import {appScale, formatNumber, getCurrency} from 'app/utils';
import {useMemo} from 'react';
import AppButton from 'app/Components/AppButton';
import ChainListPopup from 'app/pages/home/index/components/ChainListPopup';
import useRequest from 'app/hooks/useRequest';
import {getBalanceListBalance} from 'app/servers/api/balance';
import {TokenIcon} from '@web3icons/react';
import {getChainInfo} from 'app/utils/chain';

export type TokenListProps = {
  list: any[];
  tokenTypes: any[];
  setSheetOpen: (sheetOpen: boolean) => void;
  selectedType: any;
};

const TokenList: React.FC<TokenListProps> = ({list, tokenTypes, setSheetOpen, selectedType}) => {
  const [{currency}] = useRematchModel('app');
  const [{isLogin}] = useRematchModel('user');
  const {push} = useRouter();
  const {t} = useTranslation();

  const getSelectedLabel = useMemo(() => {
    const selected = tokenTypes.find((type) => type.chainId === selectedType?.chainId);
    return selected?.chainId === 'all' ? t('home.viewAll') : selected?.name;
  }, [tokenTypes, selectedType, t]);

  const renderTokenItem = (item: any, index: number) => (
    <XStack key={index} pt={appScale(16)} pb={appScale(16)} w={'100%'} mb={appScale(8)}>
      <XStack flexShrink={0} pos={'relative'} pr={appScale(24)}>
        <YStack height={appScale(48)} width={appScale(48)} borderRadius={appScale(24)} overflow={'hidden'}>
          <TokenIcon symbol={item?.token?.tokenSymbol} variant="background" size={appScale(48)} />
        </YStack>
        {item?.chainIcon && (
          <XStack pos={'absolute'} bottom={appScale(4)} right={appScale(12)}>
            <AppImage
              width={appScale(24)}
              height={appScale(24)}
              src={require(`app/assets/images/chain/${item.chainIcon}.png`)}
              type="local"
            />
          </XStack>
        )}
      </XStack>
      <XStack flex={1} ai={'center'} jc={'space-between'}>
        <YStack gap={appScale(2)}>
          <SizableText fontSize={'$6'} color={'#26273C'} fontWeight={'500'}>
            {item?.token?.tokenSymbol}
          </SizableText>
          <SizableText fontSize={'$4'} color={'#9395A4'} fontWeight={'500'}>
            {item?.chainName}
          </SizableText>
        </YStack>
        <YStack gap={appScale(2)}>
          <SizableText ta={'right'} fontSize={'$6'} color={'#26273C'} fontWeight={'500'}>
            {item?.tokenAmount}
          </SizableText>
          <SizableText ta={'right'} fontSize={'$4'} color={'#9395A4'} fontWeight={'500'}>
            {formatNumber(Number(item?.currencyAmount))} {getCurrency(currency)?.label}
          </SizableText>
        </YStack>
      </XStack>
    </XStack>
  );

  const renderEmptyState = () => (
    <YStack flex={1} ai="center" jc="center" pt={appScale(48)}>
      <AppImage
        width={appScale(160)}
        height={appScale(156)}
        src={require('app/assets/images/empty2.png')}
        type="local"
      />
      <SizableText mt={appScale(32)} col={'#212121'} fontSize={'$6'} fow={'700'}>
        {t('home.order.noPortfolio')}
      </SizableText>
      <SizableText mt={appScale(16)} col={'#212121'} fontSize={'$3'} fow="400">
        {t('home.order.noPortfolio2')}
      </SizableText>
    </YStack>
  );

  const renderLoginButton = () => (
    <YStack pt={appScale(48)}>
      <AppButton onPress={() => push('/login')}>
        {t('login.loginButton')}
      </AppButton>
    </YStack>
  );

  return (
    <YStack pl={appScale(24)} pr={appScale(24)} pt={appScale(8)}>
      {tokenTypes.length > 0 && isLogin && (
        <Button
          unstyled
          onPress={() => setSheetOpen(true)}
          flexDirection="row"
          alignItems="center"
          ai="center"
          h={appScale(36)}
        >
          <SizableText fontSize={'$4'} color={'$color11'}>
            {getSelectedLabel}
          </SizableText>
          <ChevronDown size="$2" color={'$color11'} />
        </Button>
      )}
      {list.length > 0 ? (
        list.map(renderTokenItem)
      ) : isLogin ? (
        renderEmptyState()
      ) : (
        renderLoginButton()
      )}
    </YStack>
  );
};

export default TokenList;
