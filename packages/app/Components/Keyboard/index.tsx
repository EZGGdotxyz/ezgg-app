import {AppImage, Button, SizableText, useToastController, XStack, YStack} from '@my/ui';
import React, {useCallback, useEffect, useState} from 'react';
import { useTranslation } from 'react-i18next';
import useResponse from 'app/hooks/useResponse';
interface KeyboardProps {
  /** 键盘输入值改变时的回调 */
  onChange?: (value: string) => void;

  /** 最大输入长度 */
  maxLength?: number;
  /** 初始值 */
  value?: string;
  decimals?: number;
}

const Keyboard: React.FC<KeyboardProps> = ({onChange, maxLength = 12, value = '', decimals = 6}) => {
  const [inputValue, setInputValue] = useState(value);
  const toast = useToastController();
  const {t} = useTranslation();
  const {appScale} = useResponse();

  // 数字按键布局
  const keys = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['.', '0', 'del'],
  ];

  // 处理按键点击
  const handleKeyPress = (key: string) => {

    let newValue = inputValue;

    if (key === 'del') {
      newValue = inputValue.slice(0, -1);
    } else if (key === '.') {
      // 如果已经包含小数点，直接返回
      if (inputValue.includes('.')) {
        return;
      }
      // 如果是空值或第一个字符就是小数点，自动补0
      if (!inputValue || inputValue === '') {
        newValue = '0.';
      } else {
        newValue = inputValue + key;
      }
    } else if (inputValue.length < maxLength) {
      // 检查小数位数是否超过代币的 decimals
      const decimalParts = inputValue.split('.');
      if (decimalParts.length > 1 && decimalParts[1].length >= decimals) {
        toast.show(t('home.send.number.tips'));
        return; // 如果小数位数已达到限制，不再添加数字
      }
      newValue = inputValue + key;
    }

    // 验证数字格式
    if (!/^\d*\.?\d*$/.test(newValue)) {
      return;
    }

    if (newValue !== inputValue) {
      setInputValue(newValue);
      onChange?.(newValue);
    }
  };

  // 添加键盘事件监听
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {

      const keyMap: Record<string, string> = {
        Backspace: 'del',
        Delete: 'del',
        '.': '.',
        ',': '.' // 兼容小数点输入
      };

      // 处理数字键
      if (/^\d$/.test(event.key)) {
        handleKeyPress(event.key);
        return;
      }

      // 处理特殊按键
      const mappedKey = keyMap[event.key];
      if (mappedKey) {
        event.preventDefault();
        handleKeyPress(mappedKey);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [inputValue]); // 依赖inputValue保证最新状态

  return (
    <YStack w="100%" ai="center" flexShrink={0} p={appScale(12)} backgroundColor="#FAFAFA">
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
