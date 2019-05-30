// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from 'semantic-ui-react';
import Sound from './Sound';
import ItemContainer from '../../components/ItemContainer';

import { generateSoundId } from '../../core/Utilities';
import { type SoundActionCreator, type SoundId } from '../../redux/types/sound';

import { mapSoundIdArray } from '../../redux/connect/stateToPropsCommon';
import { addSound } from '../../redux/actions/sounds';
import FontAwesomeIcon from '../../components/FontAwesomeIcon';

type AddProps = {
  addNewSound: (soundId: SoundId) => void
};

const AddSoundButton = ({ addNewSound }: AddProps) => (
  <Button onClick={addNewSound} as="span" className="m-8">
    <ItemContainer className="flex-c1 col">
      <FontAwesomeIcon
        iconName="plus-square"
        color="c-transparent"
        iconSize="3x"
      />
      <span className="mt-5">Add Sound</span>
    </ItemContainer>
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
