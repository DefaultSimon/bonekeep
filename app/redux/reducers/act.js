// @flow
import produce from 'immer/dist/immer';

import type { RootActState } from '../types/act';
import { defaultActState } from '../types/act';

import {
  RENAME_ACT,
  SET_ACT_DESCRIPTION,
  TOGGLE_ACT_SETTINGS_MODAL
} from '../actions/act';

export default function act(state: RootActState = defaultActState, action: *) {
  switch (action.type) {
    case RENAME_ACT:
      return produce(state, (draft: RootActState) => {
        draft.title = action.title;
      });
    case SET_ACT_DESCRIPTION:
      return produce(state, (draft: RootActState) => {
        draft.description = action.description;
      });
    case TOGGLE_ACT_SETTINGS_MODAL:
      return produce(state, (draft: RootActState) => {
        draft.editing = !draft.editing;
      });
    default:
      return state;
  }
}
