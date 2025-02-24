import {config} from '@my/config';

export type Conf = typeof config;

declare module '@my/ui' {
  interface TamaguiCustomConfig extends Conf {}
}

declare module '*.json';
declare module '*.png';
declare module '*.jpg';
declare module '*.svg';
declare module '*.scss';
declare module '*.ts';
declare module '*.js';
