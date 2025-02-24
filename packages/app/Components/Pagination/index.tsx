/*
 * @Date: 2024-07-17 11:10:55
 * @LastEditors: snapxlabs
 * @LastEditTime: 2024-07-17 11:30:33
 * @FilePath: /snapx-nfc-app/packages/app/pages/home/index/components/HomeBanner/Pagination.tsx
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
import {appScale} from 'app/utils';
import Animated from 'react-native-reanimated';
export type PaginationProps = {
  isExpanded: boolean;
};

const Pagination: React.FC<any> = (props: PaginationProps) => {
  const {isExpanded} = props;
  const scheme = 'light'

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
