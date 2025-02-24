/*
 * @Date: 2023-12-07 15:49:22
 * @LastEditors: yosan
 * @LastEditTime: 2025-02-24 16:49:00
 * @FilePath: /ezgg-app/apps/next/pages/profile/scan.tsx
 */
import ScanScreen from 'app/pages/profile/scan';
import Head from 'next/head';
import {useTranslation} from 'react-i18next';

export default function Page() {
  const {t} = useTranslation();

  return (
    <>
      <Head>
        <title>{t('screen.profile.scan.title')}</title>
      </Head>
      <ScanScreen />
    </>
  );
}
