// @flow

import { combineReducers } from 'redux';
import act from './act';
import scenes from './scenes';
import sounds from './sounds';
import type { RootReduxState } from '../types/root';

// TODO look into https://github.com/omnidan/redux-ignore for performance

const reducers = {
  act,
  scenes,
  sounds
};

const rootReducer = combineReducers<typeof reducers, RootReduxState>(reducers);

export default rootReducer;
