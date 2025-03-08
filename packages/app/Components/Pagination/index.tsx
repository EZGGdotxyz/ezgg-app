/*
 * @Date: 2024-07-17 11:10:55
 * @LastEditors: yosan
 * @LastEditTime: 2025-03-08 15:20:39
 * @FilePath: /ezgg-app/packages/app/Components/Pagination/index.tsx
 */
import * as React from 'react';
import type {ICarouselInstance} from 'react-native-reanimated-carousel';
import Carousel from 'react-native-reanimated-carousel';
import {Easing, useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated';
import {
  AppImage,
  Button,
  ExternalLink,
  ScrollView,
  SizableText,
  Text,
  XStack,
  YStack,
  useToastController,
} from '@my/ui';
import {useTranslation} from 'react-i18next';
import {Dimensions, Platform, useColorScheme} from 'react-native';
import {useEffect, useState} from 'react';
import Animated from 'react-native-reanimated';
import useResponse from 'app/hooks/useResponse';
export type PaginationProps = {
  isExpanded: boolean;
};

const Pagination: React.FC<any> = (props: PaginationProps) => {
  const {isExpanded} = props;
  const scheme = 'light'
  const {appScale} = useResponse();

  const width = useSharedValue(isExpanded ? appScale(40) : appScale(8)); // 初始宽度为100，展开时为300
  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: width.value,
      backgroundColor: isExpanded ? (scheme === 'dark' ? '#ccc' : '#212121') : scheme === 'dark' ? '#212121' : '#ccc',
      // transform: [{scaleX: width.value / 100}], // 保持盒子的长宽比
    };
  });

  useEffect(() => {
    width.value = withTiming(isExpanded ? appScale(40) : appScale(20), {
      duration: 300,
      easing: Easing.out(Easing.ease),
    });
  }, [isExpanded]);

  return (
    <Animated.View
      style={[
        {
          height: 2,
          borderRadius: 2,
        },
        animatedStyle,
      ]}
    />
  );
};

export default Pagination;
