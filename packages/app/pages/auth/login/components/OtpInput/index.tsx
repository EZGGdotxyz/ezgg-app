/*
 * @Date: 2023-12-08 16:25:15
 * @LastEditors: snapxlabs
 * @LastEditTime: 2024-07-16 22:00:26
 * @FilePath: /snapx-nfc-app/packages/app/pages/auth/login/components/OtpInput/index.tsx
 */
import {Airplay, AlignJustify} from '@tamagui/lucide-icons';
import {useTranslation} from 'react-i18next';
import {Link} from 'solito/link';
import {SafeAreaView, Text, View, StyleSheet, useColorScheme} from 'react-native';
import React, {useState} from 'react';

import {CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell} from 'react-native-confirmation-code-field';
import {appScale} from 'app/utils';
const CELL_COUNT = 6;

const styles = StyleSheet.create({
  root: {padding: 0},
  title: {textAlign: 'center', fontSize: 26},
  codeFieldRoot: {
    // marginTop: 20,
    width: appScale(343),
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  cellRoot: {
    width: appScale(40),
    height: appScale(40),
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#D9D9D9',
    backgroundColor: '#f7f7f7',
    borderBottomWidth: 1,
    borderRadius: 10,
    // marginLeft:10,
  },
  cellText: {
    color: '#212121',
    fontSize: 26,
    textAlign: 'center',
  },
  focusCell: {
    borderBottomColor: '#212121',
    borderBottomWidth: 2,
  },
});
export type OtpInputProps = {
  value: string;
  setValue: (value: string) => void;
};
// 首页 餐厅详情
const OtpInput: React.FC<any> = (props: OtpInputProps) => {
  const scheme = 'light'

  const {value, setValue} = props;
  const {t, i18n} = useTranslation();
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [codeFieldProps, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  return (
    <SafeAreaView style={styles.root}>
      <CodeField
        ref={ref}
        {...codeFieldProps}
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({index, symbol, isFocused}) => (
          <View
            // Make sure that you pass onLayout={getCellOnLayoutHandler(index)} prop to root component of "Cell"
            onLayout={getCellOnLayoutHandler(index)}
            key={index}
            style={[styles.cellRoot, isFocused && styles.focusCell]}
          >
            <Text
              style={{
                color: scheme !== 'dark' ? '#151515' : '#fff',
                fontSize: 26,
                textAlign: 'center',
              }}
            >
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default OtpInput;
