// @flow

export const RENAME_ACT: string = 'RENAME_ACT';
export const SET_ACT_DESCRIPTION: string = 'SET_ACT_DESCRIPTION';

export const renameAct = (newName: string) => ({
  type: RENAME_ACT,
  name: newName
});

export const setActDescription = (newDescription: string) => ({
  type: SET_ACT_DESCRIPTION,
  description: newDescription
});
