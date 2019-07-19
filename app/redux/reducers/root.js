// @flow

import { combineReducers } from 'redux';
import act from './act';
import scenes from './scenes';
import type { RootReduxState } from '../types/root';

const reducers = {
  act,
  scenes
};

const rootReducer = combineReducers<typeof reducers, RootReduxState>(reducers);

export default rootReducer;
