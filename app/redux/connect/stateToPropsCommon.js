// @flow
// Common mapStateToProps functions

import type { RootReduxState } from '../types/root';

/**
 * Combines multiple mapStateToProps functions and returns the resulting combined props
 * @param stateToProps
 * @returns {function(RootReduxState, *)}
 */
// eslint-disable-next-line import/prefer-default-export
export const mapMultipleStateToProps = (...stateToProps) => {
  return (state: RootReduxState, ownProps: *) => {
    let final = {};

    stateToProps.forEach(fn => {
      final = { ...final, ...fn(state, ownProps) };
    });

    return final;
  };
};
