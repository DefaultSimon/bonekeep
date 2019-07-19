// @flow
import type { RootActState } from './act';
import type { RootScenesState } from './scene';

export type RootReduxState = {
  act: RootActState,
  scenes: RootScenesState
};
