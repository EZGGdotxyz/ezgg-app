/*
 * @Date: 2025-03-08
 * @LastEditors: yosan
 * @LastEditTime: 2025-03-13 18:09:09
 * @FilePath: /ezgg-app/packages/app/hooks/useBlockchain.ts
 */
import {Dispatch} from 'app/store';
import {useDispatch} from 'react-redux';
import {useRematchModel} from 'app/store/model';
import useRequest from './useRequest';
import {NETWORK} from 'app/config';
import {getInfrastructureListBlockchain, getInfrastructureListTokenContract} from 'app/servers/api/infrastructure';
import {getBalanceListBalance} from 'app/servers/api/balance';
import {useState, useCallback} from 'react';
import {getChainInfo} from 'app/utils/chain';

export type Platform = 'ETH' | 'SOLANA';

export interface BlockchainData {
  platform: Platform;
  chainId: number;
  network?: string;
}

export interface BalanceData extends BlockchainData {
  currency: string;
}

export interface TokenContractData {
  chainId: number;
  symbol: string;
  [key: string]: any;
}

export interface TokenData {
  chainName: string;
  chainIcon: string;
  token: {
    tokenSymbol: string;
    chainId: number;
    [key: string]: any;
  };
  [key: string]: any;
}

export interface ChainGroup {
  chainName: string;
  tokenList: TokenData[];
}

export interface BlockchainResponse {
  platform?: Platform;
  network?: string;
  chainId: number;
  [key: string]: any;
}

