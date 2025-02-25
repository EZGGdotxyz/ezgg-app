/*
 * @Date: 2023-12-07 15:49:22
 * @LastEditors: yosan
 * @LastEditTime: 2025-02-25 11:46:35
 * @FilePath: /ezgg-app/apps/next/pages/home/success.tsx
 */
import SuccessScreen from 'app/pages/home/success';
import Head from 'next/head';
import {useTranslation} from 'react-i18next';

export default function Page() {
  const {t} = useTranslation();

  return (
    <>
      <Head>
        <title>{t('screen.home.success.title')}</title>
      </Head>
      <SuccessScreen />
    </>
  );
}
