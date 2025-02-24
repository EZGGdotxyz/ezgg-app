/*
 * @Date: 2023-12-07 15:49:22
 * @LastEditors: yosan
 * @LastEditTime: 2025-02-24 16:52:37
 * @FilePath: /ezgg-app/apps/next/pages/home/request/amount.tsx
 */
import AmountRequestingScreen from 'app/pages/home/request/amount';
import Head from 'next/head';
import {useTranslation} from 'react-i18next';

export default function Page() {
  const {t} = useTranslation();

  return (
    <>
      <Head>
        <title>{t('screen.home.amountRequesting')}</title>
      </Head>
      <AmountRequestingScreen />
    </>
  );
}
