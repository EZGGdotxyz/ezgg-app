/*
 * @Date: 2024-07-09 14:17:09
 * @LastEditors: yosan
 * @LastEditTime: 2025-02-27 15:22:02
 * @FilePath: /ezgg-app/packages/app/Components/TabBar/index.tsx
 */
import {View, Text, TouchableOpacity, StyleSheet, Platform} from 'react-native';
import React from 'react';
import TabBarButton from '../TabBarButton';
import {useRouter} from 'solito/router';
import {appScale, isIphoneX} from 'app/utils';
import {XStack} from '@my/ui';
import {useRematchModel} from 'app/store/model';

const TabBar = ({state, descriptors, navigation}) => {
  const {push, replace, back, parseNextPath} = useRouter();
  const [{isLogin}] = useRematchModel('user');

  return (
    <XStack
      height={appScale(isIphoneX() ? 82 + 8 : 48 + 8)}
      pt={8}
      pb={appScale(isIphoneX() ? 44 : 8)}
      bc="$background"
      style={styles.tabbar}
    >
      {state.routes.map((route, index) => {
        if (route.name === 'login') return null;
        let label = route.name;

        if (Platform.OS !== 'web') {
          const {options} = descriptors[route.key];
          label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;
        }
        if (['_sitemap', '+not-found'].includes(route.name)) return null;

        const isFocused = state.index === index;

        const onPress = () => {
          if (Platform.OS === 'web') {
            if (route.name === 'explore' && !isLogin) {
              return push('/login');
            }

            push('/' + (route.name === 'home' ? '' : route.name));
          } else {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              if (route.name === 'explore' && !isLogin) {
                return navigation.navigate('/login', route.params);
              }
              navigation.navigate(route.name, route.params);
            }
          }
        };

        const onLongPress = () => {
          if (Platform.OS === 'web') {
            if (route.name === 'explore' && !isLogin) {
              return push('/login');
            }
            push('/' + (route.name === 'home' ? '' : route.name));
          } else {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          }
        };

        return (
          <TabBarButton
            key={route.name}
            // style={styles.tabbarItem}
            onPress={onPress}
            onLongPress={onLongPress}
            isFocused={isFocused}
            routeName={route.name}
            label={label}
          />
        );
      })}
    </XStack>
  );
};

const styles = StyleSheet.create({
  tabbar: {
    position: Platform.OS === 'web' ? 'absolute' : 'relative',
    zIndex: 1000,
    flexShrink: 0,
    width: '100%',
    bottom: 0,
    left: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    // backgroundColor: 'white',
    // paddingVertical: 15,
    borderCurve: 'continuous',
  },
});

export default TabBar;
