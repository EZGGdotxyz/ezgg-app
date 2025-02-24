/*
 * @Date: 2023-12-08 16:25:15
 * @LastEditors: yosan
 * @LastEditTime: 2024-01-12 15:30:37
 * @FilePath: /snapx-nfc-app/packages/app/Components/AppLoading/index.tsx
 */
import {Button, View} from '@my/ui';
import {PrimaryColor} from 'app/config';
import {ActivityIndicator} from 'react-native';

interface AppButtonProps {}

export default function AppLoading(props: AppButtonProps) {
  return (
    <View
      pos={'absolute'}
      w={'100%'}
      h={'100%'}
      t={0}
      l={0}
      bc={'rgba(255,255,255,0.8)'}
      zi={100}
      ai={'center'}
      jc={'center'}
    >
      <ActivityIndicator size={'large'} color={PrimaryColor} />
    </View>
  );
}
