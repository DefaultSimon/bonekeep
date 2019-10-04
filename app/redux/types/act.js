// @flow

export type RootActState = {
  title: ?string,
  description: ?string,
  editing: boolean
};

// eslint-disable-next-line import/prefer-default-export
export const defaultActState = {
  title: null,
  description: null,
  editing: false
};
