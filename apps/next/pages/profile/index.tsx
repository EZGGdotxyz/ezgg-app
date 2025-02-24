/*
 * @Date: 2023-12-07 15:49:22
 * @LastEditors: yosan
 * @LastEditTime: 2025-02-24 16:59:49
 * @FilePath: /ezgg-app/apps/next/pages/profile/index.tsx
 */
import MyScreen from 'app/pages/profile/home/index';
import Head from 'next/head';
import {useTranslation} from 'react-i18next';

import TabBar from 'app/Components/TabBar/index';
const dfState = {
  index: 2,
  routes: [{name: 'home'}, {name: 'explore'}, {name: 'profile'}],
};
export default function Page() {
  const {t} = useTranslation();

  return (
    <>
      <Head>
        <title>{t('screen.profile.title')}</title>
      </Head>
      <MyScreen />
      <TabBar state={dfState} descriptors={undefined} navigation={undefined} />
    </>
  );
}
