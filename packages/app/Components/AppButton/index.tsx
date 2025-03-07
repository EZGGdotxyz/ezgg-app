/*
 * @Date: 2023-12-08 16:25:15
 * @LastEditors: yosan
 * @LastEditTime: 2025-03-07 13:56:06
 * @FilePath: /ezgg-app/packages/app/Components/AppButton/index.tsx
 */
import {Button, Paragraph} from '@my/ui';
import {PrimaryColor, SubColor} from 'app/config';
import {appScale} from 'app/utils';
import {ActivityIndicator} from 'react-native';

interface AppButtonProps {
  children?: React.ReactNode;
  onPress: () => void;
  style?: any;
  isLoading?: boolean;
  disabled?: boolean;
}

export default function AppButton(props: AppButtonProps) {
  const {onPress, style, isLoading = false, disabled = false} = props;
  return (
    <Button
      h={appScale(58)}
      w={'100%'}
      br={appScale(28)}
      ai={'center'}
      jc={'center'}
      style={{
        ...style,
        opacity: isLoading ? 0.5 : 1,
      }}
      bc={disabled ? '#E0E0E0' : PrimaryColor}
      // bc={PrimaryColor}
      onPress={onPress}
      disabled={disabled}
      pressStyle={{
        opacity: 0.85,
      }}
      unstyled
    >
      {isLoading ? (
        <ActivityIndicator color={'#212121'} />
      ) : (
        <Paragraph fontSize={'$4'} color={disabled ? '#9E9E9E' : '#212121'} fontWeight={'600'}>
          {props?.children}
        </Paragraph>
      )}
    </Button>
  );
}
