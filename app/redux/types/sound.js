// @flow
export type SoundId = string;

export type SoundState = {
  soundId: SoundId,
  filename?: string,
  // TODO fix
  soundObj?: any,
  keybind?: string,
  isEditing?: boolean
};

export type SoundAction = {
  type: string,
  soundId: SoundId,
  ...SoundState
};

export type SoundActionCreator = (...args: SoundAction) => void;
