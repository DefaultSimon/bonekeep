// @flow
// Common selectors
import { createSelector } from 'reselect';
import { SoundId, SoundState } from '../types/sound';

export const getSounds = state => state.sounds;
export const getSoundsByIdObject = state => getSounds(state).soundsById;
export const extractSound = (soundArray, props) => soundArray[props.soundId];

export const getSoundById = (state, props) =>
  extractSound(getSoundsByIdObject(state), props);

export const getSoundIdArray = createSelector(
  getSoundsByIdObject,
  (soundsByIdObject: { [SoundId]: SoundState }) => {
    console.log(soundsByIdObject);

    return Object.keys(soundsByIdObject);
  }
);
