import {DefaultTheme} from '@react-navigation/native';
/*
 * @Date: 2023-12-30 18:40:54
 * @LastEditors: yosan
 * @LastEditTime: 2025-03-03 10:48:36
 * @FilePath: /ezgg-app/packages/app/config/index.ts
 */
export const ExternalLinkData = {
  webPageHome: 'https://www.bitenet.io',
  // webPageAgreement: 'https://agreement.bitenet.io',
  // webPagePrivacy: 'https://privacy.bitenet.io',
  // webPageContact: 'https://www.bitenet.io/contact',
  // webPageRestaurant: 'https://www.bitenet.io/restaurant',
  // webPageMarketplace: 'https://www.bitenet.io/marketplace',
  // appDownload: 'https://itunes.apple.com/cn/app/6477260172',
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
export const APP_URL = isRelease ? 'https://api.catfoodworks.com' : 'https://api.catfoodworks.com';

// 区块链网路类型：MAIN 主网；TEST 测试网；DEV 开发网
export const NETWORK = isRelease ? 'MAIN' : 'TEST';
