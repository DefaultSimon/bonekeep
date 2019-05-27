// Common selectors
// import { createSelector } from 'reselect';

// eslint-disable-next-line import/prefer-default-export
export const getSound = (state, props) =>
  state.sounds.soundsById[props.soundId];
