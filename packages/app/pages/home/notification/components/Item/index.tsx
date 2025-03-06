/*
 * @Date: 2023-12-08 16:25:15
 * @LastEditors: yosan
 * @LastEditTime: 2025-03-05 15:35:04
 * @FilePath: /ezgg-app/packages/app/pages/home/notification/components/Item/index.tsx
 */
import {AppImage, Button, Text, YStack, XStack, SizableText} from '@my/ui';
import {useRematchModel} from 'app/store/model';
import {useRouter} from 'solito/router';
import {useTranslation} from 'react-i18next';
import {ChevronDown, ChevronRight} from '@tamagui/lucide-icons';
import {appScale, formatNumber, formatTokenAmount, getCurrency} from 'app/utils';
import {getChainInfo} from 'app/utils/chain';
import dayjs from 'dayjs';

type ItemProps = {
  item: any;
  isBorderBottom: boolean;
  onRead: (item: any) => void;
  itemKey: any;
};
const Item: React.FC<any> = ({item, isBorderBottom, itemKey, onRead}: ItemProps) => {
  const {t, i18n} = useTranslation();
  const {push} = useRouter();
  const scheme = 'light';

  // 获取通知内容
  const getNotificationContent = () => {
    const {subject, action, source, transactionType} = item;

    // 交易状态更新通知
    if (subject === 'TRANSACTION_STATUS' && source === 'TRANSACTION') {
      switch (action) {
        case 'COMPLETED':
          return t('notification.transaction.completed', {
            type: t(`transaction.type.${transactionType.toLowerCase()}`),
            amount: item.amount,
            currency: item.currency,
          });
        case 'FAILED':
          return t('notification.transaction.failed', {
            type: t(`transaction.type.${transactionType.toLowerCase()}`),
          });
        case 'PENDING':
          return t('notification.transaction.pending', {
            type: t(`transaction.type.${transactionType.toLowerCase()}`),
          });
        default:
          return item.description;
      }
    }

    // 支付链接相关通知
    if (subject === 'PAY_LINK' && source === 'PAY_LINK') {
      switch (action) {
        case 'CREATED':
          return t('notification.paylink.created', {
            amount: item.amount,
            currency: item.currency,
          });
        case 'CLAIMED':
          return t('notification.paylink.claimed', {
            amount: item.amount,
            currency: item.currency,
          });
        case 'EXPIRED':
          return t('notification.paylink.expired', {
            amount: item.amount,
            currency: item.currency,
          });
        default:
          return item.description;
      }
    }

    // 系统通知
    if (subject === 'SYSTEM' && source === 'SYSTEM') {
      return item.context;
    }

    return item.context;
  };

  // 获取通知图标
  const getNotificationIcon = () => {
    const {subject, action, source} = item;

    if (subject === 'TRANSACTION_STATUS' && source === 'TRANSACTION') {
      switch (action) {
        case 'COMPLETED':
          return 'app/assets/images/success.png';
        case 'FAILED':
          return 'app/assets/images/error.png';
        case 'PENDING':
          return null;
        // return require('app/assets/images/pending.png');
        default:
          return null;
      }
    }

    if (subject === 'PAY_LINK' && source === 'PAY_LINK') {
      switch (action) {
        case 'CREATED':
          return 'app/assets/images/paylink.png';
        case 'CLAIMED':
          return 'app/assets/images/success.png';
        case 'EXPIRED':
          return null;
        // return require('app/assets/images/error.png');
        default:
          return null;
      }
    }

    return null;
  };
  const dealType = () => {
    switch (item?.transactionType) {
      case 'DEPOSIT':
        return {
          title: t('home.deposit'),
          sub: t('home.deposit'),
        };
      case 'WITHDRAW':
        return {
          title: t('home.withdraw'),
          sub: t('home.withdraw'),
        };
      case 'Income':
        return {
          title: t('home.income'),
          sub: t('home.income'),
        };
      case 'SEND':
        return {
          title: t('home.order.send.title', {name: item?.receiverMember?.nickname}),
          sub: item?.message,
        };
      case 'PAY_LINK':
        return {
          title: t('home.order.payLink.title', {name: item?.receiverMember?.nickname}),
          sub: item?.message,
        };
      case 'QR_CODE':
        return {
          title: t('home.order.qrCode.title', {name: item?.receiverMember?.nickname}),
          sub: item?.transactionCategory === 'REQUEST' ? t('home.receive') : t('home.send'),
        };
      case 'REQUEST':
        return {
          title: t('home.order.request.title', {name: item?.senderMember?.nickname}),
          sub: item?.message,
        };
      case 'REQUEST_LINK':
        return {
          title: t('home.order.requestLink.title', {name: item?.senderMember?.nickname}),
          sub: item?.message,
        };
      case 'REQUEST_QR_CODE':
        return {
          title: t('home.order.requestQrCode.title', {name: item?.senderMember?.nickname}),
          sub: item?.message,
        };
      default:
        return {
          title: '',
          sub: '',
        };
    }
  };

  return (
    <YStack
      p={appScale(24)}
      bc={'$background'}
      style={{
        backgroundColor: '#fff',
      }}
      ai="center"
      width={'100%'}
      jc={'space-between'}
    >
      <XStack jc={'space-between'} w="100%">
        <YStack flex={1}>
          <XStack w={'100%'} jc={'space-between'} mb={'$2'}>
            <SizableText color={'#212121'} w="100%" fow="600" size={'$6'} pr={'$1'}>
              {item?.title}
            </SizableText>
            <XStack space="$3">
              {item?.status === 'unread' && (
                <Button unstyled>
                  <AppImage
                    width={appScale(32)}
                    height={appScale(32)}
                    src={require('app/assets/images/error.png')}
                    type="local"
                  />
                </Button>
              )}
              {item?.status === 'unread' && (
                <Button unstyled>
                  <AppImage
                    width={appScale(32)}
                    height={appScale(32)}
                    src={require('app/assets/images/success.png')}
                    type="local"
                  />
                </Button>
              )}
            </XStack>
          </XStack>

          <SizableText color={'#424242'} size={'$3'} fow={'500'}>
            {getNotificationContent()}
          </SizableText>
          <XStack w="100%" jc={'space-between'} mb={'$2'}>
            <SizableText color={'#616161'} size={'$1'} fow={'500'}>
              {dayjs(item?.createAt).format('HH:mm A')}
            </SizableText>
          </XStack>
        </YStack>
        <XStack flexShrink={0} jc={'flex-end'} ai={'center'} w={36}>
          <ChevronRight color={'#757575'} size={24} />
        </XStack>
      </XStack>
    </YStack>
  );
};

export default Item;
