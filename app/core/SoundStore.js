// @flow
import { Howl } from 'howler';
import Logger from './Logger';
import { type SoundId, type SoundState } from '../redux/types/sound';
import reduxStore from '../redux/store';

import { extractSound, getSoundsByIdObject } from '../redux/connect/selectors';

const log = new Logger('SoundStore');

export class Sound extends Howl {
  soundId: SoundId;

  filename: string;

  constructor(soundId: SoundId, filename: string) {
    super({
      src: [filename],
      preload: true,
      html5: true
    });

    this.soundId = soundId;
    this.filename = filename;

    this.load();
  }

  // SPECIAL METHODS
  onDestroy = () => {
    this.stop();
  };

  // TODO other methods
}

class SoundStore {
  constructor() {
    this.store = {};
    this.loadedSoundIDs = [];
  }

  /**
   * Returns the pure sound state by ID:
   * @param soundId Sound ID
   */
  static getSoundState(soundId: SoundId): SoundState {
    const soundsById = getSoundsByIdObject(reduxStore.getState());
    const soundInfo = extractSound(soundsById, { soundId });

    return typeof soundInfo === 'undefined' ? null : soundInfo;
  }

  /**
   * Get sound instance by ID. Instance is created if not found.
   * @param soundId Sound ID
   */
  getSoundById(soundId: SoundId): typeof Sound {
    // Fetch sound info
    const soundInfo = SoundStore.getSoundState(soundId);

    if (soundInfo === null) {
      throw new Error("soundId doesn't exist");
    }

    const { filename } = soundInfo;

    if (!this.loadedSoundIDs.includes(soundId)) {
      log.debug(`Sound ID '${soundId} is not found, creating...'`);
      // Create a new sound instance
      const sound = new Sound(soundId, filename);
      this.store[soundId] = sound;
      this.loadedSoundIDs.push(soundId);

      return sound;
    }

    log.debug(`Sound ID '${soundId}' found, returning...`);
    // Return the existing instance
    return this.store[soundId];
  }

  /**
   * Remove the sound from the store.
   * @param soundId Sound ID to remove.
   */
  destroySound(soundId: SoundId): boolean {
    const index = this.loadedSoundIDs.indexOf(soundId);
    if (index === -1) {
      log.warn(`Sound ID '${soundId} doesn't exist, can't destroy.`);
      return;
    }

    // Call onDestroy to stop the sound any do any necessary cleanups
    const sound = this.store[soundId];
    sound.onDestroy();

    this.loadedSoundIDs.splice(index, 1);
    delete this.store[soundId];
  }
}

const soundStore = new SoundStore();
export { soundStore };
