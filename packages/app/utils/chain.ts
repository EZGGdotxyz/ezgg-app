/*
 * @Date: 2025-03-03 10:00:00
 * @LastEditors: yosan
 * @LastEditTime: 2025-03-06 14:24:42
 * @FilePath: /ezgg-app/packages/app/utils/chain.ts
 */
import {getAddress} from 'viem';
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

/**
 * 根据链路ID和交易哈希获取区块链浏览器链接
 * @param chainId 链路ID
 * @param hash 交易哈希
 * @returns 区块链浏览器链接
 */
export function getExplorerUrl(chainId?: any, hash?: string): string {
  if (!chainId || !hash) {
    return '';
  }

  switch (chainId) {
    case bsc.id:
    case 56:
      return `https://bscscan.com/tx/${hash}`;
    case bscTestnet.id:
    case 97:
      return `https://testnet.bscscan.com/tx/${hash}`;
    case polygon.id:
    case 137:
      return `https://polygonscan.com/tx/${hash}`;
    case polygonAmoy.id:
    case 80002:
    case 80001:
      return `https://mumbai.polygonscan.com/tx/${hash}`;
    case base.id:
    case 8453:
      return `https://basescan.org/tx/${hash}`;
    case baseSepolia.id:
    case 84532:
      return `https://sepolia.basescan.org/tx/${hash}`;
    // tron
    case 201:
      return `https://tronscan.org/#/transaction/${hash}`;
    // solana
    case 501:
      return `https://solscan.io/tx/${hash}`;
    default:
      return '';
  }
}

export const validateAddress = (address: string, chainId: number) => {
  try {
    // 根据不同的链ID进行验证
    switch (chainId) {
      case 1: // Ethereum Mainnet
      case 5: // Goerli
      case 137: // Polygon
      case 80001: // Mumbai
      case 80002: // Polygon Amoy
      case 84532: // Base Sepolia
      case 8453: // Base
        // 检查 EVM 兼容链地址格式
        const validAddress = getAddress(address);
        return validAddress.startsWith('0x') && validAddress.length === 42;

      case 56: // BSC
      case 97: // BSC Testnet
        // 检查 EVM 兼容链地址格式
        const validAddress2 = getAddress(address);
        return validAddress2.startsWith('0x') && validAddress2.length === 42;

      case 501: // Solana
        // Solana 地址是 base58 编码的 32 字节
        return /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(address);

      case 201: // Tron
        // Tron 地址以 T 开头，长度为 34
        return /^T[1-9A-HJ-NP-Za-km-z]{33}$/.test(address);

      default:
        return false;
    }
  } catch (error) {
    return false;
  }
};
