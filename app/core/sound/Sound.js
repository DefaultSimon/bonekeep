import { Howl } from 'howler';
import type { SoundId, SoundState } from '../../redux/types/sounds';
import { clamp } from '../Utilities';
import SoundEventHandler from './SoundEventHandler';

const howlerOptions = {
  preload: true,
  html5: false
};

export default class Sound {
  constructor(soundId: SoundId, pureState: SoundState) {
    const { file, loop = false, volume = 1, muted = false } = pureState;

    const options = {
      ...howlerOptions,
      src: [file]
    };

    this.howler = new Howl(options);
    this.id = soundId;
    this.emitter = new SoundEventHandler(this, ['play', 'stop']);

    this.howler.load();

    // Set up other options
    this.loop(loop);
    this.volume(volume);
    if (muted) {
      this.mute();
    }
  }

  // SETUP FUNCTIONS AND OTHER
  // TODO empty for now

  // COMMON
  play = () => {
    this.howler.play();
    this.emitter.emitEvent('play');
  };

  stop = () => {
    this.howler.stop();
    this.emitter.emitEvent('stop');
  };

  mute = () => {
    this.howler.volume(0);
  };

  unmute = (currentVolume: number) => {
    const clampedVolume = clamp(currentVolume, 0, 1);
    this.howler.volume(clampedVolume);
  };

  volume = (volume: number) => {
    const clampedVolume = clamp(volume, 0, 1);
    this.howler.volume(clampedVolume);
  };

  loop = (shouldLoop: boolean) => {
    this.looping = shouldLoop;
    this.howler.loop(this.looping);
  };

  // SPECIAL METHODS
  onDestroy = () => {
    this.howler.stop();
  };

  // TODO other methods
}
