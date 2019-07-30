// @flow

import type { RootReduxState } from '../types/root';
import type { RootActState } from '../types/act';

export const getAct = (state: RootReduxState): RootActState => state.act;

export const mapAct = (state: RootReduxState): { act: RootActState } => ({
  act: getAct(state)
});
