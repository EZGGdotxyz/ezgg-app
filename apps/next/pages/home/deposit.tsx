/*
 * @Date: 2023-12-07 15:49:22
 * @LastEditors: yosan
 * @LastEditTime: 2025-02-24 16:51:03
 * @FilePath: /ezgg-app/apps/next/pages/home/deposit.tsx
 */
import DepositScreen from 'app/pages/home/deposit';
import Head from 'next/head';
import {useTranslation} from 'react-i18next';

export default function Page() {
  const {t} = useTranslation();

  return (
    <>
      <Head>
        <title>{t('screen.home.deposit')}</title>
      </Head>
      <DepositScreen />
    </>
  );
}
