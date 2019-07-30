// @flow
import type { RootActState } from './act';
import type { RootScenesState } from './scene';
import type { RootSoundsState } from './sounds';

export type RootReduxState = {
  act: RootActState,
  scenes: RootScenesState,
  sounds: RootSoundsState
};
