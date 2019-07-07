// @flow
import React, { Component } from 'react';
import RangeSlider from '@gilbarbara/react-range-slider';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setSoundVolume } from '../../redux/actions/sounds';
import { soundStore } from '../../core/SoundStore';

import vars from '../../styles/_vars.scss';
import { mapSoundPropertyByIdFactory } from '../../redux/connect/stateToPropsCommon';
import type { SoundActionCreator, SoundId } from '../../redux/types/sound';

type Props = {
  volume?: number,
  soundId: SoundId,
  DSetSoundVolume: SoundActionCreator
};

class SoundVolume extends Component<Props> {
  last: number;

  static defaultProps = {
    volume: 0.5
  };

  constructor(props) {
    super(props);
    const { soundId } = this.props;
    console.log(`SoundVolume: id is ${soundId}`);

    this.soundId = soundId;
    this.last = new Date().getTime();
  }

  handleChange = position => {
    const { x } = position;
    const { DSetSoundVolume, volume } = this.props;

    // Ensure the volume updates at most only every 80ms
    const now = new Date().getTime();
    if (now - this.last > 10) {
      console.log(`Changing to ${x / 100}`);
      this.last = now;

      const newVolume = x / 100;
      // Don't update if it matches the current volume
      if (volume === newVolume) {
        return;
      }

      const sound = soundStore.getSoundById(this.soundId);
      sound.volume(newVolume);
      DSetSoundVolume(this.soundId, newVolume);
    }
  };

  render() {
    const { volume } = this.props;

    return (
      <RangeSlider
        axis="x"
        x={volume * 100}
        xStep={0.1}
        onChange={this.handleChange}
        styles={{
          options: {
            handleBorderRadius: '2px',
            handleSpace: '2px',
            handleBorder: vars.varVolumeHandleBorder,
            handleColor: vars.varVolumeHandleColor,
            rangeColor: vars.varVolumeRangeColor,
            trackColor: vars.varVolumeTrackColor
          }
        }}
      />
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      DSetSoundVolume: setSoundVolume
    },
    dispatch
  );
};

export default connect(
  mapSoundPropertyByIdFactory('volume'),
  mapDispatchToProps
)(SoundVolume);
