// @flow
// Sound actions
import type { SoundId } from '../types/sounds';
import type { SceneId } from '../types/scene';

// Types
export const ADD_SOUND: string = 'ADD_SOUND';
export const REMOVE_SOUND: string = 'REMOVE_SOUND';
export const SET_SOUND_NAME: string = 'SET_SOUND_NAME';
export const SET_SOUND_FILE: string = 'SET_SOUND_FILE';
export const SET_SOUND_MUTE_STATUS: string = 'SET_SOUND_MUTE';
export const SET_SOUND_AUTOPLAY: string = 'SET_SOUND_AUTOPLAY';
export const SET_SOUND_PLAYING: string = 'SET_SOUND_PLAYING';
export const SET_SOUND_VOLUME: string = 'SET_SOUND_VOLUME';
export const SET_SOUND_LOOP: string = 'SET_SOUND_LOOP';

export const addSound = (soundId: SoundId, sceneId: SceneId) => ({
  type: ADD_SOUND,
  soundId,
  sceneId
});

export const removeSound = (soundId: SoundId, sceneId: SceneId) => ({
  type: REMOVE_SOUND,
  soundId,
  sceneId
});

export const setSoundName = (
  soundId: SoundId,
  sceneId: SceneId,
  name: string
) => ({
  type: SET_SOUND_NAME,
  soundId,
  sceneId,
  name
});

export const setSoundFile = (
  soundId: SoundId,
  sceneId: SceneId,
  file: string
) => ({
  type: SET_SOUND_FILE,
  soundId,
  sceneId,
  file
});

export const setSoundMuteStatus = (
  soundId: SoundId,
  sceneId: SceneId,
  mute: boolean
) => ({
  type: SET_SOUND_MUTE_STATUS,
  soundId,
  sceneId,
  mute
});

export const setSoundAutoplay = (
  soundId: SoundId,
  sceneId: SceneId,
  autoplay: boolean
) => ({
  type: SET_SOUND_AUTOPLAY,
  soundId,
  sceneId,
  autoplay
});

export const setSoundPlaying = (
  soundId: SoundId,
  sceneId: SceneId,
  playing: boolean
) => ({
  type: SET_SOUND_PLAYING,
  soundId,
  sceneId,
  playing
});

export const setSoundVolume = (
  soundId: SoundId,
  sceneId: SceneId,
  volume: number
) => ({
  type: SET_SOUND_VOLUME,
  soundId,
  sceneId,
  volume
});

export const setSoundLoop = (
  soundId: SoundId,
  sceneId: SceneId,
  loop: boolean
) => ({
  type: SET_SOUND_LOOP,
  soundId,
  sceneId,
  loop
});
