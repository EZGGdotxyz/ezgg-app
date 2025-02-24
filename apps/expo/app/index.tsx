/*
 * @Date: 2024-07-09 10:57:36
 * @LastEditors: snapxlabs
 * @LastEditTime: 2024-08-04 14:24:10
 * @FilePath: /snapx-nfc-app-merchants/apps/expo/app/index.tsx
 */
import {StatusBar, View} from 'react-native';
import HomeScreen from 'app/pages/home/index/index';

/* @info Import useFonts hook from 'expo-font'. */
import {useFonts} from 'expo-font'; /* @end */
/* @info Also, import SplashScreen so that when the fonts are not loaded, we can continue to show SplashScreen. */
import * as SplashScreen from 'expo-splash-screen'; /* @end */
import {useRematchModel} from 'app/store/model';
import {Stack, router, useRouter} from 'expo-router';
import {useCallback, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Button} from '@my/ui';
import {ChevronLeft} from '@tamagui/lucide-icons';
import {useFocusEffect} from '@react-navigation/native';

const Home = () => {
  const [{isLogin}] = useRematchModel('user');
  const [isRefresh, setIsRefresh] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setIsRefresh(true);
      return () => {
        setIsRefresh(false);
        // 在这里执行清理操作，例如取消获取数据
      };
    }, []),
  );

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Stack.Screen
        options={{
          headerShown: false,
          title: '',
          // headerShadowVisible: false,
        }}
      />
      <HomeScreen isRefresh={isRefresh} />
    </View>
  );
};
export default Home;
