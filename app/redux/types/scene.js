// @flow
import type { SoundId } from './sounds';

export type SceneId = string;
export type SceneSoundsState = Array<SoundId>;

export type SceneState = {
  id: SceneId,
  title?: string,
  description?: string,
  sounds?: SceneSoundsState
};

export type RootSceneByIdState = {
  [SceneId]: SceneState
};

export type RootScenesState = {
  // All available scenes
  sceneById: RootSceneByIdState,
  // Which scene should be displayed on the right
  loadedSceneId: ?SceneId,
  // The modal is open
  addingScene: boolean
};

export const defaultSceneByIdState = {};

export const defaultScenesState = {
  sceneById: defaultSceneByIdState,
  loadedSceneId: 0,
  addingScene: false
};
