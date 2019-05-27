// Common mapStateToProps functions
import { getSound } from './selectors';

// eslint-disable-next-line import/prefer-default-export
export const mapSound = (state, ownProps) => {
  const { soundId } = ownProps;

  // Check if this soundId even exists
  if (Object.prototype.hasOwnProperty.call(state.sounds.soundsById, soundId)) {
    return {
      sound: getSound(state, ownProps)
    };
  }

  return {};
};
