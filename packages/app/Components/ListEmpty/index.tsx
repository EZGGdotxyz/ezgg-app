/*
 * @Date: 2023-12-08 16:25:15
 * @LastEditors: yosan
 * @LastEditTime: 2025-03-08 15:20:29
 * @FilePath: /ezgg-app/packages/app/Components/ListEmpty/index.tsx
 */
import {AppImage, Button, SizableText, Text, XStack, YStack} from '@my/ui';
import {Airplay, AlignJustify} from '@tamagui/lucide-icons';
import AppModal from 'app/Components/AppModal';
import {PrimaryColor} from 'app/config';
import useResponse from 'app/hooks/useResponse';
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
  const {appScale} = useResponse();

  return (
    <YStack flex={1} w="100%" ai={'center'} jc={'center'}>
      {loading ? (
        <ActivityIndicator size={'large'} color={PrimaryColor} />
      ) : (
        <>
          <XStack>
            <AppImage
              width={appScale(160)}
              height={appScale(156)}
              src={require('app/assets/images/empty2.png')}
              type="local"
            />
          </XStack>
          <XStack>
          <SizableText mt={appScale(32)} col={'#212121'} fontSize={'$6'} fow={'700'}>
              {t('tips.list.noData.title')}
            </SizableText>
          </XStack>
        </>
      )}
    </YStack>
  );
};

export default ListEmpty;
