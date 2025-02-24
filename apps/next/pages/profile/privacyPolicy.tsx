/*
 * @Date: 2023-12-07 15:49:22
 * @LastEditors: yosan
 * @LastEditTime: 2025-02-24 16:48:39
 * @FilePath: /ezgg-app/apps/next/pages/profile/privacyPolicy.tsx
 */
import PrivacyPolicyScreen from 'app/pages/profile/privacyPolicy';
import Head from 'next/head';
import {useTranslation} from 'react-i18next';

export default function Page() {
  const {t} = useTranslation();

  return (
    <>
      <Head>
        <title>{t('screen.profile.privacyPolicy.title')}</title>
      </Head>
      <PrivacyPolicyScreen />
    </>
  );
}
