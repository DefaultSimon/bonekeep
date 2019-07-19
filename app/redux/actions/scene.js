// @flow

import type { SceneId } from '../types/scene';

export const ADD_SCENE: string = 'ADD_SCENE';
export const SET_ACTIVE_SCENE: string = 'SET_ACTIVE_SCENE';

export const addScene = (sceneId: SceneId, title: string) => ({
  type: ADD_SCENE,
  sceneId,
  title
});

export const setActiveScene = (sceneId: SceneId) => ({
  type: SET_ACTIVE_SCENE,
  sceneId
});
