/*
 * @Date: 2025-03-03 10:00:00
 * @LastEditors: yosan
 * @LastEditTime: 2025-03-03 23:08:30
 * @FilePath: /ezgg-app/packages/app/utils/chain.ts
 */
import {bsc, polygon, base, baseSepolia, polygonAmoy, bscTestnet} from 'wagmi/chains';

interface ChainInfo {
  name: string;
  icon: string;
}

/**
 * 根据链路ID获取链路信息
 * @param chainId 链路ID
 * @returns 链路信息对象，包含名称和图标
 */
export function getChainInfo(chainId?: any): ChainInfo {
  if (!chainId || chainId === 'undefined') {
    return {
      name: '',
      icon: '',
    };
  }

  switch (chainId) {
    case bsc.id:
    case bscTestnet.id:
    case 56:
    case 97:
      return {
        name: 'BSC',
        icon: 'BSC',
      };
    case polygon.id:
    case polygonAmoy.id:
    case 137:
    case 80002:
    case 80001:
      return {
        name: 'Polygon',
        icon: 'Polygon',
      };

    case base.id:
    case baseSepolia.id:
    case 8453:
    case 84532:
      return {
        name: 'Base',
        icon: 'Base',
      };
    // tron
    case 100001:
      return {
        name: 'Tron',
        icon: 'Tron',
      };
    // solana
    case 9999:
      return {
        name: 'Solana',
        icon: 'Solana',
      };
    default:
      return {
        name: '',
        icon: '',
      };
  }
}
