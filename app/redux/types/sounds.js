// @flow
export type SoundId = string;

export type SoundState = {
  id: SoundId,
  name: ?string,
  file: ?string,
  // Fields that should not be saved are prefixed with _
  volume?: number,
  muted?: boolean,
  autoplay?: boolean,
  loop?: boolean,
  _playing?: boolean
  // TODO more to come
};

export type SoundsByIdState = {
  [SoundId]: SoundState
};

export type RootSoundsState = {
  soundById: SoundsByIdState
};

// eslint-disable-next-line import/prefer-default-export
export const defaultRootSoundsState = {
  soundById: {}
};
