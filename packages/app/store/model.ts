/*
 * @Author: Yosan
 * @Date: 2022-11-12 14:23:13
 * @LastEditors: Yosan
 * @LastEditTime: 2022-11-12 14:26:20
 * @Description:
 */
import {useState} from 'react';
import {RootModel} from './models';
import {useDispatch, useSelector} from 'react-redux';

const models = new Set();

const _config: any = {};

export const config = new Proxy(_config, {
  get: function (target, name) {
    return name in target ? target[name] : undefined;
  },
  set: function (target, name, value) {
    target[name] = value;
    return true;
  },
});

export const useRematchModel = (model: RootModel | string) => {
  const [, setFlag] = useState(0);
  if (!config.store) {
    throw new Error('Please config rematch store first');
  }
  const name: any = typeof model === 'string' ? model : model.name;
  if (!models.has(name) && typeof model !== 'string') {
    models.add(name);
    config.store.model(model);
    // force update
    setFlag((v) => v + 1);
  }
  const state = useSelector((rootState: any) => rootState[name]);
  const dispatch = useDispatch()[name];
  return [state, dispatch];
};
