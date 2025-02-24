import {useCallback, useEffect, useRef, useState} from 'react';
import {selectNode} from 'selection-extra/dist/helpers/nodes';

export interface UseOTPInputOptions {
  /** 默认值：6 */
  length?: number;
  /** onChange 之前回调，可用于标准化 value */
  normalizeValue?: (value: string, previousValue: string) => string;
  value?: string;
  onChange?: (value: string) => void;
  onGetValue?: (value) => void;
}

/**
 * React Hook for One Time Password Input / 一次性密码输入框 React Hook
 *
 * 主要模拟常规 Input 组件，使得输入更符合直觉，包括以下核心用例：
 *
 * - 支持符合 Input 组件直觉的*输入*逻辑，包括粘贴文本字符串
 * - 支持 Backspace 和 Delete 及其快捷键操作
 * - 支持左右方向键跳转输入位置
 *
 * 已知不支持的操作用例：
 *
 * - 字符多选操作
 * - 不支持 Backspace 和 Delete 长按连续删除字符串
 */
export default function useOTPInput(options: UseOTPInputOptions = {}) {
  const {length = 6, normalizeValue, value, onChange, onGetValue} = options;

  const [internalValue, setInternalValue] = useState<string>('');

  console.log('🚀 ~ useOTPInput ~ internalValue:', internalValue);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  // 避免 onChange 被动触发的 onFocus 回调导致不能按照 onChange 的预期 focus 到下一个焦点
  const focusEventLockRef = useRef(false);
  const keyDownDataRef = useRef<{
    inputIndex: number;
    caretIndex: number;
  } | null>(null);

  const mergedValue = (value ?? internalValue).toString().split('');
  const mergedOnChange = useCallback(
    (nextValue: string) => {
      if (typeof value !== 'undefined') {
        if (!onChange) {
          throw new Error(`Invalid onChange property`);
        } else {
          onChange(nextValue.slice(0, length));
        }
        return;
      }
      setInternalValue(nextValue.slice(0, length));
    },
    [length, onChange, value],
  );

  useEffect(() => {
    onGetValue && onGetValue(mergedValue.join(''));
  }, [mergedValue]);

  const selectInput = (index: number, caretIndex?: number) => {
    const targetInput = inputRefs.current[index];
    if (targetInput) {
      if (typeof caretIndex === 'number') {
        selectNode(targetInput, [caretIndex, caretIndex]);
      } else {
        selectNode(targetInput);
      }
    }
  };
  const selectInputAfter = (index: number) => {
    selectInput(index);
  };
  const selectInputStart = (index: number) => {
    selectInput(index, 0);
  };

  const removePrevInput = (index: number) => {
    const nextMergedValue = [...mergedValue];
    nextMergedValue.splice(index - 1, 1);
    mergedOnChange(nextMergedValue.join(''));

    // 观察到如下现象：
    // 如果光标在输入框 caret index 为 0 时向前删除字符，
    // 默认情况下光标还是在当前输入框，但是 caret index 变为 1，推测是浏览器的特殊机制导致，
    // 因此暂时通过 setTimeOut 矫正
    setTimeout(() => {
      selectInputStart(index - 1);
    });
  };

  const removeAfterInput = (index: number) => {
    const nextMergedValue = [...mergedValue];
    nextMergedValue.splice(index + 1, 1);
    mergedOnChange(nextMergedValue.join(''));
  };

  const getInputProps = (index: number) => {
    if (index < 0 || index >= length) {
      throw new Error(`Unexpected input index of [${index}]`);
    }

    const result = {
      ref: (ref) => {
        inputRefs.current[index] = ref;
      },
      value: mergedValue[index] ?? '',
      onChange: (event) => {
        const eventValue = event.target.value.trim();
        let nextMergedValue = [...mergedValue];
        if (eventValue.length >= 2) {
          nextMergedValue.splice(index, 1, ...eventValue.split(''));
          nextMergedValue = nextMergedValue.slice(0, length);
        } else {
          nextMergedValue[index] = eventValue;
        }
        const nextValue = nextMergedValue.join('');

        const normalizedValue =
          nextValue && normalizeValue ? normalizeValue(nextValue, mergedValue.join('')) : nextValue;

        mergedOnChange(normalizedValue);

        // 前后值一致表示新输入字符无效
        if (normalizedValue === mergedValue.join('')) {
          // 当值无效时如果光标在输入字符之前还是会导致光标后移，
          // 因此如果输入无效需要修复光标位置，
          // 能见一瞬间的光标闪烁
          setTimeout(() => {
            if (keyDownDataRef.current) {
              selectInput(keyDownDataRef.current.inputIndex, keyDownDataRef.current.caretIndex);
            }
          });
          return;
        }

        focusEventLockRef.current = true;

        if (event.target.value.length === 1) {
          // 如果已输入完成，用户手动选择并修改单一值，不做焦点跳转
          if (mergedValue.length === nextMergedValue.length && mergedValue.length === length) {
            return;
          }

          selectInputAfter(index + 1);
        }

        if (event.target.value.length >= 2) {
          if (keyDownDataRef.current && keyDownDataRef.current.caretIndex === 0) {
            const currentValueLength = event.target.value.length;
            // 观察到如下现象：
            // 如果输入框只有一个字符时，如果下次输入在该字符前，经过 onChange 处理设值后，
            // 如果其它输入框中还能放下该字符，光标总是会移动到该字符后，推测是浏览器的特殊机制导致，
            // 因此暂时通过 setTimeOut 矫正
            setTimeout(() => {
              const extraLength = currentValueLength - 1;
              if (index + extraLength > length - 1) {
                selectInputAfter(length - 1);
              } else {
                selectInputStart(index + extraLength);
              }
            });
          } else {
            selectInputAfter(index + event.target.value.length - 1);
          }
        }

        focusEventLockRef.current = false;
      },
      onFocus: (event) => {
        if (focusEventLockRef.current) {
          return;
        }

        if (event.currentTarget === inputRefs.current[index] && mergedValue.length < index) {
          selectInputAfter(mergedValue.length);
        }
      },
      onKeyDown: (event) => {
        const selectionStart = event.currentTarget.selectionStart;

        if (event.key === 'Backspace') {
          if (
            (event.ctrlKey && event.shiftKey && event.altKey) ||
            (event.ctrlKey && event.shiftKey) ||
            (event.ctrlKey && event.altKey) ||
            (event.shiftKey && event.altKey)
          ) {
            return;
          }

          if (event.ctrlKey && typeof selectionStart === 'number') {
            event.preventDefault();
            const nextMergedValue = [...mergedValue];
            nextMergedValue.splice(0, index + selectionStart);
            mergedOnChange(nextMergedValue.join(''));

            // 观察到如下现象：
            // 当向前删除时，默认情况下，光标总是移动第一个输入框中，caret index 为 1，
            // 因此暂时通过 setTimeOut 矫正
            setTimeout(() => {
              selectInputStart(0);
            });
            return;
          }

          // 观察到如下现象：
          // 当向前删除时，如果当前输入框中有值，后续输入框也有值，caret index 不会变，仍为 1，
          // 因此暂时通过 setTimeOut 矫正
          setTimeout(() => {
            selectInputStart(index);
          });
        }

        // Delete 事件较之 Backspace 边界情况更少
        if (event.key === 'Delete') {
          if (
            (event.ctrlKey && event.shiftKey && event.altKey) ||
            (event.ctrlKey && event.shiftKey) ||
            (event.ctrlKey && event.altKey) ||
            (event.shiftKey && event.altKey)
          ) {
            return;
          }

          if (event.ctrlKey && typeof selectionStart === 'number') {
            event.preventDefault();
            let nextMergedValue = [...mergedValue];
            nextMergedValue = nextMergedValue.slice(0, index + selectionStart);
            mergedOnChange(nextMergedValue.join(''));
            return;
          }
        }

        if (event.key === 'Home' && !event.ctrlKey && !event.shiftKey && !event.altKey) {
          event.preventDefault();
          selectInputStart(0);
        }

        if (event.key === 'End' && !event.ctrlKey && !event.shiftKey && !event.altKey) {
          event.preventDefault();
          const targetIndex = mergedValue.length - 1;
          selectInputAfter(targetIndex);
        }

        if (
          // 暂时仅处理 Caret 的情况
          window.getSelection()?.type === 'Caret' &&
          typeof selectionStart === 'number'
        ) {
          keyDownDataRef.current = {
            inputIndex: index,
            caretIndex: selectionStart,
          };
        }
      },
      /**
       * 实测发现 onKeyDown 时 selectionStart 是按下前的位置，
       * onKeyUp 时 selectionStart 是按下后的位置
       */
      onKeyUp: (event) => {
        const selectionStart = event.currentTarget.selectionStart;
        if (
          event.key === 'ArrowLeft' &&
          keyDownDataRef.current?.inputIndex === index &&
          keyDownDataRef.current.caretIndex === 0 &&
          selectionStart === 0 &&
          index - 1 >= 0
        ) {
          selectInputAfter(index - 1);
          return;
        }
        if (
          event.key === 'ArrowRight' &&
          keyDownDataRef.current?.inputIndex === index &&
          keyDownDataRef.current.caretIndex === 1 &&
          selectionStart === 1 &&
          index + 1 <= length
        ) {
          selectInputStart(index + 1);
          return;
        }

        if (event.key === 'Backspace') {
          if (
            (event.ctrlKey && event.shiftKey && event.altKey) ||
            (event.ctrlKey && event.shiftKey) ||
            (event.ctrlKey && event.altKey) ||
            (event.shiftKey && event.altKey) ||
            event.ctrlKey
          ) {
            return;
          }

          if (keyDownDataRef.current?.inputIndex === index && keyDownDataRef.current.caretIndex === 0) {
            removePrevInput(index);
          }
        }

        if (event.key === 'Delete') {
          if (
            (event.ctrlKey && event.shiftKey && event.altKey) ||
            (event.ctrlKey && event.shiftKey) ||
            (event.ctrlKey && event.altKey) ||
            (event.shiftKey && event.altKey) ||
            event.ctrlKey
          ) {
            return;
          }

          if (keyDownDataRef.current?.inputIndex === index && keyDownDataRef.current.caretIndex === 1) {
            removeAfterInput(index);
          }
        }
      },
    } satisfies React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

    return result;
  };

  return {
    inputProps: Array.from({length}, (_, index) => index).map((index) => {
      return getInputProps(index);
    }),
    clearInput: () => {
      mergedOnChange('');
    },
    setInput: (nextValue: string) => {
      const internalValue = nextValue
        .split('')
        .map((item) => item.trim())
        .join('');
      const normalizedValue =
        internalValue && normalizeValue ? normalizeValue(internalValue, mergedValue.join('')) : internalValue;
      mergedOnChange(normalizedValue);
    },
    getInput: () => {
      return mergedValue.join('');
    },
  };
}
