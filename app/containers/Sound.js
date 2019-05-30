// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Howl } from 'howler';

import { Button } from 'semantic-ui-react';
import { setSoundEditing, setSoundObj } from '../redux/actions/sounds';

import FontAwesomeIcon from '../components/FontAwesomeIcon';
import ItemContainer from '../components/ItemContainer';
import Card from '../components/Card';

import SoundEdit from './SoundEdit';

import { mapSoundById } from '../redux/connect/stateToPropsCommon';
import {
  type SoundId,
  type SoundState,
  type SoundActionCreator
} from '../redux/types/sound';

type ButtonGroupProps = {
  buttons: $ReadOnlyArray<[string, () => void]>
};
const ButtonGroup = ({ buttons }: ButtonGroupProps) => (
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

type SoundProps = {
  soundId: SoundId,
  sound?: SoundState,
  // Actions
  DSetSoundObj: SoundActionCreator,
  DSetSoundEditing: SoundActionCreator
};

class Sound extends Component<SoundProps> {
  soundId: SoundId;

  static defaultProps = {
    sound: {}
  };

  constructor(props) {
    super(props);
    this.soundId = props.soundId;
  }

  /**
   * Start playing the current audio file.
   */
  playerPlay = () => {
    const { DSetSoundObj, sound } = this.props;
    const filename = sound ? sound.filename : null;

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
    const { sound } = this.props;
    const soundObj = sound ? sound.soundObj : null;

    if (soundObj == null) {
      if (silent !== true) {
        console.warn('Audio object is missing, not stopping.');
      }
      return;
    }

    soundObj.stop();
  };

  toggleEditModal = () => {
    const { DSetSoundEditing, sound } = this.props;
    const isEditing = sound ? sound.isEditing : false;

    DSetSoundEditing(this.soundId, !isEditing);
  };

  render() {
    const { soundId, sound } = this.props;
    const name = sound ? sound.name : null;
    const isEditing = sound ? sound.isEditing : false;

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
  mapSoundById,
  mapDispatchToProps
)(Sound);
