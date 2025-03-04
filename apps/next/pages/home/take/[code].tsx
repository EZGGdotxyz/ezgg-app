/*
 * @Date: 2023-12-07 15:49:22
 * @LastEditors: yosan
 * @LastEditTime: 2025-03-04 13:36:35
 * @FilePath: /ezgg-app/apps/next/pages/home/take/[code].tsx
 */
import { AppName } from 'app/config';
import TakeScreen from 'app/pages/home/take';
import Head from 'next/head';
import {useTranslation} from 'react-i18next';

export default function Page() {
  const {t} = useTranslation();

  return (
    <>
      <Head>
        <title>{AppName}</title>
        <meta name="theme-color" content="#FEB54F" />
      </Head>
      <TakeScreen />
    </>
  );
}
