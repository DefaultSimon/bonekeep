// @flow
// Common selectors
// import { createSelector } from 'reselect';
import type { RootReduxState } from '../types/root';
import type { RootActState } from '../types/act';
import type { RootScenesState } from '../types/scene';
// import { type SoundId, type SoundState } from '../types/sound';
// import { type RootReduxState } from '../types/root';

export const getAct = (state: RootReduxState): RootActState => state.act;
export const getScenes = (state: RootReduxState): RootScenesState =>
  state.scenes;

/*
export const getSounds = (state: RootReduxState) => state.sounds;
export const getSoundsByIdObject = (state: RootReduxState) =>
  getSounds(state).soundsById;

export const extractSound = (
  soundsByIdObject: { [SoundId]: SoundState },
  props: *
) => soundsByIdObject[props.soundId];

export const getSoundById = (state: RootReduxState, props: *) =>
  extractSound(getSoundsByIdObject(state), props);

export const getSoundIdArray = createSelector<RootReduxState, *, *, *>(
  getSoundsByIdObject,
  (soundsByIdObject: { [SoundId]: SoundState }): Array<SoundId> =>
    Object.keys(soundsByIdObject)
);
*/
