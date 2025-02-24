/*
 * @Author: Yosan
 * @Date: 2022-11-12 13:34:59
 * @LastEditors: yosan
 * @LastEditTime: 2023-12-08 10:05:37
 * @Description:
 */
import { Models } from '@rematch/core';
import { app } from './app';
import { user } from './user';

export interface RootModel extends Models<RootModel> {
  user: typeof user;
  app: typeof app;
}

export const models: RootModel = {
  user,
  app,
};
