/*
 * @Date: 2024-01-17 23:04:45
 * @LastEditors: snapxlabs
 * @LastEditTime: 2024-07-16 16:10:13
 * @FilePath: /snapx-nfc-app/packages/app/pages/auth/login/components/OtpInput/index.web.tsx
 */
import React, {useState, useEffect, useRef} from 'react';
import { useColorScheme } from 'react-native';
// import './index.css';

const CodeInput = (props) => {
  const scheme = 'light'

  /**
   * vertifyCode：验证码
   * onChange：验证码改变的回调
   * onComplete：验证码输入完成后的回调
   */
  const {value = '', setValue} = props;

  const [codeArray, setCodeArray] = useState([]); // 用来存放验证码的数组
  const [isFocus, setIsFocus] = useState(false); // 判断是否获取焦点

  const inputList = [...Array(6)].map((item, index) => index); // 生成模拟输入框数组[0,1,2,3,4,5]

  const inputRef = useRef(null); // 绑定input输入框

  // 获取焦点事件
  const handleInputFocus = () => {
    inputRef.current?.focus(); // 为输入框聚焦
    setIsFocus(true);
  };

  // 获取验证码
  useEffect(() => {
    setCodeArray(value.split(''));
  }, [value]);

  // 验证码改变事件
  const handleChange = (e) => {
    if (e.target.value) {
      // 获取当前输入的数字
      let val = e.target.value.replace(/[^\d]/g, ''); // 只保留数字
      val = val.substring(0, 6); // 只获取前 6 位
      setValue?.(val);
    } else {
      setValue?.('');
    }
  };

  // 失去焦点
  const handleBlur = () => {
    setIsFocus(false);
  };

  // 获取焦点
  const handleFocus = () => {
    setIsFocus(true);
  };

  // 默认聚焦input输入框，每次进入都执行
  useEffect(() => {
    handleInputFocus();
  }, []);

  return (
    <div className="code-input-container" onClick={handleInputFocus}>
      {/* 验证码数字显示部分 */}
      <div className="number-box">
        {inputList.map((item, index) => {
          return (
            <div
              className="input-item"
              key={index}
              style={{
                color: scheme !== 'dark' ? '#151515' : '#fff',
                // 当验证码的长度等于item时，表示当前正在等待下一位的输入，输入框变色
                borderBottom: `2px solid ${item === codeArray.length && isFocus ? '#212121' : '#D9D9D9'}`,
              }}
            >
              {codeArray[item]}
            </div>
          );
        })}
      </div>
      {/* 输入框，用样式隐藏不显示 */}
      <input
        type="number" // 数字类型输入框
        inputMode="numeric" // 可以弹起数字键盘
        maxLength={6} // 最大长度是6
        className="input-value"
        value={value} // value值为输入的验证码
        ref={inputRef}
        onChange={handleChange} // 验证码改变事件
        onBlur={handleBlur} // 失去焦点事件
        onFocus={handleFocus} // 聚焦事件
      />
    </div>
  );
};

export default CodeInput;
