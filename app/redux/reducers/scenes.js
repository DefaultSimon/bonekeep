// @flow
import produce from 'immer/dist/immer';

import type { RootScenesState } from '../types/scene';
import { defaultScenesState } from '../types/scene';
import { ADD_SCENE, SET_ACTIVE_SCENE } from '../actions/scene';

export default function scenes(
  state: RootScenesState = defaultScenesState,
  action: *
) {
  switch (action.type) {
    case ADD_SCENE:
      return produce(state, (draft: RootScenesState) => {
        const { title, sceneId } = action;

        draft.sceneById[sceneId] = {
          id: sceneId,
          title
        };
      });
    case SET_ACTIVE_SCENE:
      return produce(state, (draft: RootScenesState) => {
        const { sceneId } = action;

        draft.loadedSceneId = sceneId;
      });
    default:
      return state;
  }
}
