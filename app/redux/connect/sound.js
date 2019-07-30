// @flow

import type { RootReduxState } from '../types/root';
import type { RootSoundsState, SoundId, SoundState } from '../types/sounds';

export const getSounds = (state: RootReduxState): RootSoundsState =>
  state.sounds;

export const getSound = (
  state: RootReduxState,
  soundId: SoundId
): SoundState => {
  const sounds = getSounds(state);
  return sounds.soundById[soundId];
};

export const checkSoundExistsInStore = (
  state: RootReduxState,
  soundId: SoundId
): boolean => {
  const sounds = getSounds(state);
  return Object.prototype.hasOwnProperty.call(sounds.soundById, soundId);
};

export const mapSound = (
  state: RootReduxState,
  ownProps: *
): { sound: SoundState } => {
  const { soundId } = ownProps;
  return { sound: getSound(state, soundId) };
};
