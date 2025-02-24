/*
 * @Date: 2023-12-07 15:49:22
 * @LastEditors: yosan
 * @LastEditTime: 2025-02-24 16:55:31
 * @FilePath: /ezgg-app/apps/next/pages/home/send/paylink.tsx
 */
import PayLinkScreen from 'app/pages/home/send/paylink';
import Head from 'next/head';
import {useTranslation} from 'react-i18next';

export default function Page() {
  const {t} = useTranslation();

  return (
    <>
      <Head>
        <title>{t('screen.home.paylink')}</title>
      </Head>
      <PayLinkScreen />
    </>
  );
}
