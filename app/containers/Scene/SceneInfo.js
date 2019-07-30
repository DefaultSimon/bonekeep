// @flow
import React, { Component } from 'react';

import IconButton from '@material-ui/core/IconButton';
import PlayArrow from '@material-ui/icons/PlayArrow';
import Stop from '@material-ui/icons/Stop';
import SettingsApplications from '@material-ui/icons/SettingsApplications';

import styles from './Scene.scss';
import type { SceneState } from '../../redux/types/scene';

type Props = {
  scene: SceneState
};

class SceneInfo extends Component<Props> {
  render() {
    const { scene } = this.props;
    const sceneTitle = scene.title || '';

    return (
      <div className={styles.infoSection}>
        {/* Left side: split into top and bottom */}
        <div className={styles.titleSection}>
          <span className={styles.type}>Scene:</span>
          <span className={styles.title}>{sceneTitle}</span>
        </div>
        <div className={styles.buttonSection}>
          {/* Buttons */}
          <IconButton className={styles.customButton} size="medium">
            <PlayArrow />
          </IconButton>
          <IconButton className={styles.customButton} size="medium">
            <Stop />
          </IconButton>
          <IconButton className={styles.customButton} size="medium">
            <SettingsApplications />
          </IconButton>
        </div>
        {/* Right side: volume bar */}
        {/* <div></div> */}
      </div>
    );
  }
}

export default SceneInfo;
