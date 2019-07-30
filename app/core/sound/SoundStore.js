// @flow
import Logger from '../Logger';
import Sound from './Sound';
import type { SoundId, SoundState } from '../../redux/types/sounds';
import type { RootReduxState } from '../../redux/types/root';
import { getSound } from '../../redux/connect/sound';

const log = new Logger('SoundStore');

class SoundStore {
  store: {
    [SoundId]: Sound
  };

  loadedSoundIDs: Array<SoundId>;

  soundCreationCallbacks: {
    [SoundId]: Array<(sound: Sound) => void>
  };

  soundDeletionCallbacks: {
    [SoundId]: Array<() => void>
  };

  constructor() {
    this.store = {};
    this.loadedSoundIDs = [];
    this.soundCreationCallbacks = {};
    this.soundDeletionCallbacks = {};
  }

  /**
   * Returns the pure sound state by ID:
   * @param state   Received redux state
   * @param soundId Sound ID
   */
  static getPureSoundState(
    state: RootReduxState,
    soundId: SoundId
  ): ?SoundState {
    return getSound(state, soundId) || null;
  }

  /**
   * Subscribe a function to the creation of a Sound object
   * @param soundId  sound ID to subscribe to
   * @param callback function to call when instantiated
   */
  subscribeToSoundCreation = (
    soundId: SoundId,
    callback: (sound: Sound) => void
  ) => {
    if (
      !Object.prototype.hasOwnProperty.call(
        this.soundCreationCallbacks,
        soundId
      )
    ) {
      this.soundCreationCallbacks[soundId] = [callback];
    } else {
      this.soundCreationCallbacks[soundId].push(callback);
    }
  };

  subscribeToSoundDeletion = (soundId: SoundId, callback: () => void) => {
    if (
      !Object.prototype.hasOwnProperty.call(
        this.soundDeletionCallbacks,
        soundId
      )
    ) {
      this.soundDeletionCallbacks[soundId] = [callback];
    } else {
      this.soundDeletionCallbacks[soundId].push(callback);
    }
  };

  emitSoundCreation = (soundId: SoundId, soundObject: Sound) => {
    if (
      Object.prototype.hasOwnProperty.call(this.soundCreationCallbacks, soundId)
    ) {
      log.debug(`Emitting creation event for ID: '${soundId}'`);

      const callbacks = this.soundCreationCallbacks[soundId];
      callbacks.forEach(cb => cb(soundObject));
    }
  };

  emitSoundDeletion = (soundId: SoundId) => {
    if (
      Object.prototype.hasOwnProperty.call(this.soundDeletionCallbacks, soundId)
    ) {
      log.debug(`Emitting deletion event for ID: '${soundId}'`);

      const callbacks = this.soundDeletionCallbacks[soundId];
      callbacks.forEach(cb => cb());
    }
  };

  /**
   * Get sound instance by ID. Instance is created by default if not found.
   * @param state                Root Redux state
   * @param soundId              Sound ID
   * @param createIfNonexistent  Whether to instantiate the sound if needed
   * @return Sound instance
   */
  getSoundInstance = (
    state: RootReduxState,
    soundId: SoundId,
    createIfNonexistent: boolean = true
  ): typeof Sound => {
    // Get sound info
    const soundInfo = SoundStore.getPureSoundState(state, soundId);

    if (soundInfo === null) {
      throw new Error(
        `Sound with ID '${soundId}' doesn't exist, can't proceed`
      );
    }

    if (!this.loadedSoundIDs.includes(soundId)) {
      if (createIfNonexistent === false) {
        return null;
      }

      log.debug(`Sound instance of '${soundId} not found, instantiating'`);
      // Create a new sound instance
      const soundInstance = new Sound(soundId, soundInfo);
      this.store[soundId] = soundInstance;
      this.loadedSoundIDs.push(soundId);

      // Dispatch possible subscribers
      this.emitSoundCreation(soundId, soundInstance);

      return soundInstance;
    }

    // log.debug(`Sound ID '${soundId}' found, returning...`);
    // Return the existing instance
    return this.store[soundId];
  };

  soundInstanceExists = (soundId: SoundId) => {
    return this.loadedSoundIDs.includes(soundId);
  };

  /**
   * Remove the sound from the store.
   * @param soundId Sound ID to remove.
   * @param noWarn  boolean indicating if you should be warned for trying to delete a sound that didn't exist
   */
  destroySound = (soundId: SoundId, noWarn: boolean = false): boolean => {
    const index = this.loadedSoundIDs.indexOf(soundId);
    if (index === -1) {
      if (!noWarn) {
        log.warn(`Sound instance of '${soundId} doesn't exist, can't destroy.`);
      }
      return;
    }

    this.emitSoundDeletion(soundId);

    // Call onDestroy to stop the sound any do any necessary cleanups
    const sound = this.store[soundId];
    sound.onDestroy();

    this.loadedSoundIDs.splice(index, 1);
    delete this.store[soundId];
  };
}

const soundStore = new SoundStore();
export default soundStore;
