/*
 * @Date: 2023-12-08 16:25:15
 * @LastEditors: yosan
 * @LastEditTime: 2025-02-25 18:01:05
 * @FilePath: /ezgg-app/packages/app/Components/SuccessInfo/index.tsx
 */
import {AppImage, Button, Text, YStack, XStack, SizableText} from '@my/ui';
import {useRematchModel} from 'app/store/model';
import {useRouter} from 'solito/router';
import {useTranslation} from 'react-i18next';
import {ChevronDown, ChevronRight} from '@tamagui/lucide-icons';
import {appScale, formatDateTime, formatNumber, truncateAddress} from 'app/utils';
import {useEffect, useState} from 'react';
import CopyButton from '../CopyButton';

export type SuccessInfoProps = {type: string; orderData: any};
// 交易历史item
const SuccessInfo: React.FC<any> = ({type, orderData = {}}: SuccessInfoProps) => {
  const {push} = useRouter();
  const {t, i18n} = useTranslation();
  const [{currency}] = useRematchModel('app');

  const [infoData, setInfoData] = useState<any>({});
  const infoDataDefault = {
    sent: {
      title: orderData?.name ? `${t('home.order.sentTo')} @${orderData?.name}` : '',
      infoList: [
        {
          label: t('home.order.youSent'),
          value: `${formatNumber(orderData?.amount)} ${orderData?.token}(${orderData?.chain})`,
        },
        {
          label: t('home.order.networkFee'),
          value: `${formatNumber(orderData?.fee)} ${orderData?.token}(${orderData?.chain})`,
        },
        {
          label: t('home.order.date'),
          value: `${formatDateTime(orderData?.createdAt)}`,
        },
        {
          label: t('home.order.to'),
          value: `@${orderData?.toAddress}`,
          isCopyable: true,
        },
        {
          label: t('home.order.transactionHash'),
          value: `${orderData?.txHash}`,
          isCopyable: true,
          isTruncated: true,
        },
      ],
    },
    request: {
      title: '',
      infoList: [
        {
          label: t('home.order.youRequest'),
          value: `${formatNumber(orderData?.amount)} ${orderData?.token}(${orderData?.chain})`,
        },
        {
          label: t('home.order.networkFee'),
          value: `${formatNumber(orderData?.fee)} ${orderData?.token}(${orderData?.chain})`,
        },
        {
          label: t('home.order.date'),
          value: `${formatDateTime(orderData?.createdAt)}`,
        },
        {
          label: t('home.order.to'),
          value: `@${orderData?.toAddress}`,
          isCopyable: true,
        },
        {
          label: t('home.order.transactionHash'),
          value: `${orderData?.txHash}`,
          isCopyable: true,
          isTruncated: true,
        },
      ],
    },
    withdraw: {
      title: t('home.order.withdrawTips'),
      infoList: [
        {
          label: t('home.order.youWithdraw'),
          value: `${formatNumber(orderData?.amount)} ${orderData?.token}(${orderData?.chain})`,
        },
        {
          label: t('home.order.date'),
          value: `${formatDateTime(orderData?.createdAt)}`,
        },
      ],
    },
    deposit: {
      title: t('home.order.depositTips'),
      infoList: [
        {
          label: t('home.order.deposit'),
          value: `${orderData?.token}${formatNumber(orderData?.amount)}(${orderData?.chain})`,
        },
        {
          label: t('home.order.date'),
          value: `${formatDateTime(orderData?.createdAt)}`,
        },
      ],
    },
  };

  useEffect(() => {
    type && setInfoData(infoDataDefault[type]);
  }, [type]);

  return (
    <YStack w="100%" pt={appScale(36)} pl={appScale(24)} pr={appScale(24)}>
      <XStack w={'100%'} ai={'center'} jc={'center'}>
        <AppImage
          width={appScale(80)}
          height={appScale(80)}
          src={require('app/assets/images/success.png')}
          type="local"
        />
      </XStack>
      <XStack mt={appScale(20)} w={'100%'} ai={'center'} jc={'center'}>
        <SizableText h={appScale(64)} lh={appScale(64)} style={{fontSize: '40px'}} color={'#212121'} fontWeight={'700'}>
          {`${formatNumber(orderData?.amount)} ${orderData?.token}`}
        </SizableText>
      </XStack>
      {infoData?.title && (
        <XStack mt={appScale(6)} w={'100%'} ai={'center'} jc={'center'}>
          <SizableText h={appScale(30)} lh={appScale(30)} fontSize={'$5'} color={'#616161'} fontWeight={'500'}>
            {infoData?.title}
          </SizableText>
        </XStack>
      )}

      <YStack
        mt={appScale(20)}
        bc={'#FAFAFA'}
        borderRadius={appScale(8)}
        p={appScale(16)}
        bw={1}
        borderColor={'#EEEEEE'}
      >
        {infoData?.infoList &&
          infoData?.infoList.map((item, index) => (
            <XStack
              key={item.label}
              pb={appScale(16)}
              w="100%"
              ai="center"
              jc="space-between"
              bbw={1}
              bbc={index === infoData?.infoList.length - 1 ? '#EEEEEE' : '$background'}
            >
              <SizableText h={appScale(26)} lh={appScale(26)} fontSize={'$5'} color={'#616161'} fontWeight={'500'}>
                {item.label}
              </SizableText>
              <XStack ai={'center'} space="$2">
                <SizableText h={appScale(26)} lh={appScale(26)} fontSize={'$5'} color={'#424242'} fontWeight={'600'}>
                  {item?.isTruncated ? truncateAddress(item.value) : item.value}
                </SizableText>
                {item.isCopyable && (
                  <CopyButton unstyled text={item?.value}>
                    <AppImage
                      width={appScale(18)}
                      height={appScale(18)}
                      src={require('app/assets/images/copy.png')}
                      type="local"
                    />
                  </CopyButton>
                )}
              </XStack>
            </XStack>
          ))}
      </YStack>
    </YStack>
  );
};

export default SuccessInfo;
