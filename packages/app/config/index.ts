/*
 * @Date: 2023-12-30 18:40:54
 * @LastEditors: yosan
 * @LastEditTime: 2025-03-07 10:43:16
 * @FilePath: /ezgg-app/packages/app/config/index.ts
 */
export const ExternalLinkData = {
  webPageHome: 'https://app.catfoodworks.com',
};

// 主题色
export const PrimaryColor = '#FEB54F';

export const SubColor = '#f39965';

export const DefaultLanguage = 'en_US';

export const AppName = 'ezgg.app';

export const CurrencyList = [
  {
    id: '1',
    emoji: '🇺🇸',
    chineseName: '美元',
    englishName: 'US dollar',
    code: 'usd',
    label: 'USD',
  },
  {
    id: '2',
    emoji: '🇨🇳',
    chineseName: '人民幣',
    englishName: 'Chinese yuan',
    code: 'cny',
    label: 'CNY',
  },
  {
    id: '3',
    emoji: '🇭🇰',
    chineseName: '港幣',
    englishName: 'Hong Kong dollar',
    code: 'hkd',
    label: 'HKD',
  },
  {
    id: '4',
    emoji: '🇸🇬',
    chineseName: '新加坡幣',
    englishName: 'Singapore dollar',
    code: 'sgd',
    label: 'SGD',
  },
];

// 是否生产环境
const isRelease = false;

// api 请求接口
export const APP_URL = isRelease ? 'https://api.catfoodworks.com' : '/api';

// 区块链网路类型：MAIN 主网；TEST 测试网；DEV 开发网
export const NETWORK = isRelease ? 'MAIN' : 'TEST';
