/*
 * @Date: 2023-12-08 16:25:15
 * @LastEditors: yosan
 * @LastEditTime: 2025-03-04 15:39:13
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
import {getChainInfo, getExplorerUrl} from 'app/utils/chain';
import {
  createTransactionInfoItem,
  createBaseTransactionInfoList,
  createAmountDisplay,
  createNetworkFeeDisplay,
  createUserNicknameDisplay,
  createStatusDisplay,
} from 'app/utils/transactionInfo';

export type SuccessInfoProps = {type: string; orderData: any};
// 交易历史item
const SuccessInfo: React.FC<any> = ({type, orderData = {}}: SuccessInfoProps) => {
  const {push} = useRouter();
  const {t, i18n} = useTranslation();
  const [{currency}] = useRematchModel('app');

  const [infoData, setInfoData] = useState<any>({});

  useEffect(() => {
    if (type) {
      const infoDataDefault = {
        sent: {
          title: orderData?.name ? `${t('home.order.sentTo')} @${orderData?.name}` : '',
          infoList: [
            createTransactionInfoItem(t('home.order.youSent'), createAmountDisplay(orderData)),
            createTransactionInfoItem(t('home.order.networkFee'), createNetworkFeeDisplay(orderData)),
            ...createBaseTransactionInfoList(orderData, t),
          ],
        },
        request: {
          icon: '',
          infoList: [
            createTransactionInfoItem(t('home.order.youRequested'), createAmountDisplay(orderData)),
            createTransactionInfoItem(t('home.order.networkFee'), createNetworkFeeDisplay(orderData)),
            createTransactionInfoItem(t('home.order.status'), createStatusDisplay(orderData?.transactionStatus), {
              isStatus: true,
            }),
            ...createBaseTransactionInfoList(orderData, t),
          ],
        },
        withdraw: {
          title: t('home.order.depositTips'),
          icon: 'withdraw',
          infoList: [
            createTransactionInfoItem(t('home.order.youWithdraw'), createAmountDisplay(orderData)),
            ...createBaseTransactionInfoList(orderData, t, false),
          ],
        },
        deposit: {
          icon: 'topUp',
          infoList: [
            createTransactionInfoItem(t('home.order.youTopUp'), createAmountDisplay(orderData)),
            ...createBaseTransactionInfoList(orderData, t, false),
          ],
        },
      };
      setInfoData({
        infoList: infoDataDefault[type].infoList,
        title: infoDataDefault[type].title,
        icon: infoDataDefault[type].icon,
        userName:
          orderData?.transactionType === 'SEND' || orderData?.transactionType === 'REQUEST'
            ? `@${type === 'send' ? orderData?.receiverMember?.nickname : orderData?.senderMember?.nickname || ''}`
            : '',
      });
    }
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
          {orderData?.amount
            ? `${formatTokenAmount(orderData?.amount, orderData?.tokenDecimals)} ${orderData?.tokenSymbol}`
            : '0'}
        </SizableText>
      </XStack>
      {infoData?.userName && (
        <XStack mt={appScale(6)} w={'100%'} ai={'center'} jc={'center'}>
          <SizableText h={appScale(30)} lh={appScale(30)} fontSize={'$5'} color={'#616161'} fontWeight={'500'}>
            {infoData?.userName}
          </SizableText>
        </XStack>
      )}
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
              <XStack ai={'center'} jc={'center'}>
                <SizableText h={appScale(26)} lh={appScale(26)} fontSize={'$5'} color={'#424242'} fontWeight={'600'}>
                  {item?.isTruncated ? (item?.value ? truncateAddress(item?.value) : '-') : item?.value}
                </SizableText>
                {item?.isCopyable && (
                  <XStack ai={'center'} jc={'center'} ml={appScale(6)}>
                    <CopyButton
                      unstyled
                      text={item?.isHx ? getExplorerUrl(orderData?.chainId, item?.value) : item?.value}
                    >
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
