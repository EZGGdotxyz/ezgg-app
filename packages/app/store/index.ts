/* eslint-disable */
import {init, RematchDispatch, RematchRootState} from '@rematch/core';
import loadingPlugin, {ExtraModelsFromLoading} from '@rematch/loading';
import {models, RootModel} from './models';
import {config} from './model';

type FullModel = ExtraModelsFromLoading<RootModel>;
const store = init({
  models,
});

export type Store = typeof store;
export type Dispatch = RematchDispatch<RootModel>;
export type RootState = RematchRootState<RootModel>;
config.store = store;
/* eslint-enable */

export default store;
