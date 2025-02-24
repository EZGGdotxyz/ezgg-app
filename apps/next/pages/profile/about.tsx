/*
 * @Date: 2023-12-07 15:49:22
 * @LastEditors: yosan
 * @LastEditTime: 2025-02-24 16:45:39
 * @FilePath: /ezgg-app/apps/next/pages/profile/faq.tsx
 */
import AboutScreen from 'app/pages/profile/about';
import Head from 'next/head';
import {useTranslation} from 'react-i18next';

export default function Page() {
  const {t} = useTranslation();

  return (
    <>
      <Head>
        <title>{t('screen.profile.aboutEzgg.title')}</title>
      </Head>
      <AboutScreen />
    </>
  );
}
