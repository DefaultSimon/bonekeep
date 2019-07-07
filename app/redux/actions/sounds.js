// @flow
import { type SoundId, type SoundAction } from '../types/sound';

export const ADD_SOUND: string = 'ADD_SOUND';
export const SET_SOUND_FILE: string = 'UPDATE_SOUND_FILE';
export const SET_SOUND_KEYBIND: string = 'UPDATE_SOUND_KEYBIND';
export const SET_SOUND_EDITING: string = 'SET_SOUND_EDITING';
export const SET_SOUND_NAME: string = 'SET_SOUND_NAME';
export const REMOVE_SOUND: string = 'REMOVE_SOUND';
export const SET_SOUND_VOLUME: string = 'SET_SOUND_VOLUME';

export const addSound = (soundId: SoundId): SoundAction => ({
  type: ADD_SOUND,
  soundId
});

export const setSoundFile = (
  soundId: SoundId,
  filename: string
): SoundAction => ({
  type: SET_SOUND_FILE,
  soundId,
  filename
});

export const setSoundKeybind = (
  soundId: SoundId,
  keybind: string
): SoundAction => ({
  type: SET_SOUND_KEYBIND,
  soundId,
  keybind
});

export const setSoundEditing = (soundId: SoundId, isEditing: boolean) => ({
  type: SET_SOUND_EDITING,
  soundId,
  isEditing
});

export const setSoundName = (soundId: SoundId, name: string) => ({
  type: SET_SOUND_NAME,
  soundId,
  name
});

export const removeSound = (soundId: SoundId) => ({
  type: REMOVE_SOUND,
  soundId
});

export const setSoundVolume = (soundId: SoundId, volume: number) => ({
  type: SET_SOUND_VOLUME,
  soundId,
  // volume should be between 0 and 1
  volume
});
