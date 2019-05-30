// @flow

import { combineReducers } from 'redux';
import sounds from './sounds';
import type { RootReduxState } from '../types/root';

const reducers = {
  sounds
};

const rootReducer = combineReducers<typeof reducers, RootReduxState>(reducers);

export default rootReducer;
