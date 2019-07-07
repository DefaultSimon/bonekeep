// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Button } from 'semantic-ui-react';
import classNames from 'classnames';
import { soundStore } from '../../core/SoundStore';
import { setSoundEditing, removeSound } from '../../redux/actions/sounds';

import Logger from '../../core/Logger';

import FontAwesomeIcon from '../../components/FontAwesomeIcon';
import ItemContainer from '../../components/ItemContainer';
import Card from '../../components/Card';

import SoundEdit from './SoundEdit';
import SoundVolume from './SoundVolume';

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
  DSetSoundEditing: SoundActionCreator,
  DRemoveSound: SoundActionCreator
};

class Sound extends Component<SoundProps> {
  soundId: SoundId;

  logger: typeof Logger;

  static defaultProps = {
    sound: {}
  };

  constructor(props) {
    super(props);
    this.soundId = props.soundId;
    this.log = new Logger(`Sound<${this.soundId}>`);
  }

  /**
   * Start playing the current audio file.
   */
  playerPlay = () => {
    const soundObj = soundStore.getSoundById(this.soundId);

    soundObj.play();
  };

  /**
   * Stop the currently-playing audio.
   */
  playerStop = () => {
    const soundObj = soundStore.getSoundById(this.soundId);

    soundObj.stop();
  };

  toggleEditModal = () => {
    const { DSetSoundEditing, sound } = this.props;
    const isEditing = sound ? sound.isEditing : false;

    DSetSoundEditing(this.soundId, !isEditing);
  };

  deleteSelf = () => {
    const { DRemoveSound } = this.props;

    this.log.debug('Destroying sound instance');
    soundStore.destroySound(this.soundId);

    this.log.log('Removing self');
    DRemoveSound(this.soundId);
  };

  render() {
    const { soundId, sound } = this.props;
    console.log(`Sound: id is ${soundId}`);

    const soundName = sound ? sound.name : null;
    const soundIsEditing = sound ? sound.isEditing : false;

    const cardClasses = classNames(styles.sound, 'p-5', 'flex-c1', 'col');
    const cardContentClasses = classNames('flex-c1', 'row', 'w-full');
    const titleContainerClasses = classNames('m-3', 'mt-10');
    const titleClasses = classNames(styles.title);
    const buttonsClasses = classNames('m-3', 'flex', 'row');
    const volumeContainerClasses = classNames('w-full', 'm-8', 'flex-c1');

    const topRightClasses = classNames(styles.remove, 'flex', 'row', 'mt-5');
    const removeBtnClasses = classNames('m-5', 'cursor-pointer');
    const editBtnClasses = classNames('mt-5', 'mr-3', 'cursor-pointer');

    return (
      <Card className={cardClasses}>
        <ItemContainer className={titleContainerClasses}>
          <span className={titleClasses}>{soundName || '(no title)'}</span>
        </ItemContainer>

        <ItemContainer className={cardContentClasses}>
          <ItemContainer className={volumeContainerClasses}>
            <SoundVolume soundId={soundId} />
          </ItemContainer>
          <ItemContainer className={buttonsClasses}>
            <ButtonGroup
              buttons={[['play', this.playerPlay], ['stop', this.playerStop]]}
            />
          </ItemContainer>
        </ItemContainer>

        {/* ELEMENTS BELOW ARE ALL ABSOLUTELY POSITIONED */}
        {/* Sound edit modal */}
        <SoundEdit
          soundId={soundId}
          open={soundIsEditing}
          onClose={this.toggleEditModal}
          playerPlay={this.playerPlay}
        />

        {/* Top Right Buttons (edit & remove) */}
        <ItemContainer className={topRightClasses}>
          <span role="button" tabIndex={-1} onClick={this.toggleEditModal}>
            <FontAwesomeIcon
              iconName="pencil-alt"
              color="c-transparent-dark"
              iconSize="lg"
              className={editBtnClasses}
            />
          </span>
          <span role="button" tabIndex={-1} onClick={this.deleteSelf}>
            <FontAwesomeIcon
              iconName="trash-alt"
              color="c-transparent-dark"
              iconSize="lg"
              className={removeBtnClasses}
            />
          </span>
        </ItemContainer>
      </Card>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
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
