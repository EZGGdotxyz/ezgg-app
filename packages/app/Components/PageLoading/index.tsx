/*
 * @Date: 2023-12-08 16:25:15
 * @LastEditors: snapxlabs
 * @LastEditTime: 2024-07-22 17:17:36
 * @FilePath: /snapx-nfc-app/packages/app/Components/PageLoading/index.tsx
 */
import {AppImage, Button, SizableText, Text, XStack, YStack} from '@my/ui';
import {Airplay, AlignJustify} from '@tamagui/lucide-icons';
import AppModal from 'app/Components/AppModal';
import {PrimaryColor} from 'app/config';
import {useRematchModel} from 'app/store/model';
import {useTranslation} from 'react-i18next';
import {ActivityIndicator} from 'react-native';
import {Link} from 'solito/link';

export type PageLoadingProps = {
  loading: boolean;
};
// 页面加载等待
const PageLoading: React.FC<any> = ({}: PageLoadingProps) => {
  const {t, i18n} = useTranslation();
  const [app] = useRematchModel('app');

  return (
    <YStack pos="absolute" t={0} l={0} flex={1} w="100%" h={'100%'} ai={'center'} jc={'center'}>
      <YStack pt='$10'>
        <ActivityIndicator size={'large'} color={PrimaryColor} />
      </YStack>
    </YStack>
  );
};

export default PageLoading;
