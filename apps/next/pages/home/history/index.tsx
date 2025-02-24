/*
 * @Date: 2023-12-07 15:49:22
 * @LastEditors: yosan
 * @LastEditTime: 2025-02-24 17:06:33
 * @FilePath: /ezgg-app/apps/next/pages/home/history/index.tsx
 */
import HistoryScreen from 'app/pages/home/history/list';
import Head from 'next/head';
import {useTranslation} from 'react-i18next';

export default function Page() {
  const {t} = useTranslation();

  return (
    <>
      <Head>
        <title>{t('screen.home.history')}</title>
      </Head>
      <HistoryScreen />
    </>
  );
}
