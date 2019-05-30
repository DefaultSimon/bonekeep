// @flow
import type { Store as ReduxStore } from 'redux';
import type { RootReduxState } from './root';

export type Action = {
  +type: string
};

export type Store = ReduxStore<RootReduxState, Action>;
