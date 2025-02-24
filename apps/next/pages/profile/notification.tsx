/*
 * @Date: 2023-12-07 15:49:22
 * @LastEditors: yosan
 * @LastEditTime: 2025-02-24 16:48:19
 * @FilePath: /ezgg-app/apps/next/pages/profile/notification.tsx
 */
import NotificationScreen from 'app/pages/profile/notification';
import Head from 'next/head';
import {useTranslation} from 'react-i18next';

export default function Page() {
  const {t} = useTranslation();

  return (
    <>
      <Head>
        <title>{t('screen.profile.notification.title')}</title>
      </Head>
      <NotificationScreen />
    </>
  );
}
