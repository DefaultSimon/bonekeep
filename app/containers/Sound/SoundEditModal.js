// @flow
import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import { ipcRenderer } from 'electron';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import Modal from '../Modal/BonekeepModal';
import type { SoundState } from '../../redux/types/sounds';

type Props = {
  commitCallback: (name: string, file: string, loop: boolean) => void,
  toggleCallback: () => void,
  open: boolean,
  sound: SoundState
};

class SoundEditModal extends Component<Props> {
  constructor(props) {
    super(props);

    const {
      sound: { name = '', file = '', loop = false }
    } = props;

    this.state = {
      soundName: name,
      soundFile: file,
      isLooping: loop
    };
  }

  handleCloseRequested = () => {
    const {
      soundName: newName,
      soundFile: newFile,
      isLooping: newLoop
    } = this.state;
    const { toggleCallback, commitCallback } = this.props;

    commitCallback(newName, newFile, newLoop);
    toggleCallback();
  };

  handleNameChange = e => {
    const newName = e.target.value;

    this.setState(prevState => ({
      ...prevState,
      soundName: newName
    }));
  };

  handleFileChange = (_, args) => {
    // First, stop listening for any more file dialog events as not to interfere with other modals
    this.removeFileDialogCallback();

    // If no file was chosen, return
    if (args === null || args.length === 0) {
      return;
    }

    const file = args[0];
    this.setState(prevState => ({
      ...prevState,
      soundFile: file
    }));
  };

  handleIsLoopingChange = e => {
    const isChecked = e.target.checked;

    this.setState(prevState => ({
      ...prevState,
      isLooping: isChecked
    }));
  };

  /**
   * Sets the file dialog callback,
   * calling handleChosenFile when the file is chosen.
   */
  setFileDialogCallback = () => {
    ipcRenderer.on('fileDialog-done', this.handleFileChange);
  };

  /**
   * Removes the file dialog callback.
   */
  removeFileDialogCallback = () => {
    ipcRenderer.removeListener('fileDialog-done', this.handleFileChange);
  };

  /**
   * Open a file dialog via the main process.
   */
  openFileDialog = () => {
    this.setFileDialogCallback();
    ipcRenderer.send('fileDialog-open', {});
  };

  render() {
    const { open } = this.props;
    const { soundName, soundFile, isLooping } = this.state;

    return (
      <Modal
        title="Editing sound"
        open={open}
        onCloseRequested={this.handleCloseRequested}
      >
        <div>
          <TextField
            label="Name"
            value={soundName}
            onChange={this.handleNameChange}
          />
        </div>
        <div>
          <span>File: {soundFile}</span>
          <Button onClick={this.openFileDialog}>
            <FolderOpenIcon />
            Select file
          </Button>
        </div>
        <div>
          <span>Loop: </span>
          <Switch checked={isLooping} onChange={this.handleIsLoopingChange} />
        </div>
      </Modal>
    );
  }
}

export default SoundEditModal;
