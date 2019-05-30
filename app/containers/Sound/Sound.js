// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Howl } from 'howler';

import { Button } from 'semantic-ui-react';
import classNames from 'classnames';
import {
  setSoundEditing,
  setSoundObj,
  removeSound
} from '../../redux/actions/sounds';

import FontAwesomeIcon from '../../components/FontAwesomeIcon';
import ItemContainer from '../../components/ItemContainer';
import Card from '../../components/Card';

import SoundEdit from './SoundEdit';

import { mapSoundById } from '../../redux/connect/stateToPropsCommon';
import {
  type SoundId,
  type SoundState,
  type SoundActionCreator
} from '../../redux/types/sound';

import styles from './Sound.scss';

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
  DSetSoundEditing: SoundActionCreator,
  DRemoveSound: SoundActionCreator
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

  deleteSelf = () => {
    const { DRemoveSound } = this.props;
    console.log(`Removing sound with ID: ${this.soundId}`);
    DRemoveSound(this.soundId);
  };

  render() {
    const { soundId, sound } = this.props;

    const soundName = sound ? sound.name : null;
    const soundIsEditing = sound ? sound.isEditing : false;

    const cardClasses = classNames(styles.sound, 'p-5', 'flex-c1', 'col');
    const titleContainerClasses = classNames('m-3', 'mt-10');
    const titleClasses = classNames('text', 'primary-bold', styles.title);
    const buttonsClasses = classNames('m-3', 'mt-auto');
    const removeBtnClasses = classNames('m-5', 'cursor-pointer');

    return (
      <Card className={cardClasses}>
        <ItemContainer className={titleContainerClasses}>
          <span className={titleClasses}>{soundName || <i>No title</i>}</span>
        </ItemContainer>

        <ItemContainer className={buttonsClasses}>
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
          open={soundIsEditing}
          onClose={this.toggleEditModal}
          playerPlay={this.playerPlay}
        />

        <span
          role="button"
          tabIndex={-1}
          className={styles.remove}
          onClick={this.deleteSelf}
        >
          <FontAwesomeIcon
            iconName="trash-alt"
            color="c-primary-dark"
            iconSize="sm"
            className={removeBtnClasses}
          />
        </span>
      </Card>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      DSetSoundObj: setSoundObj,
      DSetSoundEditing: setSoundEditing,
      DRemoveSound: removeSound
    },
    dispatch
  );
};

export default connect(
  mapSoundById,
  mapDispatchToProps
)(Sound);
