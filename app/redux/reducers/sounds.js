// @flow
import produce from 'immer/dist/immer';
import {
  SET_SOUND_FILE,
  SET_SOUND_OBJ,
  SET_SOUND_KEYBIND,
  SET_SOUND_EDITING,
  SET_SOUND_NAME
} from '../actions/sounds';

const initialSoundState = {
  soundsById: {}
};

/**
 * Ensure that a sound object with the specific soundId exists in soundsById. If it doesn't, create it.
 * @param state    Redux state
 * @param soundId  Sound ID
 * @return Updated state
 */
function ensureSoundExists(state, soundId) {
  if (!Object.prototype.hasOwnProperty.call(state.soundsById, soundId)) {
    return {
      ...state,
      soundsById: {
        ...state.soundsById,
        [soundId]: {}
      }
    };
  }

  return state;
}

/**
 * Modify a specific sound by its ID.
 * @param state     Redux state
 * @param soundId   Sound ID
 * @param producer  Callback that takes a draft object as an argument (draft is in this case the sound object).
 * @returns Updated state
 */
function modifySoundById(state, soundId, producer) {
  const ensuredState = ensureSoundExists(state, soundId);

  return {
    ...ensuredState,
    soundsById: {
      ...ensuredState.soundsById,
      [soundId]: produce(ensuredState.soundsById[soundId], draft =>
        producer(draft)
      )
    }
  };
}

export default function sounds(state = initialSoundState, action) {
  switch (action.type) {
    case SET_SOUND_FILE: {
      const { soundId, filename } = action;

      return modifySoundById(state, soundId, draft => {
        draft.filename = filename;
      });
    }
    case SET_SOUND_OBJ: {
      const { soundId, soundObj } = action;

      return modifySoundById(state, soundId, draft => {
        draft.soundObj = soundObj;
      });
    }
    case SET_SOUND_KEYBIND: {
      const { soundId, keybind } = action;

      return modifySoundById(state, soundId, draft => {
        draft.keybind = keybind;
      });
    }
    case SET_SOUND_EDITING: {
      const { soundId, isEditing } = action;

      return modifySoundById(state, soundId, draft => {
        draft.isEditing = isEditing;
      });
    }
    case SET_SOUND_NAME: {
      const { soundId, name } = action;

      return modifySoundById(state, soundId, draft => {
        draft.name = name;
      });
    }
    default: {
      return state;
    }
  }
}
