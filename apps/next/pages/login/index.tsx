/*
 * @Date: 2023-12-07 15:49:22
 * @LastEditors: snapxlabs
 * @LastEditTime: 2024-08-03 16:30:37
 * @FilePath: /snapx-nfc-app-merchants/apps/next/pages/login/index.tsx
 */
import LoginHomeScreen from 'app/pages/auth/login';
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
