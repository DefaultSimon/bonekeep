// @flow

import type { RootReduxState } from '../types/root';
import type { RootActState } from '../types/act';

// eslint-disable-next-line import/prefer-default-export
export const mapAct = (state: RootReduxState): RootActState => state.act;
