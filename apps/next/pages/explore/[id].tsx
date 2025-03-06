/*
 * @Date: 2023-12-07 15:49:22
 * @LastEditors: yosan
 * @LastEditTime: 2025-03-05 13:09:29
 * @FilePath: /ezgg-app/apps/next/pages/explore/amount.tsx
 */
import AmountScreen from 'app/pages/explore/amount';
import Head from 'next/head';
import {useTranslation} from 'react-i18next';
export default function Page() {
  const {t} = useTranslation();
  return (
    <>
      <Head>
        <title>{t('screen.home.send')}</title>
        <meta name="theme-color" content="#1F222A" />
      </Head>
      <AmountScreen />
    </>
  );
}
