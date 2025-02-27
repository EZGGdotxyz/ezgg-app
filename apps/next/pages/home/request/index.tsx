/*
 * @Date: 2023-12-07 15:49:22
 * @LastEditors: yosan
 * @LastEditTime: 2025-02-24 16:53:04
 * @FilePath: /ezgg-app/apps/next/pages/home/request/index.tsx
 */
import RequestFromScreen from 'app/pages/home/request/index';
import Head from 'next/head';
import {useTranslation} from 'react-i18next';
import { useEffect, useState } from 'react';

export default function Page() {
  const {t} = useTranslation();
  const [isRefresh, setIsRefresh] = useState(false);

  useEffect(() => {
    setIsRefresh(true);
    return () => {
      setIsRefresh(false);
      // 在这里执行清理操作，例如取消获取数据
    };
  }, []);
  return (
    <>
      <Head>
        <title>{t('screen.home.requestFrom')}</title>
      </Head>
      <RequestFromScreen isRefresh={isRefresh} />
    </>
  );
}
