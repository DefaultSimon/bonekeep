// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import throttle from 'lodash.throttle';

import styles from './SoundMeter.scss';
import mainStyles from './Sound.scss';

import { mapZeroToOneToCustomScale, normalise } from '../../core/Utilities';
import type { SoundId } from '../../redux/types/sounds';
import { setSoundVolume } from '../../redux/actions/sounds';

const maxVolumeHeight = parseInt(styles.varTotalHeight, 10);

type Props = {
  soundId: SoundId,
  sceneId: SceneId,
  DSetSoundVolume: typeof setSoundVolume
};

class SoundMeter extends Component<Props> {
  constructor(props) {
    super(props);

    this.animRef = null;
    this.soundInstance = null;
    this.animRequestId = null;

    this.analyser = null;
    this.audioNode = null;
    this.frequencyData = null;

    this.soundIsPlaying = null;

    this.handleContainerRef = null;
    this.volumeMeterRef = null;
  }

  componentDidMount = () => {
    this.setupSoundListeners();
    this.setupHandleListeners();
  };

  setupSoundListeners = () => {
    // const { soundId } = this.props;
    /*
    soundStore.subscribeToSoundCreation(soundId, obj => {
      this.soundInstance = obj;

      // Subscribe to play and stop events for volume animation
      this.soundInstance.emitter.subscribeToEvent('play', () => {
        // Check if already connected to a different AudioNode
        if (this.audioNode !== null) {
          this.audioNode.disconnect(this.analyser);
        }
        const context = Howler.ctx;
        this.audioNode = this.soundInstance.howler._sounds[0]._node;
        this.analyser = context.createAnalyser();

        this.audioNode.connect(this.analyser);
        this.frequencyData = new Uint8Array(this.analyser.frequencyBinCount);

        // Start the animation loop
        this.soundIsPlaying = true;
        this.handleAnimationFrame();
      });

      this.soundInstance.emitter.subscribeToEvent('stop', () => {
        this.soundIsPlaying = false;
      });
    });

    soundStore.subscribeToSoundDeletion(soundId, () => {
      this.soundInstance = null;
      // Disconnect from AudioNode and reset (will throw error if there was no 'play' event)
      try {
        this.audioNode.disconnect(this.analyser);
      } catch {
        log.debug('Never played, no need to disconnect from AudioNode');
      } finally {
        this.audioNode = null;
        this.analyser = null;
        this.frequencyData = null;
      }
    });

     */
  };

  setupHandleListeners = () => {
    let active = false;

    const minValue = 0;
    const maxValue = maxVolumeHeight;

    let initialY;
    let currentY;
    let offsetY = 0;

    const throttledVolumeUpdate = throttle(this.setSoundVolume, 65);

    this.volumeMeterRef.addEventListener(
      'mousedown',
      e => {
        initialY = e.clientY - offsetY;
        // Only set to active if the correct item is being dragged
        if (e.target === this.handleContainerRef) {
          e.preventDefault();
          active = true;
        }
      },
      false
    );

    this.volumeMeterRef.addEventListener(
      'mousemove',
      e => {
        if (!active) {
          return;
        }

        e.preventDefault();

        currentY = e.clientY - initialY;
        offsetY = currentY;

        // Clamp to min and max
        if (currentY < minValue) {
          currentY = minValue;
        } else if (currentY > maxValue) {
          currentY = maxValue;
        }

        this.handleContainerRef.style.top = `${currentY}px`;
        // Pass the percentage to a throttled version of setSoundVolume
        const percentage = parseFloat(1 - currentY / maxValue).toFixed(2);
        throttledVolumeUpdate(percentage);
      },
      false
    );

    this.volumeMeterRef.addEventListener(
      'mouseup',
      () => {
        // initialY = currentY;
        active = false;
      },
      false
    );

    this.volumeMeterRef.addEventListener(
      'mouseleave',
      () => {
        active = false;
      },
      false
    );
  };

  handleAnimationFrame = () => {
    // Careful with this function, it gets called multiple times a second!

    if (this.analyser === null || !this.soundIsPlaying) {
      // Stop calling this function if the sound is deleted or not playing
      cancelAnimationFrame(this.animRequestId);
    }

    // Refresh data
    try {
      this.analyser.getByteFrequencyData(this.frequencyData);

      const data = this.frequencyData;
      const amount = data.length;

      // Compute the max value
      let max = 0;
      for (let i = 0; i < amount; ++i) {
        const current = this.frequencyData[i];
        if (current > max) {
          max = current;
        }
      }

      // Map to 0-1 range
      const normalised = normalise(max, 0, 255) / 100;
      this.setCurrentVolumeMeter(normalised);
    } catch (e) {
      // Sometimes there is a race condition and the above if clause fails, so we catch errors in case analyser is null
      cancelAnimationFrame(this.animRequestId);
    }

    // Set this function to be called on next frame
    this.animRequestId = requestAnimationFrame(this.handleAnimationFrame);
  };

  /**
   * Set volume meter volume (based on the maximum volume of all frequencies, calculated in `handleAnimationFrame`)
   * @param volume
   */
  setCurrentVolumeMeter = (volume: number) => {
    // Volume should be between 0 and 1 so we can interpolate with pixels
    const value = parseFloat(
      maxVolumeHeight - mapZeroToOneToCustomScale(volume, 0, maxVolumeHeight)
    ).toFixed(1);
    this.animRef.style.height = `${value}px`;
  };

  setSoundVolume = (volume: number) => {
    const { DSetSoundVolume, soundId, sceneId } = this.props;
    DSetSoundVolume(soundId, sceneId, volume);
  };

  render() {
    return (
      <div className={mainStyles.volume}>
        <div
          className={styles.volumeMeter}
          ref={el => {
            this.volumeMeterRef = el;
          }}
        >
          <div className={styles.meter} />
          <div
            className={styles.overlay}
            ref={i => {
              this.animRef = i;
            }}
          />
          <div className={styles.grid} />
          <div
            className={styles.handleContainer}
            ref={el => {
              this.handleContainerRef = el;
            }}
          >
            <div className={styles.handle} />
          </div>
        </div>
      </div>
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
  null,
  mapDispatchToProps
)(SoundMeter);
