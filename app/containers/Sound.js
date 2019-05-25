// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ipcRenderer } from 'electron';
import { Howl } from 'howler';
import PropTypes from 'prop-types';

import {
  updateSoundFile,
  updateSoundObj,
  updateSoundKeybind
} from '../actions/sounds';

import { setKeybind, removeKeybind } from '../core/Keybinds';

import Card from '../components/Card';
import Button from '../components/Button';
import Container from '../components/Container';
import FontAwesomeIcon from '../components/FontAwesomeIcon';

import ControlledInput from './ControlledInput';

class Sound extends Component {
  constructor(props) {
    super(props);

    ipcRenderer.on('fileDialog-chosen', (_, args) => {
      // If no file was chosen, return
      if (args === null || args.length === 0) {
        return;
      }
      this.playerStop(true);

      const { DUpdateSoundFile } = this.props;
      DUpdateSoundFile(this.soundId, args[0]);
    });

    this.soundId = props.soundId;
    this.keybindInputRef = React.createRef();
  }

  openFileDialog = () => {
    ipcRenderer.send('showOpenFileDialog', {});
  };

  /**
   * Start playing the current audio file.
   */
  playerPlay = () => {
    const { DUpdateSoundObj, filename } = this.props;

    const soundObj = new Howl({
      src: [filename],
      preload: true,
      html5: true
    });
    soundObj.load();

    DUpdateSoundObj(this.soundId, soundObj);

    soundObj.play();
  };

  /**
   * Stop the currently-playing audio.
   * @param silent  whether to fail silently or with a console message
   */
  playerStop = (silent = false) => {
    const { soundObj } = this.props;

    if (soundObj == null) {
      if (silent !== true) {
        console.warn('Audio object is missing, not stopping.');
      }
      return;
    }

    soundObj.stop();
  };

  setPlayKeybind = () => {
    const { DUpdateSoundKeybind } = this.props;
    const newKey = this.keybindInputRef.current.getCurrentValue();
    // TODO transform to Logger, along with other log calls here
    console.log(`Keybind registered: ${newKey}`);

    const { keybind } = this.props;
    if (keybind) {
      // Unbind the previous bind
      removeKeybind(keybind);
    }

    // Bind the (new?) key
    setKeybind(newKey, this.playerPlay);
    DUpdateSoundKeybind(this.soundId, newKey);
  };

  render() {
    const { filename } = this.props;

    return (
      <Card className="flex-c1 col">
        <p>{filename || 'No file.'}</p>

        <Container className="flex-c1 p-10">
          <Button
            className="p-8 m-3"
            onClick={this.openFileDialog}
            customBgClassName="transparent-bg"
          >
            <FontAwesomeIcon
              iconName="file-import"
              iconSize="2x"
              className="c-secondary"
            />
          </Button>
          <Button
            className="p-8 m-3"
            onClick={this.playerPlay}
            customBgClassName="transparent-bg"
          >
            <FontAwesomeIcon
              iconName="play"
              iconSize="2x"
              className="c-secondary"
            />
          </Button>
          <Button
            className="p-8 m-3"
            onClick={this.playerStop}
            customBgClassName="transparent-bg"
          >
            <FontAwesomeIcon
              iconName="stop"
              iconSize="2x"
              className="c-secondary"
            />
          </Button>
        </Container>

        <Container className="flex-c1 p-10">
          <ControlledInput
            onChangeCallback={value => value}
            placeholder="Controlled input"
            ref={this.keybindInputRef}
          />
          <Button
            onClick={this.setPlayKeybind}
            className="p-8 m-3"
            customBgClassName="transparent-bg"
          >
            <FontAwesomeIcon
              iconName="check-circle"
              iconSize="2x"
              className="c-secondary"
            />
          </Button>
        </Container>
      </Card>
    );
  }
}

Sound.propTypes = {
  // Redux props
  soundId: PropTypes.node.isRequired,
  filename: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  soundObj: PropTypes.any,
  keybind: PropTypes.string,
  // Redux actions
  DUpdateSoundFile: PropTypes.func.isRequired,
  DUpdateSoundObj: PropTypes.func.isRequired,
  DUpdateSoundKeybind: PropTypes.func.isRequired
};
Sound.defaultProps = {
  filename: null,
  soundObj: null,
  keybind: null
};

const mapStateToProps = (state, ownProps) => {
  const { soundId } = ownProps;

  // Check if this soundId even exists
  if (Object.prototype.hasOwnProperty.call(state.sounds.soundsById, soundId)) {
    return {
      ...state.sounds.soundsById[soundId]
    };
  }

  return {};
};
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      DUpdateSoundFile: updateSoundFile,
      DUpdateSoundObj: updateSoundObj,
      DUpdateSoundKeybind: updateSoundKeybind
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sound);
