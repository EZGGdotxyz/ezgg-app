/*
 * @Date: 2023-12-07 15:49:22
 * @LastEditors: yosan
 * @LastEditTime: 2025-03-05 12:59:58
 * @FilePath: /ezgg-app/apps/next/pages/claim/[code].tsx
 */
import {AppName, DefaultLanguage, ExternalLinkData} from 'app/config';
import TakeScreen from 'app/pages/home/take';
import {getLanguage} from 'app/utils/auth';
import Head from 'next/head';
import {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {createParam} from 'solito';

const {useParams} = createParam<any>();
export default function Page() {
  const {t} = useTranslation();

  const {params} = useParams();

  const [locale, setLocale] = useState('');

  const setMeta = async () => {
    const locale = (await getLanguage()) || DefaultLanguage;
    setLocale(locale);
  };

  useEffect(() => {
    setMeta();
  }, []);

  return (
    <>
      <Head>
        <title>{t('home.claim.title')}</title>
        <meta property="og:title" content={t('home.claim.title')} />
        <meta property="og:description" content={t('home.claim.description')} />
        <meta property="og:image" content={`${ExternalLinkData?.webPageHome}/images/logo.png`} />
        <meta property="og:url" content={`${ExternalLinkData?.webPageHome}/home/claim/${params?.code}`} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={AppName} />
        <meta property="og:locale" content={locale} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="og:title" content={t('home.claim.title')} />
        <meta name="twitter:description" content={t('home.claim.description')} />
        <meta name="twitter:image" content={`${ExternalLinkData?.webPageHome}/images/logo.png`} />
        <meta name="twitter:url" content={`${ExternalLinkData?.webPageHome}/home/claim/${params?.code}`} />

        <meta name="twitter:site" content={AppName} />
        <meta name="twitter:creator" content={AppName} />
      </Head>
      <TakeScreen />
    </>
  );
}
