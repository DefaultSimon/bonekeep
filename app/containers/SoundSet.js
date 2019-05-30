// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from 'semantic-ui-react';
import Sound from './Sound';
import ItemContainer from '../components/ItemContainer';

import { generateSoundId } from '../core/Utilities';
import { type SoundActionCreator, type SoundId } from '../redux/types/sound';

import { mapSoundIdArray } from '../redux/connect/stateToPropsCommon';
import { addSound } from '../redux/actions/sounds';

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
      <div className="flex">
        <ItemContainer>
          {sounds.map(soundId => (
            <Sound soundId={soundId} key={soundId} />
          ))}
          <Button onClick={this.addNewSound}>Add Sound</Button>
        </ItemContainer>
      </div>
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
