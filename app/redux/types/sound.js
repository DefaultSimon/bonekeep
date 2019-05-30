// @flow
export type SoundId = string;

// Individual sound object type
export type SoundState = {
  soundId: SoundId,
  filename?: string | null,
  soundObj?: * | null,
  keybind?: string | null,
  name?: string,
  isEditing?: boolean
};

// Base sound action type
const baseSoundAction: {
  type: string,
  soundId: SoundId,
  ...SoundState
} = {
  type: 'mocktype',
  soundId: 'mockid'
};

export type SoundAction = typeof baseSoundAction;

// Action creator type
export type SoundActionCreator = (...args: *) => void;

// Base sounds state
const rootSoundState = {
  soundsById: {}
};
export default rootSoundState;

export type RootSoundsState = {
  soundsById: { [SoundId]: SoundState }
};
