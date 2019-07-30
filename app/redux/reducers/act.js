// @flow
import produce from 'immer/dist/immer';

import type { RootActState } from '../types/act';
import { defaultActState } from '../types/act';

import { RENAME_ACT, SET_ACT_DESCRIPTION } from '../actions/act';

export default function act(state: RootActState = defaultActState, action: *) {
  switch (action.type) {
    case RENAME_ACT:
      return produce(state, (draft: RootActState) => {
        draft.title = action.newName;
      });
    case SET_ACT_DESCRIPTION:
      return produce(state, (draft: RootActState) => {
        draft.description = action.description;
      });
    default:
      return state;
  }
}
