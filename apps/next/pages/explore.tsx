/*
 * @Date: 2023-12-07 15:49:22
 * @LastEditors: yosan
 * @LastEditTime: 2025-02-24 16:58:23
 * @FilePath: /ezgg-app/apps/next/pages/explore.tsx
 */
import ExploreScreen from 'app/pages/explore/index';
import Head from 'next/head';
import {useTranslation} from 'react-i18next';
export default function Page() {
  const {t} = useTranslation();
  return (
    <>
      <Head>
        <title>{t('screen.explore.titl')}</title>
      </Head>
      <ExploreScreen />
    </>
  );
}
