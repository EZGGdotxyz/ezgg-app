/*
 * @Date: 2023-12-18 16:09:28
 * @LastEditors: yosan
 * @LastEditTime: 2023-12-18 16:19:18
 * @FilePath: /snapx-nfc-app/packages/ui/src/block/appHeader/shared.ts
 */
import React from 'react';

export interface AppHeaderProps {
  title?: any;
  headerLeft?: (props: {
    tintColor?: string;
    pressColor?: string;
    pressOpacity?: number;
  }) => React.ReactNode;
  headerRight?: (props: {
    tintColor?: string;
    pressColor?: string;
    pressOpacity?: number;
  }) => React.ReactNode;
}

export interface HeaderBackButtonProps {
  fallbackUrl: string;
}
