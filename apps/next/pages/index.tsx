/*
 * @Date: 2023-12-07 15:49:22
 * @LastEditors: yosan
 * @LastEditTime: 2025-02-27 22:49:48
 * @FilePath: /ezgg-app/apps/next/pages/index.tsx
 */
import HomeScreen from 'app/pages/home/index';
import Head from 'next/head';
import {useTranslation} from 'react-i18next';
import TabBar from 'app/Components/TabBar/index';
const dfState = {
  index: 0,
  routes: [{name: 'home'}, {name: 'explore'}, {name: 'profile'}],
};
export default function Page() {
  const {t} = useTranslation();
  return (
    <>
      <Head>
        <title>{t('screen.home.title')}</title>
        <meta name="theme-color" content="#FEB54F" />
      </Head>
      <HomeScreen />
      <TabBar state={dfState} descriptors={undefined} navigation={undefined} />
    </>
  );
}
