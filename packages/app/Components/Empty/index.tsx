/*
 * @Date: 2023-12-08 16:25:15
 * @LastEditors: yosan
 * @LastEditTime: 2024-01-15 21:49:29
 * @FilePath: /snapx-nfc-app/packages/app/Components/Empty/index.tsx
 */
import {Button, Paragraph, SizableText, YStack} from '@my/ui';
import {PrimaryColor} from 'app/config';
import {useTranslation} from 'react-i18next';

interface EmptyProps {
  text?: string;
  minHeight: string;
}

export default function Empty({text = '', minHeight}: EmptyProps) {
  const {t} = useTranslation();

  return (
    <YStack minHeight={minHeight} width={'100%'} jc={'center'} ai={'center'}>
      <SizableText col={'$color11'} fontSize={'$3'}>
        {/* {text || t('tips.list.noData.title')} */}
      </SizableText>
    </YStack>
  );
}
