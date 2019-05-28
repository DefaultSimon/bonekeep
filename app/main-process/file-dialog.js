// @flow
import { app, ipcMain, dialog } from 'electron';

const FILE_DIALOG_OPEN = 'fileDialog-open';
const FILE_DIALOG_DONE = 'fileDialog-done';

ipcMain.on(FILE_DIALOG_OPEN, (event, options) => {
  const defaults = {
    title: 'Open file',
    defaultPath: app.getAppPath(),
    filters: [{ name: 'All files', extensions: ['*'] }]
  };

  dialog.showOpenDialog({ ...defaults, ...options }, (fp, bookmarks) => {
    event.sender.send(FILE_DIALOG_DONE, fp, bookmarks);
  });
});
