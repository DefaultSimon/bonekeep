// @flow
export type SceneId = string;

export type SceneState = {
  id: SceneId,
  title: string,
  description?: string
};

export type RootScenesState = {
  sceneById: {
    [SceneId]: SceneState
  },
  loadedSceneId: ?SceneId
};

// eslint-disable-next-line import/prefer-default-export
export const defaultScenesState = {
  sceneById: {},
  loadedSceneId: 0
};
