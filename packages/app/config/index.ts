import {DefaultTheme} from '@react-navigation/native';
/*
 * @Date: 2023-12-30 18:40:54
 * @LastEditors: yosan
 * @LastEditTime: 2025-02-27 17:25:07
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

// 是否生产环境
const isRelease = false;

// api 请求接口
export const APP_URL = isRelease ? 'https://api.catfoodworks.com' : 'https://api.catfoodworks.com';

// 区块链网路类型：MAIN 主网；TEST 测试网；DEV 开发网
export const NETWORK = isRelease ? 'MAIN' : 'TEST';
