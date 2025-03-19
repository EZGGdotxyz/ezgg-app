/*
 * @Date: 2025-03-19 11:27:10
 * @LastEditors: yosan
 * @LastEditTime: 2025-03-19 14:18:48
 * @FilePath: /ezgg-app/packages/app/Components/TokenIconWrapper/index.tsx
 */
import {useEffect, useState} from 'react';
import {AppImage, YStack} from '@my/ui';
import {TokenIcon} from '@web3icons/react';
import {getChainInfo, getTrustWalletAssetUrl} from 'app/utils/chain';
import tokens from 'app/assets/tokens.json';
import useResponse from 'app/hooks/useResponse';

interface TokenIconWrapperProps {
  tokenAddress: string;
  chainId: number;
  tokenSymbol: string;
  size?: number;
}

interface TokenInfo {
  address: string;
  chainId: number;
  logoURI?: string;
}

const TokenIconWrapper: React.FC<TokenIconWrapperProps> = ({tokenAddress, chainId, tokenSymbol, size = 48}) => {
  const [iconUrl, setIconUrl] = useState<string | null>(null);
  const [imageLoadError, setImageLoadError] = useState(false);
  const {appScale} = useResponse();

  // 处理 tokenSymbol
  const processedTokenSymbol = tokenSymbol?.startsWith('u') ? tokenSymbol.slice(1) : tokenSymbol;

  // 检查 URL 是否可访问
  const checkImageUrl = async (url: string): Promise<boolean> => {
    try {
      const response = await fetch(url, {method: 'HEAD'});
      return response.ok;
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    const loadIcon = async () => {
      try {
        // 2. 从 Trust Wallet 获取
        const trustWalletUrl = getTrustWalletAssetUrl(tokenAddress, chainId);
        if (trustWalletUrl && !trustWalletUrl.endsWith('info/logo.png')) {
          const isUrlValid = await checkImageUrl(trustWalletUrl);
          if (isUrlValid) {
            setIconUrl(trustWalletUrl);
            return;
          }
        }

        // 3. 从 tokens.json 获取
        if (Array.isArray(tokens?.tokens)) {
          const tokenInfo = tokens.tokens.find(
            (t: TokenInfo) => t.address.toLowerCase() === tokenAddress.toLowerCase() && t.chainId === chainId,
          );
          if (tokenInfo?.logoURI) {
            const isUrlValid = await checkImageUrl(tokenInfo.logoURI);
            if (isUrlValid) {
              setIconUrl(tokenInfo.logoURI);
              return;
            }
          }
        }

        // 4. 使用默认图标
        setIconUrl(null);
      } catch (error) {
        console.error('Error loading token icon:', error);
        setIconUrl(null);
      }
    };

    loadIcon();
  }, [tokenAddress, chainId, processedTokenSymbol]);

  const handleImageError = () => {
    setImageLoadError(true);
    setIconUrl(null);
  };

  if (iconUrl && !imageLoadError) {
    return (
      <YStack height={appScale(size)} width={appScale(size)} borderRadius={appScale(size / 2)} overflow={'hidden'}>
        <AppImage width={appScale(size)} height={appScale(size)} src={iconUrl} onError={handleImageError} />
      </YStack>
    );
  }

  return (
    <YStack height={appScale(size)} width={appScale(size)} borderRadius={appScale(size / 2)} overflow={'hidden'}>
      <TokenIcon symbol={processedTokenSymbol} variant="background" size={appScale(size)} />
    </YStack>
  );
};

export default TokenIconWrapper;
