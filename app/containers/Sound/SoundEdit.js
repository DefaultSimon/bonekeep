// @flow
import React, { Component } from 'react';
import { Button, Input, Modal, Label, Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ipcRenderer } from 'electron';
import FontAwesomeIcon from '../../components/FontAwesomeIcon';
import {
  setSoundFile,
  setSoundKeybind,
  setSoundName
} from '../../redux/actions/sounds';
import {
  type SoundId,
  type SoundActionCreator,
  type SoundState
} from '../../redux/types/sound';

import Logger from '../../core/Logger';
import { soundStore } from '../../core/SoundStore';

import { setKeybind, removeKeybind } from '../../core/Keybinds';

import { mapSoundById } from '../../redux/connect/stateToPropsCommon';
import { stripToLength } from '../../core/Utilities';

type Props = {
  open: boolean,
  onClose?: () => void,
  playerPlay: () => void,
  soundId: SoundId,
  sound?: SoundState,
  DSetSoundFile: SoundActionCreator,
  DSetSoundKeybind: SoundActionCreator,
  DSetSoundName: SoundActionCreator
};

class SoundEdit extends Component<Props> {
  soundId: SoundId;

  log: typeof Logger;

  static defaultProps = {
    sound: {},
    onClose: null
  };

  constructor(props) {
    super(props);

    this.soundId = props.soundId;
    this.keybindInputRef = React.createRef();
    this.nameInputRef = React.createRef();

    this.log = new Logger(`SoundEdit<${this.soundId}>`);
  }

  componentWillUnmount = () => {
    this.removeFileDialogCallback();
  };

  keybindInputRef: {
    current: null | { inputRef: { current: HTMLInputElement } }
  } = React.createRef();

  nameInputRef: {
    current: null | { inputRef: { current: HTMLInputElement } }
  } = React.createRef();

  /**
   * Handle and set the chosen file as the audio source of current sound.
   * @param _
   * @param args Arguments, as provided by electron's file dialog
   */
  handleChosenFile = (_, args) => {
    // First, stop listening for any more file dialog events as not to interfere with other modals
    this.removeFileDialogCallback();

    // If no file was chosen, return
    if (args === null || args.length === 0) {
      return;
    }

    // Destroy previous sound instance
    this.destroySoundInstance();

    const { DSetSoundFile } = this.props;
    this.log.debug(`Setting file for ${this.soundId}`);
    DSetSoundFile(this.soundId, args[0]);
  };

  /**
   * Sets the file dialog callback,
   * calling handleChosenFile when the file is chosen.
   */
  setFileDialogCallback = () => {
    this.log.debug('Setting callback for file dialog');
    ipcRenderer.on('fileDialog-done', this.handleChosenFile);
  };

  /**
   * Removes the file dialog callback.
   */
  removeFileDialogCallback = () => {
    this.log.debug('Cleaning up callback for file dialog');
    ipcRenderer.removeListener('fileDialog-done', this.handleChosenFile);
  };

  /**
   * Removes the current Sound instance, if it exists.
   */
  destroySoundInstance = () => {
    this.log.debug('Destroying sound instance...');
    soundStore.destroySound(this.soundId);
  };

  /**
   * Open a file dialog via the main process.
   */
  openFileDialog = () => {
    this.setFileDialogCallback();

    ipcRenderer.send('fileDialog-open', {});
  };

  /**
   * Set the keybind for playing based on the key provided in the input box.
   */
  setPlayKeybind = () => {
    const { DSetSoundKeybind } = this.props;

    const currentInput = this.keybindInputRef.current;
    if (currentInput == null) {
      throw new Error('keybindInputRef is null!');
    }
    const newKey = currentInput.inputRef.current.value;

    this.log.debug(`Keybind registered: ${newKey}`);

    const { sound, playerPlay } = this.props;
    const keybind = sound ? sound.keybind : null;
    if (keybind) {
      // Unbind the previous bind
      removeKeybind(keybind);
    }

    // Bind the (new?) key
    setKeybind(newKey, playerPlay);
    DSetSoundKeybind(this.soundId, newKey);
  };

  /**
   * Set the sound name based on value in the input box.
   */
  setSoundName = () => {
    const { DSetSoundName } = this.props;
    const currentInput = this.nameInputRef.current;
    if (currentInput == null) {
      throw new Error('keybindInputRef is null!');
    }
    const newName = currentInput.inputRef.current.value;

    DSetSoundName(this.soundId, newName);
  };

  render() {
    const {
      soundId,
      sound,
      DSetSoundFile,
      DSetSoundKeybind,
      DSetSoundName,
      playerPlay,
      // Modal-related
      open,
      onClose,
      ...other
    } = this.props;

    const soundName = sound ? sound.name : null;
    const soundFilename = sound ? sound.filename : null;

    return (
      <Modal size="large" open={open} onClose={onClose} {...other}>
        <Modal.Header>Editing sound with id: &#39;{soundId}&#39;</Modal.Header>
        <Modal.Content>
          <Grid centered verticalAlign="middle">
            {/* Sound name */}
            <Grid.Row>
              <Grid.Column width={5}>
                <Label pointing="right" size="huge">
                  Sound Name
                </Label>
              </Grid.Column>
              <Grid.Column width={11}>
                <Input
                  action={
                    <Button
                      className="no-border left"
                      onClick={this.setSoundName}
                    >
                      Update
                    </Button>
                  }
                  placeholder={soundName || 'Sound name'}
                  ref={this.nameInputRef}
                />
              </Grid.Column>
            </Grid.Row>

            {/* Audio file */}
            <Grid.Row>
              <Grid.Column width={5}>
                <Label pointing="right" size="huge">
                  Audio file
                </Label>
              </Grid.Column>
              <Grid.Column width={11}>
                <Button onClick={this.openFileDialog}>
                  <FontAwesomeIcon
                    iconName="file-import"
                    color="c-transparent-dark"
                  />
                  <span className="ml-8">Load file</span>
                </Button>
                <Label pointing="left" size="medium">
                  {soundFilename
                    ? stripToLength(soundFilename, 50, '...')
                    : 'No file'}
                </Label>
              </Grid.Column>
            </Grid.Row>

            {/* Play keybind */}
            <Grid.Row>
              <Grid.Column width={5}>
                <Label pointing="right" size="huge">
                  Play keybind
                </Label>
              </Grid.Column>
              <Grid.Column width={11}>
                <Input placeholder="Keybind" ref={this.keybindInputRef}>
                  <input className="no-border right" />
                  <Button
                    className="no-border left"
                    onClick={this.setPlayKeybind}
                  >
                    <FontAwesomeIcon
                      iconName="check"
                      color="c-transparent-dark"
                    />
                  </Button>
                </Input>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Modal.Content>
      </Modal>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      DSetSoundFile: setSoundFile,
      DSetSoundKeybind: setSoundKeybind,
      DSetSoundName: setSoundName
    },
    dispatch
  );
};

export default connect(
  mapSoundById,
  mapDispatchToProps
)(SoundEdit);
