import { Store } from 'redux';
import getLogger from '../Logger';
import soundStore from './SoundStore';
import Sound from './Sound';
import {
  SET_SOUND_FILE,
  SET_SOUND_LOOP,
  SET_SOUND_MUTE_STATUS,
  SET_SOUND_PLAYING,
  SET_SOUND_VOLUME
} from '../../redux/actions/sounds';
import type { SoundId } from '../../redux/types/sounds';
import { checkSoundExistsInStore, getSound } from '../../redux/connect/sound';
import type { RootReduxState } from '../../redux/types/root';

const log = getLogger('SoundMiddleware');

const getSoundInstance = (state: RootReduxState, soundId: SoundId): Sound => {
  const soundExists = checkSoundExistsInStore(state, soundId);

  if (!soundExists) {
    throw new Error(
      `Sound with ID '${soundId}' doesn't exist in Redux, but an action was called?!`
    );
  }

  return soundStore.getSoundInstance(state, soundId);
};

// eslint-disable-next-line import/prefer-default-export
export const soundMiddleware = (store: Store) => next => action => {
  const currentState = store.getState();

  // eslint-disable-next-line default-case
  switch (action.type) {
    case SET_SOUND_FILE: {
      const { soundId } = action;

      // stop, then destroy
      if (soundStore.soundInstanceExists(soundId)) {
        const sound = getSoundInstance(currentState, soundId);
        sound.stop();
      }
      // Destroy previous sound (if it exists)
      soundStore.destroySound(soundId, true);
      break;
    }
    case SET_SOUND_PLAYING: {
      const { soundId, playing } = action;
      log.debug(`${soundId} is playing: ${playing}`);

      const sound = getSoundInstance(currentState, soundId);
      if (playing === true) {
        // Play the sound
        sound.play();
      } else {
        // Stop the sound
        sound.stop();
      }
      break;
    }
    case SET_SOUND_MUTE_STATUS: {
      const { soundId, mute } = action;
      log.debug(`${soundId} is muted: ${mute}`);

      const sound = getSoundInstance(currentState, soundId);
      if (mute === true) {
        // Mute the sound
        sound.mute();
      } else {
        // Unmute the sound
        const volume = getSound(currentState, soundId).volume || 1;
        sound.unmute(volume);
      }
      break;
    }
    case SET_SOUND_VOLUME: {
      const { soundId, volume } = action;
      log.debug(`${soundId}'s new volume: ${volume}`);

      const sound = getSoundInstance(currentState, soundId);
      sound.volume(volume);
      break;
    }
    case SET_SOUND_LOOP: {
      const { soundId, loop } = action;
      log.debug(`${soundId} looping: ${loop}`);

      const sound = getSoundInstance(currentState, soundId);
      sound.loop(loop);
      break;
    }
  }

  return next(action);
};
