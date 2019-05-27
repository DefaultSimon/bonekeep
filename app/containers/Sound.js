// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Howl } from 'howler';
import PropTypes from 'prop-types';

import { Button } from 'semantic-ui-react';
import {
  setSoundEditing,
  SOUND_STRUCTURE,
  setSoundObj
} from '../redux/actions/sounds';

import FontAwesomeIcon from '../components/FontAwesomeIcon';
import ItemContainer from '../components/ItemContainer';

import SoundEdit from './SoundEdit';

import { mapSound } from '../redux/connect/stateToPropsCommon';

class Sound extends Component {
  constructor(props) {
    super(props);

    this.soundId = props.soundId;
  }

  /**
   * Start playing the current audio file.
   */
  playerPlay = () => {
    const {
      DSetSoundObj,
      sound: { filename }
    } = this.props;

    const soundObj = new Howl({
      src: [filename],
      preload: true,
      html5: true
    });
    soundObj.load();

    DSetSoundObj(this.soundId, soundObj);

    soundObj.play();
  };

  /**
   * Stop the currently-playing audio.
   * @param silent  whether to fail silently or with a console message
   */
  playerStop = (silent = false) => {
    const {
      sound: { soundObj }
    } = this.props;

    if (soundObj == null) {
      if (silent !== true) {
        console.warn('Audio object is missing, not stopping.');
      }
      return;
    }

    soundObj.stop();
  };

  toggleEditModal = () => {
    const {
      DSetSoundEditing,
      sound: { isEditing = false }
    } = this.props;

    DSetSoundEditing(this.soundId, !isEditing);
  };

  render() {
    const {
      soundId,
      sound: { name = null, isEditing = false }
    } = this.props;

    return (
      <ItemContainer className="p-10 flex-c1 col" bgColor="primary-light">
        <ItemContainer className="m-3">
          <span className="text primary-bold">{name || '~'}</span>
        </ItemContainer>

        <ItemContainer className="m-3">
          <Button.Group>
            <Button onClick={this.toggleEditModal}>
              <FontAwesomeIcon iconName="edit" color="c-transparent-dark" />
            </Button>
            <Button onClick={this.playerPlay}>
              <FontAwesomeIcon iconName="play" color="c-transparent-dark" />
            </Button>
            <Button onClick={this.playerStop}>
              <FontAwesomeIcon iconName="stop" color="c-transparent-dark" />
            </Button>
          </Button.Group>
        </ItemContainer>

        <SoundEdit
          soundId={soundId}
          open={isEditing}
          onClose={this.toggleEditModal}
          playerPlay={this.playerPlay}
        />
      </ItemContainer>
    );
  }
}

Sound.propTypes = {
  soundId: PropTypes.node.isRequired,
  // Redux state
  sound: PropTypes.shape(SOUND_STRUCTURE),
  // Redux actions
  DSetSoundObj: PropTypes.func.isRequired,
  DSetSoundEditing: PropTypes.func.isRequired
};
Sound.defaultProps = {
  sound: {}
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      DSetSoundObj: setSoundObj,
      DSetSoundEditing: setSoundEditing
    },
    dispatch
  );
};

export default connect(
  mapSound,
  mapDispatchToProps
)(Sound);
