/*
 * @Date: 2024-06-08 18:35:07
 * @LastEditors: yosan
 * @LastEditTime: 2025-03-08 15:21:24
 * @FilePath: /ezgg-app/packages/app/Components/TabBarButton/index.tsx
 */
import {View, Text, Pressable, StyleSheet, useColorScheme} from 'react-native';
import React, {useEffect} from 'react';
import {AppImage, YStack, SizableText} from '@my/ui';
import {useTranslation} from 'react-i18next';
import useResponse from 'app/hooks/useResponse';

const TabBarButton = (props) => {
  const {isFocused, label, routeName} = props;
  const {appScale} = useResponse();

  const {t, i18n} = useTranslation();

  const tabList = {
    home: {
      icon: require('app/assets/images/home.png'),
      press: require('app/assets/images/dark/home.png'),
      dark_press: require('app/assets/images/dark/home.png'),
      title: t('screen.home.title'),
    },
    profile: {
      icon: require('app/assets/images/profile.png'),
      press: require('app/assets/images/dark/profile.png'),
      dark_press: require('app/assets/images/dark/profile.png'),
      title: t('screen.profile.title'),
    },
    explore: {
      icon: require('app/assets/images/qr2.png'),
      press: require('app/assets/images/qr2.png'),
      dark_press: require('app/assets/images/qr2.png'),
    },
  };
  return (
    <Pressable {...props} style={styles.container}>
      {label !== 'explore' ? (
        <YStack ai={'center'}>
          <AppImage
            width={appScale(24)}
            height={appScale(24)}
            src={isFocused ? tabList[routeName]['press'] : tabList[routeName].icon}
            type="local"
          />
          <SizableText
            h={appScale(24)}
            lh={appScale(24)}
            col={isFocused ? '#212121' : '#9E9E9E'}
            fontSize={'$1'}
            fow={'400'}
          >
            {tabList[routeName]['title']}
          </SizableText>
        </YStack>
      ) : (
        <View
          style={{
            marginTop: appScale(0),
          }}
        >
          <AppImage width={appScale(48)} height={appScale(48)} src={tabList[routeName]['press']} type="local" />
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 48,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
});

export default TabBarButton;
