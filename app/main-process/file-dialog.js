// @flow
import { app, ipcMain, dialog } from 'electron';

ipcMain.on('showOpenFileDialog', (event, options) => {
  const defaults = {
    title: 'Open file',
    defaultPath: app.getAppPath(),
    filters: [{ name: 'All files', extensions: ['*'] }]
  };

  dialog.showOpenDialog({ ...defaults, ...options }, (fp, bookmarks) => {
    event.sender.send('fileDialog-chosen', fp, bookmarks);
  });
});
