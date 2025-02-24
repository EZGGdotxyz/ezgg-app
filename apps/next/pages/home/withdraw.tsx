/*
 * @Date: 2023-12-07 15:49:22
 * @LastEditors: yosan
 * @LastEditTime: 2025-02-24 16:49:48
 * @FilePath: /ezgg-app/apps/next/pages/home/withdraw.tsx
 */
import WithdrawScreen from 'app/pages/home/withdraw';
import Head from 'next/head';
import {useTranslation} from 'react-i18next';

export default function Page() {
  const {t} = useTranslation();

  return (
    <>
      <Head>
        <title>{t('screen.home.withdraw')}</title>
      </Head>
      <WithdrawScreen />
    </>
  );
}
