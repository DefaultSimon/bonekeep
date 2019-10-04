// @flow
import produce from 'immer/dist/immer';

import type { RootScenesState, SceneId, SceneState } from '../types/scene';
import { defaultScenesState } from '../types/scene';
import {
  ADD_SCENE,
  SET_ACTIVE_SCENE,
  TOGGLE_SCENE_ADD_MODAL
} from '../actions/scene';
import { ADD_SOUND } from '../actions/sounds';

function ensureSceneExists(state: RootScenesState, sceneId: SceneId) {
  const { sceneById } = state;

  if (!Object.prototype.hasOwnProperty.call(sceneById, sceneId)) {
    return {
      ...state,
      sceneById: {
        ...state.sceneById,
        [sceneId]: {
          id: sceneId
        }
      }
    };
  }

  return state;
}

function modifyScene(
  state: RootScenesState,
  sceneId: SceneId,
  producer: (draft: RootScenesState) => void
) {
  const ensuredState = ensureSceneExists(state, sceneId);

  return {
    ...ensuredState,
    sceneById: {
      ...ensuredState.sceneById,
      [sceneId]: produce(ensuredState.sceneById[sceneId], producer)
    }
  };
}

export default function scenes(
  state: RootScenesState = defaultScenesState,
  action: *
) {
  switch (action.type) {
    case ADD_SCENE: {
      const { title, sceneId } = action;

      return modifyScene(state, sceneId, (scene: SceneState) => {
        scene.title = title;
      });
    }
    case SET_ACTIVE_SCENE:
      return produce(state, (draft: RootScenesState) => {
        const { sceneId } = action;

        draft.loadedSceneId = sceneId;
      });
    case TOGGLE_SCENE_ADD_MODAL:
      return produce(state, (draft: RootScenesState) => {
        draft.addingScene = !draft.addingScene;
      });
    // Sound-related
    case ADD_SOUND: {
      const { soundId, sceneId } = action;

      return modifyScene(state, sceneId, (scene: SceneState) => {
        if (!scene.sounds || scene.sounds.length === 0) {
          scene.sounds = [soundId];
        } else {
          scene.sounds.push(soundId);
        }
      });
    }
    default:
      return state;
  }
}
