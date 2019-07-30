// @flow
import produce from 'immer';

import type { SceneId } from '../types/scene';
import {
  ADD_SOUND,
  REMOVE_SOUND,
  SET_SOUND_AUTOPLAY,
  SET_SOUND_FILE,
  SET_SOUND_LOOP,
  SET_SOUND_MUTE_STATUS,
  SET_SOUND_NAME,
  SET_SOUND_PLAYING,
  SET_SOUND_VOLUME
} from '../actions/sounds';
import type {
  RootSoundsState,
  SoundId,
  SoundsByIdState,
  SoundState
} from '../types/sounds';
import { defaultRootSoundsState } from '../types/sounds';

function ensureSoundExists(state: RootSoundsState, soundId: SoundId) {
  const { soundById } = state;

  if (!Object.prototype.hasOwnProperty.call(soundById, soundId)) {
    // Doesn't exist, we create a new sound entry
    return {
      ...state,
      soundById: {
        ...state.soundById,
        [soundId]: {
          id: soundId
        }
      }
    };
  }

  return state;
}

function modifyRootSoundsState(
  state: RootSoundsState,
  sceneId: SceneId,
  producer: (draft: SoundsByIdState) => void
) {
  return {
    ...state,
    soundById: produce(state.soundById, producer)
  };
}

function modifySound(
  state: RootSoundsState,
  soundId: SoundId,
  producer: SoundState => void
) {
  const ensuredState = ensureSoundExists(state, soundId);

  return {
    ...ensuredState,
    soundById: {
      ...ensuredState.soundById,
      [soundId]: produce(ensuredState.soundById[soundId], producer)
    }
  };
}

export default function sounds(
  state: RootSoundsState = defaultRootSoundsState,
  action: *
) {
  // This is a reducer inside another reducer, so we use subtypes
  switch (action.type) {
    case ADD_SOUND: {
      const { soundId } = action;

      return ensureSoundExists(state, soundId);
    }
    case REMOVE_SOUND: {
      const { soundId } = action;
      return modifyRootSoundsState(
        state,
        soundId,
        (draft: { [SoundId]: SoundState }) => {
          delete draft[soundId];
        }
      );
    }
    case SET_SOUND_NAME: {
      const { soundId, name } = action;
      return modifySound(state, soundId, (draft: SoundState) => {
        draft.name = name;
      });
    }
    case SET_SOUND_FILE: {
      const { soundId, file } = action;
      return modifySound(state, soundId, (draft: SoundState) => {
        draft.file = file;
      });
    }
    case SET_SOUND_MUTE_STATUS: {
      const { soundId, mute } = action;
      return modifySound(state, soundId, (draft: SoundState) => {
        draft.muted = mute;
      });
    }
    case SET_SOUND_AUTOPLAY: {
      const { soundId, autoplay } = action;
      return modifySound(state, soundId, (draft: SoundState) => {
        draft.autoplay = autoplay;
      });
    }
    case SET_SOUND_PLAYING: {
      const { soundId, playing } = action;
      return modifySound(state, soundId, (draft: SoundState) => {
        draft._playing = playing;
      });
    }
    case SET_SOUND_VOLUME: {
      const { soundId, volume } = action;
      return modifySound(state, soundId, (draft: SoundState) => {
        draft.volume = volume;
      });
    }
    case SET_SOUND_LOOP: {
      const { soundId, loop } = action;
      return modifySound(state, soundId, (draft: SoundState) => {
        draft.loop = loop;
      });
    }
    default: {
      return state;
    }
  }
}
