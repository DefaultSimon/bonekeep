// @flow
// Common mapStateToProps functions
import { getSoundById, getSoundIdArray } from './selectors';

// eslint-disable-next-line import/prefer-default-export
export const mapSoundById = (state, ownProps) => {
  const { soundId } = ownProps;

  // Check if this soundId even exists
  if (Object.prototype.hasOwnProperty.call(state.sounds.soundsById, soundId)) {
    return {
      sound: getSoundById(state, ownProps)
    };
  }

  return {};
};

export const mapSoundIdArray = (state, props) => {
  return {
    sounds: getSoundIdArray(state, props)
  };
};
