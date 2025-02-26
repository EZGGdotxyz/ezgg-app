/*
 * @Date: 2023-12-07 15:49:22
 * @LastEditors: yosan
 * @LastEditTime: 2025-02-26 10:45:59
 * @FilePath: /ezgg-app/apps/next/pages/login/index.tsx
 */
import LoginHomeScreen from 'app/pages/auth/login2';
import Head from 'next/head';
import {useTranslation} from 'react-i18next';
export default function Page() {
  const {t} = useTranslation();

  return (
    <>
      <Head>
        <title>{t('screen.login.title')}</title>
      </Head>
      <LoginHomeScreen />
    </>
  );
}
