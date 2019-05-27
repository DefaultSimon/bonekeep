// @flow
import PropTypes from 'prop-types';

export const SET_SOUND_FILE = 'UPDATE_SOUND_FILE';
export const SET_SOUND_OBJ = 'UPDATE_SOUND_OBJ';
export const SET_SOUND_KEYBIND = 'UPDATE_SOUND_KEYBIND';
export const SET_SOUND_EDITING = 'SET_SOUND_EDITING';
export const SET_SOUND_NAME = 'SET_SOUND_NAME';

export const SOUND_STRUCTURE = {
  soundId: PropTypes.number,
  filename: PropTypes.string,
  soundObj: PropTypes.any,
  keybind: PropTypes.string,
  isEditing: PropTypes.boolean
};

export const setSoundFile = (soundId, filename: string) => ({
  type: SET_SOUND_FILE,
  soundId,
  filename
});

export const setSoundObj = (soundId, soundObj) => ({
  type: SET_SOUND_OBJ,
  soundId,
  soundObj
});

export const setSoundKeybind = (soundId, keybind) => ({
  type: SET_SOUND_KEYBIND,
  soundId,
  keybind
});

export const setSoundEditing = (soundId, isEditing) => ({
  type: SET_SOUND_EDITING,
  soundId,
  isEditing
});

export const setSoundName = (soundId, name) => ({
  type: SET_SOUND_NAME,
  soundId,
  name
});
