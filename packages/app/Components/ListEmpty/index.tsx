/*
 * @Date: 2023-12-08 16:25:15
 * @LastEditors: snapxlabs
 * @LastEditTime: 2024-07-22 15:40:55
 * @FilePath: /snapx-nfc-app/packages/app/Components/ListEmpty/index.tsx
 */
import {AppImage, Button, SizableText, Text, XStack, YStack} from '@my/ui';
import {Airplay, AlignJustify} from '@tamagui/lucide-icons';
import AppModal from 'app/Components/AppModal';
import {PrimaryColor} from 'app/config';
import {useRematchModel} from 'app/store/model';
import {useTranslation} from 'react-i18next';
import {ActivityIndicator} from 'react-native';
import {Link} from 'solito/link';

export type ListEmptypProps = {
  loading: boolean;
};
// 首页 餐厅详情
const ListEmpty: React.FC<any> = ({loading}: ListEmptypProps) => {
  const {t, i18n} = useTranslation();
  const [app] = useRematchModel('app');

  return (
    <YStack flex={1} w="100%" ai={'center'} jc={'center'}>
      {loading ? (
        <ActivityIndicator size={'large'} color={PrimaryColor} />
      ) : (
        <>
          <XStack>
            <AppImage
              web={{
                alt: '',
                src: require('app/assets/images/empty.png'),
                width: 120,
                height: 120,
              }}
              type="local"
              native={{
                source: {
                  height: 120,
                  uri: require('app/assets/images/empty.png'),
                  width: 120,
                },
              }}
            />
          </XStack>
          <XStack>
            <SizableText col={'$color11'} fontSize={'$5'}>
              {t('tips.list.noData.title')}
            </SizableText>
          </XStack>
        </>
      )}
    </YStack>
  );
};

export default ListEmpty;
