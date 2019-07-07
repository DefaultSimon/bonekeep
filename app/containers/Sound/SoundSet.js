// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from 'semantic-ui-react';
import classNames from 'classnames';

import Sound from './Sound';
import ItemContainer from '../../components/ItemContainer';
import FontAwesomeIcon from '../../components/FontAwesomeIcon';

import { generateSoundId } from '../../core/Utilities';

import { type SoundActionCreator, type SoundId } from '../../redux/types/sound';
import { mapSoundIdArray } from '../../redux/connect/stateToPropsCommon';
import { addSound } from '../../redux/actions/sounds';

import styles from './SoundSet.scss';

type AddProps = {
  addNewSound: (soundId: SoundId) => void
};

const addSoundClasses = classNames(
  'm-8',
  'flex-c1',
  'col',
  styles.add,
  styles.soundset
);
const addStringClasses = classNames('mt-5', 'text', 'nowrap');
const AddSoundButton = ({ addNewSound }: AddProps) => (
  <Button onClick={addNewSound} as="span" className={addSoundClasses}>
    <FontAwesomeIcon
      iconName="plus-square"
      color="c-transparent"
      iconSize="3x"
    />
    <span className={addStringClasses}>Add Sound</span>
  </Button>
);

type Props = {
  sounds: Array<SoundId>,
  DAddSound: SoundActionCreator
};

class SoundSet extends Component<Props> {
  addNewSound = () => {
    const { DAddSound } = this.props;
    const newId = generateSoundId();

    DAddSound(newId);
  };

  render() {
    const { sounds } = this.props;

    return (
      <ItemContainer className="flex wrap">
        {sounds.map(soundId => (
          <Sound soundId={soundId} key={soundId} />
        ))}
        <AddSoundButton addNewSound={this.addNewSound} />
      </ItemContainer>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      DAddSound: addSound
    },
    dispatch
  );
};

export default connect(
  mapSoundIdArray,
  mapDispatchToProps
)(SoundSet);
