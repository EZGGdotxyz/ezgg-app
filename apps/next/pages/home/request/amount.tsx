/*
 * @Date: 2023-12-07 15:49:22
 * @LastEditors: yosan
 * @LastEditTime: 2025-03-03 21:14:58
 * @FilePath: /ezgg-app/apps/next/pages/home/request/amount.tsx
 */
import AmountRequestingScreen from 'app/pages/home/pay/amount';
import Head from 'next/head';
import {useTranslation} from 'react-i18next';

export default function Page() {
  const {t} = useTranslation();

  return (
    <>
      <Head>
        <title>{t('screen.home.amountRequesting')}</title>
      </Head>
      <AmountRequestingScreen type="request" />
    </>
  );
}
