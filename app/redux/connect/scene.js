// @flow

import type { RootScenesState, SceneState } from '../types/scene';
import type { RootReduxState } from '../types/root';

export const mapScenes = (state: RootReduxState): RootScenesState =>
  state.scenes;

export const mapScenesArray = (
  state: RootReduxState
): { scenes: Array<SceneState> } => {
  const scenes = mapScenes(state);
  return {
    scenes: Object.values(scenes.sceneById)
  };
};

export const mapActiveScene = (
  state: RootReduxState
): { activeScene: SceneState } => {
  const scenes = mapScenes(state);
  const activeSceneId = scenes.loadedSceneId;

  return {
    activeScene: scenes.sceneById[activeSceneId]
  };
};
