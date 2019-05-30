// @flow
// Common mapStateToProps functions
import { getSoundById, getSoundIdArray } from './selectors';
import type { RootReduxState } from '../types/root';

// eslint-disable-next-line import/prefer-default-export
export const mapSoundById = (state: RootReduxState, ownProps: *) => {
  const { soundId } = ownProps;

  // Check if this soundId even exists
  if (Object.prototype.hasOwnProperty.call(state.sounds.soundsById, soundId)) {
    return {
      sound: getSoundById(state, ownProps)
    };
  }

  return {};
};

export const mapSoundIdArray = (state: RootReduxState, props: *) => {
  return {
    sounds: getSoundIdArray(state, props)
  };
};
