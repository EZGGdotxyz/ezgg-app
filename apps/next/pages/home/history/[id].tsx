/*
 * @Date: 2023-12-07 15:49:22
 * @LastEditors: yosan
 * @LastEditTime: 2025-02-25 20:21:05
 * @FilePath: /ezgg-app/apps/next/pages/home/history/[id].tsx
 */
import HistoryDetailScreen from 'app/pages/home/history/detail';
import Head from 'next/head';
import {useTranslation} from 'react-i18next';

export default function Page() {
  const {t} = useTranslation();

  return (
    <>
      <Head>
        <title>{t('screen.home.detail.title')}</title>
        <meta name="theme-color" content="#FEB54F" />
      </Head>
      <HistoryDetailScreen />
    </>
  );
}
