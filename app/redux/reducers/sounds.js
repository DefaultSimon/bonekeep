// @flow
import produce from 'immer/dist/immer';
import {
  SET_SOUND_FILE,
  SET_SOUND_OBJ,
  SET_SOUND_KEYBIND,
  SET_SOUND_EDITING,
  SET_SOUND_NAME,
  ADD_SOUND,
  REMOVE_SOUND
} from '../actions/sounds';
import rootSoundState, {
  type SoundState,
  type SoundAction,
  type SoundId,
  type RootSoundsState
} from '../types/sound';

/**
 * Ensure that a sound object with the specific soundId exists in soundsById. If it doesn't, create it.
 * @param state    Redux state
 * @param soundId  Sound ID
 * @return Updated state
 */
function ensureSoundExists(state: RootSoundsState, soundId: SoundId) {
  if (!Object.prototype.hasOwnProperty.call(state.soundsById, soundId)) {
    return {
      ...state,
      soundsById: {
        ...state.soundsById,
        [soundId]: {
          soundId
        }
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
function modifySoundById(
  state: RootSoundsState,
  soundId: SoundId,
  producer: SoundState => void
) {
  const ensuredState = ensureSoundExists(state, soundId);

  return {
    ...ensuredState,
    soundsById: {
      ...ensuredState.soundsById,
      [soundId]: produce(
        ensuredState.soundsById[soundId],
        (draft: SoundState): void => producer(draft)
      )
    }
  };
}

/**
 * Remove a sound by its ID.
 * @param state   Redux state
 * @param soundId Sound ID
 * @returns Updated state
 */
function removeSoundById(state: RootSoundsState, soundId: SoundId) {
  const updatedSounds = Object.assign({}, state.soundsById);
  delete updatedSounds[soundId];

  return {
    ...state,
    soundsById: {
      ...updatedSounds
    }
  };
}

/**
 * Main sound reducer
 */
export default function sounds(
  state: RootSoundsState = rootSoundState,
  action: SoundAction
) {
  switch (action.type) {
    case ADD_SOUND: {
      const { soundId }: SoundAction = action;

      // Creates the sound object if it doesn't already exist
      return ensureSoundExists(state, soundId);
    }
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
    case REMOVE_SOUND: {
      const { soundId } = action;

      return removeSoundById(state, soundId);
    }
    default: {
      return state;
    }
  }
}
