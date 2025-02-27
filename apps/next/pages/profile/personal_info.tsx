/*
 * @Date: 2023-12-07 15:49:22
 * @LastEditors: yosan
 * @LastEditTime: 2025-02-27 15:58:55
 * @FilePath: /ezgg-app/apps/next/pages/profile/personal_info.tsx
 */
import PersonalInfoScreen from 'app/pages/profile/personal_info';
import Head from 'next/head';
import { useTranslation } from 'react-i18next';

export default function Page() {
  const {t} = useTranslation();

  return (
    <>
      <Head>
        <title>{t('screen.personal_info.title')}</title>
      </Head>
      <PersonalInfoScreen />
    </>
  );
}
