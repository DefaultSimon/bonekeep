// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styles from './Sound.scss';
import soundStore from '../../core/sound/SoundStore';
import type { SoundId } from '../../redux/types/sounds';
import getLogger from '../../core/Logger';

const logger = getLogger('SoundProgressBar');

type Props = {
  soundId: SoundId
};

class SoundProgressBar extends Component<Props> {
  constructor(props) {
    super(props);

    this.soundInstance = null;
    this.currentAnimation = null;

    this.progressRef = null;
    // TODO randomness
    this.randomnessRef = null;
  }

  componentDidMount = () => {
    this.setupSoundListeners();
  };

  setupSoundListeners = () => {
    const { soundId } = this.props;

    soundStore.subscribeToSoundCreation(soundId, obj => {
      this.soundInstance = obj;

      this.soundInstance.emitter.subscribeToEvent('play', () => {
        const soundDuration = parseFloat(obj.howler.duration());
        logger.debug('Sound is playing - animating progress');
        this.currentAnimation = this.progressRef.animate(
          [{ width: '0%' }, { width: '100%' }],
          {
            id: `progress-${soundId}`,
            duration: soundDuration * 1000,
            easing: 'linear'
          }
        );
      });

      this.soundInstance.emitter.subscribeToEvent('stop', () => {
        if (this.currentAnimation !== null) {
          logger.debug('Sound is stopped - canceling animation');
          this.currentAnimation.cancel();
        }
      });
    });

    soundStore.subscribeToSoundDeletion(soundId, () => {
      this.soundInstance = null;
    });
  };

  render() {
    return (
      <div className={styles.bottom}>
        <div
          className={styles.randomnessBar}
          ref={el => {
            this.randomnessRef = el;
          }}
        />
        <div
          className={styles.soundProgressBar}
          ref={el => {
            this.progressRef = el;
          }}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      // DX: x
    },
    dispatch
  );
};

export default connect(
  // mapSound,
  mapDispatchToProps
)(SoundProgressBar);
