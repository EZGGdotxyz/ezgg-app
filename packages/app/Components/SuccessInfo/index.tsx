/*
 * @Date: 2023-12-08 16:25:15
 * @LastEditors: yosan
 * @LastEditTime: 2025-03-03 22:39:39
 * @FilePath: /ezgg-app/packages/app/Components/SuccessInfo/index.tsx
 */
import {AppImage, Button, Text, YStack, XStack, SizableText} from '@my/ui';
import {useRematchModel} from 'app/store/model';
import {useRouter} from 'solito/router';
import {useTranslation} from 'react-i18next';
import {ChevronDown, ChevronRight} from '@tamagui/lucide-icons';
import {appScale, formatDateTime, formatNumber, formatTokenAmount, truncateAddress} from 'app/utils';
import {useEffect, useState} from 'react';
import CopyButton from '../CopyButton';
import {getChainInfo} from 'app/utils/chain';

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
          value: `${formatNumber(orderData?.networkFee)} ${orderData?.tokenSymbol}(${
            getChainInfo(orderData?.chainId)?.name
          })`,
          isStatus: false,
          isCopyable: false,
          isTruncated: false,
        },
        {
          label: t('home.order.networkFee'),
          value: `${formatNumber(orderData?.networkFee)} ${orderData?.tokenSymbol}(${
            getChainInfo(orderData?.chainId)?.name
          })`,
          isStatus: false,
          isCopyable: false,
          isTruncated: false,
        },
        {
          label: t('home.order.date'),
          value: `${formatDateTime(orderData?.transactionTime)}`,
          isStatus: false,
          isCopyable: false,
          isTruncated: false,
        },
        {
          label: t('home.order.to'),
          value: `@${orderData?.receiverMember?.nickname}`,
          isCopyable: true,
          isStatus: false,
          isTruncated: false,
        },
        {
          label: t('home.order.transactionHash'),
          value: `${orderData?.transactionHash || ''}`,
          isCopyable: orderData?.transactionHash ? true : false,
          isStatus: false,
          isTruncated: true,
        },
      ],
    },
    income: {
      icon: '',
      infoList: [
        {
          label: t('home.order.youReceived'),
          value: `${formatNumber(orderData?.networkFee)} ${orderData?.tokenSymbol}(${
            getChainInfo(orderData?.chainId)?.name
          })`,
          isStatus: false,
          isCopyable: false,
          isTruncated: false,
        },
        {
          label: t('home.order.networkFee'),
          value: `${formatNumber(orderData?.networkFee)} ${orderData?.tokenSymbol}(${
            getChainInfo(orderData?.chainId)?.name
          })`,
          isStatus: false,
          isCopyable: false,
          isTruncated: false,
        },
        {
          label: t('home.order.date'),
          value: `${formatDateTime(orderData?.transactionTime)}`,
          isStatus: false,
          isCopyable: false,
          isTruncated: false,
        },
        {
          label: t('home.order.from'),
          value: `@${orderData?.receiverMember?.nickname}`,
          isCopyable: true,
          isStatus: false,
          isTruncated: false,
        },
        {
          label: t('home.order.transactionHash'),
          value: `${orderData?.transactionHash || ''}`,
          isCopyable: orderData?.transactionHash ? true : false,
          isStatus: false,
          isTruncated: true,
        },
      ],
    },
    outgoingRequest: {
      icon: '',
      infoList: [
        {
          label: t('home.order.youRequested'),
          value: `${formatNumber(orderData?.amount)} ${orderData?.tokenSymbol}(${
            getChainInfo(orderData?.chainId)?.name
          })`,
          isStatus: false,
          isCopyable: false,
          isTruncated: false,
        },
        {
          label: t('home.order.networkFee'),
          value: `${formatNumber(orderData?.networkFee)} ${orderData?.tokenSymbol}(${
            getChainInfo(orderData?.chainId)?.name
          })`,
          isStatus: false,
          isCopyable: false,
          isTruncated: false,
        },
        {
          label: t('home.order.status'),
          value: orderData?.transactionStatus,
          isStatus: true,
          isCopyable: false,
          isTruncated: false,
        },
        {
          label: t('home.order.date'),
          value: `${formatDateTime(orderData?.transactionTime)}`,
          isStatus: false,
          isCopyable: false,
          isTruncated: false,
        },
        {
          label: t('home.order.to'),
          value: `@${orderData?.receiverMember?.nickname}`,
          isCopyable: true,
          isStatus: false,
          isTruncated: false,
        },
        {
          label: t('home.order.transactionHash'),
          value: `${orderData?.transactionHash}`,
          isCopyable: orderData?.transactionHash ? true : false,
          isStatus: false,
          isTruncated: true,
        },
      ],
    },
    incomingRequest: {
      icon: '',
      infoList: [
        {
          label: t('home.order.amountRequested'),
          value: `${formatNumber(orderData?.amount)} ${orderData?.tokenSymbol}(${
            getChainInfo(orderData?.chainId)?.name
          })`,
          isStatus: false,
          isCopyable: false,
          isTruncated: false,
        },
        {
          label: t('home.order.networkFee'),
          value: `${formatNumber(orderData?.networkFee)} ${orderData?.tokenSymbol}(${
            getChainInfo(orderData?.chainId)?.name
          })`,
          isStatus: false,
          isCopyable: false,
          isTruncated: false,
        },
        {
          label: t('home.order.status'),
          value: orderData?.transactionStatus,
          isStatus: true,
          isCopyable: false,
          isTruncated: false,
        },
        {
          label: t('home.order.date'),
          value: `${formatDateTime(orderData?.transactionTime)}`,
          isStatus: false,
          isCopyable: false,
          isTruncated: false,
        },
        {
          label: t('home.order.to'),
          value: `@${orderData?.senderMember?.nickname}`,
          isCopyable: true,
          isStatus: false,
          isTruncated: false,
        },
        {
          label: t('home.order.transactionHash'),
          value: `${orderData?.transactionHash}`,
          isCopyable: orderData?.transactionHash ? true : false,
          isStatus: false,
          isTruncated: true,
        },
      ],
    },
    withdraw: {
      icon: 'withdraw',
      infoList: [
        {
          label: t('home.order.youWithdraw'),
          value: `${formatNumber(orderData?.amount)} ${orderData?.tokenSymbol}(${
            getChainInfo(orderData?.chainId)?.name
          })`,
          isStatus: false,
          isCopyable: false,
          isTruncated: false,
        },
        {
          label: t('home.order.date'),
          value: `${formatDateTime(orderData?.transactionTime)}`,
          isStatus: false,
          isCopyable: false,
          isTruncated: false,
        },
        {
          label: t('home.order.transactionHash'),
          value: `${orderData?.transactionHash}`,
          isCopyable: orderData?.transactionHash ? true : false,
          isStatus: false,
          isTruncated: true,
        },
      ],
    },
    topUp: {
      icon: 'topUp',
      infoList: [
        {
          label: t('home.order.youTopUp'),
          value: `${formatNumber(orderData?.amount)} ${orderData?.tokenSymbol}(${
            getChainInfo(orderData?.chainId)?.name
          })`,
          isStatus: false,
          isCopyable: false,
          isTruncated: false,
        },
        {
          label: t('home.order.date'),
          value: `${formatDateTime(orderData?.transactionTime)}`,
          isStatus: false,
          isCopyable: false,
          isTruncated: false,
        },
        {
          label: t('home.order.transactionHash'),
          value: `${orderData?.transactionHash}`,
          isCopyable: orderData?.transactionHash ? true : false,
          isStatus: false,
          isTruncated: true,
        },
      ],
    },
  };

  useEffect(() => {
    type &&
      setInfoData({
        infoList: infoDataDefault[type].infoList,
        title: t(`screen.home.${type}`),
        icon: infoDataDefault[type].icon,
        userName:
          orderData?.transactionType === 'SEND' || orderData?.transactionType === 'REQUEST'
            ? `@${type === 'send' ? orderData?.receiverMember?.nickname : orderData?.senderMember?.nickname || ''}`
            : '',
      });
  }, [type, orderData]);

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
          {`${formatTokenAmount(orderData?.amount, orderData?.tokenDecimals)} ${orderData?.tokenSymbol}`}
        </SizableText>
      </XStack>
      {infoData?.userName && (
        <XStack mt={appScale(6)} w={'100%'} ai={'center'} jc={'center'}>
          <SizableText h={appScale(30)} lh={appScale(30)} fontSize={'$5'} color={'#616161'} fontWeight={'500'}>
            {infoData?.userName}
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
              <XStack ai={'center'} jc={'center'}>
                <SizableText h={appScale(26)} lh={appScale(26)} fontSize={'$5'} color={'#424242'} fontWeight={'600'}>
                  {item?.isTruncated ? (item?.value ? truncateAddress(item?.value) : '-') : item?.value}
                </SizableText>
                {item?.isCopyable && (
                  <XStack ai={'center'} jc={'center'} ml={appScale(6)}>
                    <CopyButton unstyled text={item?.value}>
                      <AppImage
                        width={appScale(18)}
                        height={appScale(18)}
                        src={require('app/assets/images/copy.png')}
                        type="local"
                      />
                    </CopyButton>
                  </XStack>
                )}
              </XStack>
            </XStack>
          ))}
      </YStack>
    </YStack>
  );
};

export default SuccessInfo;
