/*
 * @Date: 2023-12-07 15:49:22
 * @LastEditors: yosan
 * @LastEditTime: 2025-02-25 20:21:10
 * @FilePath: /ezgg-app/apps/next/pages/explore.tsx
 */
import ExploreScreen from 'app/pages/explore/index';
import Head from 'next/head';
import {useTranslation} from 'react-i18next';
export default function Page() {
  const {t} = useTranslation();
  return (
    <>
      <Head>
        <title>{t('screen.explore.titl')}</title>
        <meta name="theme-color" content="#1F222A" />
      </Head>
      <ExploreScreen />
    </>
  );
}
