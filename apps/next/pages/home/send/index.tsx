/*
 * @Date: 2023-12-07 15:49:22
 * @LastEditors: yosan
 * @LastEditTime: 2025-03-03 21:14:21
 * @FilePath: /ezgg-app/apps/next/pages/home/send/index.tsx
 */
import SendToScreen from 'app/pages/home/pay/contact';
import Head from 'next/head';
import {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';

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
        <title>{t('screen.home.sendTo')}</title>
      </Head>
      <SendToScreen isRefresh={isRefresh} type="send" />
    </>
  );
}
