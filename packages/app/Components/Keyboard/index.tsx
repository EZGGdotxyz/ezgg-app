import {AppImage, Button, SizableText, XStack, YStack} from '@my/ui';
import {appScale} from 'app/utils';
import React, {useCallback, useEffect, useState} from 'react';

interface KeyboardProps {
  /** 键盘输入值改变时的回调 */
  onChange?: (value: string) => void;

  /** 最大输入长度 */
  maxLength?: number;
  /** 初始值 */
  value?: string;
}

const Keyboard: React.FC<KeyboardProps> = ({onChange, maxLength = 12, value = ''}) => {
  const [inputValue, setInputValue] = useState(value);

  // 数字按键布局
  const keys = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['.', '0', 'del'],
  ];

  // 处理按键点击
  const handleKeyPress = (key: string) => {
    console.log('🚀 ~ handleKeyPress ~ key:', key);

    let newValue = inputValue;

    if (key === 'del') {
      newValue = inputValue.slice(0, -1);
    } else if (key === '.' && inputValue.includes('.')) {
      return;
    } else if (inputValue.length < maxLength) {
      if (key !== '.') {
        const decimalParts = inputValue.split('.');
        if (decimalParts.length > 1 && decimalParts[1].length >= 2) {
          return;
        }
      }
      newValue = inputValue + key;
    }

    if (newValue !== inputValue) {
      setInputValue(newValue);
      onChange?.(newValue);
    }
  };

  return (
    <YStack w="100%" ai="center" p={appScale(12)} backgroundColor="#FAFAFA">
      <XStack w="100%" flexWrap="wrap" jc="center">
        {keys.map((row, rowIndex) => (
          <XStack key={rowIndex} w="100%" jc="center">
            {row.map((key, keyIndex) => (
              <Button
                key={keyIndex}
                onPress={() => key && handleKeyPress(key)}
                disabled={!key}
                width={'33.33333333333%'}
                height={appScale(56)}
                backgroundColor="#FAFAFA"
                unstyled
                pressStyle={{
                  opacity: 0.7,
                  backgroundColor: '#EEEEEE',
                }}
                ai={'center'}
                jc={'center'}
              >
                {key === 'del' ? (
                  <XStack>
                    <AppImage
                      width={appScale(28)}
                      height={appScale(28)}
                      src={require('app/assets/images/del.png')}
                      type="local"
                    />
                  </XStack>
                ) : (
                  <SizableText fontSize={'$8'} color={'#212121'} fontWeight={'500'}>
                    {key}
                  </SizableText>
                )}
              </Button>
            ))}
          </XStack>
        ))}
      </XStack>
    </YStack>
  );
};

export default Keyboard;
