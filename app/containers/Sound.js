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
import Card from '../components/Card';

import SoundEdit from './SoundEdit';

import { mapSound } from '../redux/connect/stateToPropsCommon';

const ButtonGroup = ({ buttons }) => (
  <Button.Group>
    {buttons.map(element => {
      const [iconName, onClick] = element;

      return (
        <Button onClick={onClick} key={iconName}>
          <FontAwesomeIcon iconName={iconName} color="c-transparent-dark" />
        </Button>
      );
    })}
  </Button.Group>
);
ButtonGroup.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  buttons: PropTypes.any.isRequired
};

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
      <Card>
        <ItemContainer className="p-5 flex-c1 col">
          <ItemContainer className="m-3">
            <span className="text primary-bold">{name || '~'}</span>
          </ItemContainer>

          <ItemContainer className="m-3">
            <ButtonGroup
              buttons={[
                ['edit', this.toggleEditModal],
                ['play', this.playerPlay],
                ['stop', this.playerStop]
              ]}
            />
          </ItemContainer>

          <SoundEdit
            soundId={soundId}
            open={isEditing}
            onClose={this.toggleEditModal}
            playerPlay={this.playerPlay}
          />
        </ItemContainer>
      </Card>
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
