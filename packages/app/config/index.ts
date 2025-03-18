/*
 * @Date: 2023-12-30 18:40:54
 * @LastEditors: yosan
 * @LastEditTime: 2025-03-18 09:48:34
 * @FilePath: /ezgg-app/packages/app/config/index.ts
 */
// 主题色
export const PrimaryColor = '#FEB54F';

export const SubColor = '#f39965';

export const DefaultLanguage = 'en_US';

export const AppName = 'ezgg.xyz';
export const MAX_WIDTH = 768;

export const CurrencyList = [
  {
    id: '1',
    emoji: '🇺🇸',
    chineseName: '美元',
    englishName: 'US dollar',
    code: 'usd',
    label: 'USD',
    symbol: '$',
  },
  {
    id: '2',
    emoji: '🇨🇳',
    chineseName: '人民幣',
    englishName: 'Chinese yuan',
    code: 'cny',
    label: 'CNY',
    symbol: '¥',
  },
  {
    id: '3',
    emoji: '🇭🇰',
    chineseName: '港幣',
    englishName: 'Hong Kong dollar',
    code: 'hkd',
    label: 'HKD',
    symbol: 'HK$',
  },
  {
    id: '4',
    emoji: '🇸🇬',
    chineseName: '新加坡幣',
    englishName: 'Singapore dollar',
    code: 'sgd',
    label: 'SGD',
    symbol: 'S$',
  },
];

// 是否生产环境
const isRelease = true;

// api 请求接口
export const APP_URL = isRelease ? 'https://api.ezgg.xyz' : 'https://apiv2.catfoodworks.com';

// export const APP_URL = isRelease ? '/api/' : 'https://apiv2.catfoodworks.com';

// privy id
export const PRIVY_APP_ID = isRelease ? 'cm8csbmfc018vhknhlq3ltrgq' : 'cm74gcbre00h972np2f6bdut8';

// 区块链网路类型：MAIN 主网；TEST 测试网；DEV 开发网
export const NETWORK = isRelease ? 'MAIN' : 'TEST';

export const ExternalLinkData = {
  webPageHome: isRelease ? 'https://www.ezgg.xyz' : 'https://app.catfoodworks.com',
};
