// @flow
import produce from 'immer';
import {
  UPDATE_SOUND_FILE,
  UPDATE_SOUND_OBJ,
  UPDATE_SOUND_KEYBIND
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
function modifySoundById(state, soundId, producer: Object => void) {
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
    case UPDATE_SOUND_FILE: {
      const { soundId, filename } = action;

      return modifySoundById(state, soundId, draft => {
        draft.filename = filename;
      });
    }
    case UPDATE_SOUND_OBJ: {
      const { soundId, soundObj } = action;

      return modifySoundById(state, soundId, draft => {
        draft.soundObj = soundObj;
      });
    }
    case UPDATE_SOUND_KEYBIND: {
      const { soundId, keybind } = action;

      return modifySoundById(state, soundId, draft => {
        draft.keybind = keybind;
      });
    }
    default: {
      return state;
    }
  }
}
