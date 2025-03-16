/*
 * @Date: 2023-12-07 15:49:22
 * @LastEditors: yosan
 * @LastEditTime: 2025-03-15 22:48:40
 * @FilePath: /ezgg-app/apps/next/pages/home/replace.tsx
 */
import ReplaceScreen from 'app/pages/home/pay/replace';
import Head from 'next/head';
import {useTranslation} from 'react-i18next';

export default function Page() {
  const {t} = useTranslation();

  return (
    <>
      <Head>
        <title>{t('home.paylink.approveTransaction')}</title>
      </Head>
      <ReplaceScreen />
    </>
  );
}
