// @flow
import { type SoundId, type SoundAction } from '../types/sound';

export const ADD_SOUND: string = 'ADD_SOUND';
export const SET_SOUND_FILE: string = 'UPDATE_SOUND_FILE';
export const SET_SOUND_OBJ: string = 'UPDATE_SOUND_OBJ';
export const SET_SOUND_KEYBIND: string = 'UPDATE_SOUND_KEYBIND';
export const SET_SOUND_EDITING: string = 'SET_SOUND_EDITING';
export const SET_SOUND_NAME: string = 'SET_SOUND_NAME';

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

export const setSoundObj = (soundId: SoundId, soundObj: *): SoundAction => ({
  type: SET_SOUND_OBJ,
  soundId,
  soundObj
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
