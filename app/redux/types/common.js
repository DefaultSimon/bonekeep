// @flow
import type { Store as ReduxStore } from 'redux';

export type Action = {
  +type: string
};

export type Store = ReduxStore;
