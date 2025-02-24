/*
 * @Date: 2023-12-08 10:05:00
 * @LastEditors: snapxlabs
 * @LastEditTime: 2024-07-08 17:59:12
 * @FilePath: /snapx-nfc-app/packages/app/locales/index.ts
 */
import i18n from 'i18next';
import 'intl-pluralrules';
import { initReactI18next } from 'react-i18next';
import enUS from './locales/en_US';
import zhHK from './locales/zh_HK';
import { DefaultLanguage } from 'app/config';

i18n.use(initReactI18next).init({
  lng: DefaultLanguage,
  fallbackLng: DefaultLanguage,
  resources: {
    zh_HK: {
      translation: zhHK,
    },
    en_US: {
      translation: enUS,
    },
  },
  debug: false,
});

export default i18n;
