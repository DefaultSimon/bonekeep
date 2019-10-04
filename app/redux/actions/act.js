// @flow

export const RENAME_ACT: string = 'RENAME_ACT';
export const SET_ACT_DESCRIPTION: string = 'SET_ACT_DESCRIPTION';
export const TOGGLE_ACT_SETTINGS_MODAL: string = 'TOGGLE_ACT_SETTINGS_MODAL';

export const setActTitle = (newTitle: string) => ({
  type: RENAME_ACT,
  title: newTitle
});

export const setActDescription = (newDescription: string) => ({
  type: SET_ACT_DESCRIPTION,
  description: newDescription
});

export const toggleActSettingsModal = () => ({
  type: TOGGLE_ACT_SETTINGS_MODAL
});
