// @flow
export const UPDATE_SOUND_FILE = 'UPDATE_SOUND_FILE';
export const UPDATE_SOUND_OBJ = 'UPDATE_SOUND_OBJ';
export const UPDATE_SOUND_KEYBIND = 'UPDATE_SOUND_KEYBIND';

export const updateSoundFile = (soundId, filename: string) => ({
  type: UPDATE_SOUND_FILE,
  soundId,
  filename
});

export const updateSoundObj = (soundId, soundObj) => ({
  type: UPDATE_SOUND_OBJ,
  soundId,
  soundObj
});

export const updateSoundKeybind = (soundId, keybind) => ({
  type: UPDATE_SOUND_KEYBIND,
  soundId,
  keybind
});
