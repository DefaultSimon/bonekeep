// @flow
// Common mapStateToProps functions
import { getSoundById, getSoundIdArray } from './selectors';
import type { RootReduxState } from '../types/root';
import type { SoundId, SoundState } from '../types/sound';

export const mapSoundById = (
  state: RootReduxState,
  ownProps: *
): { sound?: SoundState } => {
  const { soundId } = ownProps;

  // Check if this soundId even exists
  if (Object.prototype.hasOwnProperty.call(state.sounds.soundsById, soundId)) {
    return {
      sound: getSoundById(state, ownProps)
    };
  }

  return {};
};

/**
 * Generate a function that wraps mapSoundById and only returns the required Sound property
 * @param properties  Attribute to return
 * @returns {Function}
 */
export const mapSoundPropertyByIdFactory = (
  ...properties: string | Array<string>
) => {
  return (state: RootReduxState, ownProps: *): * => {
    const intermediate = mapSoundById(state, ownProps);

    // Return an empty object if the sound or attribute isn't available
    if (
      intermediate === {} ||
      !Object.prototype.hasOwnProperty.call(intermediate, 'sound')
    ) {
      return intermediate;
    }

    const { sound } = intermediate;
    const currentProps = {};

    for (let i = 0; i < properties.length; i++) {
      const property = properties[i];

      if (!Object.prototype.hasOwnProperty.call(sound, property)) {
        return {};
      }

      currentProps[property] = sound[property];
    }

    return currentProps;
  };
};

export const mapSoundIdArray = (
  state: RootReduxState,
  props: *
): { sounds: Array<SoundId> } => {
  return {
    sounds: getSoundIdArray(state, props)
  };
};