export default function useBlockchain() {
  const dispatch = useDispatch<Dispatch>();
  const {makeRequest} = useRequest();
  const [{currency, blockchainList}] = useRematchModel('app');
  const [loading, setLoading] = useState(false);

  // 获取区块链列表
  const getInfrastructureList = async () => {
    try {
      setLoading(true);
      let _blockchainList: BlockchainData[] = [];

      // 获取 ETH 平台的区块链列表
      const ethRes = await makeRequest(
        getInfrastructureListBlockchain({
          platform: 'ETH',
          network: NETWORK,
        }),
      );

      if (ethRes?.data) {
        const ethData = ethRes.data as BlockchainResponse[];
        _blockchainList = ethData.map((item) => ({
          platform: 'ETH' as Platform,
          chainId: item.chainId,
          network: item.network,
        }));
      }

      // 获取 SOLANA 平台的区块链列表
      const solanaRes = await makeRequest(
        getInfrastructureListBlockchain({
          platform: 'SOLANA',
          network: NETWORK,
        }),
      );

      if (solanaRes?.data) {
        const solanaData = solanaRes.data as BlockchainResponse[];
        const solanaBlockchains = solanaData.map((item) => ({
          platform: 'SOLANA' as Platform,
          chainId: item.chainId,
          network: item.network,
        }));
        _blockchainList = [..._blockchainList, ...solanaBlockchains];
      }

      // 更新状态
      dispatch.app.updateState({
        blockchainList: _blockchainList,
      });

      return _blockchainList;
    } catch (error) {
      console.error('获取区块链列表失败:', error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  // 获取余额列表
  const getBalanceList = useCallback(
    async ({platform, chainId, currency: targetCurrency = currency}: BalanceData) => {
      try {
        const res = await makeRequest(
          getBalanceListBalance({
            platform,
            chainId,
            currency: targetCurrency,
          }),
        );
        return res?.data || null;
      } catch (error) {
        console.error('获取余额列表失败:', error);
        return null;
      }
    },
    [makeRequest, currency],
  );

  // 获取所有链的余额
  const getAllBalances = useCallback(
    async (isRequest = false, selectedChainId?: number) => {
      if (!blockchainList?.length) return [];

      try {
        setLoading(true);
        let summaryBalance = 0;
        let tokenList: TokenData[] = [];

        if (isRequest) {
          // 使用 getInfrastructureListTokenContract 获取数据
          const tokenContractRes = await makeRequest(
            getInfrastructureListTokenContract({
              platform: 'ETH',
              network: NETWORK,
            }),
          );

          if (tokenContractRes?.data) {
            tokenList = tokenContractRes.data.map((token: TokenContractData) => {
              const chainInfo = getChainInfo(token.chainId);
              return {
                chainName: chainInfo?.name || '',
                chainIcon: chainInfo?.icon || '',
                currency: token?.priceCurrency,
                currencyAmount: '0',
                token: {
                  platform: token?.platform,
                  network: token?.network,
                  erc: token?.erc,
                  id: token?.id,
                  address: token?.address,
                  chainId: token?.chainId,
                  tokenName: token?.tokenName,
                  tokenSymbol: token?.tokenSymbol || token?.tokenName,
                  tokenDecimals: token?.tokenDecimals,
                  priceCurrency: token?.priceCurrency,
                  priceValue: token?.priceValue,
                  icon: token?.icon,
                },
                tokenAmount: '0',
                // token: {
                //   ...token,
                //   tokenSymbol: token.symbol,
                //   chainId: token.chainId,
                // },
              };
            });
            return tokenList;
          }
        }

        // 如果 isRequest 为 false 或者获取合约列表失败，则使用原有逻辑
        // 根据是否选择了特定链来决定要查询的链列表
        const chainsToQuery = selectedChainId
          ? blockchainList.filter((chain) => chain.chainId === selectedChainId)
          : blockchainList;

        // 如果查询的链列表为空，则等待 1 秒后返回空数组 模拟tron的情况
        if (chainsToQuery.length === 0) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          // 更新总余额
          dispatch.user.updateState({
            availableBalance: summaryBalance,
          });
          return tokenList;
        }

        // 并行获取所有选中链的余额
        const results = await Promise.all(
          chainsToQuery.map((chain) =>
            getBalanceList({
              platform: chain.platform,
              chainId: chain.chainId,
              currency,
            }),
          ),
        );

        // 处理结果
        tokenList = results
          .filter(Boolean)
          .flatMap((result) => {
            if (result?.summary?.balance) {
              summaryBalance += Number(result.summary.balance);
            }
            return result?.tokens || [];
          })
          .map((token) => {
            const chainInfo = getChainInfo(token?.token?.chainId);
            return {
              token: token.token,
              ...token,
              chainName: chainInfo?.name || '',
              chainIcon: chainInfo?.icon || '',
            };
          });

        // 更新总余额
        dispatch.user.updateState({
          availableBalance: summaryBalance,
        });

        return tokenList;
      } catch (error) {
        console.error('获取所有余额失败:', error);
        return [];
      } finally {
        setLoading(false);
      }
    },
    [blockchainList, currency, getBalanceList, dispatch],
  );

  // 将 token 列表转换为按链分组的数据
  const convertToChainGroups = useCallback((tokenList: TokenData[]): ChainGroup[] => {
    const groupedData = tokenList.reduce<ChainGroup[]>((acc, token) => {
      const chainInfo = getChainInfo(token?.token?.chainId);
      if (!chainInfo) return acc;

      const tokenData: TokenData = {
        chainName: chainInfo.name,
        chainIcon: chainInfo.icon,
        ...token,
      };

      const existingChainGroup = acc.find((group) => group.chainName === chainInfo.name);
      if (existingChainGroup) {
        existingChainGroup.tokenList.push(tokenData);
      } else {
        acc.push({
          chainName: chainInfo.name,
          tokenList: [tokenData],
        });
      }

      return acc;
    }, []);

    return groupedData.sort((a, b) => a.chainName.localeCompare(b.chainName));
  }, []);

  // 根据平台获取区块链列表
  const getBlockchainsByPlatform = useCallback(
    (platform: Platform) => {
      return blockchainList.filter((blockchain: BlockchainData) => blockchain.platform === platform);
    },
    [blockchainList],
  );

  return {
    getInfrastructureList,
    getBalanceList,
    getAllBalances,
    getBlockchainsByPlatform,
    convertToChainGroups,
    loading,
    blockchainList,
  };
}
