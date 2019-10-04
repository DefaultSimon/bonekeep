// @flow
// Prefix: 'map' for functions that should be used directly
// and 'get' for intermediate functions

import type { RootScenesState, SceneId, SceneState } from '../types/scene';
import type { RootReduxState } from '../types/root';

export const getScenes = (state: RootReduxState): RootScenesState =>
  state.scenes;

export const getActiveSceneId = (state: RootReduxState): SceneId => {
  const scenes = getScenes(state);
  return scenes.loadedSceneId;
};

export const getActiveSceneIdWithScenes = (state: RootScenesState): SceneId => {
  // with scenes state provided, rather than root redux state
  return state.loadedSceneId;
};

export const getSceneObject = (
  state: RootScenesState,
  sceneId: SceneId
): SceneState => {
  return state.sceneById[sceneId];
};

export const mapScenesArray = (
  state: RootReduxState
): { scenes: Array<SceneState> } => {
  const scenes = getScenes(state);
  return {
    scenes: Object.values(scenes.sceneById)
  };
};

export const mapActiveScene = (
  state: RootReduxState
): { activeScene: SceneState } => {
  const scenes = getScenes(state);
  const activeSceneId = getActiveSceneId(state);

  return {
    activeScene: scenes.sceneById[activeSceneId]
  };
};

export const mapAddingScene = (
  state: RootReduxState
): { addingScene: boolean } => {
  const scenes = getScenes(state);

  return {
    addingScene: scenes.addingScene
  };
};
