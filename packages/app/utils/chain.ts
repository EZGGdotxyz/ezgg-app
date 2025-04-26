/*
 * @Date: 2025-03-03 10:00:00
 * @LastEditors: yosan
 * @LastEditTime: 2025-04-19 20:23:18
 * @FilePath: /ezgg-app/packages/app/utils/chain.ts
 */
import {getAddress} from 'viem';
import {bsc, polygon, base, baseSepolia, polygonAmoy, bscTestnet} from 'wagmi/chains';

// 常量定义
const TRUST_WALLET_ASSETS_BASE_URL = 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains';
const DEFAULT_WETH_ADDRESS = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2';
const NATIVE_TOKEN_ADDRESS = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee';

// 链相关类型定义
export type ChainId = 1 | 56 | 137 | 8453 | 728126428 | 97 | 80001 | 80002 | 84532 | 100001 | 9999;

// 链配置
interface ChainConfig {
  name: string;
  assetName: string;
  explorerUrl: string;
  testnetExplorerUrl?: string;
  isEVM: boolean;
  wethAddress?: string;
}

// 链配置映射
const CHAIN_CONFIGS: {[key in number]: ChainConfig} = {
  56: {
    name: 'BSC',
    assetName: 'smartchain',
    explorerUrl: 'https://bscscan.com',
    testnetExplorerUrl: 'https://testnet.bscscan.com',
    isEVM: true,
  },
  137: {
    name: 'Polygon',
    assetName: 'polygon',
    explorerUrl: 'https://polygonscan.com',
    testnetExplorerUrl: 'https://mumbai.polygonscan.com',
    isEVM: true,
  },
  8453: {
    name: 'Base',
    assetName: 'base',
    explorerUrl: 'https://basescan.org',
    testnetExplorerUrl: 'https://sepolia.basescan.org',
    isEVM: true,
  },
  10143: {
    name: 'Monad',
    assetName: 'monad',
    explorerUrl: 'https://testnet.monadexplorer.com',
    testnetExplorerUrl: 'https://testnet.monadexplorer.com',
    isEVM: true,
  },
  421614: {
    name: 'Arbitrum',
    assetName: 'arbitrum',
    explorerUrl: 'https://arbiscan.io',
    testnetExplorerUrl: 'https://sepolia.arbiscan.io',
    isEVM: true,
  },
  534352: {
    name: 'Scroll',
    assetName: 'scroll',
    explorerUrl: 'https://scrollscan.com',
    testnetExplorerUrl: 'https://sepolia.scrollscan.com',
    isEVM: true,
  },

  728126428: {
    name: 'Tron',
    assetName: 'tron',
    explorerUrl: 'https://tronscan.org',
    isEVM: false,
  },
  9999: {
    name: 'Solana',
    assetName: 'solana',
    explorerUrl: 'https://solscan.io',
    isEVM: false,
  },
};

// 接口定义
export interface ChainInfo {
  name: string;
  icon: string;
}

/**
 * 获取链配置信息
 * @param chainId 链ID
 * @returns 链配置信息
 */
const getChainConfig = (chainId: number): ChainConfig | undefined => {
  // 处理测试网到主网的映射
  const mainnetChainId =
    {
      97: 56, // BSC Testnet -> BSC
      80001: 137, // Mumbai -> Polygon
      80002: 137, // Polygon Amoy -> Polygon
      84532: 8453, // Base Sepolia -> Base
      42161: 421614, // Arbitrum -> Arbitrum
      10143: 10143, // Monad Testnet -> Monad
      534351: 534352, // Scroll -> Scroll
    }[chainId] || chainId;

  return CHAIN_CONFIGS[mainnetChainId];
};

/**
 * 根据链路ID获取链路信息
 */
export function getChainInfo(chainId?: number): ChainInfo {
  if (!chainId) {
    return {name: '', icon: ''};
  }

  const config = getChainConfig(chainId);
  if (!config) {
    return {name: '', icon: ''};
  }

  return {
    name: config.name,
    icon: config.name,
  };
}

/**
 * 获取区块链浏览器链接
 */
export function getExplorerUrl(chainId?: number, hash?: string): string {
  if (!chainId || !hash) return '';

  const config = getChainConfig(chainId);
  if (!config) return '';

  const baseUrl = isTestnet(chainId) && config.testnetExplorerUrl ? config.testnetExplorerUrl : config.explorerUrl;

  return `${baseUrl}/tx/${hash}`;
}

/**
 * 验证地址格式
 */
export const validateAddress = (address: string, chainId: number): boolean => {
  try {
    const config = getChainConfig(chainId);
    if (!config) return false;

    if (config.isEVM) {
      const validAddress = getAddress(address);
      return validAddress.startsWith('0x') && validAddress.length === 42;
    }

    // Solana 地址验证
    if (config.assetName === 'solana') {
      return /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(address);
    }

    // Tron 地址验证
    if (config.assetName === 'tron') {
      return /^T[1-9A-HJ-NP-Za-km-z]{33}$/.test(address);
    }

    return false;
  } catch (error) {
    return false;
  }
};

/**
 * 获取代币图标URL
 */
export const getTrustWalletAssetUrl = (address: string, chainId: number): string => {
  const config = getChainConfig(chainId);
  if (!config) return getDefaultTokenIcon();

  if (isNativeToken(address, chainId)) {
    return `${TRUST_WALLET_ASSETS_BASE_URL}/${config.assetName}/info/logo.png`;
  }

  if (address) {
    return `${TRUST_WALLET_ASSETS_BASE_URL}/${config.assetName}/assets/${address}/logo.png`;
  }

  return getDefaultTokenIcon();
};

/**
 * 判断是否为原生代币
 */
const isNativeToken = (address: string, chainId: number): boolean => {
  const config = getChainConfig(chainId);
  if (!config) return false;

  // 检查地址是否为空
  if (!address) return false;

  // 转换为小写进行比较
  const lowerAddress = address.toLowerCase();

  // 检查是否是 EVM 链的 WETH 地址
  if (config.isEVM) {
    const wethAddress = config.wethAddress?.toLowerCase();
    return lowerAddress === wethAddress || lowerAddress === NATIVE_TOKEN_ADDRESS;
  }

  // 检查是否是特定链的原生代币
  switch (config.assetName) {
    case 'tron':
      return lowerAddress === 'trx';
    case 'solana':
      return lowerAddress === 'sol';
    default:
      return false;
  }
};

/**
 * 判断是否为测试网
 */
const isTestnet = (chainId: number): boolean => {
  return [97, 80001, 80002, 84532].includes(chainId);
};

/**
 * 获取默认代币图标
 */
const getDefaultTokenIcon = (): string => {
  return `${TRUST_WALLET_ASSETS_BASE_URL}/ethereum/assets/${DEFAULT_WETH_ADDRESS}/logo.png`;
};

/**
 * 获取链图标URL
 */
export const getChainIconUrl = (chainId: number): string => {
  const config = getChainConfig(chainId);
  if (!config) return getDefaultChainIcon();

  return `${TRUST_WALLET_ASSETS_BASE_URL}/${config.assetName}/info/logo.png`;
};

/**
 * 获取默认链图标
 */
const getDefaultChainIcon = (): string => {
  return `${TRUST_WALLET_ASSETS_BASE_URL}/ethereum/info/logo.png`;
};
