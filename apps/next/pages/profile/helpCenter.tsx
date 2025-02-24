/*
 * @Date: 2023-12-07 15:49:22
 * @LastEditors: yosan
 * @LastEditTime: 2025-02-24 16:47:55
 * @FilePath: /ezgg-app/apps/next/pages/profile/helpCenter.tsx
 */
import HelpCenterScreen from 'app/pages/profile/helpCenter';
import Head from 'next/head';
import {useTranslation} from 'react-i18next';

export default function Page() {
  const {t} = useTranslation();

  return (
    <>
      <Head>
        <title>{t('screen.profile.helpCenter.title')}</title>
      </Head>
      <HelpCenterScreen />
    </>
  );
}
